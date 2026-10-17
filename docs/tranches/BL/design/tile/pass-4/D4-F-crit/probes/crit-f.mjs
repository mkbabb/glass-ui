#!/usr/bin/env node
// crit-f.mjs · D4-F pass-4 CRITIC probe, on a build made with `--route <this dir>/route-crit`. Reads FACT's item
// reader (`READ_ITEM`: fact, box, used corner, text rows, flex direction) and FACT's judge on the cells below, plus
// the item's library rows, boxes past its border box, the group's fact, and console errors on a development flavour.
//   VF  tile → pills → tile through Vue: every `#meta` empties (`__tile.reorder()`), then fills again
//   VR  pills → tile → pills through Vue: every `#media` fills, then empties
//   N3  a pill ToggleGroup inside a tile option's `#meta`: its option must be a pill (code reading N-3 in D4-F-proto.md)
//   PL  `--selection-tile: plated` written by the consumer on an anatomy group: a tile, fact plated, field corner
//   WN  `--selection-tile: none` written on a wrapper between the group and its options: the readers must agree
//   MX  one option fills `#meta`, three do not: every option is a card (MIGRATION)
// Light and dark.   node crit-f.mjs --build <dir> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM, judgeFact } from "../../../harness/fact-split.mjs";

const at = (id) => `[data-scene] [data-ci="${id}"]`;
const EXTRA = async (sel) => {
  const it = document.querySelector(sel);
  if (!it) return null;
  const g = it.parentElement.closest(".toggle-group");
  const box = it.getBoundingClientRect();
  const past = [...it.querySelectorAll("*")].filter((c) => { const r = c.getBoundingClientRect(); return r.height > 0 && (r.bottom > box.bottom + 1 || r.top < box.top - 1); });
  return { group: g ? getComputedStyle(g).getPropertyValue("--selection-tile").trim() : "(no group)",
    rows: it.querySelectorAll(":scope > .toggle-group__media, :scope > .toggle-group__meta").length, past: past.length,
    mark: getComputedStyle(it, "::after").width, state: it.dataset.state ?? "-" };
};
const SEQ = {
  VF: { scene: "preset-migrated", id: "vflip-0", steps: [["mount", "tile"], ["reorder", "pill"], ["reorder", "tile"]] },
  VR: { scene: "strip-migrated", id: "vrise-0", steps: [["mount", "pill"], ["reorder", "tile"], ["reorder", "pill"]] },
  N3: { scene: "v2-migrated", id: "n3-inner-0", steps: [["mount", "pill"]], also: "n3-outer-0" },
  PL: { scene: "specimen-migrated", id: "plated-0", steps: [["mount", "tile"]], fact: "plated" },
  WN: { scene: "f1-migrated", id: "wrapnone-0", steps: [["mount", "agree"]] },
  MX: { scene: "c1-migrated", id: "mixed-1", steps: [["mount", "tile"]], also: "mixed-0" },
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-F", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const [cid, c] of Object.entries(SEQ)) {
      const P = await openPage(target, engine, c.scene, { mode, query: { sel: "none" } });
      try {
        let n0 = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
        for (const [step, want] of c.steps) {
          if (step === "reorder") { await P.page.evaluate(() => window.__tile.reorder()); }
          await P.page.waitForTimeout(700); // the development name runs on a rAF after a mutation it hears
          const r = await P.page.evaluate(READ_ITEM, at(c.id));
          const x = await P.page.evaluate(EXTRA, at(c.id));
          const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").slice(n0);
          n0 += errs.length;
          let j = judgeFact(want, r);
          if (j.pass && c.fact && r.fact !== c.fact) j = { pass: false, why: `a tile, but fact ${r.fact} (want ${c.fact})` };
          const devOk = !target.meta.dev || errs.length === 0;
          cells.push({ gating: true, pass: j.pass && devOk, scene: c.scene,
            line: `${cid} ${mode} · ${step} · want ${want} · ${j.why}${r ? ` · item fact ${r.fact || "(unset)"}, group fact ${x.group} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} text row(s) · ${r.dir} · library rows ${x.rows} · past the box ${x.past} · mark ${x.mark}` : ""} · ${target.meta.dev ? `console errors ${errs.length}${errs[0] ? ` «${errs[0].text.slice(0, 110)}»` : ""}` : "production flavour"}` });
        }
        if (c.also) {
          const r = await P.page.evaluate(READ_ITEM, at(c.also));
          const j = judgeFact("tile", r);
          cells.push({ gating: true, pass: j.pass, scene: c.scene, line: `${cid} ${mode} · ${c.also} · want tile · ${j.why}${r ? ` · fact ${r.fact} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} · ${r.rows} row(s)` : ""}` });
        }
      } finally { await P.close(); }
    }
    return { id: "CRIT-F", title: "D4-F critic cells: the reactive flip, a pill group inside a tile option, plated, a wrapper write, a mixed set", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
