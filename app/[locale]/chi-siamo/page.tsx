import type { Metadata } from "next";
import ChiSiamoClient from "./ChiSiamoClient";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "5H nasce dall'esperienza diretta nel settore navale e industriale, con un team di professionisti specializzati nel civile, navale e industriale.",
  alternates: { canonical: "/chi-siamo" },
};

export default function ChiSiamoPage() {
  return <ChiSiamoClient />;
}