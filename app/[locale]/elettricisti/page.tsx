import type { Metadata } from "next";
import ElettricistiClient from "./ElettricistiClient"

export const metadata: Metadata = {
  title: "Elettricisti civili, navali e industriali",
  description:
    "Impianti elettrici, quadri elettrici e manutenzione per abitazioni, cantieri navali e stabilimenti industriali in tutta Italia.",
  alternates: { canonical: "/elettricisti" },
};

export default function ElettricistiPage() {
  return <ElettricistiClient />;
}