#!/usr/bin/env node
// D4-F-block/t3-narrow.mjs · T-3's own measurement and verdict (measure.mjs selectedSeparation + judgeT3) on the
// scenes question 1 classifies, in light, dark and PRT (Playwright WebKit: the forced level-0 path). It exists
// because the full T-3 run in Playwright WebKit hit a page.goto timeout under load 50-66 on both reading builds
// (logs/witness-t2-t3.log); this reads the cells that bear on discrimination only, one page per cell.
//   node t3-narrow.mjs --build <dir> --scenes a,b,c [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
import { selectedSeparation, judgeT3 } from "../../harness/measure.mjs";
const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const scenes = String(args.scenes).split(",");
const lock = await acquireLock("d4f-block-t3-narrow");
const target = await openTarget(args);
console.log(`T-3 narrow · ${target.label} · load ${load()} at start`);
let pass = 0, n = 0;
for (const engine of engines) {
  console.log(`${await engineVersion(engine)} · load ${load()}`);
  for (const scene of scenes) for (const mode of ["light", "dark", "prt"]) {
    let P, m, tries = 0;
    for (;;) { try { P = await openPage(target, engine, scene, { mode }); m = await selectedSeparation(P); break; }
      catch (e) { await P?.close().catch(() => {}); if (++tries > 2) throw e; console.log(`  retry ${scene} ${mode} after: ${String(e.message).split("\n")[0]} · load ${load()}`); } }
    const j = judgeT3(m), ok = P.modeOk && j.pass;
    n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${j.line}`);
    await P.close();
  }
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
