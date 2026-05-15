import { JsonLd } from "@/components/json-ld";
import { buildGraph } from "@/lib/schema/graph";
import type { SchemaNode } from "@/lib/schema/types";

type SchemaGraphProps = {
  // STR-137 — accept null/undefined so flag-gated schema builders (e.g. the
  // physician node) can return null and be filtered out in one place.
  nodes: ReadonlyArray<SchemaNode | null | undefined>;
};

export function SchemaGraph({ nodes }: SchemaGraphProps) {
  const present = nodes.filter((n): n is SchemaNode => Boolean(n));
  return <JsonLd data={buildGraph(...present)} />;
}
