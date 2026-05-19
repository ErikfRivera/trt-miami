function readEnv(name: string): string | null {
  const raw = process.env[name]?.trim();
  return raw && raw.length > 0 ? raw : null;
}

const MEASUREMENT_ID = readEnv("NEXT_PUBLIC_GA4_ID");
const API_SECRET = readEnv("GA4_API_SECRET");

export function ga4ServerConfigured(): boolean {
  return Boolean(MEASUREMENT_ID && API_SECRET);
}

export type Ga4ServerEvent = {
  name: string;
  params?: Record<string, string | number | boolean | null>;
};

/**
 * Fires a Measurement Protocol event server-side. Best-effort:
 * returns true on success, false otherwise. Never throws.
 */
export async function sendGa4Event(
  clientId: string,
  events: Ga4ServerEvent[],
): Promise<boolean> {
  if (!MEASUREMENT_ID || !API_SECRET) return false;

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(
    MEASUREMENT_ID,
  )}&api_secret=${encodeURIComponent(API_SECRET)}`;

  const payload = {
    client_id: clientId,
    non_personalized_ads: false,
    events,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return response.ok || response.status === 204;
  } catch {
    return false;
  }
}

/**
 * Stable pseudo client id derived from the salted IP hash. Used when the
 * server-side event isn't otherwise tied to a real GA4 client_id cookie.
 */
export function deriveClientId(ipHash: string): string {
  const trimmed = ipHash.slice(0, 16) || "anonymous";
  return `${trimmed}.${Math.floor(Date.now() / 1000)}`;
}
