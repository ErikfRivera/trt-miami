// Single source of truth for all physicians at Strong Health.
// Credentials + identity land via STR-50 / STR-37; placeholders used until then.
import { drAngelRivera } from "@/lib/physician";

export type ProviderRecord = {
  slug: string;
  name: string;
  givenName: string;
  familyName: string;
  honorificPrefix: string;
  honorificSuffix: string;
  jobTitle: string;
  specialty: string;
  npi: string;
  license: string;
  licensingBoard: string;
  boardCertification: string;
  boardYear: string;
  languages: readonly string[];
  description: string;
  summary: string;
  image: string;
  url: string;
};

export const providers: readonly ProviderRecord[] = [
  {
    slug: drAngelRivera.slug,
    name: drAngelRivera.name,
    givenName: drAngelRivera.givenName,
    familyName: drAngelRivera.familyName,
    honorificPrefix: drAngelRivera.honorificPrefix,
    honorificSuffix: drAngelRivera.honorificSuffix,
    jobTitle: drAngelRivera.jobTitle,
    specialty: "Internal Medicine · Men's Hormone Health",
    npi: drAngelRivera.npi,
    license: drAngelRivera.license,
    licensingBoard: drAngelRivera.licensingBoard,
    boardCertification: drAngelRivera.boardCertification,
    boardYear: drAngelRivera.boardCertificationYear,
    languages: ["English", "Spanish"],
    description: drAngelRivera.description,
    summary:
      "{PHYSICIAN_NAME} is a Florida-licensed physician who leads the testosterone replacement therapy program at our Miami clinic. He focuses on protocol design, patient safety monitoring, and individualized dose titration based on free and total testosterone, hematocrit, estradiol, and PSA. He reviews every clinical page on this site.",
    image: drAngelRivera.image,
    url: drAngelRivera.url,
  },
] as const;

export function getProviderBySlug(slug: string): ProviderRecord | undefined {
  return providers.find((p) => p.slug === slug);
}

// The primary medical reviewer — defaults to lead physician per STR-98 brief §3.3.
export const primaryReviewer = providers[0];
