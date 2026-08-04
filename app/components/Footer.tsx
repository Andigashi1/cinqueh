"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("nav");
  const footerRef = useRef<HTMLElement | null>(null);
  const [pulseKey, setPulseKey] = useState(0);

  // First-time reveal: pulse once when the footer scrolls into view
  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPulseKey((k) => k + 1);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Every CTA click, anywhere on the page, regardless of scroll state
  useEffect(() => {
    const handler = () => setPulseKey((k) => k + 1);
    window.addEventListener("cta-contatti-click", handler);
    return () => window.removeEventListener("cta-contatti-click", handler);
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contatti"
      className="relative bg-ink text-paper overflow-hidden"
    >
      <div
        key={pulseKey}
        className="footer-pulse pointer-events-none absolute inset-0"
      />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 pointer-events-none">

        <p className="max-md:hidden text-7xl lg:text-[11rem] text-paper/3 font-display">CINQUE H</p>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-3 z-10">
        <div>
          <Image src="/logo.jpeg" alt="5H — Cinque H" width={48} height={48} />
          <p className="mt-4 text-sm text-paper/70 max-w-xs">
            Elettricisti, carpentieri e tubisti per il settore civile, navale e
            industriale.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold mb-4">
            Servizi
          </p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link
              href="/elettricisti"
              className="hover:text-gold transition-colors"
            >
              {t("elettricisti")}
            </Link>
            <Link
              href="/carpentieri"
              className="hover:text-gold transition-colors"
            >
              {t("carpentieri")}
            </Link>
          </nav>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gold mb-4">
            Contatti
          </p>
          {/* Placeholder — swap in real phone/email once confirmed */}
          <p className="text-sm text-paper/70">Telefono: (+39) 327 736 3410</p>
          <p className="text-sm text-paper/70">Email: cinque.h5@gmail.com</p>
        </div>
      </div>

      <div className="border-t border-paper/10 py-6 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} 5H — Cinque H. Tutti i diritti riservati. P. IVA 05000290279
      </div>
    </footer>
  );
}
