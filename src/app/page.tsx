import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Testosterone Replacement Therapy (TRT) in Miami, FL",
  description:
    "A Miami clinic specializing in testosterone replacement therapy (TRT) for men. Comprehensive bloodwork, physician-supervised protocols, and ongoing follow-up.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-24 sm:py-32">
        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
          Miami, FL
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Testosterone Replacement Therapy in Miami
        </h1>
        <p className="text-lg text-muted-foreground sm:text-xl">
          A new Miami practice focused on testosterone replacement therapy for
          men. Comprehensive bloodwork, physician-supervised protocols, and
          ongoing follow-up. We&apos;re building the site now — full pricing,
          clinical details, and online booking coming soon.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@miamitrt.com?subject=TRT%20inquiry"
            className={buttonVariants({ size: "lg" })}
          >
            Request an intake call
          </a>
          <span className="text-sm text-muted-foreground">
            Replies within one business day
          </span>
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto grid max-w-3xl gap-8 px-6 py-12 sm:grid-cols-3">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Bloodwork first
            </h2>
            <p className="mt-2 text-sm">
              Treatment decisions start with a complete hormone panel, not a
              questionnaire.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Physician-supervised
            </h2>
            <p className="mt-2 text-sm">
              Every patient is managed by a licensed physician with regular
              follow-up and dose review.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Local to Miami
            </h2>
            <p className="mt-2 text-sm">
              Serving men across Miami-Dade and Broward, with in-person and
              telehealth visits.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t">
        <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Miami TRT</span>
          <span>
            Informational only. Treatment decisions require a licensed physician
            and individualized evaluation.
          </span>
        </div>
      </footer>
    </main>
  );
}
