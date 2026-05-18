function readEnv(name: string): string | null {
  const raw = process.env[name]?.trim();
  return raw && raw.length > 0 ? raw : null;
}

export const leadConfig = {
  resendApiKey: readEnv("RESEND_API_KEY"),
  notificationTo: readEnv("LEAD_NOTIFICATION_EMAIL"),
  notificationFrom:
    readEnv("LEAD_NOTIFICATION_FROM") ?? "Strong Health Leads <onboarding@resend.dev>",
  notificationReplyTo: readEnv("LEAD_NOTIFICATION_REPLY_TO"),
} as const;

export function leadEmailConfigured(): boolean {
  return Boolean(leadConfig.resendApiKey && leadConfig.notificationTo);
}
