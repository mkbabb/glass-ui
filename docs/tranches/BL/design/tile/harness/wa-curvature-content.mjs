#!/usr/bin/env node
// W-A (D4-A, the corner reads the box) · Curvature never tracks content: for every library holder on the
// control role, adding a line leaves its used corner unchanged, and a one-line box stays at h/2. Per holder
// in the W-A scenes: the one-line reading must be h/2 (±0.5 px) and the one- and two-added-line readings must
// equal it (±0.5 px). Either of A's arms passes (A1 rung/2 or A2 the field rung) only if the grown corner is
// the one-line corner, so this witness is A1's; A2 is judged by T-1 (the grown corner is a named role rung).
//   node wa-curvature-content.mjs --build <dir> | --fixture [--fault wa] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, f2 } from "./lib.mjs";
import { tagItems, cornerStory, stepLine } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-A", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "W-A")) {
      const P = await openPage(target, engine, sc.id);
      const n = await tagItems(P);
      for (let i = 0; i < n; i++) {
        const st = await cornerStory(P, i);
        const [s0, s1, s2] = st.steps;
        const stadium = Math.abs(s0.used - s0.h / 2) <= 0.5;
        const flat = Math.abs(s1.used - s0.used) <= 0.5 && Math.abs(s2.used - s0.used) <= 0.5;
        cells.push({ gating: sc.gating, pass: stadium && flat, scene: sc.id, line: `${sc.id} ${st.holder} · ${stepLine(st)} · one line at h/2 ${stadium}, unchanged by lines ${flat} (Δ ${f2(s2.used - s0.used)} px)` });
      }
      await P.close();
    }
    return { id: "W-A", title: "curvature never tracks content (D4-A)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
