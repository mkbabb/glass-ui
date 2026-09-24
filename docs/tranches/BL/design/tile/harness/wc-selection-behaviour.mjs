#!/usr/bin/env node
// W-C (D4-C, selection as a behaviour) · A Card (or Surface) inside a selection group is a `radio` with one
// tab stop and working arrows, and Card declares no role or tabindex of its own. Cells: (1) the build exports
// SelectionGroup and SelectionItem; (2) on every W-C scene, the CDP accessibility tree reads the items as
// `radio` in a `radiogroup`, Tab passes one item stop, and every arrow that has a neighbour moves and checks;
// (3) a bare Card with `selected` absent carries no role and no tabindex (the stamp belongs to the group).
// HEAD has no SelectionGroup: cell (1) is RED by absence; (2) and (3) are measured on Card's own arm.
//   node wc-selection-behaviour.mjs --build <dir> | --fixture [--fault wc]
import { cli, openPage, sceneList, scenesFor, engineVersion } from "./lib.mjs";
import { axRoles, tabStops, layout, neighbours, arrow } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-C", async (args, target) => {
    const engine = "chromium";
    const cells = [];
    const scenes = scenesFor(await sceneList(target, engine), "W-C", { info: false });
    let P = await openPage(target, engine, scenes[0]?.id ?? "__index");
    const exp = await P.page.evaluate(() => window.__tile.exports);
    await P.close();
    const has = ["SelectionGroup", "SelectionItem"].every((n) => exp.includes(n));
    cells.push({ gating: true, pass: has, line: `exports · ${has ? "SelectionGroup, SelectionItem present" : `RED by absence: no SelectionGroup/SelectionItem in the bundle (exports seen: [${exp.join(", ") || "none"}])`}` });
    for (const sc of scenes) {
      P = await openPage(target, engine, sc.id);
      const ax = await axRoles(P);
      const stops = (await tabStops(P)).filter((s) => typeof s === "number").length;
      const roleOk = ax.group.role === "radiogroup" && ax.items.every((i) => i.role === "radio");
      cells.push({ gating: true, pass: roleOk && stops === 1, scene: sc.id, line: `${sc.id} · group ${ax.group.role} · items ${[...new Set(ax.items.map((i) => i.role))].join(",")} · tab stops ${stops}` });
      const nb = neighbours(await layout(P));
      for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
        const start = nb.start[key];
        if (!start) continue;
        const r = await arrow(P, start, key);
        cells.push({ gating: true, pass: r.moved && r.checked, scene: sc.id, line: `${sc.id} ${key} from #${start.i} · focus ${r.before} → ${r.after} · checked ${r.checked}` });
      }
      // (3) the item's own stamp: with the group's attributes stripped from reach, what does the item declare?
      const own = await P.page.evaluate(() => {
        const el = window.__th.items()[0];
        return { role: el.getAttribute("role"), tabindex: el.getAttribute("tabindex"), stampedByGroup: el.hasAttribute("data-selection-item") };
      });
      cells.push({ gating: true, pass: own.stampedByGroup || (own.role === null && own.tabindex === null), scene: sc.id, line: `${sc.id} item's own stamp · role ${own.role} · tabindex ${own.tabindex} · group-stamped ${own.stampedByGroup}` });
      await P.close();
    }
    return { id: "W-C", title: "selection is a behaviour, not a component (D4-C)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
