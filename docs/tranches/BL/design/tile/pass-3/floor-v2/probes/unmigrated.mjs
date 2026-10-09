#!/usr/bin/env node
// floor-v2/probes/unmigrated.mjs · what the floor's one-row law does to the consumer's two-row tiles before any
// route declares them tiles (R-1's class). Per scene, item 0: its box, its rows (lib `rows()`, the midpoint chain)
// and the content the plate cuts (lib `cut()`, H3-3), in both engines. Reported, not gated: the floor ships no
// tile, so a two-row consumer item is a pill here by construction, and a route's tile rule is what turns it back.
//   node unmigrated.mjs --build <out>/builds/<label> [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, f2 } from "../../../harness/lib.mjs";
import { tagItems } from "../../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const SCENES = ["preset", "preset-verbatim", "specimen", "specimen-verbatim", "family-d-undeclared"];
const lock = await acquireLock("floor-v2-unmigrated");
const target = await openTarget(args);
console.log(`floor-v2 unmigrated probe · ${target.label} · load ${load()} at start`);
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of SCENES) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    await tagItems(P);
    const r = await P.page.evaluate(() => {
      const th = window.__th, el = document.querySelector('[data-th-idx="0"]');
      const b = el.getBoundingClientRect();
      return { w: b.width, h: b.height, rows: th.rows(el), cut: th.cut(el), text: el.textContent.replace(/\s+/g, " ").trim().slice(0, 40) };
    });
    console.log(`  ${engine} ${scene} #0 «${r.text}» · ${f2(r.w)}×${f2(r.h)} · ${r.rows} row(s) · ${r.cut.n ? `CUT ${r.cut.n} box(es), up to ${f2(r.cut.worst)} px` : "nothing cut"}`);
    await P.close();
  }
}
console.log(`load ${load()} at end`);
await closeBrowsers();
await target.close();
lock.release();
process.exit(0);
