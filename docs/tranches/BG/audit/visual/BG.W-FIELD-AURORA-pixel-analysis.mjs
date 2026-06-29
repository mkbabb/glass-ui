// BG.W-FIELD-AURORA pixel analysis — field OKLab (L/C/hue), conic/speckle detection, WCAG contrast.
// Reads the 16 captured PNGs (2880x1800 = 2x of 1440x900 CSS). Probe text colors from chrome-results.json.
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const DIR = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint";
const SCALE = 2; // CSS px -> PNG px

// ---- color math ----
const srgbToLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
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
const wcagLum = ([r, g, b]) => 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
const contrast = (a, b) => { const la = wcagLum(a), lb = wcagLum(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return (hi + 0.05) / (lo + 0.05); };

function loadPng(path) {
  const buf = readFileSync(path);
  return PNG.sync.read(buf);
}
// median-of-region sample (rejects text/edge pixels); returns {rgb, stddev}
function samplePatch(png, cssX, cssY, cssR = 14) {
  const cx = cssX * SCALE, cy = cssY * SCALE, r = cssR * SCALE;
  const rs = [], gs = [], bs = [];
  for (let y = cy - r; y <= cy + r; y += 2) {
    for (let x = cx - r; x <= cx + r; x += 2) {
      if (x < 0 || y < 0 || x >= png.width || y >= png.height) continue;
      const i = (png.width * Math.round(y) + Math.round(x)) << 2;
      rs.push(png.data[i]); gs.push(png.data[i + 1]); bs.push(png.data[i + 2]);
    }
  }
  const med = (a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  const rgb = [med(rs.slice()), med(gs.slice()), med(bs.slice())];
  // luma stddev across the patch (speckle / texture detector)
  const lumas = rs.map((_, k) => 0.299 * rs[k] + 0.587 * gs[k] + 0.114 * bs[k]);
  const mean = lumas.reduce((s, v) => s + v, 0) / lumas.length;
  const stddev = Math.sqrt(lumas.reduce((s, v) => s + (v - mean) ** 2, 0) / lumas.length);
  return { rgb, stddev };
}

// field sample grid (CSS coords) — text-free patches across the hero band + gutters.
// y around the hero (60-360), x across left gutter, mid, right gutter.
const FIELD_PATCHES = [
  { name: "TL-gutter", x: 70, y: 80 },
  { name: "TR-gutter", x: 1380, y: 80 },
  { name: "hero-mid", x: 720, y: 75 },
  { name: "L-gutter-hero", x: 70, y: 200 },
  { name: "R-gutter-hero", x: 1380, y: 200 },
  { name: "below-hero-L", x: 90, y: 340 },
  { name: "R-gutter-mid", x: 1390, y: 340 },
  { name: "far-R-low", x: 1395, y: 500 },
];

const probe = JSON.parse(readFileSync(`${DIR}/chrome-results.json`, "utf8"));
const probeByKey = {};
for (const r of probe.results) if (!r.err) probeByKey[`${r.mode}|${r.route}`] = r.probe;

const ROUTES = ["/foundations/colors", "/foundations/intro", "/substrates/aurora", "/dock/overview"];
const MODES = ["light", "dark"];
const ENGINES = ["chrome", "safari"];

const out = [];
for (const route of ROUTES) {
  for (const mode of MODES) {
    for (const engine of ENGINES) {
      const tag = route.replace(/^\//, "").replace(/\//g, "_");
      const path = `${DIR}/${engine}-${tag}-${mode}.png`;
      let png;
      try { png = loadPng(path); } catch (e) { out.push({ route, mode, engine, err: "load:" + e.message }); continue; }
      // field patches
      const fps = FIELD_PATCHES.map((p) => {
        const s = samplePatch(png, p.x, p.y);
        const ok = rgbToOklab(s.rgb);
        return { name: p.name, rgb: s.rgb, L: +ok.L.toFixed(3), C: +ok.C.toFixed(4), h: +ok.h.toFixed(1), sd: +s.stddev.toFixed(1) };
      });
      // field stats: use patches with low stddev (smooth field, not card/text)
      const smooth = fps.filter((p) => p.sd < 9);
      const Cs = smooth.map((p) => p.C);
      const hs = smooth.map((p) => p.h);
      const Ls = smooth.map((p) => p.L);
      const sds = fps.map((p) => p.sd);
      const stat = (a) => a.length ? { min: +Math.min(...a).toFixed(3), max: +Math.max(...a).toFixed(3), span: +(Math.max(...a) - Math.min(...a)).toFixed(3) } : null;
      // contrast: probe text colors vs nearest field patch
      const pr = probeByKey[`${mode}|${route}`];
      const parseRgb = (s) => { const m = (s || "").match(/(\d+),\s*(\d+),\s*(\d+)/); return m ? [+m[1], +m[2], +m[3]] : null; };
      const contrastChecks = [];
      if (pr) {
        // h1: sample field just to the RIGHT of the h1 text end (text-free) and just below
        if (pr.heroH1) {
          const rt = pr.heroH1.rect;
          // patch to the right of h1 within hero band, fallback to right gutter
          const fx = Math.min(1395, rt.x + rt.w + 40);
          const fy = rt.y + Math.round(rt.h / 2);
          const fs = samplePatch(png, fx, fy, 10);
          const tc = parseRgb(pr.heroH1.color);
          if (tc) contrastChecks.push({ label: "hero-h1", text: tc, field: fs.rgb, fieldL: +rgbToOklab(fs.rgb).L.toFixed(3), ratio: +contrast(tc, fs.rgb).toFixed(2), fontPx: pr.heroH1.fontSize, weight: pr.heroH1.fontWeight });
        }
        if (pr.eyebrow) {
          const rt = pr.eyebrow.rect;
          const fx = Math.min(1395, rt.x + 260);
          const fy = rt.y + Math.round(rt.h / 2);
          const fs = samplePatch(png, fx, fy, 6);
          const tc = parseRgb(pr.eyebrow.color);
          if (tc) contrastChecks.push({ label: "eyebrow-muted", text: tc, field: fs.rgb, fieldL: +rgbToOklab(fs.rgb).L.toFixed(3), ratio: +contrast(tc, fs.rgb).toFixed(2), fontPx: pr.eyebrow.fontSize, weight: pr.eyebrow.fontWeight });
        }
      }
      out.push({
        route, mode, engine,
        field: { C: stat(Cs), hue: stat(hs), L: stat(Ls), maxStddev: +Math.max(...sds).toFixed(1), smoothCount: smooth.length },
        patches: fps,
        contrast: contrastChecks,
      });
    }
  }
}

// print
for (const o of out) {
  if (o.err) { console.log(`${o.engine} ${o.mode} ${o.route} :: ${o.err}`); continue; }
  const f = o.field;
  console.log(`\n=== ${o.engine} ${o.mode} ${o.route} ===`);
  console.log(`  FIELD(smooth n=${f.smoothCount})  C[${f.C?.min}..${f.C?.max} span${f.C?.span}]  hue[${f.hue?.min}..${f.hue?.max} span${f.hue?.span}]  L[${f.L?.min}..${f.L?.max}]  maxSpeckleSD=${f.maxStddev}`);
  for (const c of o.contrast) {
    const bar = c.label === "hero-h1" ? (parseFloat(c.fontPx) >= 24 ? 3.0 : 4.5) : 4.5;
    const v = c.ratio >= bar ? "PASS" : (c.ratio >= 3.0 ? "WARN" : "FAIL");
    console.log(`  ${c.label.padEnd(13)} text[${c.text}] field[${c.field}] L${c.fieldL}  ratio=${c.ratio}:1  bar=${bar}  ${v}`);
  }
}
import { writeFileSync } from "node:fs";
writeFileSync(`${DIR}/pixel-analysis.json`, JSON.stringify(out, null, 2));
console.log("\nWROTE pixel-analysis.json");
