"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import ArrowIcon from "@/app/components/ArrowIcon";
import aboutImage from "@/public/chisiamo.jpg";
import siteImage from "@/public/carpintieri/carpintieri2.jpeg";

type ValueItem = { title: string; desc: string };
export default function ChiSiamoClient() {
  const t = useTranslations("chiSiamo");
  const images = useTranslations("images");
  const values = t.raw("values") as ValueItem[];
  return (
    <>
      <section className="page-hero on-dark" aria-labelledby="company-title">
        <div className="site-container page-hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 id="company-title">{t("title")}</h1>
            <div className="hero-actions"><a href="#contatti" className="button">{t("ctaButton")}<ArrowIcon /></a></div>
          </div>
          <div className="page-hero-image hero-visual">
            <Image src={aboutImage} alt={images("aboutHero")} fill loading="eager" fetchPriority="high"
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 46vw, 590px" />
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container company-lead">
          <div><h2 className="section-heading mb-6">{t("eyebrow")}</h2><div className="brand-divider" aria-hidden="true" /></div>
          <p>{t("leadText")}</p>
        </div>
      </section>
      <section className="about-band on-dark section-space" aria-labelledby="values-title">
        <div className="site-container company-values">
          <div className="company-values-image">
            <Image src={siteImage} alt={images("carpentry2")} fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 46vw, 600px" />
          </div>
          <div>
            <h2 id="values-title" className="section-heading">{t("valuesTitle")}</h2>
            {values.map((value) => <div key={value.title} className="capability"><h3>{value.title}</h3><p>{value.desc}</p></div>)}
          </div>
        </div>
      </section>
      <section className="service-note on-dark">
        <div className="site-container">
          <h2 className="section-heading">{t("ctaTitle")}</h2>
          <div><p>{t("ctaText")}</p><a href="#contatti" className="text-link">{t("ctaButton")}<ArrowIcon /></a></div>
        </div>
      </section>
    </>
  );
}
