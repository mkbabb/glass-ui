#!/usr/bin/env node
// glance.mjs · the owner-glance pair (H-13), the route's P-2 delta: the same specimens painted by the base build (HEAD)
// and by the route, side by side, both themes, over paper; Chromium by default, --engine webkit for the Playwright
// WebKit leg (paint-only, dock +shim). Pairs: the dock, the real Dialog, the floating
// plate (specimen builds), and the glass-material story (demo builds, /substrates/glass-material through the demo's
// capture boot, `?capture=<route>&mode=<theme>`, first viewport). Each PNG is base on the left, route on the right,
// one crop box; glance-<name>.json holds each half's composite and ink readings and the pair's pixel delta.
//   node glance.mjs --base <dist> (--route <dist> | --overlay <css>) --out <dir> [--name route] [--themes light,dark]
//        [--engine chromium|webkit] [--story-base <demo-dist> --story-route <demo-dist>] [--require-delta]
// --require-delta is the pair's own sanity check: exit 1 when any pair's halves are the same picture (under 0.1% of
// the crop's pixels differ by more than 8/255), i.e. the pair captured one build twice or the route changed nothing
// the owner would see.
import fs from "node:fs";
import path from "node:path";
import { OUT, PNG, VIEW, WEBKIT_SHIM, CHROMIUM_ARGS, cli, list, loadCapture, pick, composite, bare, lch, dE, hex, f, playwright, serve } from "./lib.mjs";
import { capture } from "./capture.mjs";
import { inkRows } from "./rows.mjs";

const a = cli({ base: { type: "string" }, route: { type: "string" }, overlay: { type: "string" }, out: { type: "string" }, name: { type: "string" }, themes: { type: "string" },
  "story-base": { type: "string" }, "story-route": { type: "string" }, "require-delta": { type: "boolean" }, engine: { type: "string" } });
if (!a.base || !(a.route || a.overlay) || !a.out) { console.error("usage: node glance.mjs --base <dist> (--route <dist> | --overlay <css>) --out <dir> [--name route] [--themes light,dark] [--story-base d --story-route d] [--require-delta]"); process.exit(2); }
const out = path.resolve(a.out), name = a.name || "route", themes = list(a.themes, ["light", "dark"]), engine = a.engine || "chromium";
fs.mkdirSync(out, { recursive: true });
const PAD = 28, GAP = 16, doc = { base: path.resolve(a.base), route: a.route ? path.resolve(a.route) : null, overlay: a.overlay ? path.resolve(a.overlay) : null, pairs: [] };

const diffFrac = (A, B, box) => { const [x0, y0, w, h] = box; let n = 0, d = 0;
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) { const i = (A.width * y + x) * 4; n++; if (Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2])) > 8) d++; }
  return n ? d / n : 0; };
function writePair(file, pngs, box) {
  const [x0, y0, w, h] = box, img = new PNG({ width: 2 * w + GAP, height: h }); img.data.fill(255);
  pngs.forEach((p, k) => { for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const s = (p.width * (y0 + y) + (x0 + x)) * 4, d = (img.width * y + k * (w + GAP) + x) * 4;
    img.data[d] = p.data[s]; img.data[d + 1] = p.data[s + 1]; img.data[d + 2] = p.data[s + 2]; img.data[d + 3] = 255; } });
  fs.writeFileSync(file, PNG.sync.write(img));
}

for (const theme of themes) {
  const sel = { engines: engine, themes: theme, grounds: "paper", scenes: "ladder,dialog", quiet: true };
  const cb = path.join(OUT, "caps", `glance-base-${engine}-${theme}`), cr = path.join(OUT, "caps", `glance-${name}-${engine}-${theme}`);
  for (const d of [cb, cr]) fs.rmSync(d, { recursive: true, force: true });
  await capture(a.base, { ...sel, out: cb });
  await capture(a.route || a.base, { ...sel, out: cr, inject: a.overlay });
  const caps = [loadCapture(cb), loadCapture(cr)];
  for (const [id, scene] of [["dock", "ladder"], ["dialog", "dialog"], ["floating", "ladder"]]) {
    const halves = caps.map((cap) => {
      const cell = pick(cap, { engine, theme, ground: "paper", scene, variant: "base" })[0];
      const spec = cell?.specs?.find((s) => s.id === id);
      if (!spec) return null;
      const png = cap.img(cell, "full"), paper = bare(cap, cell), comp = composite(cap, cell, spec), [L, C] = lch(comp);
      const inks = inkRows(cap, cell).filter((r) => r.spec === id && !r.well);
      return { png, rect: spec.rect, read: { composite: hex(comp), L: +f(L, 3), C: +f(C, 4), dEpaper: +f(dE(comp, paper), 3),
        inks: Object.fromEntries(inks.map((r) => [r.ink, { ink: r.rgb ? hex(r.rgb) : null, p05: r.p05 == null ? null : +f(r.p05) }])) } };
    });
    if (halves.some((h) => !h)) { doc.pairs.push({ theme, id, error: "specimen missing in one half" }); console.log(`${theme} ${id}: specimen missing ✗`); continue; }
    const x0 = Math.max(0, Math.floor(Math.min(...halves.map((h) => h.rect[0])) - PAD)), y0 = Math.max(0, Math.floor(Math.min(...halves.map((h) => h.rect[1])) - PAD));
    const x1 = Math.min(VIEW.width, Math.ceil(Math.max(...halves.map((h) => h.rect[0] + h.rect[2])) + PAD)), y1 = Math.min(VIEW.height, Math.ceil(Math.max(...halves.map((h) => h.rect[1] + h.rect[3])) + PAD));
    const box = [x0, y0, x1 - x0, y1 - y0], file = path.join(out, `glance-${engine}-${theme}-${id}-base-vs-${name}.png`);
    writePair(file, halves.map((h) => h.png), box);
    const delta = diffFrac(halves[0].png, halves[1].png, box);
    doc.pairs.push({ engine, theme, id, file, crop: box, delta: +delta.toFixed(4), base: halves[0].read, [name]: halves[1].read });
    console.log(`${theme} ${id}: ${path.basename(file)} · delta ${f(delta * 100, 2)}% of the crop\n  base      ${JSON.stringify(halves[0].read)}\n  ${name.padEnd(8)}  ${JSON.stringify(halves[1].read)}`);
  }
  // The glass-material story, from two demo builds.
  if (a["story-base"] && a["story-route"]) {
    const pw = await playwright(), browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    const shots = [];
    for (const dist of [a["story-base"], a["story-route"]]) {
      const srv = await serve(path.resolve(dist));
      const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce" });
      if (engine === "webkit") await ctx.addInitScript(`document.addEventListener("readystatechange", () => { if (!document.getElementById("hx-wk-shim")) { const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); } });`);
      const page = await ctx.newPage();
      let err = null;
      try { await page.goto(`${srv.url}?capture=/substrates/glass-material&mode=${theme}`, { waitUntil: "load", timeout: 120000 });
        await page.waitForSelector("html[data-capture-ready]", { timeout: 60000 }); await page.waitForTimeout(1500); }
      catch (e) { err = String(e).split("\n")[0].slice(0, 160); }
      shots.push({ png: PNG.sync.read(await page.screenshot({ type: "png" })), err });
      await ctx.close(); srv.close();
    }
    await browser.close();
    const box = [0, 0, VIEW.width, VIEW.height], file = path.join(out, `glance-${engine}-${theme}-story-base-vs-${name}.png`);
    writePair(file, shots.map((s) => s.png), box);
    const delta = diffFrac(shots[0].png, shots[1].png, box);
    doc.pairs.push({ engine, theme, id: "story", route: "/substrates/glass-material", file, delta: +delta.toFixed(4), errors: shots.map((s) => s.err) });
    console.log(`${theme} story: ${path.basename(file)} · delta ${f(delta * 100, 2)}%${shots.some((s) => s.err) ? " · " + shots.map((s) => s.err).join(" | ") : ""}`);
  }
}
fs.writeFileSync(path.join(out, `glance-${engine}-${name}.json`), JSON.stringify(doc, null, 1));
const flat = doc.pairs.filter((p) => p.error || p.errors?.some(Boolean) || !(p.delta >= 0.001));
if (a["require-delta"]) { console.log(flat.length ? `GLANCE FAIL: ${flat.length} of ${doc.pairs.length} pairs show no delta or failed (${flat.map((p) => p.theme + " " + p.id).join(", ")})` : `GLANCE PASS: ${doc.pairs.length} pairs, each with a visible delta`); process.exitCode = flat.length ? 1 : 0; }
