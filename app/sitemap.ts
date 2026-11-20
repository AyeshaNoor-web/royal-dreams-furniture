import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { categories } from "@/lib/gallery";
import { estimatorEnabled } from "@/lib/flags";

export default function sitemap(): MetadataRoute.Sitemap {
  // Preview deployments publish no URLs.
  if (process.env.VERCEL_ENV !== "production") return [];
  const now = new Date();
  const pages = ["", "/collections", "/gallery", "/about", "/contact", ...(estimatorEnabled ? ["/estimator"] : [])].map((p) => ({
    url: SITE.url + p,
    lastModified: now,
  }));
  const cats = categories.map((c) => ({ url: SITE.url + "/collections/" + c.slug, lastModified: now }));
  return [...pages, ...cats];
}
