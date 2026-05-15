import path from "node:path";
import type { NextConfig } from "next";
import { toNextRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return toNextRedirects();
  },
  async rewrites() {
    return [
      // STR-122: serve the sitemap index at /sitemap.xml so any reasonable GSC
      // submission resolves. Rewrite (not redirect) because some crawlers
      // don't follow sitemap redirects cleanly. The metadata-route convention
      // reserves /sitemap.xml for app/sitemap.ts, so we can't add a route
      // handler there — rewrites run before route matching.
      { source: "/sitemap.xml", destination: "/sitemap-index.xml" },
    ];
  },
};

export default nextConfig;
