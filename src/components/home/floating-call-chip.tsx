import { business } from "@/lib/business";

export function FloatingCallChip() {
  return (
    <div
      aria-hidden="false"
      className="pointer-events-none fixed inset-y-0 right-3 z-30 hidden items-center sm:flex"
    >
      <a
        href={business.phone.href}
        className="pointer-events-auto group flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 py-2 pl-2 pr-4 text-sm font-medium text-slate-100 shadow-lg shadow-black/40 backdrop-blur transition-colors hover:bg-slate-800"
        aria-label={`Call ${business.schemaName} at ${business.phone.display}`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-400 text-slate-950">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.37 1.84.72 2.71a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.37-1.29a2 2 0 0 1 2.11-.45c.87.35 1.78.59 2.71.72A2 2 0 0 1 22 16.92Z" />
          </svg>
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.7rem] uppercase tracking-wider text-amber-300/80">
            Call us
          </span>
          <span className="text-sm tabular-nums">{business.phone.display}</span>
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </a>
    </div>
  );
}
