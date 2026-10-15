import electrical1 from "@/public/elettricisti/image1.jpeg";
import electrical2 from "@/public/elettricisti/image2.jpeg";
import electrical3 from "@/public/elettricisti/image3.jpeg";
import electrical4 from "@/public/elettricisti/image4.jpeg";
import carpentry2 from "@/public/carpintieri/carpintieri2.jpeg";
import carpentry3 from "@/public/carpintieri/carpintieri3.jpeg";
import carpentry4 from "@/public/carpintieri/carpintieri4.jpg";
import carpentry5 from "@/public/carpintieri/carpintieri5.jpg";
import type { StaticImageData } from "next/image";

export type WorkImage = { src: StaticImageData; description: string };
export const electricalImages: WorkImage[] = [
  { src: electrical1, description: "electrical1" },
  { src: electrical2, description: "electrical2" },
  { src: electrical3, description: "electrical3" },
  { src: electrical4, description: "electrical4" },
];
export const carpentryImages: WorkImage[] = [
  { src: carpentry2, description: "carpentry2" },
  { src: carpentry3, description: "carpentry3" },
  { src: carpentry4, description: "carpentry4" },
  { src: carpentry5, description: "carpentry5" },
];
export const selectedImages = [electricalImages[0], electricalImages[2], carpentryImages[2], carpentryImages[3]];
