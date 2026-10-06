#!/usr/bin/env node
// E-5 · a held touch answers through a press rung, not leaked hover (W-I.3's touch rows, `W-I.3.md:61`).
// Per scene gated "E-5", light and dark:
//   hover-only set   fine pointer, the mouse over the control 500 ms, no press: the paint properties that change
//   touch set        coarse context (hasTouch + isMobile, verified (hover: none) and (pointer: coarse)), a long-tap
//                    gesture held 350 ms (Chromium Input.synthesizeTapGesture: the only headless input that sets
//                    `:active` under touch; it also sets a sticky `:hover`, PORTFOLIO §1.3 item 8)
//   PASS when |Δscale| ≥ 0.01 under the touch, or ≥ 1 paint property changes under the touch that hover alone does
//   not change (the press-only set). A control whose only touch answer is its hover paint FAILS.
// Playwright WebKit has no held-touch input (Playwright's touchscreen taps only): its cells are UNMEASURED (H-4).
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e5-touch.mjs --build <dir> | --fixture [--fault e5-hover] [--engine webkit]
import { witness, openPage, scenesFor, center, touchHold, paintDiff, f } from "./lib.mjs";

await witness("E-5", "a held touch answers through a press rung", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-5")) {
    const sel = m.touch ?? '[data-e~="target"]';
    for (const theme of ["light", "dark"]) {
      if (engine !== "chromium") { cell(`E-5 ${sc} press ${theme}`, "UNMEASURED", "Playwright WebKit has no held-touch input (H-4); real Safari UNMEASURED (owner's safaridriver checkbox)"); continue; }
      const r = await guard(`${sc} ${theme}`, async () => {
        const snap = (P) => P.page.evaluate((s) => { const e = document.querySelector(s); return { p: window.__paint(s), s: window.__eff(e).s, act: e.matches(":active") }; }, sel);
        let P = await openPage(E, T, sc, { theme });
        let h0, h1;
        try {
          await P.page.waitForTimeout(250); const c = await center(P.page, sel); h0 = await snap(P);
          await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(500); h1 = await snap(P);
        } finally { await P.close(); }
        P = await openPage(E, T, sc, { theme, coarse: true });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          await P.page.waitForTimeout(250); const p0 = await snap(P);
          const p1 = await touchHold(P, sel, 350, () => snap(P));
          return { h: paintDiff(h0.p, h1.p), t: paintDiff(p0.p, p1.p), ds: p1.s - p0.s, act: p1.act };
        } finally { await P.close(); }
      }, 60000);
      if (r.crashed || r.mode) { cell(`E-5 ${sc} press ${theme}`, "FAIL", r.line ?? `MODE NOT APPLIED ${r.mode}`); continue; }
      const only = r.t.filter((k) => !r.h.includes(k));
      const pass = Math.abs(r.ds) >= 0.01 || only.length > 0;
      cell(`E-5 ${sc} press ${theme}`, pass ? "PASS" : "FAIL", `:active ${r.act} · Δscale ${f(r.ds)} · touch-changed [${r.t.join(", ")}] · hover-changed [${r.h.join(", ")}] · press-only [${only.join(", ")}]${r.note ? ` · ${r.note}` : ""}`);
    }
  }
});
