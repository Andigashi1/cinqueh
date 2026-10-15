import { useTranslations } from "next-intl";
import { company, socialProfiles } from "@/lib/company";
import InquiryForm from "./InquiryForm";
import ArrowIcon from "./ArrowIcon";

export default function ContactSection() {
  const t = useTranslations("contact");
  const common = useTranslations("common");
  const profiles = Object.entries(socialProfiles).filter((entry): entry is [string, string] => Boolean(entry[1]));
  return (
    <section id="contatti" className="contact-section section-space" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="site-container contact-grid">
        <div className="contact-intro">
          <div className="brand-divider mb-6" aria-hidden="true" />
          <h2 id="contact-title" className="section-heading">{t("title")}</h2>
          <p>{t("intro")}</p>
          <address className="direct-contact">
            <div><span>{common("email")}</span><a href={`mailto:${company.email}`}>{company.email}<ArrowIcon diagonal /></a></div>
            <div><span>{common("phone")}</span><a href={company.phoneHref}>{company.phone}</a></div>
          </address>
          {profiles.length > 0 && <div className="social-links">
            {profiles.map(([name, url]) => <a key={name} href={url} aria-label={name === "facebook" ? "Facebook" : "Instagram"} target="_blank" rel="noopener noreferrer">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                {name === "facebook"
                  ? <path d="M13.7 22v-9.1h3.1l.5-3.6h-3.6V7c0-1 .3-1.8 1.8-1.8h1.9V2.1a25 25 0 0 0-2.8-.1c-2.8 0-4.7 1.7-4.7 4.8v2.5H7v3.6h2.9V22z" />
                  : <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.5" r="1" /></>}
              </svg>
            </a>)}
          </div>}
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}
