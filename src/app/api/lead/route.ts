import { NextResponse } from "next/server";
import { getClientIp, hashIp } from "@/lib/lead/client-ip";
import { leadEmailConfigured } from "@/lib/lead/config";
import { sendLeadEmail } from "@/lib/lead/email";
import { checkRateLimit } from "@/lib/lead/rate-limit";
import { parseLeadInput, validateLead } from "@/lib/lead/validate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SuccessBody = { ok: true; message: string; degraded?: true };
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
      { ok: true, message: "Thanks. We'll be in touch shortly." },
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

  const submittedAt = new Date().toISOString();
  const ipHash = hashIp(ip);
  const userAgent = req.headers.get("user-agent");
  const referer = req.headers.get("referer");

  if (!leadEmailConfigured()) {
    console.warn("lead.received", {
      submittedAt,
      ipHash,
      hasName: Boolean(lead.name),
      hasEmail: Boolean(lead.email),
      hasPhone: Boolean(lead.phone),
      contactMethod: lead.contactMethod,
      configured: false,
    });
    return NextResponse.json<SuccessBody>(
      {
        ok: true,
        degraded: true,
        message:
          "Thanks. We have your request and will reach out shortly. (Mail relay not yet configured in this environment.)",
      },
      { status: 202 },
    );
  }

  const result = await sendLeadEmail(lead, {
    submittedAt,
    ipHash,
    userAgent,
    referer,
  });

  if (!result.ok) {
    console.error("lead.send_failed", {
      submittedAt,
      ipHash,
      reason: result.reason,
      ...(result.reason === "rejected" ? { status: result.status } : {}),
    });
    return NextResponse.json<FailureBody>(
      {
        ok: false,
        message:
          "We couldn't deliver your message right now. Please call us or try again in a few minutes.",
      },
      { status: 502 },
    );
  }

  console.info("lead.delivered", {
    submittedAt,
    ipHash,
    contactMethod: lead.contactMethod,
    hasEmail: Boolean(lead.email),
    hasPhone: Boolean(lead.phone),
    providerId: result.id,
  });

  return NextResponse.json<SuccessBody>(
    {
      ok: true,
      message:
        "Thanks. Your request is in — we'll contact you shortly to discuss next steps.",
    },
    { status: 200 },
  );
}
