// Light, serialisable versions of products and collections for client components and cards.
import { categories, type Category } from "./gallery";
import { mediaLabel, products, productsOf, type Product } from "./products";
import { priceLabel } from "./pricing";
import type { CardItem } from "@/components/site/ProductCard";

export const toCard = (p: Product, meta: "category" | "price" = "category"): CardItem => ({
  href: p.href,
  title: p.title,
  meta: meta === "category" ? p.category.title : priceLabel(p.slug),
  src: p.cover.src,
  alt: p.cover.alt,
  media: mediaLabel(p),
  hasVideo: p.videos.length > 0,
  type: p.type,
  slug: p.slug,
});

export interface CategoryCardItem {
  slug: string;
  href: string;
  title: string;
  short: string;
  price: string;
  priced: boolean;
  src: string;
  alt: string;
  count: number;
  thumbs: string[];
}

export const toCategoryCard = (c: Category): CategoryCardItem => {
  const list = productsOf(c.slug);
  const label = priceLabel(c.slug);
  return {
    slug: c.slug,
    href: "/collections/" + c.slug,
    title: c.title,
    short: c.short,
    price: label,
    priced: label.startsWith("From"),
    src: c.cover.src,
    alt: c.cover.alt,
    count: list.length,
    thumbs: list.filter((p) => p.cover.src !== c.cover.src).slice(0, 3).map((p) => p.cover.src),
  };
};

export const categoryCards = () => categories.map(toCategoryCard);
export const allCards = () => products.map((p) => toCard(p));
