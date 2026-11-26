import { allImages, getCategory, type GalleryImage } from "./gallery";

const pad = (n: number) => String(n).padStart(2, "0");

/** A photo by its file number (sofas-02.jpg is photo("sofas", 2)), so a chosen picture never shifts when the gallery order changes. */
export const photo = (slug: string, n: number): GalleryImage => {
  const src = "/images/" + slug + "/" + slug + "-" + pad(n) + ".jpg";
  const hit = allImages.find((i) => i.src === src);
  if (hit) return hit;
  const c = getCategory(slug);
  if (!c) throw new Error("Unknown category " + slug);
  return c.cover;
};
