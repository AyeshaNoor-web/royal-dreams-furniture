"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EstimateItemInput, EstimateResult, PublicCatalogue } from "@/lib/pricing";

export type Step = "collection" | "size" | "tier" | "extras" | "emirate" | "result";
export type Draft = Partial<EstimateItemInput> & { extras: string[] };

const KEY = "mfc-estimate";
const empty = (): Draft => ({ extras: [] });

/** The multi-step flow plus the room basket. All maths happens on the server; this only sends selections. */
export function useEstimator(catalogue: PublicCatalogue, initialCollection?: string) {
  const [step, setStep] = useState<Step>("collection");
  const [draft, setDraft] = useState<Draft>(empty);
  const [items, setItems] = useState<EstimateItemInput[]>([]);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ready = useRef(false);

  // Restore a basket from this tab, and honour a ?c=slug deep link from the chat or home page.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      const saved = raw ? (JSON.parse(raw) as EstimateItemInput[]) : [];
      if (Array.isArray(saved) && saved.length) setItems(saved.filter((i) => catalogue.collections.some((c) => c.slug === i.collection)));
    } catch { /* storage blocked */ }
    const slug = initialCollection ?? new URLSearchParams(window.location.search).get("c");
    const c = slug ? catalogue.collections.find((x) => x.slug === slug) : undefined;
    if (c) {
      setDraft({ collection: c.slug, size: c.size.default, extras: [] });
      setStep("size");
    }
    ready.current = true;
  }, [catalogue, initialCollection]);

  const calculate = useCallback(async (list: EstimateItemInput[]) => {
    if (list.length === 0) { setResult(null); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/estimate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: list }) });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; result?: EstimateResult; error?: string };
      if (!res.ok || !data.ok || !data.result) throw new Error(data.error || "Could not calculate an estimate.");
      setResult(data.result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not calculate an estimate.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    try { sessionStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
    void calculate(items);
  }, [items, calculate]);

  const collection = catalogue.collections.find((c) => c.slug === draft.collection);

  const choose = (slug: string) => {
    const c = catalogue.collections.find((x) => x.slug === slug)!;
    setDraft({ collection: slug, size: c.size.default, extras: [] });
    setStep("size");
  };
  const setSize = (size: number) => setDraft((d) => ({ ...d, size }));
  const setTier = (tier: EstimateItemInput["tier"]) => setDraft((d) => ({ ...d, tier }));
  const toggleExtra = (id: string) => setDraft((d) => ({ ...d, extras: d.extras.includes(id) ? d.extras.filter((x) => x !== id) : [...d.extras, id] }));
  const setEmirate = (emirate: string) => setDraft((d) => ({ ...d, emirate }));

  /** Which step follows the current one, skipping steps that have nothing to ask. */
  const next = () => {
    if (step === "size") return setStep("tier");
    if (step === "tier") return setStep(collection && collection.extras.length ? "extras" : catalogue.emirateStep ? "emirate" : "result");
    if (step === "extras") return setStep(catalogue.emirateStep ? "emirate" : "result");
    if (step === "emirate") return setStep("result");
  };
  const back = () => {
    const order: Step[] = ["collection", "size", "tier", ...(collection?.extras.length ? ["extras" as const] : []), ...(catalogue.emirateStep ? ["emirate" as const] : []), "result"];
    const i = order.indexOf(step);
    if (i > 0) setStep(order[i - 1]);
  };
  /** Adds the draft to the basket and shows the result. */
  const finish = () => {
    if (!draft.collection || !draft.size || !draft.tier) return;
    setItems((list) => [...list, { collection: draft.collection!, size: draft.size!, tier: draft.tier!, extras: draft.extras, emirate: draft.emirate }]);
    setStep("result");
  };
  const addAnother = () => { setDraft(empty()); setStep("collection"); };
  const remove = (index: number) => setItems((list) => list.filter((_, i) => i !== index));
  const reset = () => { setItems([]); setDraft(empty()); setStep("collection"); };

  return { step, setStep, draft, collection, items, result, loading, error, choose, setSize, setTier, toggleExtra, setEmirate, next, back, finish, addAnother, remove, reset, retry: () => calculate(items) };
}

export type Estimator = ReturnType<typeof useEstimator>;
