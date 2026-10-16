#!/usr/bin/env node
// CORNER · H4-1 · a consumer corner on a tile is refused in paint (REGISTRY §P3-6.2 H4-1; FV3-4 decides the layered
// `!important` corner on both routes; scored on E-3 wherever a route or the floor claims the refusal). Promoted from
// `../pass-3/D4-Dp-spec/probes/corner-refusal.mjs` onto the shared attack compositions (`attack-route/`), with
// route-neutral selectors (`[data-item]`, never a library class). On `preset-migrated` (a tile group under both
// declarations) a consumer corner of 9999px arrives the four ways a consumer writes one, each on a fresh page:
//   utility    the classes `rounded-pill rounded-full`, with `.rounded-full` in `@layer utilities` as Tailwind v4 writes it
//   scoped     an unlayered rule of higher specificity, `body [data-scene] [data-item][data-item]`
//   important  an unlayered `[data-item] { border-radius: 9999px !important }`
//   inline     `style="border-radius: 9999px"` on every item
// PASS when the item still computes the field corner (16px) and uses 16.00 px. `inline-important` is printed as INFO:
// no stylesheet rule outranks it. The control reads the undeclared pill (`family-d-undeclared`) under the scoped
// selector with a marker value (7px): it must compute 7px, which proves the selector reaches an item.
//   node corner-refusal.mjs --build <out>/builds/<label>-atk | --fixture --family atk [--fault atk-corner]
import { cli, openPage, engineVersion, engineOf, f2 } from "./lib.mjs";
import { isAttack } from "./fact-split.mjs";

const SCOPED = "body [data-scene] [data-item][data-item]";
const FORMS = {
  utility: { cls: "rounded-pill rounded-full", css: "@layer utilities { .rounded-full { border-radius: 9999px; } }" },
  scoped: { css: `${SCOPED} { border-radius: 9999px; }` },
  important: { css: "[data-item] { border-radius: 9999px !important; }" },
  inline: { style: "border-radius: 9999px" },
  "inline-important": { style: "border-radius: 9999px !important", info: true },
};
const apply = async (f) => {
  if (f.css) { const s = document.createElement("style"); s.textContent = f.css; document.head.append(s); }
  const its = [...document.querySelectorAll("[data-scene] [data-item]")];
  for (const el of its) { if (f.cls) el.classList.add(...f.cls.split(" ")); if (f.style) el.setAttribute("style", f.style); }
  await window.__th.frame();
  const c = window.__th.corner(its[0]);
  return { computed: c.computed, used: c.used, w: c.w, h: c.h };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CORNER", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    if (!isAttack(migration)) {
      cells.push({ gating: true, pass: null, line: `preset-migrated · UNMEASURED: not an attack build (migration ${migration?.label ?? "none"}); build with --route <harness>/attack-route` });
    } else for (const [form, f] of Object.entries(FORMS)) {
      const P = await openPage(target, engine, "preset-migrated", { mode: "light" });
      const r = await P.page.evaluate(apply, f);
      await P.close();
      const tile = r.computed === "16px" && Math.abs(r.used - 16) < 0.01;
      cells.push({ gating: !f.info, pass: tile, line: `preset-migrated ${form} · computed ${r.computed} · used ${f2(r.used)} on ${f2(r.w)}×${f2(r.h)} · want the field corner kept (16px)${f.info ? " · INFO: no stylesheet rule outranks an inline !important" : ""}` });
    }
    { // control: the scoped selector reaches an undeclared pill
      const P = await openPage(target, engine, "family-d-undeclared", { mode: "light" });
      const r = await P.page.evaluate(apply, { css: `${SCOPED} { border-radius: 7px; }` });
      await P.close();
      cells.push({ gating: true, pass: r.computed === "7px", line: `family-d-undeclared scoped-control · computed ${r.computed} (want 7px: the selector reaches an item) · ${f2(r.w)}×${f2(r.h)}` });
    }
    return { id: "CORNER", title: "a consumer corner on a tile is refused in paint (H4-1; FV3-4, E-3)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
