#!/usr/bin/env node
// crit-level.mjs · D4-D′ pass-4 CRITIC probe. The tile fact `--selection-tile` is read at two elements: the item's
// geometry, pill law and flush plate are style queries on the item, so they read the GROUP's value (a style query's
// container is the parent); the one-row law on a pill's content (`.pill-row *`, utilities/base.css) and the
// development name (ToggleGroupItem.vue, `getComputedStyle(item)`) read the ITEM's own value. FACT (H4-1) writes the
// fact on the group only. These cells write it where the readers part, and flip the declaration after mount:
//   item-none-in-tile    preset-migrated (shape="cell"): `--selection-tile: none` inline on item 0
//   item-flush-in-pill   preset (library arm, undeclared, K1's two-row content): `flush` inline on item 0
//   flip-cell-to-pill    preset-migrated: the group's data-shape set to "pill" after mount (what a prop change stamps)
//   flip-pill-to-cell    preset: the group's data-shape set to "cell" after mount
//   control-tile, control-pill   nothing written
// Each cell reads item 0 with FACT's reader (fact = the item's own computed value) and FACT's "agree" judge (a tile
// fact on the field corner, or a pill fact on a one-row stadium), plus: the group's fact, the display of the item's
// grandchildren, boxes past the item's border box (cut by the pill's clip), the selected perimeter's opacity, and
// console errors (the development name) on a development flavour. Light and dark.
//   node crit-level.mjs --build <dir> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact } from "../../../harness/fact-split.mjs";

const ITEM = "[data-scene] [data-item]";
const CELLS = [
  { id: "control-tile", scene: "preset-migrated", want: "tile" },
  { id: "control-pill", scene: "preset", want: "pill" },
  { id: "item-none-in-tile", scene: "preset-migrated", item: "none", want: "agree" },
  { id: "item-flush-in-pill", scene: "preset", item: "flush", want: "agree" },
  { id: "flip-cell-to-pill", scene: "preset-migrated", shape: "pill", want: "pill" },
  { id: "flip-pill-to-cell", scene: "preset", shape: "cell", want: "tile" },
];

const EXTRA = async (sel) => {
  await window.__th.frame();
  const it = document.querySelector(sel), g = it.closest("[data-group]");
  const box = it.getBoundingClientRect();
  const kids = [...it.querySelectorAll(":scope > * > *")];
  const past = [...it.querySelectorAll("*")].filter((c) => { const r = c.getBoundingClientRect(); return r.height > 0 && (r.bottom > box.bottom + 1 || r.top < box.top - 1); });
  const before = getComputedStyle(it, "::before");
  return { group: getComputedStyle(g).getPropertyValue("--selection-tile").trim(), shape: g.dataset.shape ?? "(none)",
    grand: [...new Set(kids.map((k) => getComputedStyle(k).display))].join("/") || "-", past: past.length,
    pastBy: past.length ? Math.max(...past.map((c) => { const r = c.getBoundingClientRect(); return Math.max(r.bottom - box.bottom, box.top - r.top); })) : 0,
    state: it.dataset.state, perim: before.opacity, perimVar: getComputedStyle(it).getPropertyValue("--selection-perimeter").trim() || "(unset)" };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-LEVEL", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const c of CELLS) {
      const P = await openPage(target, engine, c.scene, { mode, query: { sel: "0" } });
      try {
        const n0 = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
        if (c.item) await P.page.evaluate(([s, v]) => document.querySelector(s).style.setProperty("--selection-tile", v), [ITEM, c.item]);
        if (c.shape) await P.page.evaluate(([s, v]) => document.querySelector(s).closest("[data-group]").setAttribute("data-shape", v), [ITEM, c.shape]);
        await P.page.waitForTimeout(700); // the development name runs on a rAF after a mutation it hears
        const r = await P.page.evaluate(READ_ITEM, ITEM);
        const x = await P.page.evaluate(EXTRA, ITEM);
        const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").slice(n0);
        const j = judgeFact(c.want, r);
        cells.push({ gating: true, pass: j.pass, scene: c.scene,
          line: `${c.id} ${mode} · want ${c.want} · ${j.why} · item fact ${r.fact || "(unset)"}, group fact ${x.group}, data-shape ${x.shape} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir} · grandchildren ${x.grand} · past the box ${x.past}${x.past ? ` (up to ${f2(x.pastBy)} px)` : ""} · state ${x.state}, perimeter ${x.perimVar} → ::before opacity ${x.perim} · ${target.meta.dev ? `console errors ${errs.length}${errs[0] ? ` «${errs[0].text.slice(0, 90)}»` : ""}` : "production flavour"}` });
      } finally { await P.close(); }
    }
    return { id: "CRIT-LEVEL", title: "the tile fact written on the item, and the declaration flipped after mount (critic probe, D′ pass 4)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
