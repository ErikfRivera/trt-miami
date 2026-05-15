import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Strong Health Miami — Bioidentical Hormone Replacement Therapy (BHRT)";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Bioidentical Hormones · Miami, FL",
    title: "Bioidentical Hormones in Miami",
    tagline: "Plant-derived bioidentical hormone pellets, creams, and injections — physician-prescribed.",
  });
}
