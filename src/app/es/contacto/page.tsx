import type { Metadata } from "next";
import { PageStub } from "@/components/page-stub";
import { alternatesFor } from "@/lib/hreflangMap";

const PAGE_PATH = "/es/contacto/" as const;

export const metadata: Metadata = {
  title: { absolute: "Contacto — Strong Health Miami" },
  description:
    "Contacta a Strong Health Miami para una consulta de TRT. Atención en español e inglés. Contenido en preparación.",
  alternates: alternatesFor(PAGE_PATH),
  robots: { index: false, follow: true },
};

export default function ContactoPage() {
  return (
    <PageStub
      eyebrow="Contacto · Miami, FL"
      heading="Contacta a Strong Health Miami"
      intro="Llama o escribe para agendar una consulta de TRT con atención en español. El formulario completo y los detalles de la clínica se están preparando."
      breadcrumbs={[
        { name: "Inicio", path: "/es/" },
        { name: "Contacto", path: PAGE_PATH },
      ]}
      relatedLinks={[
        { label: "Clínica TRT en Miami", href: "/es/clinica-trt-miami/" },
        { label: "English version", href: "/contact/" },
      ]}
    />
  );
}
