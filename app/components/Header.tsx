"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { pulseContatti } from "@/lib/pulseContatti";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const links = [
    { href: "/", label: t("home") },
    { href: "/chi-siamo", label: t("chiSiamo") },
    { href: "/elettricisti", label: t("elettricisti") },
    { href: "/carpentieri", label: t("carpentieri") },
    { href: "/tubisti", label: t("tubisti") },
  ];

  const useDarkText = scrolled || menuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar — blur/background live here, NOT on <header> itself */}
      <div
        className={`relative z-50 transition-colors duration-300 ${
          scrolled ? "bg-paper/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Image
              src="/logo.jpeg"
              alt="5H — Cinque H"
              width={44}
              height={44}
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide uppercase transition-colors ${
                    isActive
                      ? "text-gold"
                      : scrolled
                        ? "text-ink hover:text-gold"
                        : "text-paper hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="#contatti"
              onClick={pulseContatti}
              className={`text-sm tracking-wide uppercase transition-colors ${
                scrolled
                  ? "text-ink hover:text-gold"
                  : "text-paper hover:text-gold"
              }`}
            >
              {t("contatti")}
            </a>
          </nav>

          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            aria-expanded={menuOpen}
            className={`md:hidden z-50 flex flex-col gap-1.5 w-8 h-8 items-center justify-center ${
              useDarkText ? "text-ink" : "text-paper"
            }`}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel — sibling of the bar div, NOT nested inside anything with a filter */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-paper transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-lg uppercase tracking-wide ${
                  isActive ? "text-gold" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href="#contatti"
            onClick={() => {
              setMenuOpen(false);
              pulseContatti();
            }}
            className="text-lg uppercase tracking-wide text-ink"
          >
            {t("contatti")}
          </a>
        </nav>
      </div>
    </header>
  );
}
