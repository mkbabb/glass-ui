// BM pass 1: the numbers R2 and R5 show, computed outside a browser (pure functions, same code as the pages).
const x = (t, resp, z, v0) => {
  const w0 = 2 * Math.PI / resp;
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t); return 1 - e * (Math.cos(wd * t) + ((z * w0 - v0) / wd) * Math.sin(wd * t)); }
  return 1 - Math.exp(-w0 * t) * (1 + (w0 - v0) * t);
};
const settle = (resp, z, v0, band) => { let last = 0; for (let t = 0.0005; t < 5; t += 0.0005) if (Math.abs(1 - x(t, resp, z, v0)) >= band) last = t; return last; };
const fit = (f, slope) => {
  const err = (a, b, c) => { let m = 0; for (let i = 1; i < 120; i++) { const u = i / 120, iu = 1 - u;
    const bx = 3 * iu * iu * u * a + 3 * iu * u * u * b + u * u * u, by = 3 * iu * iu * u * a * slope + 3 * iu * u * u * c + u * u * u;
    m = Math.max(m, Math.abs(by - f(bx))); } return m; };
  let best = [1];
  for (let a = 0.05; a <= 0.6; a += 0.025) for (let b = 0.2; b <= 0.98; b += 0.02) for (let c = 0.85; c <= 1.15; c += 0.01) { const e = err(a, b, c); if (e < best[0]) best = [e, a, b, c]; }
  return best;
};
const out = {};
for (const [name, resp, z, v0] of [["dock, flick 6/s (R2)", 0.3, 0.88, 6], ["dock, from rest", 0.3, 0.88, 0], ["present", 0.22, 1, 0], ["panel", 0.4, 0.71, 0], ["bloom", 0.42, 0.9, 0]]) {
  const T = settle(resp, z, v0, 0.003), f = (p) => x(p * T, resp, z, v0);
  let peak = 0; for (let t = 0; t < 2; t += 0.0005) peak = Math.max(peak, x(t, resp, z, v0));
  const [e, a, b, c] = fit(f, v0 * T);
  out[name] = { horizon_ms: Math.round(T * 1000), peak: +peak.toFixed(4), bezier: [a, Math.min(a * v0 * T, 3), b, c].map((v) => +v.toFixed(3)), bezier_max_err_pct: +(e * 100).toFixed(2) };
}
for (const [name, resp, z] of [["R5 A present", 0.22, 1], ["R5 B bloom", 0.42, 0.9], ["R5 C panel", 0.4, 0.71], ["R5 D Apple measured (rida, sim)", 0.341, 0.758]]) {
  let peak = 0, t98 = 0; for (let t = 0; t < 3; t += 0.0005) { const v = x(t, resp, z, 0); peak = Math.max(peak, v); if (!t98 && v >= 0.98) t98 = t; }
  out[name] = { overshoot_pct: +((peak - 1) * 100).toFixed(2), t_to_98pct_ms: Math.round(t98 * 1000) };
}
console.log(JSON.stringify(out, null, 1));
