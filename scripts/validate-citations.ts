/**
 * Build-time citation validator.
 * Run via: npx tsx scripts/validate-citations.ts
 *
 * Enforces:
 *   - Every YMYL route has ≥ 3 citations
 *   - All citation URLs use allowlisted hosts
 */
import { ALLOWED_CITATION_HOSTS, isAllowedCitationHost } from "../src/lib/citations/allowed-hosts";
import { pageCitations, YMYL_ROUTES } from "../src/lib/citations/page-citations";

let errors = 0;

for (const path of YMYL_ROUTES) {
  const { citations } = pageCitations(path);

  if (citations.length < 3) {
    console.error(`[citations] ${path}: only ${citations.length} citation(s), need ≥ 3`);
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
        `[citations] ${path}: "${c.title}" uses disallowed host "${host}". ` +
        `Allowed: ${ALLOWED_CITATION_HOSTS.join(", ")}`
      );
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\n${errors} citation error(s). Fix before shipping.`);
  process.exit(1);
} else {
  console.log(`Citations OK — ${YMYL_ROUTES.length} YMYL routes validated.`);
}
