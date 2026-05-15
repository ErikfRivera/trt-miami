import path from "node:path";
import type { NextConfig } from "next";
import { toNextRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  trailingSlash: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return toNextRedirects();
  },
};

export default nextConfig;
