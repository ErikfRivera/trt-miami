import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { SchemaGraph } from "@/components/schema-graph";
import { drAngelRivera } from "@/lib/physician";
import { getProviderBySlug, providers } from "@/lib/providers/registry";
import { buildBreadcrumbList, buildPhysician } from "@/lib/schema";
import type { SitePath } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

const providerPagePath = (slug: string): SitePath => `/providers/${slug}/`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: { absolute: `${provider.name}, ${provider.honorificSuffix} — Strong Health Miami` },
    description: provider.summary,
    alternates: { canonical: providerPagePath(slug) },
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
  // Currently only Dr. Rivera is in the registry; once additional providers
  // land, replicate `drAngelRivera` per-provider and look up by slug.
  const pagePath = providerPagePath(slug);
  const schemaNodes = [
    buildPhysician(drAngelRivera),
    buildBreadcrumbList(
      [
        { name: "Home", path: "/" },
        { name: "Providers", path: "/providers/" },
        { name: provider.familyName, path: pagePath },
      ],
      pagePath,
    ),
  ];

  return (
    <>
      <SchemaGraph nodes={schemaNodes} />
      <PageStub
        eyebrow="Medical Provider · Strong Health Miami"
        heading={`${provider.name}, ${provider.honorificSuffix}`}
        intro={provider.summary}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Providers", path: "/providers/" },
          { name: provider.name, path: pagePath },
        ]}
        relatedLinks={[
          { label: "All providers", href: "/providers/" },
          { label: "Medical reviewer standards", href: "/medical-reviewer/" },
        ]}
      />
    </>
  );
}
