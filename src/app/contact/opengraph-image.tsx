import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Contact Strong Health Miami — TRT Therapy consultations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact · Strong Health Miami",
    title: "Talk to a TRT physician.",
    tagline: "Same-week consultations. Call or request a callback.",
  });
}
