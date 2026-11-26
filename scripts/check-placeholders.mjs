// Runs before `next build`. Fails a Vercel PRODUCTION build when the estimator is switched on while the pricing
// file still holds placeholder numbers. Preview and local builds always pass.
import { readFileSync } from "node:fs";

const src = readFileSync(new URL("../config/pricing.config.ts", import.meta.url), "utf8");
const placeholder = /export const PLACEHOLDER_DATA\s*=\s*true/.test(src);
const production = process.env.VERCEL_ENV === "production" || process.env.CHECK_PLACEHOLDERS === "production";
const estimatorOn = process.env.ESTIMATOR_ENABLED === "true";

if (placeholder && production && estimatorOn) {
  console.error(
    "\nBuild stopped: ESTIMATOR_ENABLED=true but config/pricing.config.ts still has PLACEHOLDER_DATA = true.\n" +
      "Replace the placeholder rates with the client's figures and set PLACEHOLDER_DATA to false, or set ESTIMATOR_ENABLED=false.\n"
  );
  process.exit(1);
}
if (placeholder && estimatorOn) console.warn("Estimator is enabled with PLACEHOLDER pricing data (allowed outside production).");
