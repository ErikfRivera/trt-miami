"use client";

import { useEffect } from "react";

type GtagFn = (
  command: "event",
  eventName: string,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

function fire(href: string, surface: string): void {
  const payload = {
    phone_number: href.replace(/^tel:/, ""),
    surface,
  };
  if (typeof window.gtag === "function") {
    window.gtag("event", "phone_call_click", payload);
    return;
  }
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: "phone_call_click", ...payload });
  }
}

export function PhoneClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href^='tel:']");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href") ?? "";
      const surface =
        anchor.dataset.phoneSurface ?? anchor.getAttribute("aria-label") ?? "unknown";
      fire(href, surface);
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
