#!/usr/bin/env node
// floor-probes/chip-guard.mjs · floor item 5's E-11 guard in what a consumer runs: open the `chipcell` scene
// (`<Chip shape="cell">`, the retired binding) and print every console error and page error, and the chips' corner.
//   node chip-guard.mjs --build <out>/builds/<label> [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
const args = parseArgs();
const lock = await acquireLock("floor-chip-guard");
const target = await openTarget(args);
console.log(`chip guard probe · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
for (const engine of String(args.engines ?? "chromium,webkit").split(",")) {
  const P = await openPage(target, engine, "chipcell");
  await P.page.waitForTimeout(300);
  const chips = await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].map((e) => getComputedStyle(e).borderTopLeftRadius));
  const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").map((l) => l.text.split("\n")[0]);
  console.log(`  ${await engineVersion(engine)} · ${chips.length} chips, corner ${[...new Set(chips)].join(",")} · ${errs.length} error(s): ${[...new Set(errs)].join(" | ")}`);
  await P.close();
}
await closeBrowsers(); await target.close(); lock.release();
console.log(`load ${load()} at end`); process.exit(0);
