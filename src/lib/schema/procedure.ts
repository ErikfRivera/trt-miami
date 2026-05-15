import { absoluteUrl, type SitePath } from "@/lib/site";
import { drAngelRivera } from "@/lib/physician";
import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { HOME_BUSINESS_ID, physicianId, procedureId } from "./ids";
import type { SchemaNode } from "./types";

export type MedicalProcedureInput = {
  pagePath: SitePath;
  name: string;
  alternateNames?: readonly string[];
  howPerformed: string;
  preparation?: string;
  followup?: string;
  indications: readonly string[];
  bodyLocation?: string;
  performerPhysicianUrl?: string;
};

export const buildMedicalProcedure = (input: MedicalProcedureInput): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "MedicalProcedure",
    "@id": procedureId(input.pagePath),
    name: input.name,
    procedureType: "https://schema.org/TherapeuticProcedure",
    howPerformed: input.howPerformed,
    indication: input.indications.map((name) => ({
      "@type": "MedicalIndication",
      name,
    })),
    url: absoluteUrl(input.pagePath),
  };
  if (input.alternateNames?.length) node.alternateName = input.alternateNames;
  if (input.preparation) node.preparation = input.preparation;
  if (input.followup) node.followup = input.followup;
  if (input.bodyLocation) node.bodyLocation = input.bodyLocation;
  // STR-137 — performer falls back to the clinic (MedicalBusiness) while no
  // verified medical director is published. Once the flag flips back to true,
  // the named physician resumes the performer slot.
  if (hasVerifiedMedicalDirector) {
    const performerUrl = input.performerPhysicianUrl ?? drAngelRivera.url;
    node.performer = { "@id": physicianId(performerUrl) };
  } else {
    node.performer = { "@id": HOME_BUSINESS_ID };
  }
  return node as SchemaNode;
};
