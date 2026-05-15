import Link from "next/link";
import { NavMenu, type NavGroup } from "@/components/nav-menu";
import { business } from "@/lib/business";

const navItems: ReadonlyArray<NavGroup> = [
  {
    label: "TRT",
    children: [
      { href: "/trt-clinic-miami/", label: "TRT Therapy Miami" },
      { href: "/trt-injections/", label: "TRT Injections" },
      { href: "/trt-pellets/", label: "TRT Pellets" },
      { href: "/trt-gels/", label: "TRT Gels" },
    ],
  },
  {
    label: "Locations",
    children: [
      { href: "/locations/", label: "Miami TRT Locations" },
      { href: "/locations/brickell-trt/", label: "Brickell" },
      { href: "/locations/coral-gables-trt/", label: "Coral Gables" },
      { href: "/locations/coconut-grove-trt/", label: "Coconut Grove" },
      { href: "/locations/aventura-trt/", label: "Aventura" },
      { href: "/locations/doral-trt/", label: "Doral" },
      { href: "/locations/hialeah-trt/", label: "Hialeah" },
      { href: "/locations/kendall-trt/", label: "Kendall" },
      { href: "/locations/key-biscayne-trt/", label: "Key Biscayne" },
      { href: "/locations/pinecrest-trt/", label: "Pinecrest" },
      { href: "/locations/fort-lauderdale-trt/", label: "Fort Lauderdale" },
    ],
  },
  {
    label: "Therapies",
    children: [
      { href: "/hrt-miami/", label: "HRT for Women" },
      { href: "/bioidentical-hormones-miami/", label: "Bioidentical Hormones" },
      { href: "/peptide-therapy/", label: "Peptide Therapy" },
    ],
  },
  {
    label: "Learn",
    children: [
      { href: "/trt-cost/", label: "TRT Cost" },
      { href: "/does-insurance-cover-trt/", label: "Does Insurance Cover TRT?" },
      { href: "/is-trt-safe/", label: "Is TRT Safe?" },
      { href: "/trt-side-effects/", label: "TRT Side Effects" },
      { href: "/trt-before-and-after/", label: "TRT Before & After" },
    ],
  },
  {
    label: "About",
    children: [
      { href: "/providers/", label: "Our Providers" },
      { href: "/medical-reviewer/", label: "Medical Reviewer" },
      { href: "/about/", label: "About Us" },
    ],
  },
  {
    label: "Contact",
    href: "/contact/",
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75 dark:border-zinc-800 dark:bg-zinc-950/90 dark:supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
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

        <NavMenu items={navItems} localeHref="/es/" localeLabel="Español" />

        <a
          href={business.phone.href}
          className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          aria-label={`Call ${business.schemaName} at ${business.phone.display}`}
        >
          <span className="hidden md:inline">Call </span>
          {business.phone.display}
        </a>
      </div>
    </header>
  );
}
