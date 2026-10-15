#!/usr/bin/env node
// glance.mjs · the owner-glance pair (H-13), the route's P-2 delta: the same specimens painted by the base build (HEAD)
// and by the route, side by side, both themes, over paper; Chromium by default, --engine webkit for the Playwright
// WebKit leg (paint-only, dock +shim). Pairs: the dock, the real Dialog, the floating
// plate (specimen builds), and the glass-material story (demo builds, /substrates/glass-material through the demo's
// capture boot, `?capture=<route>&mode=<theme>`, first viewport). Each PNG is base on the left, route on the right,
// one crop box; glance-<name>.json holds each half's composite and ink readings and the pair's pixel delta.
//   node glance.mjs --base <dist> (--route <dist> | --overlay <css>) --out <dir> [--name route] [--themes light,dark]
//        [--engine chromium|webkit] [--story-base <demo-dist> --story-route <demo-dist>] [--require-delta]
//        [--ground paper] [--ids dock,dialog,floating] [--route-query claim=honest]
// --ground, --ids and --route-query widen the pair for a route whose change lives off paper or on the content rungs
// (D3 C′: the claimed content band over the c1 aurora). --route-query rides the route half's URL only. The default
// pair is H-13's: paper; dock, Dialog, floating.
// --story-claim (H3-10): the route's story page must claim at least one region (an element carrying data-glass-ground
// with a painted box), so the owner glance can show what a claim buys; the claimed region is cropped as its own pair
// (glance-<engine>-<theme>-story-claim-base-vs-<name>.png). A route story with no claimed region is a FAIL pair.
// --require-delta is the pair's own sanity check: exit 1 when any pair's PAINT delta is under 0.1% (pixels differing by
// more than 8/255), i.e. the pair captured one build twice or the route changed nothing the owner would see.
// H4-1 (I-1): paint is read apart from layout. Every compared surface is aligned by its OWN box in each half, read from
// the DOM, before pixels are compared: a specimen by its spec rect, a story plate (an element carrying a glass-* class,
// box ≥ 8 × 8 px in the viewport) by its box, matched across the halves by its glass classes and its order among
// plates with the same classes. `paint` = the share of the aligned plate pixels that differ; a plate in one half only
// counts whole as paint. `layout` = the share of matched surfaces whose box moved or resized by ≥ 1 px, with the median
// displacement. `frame` is the fixed-rect share pass 3 printed (layout and paint together), kept as information and
// never gated: over two demos whose copy differs it counts moved plates as paint (C″ critique §5: C-8's 40.64%).
// Each specimen PNG crops each half around its own box, so the halves are aligned for the eye as well.
import { holdWebkit } from "../../../driver/webkit-lock.mjs";
import fs from "node:fs";
import path from "node:path";
import { OUT, PNG, VIEW, WEBKIT_SHIM, CHROMIUM_ARGS, cli, list, loadCapture, pick, composite, bare, lch, dE, hex, f, playwright, serve } from "./lib.mjs";
import { capture } from "./capture.mjs";
import { inkRows } from "./rows.mjs";

const a = cli({ base: { type: "string" }, route: { type: "string" }, overlay: { type: "string" }, out: { type: "string" }, name: { type: "string" }, themes: { type: "string" },
  "story-base": { type: "string" }, "story-route": { type: "string" }, "require-delta": { type: "boolean" }, "story-claim": { type: "boolean" }, engine: { type: "string" }, ground: { type: "string" }, ids: { type: "string" }, "route-query": { type: "string" } });
if (!a.base || !(a.route || a.overlay) || !a.out) { console.error("usage: node glance.mjs --base <dist> (--route <dist> | --overlay <css>) --out <dir> [--name route] [--themes light,dark] [--story-base d --story-route d] [--require-delta]"); process.exit(2); }
const out = path.resolve(a.out), name = a.name || "route", themes = list(a.themes, ["light", "dark"]), engine = a.engine || "chromium";
const ground = a.ground || "paper", ids = a.ids === "none" ? [] : list(a.ids, ["dock", "dialog", "floating"]);   // --ids none: the story pair only
fs.mkdirSync(out, { recursive: true });
const PAD = 28, GAP = 16, doc = { base: path.resolve(a.base), route: a.route ? path.resolve(a.route) : null, overlay: a.overlay ? path.resolve(a.overlay) : null, pairs: [] };

// Pixels differing by more than 8/255 in any channel between A's box `a` and B's box `b` (origins may differ; the
// compared size is the smaller of the two, clipped to both images). Returns [differing, compared].
const diffAt = (A, B, a, b) => { const w = Math.min(a[2], b[2], A.width - a[0], B.width - b[0]), h = Math.min(a[3], b[3], A.height - a[1], B.height - b[1]); let n = 0, d = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (A.width * (a[1] + y) + a[0] + x) * 4, j = (B.width * (b[1] + y) + b[0] + x) * 4; n++;
    if (Math.max(Math.abs(A.data[i] - B.data[j]), Math.abs(A.data[i + 1] - B.data[j + 1]), Math.abs(A.data[i + 2] - B.data[j + 2])) > 8) d++; }
  return [d, Math.max(0, n)]; };
const frac = ([d, n]) => (n ? d / n : 0);
const int = (r) => [Math.max(0, Math.floor(r[0])), Math.max(0, Math.floor(r[1])), Math.round(r[2]), Math.round(r[3])];
const moved = (ra, rb) => Math.max(Math.abs(ra[0] - rb[0]), Math.abs(ra[1] - rb[1]), Math.abs(ra[2] - rb[2]), Math.abs(ra[3] - rb[3])) >= 1;
const median = (xs) => { if (!xs.length) return 0; const s = [...xs].sort((p, q) => p - q); return s[Math.floor(s.length / 2)]; };
// Plates matched across the halves: key = glass classes, then order among plates with that key.
function matchPlates(pa, pb) {
  const by = (ps) => { const m = new Map(); for (const p of ps) { if (!m.has(p.key)) m.set(p.key, []); m.get(p.key).push(p); } return m; };
  const ma = by(pa), mb = by(pb), pairs = [], lone = [];
  for (const key of new Set([...ma.keys(), ...mb.keys()])) { const xa = ma.get(key) || [], xb = mb.get(key) || [];
    for (let i = 0; i < Math.max(xa.length, xb.length); i++) (xa[i] && xb[i] ? pairs.push([xa[i], xb[i]]) : lone.push(xa[i] || xb[i])); }
  return { pairs, lone };
}
// Paint against layout over matched plates (the story pairs), restricted to plates whose route box meets `within`.
function plateDelta(A, B, pa, pb, within = null) {
  const meets = (r) => !within || (r[0] < within[0] + within[2] && r[0] + r[2] > within[0] && r[1] < within[1] + within[3] && r[1] + r[3] > within[1]);
  const { pairs, lone } = matchPlates(pa, pb), use = pairs.filter(([, b]) => meets(b.rect)), single = lone.filter((p) => meets(p.rect));
  let d = 0, n = 0; const shift = [];
  for (const [a, b] of use) { const [dd, nn] = diffAt(A, B, int(a.rect), int(b.rect)); d += dd; n += nn; if (moved(a.rect, b.rect)) shift.push(Math.hypot(b.rect[0] - a.rect[0], b.rect[1] - a.rect[1])); }
  for (const p of single) { const a = p.rect[2] * p.rect[3]; d += a; n += a; }
  return { paint: n ? d / n : 0, layout: use.length ? shift.length / use.length : 0, shiftMedian: +median(shift).toFixed(1), plates: use.length, unmatched: single.length };
}
// The PNG: each half cropped from its own origin, one size.
function writePair(file, pngs, boxes) {
  const w = Math.min(...boxes.map((b) => b[2])), h = Math.min(...boxes.map((b) => b[3])), img = new PNG({ width: 2 * w + GAP, height: h }); img.data.fill(255);
  pngs.forEach((p, k) => { const [x0, y0] = boxes[k]; for (let y = 0; y < h && y0 + y < p.height; y++) for (let x = 0; x < w && x0 + x < p.width; x++) {
    const s = (p.width * (y0 + y) + (x0 + x)) * 4, d = (img.width * y + k * (w + GAP) + x) * 4;
    img.data[d] = p.data[s]; img.data[d + 1] = p.data[s + 1]; img.data[d + 2] = p.data[s + 2]; img.data[d + 3] = 255; } });
  fs.writeFileSync(file, PNG.sync.write(img));
}
const PLATES = `(() => [...document.querySelectorAll("*")].map((e) => { const cls = [...e.classList].filter((c) => /^glass-/.test(c)).sort(); if (!cls.length) return null;
  const r = e.getBoundingClientRect(); if (r.width < 8 || r.height < 8 || r.right <= 0 || r.bottom <= 0 || r.left >= innerWidth || r.top >= innerHeight) return null;
  return { key: cls.join(" "), rect: [r.left, r.top, r.width, r.height] }; }).filter(Boolean))()`;

for (const theme of themes) {
  if (ids.length) {
  const sel = { engines: engine, themes: theme, grounds: ground, scenes: "ladder,dialog", quiet: true };
  const cb = path.join(OUT, "caps", `glance-base-${engine}-${theme}-${ground}`), cr = path.join(OUT, "caps", `glance-${name}-${engine}-${theme}-${ground}`);
  for (const d of [cb, cr]) fs.rmSync(d, { recursive: true, force: true });
  await capture(a.base, { ...sel, out: cb });
  await capture(a.route || a.base, { ...sel, out: cr, inject: a.overlay, query: a["route-query"] });
  const caps = [loadCapture(cb), loadCapture(cr)];
  for (const [id, scene] of ids.map((id) => [id, id === "dialog" ? "dialog" : "ladder"])) {
    const halves = caps.map((cap) => {
      const cell = pick(cap, { engine, theme, ground, scene, variant: "base" })[0];
      const spec = cell?.specs?.find((s) => s.id === id);
      if (!spec) return null;
      const png = cap.img(cell, "full"), paper = bare(cap, cell), comp = composite(cap, cell, spec), [L, C] = lch(comp);
      const inks = inkRows(cap, cell).filter((r) => r.spec === id && !r.well);
      return { png, rect: spec.rect, read: { composite: hex(comp), L: +f(L, 3), C: +f(C, 4), dEpaper: +f(dE(comp, paper), 3),
        inks: Object.fromEntries(inks.map((r) => [r.ink, { ink: r.rgb ? hex(r.rgb) : null, p05: r.p05 == null ? null : +f(r.p05) }])) } };
    });
    if (halves.some((h) => !h)) { doc.pairs.push({ theme, id, error: "specimen missing in one half" }); console.log(`${theme} ${id}: specimen missing ✗`); continue; }
    // Each half's crop (the PNG) is its own box plus PAD; paint is read over the two boxes themselves, aligned (the PAD
    // margin holds the plate's neighbours, which a move changes); layout from the boxes.
    const own = halves.map((h) => { const x0 = Math.max(0, Math.floor(h.rect[0]) - PAD), y0 = Math.max(0, Math.floor(h.rect[1]) - PAD);
      return [x0, y0, Math.min(VIEW.width, Math.ceil(h.rect[0] + h.rect[2]) + PAD) - x0, Math.min(VIEW.height, Math.ceil(h.rect[1] + h.rect[3]) + PAD) - y0]; });
    const x0 = Math.min(own[0][0], own[1][0]), y0 = Math.min(own[0][1], own[1][1]);
    const frameBox = [x0, y0, Math.max(own[0][0] + own[0][2], own[1][0] + own[1][2]) - x0, Math.max(own[0][1] + own[0][3], own[1][1] + own[1][3]) - y0];
    const file = path.join(out, `glance-${engine}-${theme}${ground === "paper" ? "" : "-" + ground}-${id}-base-vs-${name}.png`);
    writePair(file, halves.map((h) => h.png), own);
    const paint = frac(diffAt(halves[0].png, halves[1].png, int(halves[0].rect), int(halves[1].rect))), frame = frac(diffAt(halves[0].png, halves[1].png, frameBox, frameBox));
    const shift = [halves[1].rect[0] - halves[0].rect[0], halves[1].rect[1] - halves[0].rect[1]].map((v) => +v.toFixed(1)), lay = moved(halves[0].rect, halves[1].rect);
    doc.pairs.push({ engine, theme, id, file, crops: own, delta: +paint.toFixed(4), layout: lay ? 1 : 0, shift, frame: +frame.toFixed(4), base: halves[0].read, [name]: halves[1].read });
    console.log(`${theme} ${id}: ${path.basename(file)} · paint ${f(paint * 100, 2)}% · layout ${lay ? `moved ${shift.join(", ")} px` : "none"} · frame ${f(frame * 100, 2)}% (fixed rect, information)\n  base      ${JSON.stringify(halves[0].read)}\n  ${name.padEnd(8)}  ${JSON.stringify(halves[1].read)}`);
  }
  }
  // The glass-material story, from two demo builds.
  if (a["story-base"] && a["story-route"]) {
    if (engine === "webkit") await holdWebkit();
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
      const claims = err ? [] : await page.evaluate(() => [...document.querySelectorAll("[data-glass-ground]")].map((e) => { const r = e.getBoundingClientRect();
        return { ground: e.getAttribute("data-glass-ground"), tag: e.tagName.toLowerCase(), rect: [Math.max(0, Math.floor(r.left)), Math.max(0, Math.floor(r.top)), Math.floor(r.width), Math.floor(r.height)] }; })
        .filter((c) => c.rect[2] >= 8 && c.rect[3] >= 8 && c.rect[0] < innerWidth && c.rect[1] < innerHeight));
      const plates = err ? [] : await page.evaluate(PLATES);
      shots.push({ png: PNG.sync.read(await page.screenshot({ type: "png" })), err, claims, plates });
      await ctx.close(); srv.close();
    }
    await browser.close();
    const box = [0, 0, VIEW.width, VIEW.height], file = path.join(out, `glance-${engine}-${theme}-story-base-vs-${name}.png`);
    writePair(file, shots.map((s) => s.png), [box, box]);
    const frame = frac(diffAt(shots[0].png, shots[1].png, box, box)), pd = plateDelta(shots[0].png, shots[1].png, shots[0].plates, shots[1].plates);
    const plateless = !shots[0].plates.length && !shots[1].plates.length;
    doc.pairs.push({ engine, theme, id: "story", route: "/substrates/glass-material", file, delta: +pd.paint.toFixed(4), layout: +pd.layout.toFixed(4), shiftMedian: pd.shiftMedian, plates: pd.plates, unmatched: pd.unmatched, frame: +frame.toFixed(4),
      errors: [...shots.map((s) => s.err), plateless ? "no glass-* plate in either half: paint unread" : null] });
    console.log(`${theme} story: ${path.basename(file)} · paint ${f(pd.paint * 100, 2)}% over ${pd.plates} matched plates (${pd.unmatched} in one half only) · layout ${f(pd.layout * 100, 1)}% of plates moved (median ${pd.shiftMedian} px) · frame ${f(frame * 100, 2)}% (fixed rect, information)${shots.some((s) => s.err) ? " · " + shots.map((s) => s.err).join(" | ") : ""}${plateless ? " · no glass-* plate in either half ✗" : ""}`);
    if (a["story-claim"]) {
      const c = shots[1].claims[0];
      if (!c) { doc.pairs.push({ engine, theme, id: "story-claim", error: `the route's story claims no region (${shots[1].claims.length} claimed elements with a box)` }); console.log(`${theme} story-claim: the route's story claims no region ✗`); }
      else {
        const box = [c.rect[0], c.rect[1], Math.min(c.rect[2], VIEW.width - c.rect[0]), Math.min(c.rect[3], VIEW.height - c.rect[1])];
        // The base half's crop follows the claimed plates' median displacement, so the pair shows the same plates.
        const pd = plateDelta(shots[0].png, shots[1].png, shots[0].plates, shots[1].plates, box);
        const { pairs } = matchPlates(shots[0].plates, shots[1].plates), inside = pairs.filter(([, b]) => b.rect[1] < box[1] + box[3] && b.rect[1] + b.rect[3] > box[1] && b.rect[0] < box[0] + box[2] && b.rect[0] + b.rect[2] > box[0]);
        const dy = Math.round(median(inside.map(([a, b]) => a.rect[1] - b.rect[1]))), dx = Math.round(median(inside.map(([a, b]) => a.rect[0] - b.rect[0])));
        const baseBox = [Math.max(0, box[0] + dx), Math.max(0, box[1] + dy), box[2], box[3]];
        const cf = path.join(out, `glance-${engine}-${theme}-story-claim-base-vs-${name}.png`); writePair(cf, shots.map((s) => s.png), [baseBox, box]);
        const frame = frac(diffAt(shots[0].png, shots[1].png, box, box));
        doc.pairs.push({ engine, theme, id: "story-claim", ground: c.ground, el: c.tag, file: cf, crop: box, baseCrop: baseBox, delta: +pd.paint.toFixed(4), layout: +pd.layout.toFixed(4), shiftMedian: pd.shiftMedian, plates: pd.plates, unmatched: pd.unmatched, frame: +frame.toFixed(4) });
        console.log(`${theme} story-claim: <${c.tag} data-glass-ground="${c.ground}"> ${box.join(",")} · ${path.basename(cf)} · paint ${f(pd.paint * 100, 2)}% over ${pd.plates} plates · layout ${f(pd.layout * 100, 1)}% moved (median ${pd.shiftMedian} px) · frame ${f(frame * 100, 2)}% (information)`);
      }
    }
  }
}
fs.writeFileSync(path.join(out, `glance-${engine}-${name}${ground === "paper" ? "" : "-" + ground}.json`), JSON.stringify(doc, null, 1));
const flat = doc.pairs.filter((p) => p.error || p.errors?.some(Boolean) || !(p.delta >= 0.001));
if (a["story-claim"] && !a["require-delta"]) { const miss = doc.pairs.filter((p) => p.id === "story-claim" && p.error); console.log(miss.length ? `GLANCE FAIL: ${miss.length} story pairs with no claimed region` : "GLANCE PASS: every story pair shows a claimed region"); process.exitCode = miss.length ? 1 : 0; }
if (a["require-delta"]) { console.log(flat.length ? `GLANCE FAIL: ${flat.length} of ${doc.pairs.length} pairs show no paint delta or failed (${flat.map((p) => p.theme + " " + p.id + (p.layout ? " [layout only]" : "")).join(", ")})` : `GLANCE PASS: ${doc.pairs.length} pairs, each with a visible paint delta`); process.exitCode = flat.length ? 1 : 0; }
