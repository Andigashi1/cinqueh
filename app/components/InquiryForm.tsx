"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { sendInquiry } from "@/app/actions/contact";
import ArrowIcon from "./ArrowIcon";

const fieldNames = ["name", "email", "service", "location", "description"] as const;
type FieldName = typeof fieldNames[number];
type Inquiry = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;
const services = ["electrical", "carpentry", "both", "advice"] as const;

export default function InquiryForm() {
  const t = useTranslations("contact");
  const formRef = useRef<HTMLFormElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const requestId = useRef<string | null>(null);
  const sending = useRef(false);
  const focusField = useRef<FieldName | null>(null);
  const [isPending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [review, setReview] = useState<Inquiry | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => { if (review) reviewRef.current?.focus(); }, [review]);
  useEffect(() => {
    if (sent) statusRef.current?.focus();
    if (!isPending && !sent && focusField.current) {
      (formRef.current?.elements.namedItem(focusField.current) as HTMLElement)?.focus();
      focusField.current = null;
    }
  }, [isPending, sent, review]);

  function readInquiry(form: HTMLFormElement): Inquiry {
    const data = new FormData(form);
    return Object.fromEntries(fieldNames.map((field) => [field, String(data.get(field) || "").trim()])) as Inquiry;
  }

  function validate(values: Inquiry): Errors {
    const next: Errors = {};
    if (!values.name) next.name = t("nameError");
    const emailInput = formRef.current?.elements.namedItem("email") as HTMLInputElement | null;
    if (!values.email || emailInput?.validity.typeMismatch) next.email = t("emailError");
    if (!services.some((service) => service === values.service)) next.service = t("serviceError");
    if (!values.location) next.location = t("locationError");
    if (!values.description) next.description = t("descriptionError");
    return next;
  }

  function reviewRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending) return;
    const values = readInquiry(event.currentTarget);
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setReview(null);
      setStatus(t("invalidSummary"));
      const first = fieldNames.find((field) => next[field]);
      if (first) (event.currentTarget.elements.namedItem(first) as HTMLElement)?.focus();
      return;
    }
    requestId.current = crypto.randomUUID();
    setReview(values);
    setStatus(t("reviewReady"));
  }

  function submitRequest() {
    if (!review || !requestId.current || sending.current || sent) return;
    const data = new FormData();
    for (const field of fieldNames) data.set(field, review[field]);
    data.set("requestId", requestId.current);
    const honeypot = formRef.current?.elements.namedItem("website") as HTMLInputElement | null;
    data.set("website", honeypot?.value || "");
    sending.current = true;
    setStatus(t("sending"));
    startTransition(async () => {
      try {
        const result = await sendInquiry(data);
        if (result.status === "sent") {
          formRef.current?.reset();
          requestId.current = null;
          setReview(null);
          setErrors({});
          setSent(true);
          setStatus(t("sent"));
        } else if (result.status === "invalid") {
          const next: Errors = {};
          for (const field of fieldNames) if (result.errors[field]) next[field] = t(result.errors[field]);
          setErrors(next);
          focusField.current = fieldNames.find((field) => next[field]) || null;
          setReview(null);
          setStatus(t("invalidSummary"));
        } else {
          setStatus(t(result.status === "unavailable" ? "sendUnavailable" : result.status === "rateLimited" ? "sendLimited" : "sendFailed"));
        }
      } catch {
        setStatus(t("sendFailed"));
      } finally {
        sending.current = false;
      }
    });
  }

  async function copyRequest() {
    if (!review) return;
    const text = fieldNames.map((field) => `${t(field)}: ${field === "service" ? t(review.service) : review[field]}`).join("\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setStatus(t("copied"));
    } catch { setStatus(t("copyFailed")); }
  }

  function fieldProps(field: FieldName) {
    return {
      id: `inquiry-${field}`,
      name: field,
      required: true,
      "aria-invalid": errors[field] ? true as const : undefined,
      "aria-describedby": errors[field] ? `inquiry-${field}-error` : undefined,
    };
  }
  function errorFor(field: FieldName) {
    return errors[field] ? <p id={`inquiry-${field}-error`} className="field-error">{errors[field]}</p> : null;
  }

  return (
    <form ref={formRef} className="inquiry-form" noValidate onSubmit={reviewRequest}
      aria-labelledby="inquiry-title" aria-describedby="inquiry-note inquiry-required"
      onChange={(event) => {
        if (isPending) return;
        requestId.current = null;
        if (sent) setSent(false);
        if (review) setReview(null);
        if (status) setStatus("");
        const target = event.nativeEvent.target;
        if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
        const field = target.name as FieldName;
        if (errors[field] && formRef.current) {
          const remaining = validate(readInquiry(formRef.current));
          if (!remaining[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
        }
      }}>
      <h3 id="inquiry-title" className="form-title">{t("formTitle")}</h3>
      <p id="inquiry-note" className="form-note">{t("previewNotice")}</p>
      <p id="inquiry-required" className="form-note mt-2">{t("requiredNote")}</p>
      <noscript>
        <style>{".inquiry-interactive { display: none; }"}</style>
        <p className="form-note mt-4">{t("noScript")}</p>
      </noscript>
      <div className="inquiry-interactive">
        <div hidden aria-hidden="true">
          <label htmlFor="inquiry-website">{t("leaveBlank")}</label>
          <input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <fieldset disabled={isPending} className="contents">
        <div className="form-fields">
          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-name">{t("name")}</label>
            <input {...fieldProps("name")} autoComplete="name" maxLength={120} placeholder={t("namePlaceholder")} />
            {errorFor("name")}
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-email">{t("email")}</label>
            <input {...fieldProps("email")} type="email" autoComplete="email" spellCheck={false} maxLength={254} />
            {errorFor("email")}
          </div>
          <div className="form-field">
            <label htmlFor="inquiry-service">{t("service")}</label>
            <select {...fieldProps("service")} defaultValue="">
              <option value="" disabled>{t("chooseService")}</option>
              {services.map((service) => <option key={service} value={service}>{t(service)}</option>)}
            </select>
            {errorFor("service")}
          </div>
          <div className="form-field">
            <label htmlFor="inquiry-location">{t("location")}</label>
            <input {...fieldProps("location")} autoComplete="address-level2" maxLength={160} placeholder={t("locationPlaceholder")} />
            {errorFor("location")}
          </div>
          <div className="form-field form-field--wide">
            <label htmlFor="inquiry-description">{t("description")}</label>
            <textarea {...fieldProps("description")} rows={5} maxLength={4000} placeholder={t("descriptionPlaceholder")} />
            {errorFor("description")}
          </div>
        </div>
        <button type="submit" className="button">{t("review")}<ArrowIcon /></button>
        </fieldset>
        <p ref={statusRef} tabIndex={-1} role="status" aria-atomic="true" className="form-status">{status}</p>
        {review && (
          <section className="form-review" aria-labelledby="inquiry-review-title">
            <h4 id="inquiry-review-title" ref={reviewRef} tabIndex={-1}>{t("reviewTitle")}</h4>
            <p className="form-note mt-3">{t("reviewNotice")}</p>
            <dl>
              {fieldNames.map((field) => <div key={field}><dt>{t(field)}</dt><dd>{field === "service" ? t(review.service) : review[field]}</dd></div>)}
            </dl>
            <div className="flex flex-wrap gap-3">
              <button type="button" className="button" disabled={isPending} onClick={submitRequest}>{t(isPending ? "sending" : "send")}<ArrowIcon /></button>
              <button type="button" className="button button--outline" disabled={isPending} onClick={copyRequest}>{t("copy")}</button>
            </div>
          </section>
        )}
      </div>
    </form>
  );
}
