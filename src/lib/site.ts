export const siteName = "Miami TRT";

export const siteUrl = (() => {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;
  return "http://localhost:3000";
})();

export type SitePath = `/${string}`;

export type SiteRoute = {
  path: SitePath;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  /** Page is shipped behind `noindex` (placeholder shell). Excluded from sitemap. */
  noindex?: boolean;
  /** Locale this route belongs to (drives sitemap segmentation + hreflang). */
  locale?: "en" | "es";
};

// Single source of truth for the canonical IA. All paths use trailing slash to
// match `trailingSlash: true` in next.config.ts.
//
// `noindex: true` keeps the URL reachable (200) but excluded from sitemap and
// search indexing while content is being authored — avoids thin-content
// signals before marketing fills in real copy.
export const routes: readonly SiteRoute[] = [
  // Homepage + global pages
  { path: "/", changeFrequency: "weekly", priority: 1, locale: "en" },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.8, locale: "en" },

  // Service (head-term) pages
  { path: "/trt-clinic-miami/", changeFrequency: "weekly", priority: 0.95, locale: "en" },
  { path: "/hrt-miami/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/bioidentical-hormones-miami/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },

  // Method pages
  { path: "/trt-injections/", changeFrequency: "monthly", priority: 0.8, noindex: true, locale: "en" },
  { path: "/trt-pellets/", changeFrequency: "monthly", priority: 0.8, noindex: true, locale: "en" },
  { path: "/trt-gels/", changeFrequency: "monthly", priority: 0.8, noindex: true, locale: "en" },

  // Locations hub + area pages
  { path: "/locations/", changeFrequency: "monthly", priority: 0.7, locale: "en" },
  { path: "/locations/fort-lauderdale-trt/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/locations/hialeah-trt/", changeFrequency: "monthly", priority: 0.7, locale: "en" },
  { path: "/locations/aventura-trt/", changeFrequency: "monthly", priority: 0.7, noindex: true, locale: "en" },
  { path: "/locations/doral-trt/", changeFrequency: "monthly", priority: 0.7, noindex: true, locale: "en" },
  { path: "/locations/brickell-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },
  { path: "/locations/coral-gables-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },
  { path: "/locations/coconut-grove-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },
  { path: "/locations/kendall-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },
  { path: "/locations/pinecrest-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },
  { path: "/locations/key-biscayne-trt/", changeFrequency: "monthly", priority: 0.6, noindex: true, locale: "en" },

  // Informational pillars (guides flat per STR-57 scope)
  { path: "/trt-cost/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/does-insurance-cover-trt/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/is-trt-safe/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/trt-side-effects/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },
  { path: "/trt-before-and-after/", changeFrequency: "monthly", priority: 0.85, noindex: true, locale: "en" },

  // Adjacent service (already live)
  { path: "/peptide-therapy/", changeFrequency: "weekly", priority: 0.9, locale: "en" },

  // Spanish parallels
  { path: "/es/", changeFrequency: "weekly", priority: 0.7, noindex: true, locale: "es" },
  { path: "/es/clinica-trt-miami/", changeFrequency: "weekly", priority: 0.7, noindex: true, locale: "es" },
  { path: "/es/contacto/", changeFrequency: "monthly", priority: 0.5, noindex: true, locale: "es" },
] as const;

export const absoluteUrl = (path: SitePath): string =>
  path === "/" ? siteUrl : `${siteUrl}${path}`;

export const indexableRoutes = (locale?: "en" | "es"): readonly SiteRoute[] =>
  routes.filter((r) => !r.noindex && (!locale || r.locale === locale));
