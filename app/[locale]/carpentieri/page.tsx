import type { Metadata } from "next";
import CarpentieriClient from "./CarpentieriClient";

export const metadata: Metadata = {
  title: "Carpentieri civili, navali e industriali",
  description:
    "Lavori di carpenteria, allestimenti navali e strutture industriali per il settore civile, navale e industriale in tutta Italia.",
  alternates: { canonical: "/carpentieri" },
};

export default function CarpentieriPage() {
  return <CarpentieriClient />;
}