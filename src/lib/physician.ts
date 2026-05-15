// Scaffolding placeholder per CEO policy on STR-26. Real medical director
// identity, license #, and photo land via STR-47 (publish gate). Do not ship
// to public crawl/index until that resolves.
export const drAngelRivera = {
  name: "Dr. Placeholder, MD",
  givenName: "Placeholder",
  familyName: "Placeholder",
  honorificSuffix: "MD",
  jobTitle: "Medical Director",
  medicalSpecialty: ["Endocrine", "PrimaryCare"],
  description:
    "Medical Director at Strong Health Miami. Oversees every patient evaluation, lab review, and treatment plan. Real identity and credentials pending board confirmation.",
  image: "",
  url: "https://stronghealth.com/about/medical-director/",
  npi: "PENDING_NPI",
} as const;

export type Physician = typeof drAngelRivera;
