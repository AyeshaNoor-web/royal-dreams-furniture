// Light, serialisable versions of products and collections for client components and cards.
import { categories, type Category } from "./gallery";
import { products, productsOf, type Product } from "./products";
import type { CardItem } from "@/components/site/ProductCard";

export const toCard = (p: Product, meta: "category" | "none" = "category"): CardItem => ({
  href: p.href,
  title: p.title,
  meta: meta === "category" ? p.category.title : "",
  src: p.cover.src,
  alt: p.cover.alt,
  type: p.type,
  slug: p.slug,
});

export interface CategoryCardItem {
  slug: string;
  href: string;
  title: string;
  short: string;
  src: string;
  alt: string;
  count: number;
  thumbs: string[];
}

export const toCategoryCard = (c: Category): CategoryCardItem => {
  const list = productsOf(c.slug);
  return {
    slug: c.slug,
    href: "/collections/" + c.slug,
    title: c.title,
    short: c.short,
    src: c.cover.src,
    alt: c.cover.alt,
    count: list.length,
    thumbs: list.filter((p) => p.cover.src !== c.cover.src).slice(0, 3).map((p) => p.cover.src),
  };
};

export const categoryCards = () => categories.map(toCategoryCard);
export const allCards = () => products.map((p) => toCard(p));
