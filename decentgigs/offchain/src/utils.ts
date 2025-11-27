import { Data, SpendingValidator, fromText } from "@lucid-evolution/lucid";
import * as fs from "fs";

// ═══════════════════════════════════════════════════════════════
// DATUM & REDEEMER SCHEMAS
// ═══════════════════════════════════════════════════════════════

const JobDatumSchema = Data.Object({
  employer: Data.Bytes(),
  freelancer: Data.Bytes(),
  job_id: Data.Bytes(),
});

type JobDatum = Data.Static<typeof JobDatumSchema>;
export const JobDatum = JobDatumSchema as unknown as JobDatum;

const JobActionSchema = Data.Enum([
  Data.Object({ ReleasePayment: Data.Tuple([]) }),
  Data.Object({ CancelJob: Data.Tuple([]) }),
]);

type JobAction = Data.Static<typeof JobActionSchema>;
export const JobAction = JobActionSchema as unknown as JobAction;

// ═══════════════════════════════════════════════════════════════
// READ VALIDATOR FROM PLUTUS.JSON
// ═══════════════════════════════════════════════════════════════

export function readValidator(): SpendingValidator {
  const plutusJson = JSON.parse(fs.readFileSync("plutus.json", "utf8"));
  
  const validator = plutusJson.validators.find(
    (v: any) => v.title === "decentgigs.decentgigs"
  );

  if (!validator) {
    throw new Error("Validator 'decentgigs.decentgigs' not found in plutus.json");
  }

  return {
    type: "PlutusV3",
    script: validator.compiledCode,
  };
}

// ═══════════════════════════════════════════════════════════════
// DATUM BUILDERS
// ═══════════════════════════════════════════════════════════════

export function createJobDatum(
  employerPkh: string,
  freelancerPkh: string,
  jobId: string = "default_job_001"
): string {
  const datum: JobDatum = {
    employer: employerPkh,
    freelancer: freelancerPkh,
    job_id: fromText(jobId),
  };

  return Data.to(datum, JobDatum);
}

// ═══════════════════════════════════════════════════════════════
// REDEEMER BUILDERS
// ═══════════════════════════════════════════════════════════════

export const redeemerRelease = Data.to(
  { ReleasePayment: [] } as JobAction,
  JobAction
);

export const redeemerCancel = Data.to(
  { CancelJob: [] } as JobAction,
  JobAction
);