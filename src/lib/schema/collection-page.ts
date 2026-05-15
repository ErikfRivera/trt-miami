import { absoluteUrl, type SitePath } from "@/lib/site";
import type { SchemaNode } from "./types";
import { physicianId } from "./ids";

export type CollectionPageInput = {
  pagePath: SitePath;
  name: string;
  description: string;
  physicianUrls: readonly string[];
};

export const buildCollectionPage = (input: CollectionPageInput): SchemaNode =>
  ({
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(input.pagePath)}#collection`,
    url: absoluteUrl(input.pagePath),
    name: input.name,
    description: input.description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.physicianUrls.map((url, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": physicianId(url) },
      })),
    },
  }) as SchemaNode;
