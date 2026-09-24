#!/usr/bin/env node
// glance.mjs · paired owner-glance captures: the same specimen build painted as it ships and with a CSS overlay
// (default: v700-veil.css, the 7.0.0 veil on HEAD's seam), light theme over paper, Chromium. For the dock, the real
// Dialog and the floating plate it writes one PNG per specimen, the left half as built and the right half with the
// overlay, plus glance.json with each half's painted composite and ink readings.
//   node glance.mjs <dist> --out <dir> [--overlay v700-veil.css] [--name v700] [--theme light]
import fs from "node:fs";
import path from "node:path";
import { OUT, HERE, PNG, cli, loadCapture, pick, composite, bare, lch, dE, hex, f } from "./lib.mjs";
import { capture } from "./capture.mjs";
import { inkRows } from "./rows.mjs";

const a = cli({ out: { type: "string" }, overlay: { type: "string" }, name: { type: "string" }, theme: { type: "string" } });
if (!a._[0] || !a.out) { console.error("usage: node glance.mjs <dist> --out <dir> [--overlay css] [--name v700]"); process.exit(2); }
const dist = path.resolve(a._[0]), out = path.resolve(a.out), overlay = path.resolve(a.overlay || path.join(HERE, "v700-veil.css"));
const name = a.name || "v700", theme = a.theme || "light";
fs.mkdirSync(out, { recursive: true });
const sel = { engines: "chromium", themes: theme, grounds: "paper", scenes: "ladder,dialog", quiet: true };
const base = path.join(OUT, "caps", `glance-base-${theme}`), over = path.join(OUT, "caps", `glance-${name}-${theme}`);
for (const d of [base, over]) fs.rmSync(d, { recursive: true, force: true });
await capture(dist, { ...sel, out: base });
await capture(dist, { ...sel, out: over, inject: overlay });
const caps = [loadCapture(base), loadCapture(over)];

const PAD = 28, GAP = 16;
const SPECS = [["dock", "ladder"], ["dialog", "dialog"], ["floating", "ladder"]];
const doc = { dist, overlay, theme, pairs: [] };
for (const [id, scene] of SPECS) {
  const halves = caps.map((cap) => {
    const cell = pick(cap, { engine: "chromium", theme, ground: "paper", scene, variant: "base" })[0];
    const spec = cell.specs.find((s) => s.id === id), png = cap.img(cell, "full"), paper = bare(cap, cell), comp = composite(cap, cell, spec);
    const inks = inkRows(cap, cell).filter((r) => r.spec === id && !r.well);
    const [L, C] = lch(comp);
    return { png, rect: spec.rect, read: { composite: hex(comp), L: +f(L, 3), C: +f(C, 4), dEpaper: +f(dE(comp, paper), 3),
      inks: Object.fromEntries(inks.map((r) => [r.ink, { ink: r.rgb ? hex(r.rgb) : null, p05: r.p05 == null ? null : +f(r.p05) }])) } };
  });
  // One crop box for both halves: the union of the two rects plus a paper margin.
  const x0 = Math.max(0, Math.floor(Math.min(...halves.map((h) => h.rect[0])) - PAD)), y0 = Math.max(0, Math.floor(Math.min(...halves.map((h) => h.rect[1])) - PAD));
  const x1 = Math.min(1280, Math.ceil(Math.max(...halves.map((h) => h.rect[0] + h.rect[2])) + PAD)), y1 = Math.min(900, Math.ceil(Math.max(...halves.map((h) => h.rect[1] + h.rect[3])) + PAD));
  const w = x1 - x0, h = y1 - y0, img = new PNG({ width: 2 * w + GAP, height: h });
  img.data.fill(255);
  halves.forEach((hv, k) => { for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const s = (hv.png.width * (y0 + y) + (x0 + x)) * 4, d = (img.width * y + k * (w + GAP) + x) * 4;
    img.data[d] = hv.png.data[s]; img.data[d + 1] = hv.png.data[s + 1]; img.data[d + 2] = hv.png.data[s + 2]; img.data[d + 3] = 255; } });
  const file = path.join(out, `glance-${theme}-${id}-head-vs-${name}.png`);
  fs.writeFileSync(file, PNG.sync.write(img));
  const pair = { id, file, crop: [x0, y0, w, h], built: halves[0].read, [name]: halves[1].read };
  doc.pairs.push(pair);
  console.log(`${id}: ${path.basename(file)}\n  as built  ${JSON.stringify(halves[0].read)}\n  ${name.padEnd(8)}  ${JSON.stringify(halves[1].read)}`);
}
fs.writeFileSync(path.join(out, `glance-${theme}-${name}.json`), JSON.stringify(doc, null, 1));
