import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import {
  absoluteUrl,
  indexableRoutesForSegment,
  SITEMAP_SEGMENTS,
  type SiteRoute,
  type SitemapSegment,
} from "@/lib/site";
import { isIndexableHost } from "@/lib/seo";
import { activePairFor } from "@/lib/hreflangMap";
import { providers } from "@/lib/providers/registry";

// STR-132 §6 — provider bio pages live at `/providers/{slug}/` and are
// generated dynamically from the registry, so they don't appear in the static
// `routes` table. The English segment owns them because they're indexable
// E-E-A-T pages on the Miami host. Keep this colocated with the sitemap so a
// new physician in the registry shows up in the next crawl without a second
// edit in `lib/site.ts`.
const providerSitemapRoutes = (): SiteRoute[] =>
  providers.map((p) => ({
    path: `/providers/${p.slug}/`,
    changeFrequency: "monthly",
    priority: 0.75,
    locale: "en",
  }));

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

  const baseRoutes = indexableRoutesForSegment(segment);
  const extras = segment === "en" ? providerSitemapRoutes() : [];
  const allRoutes: readonly SiteRoute[] = [...baseRoutes, ...extras];

  return allRoutes.map((route) => {
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
