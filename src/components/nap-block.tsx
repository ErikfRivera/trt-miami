import { business } from "@/lib/business";

export function NapBlock() {
  return (
    <section
      aria-labelledby="nap-heading"
      className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
    >
      <header>
        <h2
          id="nap-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {business.name}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Visit us or call to schedule a consultation.
        </p>
      </header>

      <dl className="grid gap-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium text-zinc-900 dark:text-zinc-100">Address</dt>
          <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
            <address className="not-italic leading-6">
              <span className="block">{business.address.displayLine1}</span>
              {business.address.displayLine2 ? (
                <span className="block">{business.address.displayLine2}</span>
              ) : null}
            </address>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-zinc-900 dark:text-zinc-100">Phone</dt>
          <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
            <a
              href={business.phone.href}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {business.phone.display}
            </a>
          </dd>
        </div>
      </dl>

      <a
        href={business.phone.href}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:self-start"
      >
        Call {business.phone.display}
      </a>
    </section>
  );
}
