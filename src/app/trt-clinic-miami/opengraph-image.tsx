import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Strong Health Miami TRT Clinic — physician-led testosterone replacement therapy";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "TRT Clinic · Miami, FL",
    title: "Physician-Led TRT Clinic in Miami",
    tagline: "Florida-licensed physician oversight, quarterly bloodwork, transparent self-pay pricing.",
  });
}
