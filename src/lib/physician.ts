// Scaffolding placeholder per CEO policy. Real medical director identity,
// license, photo, and credentials land via STR-2 (publish gate). Do not ship
// these placeholder values to public crawl/index until that resolves.
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
  url: "https://stronghealth.com/about/medical-director/",
  // TODO: STR-2 — replace with the verified NPI registry value.
  npi: "PENDING_NPI",
  // TODO: STR-2 — replace with the physician's medical school of record.
  medicalSchool: "PENDING_MEDICAL_SCHOOL",
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
