#!/usr/bin/env node
// W-E (D4-E, no multi-line selectable) · Every one-of-N option is one line, and the library refuses one that
// is not. Cells: (1) on every W-E scene, every item holds one row of content and its block size is at its rung
// (±0.5 px); (2) the refusal: on the same page, the witness appends a line to the first item and waits 600 ms;
// the library must log a console error or throw (any build; a DEV-only guard needs `build.mjs --dev`).
//   node we-one-line.mjs --build <dir> | --fixture [--fault we] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, f2 } from "./lib.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-E", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "W-E")) {
      const P = await openPage(target, engine, sc.id);
      const rows = await P.page.evaluate(() => window.__th.items().map((el) => {
        const th = window.__th, minB = parseFloat(getComputedStyle(el).minBlockSize) || 0;
        return { h: th.size(el).h, rung: minB > 0 ? minB : th.rung(el), rows: th.rows(el) };
      }));
      const bad = rows.filter((r) => r.rows > 1 || r.h > r.rung + 0.5);
      cells.push({ gating: sc.gating, pass: bad.length === 0, scene: sc.id, line: `${sc.id} · ${rows.length} items · ${bad.length} not one line · e.g. ${f2(rows[0].h)} px tall at rung ${f2(rows[0].rung)} (${f2(rows[0].h / rows[0].rung)} rungs), ${rows[0].rows} rows` });
      const before = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
      await P.page.evaluate(() => window.__th.addLine(window.__th.items()[0]));
      await P.page.waitForTimeout(600);
      const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").slice(before);
      cells.push({ gating: sc.gating, pass: errs.length > 0, scene: sc.id, line: `${sc.id} refusal · a line added to item 0 → ${errs.length ? `refused: ${errs[0].text.slice(0, 120)}` : "no refusal (no console error, no throw)"}${target.meta.dev ? "" : " · production build"}` });
      await P.close();
    }
    return { id: "W-E", title: "every one-of-N option is one line (D4-E)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
