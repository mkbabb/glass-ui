#!/usr/bin/env node
// FACT · H4-1 · "is a tile" has one spelling (REGISTRY §P3-6.2; rows R-10 and R-2). Promoted from the D′ critic's
// probe (`../pass-3/D4-Dp-crit/probes/fact-split.mjs`, `D′c` §2) with the fixture and plant it owed, and made
// route-neutral: it reads the shared attack compositions (`attack-route/`), which carry both live declarations, so
// every route reads the same cells. Build with `build.mjs <wt> --label <l>-atk --route <harness>/attack-route`.
// The tile fact is `--selection-tile` (floor v2: `none | flush | plated`, inherited, reset on every group). Each cell
// puts the fact and the declaration where they could disagree and reads what the item wears, in light and dark:
//   declared          the tile group's item 0 (`specimen-migrated`, `.atk-tile`): want a tile fact and the field
//                     corner (16 px, ±0.5)
//   pill-in-tile      a pill group nested inside the tile group (`.atk-pill-in`): want a pill (fact none, used corner
//                     h/2, one row)
//   pill-beside-tile  the same pill group beside the tile group (`.atk-pill-beside`), the control: want a pill
//   tile-in-pill      a pill group holding a one-item tile group (`v2-migrated`, `.atk-outer`'s own items): want a
//                     pill (F's nesting reach, `Fc` §2.4)
//   fact-plated       the library `preset` arm (undeclared, two-row K1 options) with the consumer writing
//                     `--selection-tile: plated` on the group: want agreement, either a tile fact on the field
//                     corner or the write refused (fact none and a one-row pill)
//   fact-flush        the same with `flush`
// An unset fact (HEAD, where the fact does not exist) reads as no tile fact. A build that is not an attack build
// reads UNMEASURED on every attack cell.
//   node fact-split.mjs --build <out>/builds/<label>-atk | --fixture --family atk [--fault atk-split] [--engine webkit]
import { cli, openPage, engineVersion, engineOf, f2 } from "./lib.mjs";
import { ATTACK_LABEL } from "./attack-route/migrated.mjs";

export const isAttack = (m) => !!m && (m.label === ATTACK_LABEL || m.attack === true);
export const noFact = (f) => f === "" || f === "none";
/** The item's fact, box, used corner (CSS Backgrounds §5.5), text rows and flex direction, after two frames. */
export const READ_ITEM = async (sel) => {
  await window.__th.frame();
  const el = document.querySelector(sel);
  if (!el) return null;
  const c = window.__th.corner(el), cs = getComputedStyle(el);
  const tops = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let t = w.nextNode(); t; t = w.nextNode()) {
    if (!t.textContent.trim() || t.parentElement.closest("sup")) continue;
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const q of rg.getClientRects()) if (q.height > 0 && !tops.some((y) => Math.abs(y - q.top) < q.height / 2)) tops.push(q.top);
  }
  return { w: c.w, h: c.h, computed: c.computed, used: c.used, ratio: c.used / (c.h / 2), fact: cs.getPropertyValue("--selection-tile").trim(), dir: cs.flexDirection, rows: tops.length };
};
const desc = (r) => `fact ${r.fact || "(unset)"} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir}`;
const isPill = (r) => noFact(r.fact) && Math.abs(r.used - r.h / 2) <= 0.5 && r.rows <= 1;
const isTile = (r) => !noFact(r.fact) && Math.abs(r.used - 16) <= 0.5;
const CELLS = [
  { id: "declared", scene: "specimen-migrated", sel: "[data-scene] .atk-tile [data-item]", want: "tile" },
  { id: "pill-in-tile", scene: "specimen-migrated", sel: "[data-scene] .atk-pill-in [data-atk-item]", want: "pill" },
  { id: "pill-beside-tile", scene: "specimen-migrated", sel: "[data-scene] .atk-pill-beside [data-atk-item]", want: "pill" },
  { id: "tile-in-pill", scene: "v2-migrated", sel: "[data-scene] .atk-outer > [data-item]", want: "pill" },
  { id: "fact-plated", scene: "preset", write: "plated", sel: "[data-scene] [data-item]", want: "agree" },
  { id: "fact-flush", scene: "preset", write: "flush", sel: "[data-scene] [data-item]", want: "agree" },
];
export function judgeFact(want, r) {
  if (!r) return { pass: false, why: "no such element" };
  if (want === "tile") return { pass: isTile(r), why: isTile(r) ? "a tile on the field corner" : "NOT a tile on the field corner" };
  if (want === "pill") return { pass: isPill(r), why: isPill(r) ? "a pill at h/2 on one row" : noFact(r.fact) ? "a pill fact, but the item does not wear a one-row stadium: a declaration's geometry reached it" : "a tile fact reached a pill group's item" };
  const ok = isTile(r) || isPill(r);
  return { pass: ok, why: ok ? (isTile(r) ? "the written fact and the geometry agree: a tile on the field corner" : "the write is refused: a one-row pill") : `the written fact and the geometry DISAGREE${!noFact(r.fact) && r.ratio > 0.99 ? ": a LOZENGE" : ""}` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("FACT", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    const attack = isAttack(migration);
    for (const mode of ["light", "dark"]) for (const c of CELLS) {
      const line = (s) => `${c.id} ${mode} · ${s}`;
      if (!attack && c.scene !== "preset") { cells.push({ gating: true, pass: null, line: line(`UNMEASURED: not an attack build (migration ${migration?.label ?? "none"}); build with --route <harness>/attack-route`) }); continue; }
      const P = await openPage(target, engine, c.scene, { mode, query: { sel: "0" } });
      if (c.write) await P.page.evaluate((v) => document.querySelector("[data-scene] [data-group]").style.setProperty("--selection-tile", v), c.write);
      const r = await P.page.evaluate(READ_ITEM, c.sel);
      await P.close();
      const j = judgeFact(c.want, r);
      cells.push({ gating: true, pass: j.pass, line: line(`${c.write ? `--selection-tile: ${c.write} written on the group · ` : ""}want ${c.want} · ${j.why}${r ? ` · ${desc(r)}` : ""}`) });
    }
    return { id: "FACT", title: "is a tile has one spelling: the fact and the tile geometry agree under nesting and a written fact (H4-1; R-10, R-2)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
