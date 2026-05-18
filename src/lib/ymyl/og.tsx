import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from "@/lib/og";
import { loadYmylDoc } from "@/lib/ymyl/doc";

export { OG_SIZE, OG_CONTENT_TYPE };

export function ymylOgAlt(slug: string): string {
  return loadYmylDoc(slug).frontmatter.title;
}

export function renderYmylOgImage(slug: string, tagline: string) {
  const doc = loadYmylDoc(slug);
  return renderOgImage({
    eyebrow: "Strong Health · Miami, FL",
    title: doc.frontmatter.h1 ?? doc.frontmatter.title,
    tagline,
  });
}
