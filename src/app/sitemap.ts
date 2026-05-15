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
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { providers } from "@/lib/providers/registry";

// STR-132 §6 — provider bio pages live at `/providers/{slug}/` and are
// generated dynamically from the registry, so they don't appear in the static
// `routes` table. The English segment owns them because they're indexable
// E-E-A-T pages on the Miami host. Keep this colocated with the sitemap so a
// new physician in the registry shows up in the next crawl without a second
// edit in `lib/site.ts`.
//
// STR-137/STR-139 — while no verified medical director is published, every
// provider bio route ships with `robots: noindex,nofollow` and renders the
// clinical-team fallback. Don't ask Google to crawl what we've told it not
// to index — drop these routes from the sitemap until the flag flips.
const providerSitemapRoutes = (): SiteRoute[] => {
  if (!hasVerifiedMedicalDirector) return [];
  return providers.map((p) => ({
    path: `/providers/${p.slug}/`,
    changeFrequency: "monthly",
    priority: 0.75,
    locale: "en",
  }));
};

// STR-137/STR-139 — the `/providers/` index and `/medical-reviewer/` page also
// surface placeholder identity and emit `robots: noindex,nofollow` while the
// flag is false. Exclude them from the sitemap on the same condition.
const REVIEWER_IDENTITY_ROUTES: ReadonlySet<string> = new Set([
  "/providers/",
  "/medical-reviewer/",
]);

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
  const filteredBase = hasVerifiedMedicalDirector
    ? baseRoutes
    : baseRoutes.filter((r) => !REVIEWER_IDENTITY_ROUTES.has(r.path));
  const extras = segment === "en" ? providerSitemapRoutes() : [];
  const allRoutes: readonly SiteRoute[] = [...filteredBase, ...extras];

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
