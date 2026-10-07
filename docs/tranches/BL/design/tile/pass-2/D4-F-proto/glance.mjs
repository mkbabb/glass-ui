#!/usr/bin/env node
// D4-F-proto/glance.mjs · frames for the gestalt read (not a witness). Copied from ../D4-F-spec/glance.mjs; the
// row-lock is now in the source, so the injection loop is gone and every unmigrated frame shows the lock as built.
// Playwright WebKit frames cover the migrated K1/K2 and the unmigrated K1/K2.
//   node glance.mjs --build <out>/builds/f-src --dir <png dir> [--engines chromium,webkit]
// Frames: each migrated site and the unmigrated K1 and K2, light and dark, at rest; K1 migrated focused-and-selected
// and focused-unselected (the ring beside the perimeter and the mark). Row-lock: the same unmigrated scenes with
//   @layer components { .toggle-group__item:not(:has(> .toggle-group__media, > .toggle-group__meta)) { flex-direction: row !important; flex-wrap: nowrap !important } }
// injected, to read what a production row-lock would paint where the clamp alone leaves two rows inside the rung.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";
const args = parseArgs();
const dir = path.resolve(String(args.dir)); fs.mkdirSync(dir, { recursive: true });
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("d4f-proto-glance");
const target = await openTarget(args);
console.log(`D4-F glance · ${target.label} · load ${load()} at start`);
const read = () => [...document.querySelectorAll("[data-scene] [data-item]")].map((el) => { const cs = getComputedStyle(el), r = el.getBoundingClientRect();
  const kids = [...el.children].filter((c) => !c.classList.contains("sr-only") && c.getBoundingClientRect().height > 0);
  return { box: `${r.width.toFixed(1)}×${r.height.toFixed(1)}`, corner: cs.borderTopLeftRadius, dir: cs.flexDirection, rows: new Set(kids.map((c) => Math.round(c.getBoundingClientRect().top))).size,
    cut: kids.filter((c) => { const q = c.getBoundingClientRect(); return q.bottom > r.bottom + 1 || q.top < r.top - 1 || q.right > r.right + 1; }).length, ell: kids.filter((c) => c.scrollWidth > c.clientWidth + 1).length }; });
async function snap(P, name) { const host = await P.page.$("[data-scene]"); await host.screenshot({ path: path.join(dir, name) }).catch((e) => console.log(`  (no frame ${name}: ${String(e.message).split("\n")[0]})`)); }
for (const engine of engines) {
  console.log(`\n${await engineVersion(engine)} · load ${load()}`);
  for (const mode of ["light", "dark"]) for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated", "c1-migrated", "preset", "preset-verbatim", "specimen", "specimen-verbatim"]) {
    if (engine !== "chromium" && !/^(preset|specimen)(-migrated)?$/.test(scene)) continue;
    try { const P = await openPage(target, engine, scene, { mode }); await P.page.waitForTimeout(300); await snap(P, `${engine}-${scene}-${mode}.png`);
      const it = await P.page.evaluate(read); console.log(`  frame ${scene} ${mode} · #0 ${it[0].box} ${it[0].corner} ${it[0].dir}, rows ${it[0].rows}, cut ${it[0].cut}`); await P.close(); }
    catch (e) { console.log(`  FAILED ${scene} ${mode}: ${String(e.message).split("\n")[0]}`); }
  }
  for (const mode of ["light", "dark"]) for (const sel of [1, 0]) {
    try { const P = await openPage(target, engine, "preset-migrated", { mode });
      await P.page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus()); await P.page.keyboard.press(P.keys.tab);
      if (sel === 0) { await P.page.evaluate(() => window.__tile.select(3)); }
      await P.page.waitForTimeout(700); await snap(P, `${engine}-preset-migrated-${mode}-focus-${sel ? "selected" : "unselected"}.png`);
      console.log(`  frame preset-migrated ${mode} focus on ${sel ? "the selected tile" : "an unselected tile (selection moved to #3)"} · active ${await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].indexOf(document.activeElement))}`); await P.close(); }
    catch (e) { console.log(`  FAILED focus frame ${mode}: ${String(e.message).split("\n")[0]}`); }
  }
}
console.log(`\nload ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
