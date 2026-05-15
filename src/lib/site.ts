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
};

export const routes: readonly SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/fl/miami/hialeah", changeFrequency: "monthly", priority: 0.7 },
] as const;

export const absoluteUrl = (path: SitePath): string =>
  path === "/" ? siteUrl : `${siteUrl}${path}`;
