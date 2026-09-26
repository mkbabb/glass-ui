#!/usr/bin/env node
// D4-F-block/contents-load.mjs · the full T-3 run in Playwright WebKit timed out on page.goto for `preset-contents`
// on BOTH reading builds (logs/witness-t2-t3.log, load 50.45 and 46.53). Is that the reading's `:has()` rule (a
// selector-reach defect) or load? Open `preset-contents` and `preset` N times per build and engine with a 60 s
// navigation budget, timing navigation to `load` and to the scene's ready flag; the floor-only build is the control.
//   node contents-load.mjs --builds <dirA>,<dirB>,... [--engines webkit,chromium] [--n 3]
import { parseArgs, openTarget, closeBrowsers, acquireLock, load, engineVersion, browser, VIEWPORT, DSF } from "../../harness/lib.mjs";
const args = parseArgs();
const engines = String(args.engines ?? "webkit,chromium").split(",");
const N = Number(args.n ?? 3);
const lock = await acquireLock("d4f-block-contents-load");
console.log(`preset-contents navigation · load ${load()} at start`);
for (const dir of String(args.builds).split(",")) {
  const target = await openTarget({ build: dir });
  for (const engine of engines) {
    console.log(`${target.label} · ${await engineVersion(engine)} · load ${load()}`);
    for (const scene of ["preset-contents", "preset"]) for (let k = 0; k < N; k++) {
      const ctx = await (await browser(engine)).newContext({ viewport: VIEWPORT, deviceScaleFactor: DSF });
      const page = await ctx.newPage();
      const t0 = Date.now(); let tLoad = null, tReady = null, err = null;
      try {
        await page.goto(target.url(`scene=${scene}`), { waitUntil: "load", timeout: 60000 }); tLoad = Date.now() - t0;
        await page.waitForFunction(() => window.__tile && window.__tile.ready === true, null, { timeout: 60000 }); tReady = Date.now() - t0;
      } catch (e) { err = String(e.message).split("\n")[0]; }
      const cells = err ? "" : await page.evaluate(() => [...document.querySelectorAll("[data-item]")].map((e) => getComputedStyle(e).borderTopLeftRadius).join(","));
      console.log(`  ${err ? "ERROR" : "ok"} ${scene} #${k + 1}: load ${tLoad ?? "—"} ms, ready ${tReady ?? "—"} ms${err ? " · " + err : ""} · corners [${cells}] · load avg ${load()}`);
      await ctx.close();
    }
  }
  await target.close();
}
console.log(`load ${load()} at end`);
await closeBrowsers(); lock.release(); process.exit(0);
