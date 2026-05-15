// STR-137 — interim publish gate for medical-author identity.
//
// Until STR-50 returns a verified medical director (name, NPI, license,
// board cert, photo), we do NOT render a literal physician identity in
// rendered HTML or JSON-LD. The placeholder data in `@/lib/physician`
// and the reviewer-card / Physician-schema components are intentionally
// kept; this flag is the single switch that decides whether they emit
// or whether we fall back to the generic clinical-team surface.
//
// When `hasVerifiedMedicalDirector` flips to `true`:
//   - `activeReviewer` resolves to the real provider record,
//   - schema builders emit the Physician/Person node again,
//   - the CitationBlock + per-page "Your physician" sections render
//     the named provider link,
//   - the noindex on /providers/, /medical-reviewer/, and the provider
//     bio routes can be lifted in a follow-up.
//
// This is a deliberately small, reversible config flip.

import { drAngelRivera } from "@/lib/physician";

export const hasVerifiedMedicalDirector = false as boolean;

export type ActiveReviewer = {
  slug: string;
  name: string;
  familyName: string;
  jobTitle: string;
  honorificSuffix: string;
  description: string;
  href: string;
  isNamedPhysician: boolean;
};

const clinicalTeamReviewer: ActiveReviewer = {
  slug: "clinical-team",
  name: "Strong Health Miami's clinical team",
  familyName: "Strong",
  jobTitle: "Clinical Team",
  honorificSuffix: "",
  description:
    "Every patient at Strong Health Miami is evaluated by a Florida-licensed physician on our clinical team. Treatment plans, lab review, and follow-ups happen under physician supervision in our Miami clinic.",
  href: "/medical-reviewer/",
  isNamedPhysician: false,
};

const namedPhysicianReviewer: ActiveReviewer = {
  slug: drAngelRivera.slug,
  name: drAngelRivera.name,
  familyName: drAngelRivera.familyName,
  jobTitle: drAngelRivera.jobTitle,
  honorificSuffix: drAngelRivera.honorificSuffix,
  description: drAngelRivera.description,
  href: `/providers/${drAngelRivera.slug}/`,
  isNamedPhysician: true,
};

export const activeReviewer: ActiveReviewer = hasVerifiedMedicalDirector
  ? namedPhysicianReviewer
  : clinicalTeamReviewer;
