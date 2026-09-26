#!/usr/bin/env node
// W-A (D4-A, the corner reads the box) · Curvature never tracks content: for every library holder on the
// control role, adding a line leaves its used corner unchanged, and a one-line box stays at h/2. Per holder in the
// W-A scenes: the one-line reading must be h/2 (±0.5 px) and the one- and two-added-line readings must equal it
// (±0.5 px), read framed (after the mutation's frame painted; the synchronous read is reported). H-1: three cells,
// a fine pointer, a coarse pointer and --ui-scale 1.25.
//   node wa-curvature-content.mjs --build <dir> | --fixture [--fault wa] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2 } from "./lib.mjs";
import { tagItems, cornerStory, stepLine } from "./measure.mjs";
import { T1_CELLS } from "./t1-corner-stops.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-A", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "W-A")) for (const cell of T1_CELLS) {
      const P = await openPage(target, engine, sc.id, cell.opts);
      const n = await tagItems(P);
      for (let i = 0; i < n; i++) {
        const st = await cornerStory(P, i);
        const [s0, s1, s2] = st.steps;
        const stadium = Math.abs(s0.used - s0.h / 2) <= 0.5;
        const flat = Math.abs(s1.used - s0.used) <= 0.5 && Math.abs(s2.used - s0.used) <= 0.5;
        const syncFlat = Math.abs(st.sync[1].used - s0.used) <= 0.5 && Math.abs(st.sync[2].used - s0.used) <= 0.5;
        cells.push({ gating: sc.gating, pass: P.modeOk && stadium && flat, scene: sc.id, cell: cell.name,
          line: `${sc.id} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} ${st.holder} · ${stepLine(st)} · one line at h/2 ${stadium}, unchanged by lines ${flat} (Δ ${f2(s2.used - s0.used)} px)${syncFlat === flat ? "" : `; synchronous read ${syncFlat ? "flat" : "grows"}`}` });
      }
      await P.close();
    }
    return { id: "W-A", title: "curvature never tracks content (D4-A), fine, coarse, --ui-scale", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
