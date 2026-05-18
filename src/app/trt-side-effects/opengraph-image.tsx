import { OG_SIZE, OG_CONTENT_TYPE, renderYmylOgImage, ymylOgAlt } from "@/lib/ymyl/og";

const SLUG = "copy-trt-side-effects";
export const alt = ymylOgAlt(SLUG);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderYmylOgImage(SLUG, "Common, notable, and rare TRT side effects — and how we monitor them.");
}
