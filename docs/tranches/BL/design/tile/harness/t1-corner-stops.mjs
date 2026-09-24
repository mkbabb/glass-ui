#!/usr/bin/env node
// T-1 · Curvature does not track content: past its control rung, a holder's used corner stops growing and
// equals a named role rung. Per item: the used corner (CSS Backgrounds 3 §5.5 overlap rule) at mount and with
// one and two added lines; PASS when every reading past the rung is one value that a named --radius-* role
// resolves to in the item's own context.
//   node t1-corner-stops.mjs --build <dir> | --fixture [--fault t1] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion } from "./lib.mjs";
import { tagItems, cornerStory, judgeT1, stepLine } from "./measure.mjs";

export async function t1Cells(target, engine, scenes) {
  const cells = [];
  for (const sc of scenes) {
    const P = await openPage(target, engine, sc.id);
    const n = await tagItems(P);
    const seen = new Set();
    for (let i = 0; i < n; i++) {
      const st = await cornerStory(P, i);
      const key = `${st.holder}|${st.steps[0].w.toFixed(0)}x${st.steps[0].h.toFixed(0)}`;
      if (seen.has(key)) continue; // one reading per distinct holder and size
      seen.add(key);
      const j = judgeT1(st);
      cells.push({ gating: sc.gating, pass: j.pass, scene: sc.id, story: st,
        line: `${sc.id} #${i} ${st.holder} rung ${st.rung.toFixed(1)} · ${stepLine(st)} · ${j.pass === null ? j.why : `named ${j.named ?? "none"}, flat ${j.flat}`}` });
    }
    await P.close();
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-1", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const scenes = scenesFor(await sceneList(target, engine), "T-1");
    return { id: "T-1", title: "past its rung, the used corner stops growing and equals a named role rung", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells: await t1Cells(target, engine, scenes) };
  });
}
