import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { absoluteUrl, indexableRoutes } from "@/lib/site";
import { isIndexableHost } from "@/lib/seo";
import { activePairFor } from "@/lib/hreflangMap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  if (!isIndexableHost(host)) {
    return [];
  }

  const lastModified = new Date();
  return indexableRoutes().map((route) => {
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
