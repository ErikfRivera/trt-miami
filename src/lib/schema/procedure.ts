import { absoluteUrl, type SitePath } from "@/lib/site";
import { drAngelRivera } from "@/lib/physician";
import { physicianId, procedureId } from "./ids";
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
  // Default to medical director if no explicit performer URL is supplied.
  const performerUrl = input.performerPhysicianUrl ?? drAngelRivera.url;
  node.performer = { "@id": physicianId(performerUrl) };
  return node as SchemaNode;
};
