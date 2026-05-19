"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type SubmitResponse = {
  ok?: boolean;
  id?: string;
  message?: string;
  fieldErrors?: Record<string, string>;
};

type WindowWithGtag = Window & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag?: (...args: any[]) => void;
  dataLayer?: unknown[];
};

function fireLeadEvent(leadId: string | undefined): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithGtag;
  const params = {
    lead_id: leadId,
    lead_source: "trt_miami_contact_form",
    currency: "USD",
    value: 0,
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", "lead_submit", params);
    return;
  }
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event: "lead_submit", ...params });
  }
}

function readUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const v = params.get(key);
    if (v) out[key] = v;
  }
  return out;
}

function readClientId(measurementId: string | null): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !measurementId) {
      resolve("");
      return;
    }
    const w = window as WindowWithGtag;
    if (typeof w.gtag !== "function") {
      resolve("");
      return;
    }
    let resolved = false;
    const done = (value: string) => {
      if (resolved) return;
      resolved = true;
      resolve(value);
    };
    try {
      w.gtag("get", measurementId, "client_id", (value: string) => done(value || ""));
    } catch {
      done("");
    }
    setTimeout(() => done(""), 400);
  });
}

type LeadFormProps = {
  ga4MeasurementId?: string | null;
  sourcePath?: string;
};

export function LeadForm({ ga4MeasurementId = null, sourcePath = "" }: LeadFormProps = {}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    method: useId(),
    message: useId(),
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setFieldErrors({});

    const data = new FormData(event.currentTarget);
    const resolvedSourcePath =
      sourcePath || (typeof window !== "undefined" ? window.location.pathname : "");
    if (resolvedSourcePath) data.set("sourcePath", resolvedSourcePath);
    for (const [k, v] of Object.entries(readUtmParams())) data.set(k, v);
    const clientId = await readClientId(ga4MeasurementId);
    if (clientId) data.set("ga4ClientId", clientId);

    let response: Response;
    try {
      response = await fetch("/api/lead/", {
        method: "POST",
        body: data,
      });
    } catch {
      setStatus("error");
      setMessage(
        "We couldn't reach our server. Please try again or call us at the number above.",
      );
      return;
    }

    let body: SubmitResponse = {};
    try {
      body = (await response.json()) as SubmitResponse;
    } catch {
      body = {};
    }

    if (response.ok && body.ok) {
      setStatus("success");
      setMessage(
        body.message ?? "Thanks. We'll contact you shortly to discuss next steps.",
      );
      fireLeadEvent(body.id);
      formRef.current?.reset();
      return;
    }

    setStatus("error");
    setFieldErrors(body.fieldErrors ?? {});
    setMessage(
      body.message ??
        "We couldn't submit that. Please check the form and try again.",
    );
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
      >
        <p className="text-base font-semibold">Request received.</p>
        <p className="mt-2 text-sm leading-6">{message}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setMessage("");
          }}
          className="mt-4 text-sm font-medium underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-describedby={message ? "lead-form-status" : undefined}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={ids.name}
          className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          Full name
        </label>
        <input
          id={ids.name}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          aria-invalid={Boolean(fieldErrors.name)}
          className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {fieldErrors.name ? (
          <p className="text-sm text-red-600 dark:text-red-400">{fieldErrors.name}</p>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor={ids.email}
            className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            Email
          </label>
          <input
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={200}
            aria-invalid={Boolean(fieldErrors.email)}
            className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldErrors.email ? (
            <p className="text-sm text-red-600 dark:text-red-400">{fieldErrors.email}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor={ids.phone}
            className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
          >
            Phone
          </label>
          <input
            id={ids.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={24}
            aria-invalid={Boolean(fieldErrors.phone)}
            className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          {fieldErrors.phone ? (
            <p className="text-sm text-red-600 dark:text-red-400">{fieldErrors.phone}</p>
          ) : null}
        </div>
      </div>
      <p className="-mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Either phone or email is fine — we&apos;ll use whichever you prefer below.
      </p>

      <fieldset className="flex flex-col gap-2">
        <legend
          id={ids.method}
          className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          Preferred way to reach you
        </legend>
        <div
          role="radiogroup"
          aria-labelledby={ids.method}
          className="flex flex-wrap gap-2"
        >
          {(
            [
              { value: "phone", label: "Phone call" },
              { value: "email", label: "Email" },
              { value: "either", label: "Either is fine" },
            ] as const
          ).map((opt) => (
            <label
              key={opt.value}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-800 has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50 has-[:checked]:text-amber-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:has-[:checked]:border-amber-400 dark:has-[:checked]:bg-amber-500/10 dark:has-[:checked]:text-amber-200"
            >
              <input
                type="radio"
                name="contactMethod"
                value={opt.value}
                defaultChecked={opt.value === "either"}
                className="h-4 w-4 accent-amber-500"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={ids.message}
          className="text-sm font-medium text-zinc-800 dark:text-zinc-100"
        >
          Anything we should know? <span className="font-normal text-zinc-500">(optional)</span>
        </label>
        <textarea
          id={ids.message}
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="A short note about what you're looking for. Please don't include medical history — we'll cover that on the call."
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </div>

      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        We will contact you to discuss next steps. By submitting this form you
        agree to be contacted about TRT therapy. We never sell your information.
      </p>

      {status === "error" && message ? (
        <p
          id="lead-form-status"
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100"
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-7 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:bg-amber-200"
      >
        {status === "submitting" ? "Sending…" : "Request next steps"}
      </button>
    </form>
  );
}
