import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import {
  absoluteUrl,
  indexableRoutesForSegment,
  SITEMAP_SEGMENTS,
  type SitemapSegment,
} from "@/lib/site";
import { isIndexableHost } from "@/lib/seo";
import { activePairFor } from "@/lib/hreflangMap";

// Per STR-62, the sitemap is segmented at /sitemap/en.xml, /sitemap/es.xml,
// and /sitemap/locations.xml via Next.js' generateSitemaps API. The sitemap
// index lives at /sitemap-index.xml and is the URL submitted to GSC.

export async function generateSitemaps(): Promise<Array<{ id: SitemapSegment }>> {
  return SITEMAP_SEGMENTS.map((id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  if (!isIndexableHost(host)) {
    return [];
  }

  const segment = (await props.id) as SitemapSegment;
  const lastModified = new Date();

  return indexableRoutesForSegment(segment).map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: absoluteUrl(route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
    const pair = activePairFor(route.path);
    if (pair) {
      entry.alternates = {
        languages: {
          en: absoluteUrl(pair.en),
          es: absoluteUrl(pair.es),
          "x-default": absoluteUrl(pair.en),
        },
      };
    }
    return entry;
  });
}
