import type { Metadata } from "next";
import Link from "next/link";
import { SchemaGraph } from "@/components/schema-graph";
import { business } from "@/lib/business";
import { alternatesFor } from "@/lib/hreflangMap";
import { activeReviewer } from "@/lib/medical-director";
import { absoluteUrl } from "@/lib/site";
import {
  buildBreadcrumbList,
  buildFaqPage,
  buildMedicalWebPage,
  buildService,
  buildServiceAreaService,
} from "@/lib/schema";
import type { BreadcrumbItem } from "@/lib/schema/breadcrumb";

// STR-67 — Spanish parallel of /locations/fort-lauderdale-trt/ per STR-52 §9.
// Mutual hreflang pair lands via `alternatesFor` once /es/.../ is indexable
// in `routes`. Same config object as the EN page (`business`, `activeReviewer`),
// so STR-50 placeholder swaps flow through both pages atomically.
const PAGE_PATH = "/es/locations/fort-lauderdale-trt/" as const;
const EN_PAGE_PATH = "/locations/fort-lauderdale-trt/" as const;

const LAST_REVIEWED = "2026-05-17" as const;

const PAGE_TITLE = "TRT en Fort Lauderdale, FL | Strong Health" as const;
const PAGE_DESCRIPTION =
  "Terapia de reemplazo de testosterona revisada por médicos para Fort Lauderdale y Broward. Precios claros, atención en español. Llame al (786) 420-3187.";

const canonicalUrl = absoluteUrl(PAGE_PATH);

const breadcrumbItems: readonly BreadcrumbItem[] = [
  { name: "Inicio", path: "/es/" },
  { name: "Áreas", path: "/locations/" },
  { name: "Fort Lauderdale", path: PAGE_PATH },
];

const browardAreaServed = [
  "Fort Lauderdale",
  "Plantation",
  "Pompano Beach",
  "Coral Springs",
  "Sunrise",
  "Davie",
  "Oakland Park",
  "Hollywood, FL",
  "Wilton Manors",
] as const;

const faqs: { question: string; answer: string }[] = [
  {
    question: "¿Dónde está la clínica de TRT más cercana a Fort Lauderdale?",
    answer:
      "Strong Health atiende a todo Broward desde nuestra clínica en 2999 NE 191st St, Suite 800, Aventura, FL 33180 — un viaje de 25–35 minutos al sur por la I-95 desde el centro de Fort Lauderdale. También ofrecemos seguimientos por telesalud para pacientes de Plantation, Pompano Beach, Coral Springs, Sunrise y Davie después de la primera visita en persona.",
  },
  {
    question: "¿Cuánto cuesta la TRT en Fort Lauderdale?",
    answer:
      "La mayoría de los pacientes pagan entre $150–$250 al mes por la terapia de reemplazo de testosterona en Strong Health, incluyendo laboratorios de seguimiento y visitas con el proveedor. Los pellets y péptidos adicionales se cotizan por separado.",
  },
  {
    question: "¿El seguro médico cubre la TRT en Florida?",
    answer:
      "Algunos planes en Florida cubren la TRT cuando la baja testosterona está documentada por laboratorios y se considera médicamente necesaria. Muchos pacientes prefieren pagar en efectivo por la rapidez y la claridad de un solo precio total. Verificamos su cobertura durante la consulta gratuita.",
  },
  {
    question: "¿Cuáles son los síntomas de baja testosterona?",
    answer:
      "Los síntomas comunes incluyen cansancio, baja libido, dificultad eréctil, aumento de peso, niebla mental, irritabilidad y pérdida de masa muscular. La Clínica Mayo señala que estos síntomas también tienen otras causas — solo un análisis de sangre matutino puede confirmar el diagnóstico.",
  },
  {
    question: "¿Qué laboratorios se necesitan para empezar TRT?",
    answer:
      "Pedimos un análisis matutino de testosterona total, además de testosterona libre, estradiol, PSA, hematocrito y un panel metabólico. La American Urological Association recomienda dos lecturas matutinas de testosterona total por debajo de 300 ng/dL antes de iniciar el tratamiento.",
  },
  {
    question: "¿Inyecciones, pellets o crema — cuál es mejor?",
    answer:
      "Las inyecciones son las más económicas y fáciles de ajustar. Los pellets se colocan cada 3–6 meses sin rutina semanal. Las cremas son cómodas pero tienen riesgo de transferencia a familiares. Su proveedor combina el método con sus laboratorios y estilo de vida.",
  },
  {
    question: "¿Cuánto tarda en sentir resultados de la TRT?",
    answer:
      "La mayoría de los hombres nota mejor energía y estado de ánimo en 3–6 semanas, y mayor libido y cambios musculares en 3–6 meses. Los beneficios sostenidos dependen de una dosificación constante y de laboratorios trimestrales de seguimiento.",
  },
  {
    question: "¿Es segura la TRT a largo plazo?",
    answer:
      "La evidencia actual de la American Urological Association y la Endocrine Society respalda la seguridad de la TRT en hombres monitoreados y correctamente diagnosticados. Los riesgos incluyen aumento de glóbulos rojos, acné y posible supresión de la fertilidad — todos monitoreados trimestralmente en Strong Health.",
  },
  {
    question: "¿Tienen proveedores que hablan español en Fort Lauderdale?",
    answer:
      "Sí. Strong Health ofrece consultas y seguimientos en inglés y español. Mencione su preferencia de idioma cuando llame y lo emparejaremos con un miembro del equipo que habla español desde la admisión hasta el seguimiento.",
  },
  {
    question: "¿Cómo reservo una consulta de TRT en Fort Lauderdale?",
    answer:
      "Llame al (786) 420-3187 o reserve en línea. Las consultas para nuevos pacientes son gratis y normalmente se programan dentro de 5 días hábiles. Si tiene laboratorios previos de los últimos 12 meses, tráigalos.",
  },
];

const schemaNodes = [
  buildServiceAreaService({
    pagePath: PAGE_PATH,
    serviceType: "Testosterone Replacement Therapy",
    areaName: "Fort Lauderdale, FL",
  }),
  buildService({
    pagePath: PAGE_PATH,
    serviceType: "Testosterone Replacement Therapy",
    areaServed: browardAreaServed,
    audience: { suggestedGender: "male", suggestedMinAge: 30 },
    offers: { bookingUrl: `${business.url}/es/contacto/` },
  }),
  buildMedicalWebPage({
    pagePath: PAGE_PATH,
    lastReviewed: LAST_REVIEWED,
    specialty: "Endocrine",
  }),
  buildFaqPage(faqs, PAGE_PATH),
  buildBreadcrumbList(breadcrumbItems, PAGE_PATH),
];

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: alternatesFor(PAGE_PATH),
  openGraph: {
    type: "website",
    siteName: business.name,
    url: canonicalUrl,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    locale: "es_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

export default function FortLauderdaleTrtEsPage() {
  return (
    <>
      <SchemaGraph nodes={schemaNodes} />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-sm text-zinc-500 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-x-2">
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-x-2">
                  {isLast ? (
                    <span aria-current="page" className="text-zinc-700 dark:text-zinc-300">
                      {item.name}
                    </span>
                  ) : (
                    <>
                      <Link href={item.path} className="underline-offset-2 hover:underline">
                        {item.name}
                      </Link>
                      <span aria-hidden="true">/</span>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {/* HERO ---------------------------------------------------------- */}
        <header className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Terapia de Reemplazo de Testosterona · Fort Lauderdale, FL
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            TRT en Fort Lauderdale | Strong Health TRT Therapy
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Terapia de reemplazo de testosterona revisada por médicos para
            hombres en Fort Lauderdale y el condado de Broward. Precios claros.
            Citas en la misma semana. Atención en inglés y español.{" "}
            <Link
              href={EN_PAGE_PATH}
              hrefLang="en"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              in English →
            </Link>
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={business.phone.href}
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Llame al {business.phone.display}
            </a>
            <Link
              href="/es/contacto/"
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Reserve una consulta gratis
            </Link>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Revisado clínicamente por{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""} · Actualizado{" "}
            <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>
          </p>
        </header>

        {/* H2.1 — Por qué los hombres de Fort Lauderdale eligen Strong Health */}
        <section aria-labelledby="por-que" className="flex flex-col gap-4">
          <h2
            id="por-que"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Por qué los hombres de Fort Lauderdale eligen Strong Health
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Si vive en Fort Lauderdale y siente cansancio constante, baja
            libido y falta de claridad mental, lo que necesita no es otro
            suplemento — necesita un análisis clínico real y, si sus
            laboratorios lo confirman, un protocolo de testosterona dosificado
            correctamente por un equipo que se dedica a esto todos los días.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health es una clínica de TRT con sede en Miami que atiende a
            pacientes de Fort Lauderdale y todo el condado de Broward — tanto
            en nuestra clínica principal como mediante telesalud para
            seguimiento en Plantation, Pompano Beach, Coral Springs, Sunrise y
            Davie. A cada paciente lo atiende un proveedor con licencia, cada
            protocolo se escribe a partir de sus laboratorios (no de un
            cuestionario) y cada plan se monitorea trimestralmente según las
            pautas de la AUA.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Atendemos en inglés y español, publicamos nuestros precios y
            nuestro contenido clínico es revisado por{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""}.
          </p>
        </section>

        {/* H2.2 — Cómo funciona la TRT --------------------------------- */}
        <section aria-labelledby="como-funciona" className="flex flex-col gap-4">
          <h2
            id="como-funciona"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Cómo funciona la TRT (y qué tratamos)
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            La terapia de reemplazo de testosterona trata una deficiencia
            confirmada de testosterona — la hormona responsable de la energía,
            la libido, el estado de ánimo, la masa muscular, la distribución
            de grasa y la densidad ósea en los hombres. Según la guía de
            práctica clínica de la Endocrine Society, el tratamiento es
            apropiado para hombres con síntomas constantes <em>y</em> dos
            lecturas matutinas de testosterona total por debajo del rango de
            referencia del laboratorio.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Si reconoce este patrón, vale la pena hablar con nosotros:
          </p>
          <ul className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            <li>Cansancio constante a pesar de dormir bien</li>
            <li>Baja libido o cambios en la función eréctil</li>
            <li>Pérdida de masa muscular, aumento de grasa abdominal</li>
            <li>Niebla mental, irritabilidad, ánimo deprimido</li>
            <li>Recuperación más lenta del entrenamiento o de lesiones</li>
            <li>Sueño interrumpido, sudores nocturnos</li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            Estos síntomas pueden tener otras causas (la Clínica Mayo menciona
            problemas de tiroides, apnea del sueño, depresión y efectos de
            medicamentos), por lo que empezamos con laboratorios — no con una
            receta. Lea más sobre{" "}
            <Link
              href="/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              cómo funciona la TRT en nuestro hub de Miami
            </Link>{" "}
            y el{" "}
            <Link
              href="/is-trt-safe/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              perfil completo de seguridad
            </Link>{" "}
            antes de reservar.
          </p>
        </section>

        {/* H2.3 — Opciones de TRT que ofrecemos ------------------------ */}
        <section aria-labelledby="opciones" className="flex flex-col gap-4">
          <h2
            id="opciones"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Opciones de TRT que ofrecemos
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            No hay un &ldquo;mejor&rdquo; método único. Hay un método que se
            ajusta a sus laboratorios, su rutina y sus objetivos.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Inyecciones
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Intramusculares o subcutáneas — la opción más económica, fácil
                de ajustar, cadencia semanal. El estándar para la mayoría de
                los pacientes.{" "}
                <Link
                  href="/trt-injections/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Más información →
                </Link>
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Pellets
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Se colocan cada 3–6 meses en un procedimiento de 10 minutos.
                Sin rutina semanal. Mayor costo inicial.{" "}
                <Link
                  href="/trt-pellets/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Más información →
                </Link>
              </p>
            </article>
            <article className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Cremas y geles
              </h3>
              <p className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                Aplicación tópica diaria. Cómodas pero conllevan un riesgo
                documentado de transferencia a esposas, parejas e hijos.
              </p>
            </article>
          </div>
          <p className="text-zinc-700 dark:text-zinc-300">
            Su proveedor le explicará las ventajas y desventajas en su
            consulta. No empujamos — combinamos.
          </p>
        </section>

        {/* H2.4 — Áreas que atendemos ---------------------------------- */}
        <section aria-labelledby="areas" className="flex flex-col gap-4">
          <h2
            id="areas"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Áreas que atendemos en Broward
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Strong Health atiende a hombres en todo el condado de Broward.
            Vemos a pacientes de Fort Lauderdale en persona en nuestra clínica
            en Aventura — un viaje de 25–35 minutos al sur por la I-95 — y
            ofrecemos seguimiento por telesalud (después de la consulta
            inicial y los laboratorios en persona) para comunidades cercanas
            como:
          </p>
          <ul className="grid gap-2 text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
            {browardAreaServed.map((area) => (
              <li key={area} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-1 text-zinc-400">
                  •
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            El viaje desde Plantation o Sunrise suele ser de 20–30 minutos;
            desde Pompano o Coral Springs, 25–40 minutos según el tráfico de
            la I-95. Las extracciones de laboratorio trimestrales se pueden
            programar en cualquier ubicación de LabCorp o Quest cerca de
            usted — su proveedor envía la orden.
          </p>
        </section>

        {/* H2.5 — Cuánto cuesta la TRT --------------------------------- */}
        <section aria-labelledby="costos" className="flex flex-col gap-4">
          <h2
            id="costos"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Cuánto cuesta la TRT en Fort Lauderdale
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            La mayoría de los pacientes de Strong Health en Broward pagan{" "}
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
              $150–$250 al mes
            </strong>
            , todo incluido: visitas con el proveedor, recetas y laboratorios
            de seguimiento de rutina. Los pellets, péptidos y complementos se
            cotizan por separado y se le informa el precio por adelantado.
            Sin facturas sorpresa.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            Algunas realidades de costos específicas para la Florida:
          </p>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Seguro médico:
              </strong>{" "}
              Algunos planes en Florida cubren la TRT cuando la deficiencia se
              documenta según el umbral de la AUA (dos lecturas matutinas de
              testosterona total por debajo de 300 ng/dL). Muchos pacientes
              prefieren pagar en efectivo por la rapidez y la claridad de un
              solo precio total.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Laboratorios iniciales
              </strong>{" "}
              suelen costar $80–$150 si se paga en efectivo; cubiertos si se
              facturan a su seguro con el diagnóstico apropiado.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Costos ocultos que no cobramos:
              </strong>{" "}
              sin cuota de membresía, sin cuota de inscripción, sin
              &ldquo;conserje&rdquo; para acceder a su proveedor.
            </li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            Para un desglose completo de precios a nivel nacional y qué
            impulsa la variación, vea{" "}
            <Link
              href="/trt-cost/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              nuestra guía de costos de TRT
            </Link>
            .
          </p>
        </section>

        {/* H2.6 — Seguridad y monitoreo -------------------------------- */}
        <section aria-labelledby="seguridad" className="flex flex-col gap-4">
          <h2
            id="seguridad"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            ¿Es segura la TRT? Riesgos y monitoreo
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Cuando la TRT se prescribe para una deficiencia confirmada y se
            monitorea correctamente, la evidencia actual de la AUA y la
            Endocrine Society respalda su perfil de seguridad a largo plazo en
            hombres adultos. Los riesgos a conocer:
          </p>
          <ul className="flex flex-col gap-3 text-zinc-700 dark:text-zinc-300">
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Eritrocitosis
              </strong>{" "}
              (recuento elevado de glóbulos rojos) — monitoreado
              trimestralmente vía hematocrito. Manejable.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Elevación de estradiol
              </strong>{" "}
              — monitoreada; manejada con ajuste de dosis o, en raras
              ocasiones, un inhibidor de aromatasa.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Supresión de fertilidad
              </strong>{" "}
              — la TRT generalmente reduce la producción de espermatozoides.
              Si planea tener hijos durante la terapia, hablamos de
              complementos (hCG) en la consulta.
            </li>
            <li>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-50">
                Consideraciones de próstata
              </strong>{" "}
              — la guía actual de la AUA no contraindica la TRT en hombres
              sin cáncer de próstata activo. Monitoreamos el PSA según
              protocolo.
            </li>
          </ul>
          <p className="text-zinc-700 dark:text-zinc-300">
            Lea el perfil completo de{" "}
            <Link
              href="/trt-side-effects/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              efectos secundarios
            </Link>{" "}
            y nuestra{" "}
            <Link
              href="/is-trt-safe/"
              className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
            >
              guía sobre si la TRT es segura
            </Link>
            .
          </p>
        </section>

        {/* H2.7 — Lo que dicen los pacientes (gated) ------------------- */}
        <section
          aria-labelledby="reseñas"
          className="flex flex-col gap-4 rounded-2xl border border-dashed border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <h2
            id="reseñas"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Las reseñas verificadas de Google de pacientes del área de Broward
            aparecerán aquí a medida que se recopilen. Publicamos esta sección
            vacía en lugar de citas fabricadas — si un nombre aparece en esta
            página, la cita vino de ese paciente.
          </p>
        </section>

        {/* H2.8 — FAQ -------------------------------------------------- */}
        <section aria-labelledby="faq" className="flex flex-col gap-6">
          <h2
            id="faq"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            Preguntas frecuentes
          </h2>
          <dl className="flex flex-col gap-6">
            {faqs.map((f) => (
              <div key={f.question} className="flex flex-col gap-2">
                <dt className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {f.question}
                </dt>
                <dd className="text-zinc-700 dark:text-zinc-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* H2.9 — Reserve su consulta ---------------------------------- */}
        <section
          aria-labelledby="reservar"
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-8"
        >
          <h2
            id="reservar"
            className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Reserve su consulta de TRT en Fort Lauderdale
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300">
            Las consultas para nuevos pacientes son <strong>gratis</strong> y
            normalmente se programan dentro de 5 días hábiles. Si tiene
            laboratorios previos (de los últimos 12 meses), tráigalos.
          </p>
          <dl className="grid gap-3 text-zinc-700 sm:grid-cols-2 dark:text-zinc-300">
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Teléfono
              </dt>
              <dd>
                <a
                  href={business.phone.href}
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  {business.phone.display}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                En línea
              </dt>
              <dd>
                <Link
                  href="/es/contacto/"
                  className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
                >
                  Reserve su consulta gratis →
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Dirección (área de Fort Lauderdale)
              </dt>
              <dd className="not-italic">{business.address.displayLine1}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Horario
              </dt>
              <dd>Lun–Vie 8:00 AM – 6:00 PM · Sáb con cita</dd>
            </div>
          </dl>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={business.phone.href}
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full bg-zinc-900 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Llame al {business.phone.display}
            </a>
            <Link
              href="/es/contacto/"
              className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-full border border-zinc-300 px-7 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Reservar en línea
            </Link>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <p>
            Revisado clínicamente por{" "}
            <Link
              href={activeReviewer.href}
              className="font-medium text-zinc-700 underline-offset-2 hover:underline dark:text-zinc-300"
            >
              {activeReviewer.name}
            </Link>
            {activeReviewer.isNamedPhysician ? ", MD" : ""}. Última
            actualización <time dateTime={LAST_REVIEWED}>{LAST_REVIEWED}</time>.
          </p>
          <p className="text-xs italic">
            Las afirmaciones clínicas de esta página citan a Mayo Clinic, la
            American Urological Association, la Endocrine Society y la FDA de
            EE. UU. Esta página es informativa y no sustituye una evaluación
            médica en persona.
          </p>
        </footer>
      </div>
    </>
  );
}
