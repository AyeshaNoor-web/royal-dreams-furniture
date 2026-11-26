import "server-only";

/** The caller's IP for rate limiting. Never logged. */
export const clientIp = (req: Request) => {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
};

/**
 * Same-origin check for POSTs. Browsers always send Origin on cross-site and same-site POSTs made by fetch,
 * so a missing or foreign Origin means the request did not come from our pages.
 */
export const sameOrigin = (req: Request) => {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

export const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });
