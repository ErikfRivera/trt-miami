import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { getProviderBySlug, providers } from "@/lib/providers/registry";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  return {
    title: { absolute: `${provider.name}, ${provider.honorificSuffix} — Strong Health Miami` },
    description: provider.summary,
    alternates: { canonical: provider.url },
  };
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  return (
    <PageStub
      eyebrow="Medical Provider · Strong Health Miami"
      heading={`${provider.name}, ${provider.honorificSuffix}`}
      intro={provider.summary}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Providers", path: "/providers/" },
        { name: provider.name, path: provider.url as `/${string}` },
      ]}
      relatedLinks={[
        { label: "All providers", href: "/providers/" },
        { label: "Medical reviewer standards", href: "/medical-reviewer/" },
      ]}
    />
  );
}
