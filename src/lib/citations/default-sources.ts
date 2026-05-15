import type { CitationItem } from "./types";

// Default 3-citation set used on any YMYL page without a specific override.
// CMO replaces these with per-page sets via the page-citations map.
export const DEFAULT_CITATIONS: readonly CitationItem[] = [
  {
    title: "Testosterone Therapy in Men with Hypogonadism: An Endocrine Society Clinical Practice Guideline",
    url: "https://pubmed.ncbi.nlm.nih.gov/29562364/",
    publisher: "Endocrine Society",
    year: 2018,
    pmid: "29562364",
  },
  {
    title: "American Urological Association: Evaluation and Management of Testosterone Deficiency",
    url: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
    publisher: "American Urological Association",
    year: 2022,
  },
  {
    title: "Testosterone Therapy Overview",
    url: "https://www.mayoclinic.org/tests-procedures/testosterone-therapy/about/pac-20385001",
    publisher: "Mayo Clinic",
    year: 2024,
  },
] as const;

export const DEFAULT_LAST_REVIEWED = "2026-05-15" as const;
