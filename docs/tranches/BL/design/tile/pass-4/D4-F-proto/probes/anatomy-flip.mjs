#!/usr/bin/env node
// anatomy-flip.mjs · D4-F pass-4 PROTOTYPE probe. F's own form of the D′ critic's flip cells (crit-level.mjs flips the
// group's `data-shape`, which is D′'s writer and which F ignores by design). Under F the tile is written by the
// library rows `.toggle-group__media` / `.toggle-group__meta` as direct children of an option, so the flip after mount
// is the anatomy appearing or leaving. The DOM edit stands in for a slot going empty or filling (Vue removes or
// inserts the row span; `yields()` deciding that is the unit's, ToggleGroup.test.ts "a row renders only when its slot
// yields content"); this probe reads whether the writer, the geometry and the names follow in paint, in both engines.
//   control-tile        preset-migrated, nothing changed
//   rows-removed        preset-migrated: every library row in the group removed after mount -> every option a pill
//   rows-added          preset (library arm, undeclared): a `.toggle-group__meta` appended to option 0 -> a tile
//   class-in-content    preset: the same class on a span inside option 0's label (not the option's child) -> a pill
//   rows-readded        preset-migrated: removed, then put back -> a tile again
// Each cell reads option 0 with FACT's reader and FACT's judge, plus the group's fact and, on a development flavour,
// the console errors that arrive after the edit (a false "asks for a second row" on a tile, or none on a pill whose
// content stacks). Light and dark.
//   node anatomy-flip.mjs --build <dir> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact } from "../../../harness/fact-split.mjs";

const ITEM = "[data-scene] [data-item]";
const ROWS = ".toggle-group__media, .toggle-group__meta";
const CELLS = [
  { id: "control-tile", scene: "preset-migrated", want: "tile" },
  { id: "rows-removed", scene: "preset-migrated", edit: "remove", want: "pill" },
  { id: "rows-added", scene: "preset", edit: "add", want: "tile" },
  { id: "class-in-content", scene: "preset", edit: "content", want: "pill" },
  { id: "rows-readded", scene: "preset-migrated", edit: "readd", want: "tile" },
];

const EDIT = ([sel, rows, edit]) => {
  const it = document.querySelector(sel), g = it.closest("[data-group]");
  if (edit === "remove" || edit === "readd") {
    const kept = [...g.querySelectorAll(rows)].map((r) => [r, r.parentNode, r.nextSibling]);
    kept.forEach(([r]) => r.remove());
    if (edit === "readd") return new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(() => {
      kept.forEach(([r, p, n]) => p.insertBefore(r, n)); done(kept.length); })));
    return kept.length;
  }
  const s = document.createElement("span"); s.textContent = "0.42 s";
  s.className = "toggle-group__meta";
  if (edit === "add") it.append(s);
  else (it.querySelector(":scope > :not(.toggle-group__media, .toggle-group__meta, svg)") ?? it).append(s);
  return 1;
};
const GROUP = (sel) => { const it = document.querySelector(sel), g = it.closest("[data-group]");
  return { group: getComputedStyle(g).getPropertyValue("--selection-tile").trim(), rows: g.querySelectorAll(":scope [data-item] > :is(.toggle-group__media, .toggle-group__meta)").length,
    shapes: [...g.querySelectorAll("[data-item]")].map((i) => getComputedStyle(i).borderTopLeftRadius).join("/") }; };

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("ANATOMY-FLIP", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const c of CELLS) {
      const P = await openPage(target, engine, c.scene, { mode, query: { sel: "0" } });
      try {
        const n0 = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
        const edited = c.edit ? await P.page.evaluate(EDIT, [ITEM, ROWS, c.edit]) : 0;
        await P.page.waitForTimeout(700); // the development name runs on a rAF after a mutation it hears
        const r = await P.page.evaluate(READ_ITEM, ITEM);
        const x = await P.page.evaluate(GROUP, ITEM);
        const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").slice(n0);
        const j = judgeFact(c.want, r);
        // a development flavour must not name a tile, and must stay silent on a one-row pill
        const named = errs.filter((e) => /second row/.test(e.text)).length;
        const pass = j.pass && (!target.meta.dev || named === 0);
        cells.push({ gating: true, pass, scene: c.scene,
          line: `${c.id} ${mode} · want ${c.want} · ${j.why} · rows edited ${edited}, library rows now ${x.rows} · item fact ${r.fact || "(unset)"}, group fact ${x.group} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir} · corners ${x.shapes} · ${target.meta.dev ? `console errors ${errs.length}${errs[0] ? ` «${errs[0].text.slice(0, 90)}»` : ""}` : "production flavour"}` });
      } finally { await P.close(); }
    }
    return { id: "ANATOMY-FLIP", title: "the anatomy appearing or leaving after mount (D4-F prototype probe, pass 4)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
