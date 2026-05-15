export const drAngelRivera = {
  name: "Dr. Angel Rivera, M.D.",
  givenName: "Angel",
  familyName: "Rivera",
  honorificSuffix: "M.D.",
  jobTitle: "Medical Director",
  medicalSpecialty: ["Endocrine", "PrimaryCare"],
  description:
    "Medical Director at Strong Health Miami. Oversees the testosterone replacement therapy program and supervises every patient evaluation, lab review, and treatment plan.",
  image: "https://stronghealth.com/images/dr-angel-rivera.jpg",
  url: "https://stronghealth.com/about/dr-angel-rivera/",
  // NPI is pending CEO confirmation. Schema uses sentinel "PENDING_NPI" until provided.
  // See STR-33; replace `npi` and remove this comment when the value is supplied.
  npi: "PENDING_NPI",
} as const;

export type Physician = typeof drAngelRivera;
