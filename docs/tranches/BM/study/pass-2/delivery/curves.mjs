// BM pass 2: the settle's four deliveries, as numbers. Pure functions; no browser.
// Run: guarded --light -- node docs/tranches/BM/study/pass-2/delivery/curves.mjs
// Reads the six SPRING_PRESETS rows and the shipped --spring-* linear() tokens, and computes:
//  1. the spring model against the shipped tokens (is the closed form the same curve?);
//  2. the best single cubic-bezier() per row from rest (candidate D at v0 = 0), by Nelder-Mead on max error;
//  3. keyframes sampled from the spring with linear between (candidate C): error by keyframe count;
//  4. both again with a release velocity (the dock row; v0 in travels per second);
//  5. the kink a CSS transition makes when it turns round mid-flight;
//  6. frames per leg at 30, 60 and 120 Hz for every clock the canon names (Low Power Mode).
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(HERE, "../../../../../..");
const css = readFileSync(path.join(ROOT, "src/styles/tokens/scheme-spring.css"), "utf8");
const presetsSrc = readFileSync(path.join(ROOT, "src/composables/motion/spring/springPresets.ts"), "utf8");

// The table, parsed from source (one source).
const ROWS = [...presetsSrc.matchAll(/name: "(\w+)",\s*response: ([\d.]+),\s*dampingFraction: ([\d.]+),\s*settleBand: ([\d.]+)/g)]
  .map(([, name, r, z, b]) => ({ name, response: +r, zeta: +z, band: +b }));

// The closed-form damped spring from (x0 = 0, v0) toward 1; omega_n = 2*pi/response (SwiftUI's convention, kf's).
const x = (t, resp, z, v0 = 0) => {
  const w0 = (2 * Math.PI) / resp;
  if (z < 1) {
    const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t);
    return 1 - e * (Math.cos(wd * t) + ((z * w0 - v0) / wd) * Math.sin(wd * t));
  }
  return 1 - Math.exp(-w0 * t) * (1 + (w0 - v0) * t);
};
const dx = (t, resp, z, v0 = 0, h = 1e-6) => (x(t + h, resp, z, v0) - x(t - h, resp, z, v0)) / (2 * h);
const settle = (resp, z, v0, band) => {
  let last = 0;
  for (let t = 0.0005; t < 5; t += 0.0005) if (Math.abs(1 - x(t, resp, z, v0)) >= band) last = t;
  return Math.round((last * 1000) / 10) / 100; // the token register's 10 ms rounding
};

// The shipped tokens.
const tokenStops = (name) => {
  const m = css.match(new RegExp(`--spring-${name}: linear\\(([^;]+)\\);`));
  if (!m) return null;
  const parts = m[1].split(",").map((s) => s.trim());
  return parts.map((p, i) => {
    const [v, pct] = p.split(/\s+/);
    return { u: pct ? parseFloat(pct) / 100 : i === 0 ? 0 : 1, y: parseFloat(v) };
  });
};
const tokenSettle = (name) => parseFloat(css.match(new RegExp(`--spring-${name}-settle: ([\\d.]+)s`))[1]);
const evalStops = (stops, u) => {
  for (let i = 1; i < stops.length; i++) if (u <= stops[i].u) {
    const a = stops[i - 1], b = stops[i];
    return a.y + ((b.y - a.y) * (u - a.u)) / (b.u - a.u || 1);
  }
  return stops[stops.length - 1].y;
};

// cubic-bezier(x1, y1, x2, y2) evaluated at time u.
const bez = (p1, p2, s) => 3 * (1 - s) * (1 - s) * s * p1 + 3 * (1 - s) * s * s * p2 + s * s * s;
const bezY = ([x1, y1, x2, y2], u) => {
  let lo = 0, hi = 1, s = u;
  for (let i = 0; i < 40; i++) { const xs = bez(x1, x2, s); if (xs < u) lo = s; else hi = s; s = (lo + hi) / 2; }
  return bez(y1, y2, s);
};
const GRID = Array.from({ length: 401 }, (_, i) => i / 400);
const maxErr = (f, g) => GRID.reduce((m, u) => Math.max(m, Math.abs(f(u) - g(u))), 0);

// Nelder-Mead on the max error, x1 and x2 held in [0, 1]; y1 tied to the start slope when one is given.
function fitBezier(f, slope = null, y2Max = Infinity) {
  const clampP = (p) => [Math.min(1, Math.max(0, p[0])), p[1], Math.min(1, Math.max(0, p[2])), Math.min(y2Max, p[3])];
  const toCurve = (p) => { const q = clampP(p); if (slope !== null) q[1] = q[0] * slope; return q; };
  const cost = (p) => maxErr(f, (u) => bezY(toCurve(p), u));
  let best = null;
  for (const start of [[0.2, 0, 0.2, 1], [0.1, 0.3, 0.3, 1.05], [0.3, 0.5, 0.1, 1], [0.05, 0.2, 0.4, 1.1], [0.15, 0.6, 0.25, 1]]) {
    let simplex = [start, ...start.map((_, i) => start.map((v, j) => (i === j ? v + 0.08 : v)))].map((p) => ({ p, c: cost(p) }));
    for (let it = 0; it < 700; it++) {
      simplex.sort((a, b) => a.c - b.c);
      const n = 4, cen = Array(n).fill(0);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) cen[j] += simplex[i].p[j] / n;
      const worst = simplex[n];
      const at = (k) => cen.map((v, j) => v + k * (worst.p[j] - v));
      const r = at(-1), rc = cost(r);
      if (rc < simplex[0].c) { const e = at(-2), ec = cost(e); simplex[n] = ec < rc ? { p: e, c: ec } : { p: r, c: rc }; }
      else if (rc < simplex[n - 1].c) simplex[n] = { p: r, c: rc };
      else { const k = at(0.5), kc = cost(k); if (kc < worst.c) simplex[n] = { p: k, c: kc };
        else simplex = simplex.map((s, i) => (i === 0 ? s : { p: s.p.map((v, j) => simplex[0].p[j] + 0.5 * (v - simplex[0].p[j])), c: 0 })).map((s, i) => (i === 0 ? s : { p: s.p, c: cost(s.p) })); }
    }
    simplex.sort((a, b) => a.c - b.c);
    if (!best || simplex[0].c < best.c) best = { c: simplex[0].c, p: toCurve(simplex[0].p) };
  }
  return { curve: best.p.map((v) => +v.toFixed(3)), err: best.c };
}

// Candidate C: N keyframes at uniform times, linear between, the last at the target exactly.
const sampled = (f, N) => { const ks = Array.from({ length: N }, (_, i) => ({ u: i / (N - 1), y: i === N - 1 ? 1 : f(i / (N - 1)) })); return (u) => evalStops(ks, u); };

const out = { at: new Date().toISOString(), model: {}, fromRest: {}, withVelocity: {}, kink: {}, frames: {}, bytes: {} };

// 1. The model against the shipped tokens, and 2./3. per row from rest.
for (const r of ROWS) {
  const T = tokenSettle(r.name), Tcalc = settle(r.response, r.zeta, 0, r.band);
  const stops = tokenStops(r.name);
  const spring = (u) => x(u * T, r.response, r.zeta);
  const token = (u) => evalStops(stops, u);
  let peak = 0; for (let t = 0; t < 3; t += 0.0005) peak = Math.max(peak, x(t, r.response, r.zeta));
  out.model[r.name] = { settle_token_s: T, settle_recomputed_s: Tcalc, token_vs_closed_form_max_pct: +(maxErr(spring, token) * 100).toFixed(2), x_at_T: +spring(1).toFixed(4), overshoot_pct: +((peak - 1) * 100).toFixed(2) };
  const fit = fitBezier(token);
  const kf = {};
  for (const N of [6, 8, 10, 12, 16, 24]) kf[N] = +(maxErr(token, sampled(token, N)) * 100).toFixed(2);
  out.fromRest[r.name] = { bezier: fit.curve, bezier_max_err_pct_vs_token: +(fit.err * 100).toFixed(2), sampled_linear_err_pct_vs_token: kf };
}

// 4. With a release velocity, on the dock row (the mark's settle): v0 in travels per second.
//    Travel 100 px and a flick of 600 px/s is v0 = 6; a flick away from the target is negative.
const dock = ROWS.find((r) => r.name === "dock");
for (const v0 of [-6, -3, 0, 3, 6, 12, 24]) {
  const T = settle(dock.response, dock.zeta, v0, 0.005);
  const f = (u) => x(u * T, dock.response, dock.zeta, v0);
  const fit = fitBezier(f, v0 * T);
  const need = [6, 8, 10, 12, 16, 24, 32].find((N) => maxErr(f, sampled(f, N)) <= 0.005) ?? ">32";
  let lo = 0, hi = 1; for (let t = 0; t < T; t += 0.0005) { const v = x(t, dock.response, dock.zeta, v0); lo = Math.min(lo, v); hi = Math.max(hi, v); }
  out.withVelocity[`v0=${v0}`] = { horizon_ms: Math.round(T * 1000), range: [+lo.toFixed(3), +hi.toFixed(3)], bezier: fit.curve, bezier_max_err_pct: +(fit.err * 100).toFixed(2), keyframes_for_half_pct: need, err_16_pct: +(maxErr(f, sampled(f, 16)) * 100).toFixed(2) };
}

// 4b. Every row against the TRUE spring (not the token), on a tight horizon (band 0.002, about 0.2 px per 100 px),
//     so the only error left is the delivery's: D as one cubic-bezier that leaves rest at no speed (y1 = 0),
//     and C as N keyframes, placed uniformly or by curvature (density ~ sqrt|x''|), linear between.
const adaptiveTimes = (f, N) => {
  const M = 2000, w = [], h = 1 / M; let acc = 0; const cum = [0];
  for (let i = 1; i <= M; i++) { const u = i * h; const k = Math.sqrt(Math.abs(f(Math.min(1, u + h)) - 2 * f(u) + f(Math.max(0, u - h))) / (h * h)) + 0.5; acc += k * h; cum.push(acc); }
  const ts = [0]; for (let j = 1; j < N - 1; j++) { const target = (acc * j) / (N - 1); let i = cum.findIndex((c) => c >= target); ts.push(i / M); } ts.push(1); return ts;
};
const sampledAt = (f, ts) => { const ks = ts.map((u, i) => ({ u, y: i === ts.length - 1 ? 1 : f(u) })); return (u) => evalStops(ks, u); };
out.trueSpring = {};
for (const r of ROWS) {
  for (const v0 of r.name === "dock" ? [-6, 0, 6, 12, 24] : [0]) {
    const T = settle(r.response, r.zeta, v0, 0.002);
    const f = (u) => x(u * T, r.response, r.zeta, v0);
    const d = fitBezier(f, v0 * T);
    const uni = {}, ada = {};
    for (const N of [8, 12, 16, 24]) { uni[N] = +(maxErr(f, sampled(f, N)) * 100).toFixed(2); ada[N] = +(maxErr(f, sampledAt(f, adaptiveTimes(f, N))) * 100).toFixed(2); }
    const endSlope = (1 - d.curve[3]) / (1 - d.curve[2]);
    out.trueSpring[`${r.name} v0=${v0}`] = { horizon_ms: Math.round(T * 1000), D_bezier: d.curve, D_max_err_pct: +(d.err * 100).toFixed(2), D_end_speed_travels_per_s: +(endSlope / T).toFixed(2), C_uniform_err_pct: uni, C_curvature_err_pct: ada };
  }
}

// 4c. The token replacement the canon allows: D from rest that leaves rest at no speed (y1 = 0, P0a "weight")
//     and, on every row the canon keeps from overshooting (P2: all but panel), never passes the target (y2 <= 1).
//     Measured against the shipped token (what a person sees today) and against the true spring on the token's clock.
out.tokenReplacement = {};
for (const r of ROWS) {
  const T = tokenSettle(r.name), stops = tokenStops(r.name);
  const token = (u) => evalStops(stops, u), spring = (u) => x(u * T, r.response, r.zeta);
  const cap = r.name === "panel" ? Infinity : 1;
  const d = fitBezier(token, 0, cap);
  let peak = 0; for (const u of GRID) peak = Math.max(peak, bezY(d.curve, u));
  out.tokenReplacement[r.name] = { bezier: d.curve, err_vs_token_pct: +(d.err * 100).toFixed(2), err_vs_spring_pct: +(maxErr(spring, (u) => bezY(d.curve, u)) * 100).toFixed(2), token_vs_spring_pct: +(maxErr(spring, token) * 100).toFixed(2), bezier_peak: +peak.toFixed(4) };
}

// 5. The kink: a transition retargeted mid-flight restarts at its curve's own start slope (0 from rest).
for (const name of ["dock", "present", "press"]) {
  const r = ROWS.find((q) => q.name === name);
  let vmax = 0, tmax = 0; for (let t = 0; t < 0.5; t += 0.0005) { const v = dx(t, r.response, r.zeta); if (v > vmax) { vmax = v; tmax = t; } }
  out.kink[name] = { peak_speed_px_per_s_for_100px: Math.round(vmax * 100), at_ms: Math.round(tmax * 1000), speed_after_a_turn_round: 0 };
}

// 6. Frames per leg (B-10): every clock the canon names, at 30 (Low Power Mode), 60 and 120 Hz.
const clocks = {
  "P0a out row, low": 75, "P0a out row, high": 120, "P0a press": 100, "P0a hover, low": 100,
  "HA reduced-motion fade, low": 120, "HA reduced-motion fade, high": 150, "HA out, low": 100,
};
for (const r of ROWS) { const s = tokenSettle(r.name) * 1000; clocks[`--spring-${r.name}-duration`] = s; clocks[`--spring-${r.name}-exit-duration`] = Math.min(250, Math.max(120, s * 0.6)); }
for (const [k, ms] of Object.entries(clocks)) out.frames[k] = { ms: Math.round(ms), at30: +(ms / 33.33).toFixed(1), at60: +(ms / 16.67).toFixed(1), at120: +(ms / 8.33).toFixed(1), under_five_frames_at_30: ms / 33.33 < 5 };

// Bytes: the six linear() tokens against six cubic-bezier() tokens (raw and gzip -9), the price of the swap.
const linearLines = ROWS.map((r) => css.match(new RegExp(`\\s*--spring-${r.name}: linear\\([^;]+\\);`))[0]).join("\n");
const bezLines = ROWS.map((r) => `    --spring-${r.name}: cubic-bezier(${out.tokenReplacement[r.name].bezier.join(", ")});`).join("\n");
const gz = (s) => zlib.gzipSync(Buffer.from(s), { level: 9 }).length;
out.bytes = { linear_tokens_raw: linearLines.length, linear_tokens_gz: gz(linearLines), bezier_tokens_raw: bezLines.length, bezier_tokens_gz: gz(bezLines) };

writeFileSync(path.join(HERE, "curves.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
