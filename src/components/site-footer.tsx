import Link from "next/link";
import { business } from "@/lib/business";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/trt-clinic-miami/", label: "TRT Clinic Miami" },
  { href: "/hrt-miami/", label: "HRT Miami" },
  { href: "/bioidentical-hormones-miami/", label: "Bioidentical Hormones Miami" },
  { href: "/peptide-therapy/", label: "Peptide Therapy Miami" },
  { href: "/locations/", label: "Locations" },
  // STR-67 — inbound link #2 of 5 to /locations/fort-lauderdale-trt/.
  // Anchor matches the cannibalization rule in STR-52 §5 ("Fort Lauderdale",
  // never "TRT Miami" or "TRT Fort Lauderdale Miami").
  { href: "/locations/fort-lauderdale-trt/", label: "Fort Lauderdale" },
  { href: "/providers/", label: "Our Providers" },
  { href: "/about/", label: "About" },
  { href: "/medical-reviewer/", label: "Medical Reviewer" },
  { href: "/contact/", label: "Contact" },
] as const;

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
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-zinc-600 sm:flex sm:flex-wrap sm:gap-x-6 dark:text-zinc-400">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
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
