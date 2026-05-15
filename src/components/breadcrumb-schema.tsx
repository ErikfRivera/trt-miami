import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, type SitePath } from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: SitePath;
};

type BreadcrumbSchemaProps = {
  items: readonly BreadcrumbItem[];
};

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };

  return <JsonLd data={data} />;
}
