import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Fraunces, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "5H — Elettricisti, Carpentieri, Tubisti | Venezia",
    template: "%s | 5H",
  },
  description:
    "5H offre interventi elettrici, di carpenteria e tubisteria per il settore civile, navale e industriale a Venezia e provincia.",
  metadataBase: new URL("https://www.cinqueh.it"), // update once domain is confirmed
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "5H",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Header />
            <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}