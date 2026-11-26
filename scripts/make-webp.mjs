// Generates the 480, 960 and 1600px WebP siblings that lib/image-loader.ts serves. Run after adding photos:
//   node scripts/make-webp.mjs
// Uses the `sharp` package if present, otherwise prints the Python/Pillow fallback used so far. Existing files are kept.
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const roots = ["public/images", "public/video"];
const widths = [480, 960, 1600];
const jpgs = [];
const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (extname(p) === ".jpg") jpgs.push(p); } };
roots.forEach((r) => existsSync(r) && walk(r));

let sharp;
try { sharp = (await import("sharp")).default; } catch { sharp = null; }
if (!sharp) {
  console.log(`${jpgs.length} photos found. 'sharp' is not installed; run the Pillow version instead:\n  python -I scratchpad/webp-pipeline.py  (see HANDOVER-CHECKLIST.md section 12)`);
  process.exit(0);
}
let made = 0;
for (const p of jpgs) {
  const meta = await sharp(p).metadata();
  for (const w of widths) {
    const out = p.replace(/\.jpg$/, `-${w}w.webp`);
    if (existsSync(out)) continue;
    await sharp(p).rotate().resize({ width: Math.min(w, meta.width ?? w), withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(out);
    made++;
  }
}
console.log("webp made", made);
