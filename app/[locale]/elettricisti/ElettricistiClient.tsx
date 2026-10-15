"use client";

import ServicePage from "@/app/components/ServicePage";
import { electricalImages } from "@/lib/workImages";
import heroImage from "@/public/elettricisti/landscape.jpg";

export default function ElettricistiClient() {
  return <ServicePage service="elettricisti" heroImage={heroImage} heroDescription="electricalHero" images={electricalImages} />;
}
