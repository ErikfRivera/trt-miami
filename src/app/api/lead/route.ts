import { NextResponse } from "next/server";
import { getClientIp, hashIp } from "@/lib/lead/client-ip";
import { insertLead, leadStorageConfigured } from "@/lib/lead/db";
import { deriveClientId, sendGa4Event } from "@/lib/lead/ga4-server";
import { checkRateLimit } from "@/lib/lead/rate-limit";
import { parseLeadInput, validateLead } from "@/lib/lead/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessBody = { ok: true; id: string; message: string };
type FailureBody = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

async function readPayload(req: Request): Promise<FormData | Record<string, unknown> | null> {
  const contentType = req.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await req.json()) as Record<string, unknown> | null;
      return body && typeof body === "object" ? body : null;
    }
    return await req.formData();
  } catch {
    return null;
  }
}

function nullable(value: string): string | null {
  return value.length > 0 ? value : null;
}

export async function POST(req: Request): Promise<NextResponse<SuccessBody | FailureBody>> {
  const ip = getClientIp(req.headers);
  const limit = checkRateLimit(ip);
  if (!limit.ok) {
    return NextResponse.json<FailureBody>(
      { ok: false, message: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const payload = await readPayload(req);
  if (!payload) {
    return NextResponse.json<FailureBody>(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const lead = parseLeadInput(payload);

  if (lead.honeypot.length > 0) {
    return NextResponse.json<SuccessBody>(
      { ok: true, id: "honeypot", message: "Thanks. We'll be in touch shortly." },
      { status: 200 },
    );
  }

  const fieldErrors = validateLead(lead);
  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json<FailureBody>(
      {
        ok: false,
        message: fieldErrors.form ?? "Please correct the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    );
  }

  if (!leadStorageConfigured()) {
    console.error("lead.storage_not_configured");
    return NextResponse.json<FailureBody>(
      {
        ok: false,
        message:
          "We couldn't save your message right now. Please call us or try again in a few minutes.",
      },
      { status: 503 },
    );
  }

  const ipHash = hashIp(ip);
  const userAgent = req.headers.get("user-agent");
  const referer = req.headers.get("referer");

  let saved: { id: string; createdAt: string };
  try {
    saved = await insertLead(lead, {
      sourcePath: nullable(lead.sourcePath),
      userAgent,
      referer,
      ipHash,
      utm: {
        source: nullable(lead.utmSource),
        medium: nullable(lead.utmMedium),
        campaign: nullable(lead.utmCampaign),
        term: nullable(lead.utmTerm),
        content: nullable(lead.utmContent),
      },
    });
  } catch (err) {
    console.error("lead.insert_failed", {
      ipHash,
      error: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json<FailureBody>(
      {
        ok: false,
        message:
          "We couldn't save your message right now. Please call us or try again in a few minutes.",
      },
      { status: 500 },
    );
  }

  const clientId =
    lead.ga4ClientId && /^\d+\.\d+$/.test(lead.ga4ClientId)
      ? lead.ga4ClientId
      : deriveClientId(ipHash);

  const ga4Ok = await sendGa4Event(clientId, [
    {
      name: "lead_submit",
      params: {
        lead_id: saved.id,
        lead_source: "trt_miami_contact_form",
        source_path: nullable(lead.sourcePath),
        contact_method: lead.contactMethod,
        has_email: Boolean(lead.email),
        has_phone: Boolean(lead.phone),
      },
    },
  ]);

  console.info("lead.captured", {
    leadId: saved.id,
    createdAt: saved.createdAt,
    ipHash,
    contactMethod: lead.contactMethod,
    hasEmail: Boolean(lead.email),
    hasPhone: Boolean(lead.phone),
    ga4Delivered: ga4Ok,
  });

  return NextResponse.json<SuccessBody>(
    {
      ok: true,
      id: saved.id,
      message:
        "Thanks. Your request is in — we'll contact you shortly to discuss next steps.",
    },
    { status: 200 },
  );
}
