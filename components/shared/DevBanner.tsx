import { PLACEHOLDER_DATA } from "@/config/pricing.config";
import { estimatorEnabled } from "@/lib/flags";

/** Server component. A thin strip that says the estimator is running on placeholder prices. Never shown in production. */
export default function DevBanner() {
  const production = process.env.VERCEL_ENV === "production";
  const show = PLACEHOLDER_DATA && !production && (process.env.NODE_ENV === "development" || estimatorEnabled);
  if (!show) return null;
  return (
    <div role="status" className="bg-[#7a1f1f] px-4 py-2 text-center font-dm text-[13px] text-white">
      Placeholder pricing data. The estimator cannot go to production until <code>config/pricing.config.ts</code> has the client&apos;s rates.
      {estimatorEnabled ? " Estimator: on." : " Estimator: off."}
    </div>
  );
}
