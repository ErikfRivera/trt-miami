import Link from "next/link";
import { business } from "@/lib/business";

const navLinks = [
  { href: "/trt-clinic-miami/", label: "TRT Clinic Miami" },
  { href: "/hrt-miami/", label: "HRT Miami" },
  { href: "/bioidentical-hormones-miami/", label: "Bioidentical Hormones Miami" },
  { href: "/peptide-therapy/", label: "Peptide Therapy Miami" },
  { href: "/locations/", label: "Locations" },
  { href: "/contact/", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-300"
          aria-label={`${business.schemaName} — Home`}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-[0.7rem] font-bold text-white dark:bg-zinc-50 dark:text-zinc-900">
            SH
          </span>
          <span className="hidden sm:inline">{business.schemaName}</span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden flex-1 justify-end lg:flex"
        >
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/es/"
                hrefLang="es"
                className="underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
              >
                Español
              </Link>
            </li>
          </ul>
        </nav>

        <a
          href={business.phone.href}
          className="ml-auto inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200 lg:ml-0"
          aria-label={`Call ${business.schemaName} at ${business.phone.display}`}
        >
          <span className="hidden md:inline">Call </span>
          {business.phone.display}
        </a>
      </div>

      <nav
        aria-label="Primary mobile"
        className="border-t border-zinc-200 bg-white/95 dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl items-center gap-x-5 overflow-x-auto px-4 py-2 text-sm text-zinc-600 sm:px-6 dark:text-zinc-300">
          {navLinks.map((link) => (
            <li key={link.href} className="whitespace-nowrap">
              <Link
                href={link.href}
                className="underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="whitespace-nowrap">
            <Link
              href="/es/"
              hrefLang="es"
              className="underline-offset-4 hover:text-zinc-900 hover:underline dark:hover:text-zinc-50"
            >
              Español
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
