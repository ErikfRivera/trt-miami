import { NextResponse } from "next/server";

// STR-158: auth-free probe used by .github/workflows/deploy-drift-guard.yml to
// detect when origin/main and the live deploy disagree. Vercel injects
// VERCEL_GIT_COMMIT_SHA at build time, so the value baked into a running
// deploy is the SHA that produced it.

export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? "unknown";
  return new NextResponse(`${sha}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      "X-Robots-Tag": "noindex",
    },
  });
}
