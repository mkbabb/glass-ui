#!/usr/bin/env node
/**
 * CARDS GOLDEN — the born-RED gate sketch (docs/tranches/BD/greenfield/cards/GOLDEN.md §11).
 *
 * The distinguishing measure: sample the PAINTED COMPOSITED card pixel (not the token — the
 * token is warm, the composite is gray). Assert the three load-bearing legs of the golden:
 *
 *   K2  composite-warm   — the card composited over its REAL field resolves C >= 0.02 warm (H in [45,88])
 *   K3  defined-edge     — border-ink alpha >= 0.08 (HEAD is 0.04) AND a non-`none` warm cast
 *   K5  one-key          — the cast offsets OPPOSITE the lit rim edge (sign of dx/dy negated vs the sun)
 *
 * Born-RED against the live HEAD baseline (the §0 smoking gun). GREEN against the spike's
 * composited pixel. Run standalone (synthetic readback) OR feed a live --celReadout from a
 * headless paint of keyed-cel.html. This is a SKETCH — the executed gate extends proof:no-gray
 * with a Chromium+WebKit paired-engine getImageData sample on the real /display/card route.
 *
 *   node card-pi.mjs          # runs both fixtures, prints the RED/GREEN table, exits non-zero on any RED
 */

// ── sRGB/oklab decode (the paint-arm.mjs lineage: parse rgb()/oklab()/oklch()/color-mix is the
//    live job; here we accept pre-resolved rgb() the way getComputedStyle returns it) ──

function parseRGBA(s) {
  // "rgb(251, 250, 248)" | "rgba(.., a)" | "oklch(...)" — for the sketch we handle rgb(a) and
  // a pre-decoded {r,g,b,a}. The executed gate parses oklab()/oklch() too (live-pi paint-arm note).
  if (typeof s === 'object') return s;
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) throw new Error(`unhandled color in sketch: ${s} (executed gate parses oklab/oklch)`);
  const p = m[1].split(/[, /]+/).map(Number);
  return { r: p[0] / 255, g: p[1] / 255, b: p[2] / 255, a: p[3] ?? 1 };
}

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

// Composite `over` a backdrop (the alpha the card paints at over the field), then OKLab.
function compositeOver(fg, bg) {
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function rgbToOklab({ r, g, b }) {
  const lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const A = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const B = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;
  const C = Math.hypot(A, B);
  let H = (Math.atan2(B, A) * 180) / Math.PI;
  if (H < 0) H += 360;
  return { L, C, H };
}

// ── The two fixtures: HEAD (born-RED) and the GOLDEN spike (GREEN) ──

// HEAD: warm plate at 0.66a composited over the FLAT near-achromatic page (the §0 live read).
const HEAD = {
  name: 'HEAD (live /display/card)',
  cardFill: { r: 0.984, g: 0.965, b: 0.929, a: 0.664 }, // warm-cream ~hsl(30 85% 96%)
  field: { r: 0.984, g: 0.980, b: 0.972, a: 1 },        // rgb(251,250,248) FLAT
  borderInkAlpha: 0.04,                                  // the 4%-a melt
  castOffset: null,                                       // box-shadow: none
  sunDx: -1, sunDy: -1,                                   // top-left sun (the cast SHOULD oppose it)
};

// GOLDEN spike: warm tinted rung at a slightly higher a, composited over the WARM field, keyed edge.
const GOLD = {
  name: 'GOLDEN spike (keyed-cel.html)',
  cardFill: { r: 0.96, g: 0.90, b: 0.80, a: 0.70 },      // warm-admit tinted rung
  field: { r: 0.97, g: 0.89, b: 0.78, a: 1 },            // the amber/terracotta paper-field
  borderInkAlpha: 0.14,                                   // >= the 8% floor
  castOffset: { dx: +1, dy: +1 },                         // offsets AWAY from the top-left sun (opposite)
  sunDx: -1, sunDy: -1,
};

const WARM_FLOOR = 0.02;
const HUE_MIN = 45, HUE_MAX = 88;
const EDGE_INK_FLOOR = 0.08;

function assess(fx) {
  const composite = compositeOver(fx.cardFill, fx.field);
  const ok = rgbToOklab(composite);

  // K2 — composite-warm
  const k2 = ok.C >= WARM_FLOOR && ok.H >= HUE_MIN && ok.H <= HUE_MAX;

  // K3 — defined edge (ink alpha >= floor AND a cast exists)
  const k3 = fx.borderInkAlpha >= EDGE_INK_FLOOR && fx.castOffset != null;

  // K5 — one key: the cast must offset OPPOSITE the sun (sign(dx) === -sign(sunDx))
  const k5 =
    fx.castOffset != null &&
    Math.sign(fx.castOffset.dx) === -Math.sign(fx.sunDx) &&
    Math.sign(fx.castOffset.dy) === -Math.sign(fx.sunDy);

  return { ok, k2, k3, k5 };
}

let anyRed = false;
const rows = [];
for (const fx of [HEAD, GOLD]) {
  const { ok, k2, k3, k5 } = assess(fx);
  const pass = k2 && k3 && k5;
  if (!pass) anyRed = true;
  rows.push({
    fixture: fx.name,
    'composite C': ok.C.toFixed(4),
    'H': ok.H.toFixed(1),
    'border a': fx.borderInkAlpha.toFixed(2),
    K2: k2 ? 'GREEN' : 'RED',
    K3: k3 ? 'GREEN' : 'RED',
    K5: k5 ? 'GREEN' : 'RED',
    verdict: pass ? 'GREEN' : 'RED',
  });
}

console.log('\nCARDS GOLDEN — born-RED gate sketch (K2 composite-warm · K3 defined-edge · K5 one-key)\n');
console.table(rows);

// The gate is BORN-RED: HEAD must FAIL (the disease), the spike must PASS (the cure). If HEAD
// passed, the gate proves nothing (the anti-evasion fence). Assert the born-RED contract:
const headRow = rows[0], goldRow = rows[1];
if (headRow.verdict !== 'RED') {
  console.error('\nBORN-RED VIOLATION: HEAD passed — the gate is not biting the live disease.');
  process.exit(2);
}
if (goldRow.verdict !== 'GREEN') {
  console.error('\nThe GOLDEN spike did not turn the gate GREEN — the cure is incomplete.');
  process.exit(3);
}
console.log('born-RED contract held: HEAD = RED (the live gray disease), GOLDEN = GREEN (the cure).');
console.log('Executed gate = extend proof:no-gray with a Chromium+WebKit getImageData sample on /display/card.\n');
process.exit(0);
