// lib.mjs · the D3 material harness core: paths, engines, colour math, PNG reads, the painted-pixel
// metrics every witness shares, the static server and the PASS/FAIL reporter.
//
// P-3: every metric below reads captured pixels. Geometry (rects, border widths, outline offsets) comes
// from layout; no colour is ever read from a token, a computed style or a canvas context.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import http from "node:http";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { parseArgs } from "node:util";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CHECKOUT = path.resolve(HERE, "../../../../../..");
const require = createRequire(path.join(CHECKOUT, "package.json"));
export const { PNG } = require("pngjs");
let _pw = null;
export async function playwright() {
  _pw ??= await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
  return _pw;
}
export const OUT = process.env.D3_OUT || path.join(os.tmpdir(), "d3-material-harness");

export const GROUNDS = ["paper", "aurora", "aurora50", "black", "white", "checker", "stripes"];
export const FIELD_GROUNDS = ["aurora", "aurora50"];
export const THEMES = ["light", "dark"];
export const ENGINES = ["chromium", "webkit"];
export const CHROMIUM_ARGS = ["--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal"];
export const VIEW = { width: 1280, height: 900 };
export const LADDER = ["wash", "quiet", "resting", "floating", "overlay"];
export const CONTENT = ["wash", "quiet", "resting", "card"];
export const CHROME = ["floating", "overlay", "dialog-rung", "dialog", "popover", "dock"];
export const LABEL = {
  chromium: "Chromium",
  webkit: "Playwright WebKit (paint-only: headless paints no backdrop-filter)",
  safari: "real Safari: UNMEASURED (owner's safaridriver checkbox)",
  nodock: "UNMEASURED in Playwright WebKit (any page that mounts GlassDock crashes it)",
};

// ── CLI ────────────────────────────────────────────────────────────────────────────────────────────────
export function cli(options = {}) {
  const { values, positionals } = parseArgs({ allowPositionals: true, strict: false, options: {
    gate: { type: "string" }, verbose: { type: "boolean" }, ...options } });
  return { ...values, _: positionals };
}
export const list = (s, dflt) => (s ? String(s).split(",").map((x) => x.trim()).filter(Boolean) : dflt);

// ── colour ─────────────────────────────────────────────────────────────────────────────────────────────
export const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
export function oklab([r, g, b]) {
  const R = lin(r), G = lin(g), B = lin(b);
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
export const dE = (x, y) => { const a = oklab(x), b = oklab(y); return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); };
export const lch = (x) => { const [L, a, b] = oklab(x); return [L, Math.hypot(a, b), ((Math.atan2(b, a) * 180) / Math.PI + 360) % 360]; };
export const Y = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
export const cr = (a, b) => { const y1 = Y(a), y2 = Y(b); return (Math.max(y1, y2) + 0.05) / (Math.min(y1, y2) + 0.05); };
export const hex = (c) => "#" + c.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
export const f = (v, n = 2) => (v == null || Number.isNaN(v) ? "—" : Number(v).toFixed(n));
export const pct = (arr, p) => { if (!arr.length) return null; const a = Float64Array.from(arr).sort(); return a[Math.min(a.length - 1, Math.max(0, Math.floor(p * (a.length - 1))))]; };
export const mean3 = (px) => { const s = [0, 0, 0]; for (const p of px) { s[0] += p[0]; s[1] += p[1]; s[2] += p[2]; } return s.map((v) => v / Math.max(1, px.length)); };
const median = (a) => pct(a, 0.5);

// ── captures ───────────────────────────────────────────────────────────────────────────────────────────
const _png = new Map();
export function readPng(file) {
  if (!_png.has(file)) _png.set(file, PNG.sync.read(fs.readFileSync(file)));
  return _png.get(file);
}
export const at = (png, x, y) => {
  x = Math.max(0, Math.min(png.width - 1, Math.round(x))); y = Math.max(0, Math.min(png.height - 1, Math.round(y)));
  const i = (png.width * y + x) * 4; return [png.data[i], png.data[i + 1], png.data[i + 2]];
};
export function region(png, [x0, y0, w, h]) {
  const px = [];
  for (let y = Math.round(y0); y < Math.round(y0 + h); y++) for (let x = Math.round(x0); x < Math.round(x0 + w); x++) {
    if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
    const i = (png.width * y + x) * 4; px.push([png.data[i], png.data[i + 1], png.data[i + 2]]);
  }
  return px;
}
export function loadCapture(capdir) {
  const file = path.join(capdir, "cells.json");
  if (!fs.existsSync(file)) throw new Error(`no capture at ${capdir} (cells.json missing): run capture.mjs first`);
  const doc = JSON.parse(fs.readFileSync(file, "utf8"));
  const img = (cell, mode) => readPng(path.join(capdir, cell.files[mode]));
  return { ...doc, capdir, img };
}
export const cellKey = (c) => [c.engine, c.theme, c.ground, c.scene, c.variant || "base"].join("/");
export function pick(cap, q) {
  return cap.cells.filter((c) => Object.entries(q).every(([k, v]) => (Array.isArray(v) ? v.includes(c[k]) : (c[k] ?? "base") === v)));
}

// ── the painted-pixel metrics ──────────────────────────────────────────────────────────────────────────
// The composite: the mean painted colour of a spec's empty sample region.
export const composite = (cap, cell, spec) => mean3(region(cap.img(cell, "full"), spec.sample));
export const bare = (cap, cell) => mean3(region(cap.img(cell, "raw"), cell.bare));

// Rendered glyph contrast. Glyph coverage comes from two mask captures (fill #00ff00 and #ff00ff, strokes and
// shadows off), so it is independent of the ink and the ground: c = (−ΔR + ΔG − ΔB) / 765. The ink is the
// painted colour of the glyph cores (the `full` capture where c ≥ 0.9·c_max); the ground is the `noink`
// capture (fill transparent, any stroke or halo kept). Contrast is read per ring pixel (Chebyshev radius R
// around the glyph, c < 0.25) and reported as p05.
export function glyphRing(cap, cell, ink, R = 1) {
  const full = cap.img(cell, "full"), noink = cap.img(cell, "noink"), A = cap.img(cell, "maskA"), B = cap.img(cell, "maskB");
  const [x0, y0, w, h] = ink.box.map(Math.round);
  const W = w + 2 * R, H = h + 2 * R, ox = x0 - R, oy = y0 - R;
  const cov = new Float32Array(W * H);
  let cmax = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const X = ox + x, Yy = oy + y;
    if (X < 0 || Yy < 0 || X >= full.width || Yy >= full.height) continue;
    const i = (full.width * Yy + X) * 4;
    const c = (-(A.data[i] - B.data[i]) + (A.data[i + 1] - B.data[i + 1]) - (A.data[i + 2] - B.data[i + 2])) / 765;
    cov[y * W + x] = c; if (c > cmax) cmax = c;
  }
  if (cmax < 0.2) return { p05: null, med: null, n: 0, glyph: 0, rgb: null, note: "no glyph painted" };
  const core = [], ring = []; let glyph = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = cov[y * W + x];
    if (c >= 0.25) { glyph++; if (c >= 0.9 * cmax) core.push(at(full, ox + x, oy + y)); continue; }
    let near = false;
    for (let dy = -R; dy <= R && !near; dy++) for (let dx = -R; dx <= R; dx++) {
      const X = x + dx, Yy = y + dy;
      if (X >= 0 && Yy >= 0 && X < W && Yy < H && cov[Yy * W + X] >= 0.25) { near = true; break; }
    }
    if (near) ring.push(at(noink, ox + x, oy + y));
  }
  const inkPx = [0, 1, 2].map((k) => median(core.map((p) => p[k])));
  const vals = ring.map((g) => cr(inkPx, g));
  return { p05: pct(vals, 0.05), med: pct(vals, 0.5), n: vals.length, glyph, rgb: inkPx, cmax: +cmax.toFixed(2) };
}

// A non-text indicator against the painted ground on both sides. A probe carries, per column along the
// element's top edge, the band pixel rows and one adjacent row inside and one outside. Per column:
// min(cr(band, in), cr(band, out)); reported as p05 over the columns.
export function edgeContrast(png, probe, dx = 0, dy = 0) {
  if (!probe.painted) return { p05: null, n: 0, note: probe.note || "indicator not painted" };
  const vals = [];
  for (const col of probe.cols) {
    const band = mean3(col.band.map((yy) => at(png, col.x - dx, yy - dy)));
    const inn = at(png, col.x - dx, col.in - dy), out = at(png, col.x - dx, col.out - dy);
    vals.push(Math.min(cr(band, inn), cr(band, out)));
  }
  return { p05: pct(vals, 0.05), min: vals.length ? Math.min(...vals) : null, n: vals.length };
}

// Luminance bleed and composite chroma inside a sample region (M-8).
export function calm(cap, cell, spec) {
  const px = region(cap.img(cell, "full"), spec.sample);
  const ys = px.map(Y);
  const C = lch(mean3(px))[1];
  return { bleed: (pct(ys, 0.95) + 0.05) / (pct(ys, 0.05) + 0.05), chroma: C };
}

// The painted veil α of a spec, from its composites over black and white (compositing is affine on the
// encoded channels, and a blur or saturate of a flat black or white ground is that ground):
// C_black = α·P, C_white = α·P + (1 − α)·255, so α = 1 − mean(C_white − C_black)/255 and P = C_black/α.
export function paintedAlpha(cap, cellBlack, cellWhite, spec) {
  const b = composite(cap, cellBlack, spec), w = composite(cap, cellWhite, spec);
  const d = (w[0] - b[0] + w[1] - b[1] + w[2] - b[2]) / 3;
  const alpha = Math.max(0, Math.min(1, 1 - d / 255));
  return { alpha, pole: alpha > 0.01 ? b.map((v) => v / alpha) : null, overBlack: b, overWhite: w };
}

// ── static server ──────────────────────────────────────────────────────────────────────────────────────
const MIME = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".png": "image/png",
  ".json": "application/json", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".woff": "font/woff", ".wasm": "application/wasm", ".jpg": "image/jpeg", ".webp": "image/webp" };
export function serve(dir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, "http://x");
      let p = path.join(dir, decodeURIComponent(u.pathname));
      if (!p.startsWith(dir)) { res.writeHead(403); return res.end(); }
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
      if (!fs.existsSync(p)) { res.writeHead(404); return res.end("not found"); }
      res.writeHead(200, { "content-type": MIME[path.extname(p)] || "application/octet-stream", "cache-control": "no-store" });
      fs.createReadStream(p).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve({ url: `http://127.0.0.1:${server.address().port}/`, close: () => server.close() }));
  });
}

// ── the reporter ───────────────────────────────────────────────────────────────────────────────────────
// Every witness prints its measured rows, then one verdict line, then exits 1 on FAIL. The gate engines
// default to Chromium; Playwright WebKit rows print as an informational leg (it paints no backdrop-filter
// headless), and real Safari prints as UNMEASURED. `--gate chromium,webkit` gates on both.
export function gateEngines(argv) { return list(argv.gate, ["chromium"]); }
export function report(cap, { id, title, lines, gateFails, gateRows, infoFails = 0, infoRows = 0, extra = [], gate }) {
  const pass = gateRows > 0 && gateFails === 0;
  const head = `${id} · ${title}`;
  console.log(head);
  console.log(`capture ${cap.capdir} · target ${cap.meta?.target || "?"} · worktree ${cap.meta?.worktree || "—"} @ ${cap.meta?.sha || "—"} · gate ${gate.join("+")}`);
  for (const l of lines) console.log("  " + l);
  for (const l of extra) console.log(l);
  if (infoRows) console.log(`${LABEL.webkit}: ${infoFails ? `FAIL on ${infoFails} of ${infoRows} rows` : `PASS on ${infoRows} rows`} [informational]`);
  console.log(LABEL.safari);
  const verdict = gateRows === 0 ? "FAIL (no gated rows measured: incomplete capture)" : pass ? `PASS (${gateRows} gated rows)` : `FAIL (${gateFails} of ${gateRows} gated rows)`;
  console.log(verdict);
  const out = path.join(cap.capdir, "results"); fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, `${id}.json`), JSON.stringify({ id, title, pass, gateRows, gateFails, infoRows, infoFails, lines, extra, verdict }, null, 1));
  process.exitCode = pass ? 0 : 1;
  return pass;
}
export const tag = (c) => `${c.engine === "webkit" ? "webkit" : "chromium"} ${c.theme} ${c.ground}${c.scene !== "ladder" ? " " + c.scene : ""}${c.variant && c.variant !== "base" ? " [" + c.variant + "]" : ""}`;

// ── the consumer retune (W-C) ──────────────────────────────────────────────────────────────────────────
// A consumer preset that re-points only the ground tokens, as E-5 allows: a cool paper and card per theme.
export const RETUNE_CSS = `html:root:not(.dark) { --background: hsl(210 22% 93%); --card: hsl(212 30% 98%); }
html.dark:root { --background: hsl(220 16% 13%); --card: hsl(222 14% 23%); }`;
