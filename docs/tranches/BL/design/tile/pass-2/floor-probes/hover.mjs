#!/usr/bin/env node
// floor-probes/hover.mjs · the floor seat's quick read of items 1 and 4 (SF-8, TF-8) before the full battery:
// does a pointer hover over a ToggleGroupItem return in each engine, and how much of the item's paint moves.
//   node hover.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--scenes single,preset,specimen]
//                  [--css '<rules>']   (a candidate rule injected after load, to compare hover designs on one build)
// Prints one line per engine × scene: whether mouse.move returned within 20 s, and the T-6 hover light read
// (measure.mjs hoverLight: scale pinned, ≥ 2 % of pixels moving by > 10 levels passes). Holds the harness lock.
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
import { hoverLight, unselectedIdx, tagItems } from "../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const scenes = String(args.scenes ?? "single,preset,specimen").split(",");
const lock = await acquireLock("floor-hover");
const target = await openTarget(args);
const within = (ms, f) => Promise.race([f().then((v) => ({ ok: true, v })), new Promise((r) => setTimeout(() => r({ ok: false }), ms))]);
console.log(`floor hover probe · ${target.label}${args.css ? ` · injected: ${args.css}` : ""} · load ${load()} at start`);
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of scenes) {
    for (const mode of ["light", "dark"]) {
      const P = await openPage(target, engine, scene, { mode });
      if (args.css) await P.page.addStyleTag({ content: String(args.css) });
      await tagItems(P);
      const u = await unselectedIdx(P);
      const t0 = Date.now();
      const r = await within(20000, () => hoverLight(P, u));
      const line = r.ok
        ? `returned in ${((Date.now() - t0) / 1000).toFixed(1)} s · hover light ${r.v.changedPct.toFixed(2)} % of pixels moved, p95 ${r.v.p95.toFixed(2)}:1 · ${r.v.changedPct >= 2 ? "PASS" : "FAIL"}`
        : "HUNG: no answer within 20 s";
      console.log(`  ${engine} ${scene} ${mode} #${u} · ${line} · load ${load()}`);
      await Promise.race([P.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]);
    }
  }
}
await closeBrowsers();
await target.close();
lock.release();
console.log(`load ${load()} at end`);
process.exit(0);
