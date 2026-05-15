import Link from "next/link";
import { business } from "@/lib/business";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {business.name}
          </p>
          <address className="mt-2 not-italic text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            <span className="block">{business.address.displayLine1}</span>
            {business.address.displayLine2 ? (
              <span className="block">{business.address.displayLine2}</span>
            ) : null}
            <a
              href={business.phone.href}
              className="mt-1 inline-block font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {business.phone.display}
            </a>
          </address>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <ul className="flex flex-wrap gap-6 text-zinc-600 dark:text-zinc-400">
            <li>
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/trt-clinic-miami/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                TRT Clinic
              </Link>
            </li>
            <li>
              <Link
                href="/peptide-therapy/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Peptide Therapy
              </Link>
            </li>
            <li>
              <Link
                href="/locations/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Locations
              </Link>
            </li>
            <li>
              <Link
                href="/contact/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/es/"
                className="hover:text-zinc-900 dark:hover:text-zinc-100"
                hrefLang="es"
              >
                Español
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
