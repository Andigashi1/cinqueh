"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";
import { pulseContatti } from "@/lib/pulseContatti";

export default function Home() {
  const t = useTranslations("home");

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-paper min-h-screen flex items-center overflow-hidden">
        <span
          aria-hidden
          className="absolute -right-20 -bottom-20 font-display text-[42rem] leading-none text-paper/3 select-none"
        >
          5
        </span>

        <div className="relative mx-auto max-w-6xl px-6 pt-20">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-6">
            {t("heroEyebrow")}
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight max-w-3xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-paper/70 max-w-xl text-lg">
            {t("heroSubtitle")}
          </p>

          <div className="brand-divider in-view my-8">
            <span></span>
            <span></span>
          </div>

          <a
            href="#contatti"
            className="inline-block bg-gold text-ink px-8 py-3 text-sm uppercase tracking-wide hover:bg-gold-light transition-colors"
          >
            {t("heroCta")}
          </a>
        </div>
      </section>

      {/* TRUST LINE */}
      <TrustLine text={t("trustLine")} />

      {/* SERVICES */}
      <ServicesSection t={t} />

      {/* SECTORS */}
      <SectorsSection t={t} />

      {/* ABOUT TEASER */}
      <AboutTeaser t={t} />

      {/* CONTACT CTA */}
      <ContactCta t={t} />
    </>
  );
}

function TrustLine({ text }: { text: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="reveal bg-slate text-paper">
      <p className="mx-auto max-w-4xl px-6 py-8 text-center text-sm md:text-base">
        {text}
      </p>
    </div>
  );
}

function ServicesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useReveal<HTMLDivElement>();

  const items = [
    {
      href: "/elettricisti",
      title: "Elettricisti",
      desc: t("serviceElettricisti"),
    },
    {
      href: "/carpentieri",
      title: "Carpentieri",
      desc: t("serviceCarpentieri"),
    },
    { href: "/tubisti", title: "Tubisti", desc: t("serviceTubisti") },
  ];

  return (
    <section ref={ref} className="reveal py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-gold text-xs uppercase tracking-widest mb-2">
          {t("servicesSubtitle")}
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-12">
          {t("servicesTitle")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border border-hairline p-8 hover:border-gold transition-colors"
            >
              <h3 className="font-display text-xl mb-3">{item.title}</h3>
              <p className="text-sm text-ink/70 mb-6">{item.desc}</p>
              <span className="text-sm text-gold group-hover:underline">
                Scopri di più →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useReveal<HTMLDivElement>();
  const sectors = [
    t("sectorCivile"),
    t("sectorNavale"),
    t("sectorIndustriale"),
  ];

  return (
    <section
      ref={ref}
      className="reveal bg-paper border-y border-hairline py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl mb-8 text-center">
          {t("sectorsTitle")}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {sectors.map((s) => (
            <span
              key={s}
              className="px-6 py-2 text-sm uppercase tracking-wide border border-ink/20"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-lg text-ink/80 mb-8">{t("aboutTeaser")}</p>
        <Link
          href="/chi-siamo"
          className="text-gold text-sm uppercase tracking-wide hover:underline"
        >
          {t("aboutCta")} →
        </Link>
      </div>
    </section>
  );
}

function ContactCta({ t }: { t: ReturnType<typeof useTranslations> }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal bg-ink text-paper py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl mb-4">{t("contactTitle")}</h2>
        <p className="text-paper/70 mb-8">{t("contactSubtitle")}</p>
        <a
          href="#contatti"
          onClick={pulseContatti}
          className="inline-block bg-gold text-ink px-8 py-3 text-sm uppercase tracking-wide hover:bg-gold-light transition-colors"
        >
          {t("contactCta")}
        </a>
      </div>
    </section>
  );
}
