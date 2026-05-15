import { absoluteUrl, type SitePath } from "@/lib/site";
import { HOME_BUSINESS_ID, serviceId } from "./ids";
import type { SchemaNode } from "./types";

export type ServiceInput = {
  pagePath: SitePath;
  serviceType: string;
  areaServed?: readonly string[];
  audience?: {
    suggestedGender?: "male" | "female";
    suggestedMinAge?: number;
  };
  offers?: {
    price?: string;
    priceCurrency?: string;
    bookingUrl: string;
  };
};

export const buildService = (input: ServiceInput): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "Service",
    "@id": serviceId(input.pagePath),
    serviceType: input.serviceType,
    provider: { "@id": HOME_BUSINESS_ID },
    url: absoluteUrl(input.pagePath),
  };
  if (input.areaServed?.length) {
    node.areaServed = input.areaServed.map((name) => ({ "@type": "City", name }));
  }
  if (input.audience) {
    node.audience = {
      "@type": "PeopleAudience",
      ...(input.audience.suggestedGender
        ? { suggestedGender: input.audience.suggestedGender }
        : {}),
      ...(typeof input.audience.suggestedMinAge === "number"
        ? { suggestedMinAge: input.audience.suggestedMinAge }
        : {}),
    };
  }
  if (input.offers) {
    node.offers = {
      "@type": "Offer",
      priceCurrency: input.offers.priceCurrency ?? "USD",
      // TODO: STR-2 — `price` is omitted until canonical pricing lands.
      ...(input.offers.price ? { price: input.offers.price } : {}),
      url: input.offers.bookingUrl,
      availability: "https://schema.org/InStock",
    };
  }
  return node as SchemaNode;
};
