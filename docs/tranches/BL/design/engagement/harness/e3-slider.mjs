#!/usr/bin/env node
// E-3 · the slider exemplar: T1 GROW sustained (W-J.2 §2.2 appendix A, unchanged bound) and L05a-16's phone arm.
//   desk  (700×500, fine) light and dark: the engaged box, pointer-held 450 ms on the thumb and keyboard-focused (Tab
//         from the sentinel, 450 ms), each ≥ ×1.03 of rest in width, sustained (read at 450 ms, not a peak).
//   phone (390×844, coarse, ?phone=1: the slider fills a 16 px-gutter column) light and dark: touch-held 450 ms
//         ≥ ×1.03, and the engaged box stays inside the gutter (left ≥ 16 px, right ≤ 374 px): an in-place grow on a
//         full-width control that runs into the gutter fails (PORTFOLIO §2.4). The touch hold is a long-tap gesture,
//         Chromium only; Playwright WebKit has no held-touch input, so its phone cells are UNMEASURED (H-4).
// The engaged box is the larger of [data-e=root] and a promoted projection [data-engage-projection] if a route
// mounts one (D5-E; HARNESS.md §1.3). [data-engaged] nodes are counted and printed.
//   node e3-slider.mjs --build <dir> | --fixture [--fault e3-gutter] [--engine webkit]
import { witness, openPage, scenesFor, tabKey, center, touchHold, f } from "./lib.mjs";

const BOUND = 1.03, GUTTER = 16;
const read = (P) => P.page.evaluate(() => {
  const root = document.querySelector('[data-e~="root"]'); const proj = document.querySelector("[data-engage-projection]");
  const rr = root.getBoundingClientRect(); const pr = proj?.getBoundingClientRect();
  const box = pr && pr.width > rr.width ? pr : rr;
  return { w: box.width, l: box.left, r: box.right, vw: innerWidth, proj: !!pr, n: document.querySelectorAll("[data-engaged]").length };
});
await witness("E-3", "the slider exemplar (T1 GROW) and its phone arm", async ({ T, E, cell, guard, idx, engine }) => {
  for (const [sc] of scenesFor(idx, "E-3")) {
    for (const theme of ["light", "dark"]) {
      const d = await guard(`${sc} desk`, async () => {
        const P = await openPage(E, T, sc, { theme, vp: { width: 700, height: 500 } });
        try {
          const rest = await read(P); const c = await center(P.page, '[data-e~="thumb"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
          const held = await read(P); await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(600);
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
          const kbd = await read(P); const focus = await P.page.evaluate(() => document.activeElement?.getAttribute("role"));
          return { rest, held, kbd, focus };
        } finally { await P.close(); }
      });
      if (d.crashed) { cell(`E-3 ${sc} desk pointer-held ${theme}`, "FAIL", d.line); continue; }
      const gH = d.held.w / d.rest.w, gK = d.kbd.w / d.rest.w;
      cell(`E-3 ${sc} desk pointer-held ${theme}`, gH >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → held ${f(d.held.w, 1)} px (×${f(gH)}; [data-engaged] ${d.held.n}${d.held.proj ? "; projection" : ""}) · bound ×${BOUND} sustained at 450 ms${d.note ? ` · ${d.note}` : ""}`);
      cell(`E-3 ${sc} desk keyboard-focused ${theme}`, gK >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → focused ${f(d.kbd.w, 1)} px (×${f(gK)}; focus on ${d.focus}) · bound ×${BOUND}`);
      if (engine !== "chromium") {
        cell(`E-3 ${sc} phone touch-held ${theme}`, "UNMEASURED", "Playwright WebKit has no held-touch input (a tap only); real Safari UNMEASURED (owner's safaridriver checkbox)");
        cell(`E-3 ${sc} phone gutter ${theme}`, "UNMEASURED", "as above");
        continue;
      }
      const p = await guard(`${sc} phone`, async () => {
        const P = await openPage(E, T, sc, { theme, coarse: true, vp: { width: 390, height: 844 }, q: { phone: "1" } });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          const rest = await read(P);
          const held = await touchHold(P, '[data-e~="thumb"]', 450, () => read(P));
          return { rest, held };
        } finally { await P.close(); }
      });
      if (p.crashed || p.mode) { cell(`E-3 ${sc} phone touch-held ${theme}`, "FAIL", p.line ?? `MODE NOT APPLIED ${p.mode}`); continue; }
      const g = p.held.w / p.rest.w;
      cell(`E-3 ${sc} phone touch-held ${theme}`, g >= BOUND ? "PASS" : "FAIL", `390×844 coarse · rest ${f(p.rest.w, 1)} px → touch-held ${f(p.held.w, 1)} px (×${f(g)}; [data-engaged] ${p.held.n}) · bound ×${BOUND}`);
      const inside = p.held.l >= GUTTER - 0.5 && p.held.r <= p.held.vw - GUTTER + 0.5;
      cell(`E-3 ${sc} phone gutter ${theme}`, inside ? "PASS" : "FAIL", `engaged box ${f(p.held.l, 1)}..${f(p.held.r, 1)} px in a ${p.held.vw} px viewport · bound ${GUTTER}..${p.held.vw - GUTTER} px`);
    }
  }
});
