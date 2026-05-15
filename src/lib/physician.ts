import { siteUrl } from "@/lib/site";

// Scaffolding placeholder per CEO policy. Real medical director identity,
// license, photo, and credentials land via STR-37 / STR-50 (publish gate).
// Do not ship placeholder values to public crawl/index until verified.
//
// `url` is the canonical /providers/{slug}/ path so the JSON-LD `@id`
// emitted as `${url}#physician` is identical across all surfaces that
// reference this person (STR-128 §4 — `@id` parity). STR-133 — must live
// on the canonical site host (miami.stronghealth.com) so the Physician
// entity and the page it renders on share an origin.
export const drAngelRivera = {
  slug: "dr-angel-rivera",
  name: "Dr. Placeholder, MD",
  givenName: "Placeholder",
  familyName: "Placeholder",
  honorificPrefix: "Dr.",
  honorificSuffix: "MD",
  jobTitle: "Medical Director",
  medicalSpecialty: ["Endocrine", "PrimaryCare"],
  description:
    "Medical Director at Strong Health Miami. Oversees every patient evaluation, lab review, and treatment plan. Real identity and credentials pending board confirmation.",
  image: "",
  url: `${siteUrl}/providers/dr-angel-rivera/`,
  // TODO: STR-37 — replace with the verified NPI registry value.
  npi: "PENDING_NPI",
  // TODO: STR-37 — replace with the physician's medical school of record.
  medicalSchool: "PENDING_MEDICAL_SCHOOL",
  // TODO: STR-37 — replace with the verified Florida medical license number.
  license: "PENDING_LICENSE",
  // TODO: STR-37 — replace with verified board certification name + issuing org + year.
  boardCertification: "PENDING_BOARD",
  boardCertificationIssuer: "PENDING_BOARD_ISSUER",
  boardCertificationYear: "PENDING_YEAR",
  // TODO: STR-37 — replace placeholder slugs with verified external profiles.
  // Slugs that remain "PENDING_*" are dropped from JSON-LD `sameAs`.
  doximitySlug: "PENDING_DOXIMITY",
  linkedinSlug: "PENDING_LINKEDIN",
  knowsAbout: [
    "Testosterone replacement therapy",
    "Hormone replacement therapy",
    "Hypogonadism",
    "Andropause",
  ],
  memberOf: ["American Urological Association", "Endocrine Society"],
  licensingBoard: "Florida Board of Medicine",
} as const;

export type Physician = typeof drAngelRivera;
