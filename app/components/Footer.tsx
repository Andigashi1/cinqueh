import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { company } from "@/lib/company";

export default function Footer() {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const footer = useTranslations("footer");
  return (
    <footer className="site-footer on-dark">
      <div className="site-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Image src="/logo.jpeg" alt="5H — Cinque H" width={64} height={64} />
            <p>{footer("description")}</p>
          </div>
          <div>
            <p className="footer-label">{common("services")}</p>
            <nav className="flex flex-col items-start" aria-label={common("services")}>
              <Link href="/elettricisti">{t("elettricisti")}</Link>
              <Link href="/carpentieri">{t("carpentieri")}</Link>
            </nav>
          </div>
          <div>
            <p className="footer-label">{t("contatti")}</p>
            <p><a href={company.phoneHref}>{common("phone")}: {company.phone}</a></p>
            <p><a href={`mailto:${company.email}`}>{common("email")}: {company.email}</a></p>
          </div>
        </div>
        <div className="footer-legal">
          <p>© {new Date().getFullYear()} {common("copyright")}</p>
          <p>{common("vat")} {company.vat}</p>
        </div>
      </div>
    </footer>
  );
}
