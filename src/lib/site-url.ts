// Canonical site URL with whitespace + trailing slash trimmed so a stray
// newline in NEXT_PUBLIC_SITE_URL (a real bug we hit on Vercel) doesn't
// corrupt sitemap loc fields or robots.txt sitemap pointers.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trt-miami.vercel.app"
)
  .trim()
  .replace(/\/+$/, "");
