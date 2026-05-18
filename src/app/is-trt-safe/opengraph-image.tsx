import { OG_SIZE, OG_CONTENT_TYPE, renderYmylOgImage, ymylOgAlt } from "@/lib/ymyl/og";

const SLUG = "copy-is-trt-safe";
export const alt = ymylOgAlt(SLUG);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderYmylOgImage(SLUG, "What the TRAVERSE trial and AUA guidelines actually say about TRT safety.");
}
