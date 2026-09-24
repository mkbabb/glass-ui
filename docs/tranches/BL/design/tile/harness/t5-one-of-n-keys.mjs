#!/usr/bin/env node
// T-5 · One-of-N ARIA and keys: the CDP accessibility tree reads the group as `radiogroup` and every item as
// `radio` carrying a checked state; Tab from the sentinel before the group to the one after passes exactly one
// item stop; and arrows move AND check: in a grid all four arrows, in a row the two axis arrows (the cross
// arrows are reported). Every key is a real key press; every start is a real pointer click. Chromium only
// (the accessibility tree is read over CDP).
//   node t5-one-of-n-keys.mjs --build <dir> | --fixture [--fault t5]
import { cli, openPage, sceneList, scenesFor, engineVersion } from "./lib.mjs";
import { axRoles, tabStops, layout, neighbours, arrow } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-5", async (args, target) => {
    const engine = "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-5")) {
      let P = await openPage(target, engine, sc.id);
      const ax = await axRoles(P);
      const roles = [...new Set(ax.items.map((i) => i.role))].join(",");
      const checked = ax.items.every((i) => i.checked !== undefined);
      cells.push({ gating: sc.gating, pass: ax.group.role === "radiogroup" && ax.items.every((i) => i.role === "radio") && checked, scene: sc.id,
        line: `${sc.id} ARIA · group ${ax.group.role} · items ${roles} · checked ${ax.items.map((i) => i.checked ?? "-").join("")} · pressed ${ax.items.map((i) => i.pressed ?? "-").join("")} · selected ${ax.items.map((i) => i.selected ?? "-").join("")}` });
      const stops = await tabStops(P);
      const itemStops = stops.filter((s) => typeof s === "number");
      cells.push({ gating: sc.gating, pass: itemStops.length === 1, scene: sc.id, line: `${sc.id} tab stops · ${itemStops.length} item stop(s) [${stops.join(" → ")}]` });
      await P.close();
      P = await openPage(target, engine, sc.id);
      await axRoles(P); // tags items
      const nb = neighbours(await layout(P));
      const axis = nb.grid ? ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"] : nb.vertical ? ["ArrowDown", "ArrowUp"] : ["ArrowRight", "ArrowLeft"];
      for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
        const start = nb.start[key];
        const gate = sc.gating && axis.includes(key);
        if (!start) { cells.push({ gating: gate, pass: gate ? false : null, scene: sc.id, line: `${sc.id} ${key} · no item has a neighbour that way` }); continue; }
        const r = await arrow(P, start, key);
        cells.push({ gating: gate, pass: r.moved && r.checked, scene: sc.id,
          line: `${sc.id} ${nb.grid ? "grid" : nb.vertical ? "column" : "row"} ${key} from #${start.i} · focus ${r.before} → ${r.after} · moved ${r.moved} · checked ${r.checked}${r.scripted ? " (the click did not focus; focus placed by script)" : ""}${axis.includes(key) ? "" : " (cross axis, reported)"}` });
      }
      await P.close();
    }
    return { id: "T-5", title: "one-of-N ARIA, one tab stop, arrows move and check", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
