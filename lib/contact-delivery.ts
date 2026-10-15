import { createHash } from "node:crypto";

export type InquiryField = "name" | "email" | "service" | "location" | "description";
export type DeliveryResult =
  | { status: "sent" }
  | { status: "invalid"; errors: Partial<Record<InquiryField, string>> }
  | { status: "blocked" | "rateLimited" | "unavailable" | "failed" };

const serviceLabels: Record<string, string> = {
  electrical: "Interventi elettrici",
  carpentry: "Carpenteria",
  both: "Elettricità e carpenteria",
  advice: "Vorrei un consiglio",
};
const limits: Record<InquiryField, number> = { name: 120, email: 254, service: 20, location: 160, description: 4000 };
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const attempts = new Map<string, { count: number; expires: number }>();
const windowMs = 10 * 60 * 1000;

/** Best-effort, bounded per-instance throttling; not a distributed rate limiter. */
function takeAttempt(identity: string, maximum: number): boolean {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const key = createHash("sha256").update(identity).digest("hex");
  const bucket = attempts.get(key);
  if (bucket && bucket.count >= maximum) return false;
  if (bucket) bucket.count += 1;
  else {
    if (attempts.size >= 1000) attempts.delete(attempts.keys().next().value!);
    attempts.set(key, { count: 1, expires: now + windowMs });
  }
  return true;
}

/** Called only by the Server Action. Tests replace fetch; no mail credentials are returned. */
export async function deliverInquiry(data: FormData, requester?: string): Promise<DeliveryResult> {
  if (data.get("website")) return { status: "blocked" };
  const values = {} as Record<InquiryField, string>;
  const errors: Partial<Record<InquiryField, string>> = {};
  for (const field of Object.keys(limits) as InquiryField[]) {
    const raw = data.get(field);
    const value = typeof raw === "string" ? raw.trim() : "";
    values[field] = value;
    if (!value || typeof raw !== "string" || raw.length > limits[field] || value.includes("\0")) errors[field] = `${field}Error`;
  }
  if (!emailPattern.test(values.email)) errors.email = "emailError";
  if (!Object.hasOwn(serviceLabels, values.service)) errors.service = "serviceError";
  if (Object.keys(errors).length) return { status: "invalid", errors };
  const requestId = data.get("requestId");
  if (typeof requestId !== "string" || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestId)) return { status: "blocked" };

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const senderAddress = from?.match(/^[^<>\r\n]+<([^<>\r\n]+)>$/)?.[1] || from;
  if (!apiKey || !from || !senderAddress || !emailPattern.test(senderAddress) || !to || !emailPattern.test(to)) {
    console.error("Contact email configuration is missing or invalid.");
    return { status: "unavailable" };
  }
  if ((requester && !takeAttempt(`ip:${requester}`, 10)) || !takeAttempt(`email:${values.email.toLowerCase()}`, 3)) return { status: "rateLimited" };

  // Bound the idempotency key to both the client request ID and validated content.
  // Retrying an uncertain response uses the same key, avoiding a duplicate email.
  const idempotencyKey = createHash("sha256").update(JSON.stringify({ requestId, values })).digest("hex");
  const text = [
    "Nuova richiesta dal sito 5H — Cinque H", "",
    `Nome o azienda: ${values.name}`, `Email: ${values.email}`,
    `Servizio: ${serviceLabels[values.service]}`, `Località e paese: ${values.location}`,
    "", "Descrizione del progetto:", values.description,
  ].join("\n");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(10_000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `5h-inquiry/${idempotencyKey}` },
      body: JSON.stringify({ from, to: [to], reply_to: values.email, subject: `5H — Richiesta: ${serviceLabels[values.service]}`, text }),
    });
    if (!response.ok) {
      // Never log field values, credentials, or provider response bodies.
      console.error("Contact email provider rejected the request.", { status: response.status });
      return { status: "failed" };
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("id" in result) || typeof result.id !== "string" || !result.id) return { status: "failed" };
    return { status: "sent" };
  } catch {
    console.error("Contact email request did not complete.");
    return { status: "failed" };
  }
}
