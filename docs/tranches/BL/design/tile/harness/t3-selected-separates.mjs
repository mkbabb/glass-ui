#!/usr/bin/env node
// T-3 · The selected state separates: selected vs unselected ≥ 3:1 on painted pixels, or a second carrier the
// item's own content cannot override, in light, dark and PRT (F-24). The item's [data-ink] content is hidden
// and its scale pinned to 1; the two plates are screenshotted at the same size. PASS per cell when the mean
// inner fill separates ≥ 3:1, or when the pixels that separate ≥ 3:1 cover at least a 1 px band along half the
// perimeter (a perimeter edge, a mark, a flood). Forced colours are reported, not gated (the §2.5 floor).
// H-3: the fill is reported in its own cell, apart from the edge; the gating scenes include an invalid group, a
// sibling state, the shipped consumer composition (preset-verbatim: a transparent border and a dashed outline), a
// translucent tone and an unresolvable tone.
//   node t3-selected-separates.mjs --build <dir> | --fixture [--fault t3] [--engine chromium|webkit] [--save <dir>]
import path from "node:path";
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf } from "./lib.mjs";
import { selectedSeparation, judgeT3 } from "./measure.mjs";

export const T3_MODES = ["light", "dark", "prt"];
export async function t3Cells(target, engine, scenes, { save, modes = [...T3_MODES, "forced"], fill = true } = {}) {
  const cells = [];
  for (const sc of scenes) for (const mode of modes) {
    const P = await openPage(target, engine, sc.id, { mode });
    const m = await selectedSeparation(P, { save: save ? path.join(save, `${sc.id}-${engine}-${mode}`) : null });
    const j = judgeT3(m);
    const gating = sc.gating && T3_MODES.includes(mode);
    const label = `${sc.id} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"}`;
    // HARNESS §1.4: a migrated arm the route did not supply renders no items; it is UNMEASURED, never a FAIL
    // (D4-F block test F1-4, which counted 15 absent arms as FAILs)
    if (sc.arm === "migrated" && m.items === 0) {
      cells.push({ gating, pass: null, scene: sc.id, arm: sc.arm, mode, m, line: `${label} · no migration for this site (0 items): UNMEASURED` });
      await P.close();
      continue;
    }
    cells.push({ gating, pass: P.modeOk ? j.pass : false, scene: sc.id, arm: sc.arm, mode, m, line: `${label} · ${j.line}` });
    if (fill) cells.push({ gating: false, pass: j.fillPass ?? false, scene: sc.id, arm: sc.arm, mode, fillOnly: true, line: `${label} · ${j.fillLine}` });
    await P.close();
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-3", async (args, target) => {
    const engine = engineOf(args);
    const scenes = scenesFor(await sceneList(target, engine), "T-3");
    return { id: "T-3", title: "the selected state separates ≥ 3:1 on painted pixels (light, dark, PRT), fill reported apart", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells: await t3Cells(target, engine, scenes, { save: typeof args.save === "string" ? args.save : null }) };
  });
}
