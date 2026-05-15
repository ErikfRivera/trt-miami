/**
 * Build-time schema @id host parity check (STR-133).
 *
 * The JSON-LD graph is only coherent when every `@id` URI shares the canonical
 * site host. Cross-host `@id` values split the entity (Physician on apex vs.
 * page on subdomain looks like two people to Google) and reference URLs that
 * don't resolve. This check fails the build if any emitted Physician or
 * MedicalBusiness `@id` strays off `siteUrl`'s host.
 *
 * Run via: npx tsx scripts/validate-schema-ids.ts
 */
import { siteUrl } from "../src/lib/site";
import { drAngelRivera } from "../src/lib/physician";
import { buildPhysician } from "../src/lib/schema/physician";
import { buildMedicalBusiness } from "../src/lib/schema/business";

const canonicalHost = new URL(siteUrl).host;

let errors = 0;

function check(label: string, value: unknown) {
  if (typeof value !== "string") {
    console.error(`[schema-ids] ${label}: expected string, got ${typeof value}`);
    errors++;
    return;
  }
  let host: string;
  try {
    host = new URL(value).host;
  } catch {
    console.error(`[schema-ids] ${label}: not a valid absolute URL: ${value}`);
    errors++;
    return;
  }
  if (host !== canonicalHost) {
    console.error(
      `[schema-ids] ${label}: host \`${host}\` does not match canonical \`${canonicalHost}\` (value: ${value})`,
    );
    errors++;
  }
}

const physician = buildPhysician() as Record<string, unknown>;
check("Physician.@id", physician["@id"]);
check("Physician.url", physician["url"]);

const business = buildMedicalBusiness() as Record<string, unknown>;
check("MedicalBusiness.@id", business["@id"]);
check("MedicalBusiness.url", business["url"]);
check("MedicalBusiness.logo", business["logo"]);
check("MedicalBusiness.image", business["image"]);

check("drAngelRivera.url (source)", drAngelRivera.url);

if (errors > 0) {
  console.error(`[schema-ids] ${errors} host parity error(s)`);
  process.exit(1);
}
console.log(`[schema-ids] OK — all checked @id/url values on \`${canonicalHost}\``);
