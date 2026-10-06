#!/usr/bin/env node
// E-9 · the PRM arm (W-J.2's former G5, `PLAN.md:251`; H-9): under prefers-reduced-motion every rung retires its
// spatial legs and keeps a light answer. Per scene gated "E-9", light and dark, reduced motion verified:
//   press-spatial   the mouse over the control 300 ms (the hover state H), then pointer down, sampled every frame for
//                   300 ms: the pressed element's scale range < 0.002 (the press point is [data-e=thumb] when the
//                   scene has one, else [data-e=target]; the read is [data-e=target])
//   press-light     the paint properties that differ between H and the pressed state (a press-only light answer):
//                   ≥ 1 (background, shadow, colour, border, outline, filter, the pseudo-elements, the first
//                   descendant layers)
//   commit-spatial  Tab in from the sentinel, the scene's key, sampled 600 ms: the target's scale in flight
//                   (≥ 0.002 from both its first and its last frame) on ≤ 1 frame, and the body ([data-e=body]) in
//                   flight (> 1 px from both its start and its landing) on ≤ 1 frame: a state change lands (a new
//                   resting scale may jump), it does not glide or pop
//   node e9-prm.mjs --build <dir> | --fixture [--fault e9-scale|e9-dark|e9-glide] [--engine webkit]
import { witness, openPage, scenesFor, center, quiet, paintDiff, tabKey, f, BOUNCE } from "./lib.mjs";

await witness("E-9", "the PRM arm", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-9")) {
    for (const theme of ["light", "dark"]) {
      const r = await guard(`${sc} ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme, prm: true });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          const at = (await P.page.$('[data-e~="thumb"]')) ? '[data-e~="thumb"]' : '[data-e~="target"]';
          const c = await center(P.page, at);
          await P.page.mouse.move(c.x, c.y); await P.page.waitForTimeout(300);
          const h = await P.page.evaluate(() => window.__paint('[data-e~="target"]'));
          const hs = await P.page.evaluate(() => window.__paint('[data-e~="thumb"]'));
          const pr = P.page.evaluate(() => window.__sample('[data-e~="target"]', null, 300));
          await P.page.mouse.down(); const fr = await pr;
          const p = await P.page.evaluate(() => window.__paint('[data-e~="target"]'));
          const ps = await P.page.evaluate(() => window.__paint('[data-e~="thumb"]'));
          await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(400);
          const light = [...paintDiff(h, p), ...paintDiff(hs, ps).map((k) => `thumb ${k}`)];
          let commit = null;
          if (m.key) {
            const Q = await openPage(E, T, sc, { theme, prm: true });
            try {
              await Q.page.focus('[data-sentinel="before"]'); await Q.page.keyboard.press(tabKey(engine)); await Q.page.waitForTimeout(200);
              const pr2 = Q.page.evaluate(() => window.__sample('[data-e~="target"]', '[data-e~="body"]', 600));
              await Q.page.keyboard.press(m.key); commit = quiet(await pr2);
            } finally { await Q.close(); }
          }
          return { press: quiet(fr), light, commit };
        } finally { await P.close(); }
      }, 60000);
      const nm = (c) => `E-9 ${sc} ${c} ${theme}`;
      if (r.crashed || r.mode) { cell(nm("press-spatial"), "FAIL", r.line ?? `MODE NOT APPLIED ${r.mode}`); continue; }
      cell(nm("press-spatial"), r.press.range < BOUNCE ? "PASS" : "FAIL", `scale range while pressed ${f(r.press.range)} over ${r.press.frames} frames (bound < ${BOUNCE})${r.note ? ` · ${r.note}` : ""}`);
      cell(nm("press-light"), r.light.length ? "PASS" : "FAIL", `press-only paint changes [${r.light.join(", ").slice(0, 200)}] (bound ≥ 1)`);
      if (r.commit) cell(nm("commit-spatial"), r.commit.smid <= 1 && r.commit.mid <= 1 ? "PASS" : "FAIL", `commit(${m.key}): scale range ${f(r.commit.range)} with ${r.commit.smid} frame(s) in flight · body moved ${f(r.commit.moved, 2)} px with ${r.commit.mid} frame(s) in flight (bound ≤ 1 frame each) · ${r.commit.frames} frames`);
    }
  }
});
