import { estimate, estimateRequestSchema, EstimateError } from "@/lib/pricing";
import { clientIp, json, sameOrigin } from "@/lib/request-guard";
import { rateLimit } from "@/lib/ratelimit";

export const dynamic = "force-dynamic";

/** Body: { items: [{ collection, size, tier, extras?, emirate? }] }. Returns ranges only; rates stay on the server. */
export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_ESTIMATOR_ENABLED !== "true") return json(404, { ok: false, error: "Not found" });
  if (!sameOrigin(req)) return json(403, { ok: false, error: "Forbidden" });

  const limit = await rateLimit(clientIp(req), "estimate");
  if (!limit.success) return json(429, { ok: false, error: "Too many requests. Please wait a minute." });

  const body = await req.json().catch(() => null);
  const parsed = estimateRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json(422, {
      ok: false,
      error: "Invalid selection",
      issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }

  try {
    return json(200, { ok: true, result: estimate(parsed.data) });
  } catch (e) {
    if (e instanceof EstimateError) return json(422, { ok: false, error: e.message, code: e.code });
    return json(500, { ok: false, error: "Could not calculate an estimate" });
  }
}
