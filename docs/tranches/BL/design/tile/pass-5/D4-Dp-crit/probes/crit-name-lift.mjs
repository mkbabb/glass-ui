#!/usr/bin/env node
// crit-name-lift.mjs · D4-D′ pass-5 CRITIC probe (sitting 2). crit-name-trace.mjs finds the rule that holds the
// selected K2 name at the rest ink: the unlayered `.tile-name { … color: var(--muted-foreground) }` of the harness's
// shared K2 "layout and type" block (harness/scenes.mjs:539, transcribed from keyframes.js EasingCatalogue.vue), which
// carries no [data-arm] scope and so reaches the migrated arm too. This reads REPORT name-ink's question on the route's
// specimen-migrated twice per mode: as built, and with ONLY that consumer colour lifted
// (`[data-arm="migrated"] .tile-name { color: inherit }`, nothing else). Does the library hand the selected name its
// item's ink once the consumer's own colour is gone? Reported, not gating (REPORT name-ink is the row's cell).
//   node crit-name-lift.mjs --build <route build> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, contrast } from "../../../harness/lib.mjs";
import { tagItems } from "../../../harness/measure.mjs";

const READ = async () => {
  const th = window.__th; await th.frame();
  const its = th.items(), on = its.find((e) => th.on(e)), off = its.find((e) => !th.on(e));
  if (!on || !off) return null;
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true });
  const rgb = (c) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = c; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data.slice(0, 3)]; };
  const one = (it) => ({ item: rgb(getComputedStyle(it).color), name: rgb(getComputedStyle(it.querySelector("[data-line-slot]")).color) });
  return { on: one(on), off: one(off) };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-NAME-LIFT", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const lift of [false, true]) {
      const P = await openPage(target, engine, "specimen-migrated", { mode });
      try {
        await tagItems(P);
        if (lift) await P.page.addStyleTag({ content: '[data-arm="migrated"] .tile-name { color: inherit; }' });
        const r = await P.page.evaluate(READ);
        if (!r) { cells.push({ gating: false, pass: null, line: `${mode} · UNMEASURED: no selected and unselected tile` }); continue; }
        const takes = r.on.name.join() === r.on.item.join();
        const c = contrast(r.on.name, r.off.name);
        cells.push({ gating: false, pass: takes, line: `${lift ? "consumer colour lifted" : "as built"} · ${mode} · selected name rgb(${r.on.name.join(", ")}), its item rgb(${r.on.item.join(", ")}) · unselected name rgb(${r.off.name.join(", ")}) · name selected:unselected ${c.toFixed(2)}:1 · the selected name ${takes ? "TAKES" : "does NOT take"} its item's ink` });
      } finally { await P.close(); }
    }
    return { id: "CRIT-NAME-LIFT", title: "X-2: the selected K2 name with only the shared scene's consumer colour lifted (reported)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
