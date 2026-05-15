import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { alternatesFor } from "@/lib/hreflangMap";

const PAGE_PATH = "/es/" as const;

export const metadata: Metadata = {
  title: { absolute: "Strong Health Miami — Terapia de Reemplazo de Testosterona" },
  description:
    "Clínica de TRT en Miami con atención bilingüe en español e inglés. Contenido de la página en preparación.",
  alternates: alternatesFor(PAGE_PATH),
  robots: { index: false, follow: true },
};

export default function HomeEsPage() {
  return (
    <PageStub
      eyebrow="Terapia hormonal · Miami, FL"
      heading="Strong Health Miami — TRT en español"
      intro="Clínica de terapia de reemplazo de testosterona en Miami con atención dirigida por médico en inglés y español. El contenido completo en español se está preparando."
      breadcrumbs={[
        { name: "Inicio", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Clínica TRT en Miami", href: "/es/clinica-trt-miami/" },
        { label: "Contacto", href: "/es/contacto/" },
        { label: "Switch to English", href: "/" },
      ]}
    />
  );
}
