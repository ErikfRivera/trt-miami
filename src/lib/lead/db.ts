import { neon } from "@neondatabase/serverless";
import type { LeadInput } from "./validate";

export type LeadStorageMeta = {
  sourcePath: string | null;
  userAgent: string | null;
  referer: string | null;
  ipHash: string;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    term: string | null;
    content: string | null;
  };
};

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  contact_method: string;
  notes: string | null;
  source_path: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  user_agent: string | null;
  referer: string | null;
  ip_hash: string;
};

let schemaReady: Promise<void> | null = null;

function getConnectionString(): string | null {
  return (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    null
  );
}

function getSql() {
  const url = getConnectionString();
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    const sql = getSql();
    await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        name TEXT NOT NULL,
        email TEXT,
        phone TEXT,
        contact_method TEXT NOT NULL DEFAULT 'either',
        notes TEXT,
        source_path TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_term TEXT,
        utm_content TEXT,
        user_agent TEXT,
        referer TEXT,
        ip_hash TEXT NOT NULL
      )
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)
    `;
  })().catch((err) => {
    schemaReady = null;
    throw err;
  });
  return schemaReady;
}

export function leadStorageConfigured(): boolean {
  return Boolean(getConnectionString());
}

export async function insertLead(
  lead: LeadInput,
  meta: LeadStorageMeta,
): Promise<{ id: string; createdAt: string }> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO leads (
      name, email, phone, contact_method, notes,
      source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      user_agent, referer, ip_hash
    ) VALUES (
      ${lead.name},
      ${lead.email || null},
      ${lead.phone || null},
      ${lead.contactMethod},
      ${lead.message || null},
      ${meta.sourcePath},
      ${meta.utm.source},
      ${meta.utm.medium},
      ${meta.utm.campaign},
      ${meta.utm.term},
      ${meta.utm.content},
      ${meta.userAgent},
      ${meta.referer},
      ${meta.ipHash}
    )
    RETURNING id, created_at
  `) as Array<{ id: string; created_at: string }>;

  const row = rows[0];
  if (!row) throw new Error("Insert returned no rows");
  return { id: row.id, createdAt: row.created_at };
}

export async function fetchLeadsSince(since: Date): Promise<LeadRow[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT id, created_at, name, email, phone, contact_method, notes,
           source_path, utm_source, utm_medium, utm_campaign, utm_term, utm_content,
           user_agent, referer, ip_hash
    FROM leads
    WHERE created_at > ${since.toISOString()}
    ORDER BY created_at ASC
  `) as LeadRow[];
  return rows;
}

export async function countLeads(): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`SELECT COUNT(*)::int AS n FROM leads`) as Array<{ n: number }>;
  return rows[0]?.n ?? 0;
}
