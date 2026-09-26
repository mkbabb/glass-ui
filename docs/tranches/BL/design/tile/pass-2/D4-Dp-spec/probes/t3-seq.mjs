#!/usr/bin/env node
// D4-D′ spec probe · T-3's own cell loop (t3Cells) over a chosen scene list and mode list, one page per cell, with a
// per-cell deadline, to find the cell after which Playwright WebKit stops loading pages (the T-3 HARNESS ERROR).
//   node t3-seq.mjs --build <dir> --engine webkit --scenes a,b --modes light,dark,prt,forced
import { parseArgs, openTarget, closeBrowsers, acquireLock, load, within } from "../../../harness/lib.mjs";
import { t3Cells } from "../../../harness/t3-selected-separates.mjs";
const args = parseArgs();
const lock = await acquireLock("dp-spec-t3seq");
const target = await openTarget(args);
const engine = String(args.engine ?? "webkit");
console.log(`t3-seq · ${target.label} · ${engine} · load ${load()}`);
for (const id of String(args.scenes).split(",")) for (const mode of String(args.modes ?? "light,dark,prt,forced").split(",")) {
  const t0 = Date.now();
  const r = await within(60000, () => t3Cells(target, engine, [{ id, gating: true, arm: "library" }], { modes: [mode], fill: false }));
  console.log(`  ${id} ${mode} · ${r.ok ? r.value.map((c) => (c.pass ? "PASS " : "FAIL ") + c.line).join(" | ").slice(0, 200) : "ERROR " + r.error} · ${((Date.now() - t0) / 1000).toFixed(1)} s · load ${load()}`);
}
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
