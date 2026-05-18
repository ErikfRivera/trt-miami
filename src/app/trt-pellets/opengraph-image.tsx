import { OG_SIZE, OG_CONTENT_TYPE, renderYmylOgImage, ymylOgAlt } from "@/lib/ymyl/og";

const SLUG = "copy-trt-pellets";
export const alt = ymylOgAlt(SLUG);
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderYmylOgImage(SLUG, "In-office testosterone pellet implants — Testopel and bioidentical options, 3–6 month duration.");
}
