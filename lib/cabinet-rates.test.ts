import { describe, expect, it } from "vitest";
import { pricing } from "@/config/pricing.config";
import { aed, cabinetRates } from "@/lib/cabinet-rates";

// The home page price guide shows these three figures publicly; the estimator reads the same figures from the
// pricing config. They must never drift apart.
describe("public cabinet rates", () => {
  it("match the confirmed rates in the pricing config for both cabinet collections", () => {
    const byTier = { wood: "standard", "wood-glass": "premium", "aluminium-glass": "bespoke" } as const;
    for (const slug of ["fitted-wardrobes", "walk-in-closets"]) {
      const p = pricing.find((x) => x.slug === slug)!;
      expect(p.confirmed, slug + " must be marked as confirmed by the client").toBeTruthy();
      expect(p.unit).toBe("sqm");
      for (const r of cabinetRates) {
        const range = p.rates[byTier[r.id]];
        expect(range.min).toBe(r.rate);
        expect(range.max).toBe(r.rate);
        expect(p.tierOptions?.[byTier[r.id]].label).toBe(r.label);
      }
    }
  });

  it("formats dirhams with thousands separators", () => {
    expect(aed(5460)).toBe("AED 5,460");
    expect(aed(700)).toBe("AED 700");
  });
});
