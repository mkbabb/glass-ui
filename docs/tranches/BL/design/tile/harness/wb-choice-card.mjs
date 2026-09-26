#!/usr/bin/env node
// W-B (D4-B, the choice card) · Every multi-line one-of-N site composes the choice card, and the card's
// contract holds. Cells: (1) the build exports a choice group and card (window.__tile.exports, read at
// runtime from the bundle); (2) on every W-B scene, each item holding more than one row of content is a
// [data-slot="choice-card"] whose role is `radio`, whose used corner is 16 px, with one stop of any kind between
// the sentinels; (3) all four arrows move and check (H-5, Q-4 (b)); (4) its selected state separates ≥ 3:1 in
// light, dark and PRT (T-3's measurement). HEAD has no such primitive: cells (1)-(2) are RED by absence.
//   node wb-choice-card.mjs --build <dir> | --fixture [--fault wb] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2 } from "./lib.mjs";
import { tagItems, axRoles, tabStops, arrowCells } from "./measure.mjs";
import { t3Cells, T3_MODES } from "./t3-selected-separates.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-B", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const scenes = scenesFor(await sceneList(target, engine), "W-B", { info: false, arms: false });
    let P = await openPage(target, engine, scenes[0]?.id ?? "__index");
    const exp = await P.page.evaluate(() => window.__tile.exports);
    await P.close();
    const has = ["ChoiceGroup", "ChoiceCard"].every((n) => exp.includes(n));
    cells.push({ gating: true, pass: has, line: `exports · ${has ? "ChoiceGroup, ChoiceCard present" : `RED by absence: no ChoiceGroup/ChoiceCard in the bundle (exports seen: [${exp.join(", ") || "none"}])`}` });
    for (const sc of scenes) {
      P = await openPage(target, engine, sc.id);
      await tagItems(P);
      const its = await P.page.evaluate(() => window.__th.items().map((e) => ({ slot: e.getAttribute("data-slot"), rows: window.__th.rows(e), used: window.__th.corner(e).used })));
      const ax = await axRoles(P);
      const stops = (await tabStops(P)).length;
      const multi = its.map((x, i) => ({ ...x, role: ax.items[i]?.role })).filter((x) => x.rows > 1);
      const ok = multi.length > 0 && multi.every((x) => x.slot === "choice-card" && x.role === "radio" && Math.abs(x.used - 16) <= 0.5) && stops === 1;
      cells.push({ gating: true, pass: ok, scene: sc.id, line: `${sc.id} · ${multi.length} multi-line items · slots [${[...new Set(multi.map((x) => x.slot))].join(",")}] · roles [${[...new Set(multi.map((x) => x.role))].join(",")}] (${ax.via}) · used corner ${[...new Set(multi.map((x) => f2(x.used)))].join(",")} · tab stops ${stops}` });
      await P.close();
      P = await openPage(target, engine, sc.id);
      cells.push(...(await arrowCells(P, sc, { gating: true, label: `${sc.id} arrows` })));
      await P.close();
    }
    for (const c of await t3Cells(target, engine, scenes, { modes: T3_MODES, fill: false })) cells.push({ ...c, gating: true, line: `contract T-3 ${c.line}` });
    return { id: "W-B", title: "every multi-line one-of-N site composes the choice card (D4-B)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
