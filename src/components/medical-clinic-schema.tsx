import { JsonLd } from "@/components/json-ld";
import { business } from "@/lib/business";

export const CLINIC_SCHEMA_ID = `${business.url}/#clinic`;

type MedicalClinicSchemaProps = {
  pageUrl?: string;
};

export function MedicalClinicSchema({ pageUrl }: MedicalClinicSchemaProps = {}) {
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: business.address.addressLocality,
    addressRegion: business.address.addressRegion,
    addressCountry: business.address.addressCountry,
  };
  if (business.address.streetAddress) address.streetAddress = business.address.streetAddress;
  if (business.address.postalCode) address.postalCode = business.address.postalCode;

  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": CLINIC_SCHEMA_ID,
    name: business.schemaName,
    legalName: business.legalName,
    url: pageUrl ?? business.url,
    image: business.image,
    telephone: business.phone.e164Hyphenated,
    priceRange: business.priceRange,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: business.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    medicalSpecialty: business.medicalSpecialty,
    areaServed: business.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
  };

  return <JsonLd data={data} />;
}
