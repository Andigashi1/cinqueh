"use server";

import { headers } from "next/headers";
import { deliverInquiry, type DeliveryResult } from "@/lib/contact-delivery";

export async function sendInquiry(data: FormData): Promise<DeliveryResult> {
  if (!(data instanceof FormData)) return { status: "blocked" };
  // Trust infrastructure-provided client IPs only in Vercel's runtime.
  const requestHeaders = await headers();
  const requester = process.env.VERCEL === "1"
    ? requestHeaders.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()
    : undefined;
  return deliverInquiry(data, requester);
}
