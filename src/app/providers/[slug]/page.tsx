import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { activeReviewer, hasVerifiedMedicalDirector } from "@/lib/medical-director";
import { drAngelRivera } from "@/lib/physician";
import { getProviderBySlug, providers, providerDisplayName } from "@/lib/providers/registry";
import { buildBreadcrumbList } from "@/lib/schema";
import { physicianSchemaNode } from "@/lib/schema/physician";
import { pageMetadata } from "@/lib/seo";
import type { SitePath } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

const providerPagePath = (slug: string): SitePath => `/providers/${slug}/`;

// STR-137 — provider bio routes are part of the reviewer-identity surface.
// Until a real medical director is published, they are noindex,nofollow and
// the visible bio renders the generic clinical-team blurb so no
// "Dr. Placeholder" / PENDING_* / {PHYSICIAN_NAME} strings reach the HTML.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  const verified = hasVerifiedMedicalDirector;
  const title = verified
    ? `${providerDisplayName(provider)} — Strong Health Miami`
    : "Strong Health Miami clinical team";
  const description = verified
    ? provider.summary
    : "Strong Health Miami is a Florida-licensed hormone-health clinic. Every patient is evaluated by a physician on our clinical team.";
  return {
    ...pageMetadata({ path: providerPagePath(slug), title, description }),
    robots: verified ? undefined : { index: false, follow: false },
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  // STR-128 §4 — `/providers/{slug}/` is the canonical source of truth for
  // the physician entity. The full Person JSON-LD is emitted here; every
  // other surface (medical-reviewer, about, providers index, modality pages)
  // references this node by its `@id` rather than re-emitting it.
  //
  // STR-137 — `physicianSchemaNode()` returns null while no verified medical
  // director is published, so the placeholder Physician/Person node never
  // ships to crawlers. `SchemaGraph` filters the null out of the @graph.
  const pagePath = providerPagePath(slug);
  const schemaNodes = [
    physicianSchemaNode(drAngelRivera),
    buildBreadcrumbList(
      [
        { name: "Home", path: "/" },
        { name: "Providers", path: "/providers/" },
        { name: hasVerifiedMedicalDirector ? provider.familyName : "Clinical Team", path: pagePath },
      ],
      pagePath,
    ),
  ];

  // STR-137 — while no real medical director is published, render a generic
  // clinical-team bio at the same URL. Keeps the route alive for future
  // rewire and avoids leaking the placeholder identity into rendered HTML.
  const verified = hasVerifiedMedicalDirector;
  const heading = verified
    ? providerDisplayName(provider)
    : "Strong Health Miami clinical team";
  const intro = verified ? provider.summary : activeReviewer.description;

  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="Strong Health Miami"
        heading={heading}
        intro={intro}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers/" },
          { name: heading, path: pagePath },
        ]}
        relatedLinks={[
          { label: "All providers", href: "/providers/" },
          { label: "Medical reviewer standards", href: "/medical-reviewer/" },
        ]}
      />
    </>
  );
}
