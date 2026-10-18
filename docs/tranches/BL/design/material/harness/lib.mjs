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
import { holdWebkit } from "../../../driver/webkit-lock.mjs";

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CHECKOUT = path.resolve(HERE, "../../../../../..");
const require = createRequire(path.join(CHECKOUT, "package.json"));
export const { PNG } = require("pngjs");
let _pw = null;
export async function playwright() {
  _pw ??= await import(path.join(CHECKOUT, "node_modules/playwright/index.mjs"));
  return _pw;
}
// The BL WebKit lock (driver/webkit-lock.mjs: one Playwright WebKit run machine-wide). H5 (found by H5-5): a witness the
// self-test spawns (glance.mjs, and the capture.mjs it calls in-process) runs while its parent holds the lock and waits
// on it, so it waited on its own parent until the lock's 2400 s deadline. A child whose parent owns the lock runs under
// the parent's hold; anyone else takes the lock as before. The parent is blocked in spawnSync, so one WebKit run stays one.
export async function holdWebkitLock() {
  try { const owner = fs.readFileSync(path.join(CHECKOUT, ".claude/worktrees/bl/locks/webkit/owner"), "utf8"); if (Number(owner.split(" ")[0]) === process.ppid) return; } catch {}
  return holdWebkit();
}
export const OUT = process.env.D3_OUT || path.join(os.tmpdir(), "d3-material-harness");
// Page loads per Playwright WebKit browser process before capture.mjs retires and relaunches it (tile pass-3 H3-1: macOS
// AppSSO stops answering at about the 90th navigation of one process). D3_NAV_CAP overrides it (the self-test's control).
export const NAV_CAP = +(process.env.D3_NAV_CAP || 60);

export const GROUNDS = ["paper", "aurora", "aurora50", "black", "white", "checker", "stripes"];
export const FIELD_GROUNDS = ["aurora", "aurora50"];
// Grounds captured only by the scenes that need them: UIA-V-198's saturated red (W-G) and the glass-material story's
// deep canvas #193b59 (H3-1, M-1x: the light veil read off paper).
export const EXTRA_GROUNDS = ["red", "deep"];
// The off-paper grounds M-1x reads (H3-1): black, the 16 px checker and the story's deep canvas.
export const OFF_PAPER = ["black", "checker", "deep"];
// The scenes and the grounds each is captured on (run.mjs and the witnesses share this one table).
//   ladder  every GROUNDS entry, red (W-G) and deep (M-1x)   dialog  every GROUNDS entry and deep   halo  paper   empty  the field grounds (W-F)
//   held     H-5/H3-5: a held dock (a real press-and-hold on its Slider, then the release window), two held rungs (the
//            consumer grasp contract, read only where the library declares the host graspable) and a collapsed dock
//   hostile  H-10: an opaque band interposed between the field and the dock and first plate row; a teleported Popover
//            over a declared region
//   state    H-6 (M-9): the painted state fills (active, hover, checked, selected) and an engaged focus veil
//   isolated H-15 (W-G): the content rungs and a dock inside an isolated group (isolation: isolate)
//   claim    H3-6: a "page" claim over library paint: an opaque --secondary tray under the content rungs, and a wash and
//            a quiet nested inside an opaque card
//   fieldout, fieldtwo, fieldgone   H3-7 (W-S): a "field" claim whose publication is out of scope (the Aurora is not an
//            ancestor's), shared by two Auroras (c1 page-wide, c0.5 under the content row), or unmounted after 1.2 s
//   o66field, o66menu   H3-9 (O-66 §1, W-0.1 G2 and G3): a filled SelectTrigger beside a filled Input on paper and in a
//            .glass-floating pane; an open DropdownMenu with its first row highlighted by focus
export const SCENE_GROUNDS = {
  ladder: [...GROUNDS, "red", "deep"], dialog: [...GROUNDS, "deep"], halo: ["paper"], empty: FIELD_GROUNDS,
  held: ["black", "white", "aurora"], hostile: FIELD_GROUNDS, state: ["paper", "aurora"], isolated: ["aurora", "red"],
  claim: ["paper"], fieldout: ["aurora"], fieldtwo: ["aurora"], fieldgone: ["aurora"], o66field: ["paper"], o66menu: ["paper"],
};
// H3-7: the field-claim scenes, each captured twice: claimed (variant base) and unclaimed (variant noclaim, ?claim=none).
export const FIELD_CLAIM_SCENES = ["fieldout", "fieldtwo", "fieldgone"];
export const SCENES = Object.keys(SCENE_GROUNDS);
// The H-4 contract: the floor patch (FL-5) exposes each band's computed bound as a number on every plate.
export const BOUND_PROP = "--glass-bound";
// The H-15 contract: a plate that knows its pole went flat carries this attribute (on itself or an ancestor).
export const FLAT_ATTR = "data-glass-flat";
// The H3-7 contract: a claim whose ground knowledge is dead, stale or ambiguous says so with this attribute, on the plate
// or an ancestor. "published" and "live" are the two values that claim the knowledge is good; any other value is a stamp.
export const GROUND_STATE_ATTR = "data-glass-ground-state";
export const LIVE_STATES = ["published", "live"];
// H-14: D2's WebKit crash shim (docs/tranches/BL/design/dock/harness/adapter-head.mjs:45, D2 SPECS S-2): it pins the
// plate border's nested translucent color-mix() to one arm, colours only. Every WebKit dock row is labelled "+shim".
export const WEBKIT_SHIM = ".glass-dock .dock-plate { border-color: var(--dock-plate-expanded-border) !important; }";
export const THEMES = ["light", "dark"];
// H9-5 (pass 9): frozen. A run narrows engines with --engines (capture.mjs, the plant scripts), never by mutating this
// shared array in-process; a mutation throws (E-2).
export const ENGINES = Object.freeze(["chromium", "webkit"]);
// H6-0 (pass 6): Chromium launches as Playwright's default headless shell with no GPU arguments (the machine law,
// user-level CLAUDE.md, "Browser runs"). No witness of the 44 rows reads a GPU-only paint: every metric reads captured
// pixels, and the field grounds are whatever the shell paints (H6.md §3 records which arm that is). A witness that needs
// GPU arguments must prove it and cite the proof in its own file on a `GPU-WITNESS:` line (launch-law.mjs gates this).
export const CHROMIUM_ARGS = [];
// The one exception, proved by H6's own run: the moving-field windows (capture.mjs live, motion and drift; M-2m's motion,
// step and drift legs, M-5 and W-A leg 1). Under the shell the aurora takes its static css arm (no navigator.gpu; WebGL2
// only on SwiftShader, which the substrate's software guard refuses), paints once and parks, so a motion or step window
// holds 1 frame against M-2m's ≥ 6 and ≥ 10, and the live window reads a field that never runs. Those windows alone
// relaunch the headless shell with these arguments (one browser at a time); every cell keeps CHROMIUM_ARGS.
// GPU-WITNESS: M-2m · ../pass-6/H6.md
export const CHROMIUM_FIELD_ARGS = ["--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal"];
export const VIEW = { width: 1280, height: 900 };
export const LADDER = ["wash", "quiet", "resting", "floating", "overlay"];
export const CONTENT = ["wash", "quiet", "resting", "card"];
export const CHROME = ["floating", "overlay", "dialog-rung", "dialog", "popover", "dock"];
export const LABEL = {
  chromium: "Chromium",
  webkit: "Playwright WebKit (paint-only: headless paints no backdrop-filter; dock rows +shim)",
  safari: "real Safari: UNMEASURED (owner's safaridriver checkbox)",
  nodock: "UNMEASURED in Playwright WebKit (any page that mounts GlassDock crashes it)",
  shim: "+shim (D2's WebKit crash shim: the dock plate border pinned to one arm, colours only)",
};

// ── CLI ────────────────────────────────────────────────────────────────────────────────────────────────
export function cli(options = {}) {
  const { values, positionals } = parseArgs({ allowPositionals: true, strict: false, options: {
    gate: { type: "string" }, verbose: { type: "boolean" }, cells: { type: "string" }, ...options } });
  return { ...values, _: positionals };
}
// --cells <regex>: restrict every witness to the cells whose "engine theme ground scene" matches (the self-test's
// planted captures hold only the cells their plant touches; a full run never passes it).
export const CELLS = (() => { const i = process.argv.indexOf("--cells"); return i > 0 && process.argv[i + 1] ? new RegExp(process.argv[i + 1]) : null; })();
// --variant <id> (H9-4, pass 9): the variant a witness reads, `base` by default. A plant captured under its own label
// (`ring040`) is read by naming it; a capture with no cell of the variant exits loud (rows.mjs need), never a FAIL.
export const VARIANT = (() => { const i = process.argv.indexOf("--variant"); return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : "base"; })();
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
// OKLCh → linear sRGB, and the largest in-gamut OKLCh chroma at a given L and hue (W-G).
export function oklchLin(L, C, hdeg) {
  const a = C * Math.cos((hdeg * Math.PI) / 180), b = C * Math.sin((hdeg * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
}
export function gamutMaxC(L, hdeg) {
  let lo = 0, hi = 0.5;
  for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; (oklchLin(L, mid, hdeg).every((v) => v >= -1e-6 && v <= 1 + 1e-6) ? (lo = mid) : (hi = mid)); }
  return lo;
}
export const hueDiff = (h1, h2) => { const d = Math.abs(h1 - h2) % 360; return d > 180 ? 360 - d : d; };

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
// The raw ground under a spec's own sample region (W-G's hue reference, M-1x's hue term).
export const rawUnder = (cap, cell, spec) => mean3(region(cap.img(cell, "raw"), spec.sample));
// Hue through (W-G): a composite whose OKLCh hue sits within this many degrees of the raw ground's under the same sample
// carries the ground's hue. W-G requires it; M-1x's colour clause (H4-2) refuses it as the plate's own colour.
export const HUE_THROUGH = 10;

// Rendered glyph contrast. Glyph coverage comes from two mask captures (fill #00ff00 and #ff00ff, strokes and
// shadows off), so it is independent of the ink and the ground: c = (−ΔR + ΔG − ΔB) / 765. The ink is the
// painted colour of the glyph cores (the `full` capture where c ≥ 0.9·c_max); the ground is the `noink`
// capture (fill transparent, any stroke or halo kept). Contrast is read per ring pixel (Chebyshev radius R
// around the glyph, c < 0.25) and reported as p05.
export function glyphRing(cap, cell, ink, R = 1) {
  const cv = glyphCoverage(cap.img(cell, "maskA"), cap.img(cell, "maskB"), ink.box, R);
  return ringRead(cv, cap.img(cell, "full"), cap.img(cell, "noink"), R);
}
// Glyph coverage over an ink box grown by R, from the two mask captures (geometry only: independent of ink and ground).
export function glyphCoverage(A, B, box, R) {
  const [x0, y0, w, h] = box.map(Math.round);
  const W = w + 2 * R, H = h + 2 * R, ox = x0 - R, oy = y0 - R;
  const cov = new Float32Array(W * H);
  let cmax = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const X = ox + x, Yy = oy + y;
    if (X < 0 || Yy < 0 || X >= A.width || Yy >= A.height) continue;
    const i = (A.width * Yy + X) * 4;
    const c = (-(A.data[i] - B.data[i]) + (A.data[i + 1] - B.data[i + 1]) - (A.data[i + 2] - B.data[i + 2])) / 765;
    cov[y * W + x] = c; if (c > cmax) cmax = c;
  }
  return { ox, oy, W, H, cov, cmax };
}
// The ring read: ink = median of the glyph cores in `full`; ring = pixels within Chebyshev R of the glyph whose
// coverage is under `ringMax`, read in `ground` (the noink capture; or, frame-locked, the same frame with
// ringMax 0.02 so no antialiased ink fringe enters the ring).
export function ringRead({ ox, oy, W, H, cov, cmax }, full, ground, R, ringMax = 0.25) {
  if (cmax < 0.2) return { p05: null, med: null, n: 0, glyph: 0, rgb: null, note: "no glyph painted" };
  const core = [], ring = []; let glyph = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = cov[y * W + x];
    if (c >= 0.25) { glyph++; if (c >= 0.9 * cmax) core.push(at(full, ox + x, oy + y)); continue; }
    if (c > ringMax) continue;
    let near = false;
    for (let dy = -R; dy <= R && !near; dy++) for (let dx = -R; dx <= R; dx++) {
      const X = x + dx, Yy = y + dy;
      if (X >= 0 && Yy >= 0 && X < W && Yy < H && cov[Yy * W + X] >= 0.25) { near = true; break; }
    }
    if (near) ring.push(at(ground, ox + x, oy + y));
  }
  const inkPx = [0, 1, 2].map((k) => median(core.map((p) => p[k])));
  const vals = ring.map((g) => cr(inkPx, g));
  return { p05: pct(vals, 0.05), med: pct(vals, 0.5), n: vals.length, glyph, rgb: inkPx, cmax: +cmax.toFixed(2) };
}

// A non-text indicator against the painted ground on both sides. A probe carries, per column along the
// element's top edge, the band pixel rows and one adjacent row inside and one outside. Per column:
// min(cr(band, in), cr(band, out)); reported as p05 over the columns.
// H7-1 (pass 7, REGISTRY P6-2.2 R-14): a ring with no straight run. capture.mjs RING_PROBE falls back to the three
// columns [c − 1, c, c + 1] around the rounded centre when the outline has no run of 4 or more columns (x1 − x0 < 3), so
// an outline probe of exactly 3 columns is that fallback (a straight run is never 3 columns). Off the apex a round
// outline curves through the band, and the worst of the three reads its antialiasing. Such a ring is read at its
// FULL-COVERAGE column: a column whose band rows (2 or more) are equal within FULL_TOL per channel, so the outline covers
// the whole band there and the band is the ring's solid composite (of several, the worst). Where no column of the three
// is at full coverage (a 1 px outline, a subpixel ring) the reading stays the worst of three, so a thin ring is not
// loosened. Perimeters and straight-run rings are read as before.
export const FULL_TOL = 1;
export const fullCoverage = (bandPx) => bandPx.length >= 2 && bandPx.every((p) => p.every((v, k) => Math.abs(v - bandPx[0][k]) <= FULL_TOL));
export const ringFallback = (probe) => probe.kind === "outline" && probe.cols.length === 3;
// cols: [{ x, v, full }] → { value, how }. One source for the live reader and for re-scoring banked column records.
export function ringFallbackRead(cols) {
  const full = cols.filter((c) => c.full);
  if (full.length) { const c = full.reduce((a, b) => (b.v < a.v ? b : a)); return { value: c.v, how: `full-coverage column ${c.x}` }; }
  return { value: Math.min(...cols.map((c) => c.v)), how: "worst of three: no full-coverage column" };
}
export function edgeContrast(png, probe, dx = 0, dy = 0) {
  if (!probe.painted) return { p05: null, n: 0, note: probe.note || "indicator not painted" };
  const vals = [], cols = [];
  for (const col of probe.cols) {
    const bandPx = col.band.map((yy) => at(png, col.x - dx, yy - dy)), band = mean3(bandPx);
    const inn = at(png, col.x - dx, col.in - dy), out = at(png, col.x - dx, col.out - dy);
    const v = Math.min(cr(band, inn), cr(band, out));
    vals.push(v); cols.push({ x: col.x, v, full: fullCoverage(bandPx) });
  }
  const min = vals.length ? Math.min(...vals) : null;
  if (ringFallback(probe)) { const r = ringFallbackRead(cols); return { p05: r.value, min, n: vals.length, note: r.how }; }
  return { p05: pct(vals, 0.05), min, n: vals.length };
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
      // SPA fallback (the demo dist, H-13): an extension-less path that is not a file serves index.html.
      if (!fs.existsSync(p) && !path.extname(p) && fs.existsSync(path.join(dir, "index.html"))) p = path.join(dir, "index.html");
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
  console.log(`capture ${cap.capdir} · target ${cap.meta?.target || "?"} · worktree ${cap.meta?.worktree || "—"} @ ${cap.meta?.sha || "—"} · gate ${gate.join("+")}${CELLS ? ` · cells restricted to /${CELLS.source}/` : ""}`);
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
export const tag = (c) => `${c.engine === "webkit" ? "webkit" + (c.shim ? "+shim" : "") : "chromium"} ${c.theme} ${c.ground}${c.scene !== "ladder" ? " " + c.scene : ""}${c.variant && c.variant !== "base" ? " [" + c.variant + "]" : ""}`;

// ── the consumer colour retunes (W-C leg 2, H3-8) ──────────────────────────────────────────────────────
// Three consumer presets, each writing ONE ground or ink token as a colour (the form every consumer retune in the
// constellation uses; music-staff writes --card as a colour beside --card-l). A library that reads a numeric twin
// (--background-l, --foreground-l, --card-l) goes stale under them; one that reads the colour follows. Each is captured
// as its own variant (retune-bg, retune-fg, retune-card) over paper, ladder and dialog.
export const RETUNES = {
  "retune-bg": `html:root:not(.dark) { --background: hsl(210 22% 93%); } html.dark:root { --background: hsl(220 16% 13%); }`,
  "retune-fg": `html:root:not(.dark) { --foreground: oklch(0.42 0.02 56); } html.dark:root { --foreground: oklch(0.86 0.01 68); }`,
  "retune-card": `html:root:not(.dark) { --card: hsl(212 30% 98%); } html.dark:root { --card: hsl(222 14% 23%); }`,
};
// H4-4 (I-4): a refusal is loud only when it names what it refuses. A console message names a glass token when it carries
// the custom property the retune wrote (--background, --foreground or --card; read from RETUNES, one source) or one of
// its numeric twins (--foreground-l: the stale twin a library may name), or any
// property with a `glass` segment (--glass-*, --on-glass-*). W-C counts only those messages; an unrelated warning
// (a failed image, a framework notice) in the retuned cell no longer passes the loud arm.
export const RETUNED_TOKENS = Object.fromEntries(Object.entries(RETUNES).map(([v, css]) => [v, [...new Set(css.match(/--[\w-]+(?=\s*:)/g))]]));
export function namesGlassToken(text, variant) {
  const names = String(text).match(/--[\w-]+/g) || [];
  return names.some((n) => /(^|-)glass(-|$)/.test(n.slice(2)) || (RETUNED_TOKENS[variant] || []).some((t) => n === t || n.startsWith(t + "-")));
}

// ── the static CSS reader (H5-2 lighting-literals, H5-3 hover-fill-selected) ────────────────────────────────
// Every rule in <root>/src: the .css files and each .vue file's <style> blocks. Comments are blanked (lines kept),
// at-rules are transparent, nested rules resolve `&` (or descend) against their parent's selectors. Each rule carries
// its effective selectors and its declarations { prop, value, line }; `file` is relative to <root>.
export function cssRules(root) {
  const files = [];
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (e.name !== "node_modules") walk(p); } else if (/\.(css|vue)$/.test(p)) files.push(p); } })(path.join(root, "src"));
  const rules = [];
  for (const file of files.sort()) {
    const src = fs.readFileSync(file, "utf8"), rel = path.relative(root, file);
    const blocks = file.endsWith(".vue") ? [...src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => ({ text: m[1], at: m.index + m[0].indexOf(">") + 1 })) : [{ text: src, at: 0 }];
    for (const { text, at } of blocks) {
      const base = src.slice(0, at).split("\n").length - 1;
      const t = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
      const stack = [];   // { at: bool, sels: string[] | null, rule }
      let buf = "", bufStart = 0, depth = 0, quote = null;
      const lineOf = (i) => base + t.slice(0, i).split("\n").length;
      const decl = (s, i) => {
        const owner = [...stack].reverse().find((x) => !x.at); if (!owner) return;
        const k = s.indexOf(":"); if (k < 0) return;
        const prop = s.slice(0, k).trim(), value = s.slice(k + 1).replace(/\s+/g, " ").trim();
        if (!/^-{0,2}[\w-]+$/.test(prop)) return;
        owner.rule.decls.push({ prop, value, line: lineOf(i) });
      };
      for (let i = 0; i < t.length; i++) {
        const ch = t[i];
        if (quote) { if (ch === quote && t[i - 1] !== "\\") quote = null; buf += ch; continue; }
        if (ch === '"' || ch === "'") { quote = ch; buf += ch; continue; }
        if (ch === "(") depth++; else if (ch === ")") depth--;
        if (depth > 0) { if (!buf.trim()) bufStart = i; buf += ch; continue; }
        if (ch === "{") {
          const prelude = buf.replace(/\s+/g, " ").trim(); buf = "";
          if (prelude.startsWith("@")) { stack.push({ at: true }); continue; }
          const parent = [...stack].reverse().find((x) => !x.at);
          const own = splitTop(prelude);
          const sels = parent ? parent.sels.flatMap((p) => own.map((c) => (c.includes("&") ? c.replaceAll("&", p) : `${p} ${c}`))) : own;
          const rule = { file: rel, line: lineOf(i), sels, decls: [] };
          rules.push(rule); stack.push({ at: false, sels, rule });
          continue;
        }
        if (ch === ";") { decl(buf, bufStart); buf = ""; continue; }
        if (ch === "}") { if (buf.trim()) decl(buf, bufStart); buf = ""; stack.pop(); continue; }
        if (!buf.trim()) bufStart = i;
        buf += ch;
      }
    }
  }
  return { files: files.length, rules };
}
// Split at top-level commas (outside parentheses and brackets).
export function splitTop(s) {
  const out = []; let d = 0, cur = "";
  for (const ch of s) { if (ch === "(" || ch === "[") d++; if (ch === ")" || ch === "]") d--; if (ch === "," && d === 0) { out.push(cur.trim()); cur = ""; } else cur += ch; }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
// The custom properties a value reads: var(--x) anywhere in it.
export const varRefs = (v) => [...String(v).matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]);
// A static check's tree: --root, else the capture's worktree (cells.json meta).
export function staticRoot(argv) {
  if (argv.root) return path.resolve(argv.root);
  const cap = argv._[0] && path.join(argv._[0], "cells.json");
  return cap && fs.existsSync(cap) ? JSON.parse(fs.readFileSync(cap, "utf8")).meta?.worktree || null : null;
}
