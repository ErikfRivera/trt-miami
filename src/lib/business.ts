export const business = {
  name: "Strong Health TRT Therapy Miami",
  schemaName: "Strong Health Miami",
  legalName: "Strong Health",
  url: "https://stronghealth.com",
  image: "https://stronghealth.com/images/strong-health-miami-clinic.jpg",
  priceRange: "$$",
  // Scaffolding placeholders per CEO policy on STR-26. Real NAP + phone land via
  // STR-47 (publish gate) and STR-32 (call tracking). Do not change without
  // checking those tickets.
  phone: {
    raw: "3055550100",
    e164: "+13055550100",
    e164Hyphenated: "+1-305-555-0100",
    display: "(305) 555-0100",
    href: "tel:+13055550100",
  },
  address: {
    streetAddress: "",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "",
    addressCountry: "US",
    displayLine1: "TBD — Miami, FL",
    displayLine2: "",
  },
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
  map: {
    embedSrc:
      "https://maps.google.com/maps?q=Miami%2C+FL&t=&z=11&ie=UTF8&iwloc=&output=embed",
    title: "Map of Miami, FL — Strong Health Miami service area",
  },
} as const;

export type Business = typeof business;
