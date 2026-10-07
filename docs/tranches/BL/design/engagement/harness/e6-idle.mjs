#!/usr/bin/env node
// E-6 · the idle rung (S6's breathing preset, `W-H.3.md:46`) under W-F.6's compositor-only bound, with breathing
// defined (H-5) so a trivial loop cannot pass it. The subject is the scene gated "E-6" ([data-e=target]); every
// running infinite animation on it or its subtree, pseudo-elements included, at rest, light and dark:
//   present   ≥ 1 running infinite animation on the subject at rest
//   channel   every animated property is a BREATHING channel: scale (or a transform that is a scale alone), or opacity
//             on a pseudo-element (a light layer). Opacity on the subject or a descendant element dims the control's
//             own ink and fails; a layout property (width, height, inset, margin, padding, …) fails; rotate, translate,
//             filter and a non-scale transform fail (a spinner, a drift and a pulse of brightness are loops, not a
//             breath, and their amplitude has no bound here: a route that needs one argues the bound first)
//   shape     a breath returns: every leg's value at the loop seam is continuous (the 0 % and 100 % keyframes equal,
//             an omitted one being the underlying value, or the direction alternates), and it is eased (some easing
//             on the effect or a keyframe is not linear). A sawtooth or a linear ramp fails
//   amplitude a scale leg moves 0.004..0.03 from rest (perceptible, below the hover geometry budget); an opacity leg on
//             a light layer moves ≥ 0.05
//   period    one iteration lasts 2400..8000 ms (a breath, not a flicker and not a drift)
//   layouts/s 0 over 3 s at rest (Chromium CDP LayoutCount; W-F.6's bound). Playwright WebKit: REPORT n/a
//   PRM       under reduced motion no spatial idle leg runs (scale, transform, translate, rotate)
// Q-2's default (b) RETIREs S6 (PORTFOLIO §7): if the owner rules it RETIRED, this witness is deleted with the
// owner's words in the F-54 row and E-6 is recorded "retired", not green.
//   node e6-idle.mjs --build <dir> | --fixture [--fault e6-dim] [--engine webkit]
import { witness, openPage, scenesFor, f } from "./lib.mjs";

const BREATH = new Set(["scale", "transform", "opacity"]);
const SCALE_ONLY = /^(none|scale\([^)]*\)|matrix\(\s*([-\d.e]+),\s*0,\s*0,\s*\2,\s*0,\s*0\s*\))$/;
const SPATIAL = new Set(["scale", "transform", "translate", "rotate"]);
const readIdle = (P) => P.page.evaluate(() => {
  const s = document.querySelector('[data-e~="target"]'); if (!s) return null;
  return s.getAnimations({ subtree: true }).filter((a) => a.playState === "running" && a.effect?.getComputedTiming().iterations === Infinity).map((a) => {
    const e = a.effect; const kf = e.getKeyframes(); const props = [...new Set(kf.flatMap((k) => Object.keys(k).filter((p) => !["offset", "easing", "composite", "computedOffset"].includes(p))))];
    const host = e.target === s; const pseudo = e.pseudoElement ?? null;
    const vals = {}; for (const p of props) vals[p] = kf.map((k) => k[p]).filter((v) => v !== undefined);
    // the seam: each leg's value at offset 0 and at offset 1 (null when that keyframe omits it: the underlying value)
    const at = (o, p) => { const k = kf.find((x) => (x.computedOffset ?? x.offset) === o && x[p] !== undefined); return k ? String(k[p]) : null; };
    const seam = {}; for (const p of props) seam[p] = [at(0, p), at(1, p)];
    const timing = e.getComputedTiming(); const easings = [timing.easing ?? "linear", ...kf.map((k) => k.easing ?? "linear")];
    // a keyframe list omitting the rest value animates from the underlying value: read it
    const cs = pseudo ? getComputedStyle(e.target, pseudo) : getComputedStyle(e.target);
    return { name: a.animationName ?? a.id ?? a.constructor.name, props, vals, seam, easings, dir: timing.direction, host, pseudo, onElement: !pseudo, dur: timing.duration, rest: { scale: cs.scale, opacity: cs.opacity } };
  });
});
const num = (v) => { if (v == null || v === "none") return 1; const m = String(v).match(/-?[\d.]+/); return m ? +m[0] : NaN; };
const scaleOf = (v) => { if (v == null || v === "none") return 1; const s = String(v); const m = s.match(/scale\(([-\d.]+)/) ?? s.match(/matrix\(([-\d.]+)/); return m ? +m[1] : num(s); };

await witness("E-6", "the idle rung under the compositor-only bound", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc] of scenesFor(idx, "E-6")) {
    for (const theme of ["light", "dark"]) {
      const r = await guard(`${sc} ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          await P.page.waitForTimeout(500);
          const idle = await readIdle(P);
          let lay = null;
          if (engine === "chromium") {
            const cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable");
            const g = (m, n) => m.find((x) => x.name === n).value;
            const m0 = (await cdp.send("Performance.getMetrics")).metrics; await P.page.waitForTimeout(3000); const m1 = (await cdp.send("Performance.getMetrics")).metrics;
            lay = { layouts: (g(m1, "LayoutCount") - g(m0, "LayoutCount")) / 3, recalcs: (g(m1, "RecalcStyleCount") - g(m0, "RecalcStyleCount")) / 3 };
          }
          const Q = await openPage(E, T, sc, { theme, prm: true });
          let prm;
          try { await Q.page.waitForTimeout(500); prm = { ok: Q.modeOk, idle: await readIdle(Q) }; } finally { await Q.close(); }
          return { idle, lay, prm };
        } finally { await P.close(); }
      }, 60000);
      const name = (c) => `E-6 ${sc} ${c} ${theme}`;
      if (r.crashed) { cell(name("present"), "FAIL", r.line); continue; }
      const A = r.idle ?? [];
      const desc = A.map((x) => `${x.name}[${x.props.join("+")}${x.pseudo ? ` on ${x.pseudo}` : x.host ? " on the subject" : " on a descendant"}, ${f(x.dur, 0)} ms]`).join(", ");
      cell(name("present"), A.length ? "PASS" : "FAIL", `${A.length} running infinite animation(s) at rest${A.length ? `: ${desc}` : ""}${r.idle === null ? " (subject absent)" : ""}`);
      if (!A.length) {
        for (const c of ["channel", "shape", "amplitude", "period"]) cell(name(c), "UNMEASURED", "no idle animation to read");
      } else {
        const badCh = A.flatMap((x) => x.props.filter((p) => !BREATH.has(p) || (p === "opacity" && x.onElement) || (p === "transform" && !x.vals[p].every((v) => SCALE_ONLY.test(String(v).trim())))).map((p) => `${p}${p === "opacity" ? (x.host ? " on the subject (dims its ink)" : " on a descendant element") : p === "transform" ? " (not a scale alone)" : " (not a breathing channel)"}`));
        cell(name("channel"), badCh.length ? "FAIL" : "PASS", badCh.length ? `disallowed: ${badCh.join(", ")} (breathing channels: scale, a scale transform, opacity on a pseudo-element)` : `channels ${[...new Set(A.flatMap((x) => x.props))].join(", ")}`);
        const val = (p, v) => (p === "opacity" ? num(v) : scaleOf(v));
        const seamBad = A.flatMap((x) => (/alternate/.test(x.dir) ? [] : x.props.filter((p) => { const [a0, a1] = x.seam[p]; return a0 !== null && a1 !== null ? Math.abs(val(p, a0) - val(p, a1)) > 1e-4 : a0 !== a1 && Math.abs(val(p, a0 ?? (p === "opacity" ? x.rest.opacity : x.rest.scale)) - val(p, a1 ?? (p === "opacity" ? x.rest.opacity : x.rest.scale))) > 1e-4; }).map((p) => `${x.name} ${p} ${x.seam[p][0] ?? "underlying"} → ${x.seam[p][1] ?? "underlying"} at the seam`)));
        const linear = A.filter((x) => x.easings.every((e) => e === "linear")).map((x) => `${x.name} linear`);
        cell(name("shape"), seamBad.length || linear.length ? "FAIL" : "PASS", seamBad.length || linear.length ? `not a breath: ${[...seamBad, ...linear].join("; ")}` : `continuous at the seam, eased (${[...new Set(A.flatMap((x) => x.easings.filter((e) => e !== "linear")))].join(", ").slice(0, 80)})`);
        const amps = A.flatMap((x) => x.props.filter((p) => p === "scale" || p === "transform" || p === "opacity").map((p) => {
          if (p === "opacity") { const v = [...x.vals[p].map(num), num(x.rest.opacity)]; const a = Math.max(...v) - Math.min(...v); return { p, a, ok: a >= 0.05 }; }
          const v = [...x.vals[p].map(scaleOf), scaleOf(x.rest.scale)]; const a = Math.max(...v.map((y) => Math.abs(y - 1))); return { p, a, ok: a >= 0.004 && a <= 0.03 };
        }));
        cell(name("amplitude"), !amps.length ? "UNMEASURED" : amps.every((x) => x.ok) ? "PASS" : "FAIL", amps.length ? amps.map((x) => `${x.p} ${f(x.a)}${x.p === "opacity" ? " (≥ 0.05)" : " (0.004..0.03)"}`).join(", ") : "no scale or opacity leg to read");
        const badP = A.filter((x) => !(x.dur >= 2400 && x.dur <= 8000));
        cell(name("period"), badP.length ? "FAIL" : "PASS", `iteration ${A.map((x) => `${f(x.dur, 0)} ms`).join(", ")} (bound 2400..8000 ms)`);
      }
      if (r.lay) cell(name("layouts/s"), r.lay.layouts === 0 ? "PASS" : "FAIL", `layouts/s ${f(r.lay.layouts, 1)} · style recalcs/s ${f(r.lay.recalcs, 1)} over 3 s at rest (bound 0 layouts/s)`);
      else cell(name("layouts/s"), "REPORT", "n/a: Playwright WebKit exposes no layout counter");
      const P2 = r.prm.idle ?? [];
      const spatial = P2.filter((x) => x.props.some((p) => SPATIAL.has(p)));
      cell(name("PRM"), !r.prm.ok ? "FAIL" : spatial.length ? "FAIL" : "PASS", !r.prm.ok ? "MODE NOT APPLIED (PRM)" : `${P2.length} idle animation(s) under reduced motion, ${spatial.length} spatial${spatial.length ? `: ${spatial.map((x) => x.name).join(", ")}` : ""}`);
    }
  }
});
