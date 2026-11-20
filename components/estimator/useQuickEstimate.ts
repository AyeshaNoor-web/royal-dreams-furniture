"use client";

import { useEffect, useRef, useState } from "react";
import type { EstimateResult, PublicCatalogue } from "@/lib/pricing";
import type { Tier } from "@/config/pricing.config";

/** The home page's three-control estimate: one piece, size, tier. Recalculates on the server as the controls move. */
export function useQuickEstimate(catalogue: PublicCatalogue) {
  const first = catalogue.collections[0];
  const [slug, setSlug] = useState(first.slug);
  const [size, setSize] = useState(first.size.default);
  const [tier, setTier] = useState<Tier>("standard");
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abort = useRef<AbortController | null>(null);

  const collection = catalogue.collections.find((c) => c.slug === slug) ?? first;

  const choose = (s: string) => {
    const c = catalogue.collections.find((x) => x.slug === s);
    if (!c) return;
    setSlug(c.slug);
    setSize(c.size.default);
  };

  useEffect(() => {
    if (!Number.isFinite(size)) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      abort.current?.abort();
      const controller = new AbortController();
      abort.current = controller;
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [{ collection: slug, size, tier, extras: [] }] }), signal: controller.signal });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: EstimateResult; error?: string };
        if (!res.ok || !data.ok || !data.result) throw new Error(data.error || "Could not calculate an estimate.");
        setResult(data.result);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Could not calculate an estimate.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [slug, size, tier]);

  useEffect(() => () => abort.current?.abort(), []);

  return { collection, slug, size, tier, result, loading, error, choose, setSize, setTier };
}
