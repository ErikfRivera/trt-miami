// CMO-owned allowlist per STR-98 brief §5.4.
// Only hosts in this set are permitted in <CitationBlock> citations.
// Changes to this file require CMO PR review.
export const ALLOWED_CITATION_HOSTS: readonly string[] = [
  "medlineplus.gov",
  "pubmed.ncbi.nlm.nih.gov",
  "ncbi.nlm.nih.gov",
  "accessdata.fda.gov",
  "fda.gov",
  "endocrine.org",
  "auanet.org",
  "aace.com",
  "mayoclinic.org",
  "cochranelibrary.com",
  "cdc.gov",
  "floridahealth.gov",
] as const;

export function isAllowedCitationHost(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return ALLOWED_CITATION_HOSTS.some(
      (allowed) => hostname === allowed || hostname.endsWith(`.${allowed}`),
    );
  } catch {
    return false;
  }
}
