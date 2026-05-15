import { drAngelRivera, type Physician } from "@/lib/physician";
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import {
  isVerifiedLicense,
  isVerifiedNpi,
  licenseVerificationUrl,
} from "@/lib/providers/verification-urls";
import { HOME_BUSINESS_ID, physicianId } from "./ids";
import type { SchemaNode } from "./types";

const isVerified = (value: string): boolean =>
  Boolean(value) && !value.startsWith("PENDING");

// STR-128 §8 — emit the doctor as a `Person` (the human) rather than the
// org-typed `Physician` schema. The `MedicalBusiness` on /about/ already
// represents the clinical entity; the physician is a person who `worksFor`
// that business. This avoids two clashing schema identities for the same
// individual and lines up with Google's E-E-A-T author/reviewer model.
//
// STR-137 — `buildPhysician` is kept emitting a complete node from raw data
// so the schema-id parity check still exercises it. Pages that publish the
// reviewer entity should call `physicianSchemaNode()` below, which respects
// the `hasVerifiedMedicalDirector` flag and returns null when no real
// medical director identity has been published yet.
export const buildPhysician = (physician: Physician = drAngelRivera): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "Person",
    "@id": physicianId(physician.url),
    name: physician.name,
    givenName: physician.givenName,
    familyName: physician.familyName,
    honorificPrefix: physician.honorificPrefix,
    honorificSuffix: physician.honorificSuffix,
    jobTitle: physician.jobTitle,
    description: physician.description,
    url: physician.url,
    knowsAbout: physician.knowsAbout,
    worksFor: { "@id": HOME_BUSINESS_ID },
    hasOccupation: {
      "@type": "MedicalOccupation",
      name: "Physician",
      medicalSpecialty: physician.medicalSpecialty,
      occupationLocation: { "@id": HOME_BUSINESS_ID },
    },
  };

  const identifiers: Record<string, unknown>[] = [];
  if (isVerifiedNpi(physician.npi)) {
    identifiers.push({ "@type": "PropertyValue", propertyID: "NPI", value: physician.npi });
  }
  if (identifiers.length > 0) node.identifier = identifiers;

  // STR-128 §5 — hasCredential drives Google's E-E-A-T credential signal.
  // Emit MD, license, and board certification entries. Each entry is dropped
  // when its source value is still a placeholder so we never publish credible-
  // looking-but-fake credentials to crawlers.
  const credentials: Record<string, unknown>[] = [];
  credentials.push({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    educationalLevel: "MD",
    name: "Doctor of Medicine (MD)",
    recognizedBy: isVerified(physician.medicalSchool)
      ? { "@type": "EducationalOrganization", name: physician.medicalSchool }
      : undefined,
  });
  if (isVerifiedLicense(physician.license)) {
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Florida Medical License",
      recognizedBy: { "@type": "Organization", name: physician.licensingBoard },
      identifier: `FL #${physician.license}`,
      validFor: "P2Y",
      url: licenseVerificationUrl(physician.license),
    });
  } else {
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "Florida Medical License",
      recognizedBy: { "@type": "Organization", name: physician.licensingBoard },
    });
  }
  if (isVerified(physician.boardCertification)) {
    credentials.push({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: physician.boardCertification,
      recognizedBy: isVerified(physician.boardCertificationIssuer)
        ? { "@type": "Organization", name: physician.boardCertificationIssuer }
        : undefined,
      dateCreated: isVerified(physician.boardCertificationYear)
        ? physician.boardCertificationYear
        : undefined,
    });
  }
  node.hasCredential = credentials.map(stripUndefined);

  if (isVerified(physician.medicalSchool)) {
    node.alumniOf = [
      { "@type": "EducationalOrganization", name: physician.medicalSchool },
    ];
  }
  node.memberOf = physician.memberOf.map((name) => ({ "@type": "Organization", name }));

  // STR-128 §6 — sameAs anchors the Person entity to external authoritative
  // profiles. Only emit URLs whose source slug/identifier is a real value;
  // PENDING_* slugs would point at 404s and degrade trust signals.
  const sameAs: string[] = [];
  if (isVerified(physician.doximitySlug)) sameAs.push(`https://www.doximity.com/pub/${physician.doximitySlug}`);
  if (isVerified(physician.linkedinSlug)) sameAs.push(`https://www.linkedin.com/in/${physician.linkedinSlug}`);
  if (isVerifiedLicense(physician.license)) sameAs.push(licenseVerificationUrl(physician.license));
  if (sameAs.length > 0) node.sameAs = sameAs;

  if (physician.image) node.image = physician.image;
  return node as SchemaNode;
};

// STR-137 — flag-gated emission helper. Page schema arrays should use this
// instead of `buildPhysician()` directly so the Physician/Person node is
// only published when a real medical director has been verified.
export const physicianSchemaNode = (
  physician: Physician = drAngelRivera,
): SchemaNode | null => (hasVerifiedMedicalDirector ? buildPhysician(physician) : null);

const stripUndefined = (
  record: Record<string, unknown>,
): Record<string, unknown> => {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
};
