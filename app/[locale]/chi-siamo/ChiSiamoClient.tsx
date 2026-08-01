"use client";

import { useTranslations } from "next-intl";
import { useReveal } from "@/hooks/useReveal";
import { pulseContatti } from "@/lib/pulseContatti";
import ImagePlaceholder from "@/app/components/ImagePlaceholder";

type ValueItem = { title: string; desc: string };

export default function ChiSiamoClient() {
  const t = useTranslations("chiSiamo");
  const values = t.raw("values") as ValueItem[];

  return (
    <>
      {/* HERO */}
      <section className="relative bg-ink text-paper pt-40 pb-24 overflow-hidden">
        <ImagePlaceholder
          label="Foto in arrivo — il team al lavoro"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-ink/70" />

        <div className="relative mx-auto max-w-6xl px-6">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-4">
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl md:text-5xl mb-6">
            {t("title")}
          </h1>
          <div className="brand-divider in-view mt-8">
            <span></span>
            <span></span>
          </div>
        </div>
      </section>

      {/* LEAD */}
      <LeadSection text={t("leadText")} />

      {/* VALUES */}
      <ValuesSection title={t("valuesTitle")} values={values} />

      {/* CTA */}
      <CtaSection
        title={t("ctaTitle")}
        text={t("ctaText")}
        button={t("ctaButton")}
      />
    </>
  );
}

function LeadSection({ text }: { text: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-ink/80 text-lg leading-relaxed">{text}</p>
      </div>
    </section>
  );
}

function ValuesSection({
  title,
  values,
}: {
  title: string;
  values: ValueItem[];
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section ref={ref} className="reveal bg-paper border-y border-hairline py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl md:text-3xl mb-12 text-center">
          {title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="brand-divider in-view mx-auto mb-4 justify-center">
                <span></span>
                <span></span>
              </div>
              <h3 className="font-display text-lg mb-2">{value.title}</h3>
              <p className="text-sm text-ink/70">{value.desc}</p>
            </div>
          ))}
        </div>
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