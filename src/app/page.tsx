import type { Metadata } from "next";
import Link from "next/link";
import { NapBlock } from "@/components/nap-block";
import { LocationMap } from "@/components/location-map";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: {
    absolute: "Strong Health TRT Therapy Miami — Testosterone Replacement Therapy in Miami, FL",
  },
  description: `${business.name} is a men's health clinic in downtown Miami offering testosterone replacement therapy. Schedule a consultation by calling ${business.phone.display}.`,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:py-24">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Testosterone Replacement Therapy · Miami, FL
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          {business.name}
        </h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A men&apos;s health clinic in downtown Miami focused on testosterone
          replacement therapy. We also offer{" "}
          <Link
            href="/peptide-therapy"
            className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
          >
            peptide therapy in Miami
          </Link>
          {" "}for weight loss, recovery, and hormone support. Schedule a
          consultation to get started.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={business.phone.href}
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Call {business.phone.display}
          </a>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Visit our clinic
          </Link>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <NapBlock />
        <LocationMap />
      </div>
    </div>
  );
}
