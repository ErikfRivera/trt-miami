import { OG_SIZE, OG_CONTENT_TYPE, renderYmylOgImage, ymylOgAlt } from "@/lib/ymyl/og";

const SLUG = "copy-trt-before-and-after";
export const alt = ymylOgAlt(SLUG);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderYmylOgImage(SLUG, "Realistic TRT timeline — energy by week 1, libido by week 4, body comp by month 3.");
}
