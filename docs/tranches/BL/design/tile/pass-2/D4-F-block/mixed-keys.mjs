#!/usr/bin/env node
// D4-F-block/mixed-keys.mjs · the rects behind idiom9.mjs's mixed-group ArrowDown read, and every arrow from every
// item, on preset-migrated with `#meta` removed from items 1 and 3 (a pill beside a cell in each grid row), and on
// the unmixed preset-migrated (all cells) as the control. Reading-2 build. Holds the harness lock; prints the load.
//   node mixed-keys.mjs --build <out>/builds/r2-src [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("d4f-block-mixed-keys");
const target = await openTarget(args);
console.log(`mixed-group keys · ${target.label} · load ${load()} at start`);
for (const engine of engines) {
  console.log(`\n${await engineVersion(engine)} · load ${load()}`);
  for (const mixed of [false, true]) {
    const walks = [];
    let rects = "";
    for (let from = 0; from < 4; from++) for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
      const P = await openPage(target, engine, "preset-migrated");
      rects = await P.page.evaluate(async (mixed) => {
        const its = [...document.querySelectorAll("[data-item]")];
        if (mixed) for (const i of [1, 3]) its[i].querySelector(".toggle-group__meta")?.remove();
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        return its.map((e, i) => { const r = e.getBoundingClientRect(); return `#${i} x${r.x.toFixed(0)} y${r.y.toFixed(1)} ${r.width.toFixed(0)}×${r.height.toFixed(1)}`; }).join(" | ");
      }, mixed);
      await P.page.evaluate((i) => document.querySelectorAll("[data-item]")[i].focus(), from);
      await P.page.keyboard.press(key);
      const to = await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].indexOf(document.activeElement));
      walks.push(`${from}${key.replace("Arrow", "")[0]}→${to}`);
      await P.close();
    }
    console.log(`  ${mixed ? "MIXED (items 1, 3 pills)" : "ALL CELLS (control)"} · rects ${rects}\n    ${walks.join(" ")}`);
  }
}
console.log(`\nload ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
