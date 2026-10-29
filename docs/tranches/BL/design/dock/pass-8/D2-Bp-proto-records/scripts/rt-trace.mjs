// rt-trace.mjs (D2 pass 8, B′ prototype; diagnosis only, enters no row): W3's retarget·<ms> sequence, read per frame.
// Prints every seat's box and clip (main axis) and opacity on each frame from the trigger to 260 ms, and spliceRow's verdict.
// One browser, a fresh context per run, both closed in finally.   node rt-trace.mjs --build <dir> [--after 40] [--runs n]
import { parseArgs, openTarget, launch, openScene, startLog, stopLog, mark, waitRest, spliceRow, loadAvg } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs(); const after = Number(args.after ?? 40); const runs = Number(args.runs ?? 3);
const target = await openTarget(args); const browser = await launch(args.engine ?? "chromium");
try {
  for (let k = 1; k <= runs; k++) {
    const s = await openScene(browser, target, "swap", { query: { three: "1" } });
    try {
      const ax = await s.page.evaluate(() => window.__dockProbe.axis());
      await startLog(s.page, { seats: true, ink: true, glyphs: true }); await s.page.waitForTimeout(150);
      await mark(s.page, "r");
      await s.page.evaluate((ms) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("mid"); }, ms); }, after);
      await s.page.waitForTimeout(after + 60); await waitRest(s.page, { quiet: 500, cap: 7000 });
      const tR = await s.page.evaluate(() => window.__hpRetarget ?? null);
      const all = await stopLog(s.page); const i0 = all.findIndex((f) => f.mk === "r"); const fr = all.filter((f) => f.mk === "r"); if (i0 > 0) fr.unshift(all[i0 - 1]);
      const sp = spliceRow(fr, ax);
      console.log(`=== run ${k} (load ${loadAvg()}) retarget at +${(tR - fr[0].t).toFixed(1)} ms; splice ${sp.why}`);
      const M0 = ax === "y" ? 1 : 0, M1 = ax === "y" ? 3 : 2;
      for (const f of fr) { const t = f.t - fr[0].t; if (t > 260) break;
        console.log(`${t.toFixed(1).padStart(6)} ` + (f.s ?? []).filter((q) => q[9] > 0.05).map((q) => `s${q[0]} b${q[1 + M0].toFixed(1)}-${q[1 + M1].toFixed(1)} c${q[5 + M0].toFixed(1)}-${q[5 + M1].toFixed(1)}`).join(" | ")); }
    } finally { await s.close(); }
  }
} finally { await browser.close(); }
