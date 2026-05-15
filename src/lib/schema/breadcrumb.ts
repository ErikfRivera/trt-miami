import { absoluteUrl, type SitePath } from "@/lib/site";
import { breadcrumbId } from "./ids";
import type { SchemaNode } from "./types";

export type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

export const buildBreadcrumbList = (
  items: readonly BreadcrumbItem[],
  pagePath: SitePath,
): SchemaNode =>
  ({
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(pagePath),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }) as SchemaNode;
