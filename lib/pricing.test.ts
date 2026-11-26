import { describe, expect, it } from "vitest";
import { pricing, tiers } from "@/config/pricing.config";
import { estimate, estimateLine, estimateRequestSchema, EstimateError, publicCatalogue } from "@/lib/pricing";

const first = (slug: string) => pricing.find((p) => p.slug === slug)!;

describe("estimateLine", () => {
  it("multiplies size by the tier rate and rounds to the nearest 100", () => {
    const p = first("tv-units");
    const line = estimateLine({ collection: "tv-units", size: 3.5, tier: "premium", extras: [] });
    expect(line.range.min).toBe(Math.round((3.5 * p.rates.premium.min) / 100) * 100);
    expect(line.range.max).toBe(Math.round((3.5 * p.rates.premium.max) / 100) * 100);
    expect(line.range.min % 100).toBe(0);
    expect(line.range.max % 100).toBe(0);
    expect(line.range.min).toBeLessThanOrEqual(line.range.max);
  });

  it("placeholder collections return a band; confirmed exact rates return one figure", () => {
    for (const p of pricing) for (const t of tiers) {
      const line = estimateLine({ collection: p.slug, size: p.size.default, tier: t.id, extras: [] });
      if (p.rates[t.id].min === p.rates[t.id].max) {
        expect(p.confirmed, `${p.slug}/${t.id} is exact but not marked confirmed`).toBeTruthy();
        expect(line.range.min).toBe(line.range.max);
      } else {
        expect(line.range.min, `${p.slug}/${t.id}`).toBeLessThan(line.range.max);
      }
    }
  });

  it("prices cabinets by door type per square metre of front, at the client's rates", () => {
    const w = estimateLine({ collection: "fitted-wardrobes", size: 8, tier: "standard", extras: [] });
    expect(w.range).toEqual({ min: 5600, max: 5600 });
    expect(w.tierLabel).toBe("Simple wood doors");
    expect(w.formula).toBe("8 square metres of cabinet front x AED 700 per square metre");
    expect(estimateLine({ collection: "fitted-wardrobes", size: 8, tier: "premium", extras: [] }).range.min).toBe(7200);
    expect(estimateLine({ collection: "walk-in-closets", size: 10, tier: "bespoke", extras: [] }).range.max).toBe(11000);
  });

  it("clamps sizes to the configured bounds and reports it", () => {
    const p = first("curtains");
    const low = estimateLine({ collection: "curtains", size: 0.1, tier: "standard", extras: [] });
    const high = estimateLine({ collection: "curtains", size: 10_000, tier: "standard", extras: [] });
    expect(low.size).toBe(p.size.min);
    expect(low.clamped).toBe(true);
    expect(high.size).toBe(p.size.max);
    expect(high.clamped).toBe(true);
    const ok = estimateLine({ collection: "curtains", size: 3, tier: "standard", extras: [] });
    expect(ok.clamped).toBe(false);
  });

  it("snaps to the step so 2.34 metres becomes 2.3", () => {
    const line = estimateLine({ collection: "tv-units", size: 2.34, tier: "standard", extras: [] });
    expect(line.size).toBe(2.3);
  });

  it("covers every unit type", () => {
    const units = new Set(pricing.map((p) => p.unit));
    expect([...units].sort()).toEqual(["metre", "piece", "seat", "sqm", "window"]);
    for (const unit of units) {
      const p = pricing.find((x) => x.unit === unit)!;
      const line = estimateLine({ collection: p.slug, size: p.size.default, tier: "standard", extras: [] });
      expect(line.formula).toContain(p.perLabel);
    }
  });

  it("adds flat extras once and per-unit extras by size", () => {
    const p = first("curtains");
    const motor = p.extras.find((e) => e.id === "motorised")!;
    const base = estimateLine({ collection: "curtains", size: 4, tier: "standard", extras: [] });
    const withMotor = estimateLine({ collection: "curtains", size: 4, tier: "standard", extras: ["motorised"] });
    expect(withMotor.range.min - base.range.min).toBe(Math.round((4 * p.rates.standard.min + 4 * motor.rate.min) / 100) * 100 - base.range.min);
    const beds = first("beds");
    const island = beds.extras.find((e) => e.id === "storage-base")!;
    const b0 = estimateLine({ collection: "beds", size: 2, tier: "standard", extras: [] });
    const b1 = estimateLine({ collection: "beds", size: 2, tier: "standard", extras: ["storage-base"] });
    expect(b1.range.max - b0.range.max).toBe(Math.round((2 * beds.rates.standard.max + island.rate.max) / 100) * 100 - b0.range.max);
    expect(withMotor.formula).toContain("plus motorised track");
  });

  it("rejects unknown extras with a structured error", () => {
    expect(() => estimateLine({ collection: "sofas", size: 4, tier: "standard", extras: ["gold-leaf"] })).toThrowError(EstimateError);
  });
});

describe("estimateRequestSchema", () => {
  it("rejects unknown collections, tiers, negative sizes and empty baskets", () => {
    expect(estimateRequestSchema.safeParse({ items: [{ collection: "yachts", size: 1, tier: "standard" }] }).success).toBe(false);
    expect(estimateRequestSchema.safeParse({ items: [{ collection: "sofas", size: 1, tier: "platinum" }] }).success).toBe(false);
    expect(estimateRequestSchema.safeParse({ items: [{ collection: "sofas", size: -3, tier: "standard" }] }).success).toBe(false);
    expect(estimateRequestSchema.safeParse({ items: [{ collection: "sofas", size: "4", tier: "standard" }] }).success).toBe(false);
    expect(estimateRequestSchema.safeParse({ items: [] }).success).toBe(false);
    expect(estimateRequestSchema.safeParse({ items: [{ collection: "sofas", size: 4, tier: "standard" }] }).success).toBe(true);
  });

  it("caps a basket at ten lines", () => {
    const item = { collection: "sofas", size: 4, tier: "standard" };
    expect(estimateRequestSchema.safeParse({ items: Array(11).fill(item) }).success).toBe(false);
  });
});

describe("estimate", () => {
  it("sums line ranges into a total and carries the VAT note", () => {
    const r = estimate({ items: [
      { collection: "sofas", size: 4, tier: "standard", extras: [] },
      { collection: "curtains", size: 3, tier: "premium", extras: [] },
    ] });
    expect(r.total.min).toBe(r.lines[0].range.min + r.lines[1].range.min);
    expect(r.total.max).toBe(r.lines[0].range.max + r.lines[1].range.max);
    expect(r.vatPercent).toBe(5);
    expect(r.disclaimer).toMatch(/excludes 5% VAT/);
  });
});

describe("publicCatalogue", () => {
  it("exposes every collection without any rate", () => {
    const c = publicCatalogue();
    expect(c.collections).toHaveLength(pricing.length);
    expect(JSON.stringify(c)).not.toMatch(/"rates"|"rate"|"min":\s*\d{3,}/);
    expect(c.collections[0]).toHaveProperty("size.min");
    expect(c.emirateStep).toBe(false);
    const w = c.collections.find((x) => x.slug === "fitted-wardrobes")!;
    expect(w.confirmed).toBe(true);
    expect(w.tiers?.map((t) => t.label)).toEqual(["Simple wood doors", "Wood-framed glass doors", "Aluminium-framed glass doors"]);
    expect(c.collections.find((x) => x.slug === "sofas")!.tiers).toBeUndefined();
  });
});
