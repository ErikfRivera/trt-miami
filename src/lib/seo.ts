const INDEXABLE_HOSTS = new Set([
  "stronghealth.com",
  "www.stronghealth.com",
  "miami.stronghealth.com",
  "trt-miami.vercel.app",
]);

export function normalizeHost(host: string | null | undefined): string | null {
  if (!host) return null;
  return host.toLowerCase().split(":")[0];
}

export function isIndexableHost(host: string | null | undefined): boolean {
  const normalized = normalizeHost(host);
  if (!normalized) return false;
  return INDEXABLE_HOSTS.has(normalized);
}
