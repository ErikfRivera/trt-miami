import { SchemaGraph } from "@/components/schema-graph";
import { buildBreadcrumbList, type BreadcrumbItem } from "@/lib/schema/breadcrumb";

export type { BreadcrumbItem };

type BreadcrumbSchemaProps = {
  items: readonly BreadcrumbItem[];
};

// Thin compatibility wrapper around the schema package. New code should call
// `buildBreadcrumbList` and pass it through `<SchemaGraph>` directly.
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (items.length === 0) return null;
  const pagePath = items[items.length - 1].path;
  return <SchemaGraph nodes={[buildBreadcrumbList(items, pagePath)]} />;
}
