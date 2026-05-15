"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";

export function DarkMapPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset]"
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
        {load ? (
          <iframe
            title={business.map.title}
            src={business.map.embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-wider text-slate-500">
            Loading Miami coverage map…
          </div>
        )}
      </div>
    </div>
  );
}
