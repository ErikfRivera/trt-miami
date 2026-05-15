import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Strong Health Miami — TRT Therapy in Miami, FL";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Strong Health · Miami, FL",
    title: "TRT Therapy in Miami",
    tagline: "Physician-led testosterone replacement therapy. Same-week consultations.",
  });
}
