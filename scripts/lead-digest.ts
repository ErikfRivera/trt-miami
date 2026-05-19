#!/usr/bin/env tsx
/**
 * STR-12 daily lead digest.
 *
 * Reads new rows from the `leads` table since the last digest (high-water mark
 * stored in `lead_digest_state`) and writes them as the description + a
 * comment of the current Paperclip run issue (the daily routine run).
 *
 * Expected env vars:
 * - DATABASE_URL              Neon connection (auto-loaded from .env.local)
 * - PAPERCLIP_API_URL         e.g. http://127.0.0.1:3100 (harness-injected)
 * - PAPERCLIP_API_KEY         run-scoped JWT (harness-injected)
 * - PAPERCLIP_TASK_ID         the routine run-issue id (harness-injected on wake)
 * - PAPERCLIP_RUN_ID          (optional) audit header
 * - LEAD_INBOX_ISSUE_ID       (optional) override target issue id (uuid)
 *
 * Run manually (must specify target):
 *   LEAD_INBOX_ISSUE_ID=<uuid> npx tsx scripts/lead-digest.ts
 */
import { neon } from "@neondatabase/serverless";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(): void {
  const candidates = [".env.local", ".env"];
  for (const file of candidates) {
    const p = resolve(process.cwd(), file);
    if (!existsSync(p)) continue;
    const content = readFileSync(p, "utf8");
    for (const line of content.split(/\r?\n/)) {
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq < 0) continue;
      const key = line.slice(0, eq).trim();
      let value = line.slice(eq + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

function need(name: string): string {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing required env var: ${name}`);
    process.exit(2);
  }
  return v;
}

function esc(value: string | null | undefined): string {
  if (value == null) return "—";
  return String(value)
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ")
    .trim() || "—";
}

function formatTable(rows: Array<Record<string, unknown>>): string {
  if (rows.length === 0) return "_No new leads since the previous digest._";
  const header = "| When (UTC) | Name | Email | Phone | Prefer | Source | UTM source / medium / campaign | Notes |";
  const sep = "|---|---|---|---|---|---|---|---|";
  const body = rows
    .map((r) => {
      const created = new Date(String(r.created_at)).toISOString().replace("T", " ").slice(0, 16);
      const utm = [r.utm_source, r.utm_medium, r.utm_campaign].filter(Boolean).join(" / ") || "—";
      const notes = r.notes ? String(r.notes).slice(0, 140) : "—";
      return `| ${esc(created)} | ${esc(r.name as string)} | ${esc(r.email as string)} | ${esc(r.phone as string)} | ${esc(r.contact_method as string)} | ${esc(r.source_path as string)} | ${esc(utm)} | ${esc(notes)} |`;
    })
    .join("\n");
  return `${header}\n${sep}\n${body}`;
}

async function main(): Promise<void> {
  loadEnvFile();
  const databaseUrl = need("DATABASE_URL");
  const apiUrl = need("PAPERCLIP_API_URL");
  const apiKey = need("PAPERCLIP_API_KEY");
  const inboxIssueId =
    process.env.LEAD_INBOX_ISSUE_ID || process.env.PAPERCLIP_TASK_ID;
  if (!inboxIssueId) {
    console.error(
      "Missing target issue: set LEAD_INBOX_ISSUE_ID or run from a Paperclip wake with PAPERCLIP_TASK_ID.",
    );
    process.exit(2);
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS lead_digest_state (
      id INTEGER PRIMARY KEY,
      last_digest_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  const stateRows = (await sql`SELECT last_digest_at FROM lead_digest_state WHERE id = 1`) as Array<{
    last_digest_at: string;
  }>;
  const lastDigestAt = stateRows[0]
    ? new Date(stateRows[0].last_digest_at)
    : new Date("1970-01-01T00:00:00Z");

  const now = new Date();
  const rows = (await sql`
    SELECT id, created_at, name, email, phone, contact_method, notes,
           source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content
    FROM leads
    WHERE created_at > ${lastDigestAt.toISOString()}
    ORDER BY created_at ASC
  `) as Array<Record<string, unknown>>;

  const window = `since ${lastDigestAt.toISOString()} (UTC)`;
  const table = formatTable(rows);
  const description = [
    `# Daily lead digest — ${now.toISOString().slice(0, 10)}`,
    "",
    `**${rows.length}** new lead(s) ${window}.`,
    "",
    table,
    "",
    "---",
    "",
    "_Source: `leads` table in Neon Postgres. Pipeline: [STR-12](/STR/issues/STR-12). Comment here or @-mention [FoundingEngineer](/STR/agents/foundingengineer) to redirect or change the digest cadence. CEO forwards to board via goal-thread when actioning._",
  ].join("\n");
  const summary = `Posted ${rows.length} new lead(s). Window: ${window}.`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };
  if (process.env.PAPERCLIP_RUN_ID) headers["X-Paperclip-Run-Id"] = process.env.PAPERCLIP_RUN_ID;

  const res = await fetch(`${apiUrl}/api/issues/${inboxIssueId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      description,
      comment: summary,
      status: "done",
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error(`Failed to update issue ${inboxIssueId}: HTTP ${res.status} — ${text.slice(0, 200)}`);
    process.exit(1);
  }

  await sql`
    INSERT INTO lead_digest_state (id, last_digest_at, updated_at)
    VALUES (1, ${now.toISOString()}, ${now.toISOString()})
    ON CONFLICT (id) DO UPDATE
      SET last_digest_at = EXCLUDED.last_digest_at,
          updated_at = EXCLUDED.updated_at
  `;

  console.log(`Posted digest with ${rows.length} new lead(s). Window: ${window}.`);
}

main().catch((err) => {
  console.error("lead-digest failed:", err instanceof Error ? err.stack ?? err.message : err);
  process.exit(1);
});
