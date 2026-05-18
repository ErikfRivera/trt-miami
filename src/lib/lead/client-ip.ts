import { createHash } from "node:crypto";

function pickFirst(header: string | null): string | null {
  if (!header) return null;
  const first = header.split(",")[0]?.trim();
  return first && first.length > 0 ? first : null;
}

export function getClientIp(headers: Headers): string {
  return (
    pickFirst(headers.get("x-vercel-forwarded-for")) ??
    pickFirst(headers.get("x-forwarded-for")) ??
    pickFirst(headers.get("x-real-ip")) ??
    "unknown"
  );
}

export function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_HASH_SALT ?? "trt-miami";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 16);
}
