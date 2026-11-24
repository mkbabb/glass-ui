// BM pass 9: the goo filter's erosion of a round end, and the outset that cancels it.
// A disc of radius R (the dock's folded disc and the plates' end caps, R = 26) blurred by a Gaussian of sigma 4,
// then thresholded by the alpha row 0 0 0 20 -9.5 (pass 7's goo.next.css), whose 0.5 output is the input 0.5.
// The visible edge is where the blurred coverage crosses 0.5. Integrated numerically in polar form
// (value at distance r = (1/s^2) * int_0^R rho exp(-(rho^2 + r^2)/(2 s^2)) I0(rho r / s^2) d rho), and for a
// half-plane (a straight side) analytically (the 0.5 level sits on the edge).
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node iso.mjs   (writes iso.json; arithmetic, not a reading)
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
function I0e(x) { // exp(-x) * I0(x), series for small x, asymptotic for large
  if (x < 15) { let s = 1, t = 1; for (let k = 1; k < 80; k++) { t *= (x / 2) ** 2 / (k * k); s += t; } return s * Math.exp(-x); }
  return (1 / Math.sqrt(2 * Math.PI * x)) * (1 + 1 / (8 * x) + 9 / (128 * x * x));
}
function V(r, R, s) {
  const n = 4000; let acc = 0;
  for (let i = 0; i < n; i++) { const rho = ((i + 0.5) / n) * R; const z = (rho * r) / (s * s);
    acc += rho * Math.exp(-((rho - r) ** 2) / (2 * s * s)) * I0e(z); }
  return (acc * (R / n)) / (s * s);
}
function iso(R, s, level = 0.5) { let lo = 0, hi = R + 4 * s; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; (V(m, R, s) > level ? (lo = m) : (hi = m)); } return lo; }
const out = { method: "pass-9/goo/iso.mjs; numeric, not a device reading", R: 26, cases: {} };
for (const s of [3, 4, 5, 6]) {
  const r = iso(26, s); const erosion = 26 - r;
  // The outset d that brings the disc's edge back to 26: solve iso(26 + d) = 26.
  let lo = 0, hi = 2; for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; (iso(26 + m, s) < 26 ? (lo = m) : (hi = m)); }
  out.cases["sigma_" + s] = { disc_edge_px: +r.toFixed(3), erosion_px: +erosion.toFixed(3), approx_s2_over_2R: +((s * s) / 52).toFixed(3), outset_that_cancels_px: +lo.toFixed(3), straight_side_after_outset_px: +lo.toFixed(3) };
}
writeFileSync(path.join(HERE, "iso.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
