// Verification-URL helpers for physician license + NPI numbers.
//
// Per STR-128 §7 the audit asked for *deep* verification URLs that resolve
// directly to the named provider record — not the registry landing page.
// Consumers should health-check the resolved URL at build time and drop the
// visible anchor (or JSON-LD `sameAs` entry) if either returns non-200.
//
// Live health-checking happens once STR-37 / STR-50 deliver real IDs; with
// `PENDING_*` placeholders the helpers still build a syntactically valid URL
// for type-safety, but callers should gate emission on whether the source
// value looks real (see `isVerifiedLicense` / `isVerifiedNpi`).

export const licenseVerificationUrl = (licenseId: string) =>
  `https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders/Details?LicenseId=${licenseId}`;

export const npiRegistryUrl = (npi: string) =>
  `https://npiregistry.cms.hhs.gov/provider-view/${npi}`;

export const isVerifiedLicense = (license: string): boolean =>
  Boolean(license) && !license.startsWith("PENDING");

export const isVerifiedNpi = (npi: string): boolean =>
  Boolean(npi) && !npi.startsWith("PENDING");
