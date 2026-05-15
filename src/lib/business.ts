export const business = {
  name: "Strong Health TRT Therapy Miami",
  legalName: "Strong Health",
  phone: {
    raw: "6197461616",
    e164: "+16197461616",
    display: "(619) 746-1616",
    href: "tel:+16197461616",
  },
  address: {
    streetAddress: "697 N Miami Avenue",
    addressLocality: "Miami",
    addressRegion: "FL",
    postalCode: "33136",
    addressCountry: "US",
    displayLine1: "697 N Miami Avenue",
    displayLine2: "Miami, FL 33136",
  },
  map: {
    embedSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22530153.459896617!2d-129.94270855!3d46.423669000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d955255e79dcf9%3A0x56b869070579702c!2sStrong%20Health!5e0!3m2!1sen!2sus!4v1778814072848!5m2!1sen!2sus",
    title: "Map showing Strong Health TRT Therapy Miami at 697 N Miami Avenue, Miami, FL 33136",
  },
} as const;

export type Business = typeof business;
