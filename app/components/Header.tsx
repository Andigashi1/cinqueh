"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && menuOpen) {
        const items = [menuButtonRef.current, ...document.querySelectorAll<HTMLAnchorElement>("#mobile-navigation a")].filter((item): item is HTMLButtonElement | HTMLAnchorElement => item !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", onKeyDown);
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
  ];

  return (
    <header className={`site-header ${scrolled || menuOpen ? "header--light" : ""}`}>
      <div className="header-bar">
        <div className="site-container header-inner">
          <Link href="/" className="header-logo">
            <Image src="/logo.jpeg" alt="5H — Cinque H" width={56} height={56} />
          </Link>
          <nav className="desktop-navigation" aria-label={t("mainNavigation")}>
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link" aria-current={pathname === link.href ? "page" : undefined}>
                {link.label}
              </Link>
            ))}
            <a href="#contatti" className="nav-contact">{t("contatti")}</a>
          </nav>
          <button ref={menuButtonRef} type="button" className="menu-toggle"
            onClick={() => { menuButtonRef.current?.focus(); setMenuOpen((open) => !open); }}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className="mobile-navigation" data-open={menuOpen}
        inert={!menuOpen} aria-hidden={!menuOpen}>
        <nav aria-label={t("mobileNavigation")}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>
          ))}
          <a href="#contatti" onClick={() => setMenuOpen(false)}>{t("contatti")}</a>
        </nav>
      </div>
    </header>
  );
}
