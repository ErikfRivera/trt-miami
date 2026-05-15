import { business } from "@/lib/business";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: business.name,
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
