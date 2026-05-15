import { drAngelRivera, type Physician } from "@/lib/physician";
import { HOME_BUSINESS_ID, physicianId } from "./ids";
import type { SchemaNode } from "./types";

export const buildPhysician = (physician: Physician = drAngelRivera): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "Physician",
    "@id": physicianId(physician.url),
    name: physician.name,
    givenName: physician.givenName,
    familyName: physician.familyName,
    honorificPrefix: physician.honorificPrefix,
    honorificSuffix: physician.honorificSuffix,
    jobTitle: physician.jobTitle,
    description: physician.description,
    url: physician.url,
    medicalSpecialty: physician.medicalSpecialty,
    knowsAbout: physician.knowsAbout,
    // TODO: STR-2 — NPI is a placeholder until the registry value lands.
    identifier: [
      { "@type": "PropertyValue", propertyID: "NPI", value: physician.npi },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "license",
        recognizedBy: { "@type": "Organization", name: physician.licensingBoard },
      },
      // TODO: STR-2 — medical school is a placeholder until verified.
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        educationalLevel: "MD",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: physician.medicalSchool,
        },
      },
    ],
    alumniOf: [
      { "@type": "EducationalOrganization", name: physician.medicalSchool },
    ],
    memberOf: physician.memberOf.map((name) => ({ "@type": "Organization", name })),
    worksFor: { "@id": HOME_BUSINESS_ID },
  };
  if (physician.image) node.image = physician.image;
  return node as SchemaNode;
};
