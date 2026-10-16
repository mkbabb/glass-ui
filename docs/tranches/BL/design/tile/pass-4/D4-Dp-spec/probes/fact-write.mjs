#!/usr/bin/env node
// fact-write.mjs · D4-D′ pass-4 spec seat probe. Checks the MIGRATION claim this route adds to the `--selection-tile`
// row (E-3: a falsifiable claim only): "A rule of yours on the group element itself writes over either: `plated` for
// a plate at rest, `none` for pills. On an ancestor of the group it has no effect, because the group sets its own."
// Read on the shared attack build (`build.mjs <wt> --route <harness>/attack-route`), whose `specimen` scene holds a
// declared tile group (`.atk-tile`, `shape="cell"`) and an undeclared pill group beside it (`.atk-pill-beside`).
// Each cell writes the fact one way and reads item 0 with FACT's reader and judge (../../../harness/fact-split.mjs):
//   declared-none-inline     `none` inline on the declared group            want pill
//   declared-none-rule       `none` by an unlayered rule on the declared group want pill
//   declared-plated-rule     `plated` by an unlayered rule on it              want tile, fact plated
//   ancestor-plated          `plated` on the declared group's parent          want tile, fact flush (no effect)
//   ancestor-flush-on-pill   `flush` on the undeclared pill group's parent    want pill (no effect)
//   control                  nothing written                                  want tile, fact flush
// Light and dark.
//   node fact-write.mjs --build <dir> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact, isAttack } from "../../../harness/fact-split.mjs";

const TILE = "[data-scene] .atk-tile";
const CELLS = [
  { id: "control", sel: `${TILE} [data-item]`, want: "tile", fact: "flush" },
  { id: "declared-none-inline", inline: [TILE, "none"], sel: `${TILE} [data-item]`, want: "pill" },
  { id: "declared-none-rule", css: ".atk-tile { --selection-tile: none; }", sel: `${TILE} [data-item]`, want: "pill" },
  { id: "declared-plated-rule", css: ".atk-tile { --selection-tile: plated; }", sel: `${TILE} [data-item]`, want: "tile", fact: "plated" },
  { id: "ancestor-plated", css: ".atk-split { --selection-tile: plated; }", sel: `${TILE} [data-item]`, want: "tile", fact: "flush" },
  { id: "ancestor-flush-on-pill", css: ".atk-split { --selection-tile: flush; }", sel: "[data-scene] .atk-pill-beside [data-atk-item]", want: "pill" },
];

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("FACT-WRITE", async (args, target) => {
    const engine = engineOf(args);
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    if (!isAttack(migration)) throw new Error(`not an attack build (migration ${migration?.label ?? "none"})`);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const c of CELLS) {
      const P = await openPage(target, engine, "specimen-migrated", { mode, query: { sel: "0" } });
      try {
        if (c.css) await P.page.addStyleTag({ content: c.css });
        if (c.inline) await P.page.evaluate(([s, v]) => document.querySelector(s).style.setProperty("--selection-tile", v), c.inline);
        const r = await P.page.evaluate(READ_ITEM, c.sel);
        const j = judgeFact(c.want, r);
        const factOk = !c.fact || r?.fact === c.fact;
        cells.push({ gating: true, pass: j.pass && factOk, scene: "specimen-migrated", arm: "migrated",
          line: `${c.id} ${mode} · want ${c.want}${c.fact ? ` (fact ${c.fact})` : ""} · ${j.why}${factOk ? "" : ` · FACT ${r?.fact} (want ${c.fact})`}${r ? ` · fact ${r.fact} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir}` : ""}` });
      } finally { await P.close(); }
    }
    return { id: "FACT-WRITE", title: "the MIGRATION claim on writing --selection-tile over shape=\"cell\" (E-3)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
