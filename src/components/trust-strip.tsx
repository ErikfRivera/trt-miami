const PILLS = [
  "In-person Miami clinic",
  "Florida-licensed physician",
  "Comprehensive lab panel",
  "Same-week consults",
  "Transparent self-pay · superbill provided",
] as const;

export function TrustStrip() {
  return (
    <section
      aria-label="Why Strong Health Miami"
      className="-mt-2 flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:p-4"
    >
      <ul className="flex flex-wrap gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-200 sm:text-sm">
        {PILLS.map((p) => (
          <li
            key={p}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 dark:bg-zinc-900"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-3.5 w-3.5 shrink-0 text-zinc-600 dark:text-zinc-400"
              fill="currentColor"
            >
              <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" />
            </svg>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
