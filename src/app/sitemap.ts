import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { absoluteUrl, routes } from "@/lib/site";
import { isIndexableHost } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = (await headers()).get("host");
  if (!isIndexableHost(host)) {
    return [];
  }

  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
