// Build-time loader for YMYL TRT copy docs (STR-164).
//
// Each doc lives at `src/content/ymyl/<slug>.md` and ships with a YAML
// frontmatter block followed by a body that contains:
//   - a byline paragraph using `{{TOKEN}}` placeholders (stripped here and
//     re-rendered by `<YmylByline />` so unresolved tokens never reach HTML),
//   - a single `# H1` line (stripped here; the page header renders the H1),
//   - prose with `## H2` / `### H3` sections and inline citation refs `[N]`,
//   - a `## FAQ` (or `## Frequently asked questions`) section,
//   - a `## References` numbered list (dropped — the page renders the
//     allowlisted citation set through `<CitationBlock />` instead).
//
// `loadYmylDoc(slug)` runs once at server-module load, so each page imports
// it at module top-level and the parsing happens at build time.

import { readFileSync } from "node:fs";
import path from "node:path";
import type { FaqItem } from "@/lib/schema/types";

export type YmylFrontmatter = {
  title: string;
  meta_description: string;
  h1?: string;
  route?: string;
  slug?: string;
};

export type YmylDoc = {
  slug: string;
  frontmatter: YmylFrontmatter;
  /** Body markdown with frontmatter, byline, H1, FAQ, and References stripped. */
  body: string;
  /** Q&A pairs extracted from the FAQ section. */
  faqs: readonly FaqItem[];
};

const CONTENT_DIR = path.resolve(process.cwd(), "src/content/ymyl");

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
const BYLINE_RE = /^\*?By .+\*?\s*\n\*?Medically reviewed by .+\*?\s*\n/;
const SINGLE_BYLINE_RE = /^\*?By .+\*?\s*\n/;
const H1_RE = /^# .+\n+/;
const FAQ_HEADING_RE = /^## (FAQ|Frequently asked questions)\s*$/im;
const REFERENCES_HEADING_RE = /^## References\s*$/im;

function parseFrontmatter(raw: string): { fm: YmylFrontmatter; rest: string } {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) {
    throw new Error("YMYL doc missing frontmatter block");
  }
  const [, yamlText, rest] = match;
  const fm: Record<string, string> = {};
  for (const line of yamlText.split("\n")) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (!m) continue;
    const [, key, rawVal] = m;
    let value = rawVal.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    fm[key] = value;
  }
  if (!fm.title || !fm.meta_description) {
    throw new Error("YMYL frontmatter must define `title` and `meta_description`");
  }
  return { fm: fm as YmylFrontmatter, rest };
}

function extractFaqSection(body: string): { faqs: FaqItem[]; bodyWithoutFaq: string } {
  const startMatch = body.match(FAQ_HEADING_RE);
  if (!startMatch) return { faqs: [], bodyWithoutFaq: body };
  const start = startMatch.index ?? 0;
  const after = body.slice(start + startMatch[0].length);
  const endMatch = after.match(REFERENCES_HEADING_RE);
  const faqBlock = endMatch ? after.slice(0, endMatch.index ?? after.length) : after;
  const faqs = parseFaqBlock(faqBlock);
  return { faqs, bodyWithoutFaq: body.slice(0, start).trimEnd() };
}

function parseFaqBlock(block: string): FaqItem[] {
  const cleaned = block.replace(/^---\s*$/gm, "").trim();
  const items: FaqItem[] = [];

  const headingPattern = /^### (.+?)\s*$/gm;
  if (headingPattern.test(cleaned)) {
    headingPattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    const positions: { question: string; start: number; end: number }[] = [];
    while ((match = headingPattern.exec(cleaned)) !== null) {
      positions.push({
        question: match[1].trim(),
        start: match.index + match[0].length,
        end: cleaned.length,
      });
    }
    for (let i = 0; i < positions.length; i++) {
      if (i + 1 < positions.length) positions[i].end = positions[i + 1].start - `### ${positions[i + 1].question}`.length;
    }
    for (const pos of positions) {
      const answer = cleaned.slice(pos.start, pos.end).replace(/^###.*$/gm, "").trim();
      items.push({ question: pos.question, answer });
    }
    return items;
  }

  const lines = cleaned.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const qMatch = line.match(/^\*\*(.+?)\*\*\s*$/);
    if (qMatch) {
      const question = qMatch[1].trim();
      i++;
      const answerLines: string[] = [];
      while (i < lines.length) {
        const next = lines[i];
        if (/^\*\*(.+?)\*\*\s*$/.test(next)) break;
        if (next.trim() === "---") break;
        answerLines.push(next);
        i++;
      }
      const answer = answerLines.join("\n").trim();
      if (question && answer) items.push({ question, answer });
      continue;
    }
    i++;
  }
  return items;
}

function stripReferencesAndTrailingDivider(body: string): string {
  const refIdx = body.search(REFERENCES_HEADING_RE);
  let out = refIdx === -1 ? body : body.slice(0, refIdx);
  out = out.replace(/\n---\s*$/g, "");
  return out.trimEnd();
}

function stripFaqStrayHr(body: string): string {
  return body.replace(/\n---\n+(?=## )/g, "\n\n");
}

const cache = new Map<string, YmylDoc>();

export function loadYmylDoc(slug: string): YmylDoc {
  const cached = cache.get(slug);
  if (cached) return cached;
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = readFileSync(file, "utf8");
  const { fm, rest } = parseFrontmatter(raw);

  let body = rest.replace(/^\s+/, "");
  body = body.replace(BYLINE_RE, "");
  body = body.replace(SINGLE_BYLINE_RE, "");
  body = body.replace(/^\*Medically reviewed by .+\*\s*\n/, "");
  body = body.replace(/^Medically reviewed by .+\s*\n/, "");
  body = body.replace(H1_RE, "");

  const { faqs, bodyWithoutFaq } = extractFaqSection(body);
  let bodyClean = stripReferencesAndTrailingDivider(bodyWithoutFaq);
  bodyClean = stripFaqStrayHr(bodyClean);

  const leak = bodyClean.match(/\{\{[A-Z_]+\}\}/);
  if (leak) {
    throw new Error(
      `YMYL doc ${slug}: unsubstituted placeholder ${leak[0]} remains in body after byline strip — fix the source or extend the byline regex in loadYmylDoc`,
    );
  }

  const doc: YmylDoc = {
    slug,
    frontmatter: fm,
    body: bodyClean.trim(),
    faqs,
  };
  cache.set(slug, doc);
  return doc;
}
