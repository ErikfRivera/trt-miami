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
    // STR-132 §4 — interpolate the physician's display name directly from the
    // shared fixture so the `{PHYSICIAN_NAME}` template token cannot leak into
    // rendered HTML. Once STR-131 (real identity) lands, `drAngelRivera.name`
    // is updated in one place and every surface that reads `provider.summary`
    // picks up the new name.
    summary: `${drAngelRivera.name} is a Florida-licensed physician who leads the testosterone replacement therapy program at our Miami clinic. He focuses on protocol design, patient safety monitoring, and individualized dose titration based on free and total testosterone, hematocrit, estradiol, and PSA. He reviews every clinical page on this site.`,
    image: drAngelRivera.image,
    url: drAngelRivera.url,
  },
] as const;

export function getProviderBySlug(slug: string): ProviderRecord | undefined {
  return providers.find((p) => p.slug === slug);
}

// STR-132 §5 — render the provider's display name without double-stamping the
// post-nominal suffix when `name` already carries it (e.g. "Dr. Placeholder,
// MD" with `honorificSuffix: "MD"` must not become "…, MD, MD"). Returns
// `name` unchanged when the suffix is empty or already present at the tail;
// otherwise appends `", <suffix>"`. Once STR-131 lands a real-name fixture
// without an embedded suffix, the published case ("Jane Doe" + "MD") becomes
// "Jane Doe, MD" with no template changes.
export function providerDisplayName(
  provider: Pick<ProviderRecord, "name" | "honorificSuffix">,
): string {
  const name = provider.name.trim();
  const suffix = provider.honorificSuffix.trim();
  if (!suffix) return name;
  if (
    name === suffix ||
    name.endsWith(`, ${suffix}`) ||
    name.endsWith(` ${suffix}`)
  ) {
    return name;
  }
  return `${name}, ${suffix}`;
}

// The primary medical reviewer — defaults to lead physician per STR-98 brief §3.3.
export const primaryReviewer = providers[0];
