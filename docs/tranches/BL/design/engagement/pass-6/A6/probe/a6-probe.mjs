#!/usr/bin/env node
// P-A6 probe (D5 pass 6). Not a witness: the seat's own reads on the harness's own scene app, through the harness's
// lib (one browser per run, a fresh context per cell, every page closed in a finally; the lock, NAV_CAP and the
// load printing are lib.mjs's). Cells:
//   prm <scene> <theme>        CK-02's PRM cell per face kind (O-103d (1)): under reduced motion, Tab in, the scene's
//                              commit key. The commit is an INSTANT state change: the target's scale in flight on
//                              ≤ 1 frame and its body in flight on ≤ 1 frame (E-9's commit-spatial read), and no pop
//                              (scale range < 0.002 across the film). It is LEGIBLE through the face's own state: the
//                              face's settled paint after the commit differs from before it on ≥ 5 % of its pixels by
//                              ≥ 16 levels of 8-bit luma. A disclosure's state is its region, not its trigger's
//                              paint: on the disclosed exemplar (a row carrying `ladder`) the region
//                              ([role="region"]), read before the key and after the settle, must go from no height to
//                              at least one 16 px line, with its
//                              height in flight on ≤ 1 frame (an instant reveal, not a glide). A stateless member
//                              (no state to show) is REPORT
//   prm-control <scene>        the same reads with a key that commits nothing (Shift): the legibility read must FAIL
//                              (the read can fail)
//   reverse <scene> +G <theme> CK-20 on the pop: a programmatic commit and its reverse G ms later (G = 60, 200), the
//                              target's scale per frame for 900 ms. PASS when no one-frame scale step exceeds the
//                              single commit's largest one-frame step by more than 0.002 (no discontinuity), the
//                              state is back, and the face rests at ×1 ± 0.002 at the end. The pops (local maxima
//                              above ×1.002) are printed
//   node a6-probe.mjs --build <dir> [--engine webkit] [--out <dir>] [--only prm,reverse]
import { witness, openPage, scenesFor, f, tabKey, KEY_DWELL } from "../../../harness/lib.mjs";
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const LUMA_STEP = 16, LUMA_FRAC = 0.05;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const changed = (a, b) => { if (!a || !b || a.w !== b.w || a.h !== b.h) return { frac: NaN, mean: NaN }; let n = 0, s = 0; for (let i = 0; i < a.o.length; i++) { const d = Math.abs(a.o[i] - b.o[i]); s += d; if (d >= LUMA_STEP) n++; } return { frac: n / a.o.length, mean: s / a.o.length }; };
const bbox = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; }, sel);
// one clip for both shots (the before shot's box), so before and after compare pixel for pixel in either engine
const shot = async (page, bb) => (bb ? luma(await page.screenshot({ clip: { x: Math.floor(bb.x) - 2, y: Math.floor(bb.y) - 2, width: Math.ceil(bb.w) + 4, height: Math.ceil(bb.h) + 4 }, animations: "allow", caret: "initial" })) : null);
const regionH = (page) => page.evaluate(() => { const g = document.querySelector('[role="region"]'); return g ? g.getBoundingClientRect().height : 0; });
// the target's scale and the body's place, every frame for ms (the film takes no screenshot)
const film = ([target, body, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const a = document.querySelector(target), b = body ? document.querySelector(body) : null; const qa = a ? window.__eff(a) : null; const rb = b ? b.getBoundingClientRect() : null; const rg = document.querySelector('[role="region"]'); fr.push({ t: performance.now() - t0, s: qa ? qa.s : NaN, bx: rb ? rb.x : NaN, by: rb ? rb.y : NaN, rh: rg ? rg.getBoundingClientRect().height : 0 }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const spatial = (fr) => {
  const s = fr.map((x) => x.s).filter(Number.isFinite); const range = s.length ? Math.max(...s) - Math.min(...s) : NaN;
  const smid = s.filter((v) => Math.abs(v - s[0]) >= 0.002 && Math.abs(v - s.at(-1)) >= 0.002).length;
  const B = fr.filter((x) => Number.isFinite(x.bx)); const d = (p, q) => Math.hypot(p.bx - q.bx, p.by - q.by);
  const mid = B.length > 1 ? B.filter((r) => d(r, B[0]) > 1 && d(r, B.at(-1)) > 1).length : 0;
  const H = fr.map((x) => x.rh); const h0 = H[0] ?? 0, h1 = H.at(-1) ?? 0;
  const rh = { h0, h1, mid: H.filter((v) => Math.abs(v - h0) > 1 && Math.abs(v - h1) > 1).length };
  return { range, smid, mid, moved: B.length > 1 ? d(B[0], B.at(-1)) : 0, n: fr.length, rh };
};

await witness("A6-probe", "P-A6's PRM cell per face kind (CK-02 × O-103d) and the pop's reverse (CK-20)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (k) => !only || only.has(k);
  const commits = scenesFor(idx, "E-2");
  if (want("prm")) for (const [sc, m] of commits) {
    for (const theme of ["light", "dark"]) {
      for (const control of theme === "light" ? [false, true] : [false]) {
        const name = control ? `prm-control ${sc} (Shift, no commit)` : `prm ${sc} ${theme}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc, { theme, prm: true });
          try {
            if (!P.modeOk) return { mode: P.modeLine };
            await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300);
            const face = m.face ?? m.target;
            const st = () => P.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null));
            const s0 = await st(); const bb = await bbox(P.page, face); const before = await shot(P.page, bb); const rh0 = await regionH(P.page);
            const pf = P.page.evaluate(film, [m.target, m.body ?? null, 600]);
            await P.page.keyboard.press(control ? "Shift" : m.key, KEY_DWELL); const fr = await pf;
            await P.page.waitForTimeout(300);
            const after = await shot(P.page, bb); const s1 = await st(); const rh1 = await regionH(P.page);
            return { s0, s1, sp: spatial(fr), ch: changed(before, after), face, rh0, rh1 };
          } finally { await P.close(); }
        }, 60000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        const RH = r.sp.rh;
        const region = m.ladder ? { legible: r.rh0 <= 1 && r.rh1 >= 16, mid: RH.mid, line: ` · region height ${f(r.rh0, 1)} → ${f(r.rh1, 1)} px (read before the key and after the settle) (bound from ≤ 1 to ≥ 16), in flight on ${RH.mid} frame(s) (bound ≤ 1)` } : null;
        const legible = region ? region.legible : r.ch.frac >= LUMA_FRAC;
        const instant = r.sp.smid <= 1 && r.sp.mid <= 1 && r.sp.range < 0.002 && (!region || region.mid <= 1);
        const line = `state ${String(r.s0).slice(0, 24)} → ${String(r.s1).slice(0, 24)} · instant: scale range ${f(r.sp.range, 4)} (bound < 0.002), scale in flight ${r.sp.smid} frame(s), body moved ${f(r.sp.moved, 1)} px with ${r.sp.mid} frame(s) in flight (bound ≤ 1 each) over ${r.sp.n} frames · legible: ${f(r.ch.frac * 100, 1)} % of the face's pixels changed by ≥ ${LUMA_STEP} levels (bound ≥ ${LUMA_FRAC * 100} %), mean |Δ| ${f(r.ch.mean, 2)} levels · face ${r.face}${region ? region.line + " (the region is the disclosure's state; the face read is printed)" : ""}`;
        if (control) { cell(name, legible ? "FAIL" : "PASS", `the control must read NOT legible (the read can fail): ${line}`); continue; }
        if (m.stateless) { cell(name, "REPORT", `stateless (no state to show; the action's effect is the consumer's): ${line}`); continue; }
        if (r.s0 === r.s1) { cell(name, "FAIL", `NOT DRIVEN: the commit left the state unchanged · ${line}`); continue; }
        cell(name, instant && legible ? "PASS" : "FAIL", line);
      }
    }
  }
  if (want("reverse")) for (const [sc, m] of Object.entries(idx).filter(([, x]) => x.rebound)) {
    for (const theme of ["light", "dark"]) {
      let stepRef = null;
      for (const gap of [null, 60, 200]) {
        const name = gap == null ? `reverse ${sc} single ${theme}` : `reverse ${sc} +${gap} ${theme}`;
        const r = await guard(name, async () => {
          const P = await openPage(E, T, sc, { theme });
          try {
            await P.page.waitForTimeout(300);
            return await P.page.evaluate(([tg, face, gap, ms]) => new Promise((ok) => {
              const el = () => document.querySelector(face) ?? document.querySelector(tg);
              const st = () => JSON.stringify(window.__e.state?.() ?? null); const s0 = st();
              const fr = []; const t0 = performance.now(); window.__e.commit(); const s1 = st(); let flipped = gap == null, s2 = null;
              const tick = () => { const t = performance.now() - t0; if (!flipped && t >= gap) { window.__e.commit(); flipped = true; s2 = st(); } const e = el(); fr.push({ t, s: e ? window.__eff(e).s : NaN }); if (t < ms) requestAnimationFrame(tick); else ok({ fr, s0, s1, s2 }); };
              requestAnimationFrame(tick);
            }), [m.target, m.face ?? m.target, gap, 900]);
          } finally { await P.close(); }
        });
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const S = r.fr.filter((x) => Number.isFinite(x.s));
        const step = Math.max(0, ...S.slice(1).map((x, k) => (Math.abs(x.s - S[k].s) * (1000 / 60)) / Math.max(1000 / 60, x.t - S[k].t)));
        const pops = S.filter((x, k) => k > 0 && k < S.length - 1 && x.s > 1.002 && x.s >= S[k - 1].s && x.s > S[k + 1].s).length;
        const peak = S.reduce((q, x) => (x.s > q.s ? x : q), { s: -1, t: 0 });
        const rest = Math.abs(S.at(-1).s - 1) <= 0.002;
        const trace = S.filter((_, k) => k % 4 === 0).map((x) => `+${x.t.toFixed(0)} ${x.s.toFixed(4)}`).join(" ");
        if (gap == null) { stepRef = step; cell(name, r.s0 !== r.s1 && peak.s > 1.002 ? "REPORT" : "FAIL", `${r.s0 !== r.s1 ? "" : "NOT DRIVEN · "}the single pop: peak ×${f(peak.s, 4)} at +${f(peak.t, 0)} ms · largest one-frame step ${f(step, 4)} per 16.7 ms · pops ${pops} · ${trace}`); continue; }
        const back = r.s2 === r.s0 && r.s1 !== r.s0;
        const ok = back && rest && stepRef != null && step <= stepRef + 0.002;
        cell(name, ok ? "PASS" : "FAIL", `state ${r.s0} → ${r.s1} → ${back ? "back" : "NOT BACK"} at +${gap} · largest one-frame step ${f(step, 4)} against the single pop's ${f(stepRef, 4)} (bound ≤ +0.002) · rests ×${f(S.at(-1).s, 4)} (bound ±0.002) · pops ${pops} (printed) · peak ×${f(peak.s, 4)} at +${f(peak.t, 0)} · ${trace}`);
      }
    }
  }
});
