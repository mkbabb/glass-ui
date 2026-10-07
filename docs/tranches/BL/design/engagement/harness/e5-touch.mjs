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
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e5-touch.mjs --build <dir> | --fixture [--fault e5-hover] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, center, touchHold, paintDiff, f } from "./lib.mjs";

await witness("E-5", "a held touch answers through a press rung", async ({ E, T, cell, guard, idx }) => {
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
            const p1 = await touchHold(Q, sel, 350, () => snap(Q));
            // press-only: a property the touch changes to a value the hover state does not have (leaked hover paints the
            // hover value; a press rung paints its own)
            return { t: paintDiff(p0.p, p1.p), only: paintDiff(p0.p, p1.p).filter((k) => p1.p[k] !== h1.p[k]), ds: p1.s - p0.s, act: p1.act };
          } finally { await Q.close(); }
        };
        return { h: paintDiff(h0.p, h1.p), on: await touch(false), prm: await touch(true) };
      }, 90000);
      if (r.crashed) { cell(`E-5 ${sc} press ${theme}`, "FAIL", r.line); continue; }
      for (const [k, x] of [["press", r.on], ["press-light(PRM)", r.prm]]) {
        if (x.mode) { cell(`E-5 ${sc} ${k} ${theme}`, "FAIL", `MODE NOT APPLIED ${x.mode}`); continue; }
        const only = x.only;
        const pass = k === "press" ? Math.abs(x.ds) >= 0.01 || only.length > 0 : only.length > 0;
        cell(`E-5 ${sc} ${k} ${theme}`, pass ? "PASS" : "FAIL", `:active ${x.act} · Δscale ${f(x.ds)} · touch-changed [${x.t.join(", ")}] · hover-changed [${r.h.join(", ")}] · press-only [${only.join(", ")}]${k === "press" ? "" : " (bound ≥ 1 press-only property under reduce)"}${r.note ? ` · ${r.note}` : ""}`);
      }
    }
  }
});
