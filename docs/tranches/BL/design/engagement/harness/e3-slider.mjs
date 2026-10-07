#!/usr/bin/env node
// E-3 · the slider exemplar: T1 GROW sustained (W-J.2 §2.2 appendix A, unchanged bound) and L05a-16's phone arm.
//   desk  (700×500, fine) light and dark: the engaged box, pointer-held 450 ms on the thumb and keyboard-focused (Tab
//         from the sentinel, 450 ms), each ≥ ×1.03 of rest in width, sustained (read at 450 ms, not a peak).
//   phone (390×844, coarse, ?phone=1: the slider fills a 16 px-gutter column) light and dark: touch-held 450 ms
//         ≥ ×1.03, and the engaged box stays inside the gutter (left ≥ 16 px, right ≤ 374 px): an in-place grow on a
//         full-width control that runs into the gutter fails (PORTFOLIO §2.4). The touch hold is lib.mjs's
//         openTouchPage: Chromium's long-tap, WebKit's Input.dispatchTouchEvent (H-4).
//   PRM   (H-9) under reduced motion the grow retires: keyboard-focused (desk) and touch-held (phone), the engaged box
//         stays within ×1 ± 0.002 of rest. The pointer-held desk arm under reduce is E-9's slider row (press-spatial,
//         press-light), not read twice.
// The engaged box is the larger of [data-e=root] and a promoted projection [data-engage-projection] if a route
// mounts one (D5-E; HARNESS.md §1.3). [data-engaged] nodes are counted and printed.
//   node e3-slider.mjs --build <dir> | --fixture [--fault e3-gutter] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, tabKey, center, touchHold, f } from "./lib.mjs";

const BOUND = 1.03, GUTTER = 16, PRM_BAND = 0.002;
const read = (P) => P.page.evaluate(() => {
  const root = document.querySelector('[data-e~="root"]'); const proj = document.querySelector("[data-engage-projection]");
  const rr = root.getBoundingClientRect(); const pr = proj?.getBoundingClientRect();
  const box = pr && pr.width > rr.width ? pr : rr;
  return { w: box.width, l: box.left, r: box.right, vw: innerWidth, proj: !!pr, n: document.querySelectorAll("[data-engaged]").length };
});
await witness("E-3", "the slider exemplar (T1 GROW) and its phone arm", async ({ T, E, cell, guard, idx, engine }) => {
  const desk = (theme, prm) => guard(`desk ${theme}${prm ? " PRM" : ""}`, async () => {
    const P = await openPage(E, T, desk.sc, { theme, prm, vp: { width: 700, height: 500 } });
    try {
      if (prm && !P.modeOk) return { mode: P.modeLine };
      const rest = await read(P); let held = null;
      if (!prm) {
        const c = await center(P.page, '[data-e~="thumb"]');
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
        held = await read(P); await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(600);
      }
      await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
      const kbd = await read(P); const focus = await P.page.evaluate(() => document.activeElement?.getAttribute("role"));
      return { rest, held, kbd, focus };
    } finally { await P.close(); }
  });
  const phone = (sc, theme, prm) => guard(`phone ${theme}${prm ? " PRM" : ""}`, async () => {
    const P = await openTouchPage(E, T, sc, { theme, prm, vp: { width: 390, height: 844 }, q: { phone: "1" } });
    try {
      if (!P.modeOk) return { mode: P.modeLine };
      const rest = await read(P);
      const held = await touchHold(P, '[data-e~="thumb"]', 450, () => read(P));
      return { rest, held };
    } finally { await P.close(); }
  });
  for (const [sc] of scenesFor(idx, "E-3")) {
    desk.sc = sc;
    for (const theme of ["light", "dark"]) {
      const d = await desk(theme, false);
      if (d.crashed) cell(`E-3 ${sc} desk pointer-held ${theme}`, "FAIL", d.line);
      else {
        const gH = d.held.w / d.rest.w, gK = d.kbd.w / d.rest.w;
        cell(`E-3 ${sc} desk pointer-held ${theme}`, gH >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → held ${f(d.held.w, 1)} px (×${f(gH)}; [data-engaged] ${d.held.n}${d.held.proj ? "; projection" : ""}) · bound ×${BOUND} sustained at 450 ms${d.note ? ` · ${d.note}` : ""}`);
        cell(`E-3 ${sc} desk keyboard-focused ${theme}`, gK >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → focused ${f(d.kbd.w, 1)} px (×${f(gK)}; focus on ${d.focus}) · bound ×${BOUND}`);
      }
      const p = await phone(sc, theme, false);
      if (p.crashed || p.mode) cell(`E-3 ${sc} phone touch-held ${theme}`, "FAIL", p.line ?? `MODE NOT APPLIED ${p.mode}`);
      else {
        const g = p.held.w / p.rest.w;
        cell(`E-3 ${sc} phone touch-held ${theme}`, g >= BOUND ? "PASS" : "FAIL", `390×844 coarse · rest ${f(p.rest.w, 1)} px → touch-held ${f(p.held.w, 1)} px (×${f(g)}; [data-engaged] ${p.held.n}) · bound ×${BOUND}${p.note ? ` · ${p.note}` : ""}`);
        const inside = p.held.l >= GUTTER - 0.5 && p.held.r <= p.held.vw - GUTTER + 0.5;
        cell(`E-3 ${sc} phone gutter ${theme}`, inside ? "PASS" : "FAIL", `engaged box ${f(p.held.l, 1)}..${f(p.held.r, 1)} px in a ${p.held.vw} px viewport · bound ${GUTTER}..${p.held.vw - GUTTER} px`);
      }
      // H-9: the grow retires under reduced motion
      const dp = await desk(theme, true);
      if (dp.crashed || dp.mode) cell(`E-3 ${sc} keyboard-focused PRM ${theme}`, "FAIL", dp.line ?? `MODE NOT APPLIED ${dp.mode}`);
      else { const g = dp.kbd.w / dp.rest.w; cell(`E-3 ${sc} keyboard-focused PRM ${theme}`, Math.abs(g - 1) < PRM_BAND ? "PASS" : "FAIL", `reduce · rest ${f(dp.rest.w, 1)} px → focused ${f(dp.kbd.w, 1)} px (×${f(g)}; focus on ${dp.focus}) · bound ×1 ± ${PRM_BAND}`); }
      const pp = await phone(sc, theme, true);
      if (pp.crashed || pp.mode) cell(`E-3 ${sc} phone touch-held PRM ${theme}`, "FAIL", pp.line ?? `MODE NOT APPLIED ${pp.mode}`);
      else { const g = pp.held.w / pp.rest.w; cell(`E-3 ${sc} phone touch-held PRM ${theme}`, Math.abs(g - 1) < PRM_BAND ? "PASS" : "FAIL", `reduce · rest ${f(pp.rest.w, 1)} px → touch-held ${f(pp.held.w, 1)} px (×${f(g)}) · bound ×1 ± ${PRM_BAND}`); }
    }
  }
});
