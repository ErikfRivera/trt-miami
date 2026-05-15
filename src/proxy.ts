import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isIndexableHost } from "@/lib/seo";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const host = request.headers.get("host");
  if (!isIndexableHost(host)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
