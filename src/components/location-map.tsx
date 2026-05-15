import { business } from "@/lib/business";

export function LocationMap() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/9]">
        <iframe
          title={business.map.title}
          src={business.map.embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
