// Scaffolding placeholders per CEO policy. Real NAP, phone, and Google Business
// Profile values land via STR-2 (publish gate) and STR-32 (call tracking). Do
// not change without coordinating with those tickets.
export const business = {
  // Canonical sitewide brand label (geo-neutral). Used as the OpenGraph
  // siteName, footer brand, applicationName, and other sitewide chrome where
  // a Miami suffix would leak the wrong geo onto non-Miami spoke pages
  // (STR-119). Miami-specific surfaces (page titles, H1s, schema MedicalBusiness
  // `name`) carry the Miami signal explicitly; this brand label must stay
  // geo-neutral. The JSON-LD MedicalBusiness.name is `schemaName`, not `name`.
  name: "Strong Health TRT Therapy",
  schemaName: "Strong Health Miami",
  legalName: "Strong Health",
  url: "https://stronghealth.com",
  image: "https://stronghealth.com/images/strong-health-miami-clinic.jpg",
  logo: "https://stronghealth.com/images/strong-health-logo-512.png",
  priceRange: "$$",
  // TODO: STR-2 — replace placeholder phone with the canonical NAP phone.
  phone: {
    raw: "3055550100",
    e164: "+13055550100",
    e164Hyphenated: "+1-305-555-0100",
    display: "(305) 555-0100",
    href: "tel:+13055550100",
  },
  // TODO: STR-2 — fill in streetAddress + postalCode + display lines.
  address: {
    streetAddress: "",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "",
    addressCountry: "US",
    displayLine1: "TBD — Miami, FL",
    displayLine2: "",
  },
  // TODO: STR-2 — replace with the surveyed clinic coordinates.
  geo: {
    latitude: 25.7617,
    longitude: -80.1918,
  },
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "18:00" },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],
  medicalSpecialty: ["Endocrine", "PrimaryCare", "Urologic"],
  areaServed: [
    "Miami",
    "Miami Beach",
    "Coral Gables",
    "Brickell",
    "Doral",
    "Aventura",
    "Wynwood",
    "Pinecrest",
    "Coconut Grove",
    "Kendall",
    "Fort Lauderdale",
  ],
  // TODO: STR-2 — supply the verified Google Business Profile CID + Place ID
  // and replace the placeholder embedSrc with the surveyed iframe src. The
  // sameAs CID URL is computed from `gbp.cid`; embedSrc is rendered into the
  // location map iframe.
  gbp: {
    cid: "0000000000000000000",
    placeId: "PLACEHOLDER_PLACE_ID",
    embedSrc:
      "https://maps.google.com/maps?q=Miami%2C+FL&t=&z=11&ie=UTF8&iwloc=&output=embed",
    embedTitle: "Map of Miami, FL — Strong Health Miami service area",
  },
  social: {
    // TODO: STR-2 — populate with verified profile URLs once the GBP/social
    // accounts are claimed. Empty strings are filtered out of `sameAs`.
    facebook: "",
    instagram: "",
    linkedin: "",
  },
  // Legacy alias for the location map iframe; new code should read
  // `business.gbp.embedSrc` / `business.gbp.embedTitle` directly.
  map: {
    embedSrc:
      "https://maps.google.com/maps?q=Miami%2C+FL&t=&z=11&ie=UTF8&iwloc=&output=embed",
    title: "Map of Miami, FL — Strong Health Miami service area",
  },
} as const;

export type Business = typeof business;
