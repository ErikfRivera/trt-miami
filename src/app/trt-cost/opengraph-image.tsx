import { OG_SIZE, OG_CONTENT_TYPE, renderYmylOgImage, ymylOgAlt } from "@/lib/ymyl/og";

const SLUG = "copy-trt-cost";
export const alt = ymylOgAlt(SLUG);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderYmylOgImage(SLUG, "Real monthly TRT pricing in Miami — injections, pellets, gels, labs, and visits.");
}
