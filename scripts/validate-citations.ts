/**
 * Build-time citation validator.
 * Run via: npx tsx scripts/validate-citations.ts
 *
 * Enforces:
 *   - Every YMYL route has ≥ 3 citations
 *   - All citation URLs use allowlisted hosts
 *   - Every YMYL route's page.tsx actually imports and renders <CitationBlock>
 *     (STR-105 shipped citation data without wiring 4 routes; STR-129 caught it
 *     after deploy. Source-level grep keeps that class of bug out of prod.)
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { ALLOWED_CITATION_HOSTS, isAllowedCitationHost } from "../src/lib/citations/allowed-hosts";
import { pageCitations, YMYL_ROUTES } from "../src/lib/citations/page-citations";

const APP_DIR = path.resolve(__dirname, "..", "src", "app");

function routeToPageFile(route: string): string {
  // "/" → src/app/page.tsx
  // "/trt-cost/" → src/app/trt-cost/page.tsx
  const segment = route.replace(/^\/|\/$/g, "");
  return segment.length === 0
    ? path.join(APP_DIR, "page.tsx")
    : path.join(APP_DIR, segment, "page.tsx");
}

let errors = 0;

for (const route of YMYL_ROUTES) {
  const { citations } = pageCitations(route);

  if (citations.length < 3) {
    console.error(`[citations] ${route}: only ${citations.length} citation(s), need ≥ 3`);
    errors++;
  }

  for (const c of citations) {
    if (!isAllowedCitationHost(c.url)) {
      let host: string;
      try {
        host = new URL(c.url).hostname;
      } catch {
        host = c.url;
      }
      console.error(
        `[citations] ${route}: "${c.title}" uses disallowed host "${host}". ` +
        `Allowed: ${ALLOWED_CITATION_HOSTS.join(", ")}`
      );
      errors++;
    }
  }

  const pageFile = routeToPageFile(route);
  let source: string;
  try {
    source = readFileSync(pageFile, "utf8");
  } catch {
    console.error(`[citations] ${route}: page file not found at ${pageFile}`);
    errors++;
    continue;
  }
  const importsCitationBlock = /from\s+["']@\/components\/citation-block["']/.test(source);
  const rendersCitationBlock = /<CitationBlock\b/.test(source);
  if (!importsCitationBlock || !rendersCitationBlock) {
    console.error(
      `[citations] ${route}: page.tsx does not render <CitationBlock>. ` +
      `Citation data exists but is not visible on the page.`
    );
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} citation error(s). Fix before shipping.`);
  process.exit(1);
} else {
  console.log(`Citations OK — ${YMYL_ROUTES.length} YMYL routes validated (data + wiring).`);
}
