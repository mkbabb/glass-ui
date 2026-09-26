#!/usr/bin/env node
// T-2 · A one-line item stays a stadium: every item of a gating scene is at its rung (±0.5 px) and uses a corner
// of exactly half its height (±0.5 px). H-2: a gated item that has left its rung FAILS ("left its rung"); it is
// never skipped, so a library that turns a pill into a cell cannot pass by making the pill taller.
//   node t2-one-line-stadium.mjs --build <dir> | --fixture [--fault t2] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2 } from "./lib.mjs";
import { tagItems } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-2", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-2")) {
      const P = await openPage(target, engine, sc.id);
      await tagItems(P);
      const rows = await P.page.evaluate(() => window.__th.items().map((el) => {
        const th = window.__th, c = th.corner(el), minB = parseFloat(getComputedStyle(el).minBlockSize) || 0;
        return { w: c.w, h: c.h, used: c.used, computed: c.computed, rung: minB > 0 ? minB : th.rung(el), rows: th.rows(el) };
      }));
      rows.forEach((r, i) => {
        const atRung = r.h <= r.rung + 0.5;
        const stadium = Math.abs(r.used - r.h / 2) <= 0.5;
        cells.push({ gating: sc.gating, pass: atRung && stadium, scene: sc.id, arm: sc.arm,
          line: `${sc.id} #${i} ${f2(r.w)}×${f2(r.h)} rung ${f2(r.rung)} ${r.computed}→${f2(r.used)} (÷h/2 ${f2(r.used / (r.h / 2))}), ${r.rows} row(s)${atRung ? "" : ` · left its rung (${f2(r.h / r.rung)} rungs)`}` });
      });
      await P.close();
    }
    return { id: "T-2", title: "a one-line item stays a stadium, and a gated pill never leaves its rung", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
