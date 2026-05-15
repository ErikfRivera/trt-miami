import { business } from "@/lib/business";
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { absoluteUrl, type SitePath } from "@/lib/site";
import {
  HOME_BUSINESS_ID,
  branchBusinessId,
  physicianId,
  serviceId as serviceIdFor,
} from "./ids";
import type { SchemaNode } from "./types";

const postalAddress = (
  overrides: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  } = {},
): SchemaNode => {
  const out: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressLocality: overrides.addressLocality ?? business.address.addressLocality,
    addressRegion: overrides.addressRegion ?? business.address.addressRegion,
    addressCountry: overrides.addressCountry ?? business.address.addressCountry,
  };
  const street = overrides.streetAddress ?? business.address.streetAddress;
  if (street) out.streetAddress = street;
  const zip = overrides.postalCode ?? business.address.postalCode;
  if (zip) out.postalCode = zip;
  return out as SchemaNode;
};

const openingHours = () =>
  business.openingHours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  }));

// STR-139 — the placeholder GBP CID is a string of zeros until the Google
// Business Profile is claimed (STR-50). A Maps URL built from that placeholder
// resolves to a "no results" SERP, which Google Search Quality treats as a
// dangling sameAs and a misleading hasMap. Treat any placeholder CID as
// "no verified GBP" and drop the GBP-derived URL from sameAs + hasMap.
const isVerifiedGbpCid = (cid: string): boolean =>
  Boolean(cid) && !/^0+$/.test(cid) && !cid.startsWith("PLACEHOLDER");

const gbpMapUrl = (): string | null =>
  isVerifiedGbpCid(business.gbp.cid)
    ? `https://www.google.com/maps?cid=${business.gbp.cid}`
    : null;

const sameAsForBusiness = (): string[] => {
  // TODO: STR-2 — social handles are placeholder values until claimed; empty
  // strings drop out via the `Boolean` filter. The Maps CID URL is only
  // emitted once `gbp.cid` is verified (STR-50) — see `isVerifiedGbpCid`.
  const mapUrl = gbpMapUrl();
  const links = [
    mapUrl,
    business.social.facebook,
    business.social.instagram,
    business.social.linkedin,
  ].filter((s): s is string => Boolean(s));
  return links;
};

export type MedicalBusinessOptions = {
  serviceIds?: readonly string[];
  physicianUrls?: readonly string[];
  reviewIds?: readonly string[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
};

export const buildMedicalBusiness = (
  options: MedicalBusinessOptions = {},
): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "MedicalBusiness",
    "@id": HOME_BUSINESS_ID,
    name: business.schemaName,
    legalName: business.legalName,
    alternateName: "TRT Miami",
    url: business.url,
    logo: business.logo,
    image: business.image,
    telephone: business.phone.e164Hyphenated,
    priceRange: business.priceRange,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: openingHours(),
    medicalSpecialty: business.medicalSpecialty,
    areaServed: business.areaServed.map((name) => ({ "@type": "City", name })),
  };

  // STR-139 — only emit `hasMap` once the GBP CID is verified; otherwise the
  // URL points at a "no results" Maps SERP and degrades the entity signal.
  const mapUrl = gbpMapUrl();
  if (mapUrl) node.hasMap = mapUrl;
  const sameAs = sameAsForBusiness();
  if (sameAs.length > 0) node.sameAs = sameAs;

  if (options.serviceIds?.length) {
    node.availableService = options.serviceIds.map((id) => ({ "@id": id }));
  }
  // STR-137 — `employee` references the Physician/Person @id. That node is
  // only published while a verified medical director exists, so we omit
  // `employee` entirely in the unverified state rather than emitting a
  // dangling @id pointer to a non-existent node.
  if (hasVerifiedMedicalDirector && options.physicianUrls?.length) {
    node.employee = options.physicianUrls.map((url) => ({ "@id": physicianId(url) }));
  }
  if (options.reviewIds?.length) {
    node.review = options.reviewIds.map((id) => ({ "@id": id }));
  }
  if (options.aggregateRating) {
    node.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: String(options.aggregateRating.ratingValue),
      reviewCount: String(options.aggregateRating.reviewCount),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return node as SchemaNode;
};

export type BranchBusinessOptions = {
  branchPath: SitePath;
  branchName: string;
  city: string;
  // Optional overrides — when omitted the parent NAP is reused as a fallback
  // for placeholder builds. Real branch NAP values land via STR-2.
  streetAddress?: string;
  postalCode?: string;
  telephoneE164Hyphenated?: string;
  geo?: { latitude: number; longitude: number };
  gbpCid?: string;
};

export const buildBranchBusiness = (opts: BranchBusinessOptions): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "MedicalBusiness",
    "@id": branchBusinessId(opts.branchPath),
    name: opts.branchName,
    parentOrganization: { "@id": HOME_BUSINESS_ID },
    url: absoluteUrl(opts.branchPath),
    telephone: opts.telephoneE164Hyphenated ?? business.phone.e164Hyphenated,
    address: postalAddress({
      streetAddress: opts.streetAddress,
      addressLocality: opts.city,
      postalCode: opts.postalCode,
    }),
    areaServed: [{ "@type": "City", name: opts.city }],
    openingHoursSpecification: openingHours(),
  };
  if (opts.geo) {
    node.geo = {
      "@type": "GeoCoordinates",
      latitude: opts.geo.latitude,
      longitude: opts.geo.longitude,
    };
  }
  // TODO: STR-2 — branch GBP CID is required for the per-location sameAs link.
  if (opts.gbpCid) {
    node.sameAs = [`https://www.google.com/maps?cid=${opts.gbpCid}`];
  }
  return node as SchemaNode;
};

export type ServiceAreaOptions = {
  pagePath: SitePath;
  serviceType: string;
  areaName: string;
};

// Use this for area pages that target a neighborhood we *serve* but do not
// have a physical satellite in (per brief §2.4 — do NOT fabricate a branch
// LocalBusiness). Pairs the service-area place with the parent business
// `@id` so Google understands "service offered in area X by business Y".
export const buildServiceAreaService = (opts: ServiceAreaOptions): SchemaNode =>
  ({
    "@type": "Service",
    "@id": serviceIdFor(opts.pagePath),
    serviceType: opts.serviceType,
    provider: { "@id": HOME_BUSINESS_ID },
    areaServed: { "@type": "Place", name: opts.areaName },
    url: absoluteUrl(opts.pagePath),
  }) as SchemaNode;
