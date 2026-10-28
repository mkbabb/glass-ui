#!/usr/bin/env node
// P-E6 probe (not a witness): the control for slider-press.mjs's Chromium "+25 held false" reads (CK-06 latency). It
// separates the driver's latency from the library's. The page records, on its own clock (performance.now), the first
// touchstart and pointerdown that reach the slider root (capture listeners on window), and the moment the root takes
// `data-held` (a MutationObserver on the root's attributes). Each read at +25..+200 ms also returns the page clock.
//   library latency = held − first touch event (what useHold adds)
//   driver latency  ≈ the node-side read time − (page read time − first touch event): how long after the node sent the
//                     touch the page saw it (Chromium: Input.synthesizeTapGesture is sent without waiting; WebKit: the raw
//                     driver awaits touchStart before the clock starts, lib.mjs openTouchPage)
// (Chromium run 21:46 printed `held <page time>` in its reads: the record's field shadowed the read's boolean; renamed heldAt
// after it, no number changed.) REPORT cells only; the reading goes into P-E6.md. Same drive and scene as slider-press.mjs (one browser, a context
// per cell, every page/context/browser closed in finally through the harness's witness wrapper).
//   node slider-press-ctl.mjs --build <out>/builds/<arm> --engine chromium|webkit
import { witness, openTouchPage, center, f } from "../../../harness/lib.mjs";
const AT = [25, 50, 100, 200];
const REPS = 3;
await witness("P-E6 slider-press-ctl", "driver latency against library latency on the slider's touch press (CK-06)", async ({ E, T, cell, guard }) => {
  for (const theme of ["light", "dark"]) for (let k = 1; k <= REPS; k++) {
    const name = `slider touch press ctl ${theme} #${k}`;
    const r = await guard(name, async () => {
      const Q = await openTouchPage(E, T, "slider", { theme });
      try {
        await Q.page.evaluate(() => {
          const root = document.querySelector('[data-e~="root"]');
          const rec = (window.__ctl = { ts: NaN, pd: NaN, heldAt: NaN });
          window.addEventListener("touchstart", () => { if (Number.isNaN(rec.ts)) rec.ts = performance.now(); }, { capture: true, passive: true });
          window.addEventListener("pointerdown", () => { if (Number.isNaN(rec.pd)) rec.pd = performance.now(); }, { capture: true });
          new MutationObserver(() => { if (Number.isNaN(rec.heldAt) && root.hasAttribute("data-held")) rec.heldAt = performance.now(); }).observe(root, { attributes: true, attributeFilter: ["data-held"] });
        });
        const c = await center(Q.page, '[data-e~="thumb"]');
        const xs = await Q.holdAt(c.x, c.y, AT, async (ms) => ({ ms, ...(await Q.page.evaluate(() => ({ now: performance.now(), held: !!document.querySelector('[data-e~="root"]')?.hasAttribute("data-held"), ...window.__ctl }))) }));
        return { mode: Q.modeLine, xs };
      } finally { await Q.close(); }
    });
    if (r.crashed) { cell(name, "UNMEASURED", r.line); continue; }
    const x0 = r.xs[0]; const last = r.xs[r.xs.length - 1];
    const first = Math.min(...[last.ts, last.pd].filter((v) => !Number.isNaN(v)));
    const lib = last.heldAt - first;
    const drv = x0.ms - (x0.now - first);
    cell(name, "REPORT", `${r.mode} · first touch event ${Number.isNaN(last.ts) ? "touchstart none" : "touchstart"} / ${Number.isNaN(last.pd) ? "pointerdown none" : "pointerdown"} · library latency (held − first event) ${f(lib, 1)} ms · driver latency (send → first event) ≈ ${f(drv, 1)} ms · reads ${r.xs.map((x) => `+${x.ms} held ${x.held}`).join(" · ")}`);
  }
});
