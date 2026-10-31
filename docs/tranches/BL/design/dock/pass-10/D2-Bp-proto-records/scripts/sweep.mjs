// sweep.mjs (D2 pass 10, builder of D2-B′; diagnosis, enters no row): the phase sweep of the swap's retarget. It is W3's `retarget·N`
// cell verbatim (harness/w3-morph.mjs H4-5: swap&three=1, setFace("long"), setTimeout N ms, setFace("mid"), the same startLog, waitRest
// and spliceRow, blankRow, stubRow from the landed lib) with N swept over a range, and every read's retarget frame and splice logged.
// A red read keeps its per-frame seat spans, and with --trace the in-page scene trace of an instrumented build.
//   node sweep.mjs --build <dir> --adapter <file> --engine chromium|webkit [--theme dark] [--from 40 --to 200 --step 8] [--runs n] [--json out] [--keep all]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, startLog, stopLog, mark, spliceRow, blankRow, stubRow, unitInk } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const engine = args.engine ?? "chromium";
const from = Number(args.from ?? 40), to = Number(args.to ?? 200), stepMs = Number(args.step ?? 8), runs = Number(args.runs ?? 4);
const twice = args.twice ? Number(args.twice) : 0;   // --twice D: a retarget of a retarget, D ms after the first
const target = await openTarget(args);
const browser = await launch(engine);
const out = [];
const segment = (frames, name) => { const i0 = frames.findIndex((f) => f.mk === name); const fr = frames.filter((f) => f.mk === name); if (i0 > 0) fr.unshift(frames[i0 - 1]); return fr; };
const spans = (f) => (f.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.5).map((q) => [q[0], q[1], q[3], q[5], q[7], q[9]]);
try {
  const phases = []; for (let a = from; a <= to; a += stepMs) phases.push(a);
  for (let k = 0; k < runs; k++) for (const after of phases) {
    let s;
    const load = loadAvg();
    try {
      s = await openScene(browser, target, "swap", { query: { three: "1" }, theme: args.theme ?? null });
      const ax = await s.page.evaluate(() => window.__dockProbe.axis());
      if (args.trace) await s.page.evaluate(() => { window.__dockTrace = []; });
      await startLog(s.page, { seats: true, ink: true, glyphs: true }); await s.page.waitForTimeout(150);
      await mark(s.page, "r");
      await s.page.evaluate(([ms, tw]) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("mid"); if (tw) setTimeout(() => { window.__hpRetarget2 = performance.now(); window.__scene.setFace("short"); }, tw); }, ms); }, [after, twice]);
      await s.page.waitForTimeout(after + 60 + twice);
      await waitRest(s.page, { quiet: 500, cap: 7000 });
      const tR = await s.page.evaluate(() => window.__hpRetarget ?? null);
      const fr = segment(await stopLog(s.page), "r");
      const i0 = tR == null ? -1 : fr.findIndex((f) => f.t >= tR);
      const sp = spliceRow(fr, ax), bl = blankRow(i0 > 0 ? fr.slice(i0 - 1) : fr, ax), st = stubRow(fr, ax);
      const rec = { after, run: k + 1, load, i0, frames: fr.length, tR: tR == null ? null : +(tR - fr[0].t).toFixed(1), dtMed: 0, splice: { n: sp.spliceFrames, sliver: sp.sliverFrames, first: sp.firstSplice, firstSliver: sp.firstSliver }, blank: { ok: bl.ok, why: bl.why }, stub: st ? { ok: st.ok, n: st.frames ?? st.stubFrames } : null };
      if (fr.length > 2) { const d = []; for (let i = 1; i < fr.length; i++) d.push(fr[i].t - fr[i - 1].t); d.sort((x, y) => x - y); rec.dtMed = +d[d.length >> 1].toFixed(1); }
      if (!sp.ok || args.keep === "all") { rec.perFrame = fr.map((f) => ({ t: +(f.t - fr[0].t).toFixed(1), e: f.e, s: spans(f) })); }
      if (args.trace) rec.trace = await s.page.evaluate(() => window.__dockTrace);
      out.push(rec);
      console.log(`${String(after).padStart(3)} r${k + 1} frame ${i0} dt ${rec.dtMed} splice ${sp.spliceFrames}${sp.firstSplice ? " " + sp.firstSplice.units.join("|") + " gap " + sp.firstSplice.gapPx + " at " + sp.firstSplice.atMs : ""} sliver ${sp.sliverFrames} blank ${bl.ok ? "ok" : "BLANK " + bl.why} stub ${st ? st.ok : "-"} [load ${load}]`);
    } catch (e) { console.log(`${after} r${k + 1} ERROR ${String(e).split("\n")[0].slice(0, 200)} [load ${load}]`); out.push({ after, run: k + 1, load, error: String(e).slice(0, 200) }); }
    finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out));
process.exit(0);
