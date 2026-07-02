// BG.W-GATE-FIELD-AURORA pixel analysis — the LIGHT-arm eyebrow AA lift over the
// recessive warm shell field. The eyebrow INK is CSS-deterministic (getComputedStyle,
// engine-independent); the FIELD is sampled PER-ENGINE PER-MODE from the captured PNGs.
// WCAG contrast = (ink, worst/median field patch behind the eyebrow band).
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const DIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-paint";
const SCALE = 2; // CSS px -> PNG px

// ---- color math ----
const srgbToLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const linToSrgb = (c) => { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055; return Math.round(Math.max(0, Math.min(1, v)) * 255); };
function rgbToOklab([r, g, b]) {
  const lr = srgbToLin(r), lg = srgbToLin(g), lb = srgbToLin(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
  const C = Math.hypot(a, bb);
  let h = (Math.atan2(bb, a) * 180) / Math.PI; if (h < 0) h += 360;
  return { L, C, h };
}
// OKLab -> linear sRGB -> sRGB (inverse of the above matrices)
function oklabToRgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  const lr =  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const lg = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const lb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
  return [linToSrgb(lr), linToSrgb(lg), linToSrgb(lb)];
}
const wcagLum = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const contrast = (a, b) => { const la = wcagLum(a), lb = wcagLum(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return (hi + 0.05) / (lo + 0.05); };
const parseRgb = (s) => { const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[,\s/]+/).map(Number); return [p[0], p[1], p[2]]; };
// parse "oklab(L a b)" -> sRGB
function parseColorToRgb(s) {
  const ok = s.match(/oklab\(\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)/);
  if (ok) return oklabToRgb(+ok[1], +ok[2], +ok[3]);
  return parseRgb(s);
}

function loadPng(path) { return PNG.sync.read(readFileSync(path)); }
// median-of-region sample; returns {rgb, stddev}
function samplePatch(png, cssX, cssY, cssR = 10) {
  const cx = cssX * SCALE, cy = cssY * SCALE, r = cssR * SCALE;
  const rs = [], gs = [], bs = [];
  for (let y = cy - r; y <= cy + r; y += 2) for (let x = cx - r; x <= cx + r; x += 2) {
    if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
    const i = (png.width * Math.round(y) + Math.round(x)) << 2;
    rs.push(png.data[i]); gs.push(png.data[i + 1]); bs.push(png.data[i + 2]);
  }
  const med = (a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  const rgb = [med(rs.slice()), med(gs.slice()), med(bs.slice())];
  const lumas = rs.map((_, k) => 0.299 * rs[k] + 0.587 * gs[k] + 0.114 * bs[k]);
  const mean = lumas.reduce((s, v) => s + v, 0) / lumas.length;
  const stddev = Math.sqrt(lumas.reduce((s, v) => s + (v - mean) ** 2, 0) / lumas.length);
  return { rgb, stddev };
}

const probe = JSON.parse(readFileSync(`${DIR}/chrome-results.json`, "utf8"));
const byKey = {};
for (const r of probe.results) if (!r.err) byKey[`${r.route}|${r.mode}`] = r;

// The eyebrow band from the Chrome probe rect (CSS coords). Field patches are
// text-FREE regions around/right-of the short eyebrow text so we read the
// composited warm field the ink sits over (worst-case = darkest patch).
function fieldPatchesFor(rect) {
  const yb = rect.y + rect.h / 2;               // eyebrow vertical center
  return [
    { name: "band-right-1", x: rect.x + 620, y: yb },
    { name: "band-right-2", x: rect.x + 820, y: yb },
    { name: "band-right-3", x: rect.x + 1020, y: yb },
    { name: "above-eyebrow", x: rect.x + 40, y: rect.y - 16 },
    { name: "below-eyebrow", x: rect.x + 40, y: rect.y + rect.h + 14 },
    { name: "far-right", x: rect.x + 1150, y: yb },
  ];
}

const ROUTES = ["/foundations/colors", "/foundations/typography"]; // field routes (intro is focal, no field)
const MODES = ["light", "dark"];
const ENGINES = ["chrome", "safari"];
const out = [];

for (const route of ROUTES) {
  for (const mode of MODES) {
    const pr = byKey[`${route}|${mode}`];
    if (!pr || !pr.probe.eyebrows.length) { out.push({ route, mode, err: "no-eyebrow-probe" }); continue; }
    const eb = pr.probe.eyebrows[0];
    const inkRgb = parseColorToRgb(eb.color);
    const inkOk = rgbToOklab(inkRgb);
    const rect = eb.rect;
    for (const engine of ENGINES) {
      const tag = route.replace(/^\//, "").replace(/\//g, "_");
      const path = `${DIR}/${engine}-${tag}-${mode}.png`;
      let png; try { png = loadPng(path); } catch (e) { out.push({ route, mode, engine, err: "load:" + e.message }); continue; }
      const patches = fieldPatchesFor(rect).map((p) => {
        const s = samplePatch(png, p.x, p.y);
        const ok = rgbToOklab(s.rgb);
        return { name: p.name, rgb: s.rgb, L: +ok.L.toFixed(3), C: +ok.C.toFixed(4), h: +ok.h.toFixed(1), sd: +s.stddev.toFixed(1), cr: +contrast(inkRgb, s.rgb).toFixed(2) };
      });
      // field = smooth patches only (reject text/edge). Worst-case = min contrast.
      const smooth = patches.filter((p) => p.sd < 12);
      const use = smooth.length ? smooth : patches;
      const crs = use.map((p) => p.cr);
      const minCr = Math.min(...crs), medCr = crs.slice().sort((a,b)=>a-b)[crs.length>>1];
      out.push({
        route, mode, engine,
        inkColorRaw: eb.color,
        inkRgb, inkL: +inkOk.L.toFixed(3), inkC: +inkOk.C.toFixed(4), inkH: +inkOk.h.toFixed(1),
        fontSize: eb.fontSize,
        minContrast: +minCr.toFixed(2), medContrast: +medCr.toFixed(2),
        passAA: minCr >= 4.5, passAAlarge: minCr >= 3.0,
        patches,
      });
    }
  }
}

// ---- also: confirm the ink DARKENED vs raw muted-foreground in light (rule fired) ----
const lightInk = out.find((o) => o.mode === "light" && o.inkRgb);
const summary = { generated: new Date().toISOString(), results: out };
console.log(JSON.stringify(summary, null, 2));
