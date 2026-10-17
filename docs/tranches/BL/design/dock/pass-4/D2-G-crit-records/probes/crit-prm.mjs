// crit-prm.mjs (D2-G pass-4 CRITIC): C2's reduced-motion half read past the extent. CF's `c2·prm` reads only the
// extent; O-88 asks "an instant, correct state change". In glass's demo (/dock/overview, the CF dock), under
// prefers-reduced-motion: reduce, hover the collapsed dock and sample per rAF in the page: the extent, the
// data-morphing flag, and every seat's visible opacity; report how many frames / ms until every seat sits at its
// final opacity (±0.02) and the flag is down. Same read with motion on, for scale. One browser per engine, a context
// per cell, all closed in finally.
//   node crit-prm.mjs --build <dir> --adapter <a> --engine chromium|webkit --out <json>
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene } from "../../../harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine;
const SEL = "[data-testid=dock-horizontal-collapsed-first-paint]";
const t = { ...target, url: () => target.demoUrl("/dock/overview"), adapter: { ...target.adapter, rootSel: () => SEL, sidebarRootSel: SEL } };
const SAMPLE = () => {
  const P = window.__dockProbe, hp = window.__hp, root = P.root();
  const seats = [...root.querySelectorAll("button, a[href], [role=button], input")].filter((s) => !s.closest(".dock-ghosts"));
  const e = P.extent();
  return { t: performance.now(), m: root.hasAttribute("data-morphing"), posture: P.posture(), main: +(e.r - e.l).toFixed(2),
    o: seats.map((s) => +hp.visibleOpacity(s).toFixed(3)), labels: seats.map((s) => (s.getAttribute("aria-label") || s.textContent || "").trim().slice(0, 16)) };
};
const res = { engine, build: args.build, load: null, cells: [] };
const browser = await launch(engine);
try {
  for (const [name, rm] of [["prm", "reduce"], ["motion", "no-preference"]]) for (let k = 0; k < 3; k++) {
    const s = await openScene(browser, t, "sidebar", { ctx: { reducedMotion: rm }, settle: 1500 });
    try {
      await s.page.evaluate(() => window.__dockProbe.root().scrollIntoView({ block: "center" }));
      await s.page.mouse.move(2, 2); await s.page.waitForTimeout(700);
      const r0 = await s.page.evaluate(`(${SAMPLE})()`);
      const e = await s.page.evaluate(() => { const x = window.__dockProbe.extent(); return [(x.l + x.r) / 2, (x.t + x.b) / 2]; });
      await s.page.evaluate((src) => { const f = new Function(`return (${src})`)(); const rows = (window.__cr = []); let n = 0; const tick = () => { if (n++ > 120) return; rows.push(f()); requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, String(SAMPLE));
      await s.page.mouse.move(e[0], e[1]);
      await s.page.waitForTimeout(2200);
      const rows = await s.page.evaluate(() => window.__cr);
      const z = rows.at(-1);
      const i0 = rows.findIndex((r) => Math.abs(r.main - r0.main) > 0.5 || r.m || r.o.some((v, j) => Math.abs(v - (r0.o[j] ?? v)) > 0.02));
      const settledAt = (pred) => { let last = -1; rows.forEach((r, i) => { if (!pred(r)) last = i; }); return last + 1; };
      const iExt = settledAt((r) => Math.abs(r.main - z.main) <= 1);
      const iOp = settledAt((r) => r.o.length === z.o.length && r.o.every((v, j) => Math.abs(v - z.o[j]) <= 0.02));
      const iFlag = settledAt((r) => !r.m);
      const ms = (i) => (i0 < 0 || i >= rows.length) ? null : +(rows[i].t - rows[i0].t).toFixed(1);
      const midOp = rows.slice(Math.max(i0, 0), iOp).filter((r) => r.o.some((v) => v > 0.05 && v < 0.95)).length;
      res.cells.push({ cell: `${name}#${k + 1}`, rest0: r0.main, rest1: z.main, posture: z.posture, frames: rows.length, firstChange: i0,
        extentLandsFrames: i0 < 0 ? null : iExt - i0, extentLandsMs: ms(iExt), opacityLandsFrames: i0 < 0 ? null : iOp - i0, opacityLandsMs: ms(iOp), flagDownFrames: i0 < 0 ? null : iFlag - i0, flagDownMs: ms(iFlag),
        framesWithAPartialSeat: midOp, finalOpacity: z.o, labels: z.labels });
      console.log(`${engine} ${name}#${k + 1}: ${r0.main}→${z.main} px; extent lands ${i0 < 0 ? "-" : iExt - i0} fr (${ms(iExt)} ms); every seat at its final opacity ${i0 < 0 ? "-" : iOp - i0} fr (${ms(iOp)} ms); flag down ${i0 < 0 ? "-" : iFlag - i0} fr (${ms(iFlag)} ms); frames with a seat between 0.05 and 0.95: ${midOp}`);
    } finally { await s.close(); }
  }
} finally { await browser.close(); await target.close?.(); }
fs.writeFileSync(args.out, JSON.stringify(res, null, 1));
