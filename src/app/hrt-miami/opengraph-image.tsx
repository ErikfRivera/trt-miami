import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Strong Health Miami — Hormone Replacement Therapy (HRT) for men and women";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "HRT · Miami, FL",
    title: "Hormone Replacement Therapy in Miami",
    tagline: "Physician-supervised HRT for men and women — testosterone, estrogen, thyroid, peptides.",
  });
}
