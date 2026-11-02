// swrev.mjs (D2 pass 11, fresh critic of D2-B′, §P10-7.4 "the retarget class at phases its predecessors did not sweep,
// including a retarget during a reversal"; a reading, enters no row). The pass-10 builder's sweep.mjs (itself W3's
// `retarget·N` cell: swap&three=1, setFace("long"), N ms later setFace("mid"), the landed startLog, spliceRow, blankRow,
// stubRow) with the swap REVERSED first: setFace("long"), N ms later setFace("short") (the face that is leaving comes back:
// a reversal of the exchange), and with --then D, D ms after the reversal setFace("mid") (a retarget during the reversal).
// --then 0 reads the bare reversal. The landed harness is not edited.
//   node swrev.mjs --build <dir> --adapter <file> --engine chromium|webkit [--theme dark] --at 40,60,… --then 0,16,… [--runs n] [--json out]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, startLog, stopLog, mark, spliceRow, blankRow, stubRow } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const engine = args.engine ?? "chromium", runs = Number(args.runs ?? 2);
const AT = String(args.at ?? "40,60,80,100,120").split(",").map(Number), THEN = String(args.then ?? "0,16,32,64").split(",").map(Number);
const target = await openTarget(args);
const browser = await launch(engine);
const out = [];
const segment = (frames, name) => { const i0 = frames.findIndex((f) => f.mk === name); const fr = frames.filter((f) => f.mk === name); if (i0 > 0) fr.unshift(frames[i0 - 1]); return fr; };
const spans = (f) => (f.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.5).map((q) => [q[0], q[1], q[3], q[5], q[7], q[9]]);
try {
  for (let k = 0; k < runs; k++) for (const after of AT) for (const then of THEN) {
    let s; const load = loadAvg();
    try {
      s = await openScene(browser, target, "swap", { query: { three: "1" }, theme: args.theme ?? null });
      const ax = await s.page.evaluate(() => window.__dockProbe.axis());
      await startLog(s.page, { seats: true, ink: true, glyphs: true }); await s.page.waitForTimeout(150);
      await mark(s.page, "r");
      await s.page.evaluate(([ms, tw]) => { window.__scene.setFace("long"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__scene.setFace("short"); if (tw) setTimeout(() => { window.__hpRetarget2 = performance.now(); window.__scene.setFace("mid"); }, tw); }, ms); }, [after, then]);
      await s.page.waitForTimeout(after + 60 + then);
      await waitRest(s.page, { quiet: 500, cap: 7000 });
      const [tR, tR2] = await s.page.evaluate(() => [window.__hpRetarget ?? null, window.__hpRetarget2 ?? null]);
      const fr = segment(await stopLog(s.page), "r");
      const i0 = tR == null ? -1 : fr.findIndex((f) => f.t >= tR);
      // the blank floor names the entering face by the strip's last frame, so it is read from the LAST command's frame (with a
      // retarget after the reversal, the face that ends is not asked for until then; read from the reversal it would be blank
      // by construction)
      const i2 = tR2 == null ? -1 : fr.findIndex((f) => f.t >= tR2); const ib = i2 > 0 ? i2 : i0;
      const sp = spliceRow(fr, ax), bl = blankRow(ib > 0 ? fr.slice(ib - 1) : fr, ax), st = stubRow(fr, ax);
      const face = await s.page.evaluate(() => document.querySelector('[data-testid="dock"]')?.textContent?.replace(/\s+/g, " ").trim().slice(0, 60));
      const rec = { after, then, run: k + 1, load, i0, i2, frames: fr.length, tR: tR == null ? null : +(tR - fr[0].t).toFixed(1), tR2: tR2 == null ? null : +(tR2 - fr[0].t).toFixed(1), splice: { n: sp.spliceFrames, sliver: sp.sliverFrames, first: sp.firstSplice, firstSliver: sp.firstSliver }, blank: { ok: bl.ok, why: bl.why }, stub: st ? { ok: st.ok, n: st.stubFrames, first: st.first } : null, face };
      if (!sp.ok || (st && !st.ok) || !bl.ok) rec.perFrame = fr.map((f) => ({ t: +(f.t - fr[0].t).toFixed(1), e: f.e, s: spans(f) }));
      out.push(rec);
      console.log(`rev ${String(after).padStart(3)} then ${String(then).padStart(2)} r${k + 1} frame ${i0} splice ${sp.spliceFrames}${sp.firstSplice ? " " + sp.firstSplice.units.join("|") + " gap " + sp.firstSplice.gapPx + " at " + sp.firstSplice.atMs : ""} sliver ${sp.sliverFrames} blank ${bl.ok ? "ok" : "BLANK " + bl.why} stub ${st ? st.ok : "-"}${st && !st.ok && st.first ? ` ("${st.first.ch}" ${Math.round(st.first.frac * 100)} % at ${st.first.edgePx} px, +${st.first.atMs} ms)` : ""} [load ${load}]`);
    } catch (e) { console.log(`rev ${after} then ${then} r${k + 1} ERROR ${String(e).split("\n")[0].slice(0, 200)} [load ${load}]`); out.push({ after, then, run: k + 1, load, error: String(e).slice(0, 200) }); }
    finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out));
process.exit(0);
