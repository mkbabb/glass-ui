#!/usr/bin/env node
// D4-Dp-spec/probes/corner-refusal.mjs · E-3 / MIGRATION: "a corner on a tile is refused in paint and has no effect".
// On the route's migrated K1 tiles (`preset-migrated`, a `shape="cell"` group), a consumer corner arrives the four ways
// a consumer writes one, each on its own fresh page, and the item's computed and used corner are read:
//   utility   the Tailwind class the shipped K1 carries (`rounded-pill`) and `rounded-full`, added to every item
//   scoped    an unlayered rule of higher specificity, `.preset-grid .toggle-group__item { border-radius: 9999px }`
//   important an unlayered `!important` rule (a consumer reaching for the hammer)
//   inline    `style="border-radius: 9999px"` on the item (Vue `:style`)
// PASS when the computed corner stays the field rung (16px) and the used corner is 16.00 px. The one form the cascade
// lets through, inline `!important`, is printed as INFO: no stylesheet rule outranks it, and the claim is about classes
// and rules. A control row reads the undeclared pill (`family-d-undeclared`) under the scoped rule, to show the rule
// does reach an item that is not a tile.
//   node corner-refusal.mjs --build <out>/builds/<label> [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock("dp-corner-refusal");
const target = await openTarget(args);
console.log(`D4-D′ corner-refusal probe · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
const FORMS = {
  utility: { cls: "rounded-pill rounded-full" },
  scoped: { css: "body .toggle-group .toggle-group__item.toggle-group__item { border-radius: 9999px; }" },
  important: { css: ".toggle-group__item { border-radius: 9999px !important; }" },
  inline: { style: "border-radius: 9999px" },
  "inline-important": { style: "border-radius: 9999px !important", info: true },
};
let pass = 0, n = 0;
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const [scene, expectTile] of [["preset-migrated", true], ["family-d-undeclared", false]])
    for (const [form, f] of Object.entries(FORMS)) {
      if (!expectTile && form !== "scoped") continue;
      const P = await openPage(target, engine, scene, { mode: "light" });
      const r = await P.page.evaluate(async (f) => {
        if (f.css) { const s = document.createElement("style"); s.textContent = f.css; document.head.append(s); }
        const its = window.__th.items();
        for (const el of its) { if (f.cls) el.classList.add(...f.cls.split(" ")); if (f.style) el.setAttribute("style", f.style); }
        await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
        const el = its[0], cs = getComputedStyle(el), b = el.getBoundingClientRect();
        const c = parseFloat(cs.borderTopLeftRadius);
        return { computed: cs.borderTopLeftRadius, used: Math.min(c, b.width / 2, b.height / 2), w: b.width, h: b.height, cls: el.className.includes("rounded-pill") };
      }, f);
      await P.close();
      const tile = r.computed === "16px" && Math.abs(r.used - 16) < 0.01;
      const ok = expectTile ? tile : !tile;
      const verdict = f.info ? "INFO" : ok ? "PASS" : "FAIL";
      if (!f.info) { n++; if (ok) pass++; }
      console.log(`  ${verdict.padEnd(4)} ${engine} ${scene} ${form} · computed ${r.computed} · used ${r.used.toFixed(2)} on ${r.w.toFixed(2)}×${r.h.toFixed(2)}${expectTile ? "" : " (control: the rule reaches a pill)"} · load ${load()}`);
    }
}
console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
