"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useReveal } from "@/hooks/useReveal";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";
import { pulseContatti } from "@/lib/pulseContatti";

type Service = { title: string; desc: string };

export default function CarpentieriClient() {
  const t = useTranslations("carpentieri");
  const services = t.raw("services") as Service[];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-paper pt-40 pb-24 overflow-hidden">
        <ImagePlaceholder
          label="Foto in arrivo — lavoro elettrico"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-ink/70" />{" "}
        {/* overlay for text legibility */}
        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-6">
            {t("title")}
          </h1>
          <p className="text-paper/70 max-w-xl text-lg">{t("subtitle")}</p>
          <div className="brand-divider in-view mt-8">
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* LEAD / INTRO */}
      <LeadSection title={t("leadTitle")} text={t("leadText")} />

      {/* SERVICES LIST */}
      <ServicesList title={t("servicesTitle")} services={services} />

      {/* WORK GALLERY */}
      <WorkGallery title="Lavori realizzati" />

      {/* SECTORS */}
      <SectorsNote title={t("sectorsTitle")} text={t("sectorsText")} />

      {/* CTA */}
      <CtaSection
        title={t("ctaTitle")}
        text={t("ctaText")}
        button={t("ctaButton")}
      />
    </>
  );
}

function LeadSection({ title, text }: { title: string; text: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl mb-4">{title}</h2>
        <p className="text-ink/70 text-lg">{text}</p>
      </div>
    </section>
  );
}

function ServicesList({
  title,
  services,
}: {
  title: string;
  services: Service[];
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      ref={ref}
      className="reveal bg-paper border-y border-hairline py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-3xl mb-12 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="border border-hairline p-8">
              <h3 className="font-display text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-ink/70">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorsNote({ title, text }: { title: string; text: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-2xl mb-4">{title}</h2>
        <p className="text-ink/70">{text}</p>
      </div>
    </section>
  );
}

function CtaSection({
  title,
  text,
  button,
}: {
  title: string;
  text: string;
  button: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal bg-ink text-paper py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl mb-4">{title}</h2>
        <p className="text-paper/70 mb-8">{text}</p>
        <a
          href="#contatti"
          onClick={pulseContatti}
          className="inline-block bg-gold text-ink px-8 py-3 text-sm uppercase tracking-wide hover:bg-gold-light transition-colors"
        >
          {button}
        </a>
      </div>
    </section>
  );
}

function WorkGallery({ title }: { title: string }) {
  const ref = useReveal<HTMLDivElement>();
  const placeholders = [1, 2, 3, 4];

  return (
    <section ref={ref} className="reveal py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-3xl mb-12 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {placeholders.map((n) => (
            <ImagePlaceholder
              key={n}
              label={`Foto ${n}`}
              className="aspect-square"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
