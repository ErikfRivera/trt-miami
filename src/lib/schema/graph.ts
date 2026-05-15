import type { SchemaGraph, SchemaNode } from "./types";

export const buildGraph = (...nodes: SchemaNode[]): SchemaGraph => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
