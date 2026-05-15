/**
 * Post-build JSON-LD duplication guard (STR-134).
 *
 * Walks every static HTML page emitted by `next build` into
 * `.next/server/app/**`, extracts every `<script type="application/ld+json">`
 * block, merges all `@graph` arrays per route, and fails the build if any
 * top-level `@type` appears more than once with the same `@id` (or more than
 * once at all when `@id` is missing).
 *
 * The audit in STR-134 caught 7 YMYL routes shipping duplicate
 * `MedicalWebPage` / `BreadcrumbList` nodes because two components were each
 * emitting their own `@graph` block with the same nodes. The fix moved
 * emission into a single `<SchemaGraph>` per page and added a de-dupe layer
 * in `buildGraph`. This script is the regression gate.
 *
 * Run via: npx tsx scripts/validate-schema-dedup.ts
 * Prereq: `next build` must have populated `.next/server/app`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = join(__dirname, "..");
const HTML_DIR = join(ROOT, ".next/server/app");

const LD_JSON_RE =
  /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

type JsonNode = Record<string, unknown>;

function findHtml(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) findHtml(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function extractGraphNodes(html: string): JsonNode[] {
  const nodes: JsonNode[] = [];
  for (const match of html.matchAll(LD_JSON_RE)) {
    const raw = match[1].trim();
    if (!raw) continue;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      continue;
    }
    if (parsed && typeof parsed === "object" && "@graph" in (parsed as object)) {
      const graph = (parsed as { "@graph": unknown })["@graph"];
      if (Array.isArray(graph)) {
        for (const node of graph) {
          if (node && typeof node === "object") nodes.push(node as JsonNode);
        }
      }
    }
  }
  return nodes;
}

function typeKey(node: JsonNode): string {
  const t = node["@type"];
  if (typeof t === "string") return t;
  if (Array.isArray(t)) return [...t].sort().join("|");
  return "<no-type>";
}

type DupeReport = {
  route: string;
  type: string;
  count: number;
  ids: string[];
};

function dupes(route: string, nodes: JsonNode[]): DupeReport[] {
  // For nodes with the same @type, every distinct @id is OK (different
  // entities). The violation is a @type appearing twice with the SAME @id
  // (or twice with no @id at all). buildGraph already merges same-@id nodes,
  // so seeing them here means a script tag was emitted outside the de-dupe
  // path.
  const buckets = new Map<string, string[]>();
  for (const node of nodes) {
    const type = typeKey(node);
    const id = typeof node["@id"] === "string" ? (node["@id"] as string) : "";
    const key = `${type}::${id}`;
    const list = buckets.get(key) ?? [];
    list.push(id);
    buckets.set(key, list);
  }
  const reports: DupeReport[] = [];
  for (const [key, ids] of buckets) {
    if (ids.length > 1) {
      const [type] = key.split("::");
      reports.push({ route, type, count: ids.length, ids });
    }
  }
  return reports;
}

let errors = 0;
const files = findHtml(HTML_DIR);
if (files.length === 0) {
  console.error(`[schema-dedup] no static HTML in ${HTML_DIR}. Run \`next build\` first.`);
  process.exit(1);
}

for (const file of files) {
  const route = "/" + relative(HTML_DIR, file).replace(/\.html$/, "");
  const html = readFileSync(file, "utf8");
  const nodes = extractGraphNodes(html);
  if (nodes.length === 0) continue;
  const reports = dupes(route, nodes);
  for (const r of reports) {
    const idLabel = r.ids[0] ? ` @id=${r.ids[0]}` : " (no @id)";
    console.error(
      `[schema-dedup] ${r.route}: duplicate \`${r.type}\` × ${r.count}${idLabel}`,
    );
    errors++;
  }
}

if (errors > 0) {
  console.error(`[schema-dedup] ${errors} duplicate node(s) found across ${files.length} route(s)`);
  process.exit(1);
}
console.log(`[schema-dedup] OK — ${files.length} route(s) checked, no duplicate same-@id nodes`);
