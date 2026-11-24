// BM pass 3, fold of pass 2 (B-3): the panel token's single curve with its peak held at or under the row's own
// overshoot (4.21 %), against pass 2's free fit (peak 5.61 %). Same fitter as pass-2/delivery/curves.mjs
// (Nelder-Mead on the largest error over 401 points), with a penalty past the cap. Also: the damping a curve's
// peak corresponds to, so the owner's floor ("Panel, at ζ 0.71, is the bounciest row") can be read off.
// Run from the glass-ui checkout: ~/.claude/guard/guarded --light -- node docs/tranches/BM/study/pass-3/fold/panel-fit.mjs
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../../..");
const css = readFileSync(path.join(ROOT, "src/styles/tokens/scheme-spring.css"), "utf8");
const stops = css.match(/--spring-panel: linear\(([^;]+)\);/)[1].split(",").map((p, i) => {
  const [v, pct] = p.trim().split(/\s+/); return { u: pct ? parseFloat(pct) / 100 : i === 0 ? 0 : 1, y: parseFloat(v) };
});
const token = (u) => { for (let i = 1; i < stops.length; i++) if (u <= stops[i].u) { const a = stops[i - 1], b = stops[i]; return a.y + ((b.y - a.y) * (u - a.u)) / (b.u - a.u || 1); } return 1; };
const bez = (p1, p2, s) => 3 * (1 - s) * (1 - s) * s * p1 + 3 * (1 - s) * s * s * p2 + s * s * s;
const bezY = ([x1, y1, x2, y2], u) => { let lo = 0, hi = 1, s = u; for (let i = 0; i < 40; i++) { const xs = bez(x1, x2, s); if (xs < u) lo = s; else hi = s; s = (lo + hi) / 2; } return bez(y1, y2, s); };
const GRID = Array.from({ length: 401 }, (_, i) => i / 400);
const peakOf = (c) => GRID.reduce((m, u) => Math.max(m, bezY(c, u)), 0);
const errOf = (c) => GRID.reduce((m, u) => Math.max(m, Math.abs(token(u) - bezY(c, u))), 0);
const zetaForPeak = (M) => { const l = Math.log(M); return -l / Math.sqrt(Math.PI * Math.PI + l * l); };

function fit(cap) {
  const curve = (p) => [Math.min(1, Math.max(0, p[0])), 0, Math.min(1, Math.max(0, p[1])), p[2]];
  const cost = (p) => { const c = curve(p); const pk = peakOf(c); return errOf(c) + (pk > cap ? 10 * (pk - cap) : 0); };
  let best = null;
  for (const start of [[0.2, 0.1, 1.3], [0.25, 0.2, 1.2], [0.15, 0.05, 1.25], [0.3, 0.15, 1.15]]) {
    let S = [start, ...start.map((_, i) => start.map((v, j) => (i === j ? v + 0.06 : v)))].map((p) => ({ p, c: cost(p) }));
    for (let it = 0; it < 900; it++) {
      S.sort((a, b) => a.c - b.c);
      const n = 3, cen = Array(n).fill(0);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cen[j] += S[i].p[j] / n;
      const w = S[n], at = (k) => cen.map((v, j) => v + k * (w.p[j] - v));
      const r = at(-1), rc = cost(r);
      if (rc < S[0].c) { const e = at(-2), ec = cost(e); S[n] = ec < rc ? { p: e, c: ec } : { p: r, c: rc }; }
      else if (rc < S[n - 1].c) S[n] = { p: r, c: rc };
      else { const k = at(0.5), kc = cost(k); if (kc < w.c) S[n] = { p: k, c: kc }; else S = S.map((s, i) => (i === 0 ? s : { p: s.p.map((v, j) => S[0].p[j] + 0.5 * (v - S[0].p[j])), c: 0 })).map((s, i) => (i === 0 ? s : { p: s.p, c: cost(s.p) })); }
    }
    S.sort((a, b) => a.c - b.c);
    if (!best || S[0].c < best.c) best = { c: S[0].c, curve: curve(S[0].p) };
  }
  const c = best.curve.map((v) => +v.toFixed(3)), pk = peakOf(c);
  return { bezier: c, err_vs_token_pct: +(errOf(c) * 100).toFixed(2), peak_pct: +((pk - 1) * 100).toFixed(2), zeta_of_peak: +zetaForPeak(pk - 1).toFixed(3) };
}

const out = {
  at: new Date().toISOString(),
  row_overshoot_pct: 4.21, row_zeta: 0.71,
  pass2_free_fit: { bezier: [0.198, 0, 0.106, 1.343], err_vs_token_pct: +(errOf([0.198, 0, 0.106, 1.343]) * 100).toFixed(2), peak_pct: +((peakOf([0.198, 0, 0.106, 1.343]) - 1) * 100).toFixed(2), zeta_of_peak: +zetaForPeak(peakOf([0.198, 0, 0.106, 1.343]) - 1).toFixed(3) },
  capped_at_row: fit(1.0421),
};
writeFileSync(path.join(HERE, "panel-fit.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
