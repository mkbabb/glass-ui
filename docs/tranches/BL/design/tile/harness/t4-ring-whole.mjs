#!/usr/bin/env node
// T-4 · Focus paints whole and apart from selection: the item is reached by Tab (a real key press) from the
// sentinel before the group, and compared against itself unfocused. Along the middle 60 % of every side, the
// band outside its curved edge must carry ≥ 1.5 px of painted ring (10th percentile), so a ring cut by its host
// or replaced by other paint fails. Two cells per scene: nothing selected (Tab lands on the first stop) and an
// item selected (Tab lands on it), so selection paint cannot stand in for the ring. Light and dark gate;
// forced colours are reported.
//   node t4-ring-whole.mjs --build <dir> | --fixture [--fault t4] [--engine chromium|webkit] [--save <dir>]
import path from "node:path";
import { cli, openPage, sceneList, scenesFor, engineVersion } from "./lib.mjs";
import { ringCoverage, judgeT4 } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-4", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-4")) for (const mode of ["light", "dark", "forced"]) for (const sel of ["none", "1"]) {
      const P = await openPage(target, engine, sc.id, { mode, query: { sel } });
      const m = await ringCoverage(P, { save: typeof args.save === "string" ? path.join(args.save, `${sc.id}-${engine}-${mode}-sel${sel}`) : null });
      const j = judgeT4(m);
      cells.push({ gating: sc.gating && mode !== "forced", pass: P.modeOk ? j.pass : false, scene: sc.id, mode, sel, m, line: `${sc.id} ${P.modeLabel} sel=${sel} · ${j.line}` });
      await P.close();
    }
    return { id: "T-4", title: "focus paints whole and apart from selection", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
