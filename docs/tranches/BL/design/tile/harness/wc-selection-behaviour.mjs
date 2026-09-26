#!/usr/bin/env node
// W-C (D4-C, selection as a behaviour) · A Card (or Surface) inside a selection group is a `radio` with one
// tab stop and working arrows, and the group's stamp carries the right values. Cells: (1) the build exports
// SelectionGroup and SelectionItem; (2) on every W-C scene the items read `radio` in a `radiogroup`, one stop of any
// kind between the sentinels; (3) all four arrows move and check (Q-4 (b)); (4) H-5, the stamp's VALUES, not its
// presence: every item carries role="radio", aria-checked equal to whether it is the model's value, and a roving
// tabindex (0 on the selected item, -1 on the rest), after the initial render and after an arrow commit. An item
// whose group stamp is present but stale, or that declares its own role or tabindex, fails.
// HEAD has no SelectionGroup: cell (1) is RED by absence; the rest are measured on Card's own arm.
//   node wc-selection-behaviour.mjs --build <dir> | --fixture [--fault wc] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf } from "./lib.mjs";
import { axRoles, tabStops, arrowCells, tagItems } from "./measure.mjs";

const stampRead = (P) => P.page.evaluate(() => {
  const th = window.__th, its = th.items(), sel = window.__tile.selected();
  const vals = its.map((e) => ({ role: e.getAttribute("role"), checked: e.getAttribute("aria-checked"), tabindex: e.getAttribute("tabindex"), stamped: e.hasAttribute("data-selection-item") }));
  // the model's truth: an index from the fixture; a build's model value, located by the item's own data-state
  // (the library's state attribute, not the ARIA stamp under test)
  const s = typeof sel === "number" ? sel : its.findIndex((e) => e.getAttribute("data-state") === "on");
  const ok = vals.every((v, i) => v.role === "radio" && v.checked === String(i === s) && v.tabindex === (i === s ? "0" : "-1"));
  return { ok, s, text: vals.map((v) => `${v.role}/${v.checked}/${v.tabindex}${v.stamped ? "*" : ""}`).join(" ") };
});

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("W-C", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const scenes = scenesFor(await sceneList(target, engine), "W-C", { info: false, arms: false });
    let P = await openPage(target, engine, scenes[0]?.id ?? "__index");
    const exp = await P.page.evaluate(() => window.__tile.exports);
    await P.close();
    const has = ["SelectionGroup", "SelectionItem"].every((n) => exp.includes(n));
    cells.push({ gating: true, pass: has, line: `exports · ${has ? "SelectionGroup, SelectionItem present" : `RED by absence: no SelectionGroup/SelectionItem in the bundle (exports seen: [${exp.join(", ") || "none"}])`}` });
    for (const sc of scenes) {
      P = await openPage(target, engine, sc.id);
      const ax = await axRoles(P);
      const stops = (await tabStops(P)).length;
      const roleOk = ax.group.role === "radiogroup" && ax.items.every((i) => i.role === "radio");
      cells.push({ gating: true, pass: roleOk && stops === 1, scene: sc.id, line: `${sc.id} · group ${ax.group.role} · items ${[...new Set(ax.items.map((i) => i.role))].join(",")} (${ax.via}) · tab stops ${stops}` });
      await P.close();
      P = await openPage(target, engine, sc.id);
      await tagItems(P);
      const s0 = await stampRead(P);
      cells.push({ gating: true, pass: s0.ok, scene: sc.id, line: `${sc.id} stamp values at rest (role/aria-checked/tabindex, * = group-stamped; selected #${s0.s}) · ${s0.text}` });
      cells.push(...(await arrowCells(P, sc, { gating: true })));
      const s1 = await stampRead(P);
      cells.push({ gating: true, pass: s1.ok, scene: sc.id, line: `${sc.id} stamp values after the arrow commits (selected #${s1.s}) · ${s1.text}` });
      await P.close();
    }
    return { id: "W-C", title: "selection is a behaviour, not a component (D4-C)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
