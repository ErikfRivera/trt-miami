import { leadConfig } from "./config";
import type { LeadInput } from "./validate";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function contactMethodLabel(method: LeadInput["contactMethod"]): string {
  if (method === "phone") return "Phone";
  if (method === "email") return "Email";
  return "Either phone or email";
}

export type LeadEmailMeta = {
  submittedAt: string;
  ipHash: string;
  userAgent: string | null;
  referer: string | null;
};

function renderHtml(lead: LeadInput, meta: LeadEmailMeta): string {
  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email || "(not provided)"],
    ["Phone", lead.phone || "(not provided)"],
    ["Preferred contact", contactMethodLabel(lead.contactMethod)],
    ["Message", lead.message || "(none)"],
    ["Submitted", meta.submittedAt],
    ["IP (hashed)", meta.ipHash],
    ["User agent", meta.userAgent ?? "(unknown)"],
    ["Referer", meta.referer ?? "(unknown)"],
  ];

  const body = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;background:#f6f6f6;border:1px solid #e5e5e5;font-weight:600;width:160px;">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px;border:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#111;">
<h2 style="margin:0 0 12px 0;">New TRT Miami lead</h2>
<table style="border-collapse:collapse;font-size:14px;">${body}</table>
</body></html>`;
}

function renderText(lead: LeadInput, meta: LeadEmailMeta): string {
  return [
    `New TRT Miami lead`,
    ``,
    `Name: ${lead.name}`,
    `Email: ${lead.email || "(not provided)"}`,
    `Phone: ${lead.phone || "(not provided)"}`,
    `Preferred contact: ${contactMethodLabel(lead.contactMethod)}`,
    ``,
    `Message:`,
    lead.message || "(none)",
    ``,
    `Submitted: ${meta.submittedAt}`,
    `IP (hashed): ${meta.ipHash}`,
    `User agent: ${meta.userAgent ?? "(unknown)"}`,
    `Referer: ${meta.referer ?? "(unknown)"}`,
  ].join("\n");
}

export type SendResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: "not_configured" | "network" | "rejected"; status?: number };

export async function sendLeadEmail(
  lead: LeadInput,
  meta: LeadEmailMeta,
): Promise<SendResult> {
  if (!leadConfig.resendApiKey || !leadConfig.notificationTo) {
    return { ok: false, reason: "not_configured" };
  }

  const subject = `New TRT Miami lead — ${lead.name || "no name"}`;
  const payload: Record<string, unknown> = {
    from: leadConfig.notificationFrom,
    to: [leadConfig.notificationTo],
    subject,
    html: renderHtml(lead, meta),
    text: renderText(lead, meta),
  };
  if (leadConfig.notificationReplyTo) {
    payload.reply_to = [leadConfig.notificationReplyTo];
  } else if (lead.email) {
    payload.reply_to = [lead.email];
  }

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${leadConfig.resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return { ok: false, reason: "network" };
  }

  if (!response.ok) {
    return { ok: false, reason: "rejected", status: response.status };
  }

  let id: string | null = null;
  try {
    const data = (await response.json()) as { id?: unknown };
    if (typeof data.id === "string") id = data.id;
  } catch {
    /* response is opaque but 2xx — treat as success */
  }
  return { ok: true, id };
}
