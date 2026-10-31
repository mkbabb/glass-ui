// phase2.mjs (D2 pass 10, fresh critic of D2-B′; a reading, enters no row): the phases BESIDE the swap retarget.
// The landed lib's spliceRow, blankRow and stubRow read every run, as sweep.mjs reads the swap (pass-10 builder's script,
// itself W3's retarget·N cell with N swept). The landed harness is not edited.
//   mode rev-c   expanded → collapse(), and at FRAC of the travel expand() (W3 `reversal` is rev-c at 0.35)
//   mode rev-e   collapsed → expand(), and at FRAC of the travel collapse()
//   mode lead-rm expanded with a lead → setLead(false), and N ms later setLead(true) (lead-remove reversed)
//   mode lead-ad expanded, no lead → setLead(true), and N ms later setLead(false)
//   scene morph (x) or vmorph (y)
//   node phase2.mjs --build <dir> --adapter <file> --engine chromium|webkit [--theme dark] --scene morph|vmorph --mode <m>
//        --points a,b,c … [--runs n] [--json out]
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene, waitRest, loadAvg, startLog, stopLog, mark, spliceRow, blankRow, stubRow } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs();
const engine = args.engine ?? "chromium";
const scene = args.scene ?? "morph", mode = args.mode ?? "rev-c", runs = Number(args.runs ?? 2);
const points = String(args.points).split(",").map(Number);
const target = await openTarget(args);
const browser = await launch(engine);
const out = [];
const segment = (frames, name) => { const i0 = frames.findIndex((f) => f.mk === name); const fr = frames.filter((f) => f.mk === name || f.mk === name + "-back"); if (i0 > 0) fr.unshift(frames[i0 - 1]); return fr; };
try {
  for (let k = 0; k < runs; k++) for (const p of points) {
    let s; const load = loadAvg();
    try {
      s = await openScene(browser, target, scene, { theme: args.theme ?? null });
      const ax = await s.page.evaluate(() => window.__dockProbe.axis());
      // the travel: the scene opens collapsed; its rested length there and expanded give the reversal's goal
      const len = () => s.page.evaluate(() => { const P = window.__dockProbe, e = P.extent(); return P.axis() === "y" ? e.b - e.t : e.r - e.l; });
      const Lc = await len();
      const pre = mode === "rev-e" ? [["expand"], ["collapse"]] : mode === "lead-rm" ? [["expand"], ["setLead", true]] : [["expand"]];
      let Le = null;
      for (const [f, v] of pre) { await s.page.evaluate(([f, v]) => window.__scene[f](v), [f, v]); await waitRest(s.page, { quiet: 500, cap: 7000 }); await s.page.waitForTimeout(300); if (f === "expand") Le = await len(); }
      await s.page.evaluate((g) => { window.__hpGoal = g; }, Math.abs(Le - Lc));
      await startLog(s.page, { seats: true, ink: true, glyphs: true }); await s.page.waitForTimeout(150);
      await mark(s.page, "r");
      let r;
      if (mode === "rev-c" || mode === "rev-e") {
        r = await s.page.evaluate(([frac, mode]) => new Promise((res) => {
          const P = window.__dockProbe, ax = P.axis();
          const len = () => { const e = P.extent(); return ax === "y" ? e.b - e.t : e.r - e.l; };
          const L0 = len(); if (mode === "rev-c") window.__scene.collapse(); else window.__scene.expand();
          const t0 = performance.now(); let Lmax = 0;
          // the far end is unknown before the travel: read the travel against the rested extents of the other posture
          const goal = window.__hpGoal;
          const tick = () => { const d = Math.abs(len() - L0); Lmax = Math.max(Lmax, d); if (goal != null && d >= frac * goal) { window.__hpLog.mark = "r-back"; window.__hpRetarget = performance.now(); if (mode === "rev-c") window.__scene.expand(); else window.__scene.collapse(); res({ ok: true, L0, at: len() }); } else if (performance.now() - t0 > 3000) res({ ok: false, L0, at: len(), Lmax }); else requestAnimationFrame(tick); };
          requestAnimationFrame(tick);
        }), [p, mode]);
      } else {
        r = await s.page.evaluate(([ms, mode]) => { window.__scene.setLead(mode !== "lead-rm"); setTimeout(() => { window.__hpRetarget = performance.now(); window.__hpLog.mark = "r-back"; window.__scene.setLead(mode === "lead-rm"); }, ms); return { ok: true }; }, [p, mode]);
        await s.page.waitForTimeout(p + 60);
      }
      await waitRest(s.page, { quiet: 500, cap: 7000 });
      const tR = await s.page.evaluate(() => window.__hpRetarget ?? null);
      const fr = segment(await stopLog(s.page), "r");
      const i0 = tR == null ? -1 : fr.findIndex((f) => f.t >= tR);
      const sp = spliceRow(fr, ax), bl = blankRow(i0 > 0 ? fr.slice(i0 - 1) : fr, ax), st = stubRow(fr, ax);
      const rec = { scene, mode, p, run: k + 1, load, rv: r, i0, frames: fr.length, tR: tR == null ? null : +(tR - fr[0].t).toFixed(1), splice: { n: sp.spliceFrames, sliver: sp.sliverFrames, first: sp.firstSplice, firstSliver: sp.firstSliver, why: sp.why }, blank: { ok: bl.ok, why: bl.why }, stub: st ? { ok: st.ok, why: st.why } : null };
      if (!sp.ok) { const fr0 = fr[0].t; rec.perFrame = fr.map((f) => ({ t: +(f.t - fr0).toFixed(1), mk: f.mk, e: f.e, s: (f.s ?? []).filter((q) => q[9] > 0.05 && q[7] - q[5] > 0.5 && q[8] - q[6] > 0.5).map((q) => [q[0], ...q.slice(1, 11).map((x) => +(+x).toFixed(2))]) })); }
      out.push(rec);
      console.log(`${scene} ${mode} ${p} r${k + 1} ${r && r.ok === false ? "NOT-REACHED " : ""}frame ${i0} splice ${sp.spliceFrames}${sp.firstSplice ? " " + sp.firstSplice.units.join("|") + " gap " + sp.firstSplice.gapPx + " at " + sp.firstSplice.atMs : ""} sliver ${sp.sliverFrames} blank ${bl.ok ? "ok" : "BLANK " + bl.why} stub ${st ? st.ok : "-"} [load ${load}]`);
    } catch (e) { console.log(`${scene} ${mode} ${p} r${k + 1} ERROR ${String(e).split("\n")[0].slice(0, 200)} [load ${load}]`); out.push({ scene, mode, p, run: k + 1, load, error: String(e).slice(0, 200) }); }
    finally { await s?.close().catch(() => {}); }
  }
} finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
if (args.json) fs.writeFileSync(args.json, JSON.stringify(out));
process.exit(0);
