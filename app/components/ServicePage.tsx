import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import ArrowIcon from "./ArrowIcon";
import WorkGallery from "./WorkGallery";
import type { WorkImage } from "@/lib/workImages";

type Service = { title: string; desc: string };
export default function ServicePage({ service, heroImage, heroDescription, images }: {
  service: "elettricisti" | "carpentieri";
  heroImage: StaticImageData;
  heroDescription: string;
  images: WorkImage[];
}) {
  const t = useTranslations(service);
  const imageText = useTranslations("images");
  const services = t.raw("services") as Service[];
  return (
    <>
      <section className="page-hero on-dark" aria-labelledby="service-title">
        <div className="site-container page-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 id="service-title">{t("title")}</h1>
            <p className="hero-subtitle">{t("subtitle")}</p>
            <div className="hero-actions"><a href="#contatti" className="button">{t("ctaButton")}<ArrowIcon /></a></div>
          </div>
          <div className="page-hero-image hero-visual">
            <Image src={heroImage} alt={imageText(heroDescription)} fill loading="eager" fetchPriority="high"
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 46vw, 590px" />
          </div>
        </div>
      </section>
      <section className="section-space" aria-labelledby="service-intro-title">
        <div className="site-container service-details">
          <div>
            <h2 id="service-intro-title" className="section-heading">{t("leadTitle")}</h2>
            <p className="lead-text">{t("leadText")}</p>
          </div>
          <div className="capabilities">
            <h2>{t("servicesTitle")}</h2>
            {services.map((item) => (
              <div key={item.title} className="capability"><h3>{item.title}</h3><p>{item.desc}</p></div>
            ))}
          </div>
        </div>
      </section>
      <div className="service-note on-dark">
        <div className="site-container"><h2 className="section-heading">{t("sectorsTitle")}</h2><p>{t("sectorsText")}</p></div>
      </div>
      <WorkGallery title={t("galleryTitle")} images={images} />
      <section className="service-note on-dark">
        <div className="site-container">
          <h2 className="section-heading">{t("ctaTitle")}</h2>
          <div><p>{t("ctaText")}</p><a href="#contatti" className="text-link">{t("ctaButton")}<ArrowIcon /></a></div>
        </div>
      </section>
    </>
  );
}
