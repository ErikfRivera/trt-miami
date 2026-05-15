import { business } from "@/lib/business";

const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${business.schemaName}, Miami, FL`,
)}`;

type NapBlockProps = {
  /** Heading text override (defaults to `business.name`). Use to keep the
   *  brand-name H2 from leaking the Miami geo on non-Miami city pages. */
  heading?: string;
};

export function NapBlock({ heading = business.name }: NapBlockProps = {}) {
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
          {heading}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Visit us or call to book a free consultation.
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
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
              aria-label="Get directions to Strong Health Miami"
            >
              Get directions
              <span aria-hidden="true">→</span>
            </a>
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
          <dt className="mt-3 font-medium text-zinc-900 dark:text-zinc-100">Hours</dt>
          <dd className="mt-1 text-zinc-600 dark:text-zinc-400">
            <ul className="leading-6">
              <li>Mon–Fri: 8:00 a.m. – 6:00 p.m.</li>
              <li>Sat: 9:00 a.m. – 1:00 p.m.</li>
              <li>Sun: Closed</li>
            </ul>
          </dd>
        </div>
      </dl>

      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Neighborhoods we serve
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {business.areaServed.map((area) => (
            <li
              key={area}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {area}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={business.phone.href}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:self-start"
      >
        Call {business.phone.display}
      </a>
    </section>
  );
}
