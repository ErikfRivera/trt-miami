import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Our Medical Providers — Strong Health Miami";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Our Providers",
    title: "Strong Health Miami Providers",
    tagline: "Florida-licensed, NPI-verified physicians accountable for every clinical page.",
  });
}
