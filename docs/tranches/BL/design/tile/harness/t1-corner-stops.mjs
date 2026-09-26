#!/usr/bin/env node
// T-1 · Curvature does not track content: past its control rung, a holder's used corner stops growing and meets
// the ruled bound (H-1, Q-1 default (a)). A tile, a multi-line selectable holder, uses `--radius-field` as the
// document root resolves it; a control whose label wraps keeps rung/2. Per item: the used corner (CSS
// Backgrounds 3 §5.5 overlap rule) at mount and with one and two added lines, each added-line reading framed
// (after the mutation's frame painted; the synchronous reading is reported beside it). Three cells per scene:
// a fine pointer, a coarse pointer (the library lifts --ui-scale to its coarse default) and --ui-scale 1.25.
//   node t1-corner-stops.mjs --build <dir> | --fixture [--fault t1] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf } from "./lib.mjs";
import { tagItems, cornerStory, judgeT1, stepLine } from "./measure.mjs";

export const T1_CELLS = [
  { name: "fine", opts: {} },
  { name: "coarse", opts: { coarse: true } },
  { name: "ui-scale", opts: { uiScale: 1.25 } },
];

export async function t1Cells(target, engine, scenes, { cells: which = T1_CELLS } = {}) {
  const cells = [];
  for (const sc of scenes) for (const cell of which) {
    const P = await openPage(target, engine, sc.id, cell.opts);
    const n = await tagItems(P);
    const seen = new Set();
    const holder = sc.holder ?? "tile";
    for (let i = 0; i < n; i++) {
      const st = await cornerStory(P, i);
      const key = `${st.holder}|${st.steps[0].w.toFixed(0)}x${st.steps[0].h.toFixed(0)}`;
      if (seen.has(key)) continue; // one reading per distinct holder and size
      seen.add(key);
      const j = judgeT1(st, holder);
      cells.push({ gating: sc.gating, pass: P.modeOk ? j.pass : false, scene: sc.id, arm: sc.arm, cell: cell.name, story: st,
        line: `${sc.id} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} #${i} ${st.holder} (${holder}) rung ${st.rung.toFixed(1)} · ${stepLine(st)} · ${j.pass === null ? j.why : `bound ${j.bound}: ${j.pass ? "met" : "missed"}${j.syncOk === j.pass ? "" : ` (synchronous read ${j.syncOk ? "meets" : "misses"} it)`}; root names ${j.named ?? "none"}`}` });
    }
    await P.close();
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-1", async (args, target) => {
    const engine = engineOf(args);
    const scenes = scenesFor(await sceneList(target, engine), "T-1");
    return { id: "T-1", title: "past its rung, the used corner meets the ruled bound (tile: root --radius-field; wrapped control: rung/2), fine, coarse, --ui-scale", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells: await t1Cells(target, engine, scenes) };
  });
}
