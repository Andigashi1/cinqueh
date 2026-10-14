import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "5H — Elettricisti, Carpentieri, Tubisti | Italia",
  description:
    "5H offre interventi elettrici, di carpenteria e tubisteria per il settore civile, navale e industriale in tutta Italia.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeClient />;
}

