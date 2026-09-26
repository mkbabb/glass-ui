#!/usr/bin/env node
// T-5 · One-of-N ARIA and keys. The accessibility tree reads the group as `radiogroup` and every item as `radio`
// carrying a checked state (Chromium: CDP; Playwright WebKit: Playwright's aria snapshot plus DOM states); keyboard
// traversal from the sentinel before the group to the one after meets exactly ONE stop of any kind (H-5: items,
// descendants, a focusable scroll port); and all four arrows move AND check per Q-4 (b): geometric in a grid, a
// linear step where no item lies that way (so the cross axis of a one-line row or column moves too).
// Scene flags add cells (H-10): `deselect` (Q-6 (a): with the model matching no value nothing is checked and the
// one stop is the first item), `reorder` (after a keyed reorder the arrows follow the new order), `descendant`
// (an arrow typed in an <input> inside a tile stays in the input and moves no selection; production behaviour,
// labelled with the build flavour, H-9), `multi` (N-of-M, Q-7 (a): every item carries a pressed or checked state
// and Space toggles it; stops and arrows reported).
// Every key is a real key press. Chromium starts arrows with a real click; Playwright WebKit with focus + Space.
//   node t5-one-of-n-keys.mjs --build <dir> | --fixture [--fault t5] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf } from "./lib.mjs";
import { axRoles, tabStops, arrowCells, tagItems, arrow, layout } from "./measure.mjs";

const states = (ax, k) => ax.items.map((i) => i[k] ?? "-").join("");

async function descendantCell(target, engine, sc) {
  const P = await openPage(target, engine, sc.id);
  await tagItems(P);
  const has = await P.page.evaluate(() => { const i = document.querySelector("[data-descendant]"); if (!i) return false; i.focus(); return true; });
  if (!has) { await P.close(); return { gating: sc.gating, pass: false, scene: sc.id, line: `${sc.id} interactive descendant · no [data-descendant] in the scene` }; }
  const before = await P.page.evaluate(() => ({ a: window.__th.active(), sel: JSON.stringify(window.__tile.selected()) }));
  await P.page.keyboard.press("ArrowRight");
  await P.page.waitForTimeout(200);
  const after = await P.page.evaluate(() => ({ a: window.__th.active(), sel: JSON.stringify(window.__tile.selected()) }));
  await P.close();
  const pass = after.a === before.a && after.sel === before.sel;
  return { gating: sc.gating, pass, scene: sc.id, line: `${sc.id} interactive descendant (flavor ${target.meta.flavor ?? "?"}) · ArrowRight typed in the <input> · focus ${before.a} → ${after.a} · selection ${before.sel} → ${after.sel}` };
}

async function multiCells(target, engine, sc) {
  const cells = [];
  const P = await openPage(target, engine, sc.id);
  const ax = await axRoles(P);
  const stated = ax.items.every((i) => i.pressed !== undefined || i.checked !== undefined);
  cells.push({ gating: sc.gating, pass: stated, scene: sc.id, arm: sc.arm, line: `${sc.id} N-of-M ARIA (${ax.via}) · group ${ax.group.role} · items ${[...new Set(ax.items.map((i) => i.role))].join(",")} · pressed ${states(ax, "pressed")} · checked ${states(ax, "checked")}` });
  const u = await P.page.evaluate(() => { const th = window.__th; return th.items().findIndex((e) => !th.on(e)); });
  await P.page.evaluate((i) => document.querySelector(`[data-th-idx="${i}"]`).focus(), u);
  const on0 = await P.page.evaluate((i) => window.__th.on(document.querySelector(`[data-th-idx="${i}"]`)), u);
  await P.page.keyboard.press("Space"); await P.page.waitForTimeout(200);
  const on1 = await P.page.evaluate((i) => window.__th.on(document.querySelector(`[data-th-idx="${i}"]`)), u);
  await P.page.keyboard.press("Space"); await P.page.waitForTimeout(200);
  const on2 = await P.page.evaluate((i) => window.__th.on(document.querySelector(`[data-th-idx="${i}"]`)), u);
  cells.push({ gating: sc.gating, pass: !on0 && on1 && !on2, scene: sc.id, arm: sc.arm, line: `${sc.id} N-of-M Space toggles #${u} · ${on0} → ${on1} → ${on2}` });
  await P.close();
  const Q = await openPage(target, engine, sc.id);
  const stops = await tabStops(Q);
  cells.push({ gating: false, pass: stops.length >= 1, scene: sc.id, arm: sc.arm, line: `${sc.id} N-of-M tab stops (reported) · ${stops.length} [${stops.join(" → ")}]${Q.keys.note}` });
  await Q.close();
  return cells;
}

export async function t5Cells(target, engine, sc) {
  if (sc.descendant) return [await descendantCell(target, engine, sc)];
  if (sc.multi) return multiCells(target, engine, sc);
  const cells = [];
  const c = (pass, line, gating = sc.gating) => cells.push({ gating, pass, scene: sc.id, arm: sc.arm, line });
  let P = await openPage(target, engine, sc.id);
  const ax = await axRoles(P);
  const checked = ax.items.every((i) => i.checked !== undefined);
  c(ax.group.role === "radiogroup" && ax.items.every((i) => i.role === "radio") && checked,
    `${sc.id} ARIA (${ax.via}) · group ${ax.group.role} · items ${[...new Set(ax.items.map((i) => i.role))].join(",")} · checked ${states(ax, "checked")} · pressed ${states(ax, "pressed")} · selected ${states(ax, "selected")}`);
  const stops = await tabStops(P);
  const itemStops = stops.filter((s) => typeof s === "number").length;
  c(stops.length === 1 && itemStops === 1, `${sc.id} tab stops · ${stops.length} stop(s) between the sentinels, ${itemStops} of them items [${stops.join(" → ")}]${P.keys.note}`);
  await P.close();
  P = await openPage(target, engine, sc.id);
  cells.push(...(await arrowCells(P, sc, { gating: sc.gating })).map((x) => ({ ...x, scene: sc.id, arm: sc.arm })));
  await P.close();
  if (sc.deselect && sc.arm === "library") {
    P = await openPage(target, engine, sc.id, { query: { sel: "none" } });
    const a2 = await axRoles(P);
    const none = a2.items.every((i) => i.checked !== undefined && String(i.checked) !== "true");
    const s2 = await tabStops(P);
    c(none && s2.length === 1 && s2[0] === 0, `${sc.id} no selection (Q-6 a) · checked ${states(a2, "checked")} · stops [${s2.join(" → ")}] (want nothing checked and one stop, the first item)`);
    await P.close();
  }
  if (sc.reorder && sc.arm === "library") {
    P = await openPage(target, engine, sc.id);
    await P.page.evaluate(() => window.__tile.reorder());
    await P.page.waitForTimeout(250);
    await tagItems(P);
    const L = await layout(P);
    const first = L[0], last = L[L.length - 1];
    const r1 = await arrow(P, first, "ArrowRight");
    c(r1.after === 1 && r1.checked, `${sc.id} keyed reorder · ArrowRight from DOM #0 · focus ${r1.before} → ${r1.after} (want 1, the new order's next) · checked ${r1.checked}`);
    const r2 = await arrow(P, last, "ArrowDown");
    c(r2.after === 0 && r2.checked, `${sc.id} keyed reorder · ArrowDown from DOM #${last.i} (no item below: the linear step) · focus ${r2.before} → ${r2.after} (want 0) · checked ${r2.checked}`);
    await P.close();
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-5", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-5")) cells.push(...(await t5Cells(target, engine, sc)));
    return { id: "T-5", title: "one-of-N ARIA, one tab stop, all four arrows move and check (Q-4 b), no selection, reorder, descendants, N-of-M", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
