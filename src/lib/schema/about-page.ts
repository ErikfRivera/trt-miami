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
  if (input.founderPhysicianUrl) {
    node.about = { "@id": physicianId(input.founderPhysicianUrl) };
  }
  return node as SchemaNode;
};
