import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { absoluteUrl, type SitePath } from "@/lib/site";
import { HOME_BUSINESS_ID, physicianId } from "./ids";
import type { SchemaNode } from "./types";

export type AboutPageInput = {
  pagePath: SitePath;
  name: string;
  description: string;
  founderPhysicianUrl?: string;
};

export const buildAboutPage = (input: AboutPageInput): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "AboutPage",
    "@id": `${absoluteUrl(input.pagePath)}#about`,
    url: absoluteUrl(input.pagePath),
    name: input.name,
    description: input.description,
    mainEntity: { "@id": HOME_BUSINESS_ID },
  };
  // STR-137 — the founder/about-the-physician reference depends on the
  // Physician/Person node existing in the graph. Skip the cross-reference
  // when that node is suppressed.
  if (input.founderPhysicianUrl && hasVerifiedMedicalDirector) {
    node.about = { "@id": physicianId(input.founderPhysicianUrl) };
  }
  return node as SchemaNode;
};
