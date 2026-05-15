import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { alternatesFor } from "@/lib/hreflangMap";

const PAGE_PATH = "/es/clinica-trt-miami/" as const;

export const metadata: Metadata = {
  title: { absolute: "Clínica TRT en Miami — Strong Health" },
  description:
    "Clínica de terapia de reemplazo de testosterona en Miami dirigida por médico, con atención en español. Contenido en preparación.",
  alternates: alternatesFor(PAGE_PATH),
  robots: { index: false, follow: true },
};

export default function ClinicaTrtMiamiPage() {
  return (
    <PageStub
      eyebrow="Clínica TRT · Miami, FL"
      heading="Clínica TRT en Miami"
      intro="Clínica de terapia de reemplazo de testosterona en Miami dirigida por médico, con atención completa en español e inglés. El contenido detallado en español está en preparación."
      breadcrumbs={[
        { name: "Inicio", path: "/es/" },
        { name: "Clínica TRT Miami", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Contacto", href: "/es/contacto/" },
        { label: "English version", href: "/trt-clinic-miami/" },
      ]}
    />
  );
}
