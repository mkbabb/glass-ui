// P-A4 probe (not a witness): a face-less member's commit seat (`::after`) filmed per frame after a programmatic
// commit: its opacity, background-color and the product (opacity × alpha), with the transition lists, to read the
// seat's envelope (CK-02/CK-10). One browser, a page per cell, closed in finally.
//   node afterfilm.mjs --build <dir> [--engine chromium|webkit] [--scenes accordion,toggle] [--prm]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const scenes = String(a.scenes ?? "accordion").split(",");
console.log(`# afterfilm engine ${E.name} load ${load()}${a.prm ? " PRM" : ""}`);
try {
  for (const sc of scenes) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, sc, { theme, prm: !!a.prm });
    try {
      await P.page.waitForTimeout(300);
      const out = await P.page.evaluate(() => new Promise((ok) => {
        const e = document.querySelector('[data-e~="target"]'); const fr = []; const t0 = performance.now();
        const al = (c) => { const m = c.match(/\/\s*([\d.]+)\)$/) ?? c.match(/rgba\([^)]*,\s*([\d.]+)\)$/); return m ? +m[1] : (c === "rgba(0, 0, 0, 0)" ? 0 : 1); };
        const pre = getComputedStyle(e, "::after"); const lists = `${pre.transitionProperty} / ${pre.transitionDuration} / delay ${pre.transitionDelay}`;
        window.__e.commit();
        const tick = () => { const t = performance.now() - t0; const b = getComputedStyle(e, "::after"); fr.push(`${t.toFixed(0)}:${(+b.opacity).toFixed(2)}×${al(b.backgroundColor).toFixed(3)}=${(+b.opacity * al(b.backgroundColor)).toFixed(3)}`); if (t < 500) requestAnimationFrame(tick); else ok({ lists, fr, st: e.getAttribute("data-state"), bg: b.backgroundColor }); };
        requestAnimationFrame(tick);
      }));
      console.log(`  REPORT ${sc} ${theme} · state ${out.st} · ::after transition ${out.lists} · ${out.fr.filter((_, i) => i % 2 === 0).join(" ")} · load ${load()}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
