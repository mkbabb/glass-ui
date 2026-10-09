#!/usr/bin/env node
// D4-Dp-crit/probes/fact-split.mjs · does "is a tile" have one spelling under D′?
// D′ spells the tile twice: `[data-shape="cell"]` (the corner, column, pad, leading: M-3/M-4, a DESCENDANT selector) and
// the floor's tile fact `--selection-tile` (the one-row law, the plate, the perimeter, the development names), which
// M-3 sets from the first. The fact is inherited, reset to `none` on every `.toggle-group`, and documented to
// consumers in MIGRATION ("`--selection-tile` … says whether a set of options are tiles"). This probe puts the two
// spellings in disagreement without editing the library and reads what the item paints:
//   declared         preset-migrated item 0 (shape="cell"), the reference tile
//   nested           an undeclared pill group (library classes, raw DOM) placed INSIDE the shape="cell" group root:
//                    its fact is `none` (a pill) but the descendant selector still reaches its items
//   nested-control   the same raw pill group placed beside the cell group, outside it
//   fact-plated      the library `preset` arm (an undeclared group holding K1's two-row options) with the consumer
//                    writing `--selection-tile: plated` on the group (the fact without the declaration)
//   fact-flush       the same with `flush`
// Per cell: computed corner, border box, used corner over h/2 (1.00 = a stadium/lozenge), the fact, perimeter opacity
// when selected, and whether the box holds more than one row of text. PASS for a cell means the two spellings agree:
// a fact-`none` item is a pill at h/2 on one row; a fact-tile item carries the field corner (16 px), not h/2.
//   node fact-split.mjs --build <out>/builds/<label> [--engines chromium,webkit] [--shots <dir>]
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, savePng } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const shots = typeof args.shots === "string" ? args.shots : null;
const lock = await acquireLock("dp-crit-fact-split");
const target = await openTarget(args);
console.log(`D4-D′ critic · fact-split probe · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
let pass = 0, n = 0;

const RAW = `<div class="toggle-group" data-type="single" data-size="md" data-orientation="horizontal" role="radiogroup" data-crit-raw>
  <button type="button" class="toggle-group__item pill-row control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring" role="radio" aria-checked="true" data-state="on">Nested A</button>
  <button type="button" class="toggle-group__item pill-row control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring" role="radio" aria-checked="false" data-state="off">Nested B</button>
</div>`;

async function read(page, sel) {
  return page.evaluate(async (sel) => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const el = document.querySelector(sel);
    if (!el) return null;
    const b = el.getBoundingClientRect(), cs = getComputedStyle(el), be = getComputedStyle(el, "::before");
    const r = parseFloat(cs.borderTopLeftRadius);
    const used = Math.min(r, b.width / 2, b.height / 2);
    // rows of text: distinct line boxes over every text node in the item
    const tops = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let t = w.nextNode(); t; t = w.nextNode()) {
      if (!t.textContent.trim()) continue;
      const rg = document.createRange(); rg.selectNodeContents(t);
      for (const q of rg.getClientRects()) if (q.height > 0 && !tops.some((y) => Math.abs(y - q.top) < q.height / 2)) tops.push(q.top);
    }
    return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), x: b.x, y: b.y, radius: cs.borderTopLeftRadius, used: +used.toFixed(2),
      ratio: +(used / (b.height / 2)).toFixed(2), fact: cs.getPropertyValue("--selection-tile").trim(),
      state: el.getAttribute("data-state"), perimeter: be.opacity, flexDir: cs.flexDirection, rows: tops.length };
  }, sel);
}

function judge(cell, r) {
  if (!r) return { ok: false, why: "no element" };
  const pill = r.fact === "none";
  if (pill) {
    const ok = r.ratio >= 0.99 && r.rows <= 1;
    return { ok, why: ok ? "fact none: a pill at h/2, one row" : `fact none (a pill) but corner ${r.radius} → used ${r.used} = ${r.ratio}×h/2 on ${r.rows} row(s): the declaration's corner reached a pill` };
  }
  const ok = Math.abs(r.used - 16) < 0.5;
  return { ok, why: ok ? `fact ${r.fact}: field corner 16 px` : `fact ${r.fact} (a tile: unheld, ${r.rows} rows, ${r.h} px tall, perimeter ${r.perimeter}) but corner ${r.radius} → used ${r.used} = ${r.ratio}×h/2: a LOZENGE` };
}

for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const mode of ["light", "dark"]) {
    const cells = [
      { id: "declared", scene: "preset-migrated", setup: null, sel: "[data-scene] .toggle-group__item" },
      { id: "nested", scene: "preset-migrated", setup: (raw) => { const g = document.querySelector("[data-scene] .toggle-group[data-shape='cell']"); g.insertAdjacentHTML("beforeend", raw); return !!g; }, sel: "[data-crit-raw] .toggle-group__item" },
      { id: "nested-control", scene: "preset-migrated", setup: (raw) => { const g = document.querySelector("[data-scene] .toggle-group[data-shape='cell']"); g.insertAdjacentHTML("afterend", raw); return !!g; }, sel: "[data-crit-raw] .toggle-group__item" },
      { id: "fact-plated", scene: "preset", setup: () => { const g = document.querySelector("[data-scene] .toggle-group"); g.style.setProperty("--selection-tile", "plated"); return !g.hasAttribute("data-shape") || g.getAttribute("data-shape") === "pill"; }, sel: "[data-scene] .toggle-group__item" },
      { id: "fact-flush", scene: "preset", setup: () => { const g = document.querySelector("[data-scene] .toggle-group"); g.style.setProperty("--selection-tile", "flush"); return !g.hasAttribute("data-shape") || g.getAttribute("data-shape") === "pill"; }, sel: "[data-scene] .toggle-group__item" },
    ];
    for (const c of cells) {
      let P;
      try { P = await openPage(target, engine, c.scene, { mode, query: { sel: "0" } }); }
      catch (e) { console.log(`  UNMEASURED ${engine} ${c.id} ${mode} · ${String(e.message).split("\n")[0]}`); continue; }
      let setupOk = true;
      if (c.setup) setupOk = await P.page.evaluate(`(${c.setup.toString()})(${JSON.stringify(RAW)})`);
      const r = await read(P.page, c.sel);
      const v = judge(c, r);
      n++; if (v.ok) pass++;
      console.log(`  ${v.ok ? "PASS" : "FAIL"} ${engine} ${c.id} ${mode} · setup ${setupOk ? "ok" : "UNEXPECTED (group declared?)"} · ${v.why} · ${JSON.stringify(r)}`);
      if (shots && r && mode === "light") {
        const pad = 6;
        const s = await shot(P.page, { x: Math.max(0, Math.floor(r.x - pad)), y: Math.max(0, Math.floor(r.y - pad)), width: Math.ceil(r.w + 2 * pad), height: Math.ceil(r.h + 2 * pad) });
        savePng(s, path.join(shots, `${c.id}-${engine}.png`));
      }
      await P.close();
    }
  }
}
console.log(`fact-split: ${pass}/${n} cells agree · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release();
process.exit(0);
