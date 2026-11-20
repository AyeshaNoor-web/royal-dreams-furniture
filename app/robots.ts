import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const isProduction = process.env.VERCEL_ENV === "production";

/** Previews (and local builds) disallow everything; only the production deployment is crawlable. */
export default function robots(): MetadataRoute.Robots {
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: SITE.url + "/sitemap.xml" };
}
