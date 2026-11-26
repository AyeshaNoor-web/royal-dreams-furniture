import { describe, expect, it } from "vitest";
import { aedRange, summaryText, unitWords } from "@/lib/estimate-format";
import { estimate } from "@/lib/pricing";

describe("unitWords", () => {
  it("singularises only when the count is one", () => {
    expect(unitWords(1, "beds")).toBe("bed");
    expect(unitWords(1, "metres of wall")).toBe("metre of wall");
    expect(unitWords(1, "square metres")).toBe("square metre");
    expect(unitWords(1, "dressing tables")).toBe("dressing table");
    expect(unitWords(2, "beds")).toBe("beds");
    expect(unitWords(1.5, "metres of wall")).toBe("metres of wall");
  });
});

describe("aedRange", () => {
  it("shows one figure when both ends match", () => {
    expect(aedRange(5600, 5600)).toBe("AED 5,600");
    expect(aedRange(5600, 7200)).toBe("AED 5,600 to 7,200");
  });
});

describe("summaryText", () => {
  it("lists every line, the total range and the VAT note, without rates", () => {
    const r = estimate({ items: [{ collection: "beds", size: 1, tier: "bespoke", extras: ["headboard-wall"] }, { collection: "curtains", size: 3, tier: "standard", extras: [] }] });
    const t = summaryText(r, "https://www.example.com");
    expect(t).toContain("Indicative estimate from www.example.com");
    expect(t).toContain("- Beds, 1 bed, Bespoke, with lit headboard wall: " + aedRange(r.lines[0].range.min, r.lines[0].range.max));
    expect(t).toContain("- Curtains, 3 windows, Standard: ");
    expect(t).toContain("Total: " + aedRange(r.total.min, r.total.max) + " (excludes 5% VAT).");
    expect(t).not.toMatch(/per (bed|window|seat)/);
  });
});
