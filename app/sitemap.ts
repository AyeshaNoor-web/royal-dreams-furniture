import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { categories } from "@/lib/gallery";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/collections", "/pricing", "/quote", "/gallery", "/about", "/contact"].map((p) => ({
    url: SITE.url + p,
    lastModified: now,
  }));
  const cats = categories.map((c) => ({ url: SITE.url + "/collections/" + c.slug, lastModified: now }));
  const items = products.map((p) => ({ url: SITE.url + p.href, lastModified: now }));
  return [...pages, ...cats, ...items];
}
