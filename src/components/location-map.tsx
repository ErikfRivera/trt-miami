"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/business";

export function LocationMap() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setLoad(true);
      return;
    }
    const onLoad = () => setLoad(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        {load ? (
          <iframe
            title={business.map.title}
            src={business.map.embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : null}
      </div>
    </div>
  );
}
