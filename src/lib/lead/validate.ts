export type ContactMethod = "phone" | "email" | "either";

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  message: string;
  honeypot: string;
  sourcePath: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  ga4ClientId: string;
};

export type FieldErrors = Partial<Record<keyof LeadInput | "form", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_RE = /\d/g;
const CONTACT_METHODS: readonly ContactMethod[] = ["phone", "email", "either"];

export function sanitizeString(raw: unknown, max: number): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim().slice(0, max);
}

export function normalizePhone(raw: unknown): string {
  if (typeof raw !== "string") return "";
  return raw.replace(/[^\d+]/g, "").slice(0, 24);
}

export function parseLeadInput(form: FormData | Record<string, unknown>): LeadInput {
  const get = (key: string): unknown => {
    if (form instanceof FormData) return form.get(key);
    return (form as Record<string, unknown>)[key];
  };

  const rawMethod = sanitizeString(get("contactMethod"), 16).toLowerCase();
  const contactMethod = (CONTACT_METHODS as readonly string[]).includes(rawMethod)
    ? (rawMethod as ContactMethod)
    : "either";

  return {
    name: sanitizeString(get("name"), 120),
    email: sanitizeString(get("email"), 200).toLowerCase(),
    phone: normalizePhone(get("phone")),
    contactMethod,
    message: sanitizeString(get("message"), 1000),
    honeypot: sanitizeString(get("website"), 200),
    sourcePath: sanitizeString(get("sourcePath"), 256),
    utmSource: sanitizeString(get("utm_source"), 128),
    utmMedium: sanitizeString(get("utm_medium"), 128),
    utmCampaign: sanitizeString(get("utm_campaign"), 128),
    utmTerm: sanitizeString(get("utm_term"), 128),
    utmContent: sanitizeString(get("utm_content"), 128),
    ga4ClientId: sanitizeString(get("ga4ClientId"), 64),
  };
}

export function validateLead(input: LeadInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!input.name) errors.name = "Please enter your name.";
  else if (input.name.length < 2) errors.name = "Name is too short.";

  const hasEmail = input.email.length > 0;
  const hasPhone = input.phone.replace(/\D/g, "").length >= 7;

  if (!hasEmail && !hasPhone) {
    errors.form = "Please provide a phone number or email so we can reach you.";
  }
  if (hasEmail && !EMAIL_RE.test(input.email)) {
    errors.email = "That email doesn't look right.";
  }
  if (hasPhone && (input.phone.match(PHONE_DIGITS_RE) ?? []).length < 7) {
    errors.phone = "Phone number is too short.";
  }

  return errors;
}
