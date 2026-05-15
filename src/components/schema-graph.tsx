import { JsonLd } from "@/components/json-ld";
import { buildGraph } from "@/lib/schema/graph";
import type { SchemaNode } from "@/lib/schema/types";

type SchemaGraphProps = {
  nodes: readonly SchemaNode[];
};

export function SchemaGraph({ nodes }: SchemaGraphProps) {
  return <JsonLd data={buildGraph(...nodes)} />;
}
