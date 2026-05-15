/**
 * Build-time guard against literal `{TOKEN}` placeholders surviving into
 * rendered HTML (STR-132 §4).
 *
 * Background: a leaked `{PHYSICIAN_NAME}` token shipped to production inside
 * the physician bio's meta description and H1 because the registry stored the
 * summary string as a template fragment that no interpolator ever filled.
 * Once that bug bit, there was no automated guard to catch the same shape of
 * defect again.
 *
 * This script scans the static export under `.next/server/app` for any
 * `\{[A-Z][A-Z0-9_]*\}` token that survived rendering. Found tokens are
 * printed with file path and surrounding context, and the script exits with
 * a non-zero status so CI / the deploy pipeline fail loud instead of shipping
 * silently-broken HTML.
 *
 * Run via: npx tsx scripts/validate-template-tokens.ts
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const RENDERED_DIR = path.resolve(__dirname, "../.next/server/app");
const TOKEN_RE = /\{[A-Z][A-Z0-9_]*\}/g;
// Tokens that legitimately appear in built artifacts (e.g. Next.js code splits
// or third-party libs) belong here. Keep this list tight — every entry is a
// gap in the guard.
const ALLOWED_TOKENS = new Set<string>([]);

type Hit = { file: string; token: string; snippet: string };

async function* walk(dir: string): AsyncGenerator<string> {
  let entries: import("node:fs").Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && /\.(html|rsc|txt|json)$/i.test(entry.name)) {
      yield full;
    }
  }
}

async function main() {
  const stat = await fs.stat(RENDERED_DIR).catch(() => null);
  if (!stat) {
    console.error(
      `[template-tokens] Missing build output at ${RENDERED_DIR}. Run \`npm run build\` first.`,
    );
    process.exit(2);
  }

  const hits: Hit[] = [];
  for await (const file of walk(RENDERED_DIR)) {
    const content = await fs.readFile(file, "utf8");
    const matches = content.matchAll(TOKEN_RE);
    for (const match of matches) {
      const token = match[0];
      if (ALLOWED_TOKENS.has(token)) continue;
      const start = Math.max(0, (match.index ?? 0) - 40);
      const end = Math.min(content.length, (match.index ?? 0) + token.length + 40);
      const snippet = content.slice(start, end).replace(/\s+/g, " ").trim();
      hits.push({
        file: path.relative(process.cwd(), file),
        token,
        snippet,
      });
    }
  }

  if (hits.length === 0) {
    console.log("[template-tokens] OK — no `{TOKEN}` placeholders found in rendered output.");
    return;
  }

  console.error(`[template-tokens] FAIL — ${hits.length} leaked token(s):`);
  for (const hit of hits) {
    console.error(`  • ${hit.token} in ${hit.file}`);
    console.error(`    …${hit.snippet}…`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error("[template-tokens] crashed:", err);
  process.exit(2);
});
