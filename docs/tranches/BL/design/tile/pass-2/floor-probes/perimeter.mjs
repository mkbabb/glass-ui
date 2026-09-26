#!/usr/bin/env node
// floor-probes/perimeter.mjs · floor item 2 switched on. The floor ships the selected perimeter dormant on the pill
// (Q-10 (b): `--selection-perimeter: 0`); a route's tile rule sets it to 1. No H2 scene declares a tile at HEAD+floor,
// so this probe sets the switch the way a tile rule would, `.toggle-group__item { --selection-perimeter: 1 }`,
// and runs T-3's own measurement and verdict (measure.mjs selectedSeparation + judgeT3) on the H-3 scenes, in light,
// dark and PRT (Playwright WebKit: the forced level-0 path), in both engines. It is D′'s first check (REGISTRY
// §3.1 TF-2: does the layer survive the invalid group) read on the floor itself.
//   node perimeter.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--off]
// --off runs the same cells without the switch (the floor as shipped). Holds the harness lock.
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
import { selectedSeparation, judgeT3 } from "../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const SCENES = ["preset", "specimen", "preset-invalid", "preset-sibling", "preset-tone-translucent", "preset-tone-unresolvable", "preset-contents", "preset-verbatim", "single"];
const ON = ".toggle-group__item { --selection-perimeter: 1 }";
const lock = await acquireLock("floor-perimeter");
const target = await openTarget(args);
console.log(`floor perimeter probe · ${target.label} · switch ${args.off ? "OFF (as shipped)" : `ON (${ON})`} · load ${load()} at start`);
let pass = 0, n = 0;
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of SCENES) for (const mode of ["light", "dark", "prt"]) {
    const P = await openPage(target, engine, scene, { mode });
    if (!args.off) await P.page.addStyleTag({ content: ON });
    const m = await selectedSeparation(P);
    const j = judgeT3(m);
    const ok = P.modeOk && j.pass;
    n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${j.line}`);
    await P.close();
  }
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers();
await target.close();
lock.release();
process.exit(0);
