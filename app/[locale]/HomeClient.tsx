"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ArrowIcon from "@/app/components/ArrowIcon";
import WorkGallery from "@/app/components/WorkGallery";
import { selectedImages } from "@/lib/workImages";
import electricalDetail from "@/public/elettricisti/image1.jpeg";
import electricalLandscape from "@/public/elettricisti/landscape.jpg";
import siteLandscape from "@/public/carpintieri/carpintieri4.jpg";
import siteWork from "@/public/carpintieri/carpintieri5.jpg";

export default function Home() {
  const t = useTranslations("home");
  const common = useTranslations("common");
  const nav = useTranslations("nav");
  const images = useTranslations("images");
  const services = [
    { href: "/elettricisti", title: nav("elettricisti"), description: t("serviceElettricisti"), image: electricalLandscape, alt: images("electricalHero"), link: common("viewElectrical") },
    { href: "/carpentieri", title: nav("carpentieri"), description: t("serviceCarpentieri"), image: siteLandscape, alt: images("carpentry4"), link: common("viewCarpentry") },
  ];

  return (
    <>
      <section className="home-hero on-dark" aria-labelledby="home-title">
        <div className="site-container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t("heroEyebrow")}</p>
              <h1 id="home-title" className="hero-title">{t("heroTitle")}</h1>
              <p className="hero-subtitle">{t("heroSubtitle")}</p>
              <div className="hero-actions">
                <a href="#contatti" className="button">{t("heroCta")}<ArrowIcon /></a>
                <a href="#servizi" className="text-link">{common("viewServices")}</a>
              </div>
            </div>
            <figure className="hero-visual">
              <div className="hero-image">
                <Image src={electricalDetail} alt={t("heroImageAlt")} fill
                  loading="eager" fetchPriority="high"
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 46vw, 590px" />
              </div>
              <figcaption className="image-caption"><span>{t("heroCaption")}</span><span translate="no">5H / Cinque H</span></figcaption>
            </figure>
          </div>
          <div className="hero-sectors">
            <p>{t("sectorsTitle")}</p>
            <ul aria-label={t("sectorsTitle")}>
              <li>{t("sectorCivile")}</li><li>{t("sectorNavale")}</li><li>{t("sectorIndustriale")}</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="servizi" className="section-space" aria-labelledby="services-title">
        <div className="site-container">
          <div className="section-intro">
            <h2 id="services-title" className="section-heading">{t("servicesTitle")}</h2>
            <p>{t("servicesSubtitle")}</p>
          </div>
          <div>
            {services.map((service) => (
              <article key={service.href} className="service-feature">
                <div className="service-feature-image">
                  <Image src={service.image} alt={service.alt} fill sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 48vw, 620px" />
                </div>
                <div>
                  <div className="brand-divider" aria-hidden="true" />
                  <h3><Link href={service.href}>{service.title}</Link></h3>
                  <p>{service.description}</p>
                  <Link href={service.href} className="text-link">{service.link}<ArrowIcon /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-band on-dark section-space" aria-labelledby="home-about-title">
        <div className="site-container about-grid">
          <div>
            <h2 id="home-about-title" className="section-heading">{t("aboutTitle")}</h2>
            <p>{t("aboutTeaser")}</p>
            <Link href="/chi-siamo" className="text-link">{t("aboutCta")}<ArrowIcon /></Link>
            <p className="trust-note">{t("trustLine")}</p>
          </div>
          <div className="about-image">
            <Image src={siteWork} alt={t("aboutImageAlt")} fill
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1328px) 45vw, 590px" />
          </div>
        </div>
      </section>
      <WorkGallery title={t("workTitle")} intro={t("workIntro")} images={selectedImages} />
    </>
  );
}
