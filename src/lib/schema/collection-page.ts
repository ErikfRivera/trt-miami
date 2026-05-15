import { hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { absoluteUrl, type SitePath } from "@/lib/site";
import type { SchemaNode } from "./types";
import { physicianId } from "./ids";

export type CollectionPageInput = {
  pagePath: SitePath;
  name: string;
  description: string;
  physicianUrls: readonly string[];
};

export const buildCollectionPage = (input: CollectionPageInput): SchemaNode => {
  const node: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.pagePath)}#collection`,
    url: absoluteUrl(input.pagePath),
    name: input.name,
    description: input.description,
  };
  // STR-137 — only build an ItemList of physicians when those Person nodes
  // are actually emitted in the graph. Otherwise the list entries would
  // point at unresolvable @ids.
  if (hasVerifiedMedicalDirector && input.physicianUrls.length > 0) {
    node.mainEntity = {
      "@type": "ItemList",
      itemListElement: input.physicianUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": physicianId(url) },
      })),
    };
  }
  return node as SchemaNode;
};
