import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";

export const alt = "Medical Review Standards — Strong Health Miami";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Editorial Standards",
    title: "Medical Review Standards",
    tagline: "Named physician reviewer. 180-day content refresh. Primary-source citations.",
  });
}
