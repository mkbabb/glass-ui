#!/usr/bin/env node
// crit-p5.mjs · D4-D′ pass-5 CRITIC probe. The route's MIGRATION claims on floor v4, spelled the ways a Tailwind consumer
// writes them, on the shared attack build's `specimen-migrated` (`.atk-tile` is a `<ToggleGroup shape="cell">`).
// D′'s row: "A rule of yours on the group element itself (an unlayered or scoped rule, or a utility such as
// `[--selection-tile:plated]`) writes over either: `plated` for a plate at rest, `none` for pills." Floor v4's row: "On
// an option or on content inside one it has no effect either … only an inline `--selection-tile: … !important`
// outranks that." The library sheet declares `@layer theme, base, components, utilities`, so a Tailwind utility is a
// rule in `@layer utilities` and a `!`-modified one is the same rule with `!important`; each cell injects exactly that.
//   control                 nothing written                                              want tile, fact flush
//   group-utility-plated    `@layer utilities { .atk-tile { plated } }`  ([--selection-tile:plated])  want tile, fact plated
//   group-utility-none      `@layer utilities { .atk-tile { none } }`                    want pill
//   option-utility-bang     `@layer utilities { .atk-tile [data-item] { none !important } }` (![…] on the option) want tile, fact flush (refused)
//   option-unlayered-bang   unlayered `.atk-tile [data-item] { none !important }` (a scoped `!important`)  want tile, fact flush (refused)
//   content-unlayered-bang  unlayered `.atk-tile [data-item] > * { none !important }`    want tile, fact flush, and no content row clipped
//   option-inline-bang      inline `none !important` on item 0 (the stated exception)    REPORTED: the claim says it outranks
//   group-components-plated `@layer components { .atk-tile { plated } }` (a consumer rule in the library's own layer)  REPORTED
// Each reads item 0 with FACT's reader and judge (../../../harness/fact-split.mjs), plus its content rows' clip
// (overflow on a child, as the pill label rule sets), light and dark.
//   node crit-p5.mjs --build <attack build> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact, isAttack } from "../../../harness/fact-split.mjs";

const TILE = "[data-scene] .atk-tile";
const ITEM = `${TILE} [data-item]`;
const CELLS = [
  { id: "control", want: "tile", fact: "flush" },
  { id: "group-utility-plated", css: "@layer utilities { .atk-tile { --selection-tile: plated; } }", want: "tile", fact: "plated" },
  { id: "group-utility-none", css: "@layer utilities { .atk-tile { --selection-tile: none; } }", want: "pill" },
  { id: "option-utility-bang", css: "@layer utilities { .atk-tile [data-item] { --selection-tile: none !important; } }", want: "tile", fact: "flush" },
  { id: "option-unlayered-bang", css: ".atk-tile [data-item] { --selection-tile: none !important; }", want: "tile", fact: "flush" },
  { id: "content-unlayered-bang", css: ".atk-tile [data-item] > * { --selection-tile: none !important; }", want: "tile", fact: "flush", content: true },
  { id: "option-inline-bang", inline: "none", want: "agree", reported: true },
  { id: "group-components-plated", css: "@layer components { .atk-tile { --selection-tile: plated; } }", want: "agree", reported: true },
];
const CONTENT = async (sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  return [...el.children].map((c) => { const cs = getComputedStyle(c); return `${c.tagName.toLowerCase()} fact ${cs.getPropertyValue("--selection-tile").trim()} overflow ${cs.overflow} pad-block ${cs.paddingBlockStart}`; }).join("; ");
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-P5", async (args, target) => {
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
        if (c.inline) await P.page.evaluate(([s, v]) => document.querySelector(s).style.setProperty("--selection-tile", v, "important"), [ITEM, c.inline]);
        const r = await P.page.evaluate(READ_ITEM, ITEM);
        const kids = await P.page.evaluate(CONTENT, ITEM);
        const j = judgeFact(c.want, r);
        const factOk = !c.fact || r?.fact === c.fact;
        const clipOk = !c.content || !/overflow hidden/.test(kids ?? "");
        cells.push({ gating: !c.reported, pass: j.pass && factOk && clipOk, scene: "specimen-migrated", arm: "migrated",
          line: `${c.id} ${mode}${c.reported ? " (reported)" : ""} · want ${c.want}${c.fact ? ` (fact ${c.fact})` : ""} · ${j.why}${factOk ? "" : ` · FACT ${r?.fact} (want ${c.fact})`}${r ? ` · fact ${r.fact} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir}` : ""} · children: ${kids}` });
      } finally { await P.close(); }
    }
    return { id: "CRIT-P5", title: "D′'s and floor v4's MIGRATION write claims, spelled as Tailwind utilities and !important (E-3, R-10)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
