#!/usr/bin/env node
// E-5 · a held touch answers through a press rung, not leaked hover (W-I.3's touch rows, `W-I.3.md:61`).
// Per scene gated "E-5", light and dark:
//   hover-only set   fine pointer, the mouse over the control 500 ms, no press: the paint properties that change
//   touch set        a coarse page (lib.mjs openTouchPage: (hover: none) and (pointer: coarse) verified), a touch held
//                    350 ms on the control. Chromium: the long-tap gesture; WebKit: Input.dispatchTouchEvent through
//                    wktouch.mjs (H-4). Both set `:active` and a sticky `:hover` (PORTFOLIO §1.3 item 8)
//   press            PASS when |Δscale| ≥ 0.01 under the touch, or ≥ 1 paint property changes under the touch that
//                    hover does not paint (the press-only set: changed from rest, and to a value other than the hover
//                    state's). A control whose only touch answer is its hover paint FAILS
//   press-light(PRM) H-9: the same touch under reduced motion. The spatial leg retires there (E-9), so the answer must
//                    be light: ≥ 1 press-only paint property
//   sustain          CK-06 (pass 2; `engageEnvelopes.ts:10-12`: a held engagement "SUSTAINS for the hold's entire
//                    multi-second life"): the same held touch read at +200 ms and +1200 ms. The press-only properties
//                    at +200 ms are measured as their distance from rest (a colour as its RGBA distance, a number as
//                    its difference, any other value 1 when it differs); PASS when the distance at +1200 ms is ≥ 0.95×
//                    the distance at +200 ms. Read normally and under reduced motion (sustain(PRM))
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e5-touch.mjs --build <dir> | --fixture [--fault e5-hover] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, paintDiff, f } from "./lib.mjs";

await witness("E-5", "a held touch answers through a press rung, and sustains (CK-06)", async ({ E, T, cell, guard, idx }) => {
  for (const [sc, m] of scenesFor(idx, "E-5")) {
    const sel = m.touch ?? '[data-e~="target"]';
    const snap = (P) => P.page.evaluate((s) => { const e = document.querySelector(s); return { p: window.__paint(s), s: window.__eff(e).s, act: e.matches(":active") }; }, sel);
    for (const theme of ["light", "dark"]) {
      const r = await guard(`${sc} ${theme}`, async () => {
        let P = await openPage(E, T, sc, { theme });
        let h0, h1;
        try {
          await P.page.waitForTimeout(250); const c = await center(P.page, sel); h0 = await snap(P);
          await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(500); h1 = await snap(P);
        } finally { await P.close(); }
        const touch = async (prm) => {
          const Q = await openTouchPage(E, T, sc, { theme, prm });
          try {
            if (!Q.modeOk) return { mode: Q.modeLine };
            await Q.page.waitForTimeout(250); const p0 = await snap(Q);
            const c = await center(Q.page, sel);
            const [pa, p1, pz] = await Q.holdAt(c.x, c.y, [200, 350, 1200], () => snap(Q));
            // press-only: a property the touch changes to a value the hover state does not have (leaked hover paints the
            // hover value; a press rung paints its own)
            const onlyAt = (p) => paintDiff(p0.p, p.p).filter((k) => p.p[k] !== h1.p[k]);
            // CK-06: the press light's distance from rest at +200 ms and at +1200 ms, over the +200 ms press-only set
            const keys = onlyAt(pa);
            const dist = await Q.page.evaluate(([keys, r, a, z]) => {
              const one = (u, v) => { const cu = window.__rgba(u), cv = window.__rgba(v); if (cu && cv && /^(rgb|oklab|oklch|color|lab|lch|hsl|#)/.test(u.trim())) return Math.hypot(...cu.map((x, i) => x - cv[i])); const nu = parseFloat(u), nv = parseFloat(v); if (Number.isFinite(nu) && Number.isFinite(nv) && String(nu) === u.trim() && String(nv) === v.trim()) return Math.abs(nu - nv); return u === v ? 0 : 1; };
              const sum = (p) => keys.reduce((s, k) => s + one(r[k], p[k]), 0);
              return { a: sum(a), z: sum(z) };
            }, [keys, p0.p, pa.p, pz.p]);
            return { t: paintDiff(p0.p, p1.p), only: onlyAt(p1), ds: p1.s - p0.s, act: p1.act, sus: { keys, ...dist, actZ: pz.act } };
          } finally { await Q.close(); }
        };
        return { h: paintDiff(h0.p, h1.p), on: await touch(false), prm: await touch(true) };
      }, 90000);
      if (r.crashed) { cell(`E-5 ${sc} press ${theme}`, "FAIL", r.line); continue; }
      for (const [k, x] of [["press", r.on], ["press-light(PRM)", r.prm]]) {
        if (x.mode) { cell(`E-5 ${sc} ${k} ${theme}`, "FAIL", `MODE NOT APPLIED ${x.mode}`); continue; }
        const sn = `E-5 ${sc} sustain${k === "press" ? "" : "(PRM)"} ${theme}`; const u = x.sus;
        if (!u.keys.length) cell(sn, "FAIL", `NOT DRIVEN: no press-only property at +200 ms (the hold paints nothing to sustain)`);
        else cell(sn, u.z >= 0.95 * u.a - 1e-9 ? "PASS" : "FAIL", `the press light's distance from rest over [${u.keys.join(", ").slice(0, 120)}]: +200 ms ${f(u.a, 3)} → +1200 ms ${f(u.z, 3)} (${u.a ? `×${f(u.z / u.a, 2)}` : "rising from 0 at +200 ms"}; bound ≥ ×0.95) · :active at +1200 ms ${u.actZ}`);
        const only = x.only;
        const pass = k === "press" ? Math.abs(x.ds) >= 0.01 || only.length > 0 : only.length > 0;
        cell(`E-5 ${sc} ${k} ${theme}`, pass ? "PASS" : "FAIL", `:active ${x.act} · Δscale ${f(x.ds)} · touch-changed [${x.t.join(", ")}] · hover-changed [${r.h.join(", ")}] · press-only [${only.join(", ")}]${k === "press" ? "" : " (bound ≥ 1 press-only property under reduce)"}${r.note ? ` · ${r.note}` : ""}`);
      }
    }
  }
});
