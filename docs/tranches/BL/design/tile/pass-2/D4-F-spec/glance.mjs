#!/usr/bin/env node
// D4-F-spec/glance.mjs · frames for the gestalt read (not a witness), and the row-lock option read (§5 R-1).
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
const lock = await acquireLock("d4f-spec-glance");
const target = await openTarget(args);
console.log(`D4-F glance · ${target.label} · load ${load()} at start`);
const LOCK = `@layer components { .toggle-group:not(:has(.toggle-group__media, .toggle-group__meta)) .toggle-group__item { flex-direction: row !important; flex-wrap: nowrap !important; } }`;
const read = () => [...document.querySelectorAll("[data-scene] [data-item]")].map((el) => { const cs = getComputedStyle(el), r = el.getBoundingClientRect();
  const kids = [...el.children].filter((c) => !c.classList.contains("sr-only") && c.getBoundingClientRect().height > 0);
  return { box: `${r.width.toFixed(1)}×${r.height.toFixed(1)}`, corner: cs.borderTopLeftRadius, dir: cs.flexDirection, rows: new Set(kids.map((c) => Math.round(c.getBoundingClientRect().top))).size,
    cut: kids.filter((c) => { const q = c.getBoundingClientRect(); return q.bottom > r.bottom + 1 || q.top < r.top - 1 || q.right > r.right + 1; }).length, ell: kids.filter((c) => c.scrollWidth > c.clientWidth + 1).length }; });
async function snap(P, name) { const host = await P.page.$("[data-scene]"); await host.screenshot({ path: path.join(dir, name) }).catch((e) => console.log(`  (no frame ${name}: ${String(e.message).split("\n")[0]})`)); }
for (const engine of engines) {
  console.log(`\n${await engineVersion(engine)} · load ${load()}`);
  for (const mode of ["light", "dark"]) for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated", "c1-migrated", "preset", "preset-verbatim", "specimen", "specimen-verbatim"]) {
    if (engine !== "chromium" && !/^(preset|specimen)-migrated$/.test(scene)) continue;
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
  for (const scene of ["preset", "preset-verbatim", "specimen", "specimen-verbatim", "family-d-undeclared", "pill-icon", "pill-badge", "single", "vertical", "c1-migrated", "preset-migrated", "specimen-migrated"]) {
    try { const P = await openPage(target, engine, scene);
      const before = await P.page.evaluate(read);
      await P.page.addStyleTag({ content: LOCK }); await P.page.waitForTimeout(300);
      const after = await P.page.evaluate(read);
      if (engine === "chromium" && /^(preset|specimen)/.test(scene) && !/migrated/.test(scene)) await snap(P, `${engine}-${scene}-rowlock.png`);
      const f = (x) => `${x.box} ${x.corner} ${x.dir}, rows ${x.rows}, cut ${x.cut}, ellipsized ${x.ell}`;
      console.log(`  ROW-LOCK ${scene} · clamp alone #0 ${f(before[0])} → with the lock #0 ${f(after[0])} · items with two rows ${before.filter((x) => x.rows > 1).length}/${before.length} → ${after.filter((x) => x.rows > 1).length}/${after.length}`); await P.close(); }
    catch (e) { console.log(`  FAILED row-lock ${scene}: ${String(e.message).split("\n")[0]}`); }
  }
}
console.log(`\nload ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
