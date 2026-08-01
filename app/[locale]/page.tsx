import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "5H — Elettricisti, Carpentieri, Tubisti | Venezia",
  description:
    "5H offre interventi elettrici, di carpenteria e tubisteria per il settore civile, navale e industriale a Venezia e provincia.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeClient />;
}

