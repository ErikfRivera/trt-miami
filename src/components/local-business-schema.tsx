import { JsonLd } from "@/components/json-ld";
import { business } from "@/lib/business";

export function LocalBusinessSchema() {
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
    "@type": "MedicalBusiness",
    name: business.name,
    telephone: business.phone.e164Hyphenated,
    address,
  };

  return <JsonLd data={data} />;
}
