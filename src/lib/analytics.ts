const GA4_ID_PATTERN = /^G-[A-Z0-9]+$/;

function readEnv(name: string): string | null {
  const raw = process.env[name]?.trim();
  return raw && raw.length > 0 ? raw : null;
}

export const ga4MeasurementId = (() => {
  const id = readEnv("NEXT_PUBLIC_GA4_ID");
  if (!id) return null;
  return GA4_ID_PATTERN.test(id) ? id : null;
})();

export const gscVerificationToken = readEnv("NEXT_PUBLIC_GSC_VERIFICATION");
