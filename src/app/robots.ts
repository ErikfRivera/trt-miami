import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Disallow indexing of Vercel preview deployments so non-production URLs do
// not compete with the canonical domain in search results.
const isProduction = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : true;

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
