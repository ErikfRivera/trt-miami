import Link from "next/link";
import { business } from "@/lib/business";

export function StickyMobileCallBar() {
  return (
    <div
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] supports-[backdrop-filter]:bg-white/80 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/80 lg:hidden"
    >
      <div className="mx-auto flex w-full max-w-6xl items-stretch gap-2 px-3 py-2 sm:px-4">
        <a
          href={business.phone.href}
          className="flex flex-[3] items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          aria-label={`Call ${business.schemaName} at ${business.phone.display}`}
        >
          <span aria-hidden="true">📞</span>
          <span>
            Call <span className="tabular-nums">{business.phone.display}</span>
          </span>
        </a>
        <Link
          href="/contact/"
          className="flex flex-[2] items-center justify-center rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-900"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
