import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "About Strong Health Miami — physician-led hormone clinic";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "About · Strong Health Miami",
    title: "Miami Hormone Health Clinic",
    tagline: "Florida-licensed physician, lab-based protocols, bilingual TRT and HRT care.",
  });
}
