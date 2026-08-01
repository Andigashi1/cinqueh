import type { Metadata } from "next";
import TubistiClient from "./TubistiClient";

export const metadata: Metadata = {
  title: "Tubisti civili, navali e industriali",
  description:
    "Linee tubiere, installazione e manutenzione per il settore civile, navale e industriale a Venezia e provincia.",
  alternates: { canonical: "/tubisti" },
};

export default function TubistiPage() {
  return <TubistiClient />;
}