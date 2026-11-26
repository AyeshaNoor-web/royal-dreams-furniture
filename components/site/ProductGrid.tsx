"use client";

import { useEffect, useState } from "react";
import ProductCard, { type CardItem } from "./ProductCard";

export interface Filter {
  id: string;
  label: string;
}

interface Props {
  items: CardItem[];
  filters?: Filter[];
  /** Which field of a card a filter id is matched against. */
  by?: "type" | "slug";
  /** Query-string key that pre-selects a filter, e.g. ?type=majlis */
  param?: string;
  allLabel?: string;
}

/** A grid of products, one photo each, with optional filter chips above it. */
export default function ProductGrid({ items, filters = [], by = "type", param = "type", allLabel = "All" }: Props) {
  const [f, setF] = useState("all");

  // Read the filter from the address after mount so the page itself stays static.
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(param);
    if (v && filters.some((x) => x.id === v)) setF(v);
  }, [param, filters]);

  const pick = (id: string) => {
    setF(id);
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete(param); else url.searchParams.set(param, id);
    window.history.replaceState(null, "", url);
  };

  const shown = f === "all" ? items : items.filter((i) => i[by] === f);
  const count = (id: string) => items.filter((i) => i[by] === id).length;

  return (
    <div>
      {filters.length > 1 && (
        <div className="no-scrollbar -mx-5 mb-7 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter">
          <button type="button" aria-pressed={f === "all"} onClick={() => pick("all")} className={"chip shrink-0 " + (f === "all" ? "chip-on" : "")}>{allLabel} <span className="opacity-60">{items.length}</span></button>
          {filters.map((x) => (
            <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => pick(x.id)} className={"chip shrink-0 " + (f === x.id ? "chip-on" : "")}>{x.label} <span className="opacity-60">{count(x.id)}</span></button>
          ))}
        </div>
      )}
      <p className="sr-only" aria-live="polite">{shown.length} designs shown</p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
        {shown.map((item, n) => (
          <li key={item.href}><ProductCard item={item} priority={n < 4} /></li>
        ))}
      </ul>
    </div>
  );
}
