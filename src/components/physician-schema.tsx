import { JsonLd } from "@/components/json-ld";
import { CLINIC_SCHEMA_ID } from "@/components/medical-clinic-schema";
import { business } from "@/lib/business";
import { drAngelRivera } from "@/lib/physician";

export const DR_ANGEL_RIVERA_SCHEMA_ID = `${drAngelRivera.url}#physician`;

export function PhysicianSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": DR_ANGEL_RIVERA_SCHEMA_ID,
    name: drAngelRivera.name,
    givenName: drAngelRivera.givenName,
    familyName: drAngelRivera.familyName,
    honorificSuffix: drAngelRivera.honorificSuffix,
    jobTitle: drAngelRivera.jobTitle,
    description: drAngelRivera.description,
    url: drAngelRivera.url,
    medicalSpecialty: drAngelRivera.medicalSpecialty,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NPI",
      value: drAngelRivera.npi,
    },
    affiliation: {
      "@type": "MedicalOrganization",
      "@id": CLINIC_SCHEMA_ID,
      name: business.legalName,
    },
  };
  if (drAngelRivera.image) data.image = drAngelRivera.image;

  return <JsonLd data={data} />;
}
