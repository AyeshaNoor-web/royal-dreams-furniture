import type { EstimatorItem } from "@/components/site/Estimator";
import { categories } from "./gallery";
import { factorsOf, priceOf } from "./pricing";

/** The estimator's list: priced collections first, then the rest in catalogue order. */
export const estimatorItems: EstimatorItem[] = categories
  .map((c) => {
    const f = factorsOf(c.slug);
    return { slug: c.slug, title: c.title, priced: priceOf(c.slug), depends: f?.depends ?? [], send: f?.send ?? "A photo of the room and rough sizes." };
  })
  .sort((a, b) => Number(!!b.priced) - Number(!!a.priced));
