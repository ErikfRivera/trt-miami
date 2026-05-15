import type { SchemaGraph, SchemaNode } from "./types";

const typeKey = (node: SchemaNode): string => {
  const t = node["@type"];
  return Array.isArray(t) ? [...t].sort().join("|") : t;
};

const dedupeKey = (node: SchemaNode): string => {
  const id = node["@id"];
  if (typeof id === "string" && id.length > 0) return `id:${id}`;
  return `type:${typeKey(node)}`;
};

const mergeNodes = (a: SchemaNode, b: SchemaNode): SchemaNode => {
  const merged: Record<string, unknown> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (merged[k] === undefined) merged[k] = v;
  }
  return merged as SchemaNode;
};

// Deduplicates @graph nodes by `@id` (falling back to `@type` when `@id` is
// missing). When two nodes share a key, the more-complete node (more keys)
// wins and any keys present on the loser but absent on the winner are merged
// in. Same-@id nodes that legitimately describe the same entity (e.g. the
// page's MedicalWebPage and the citation block's MedicalWebPage with the
// shared `#medical-page` @id) are coalesced into one node — which is the
// schema-correct representation.
export const dedupeNodes = (nodes: readonly SchemaNode[]): SchemaNode[] => {
  const byKey = new Map<string, SchemaNode>();
  for (const node of nodes) {
    const key = dedupeKey(node);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, node);
      continue;
    }
    const existingKeyCount = Object.keys(existing).length;
    const incomingKeyCount = Object.keys(node).length;
    const [winner, loser] =
      incomingKeyCount > existingKeyCount ? [node, existing] : [existing, node];
    byKey.set(key, mergeNodes(winner, loser));
  }
  return Array.from(byKey.values());
};

export const buildGraph = (...nodes: SchemaNode[]): SchemaGraph => ({
  "@context": "https://schema.org",
  "@graph": dedupeNodes(nodes),
});
