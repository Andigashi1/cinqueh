"use client";

import ServicePage from "@/app/components/ServicePage";
import { carpentryImages } from "@/lib/workImages";
import heroImage from "@/public/carpintieri/carpintieri1.jpeg";

export default function CarpentieriClient() {
  return <ServicePage service="carpentieri" heroImage={heroImage} heroDescription="carpentry1" images={carpentryImages} />;
}
