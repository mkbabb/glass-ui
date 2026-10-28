#!/usr/bin/env node
// T-4 · Focus paints whole and apart from selection: the item is reached by keyboard traversal (a real key press;
// Option+Tab in Playwright WebKit) from the sentinel before the group, and compared against itself unfocused.
// Along the middle 60 % of every side, the band outside its curved edge must carry ≥ 1.5 px of painted ring (10th
// percentile), so a ring cut by its host or replaced by other paint fails. H-6: the focused item's computed
// `outline-style` must not be `auto` (the UA's focus indicator, which the pixels alone cannot tell from the ring
// in light). Two cells per scene: nothing selected and an item selected, so selection paint cannot stand in for
// the ring. Light and dark gate. H3-8: forced colours gate the ring's reach (≥ 1.5 px on every side, so a host that
// pads less than the forced-colours ring reaches fails; pass 2 read 1.00 px on one side of specimen-migrated, `D′c` §7).
//
// H9 · L-5, SELECTION CHANGES NO GEOMETRY FOR ANY CONTENT (INBOUND O-103e, in T-4's fold; REGISTRY §P9-2, §P9-6). On a
// build whose route migrates C1, the ladder scene `c1-ladder-migrated` (scenes.mjs `LADDER`, `c1Ladder`: the route's
// C1 group at its own 192 px holding 17 labels of 14 to 30 characters) is read at 390×844 and 1440×900, light, dark
// and PRT. Each option is selected in turn by a real click (pointer parked after), and again by keys (Tab in from the
// sentinel, Space on the first option, then ArrowDown through the rest). After each selection the page settles (no
// running animation) and every option, its label's line count and the group are read with transforms, transitions
// and animations neutralised for the read. Two boxes per element, both scroll-free: the `offsetTop` chain to the group
// (integers), and the border box relative to the group's (sub-pixel; the page scrolls under a click and both terms
// move with it, so no scroll is counted). The group's own box is its size and its offset from the scene root.
//   ladder      gating per viewport × mode × path: every option, every label's line count and the group equal at rest
//               and with each option selected, ±0.5 px; every selection must land (`data-state="on"` on the option the
//               step selects) or the cell fails as vacuous
//   falsifier   gating at 390×844 per mode × path: the 25-character label («Awaiting a reply from the», `l25`) keeps its
//               line count and its option's box when it is selected. Pass 9 read it 1 → 2 lines, +21 px, under the
//               selected weight 600; the planted library `weight-step` (plants.mjs) must FAIL it in both engines
// A build with no migrated C1 (HEAD, a route without C1, the fixture) has no ladder and prints one note.
//   node t4-ring-whole.mjs --build <dir> | --fixture [--fault t4] [--engine chromium|webkit] [--save <dir>]
import path from "node:path";
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2 } from "./lib.mjs";
import { ringCoverage, judgeT4 } from "./measure.mjs";
import { LADDER, LADDER_FALSIFIER } from "./scenes.mjs";

export const L5_VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
export const L5_MODES = ["light", "dark", "prt"];
const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";
/** every option's two scroll-free boxes, its label's line count, weight and state; the group's size and offset */
const L5_READ = (neutral) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const scene = document.querySelector("[data-scene]"), group = scene.querySelector("[data-group]");
  const g = group.getBoundingClientRect(), s = scene.getBoundingClientRect();
  const chain = (el) => { let x = 0, y = 0; for (let e = el; e && e !== group; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; };
  const rel = (el) => { const b = el.getBoundingClientRect(); return { x: b.left - g.left, y: b.top - g.top, w: b.width, h: b.height }; };
  const lines = (el) => { const t = el && [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()); if (!t) return 0; const rg = document.createRange(); rg.selectNodeContents(t); return new Set([...rg.getClientRects()].filter((q) => q.width > 0).map((q) => Math.round(q.top))).size; };
  const out = {
    group: { chain: { x: 0, y: 0, w: group.offsetWidth, h: group.offsetHeight }, rel: { x: g.left - s.left, y: g.top - s.top, w: g.width, h: g.height } },
    items: [...group.querySelectorAll("[data-item]")].map((el) => ({ chain: chain(el), rel: rel(el), lines: lines(el.querySelector("[data-line-slot]")), text: (el.querySelector("[data-line-slot]")?.textContent ?? "").trim(), fw: getComputedStyle(el).fontWeight, on: el.dataset.state === "on" })),
    scrollY,
  };
  st.remove(); return out;
};
const settle = async (page) => { await page.waitForTimeout(120); for (let t = 0; t < 80; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } await page.evaluate(() => window.__th.frame()); };
const dev = (a, b) => Math.max(...["x", "y", "w", "h"].map((k) => Math.abs(a[k] - b[k])));
/** the largest move of any option or the group between rest and one selected state, and any line-count change */
function compare(rest, now) {
  let max = 0, where = "", wraps = [];
  const gd = Math.max(dev(rest.group.chain, now.group.chain), dev(rest.group.rel, now.group.rel));
  if (gd > max) { max = gd; where = `group ${f2(rest.group.rel.w)}×${f2(rest.group.rel.h)} → ${f2(now.group.rel.w)}×${f2(now.group.rel.h)}`; }
  now.items.forEach((it, j) => {
    const r0 = rest.items[j], d = Math.max(dev(r0.chain, it.chain), dev(r0.rel, it.rel));
    if (d > max) { max = d; where = `option ${j} «${r0.text}» ${f2(r0.rel.w)}×${f2(r0.rel.h)} @${f2(r0.rel.y)} → ${f2(it.rel.w)}×${f2(it.rel.h)} @${f2(it.rel.y)}`; }
    if (it.lines !== r0.lines) wraps.push(`option ${j} «${r0.text}» ${r0.lines} → ${it.lines} lines`);
  });
  return { max, where, wraps };
}

/** H9 · L-5: one viewport × mode, both input paths; returns { click, keys } per-step reads and the rest read */
async function ladderRun(target, engine, vp, mode) {
  const P = await openPage(target, engine, "c1-ladder-migrated", { mode, query: { sel: "none" } });
  const { page } = P, n = LADDER.length;
  const run = { modeOk: P.modeOk, modeLabel: P.modeLabel, keyNote: P.keys.note, click: [], keys: [], restClick: null, restKeys: null };
  try {
    await page.setViewportSize(vp); await page.mouse.move(2, 2); await settle(page);
    if (await page.evaluate(() => !document.querySelector('[data-scene="c1-ladder-migrated"] [data-group]'))) throw new Error("c1-ladder-migrated renders no group");
    run.restClick = await page.evaluate(L5_READ, NEUTRAL);
    if (run.restClick.items.length !== n || run.restClick.items.some((it) => it.on)) throw new Error(`the ladder at rest has ${run.restClick.items.length} options (want ${n}) and ${run.restClick.items.filter((it) => it.on).length} on (want 0)`);
    const opts = page.locator("[data-scene] [data-item]");
    for (let k = 0; k < n; k++) { await opts.nth(k).click(); await page.mouse.move(2, 2); await settle(page); run.click.push({ k, read: await page.evaluate(L5_READ, NEUTRAL) }); }
    // keys: nothing selected, back to the top, Tab in from the sentinel, Space on the first option, ArrowDown on
    await page.evaluate(async () => { await window.__tile.select(null); document.activeElement?.blur?.(); scrollTo(0, 0); }); await settle(page);
    run.restKeys = await page.evaluate(L5_READ, NEUTRAL);
    await page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus());
    let first = -1;
    for (let t = 0; t < 4 && first < 0; t++) { // a focusable host may take the first stop, as measure.mjs tabIn allows
      await page.keyboard.press(P.keys.tab); await settle(page);
      first = await page.evaluate(() => { const a = document.activeElement; return a?.matches?.("[data-scene] [data-item]") ? [...document.querySelectorAll("[data-scene] [data-item]")].indexOf(a) : -1; });
    }
    if (first !== 0) throw new Error(`${P.keys.tab} from the sentinel landed on ${first < 0 ? "no ladder option" : `option ${first}`}, not option 0`);
    await page.keyboard.press("Space"); await settle(page);
    run.keys.push({ k: 0, key: "Space", read: await page.evaluate(L5_READ, NEUTRAL) });
    for (let k = 1; k < n; k++) { await page.keyboard.press("ArrowDown"); await settle(page); run.keys.push({ k, key: "ArrowDown", read: await page.evaluate(L5_READ, NEUTRAL) }); }
  } finally { await P.close(); }
  return run;
}
/** the ladder and falsifier cells of one run */
function ladderCells(run, vp, mode, engine) {
  const cells = [], fi = LADDER.findIndex((o) => o.value === LADDER_FALSIFIER), tag = `c1-ladder-migrated ${vp.width}×${vp.height} ${run.modeLabel}${run.modeOk ? "" : " (MODE NOT APPLIED)"}`;
  for (const [path, steps, rest] of [["click", run.click, run.restClick], ["keys", run.keys, run.restKeys]]) {
    let max = 0, where = "", wraps = [], missed = [];
    for (const { k, read } of steps) {
      if (!read.items[k]?.on || read.items.filter((it) => it.on).length !== 1) missed.push(k);
      const c = compare(rest, read);
      if (c.max > max) { max = c.max; where = `${c.where}, option ${k} selected`; }
      for (const w of c.wraps) wraps.push(`${w} (option ${k} selected, weight ${rest.items[k].fw} → ${read.items[k].fw})`);
    }
    const ok = run.modeOk && max <= 0.5 && wraps.length === 0 && missed.length === 0 && steps.length === LADDER.length;
    const how = path === "click" ? "each option by a real click" : `Space on option 0, then ArrowDown${run.keyNote ? ` (Tab in: ${engine === "webkit" ? "Option+Tab" : "Tab"})` : ""}`;
    cells.push({ gating: true, pass: ok, what: "L-5 ladder", line: `${tag} · L-5 ladder (O-103e) · ${how}, ${steps.length} selection(s) · want every option, every label's line count and the group unchanged from rest (±0.50 px; offset chain and border box to the group, scroll-free) · max ${f2(max)} px${where ? ` (${where})` : ""} · ${wraps.length ? `RE-WRAP ${wraps.length}: ${wraps.slice(0, 2).join("; ")}` : "no label re-wraps"}${missed.length ? ` · VACUOUS: the selection did not land on option(s) ${missed.join(", ")}` : ""} · rest group ${f2(rest.group.rel.w)}×${f2(rest.group.rel.h)}, weight rest → selected ${rest.items[0].fw} → ${steps[0]?.read.items[steps[0].k].fw ?? "?"}` });
    if (vp.width === 390) {
      const st = steps.find((s) => s.k === fi), r0 = rest.items[fi], r1 = st?.read.items[fi];
      const okF = run.modeOk && !!r1 && r1.on && r1.lines === r0.lines && Math.max(dev(r0.chain, r1.chain), dev(r0.rel, r1.rel)) <= 0.5;
      cells.push({ gating: true, pass: okF, what: "L-5 falsifier", line: `${tag} · L-5 falsifier «${r0.text}» (${r0.text.length} characters) by ${path} · want its line count and its option's box unchanged when it is selected · rest ${r0.lines} line(s), ${f2(r0.rel.w)}×${f2(r0.rel.h)}, weight ${r0.fw} → selected ${r1 ? `${r1.lines} line(s), ${f2(r1.rel.w)}×${f2(r1.rel.h)}, weight ${r1.fw}, ${r1.on ? "on" : "NOT ON (vacuous)"}` : "unread"}` });
    }
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-4", async (args, target) => {
    const engine = engineOf(args);
    const cells = [], notes = [];
    const list = await sceneList(target, engine);
    for (const sc of scenesFor(list, "T-4")) for (const mode of ["light", "dark", "forced"]) for (const sel of ["none", "1"]) {
      const P = await openPage(target, engine, sc.id, { mode, query: { sel } });
      const m = await ringCoverage(P, { save: typeof args.save === "string" ? path.join(args.save, `${sc.id}-${engine}-${mode}-sel${sel}`) : null });
      const j = judgeT4(m, { forced: mode === "forced" });
      cells.push({ gating: sc.gating, pass: P.modeOk ? j.pass : false, scene: sc.id, arm: sc.arm, mode, sel, m, line: `${sc.id} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} sel=${sel}${P.keys.note} · ${mode === "forced" ? "ring reach (H3-8) · " : ""}${j.line}` });
      await P.close();
    }
    // H9 · L-5 (O-103e), on the migrated arm when the route migrates C1
    if (target.kind === "build" && (list.migration?.sites ?? []).includes("c1")) {
      for (const vp of L5_VIEWPORTS) for (const mode of L5_MODES) {
        const run = await ladderRun(target, engine, vp, mode);
        for (const c of ladderCells(run, vp, mode, engine)) cells.push({ ...c, scene: "c1-ladder-migrated", arm: "migrated", mode, vp: `${vp.width}x${vp.height}` });
      }
    } else notes.push(`L-5 (H9): not read, ${target.kind === "build" ? `the build's route does not migrate C1 (migration ${list.migration?.label ?? "none"})` : "the fixture carries no ladder"}; the ladder is C1's anatomy on a route's migrated arm`);
    return { id: "T-4", title: "focus paints whole, is the library's ring, and stands apart from selection; selection changes no geometry for any content C1 holds (H9, L-5)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells, notes };
  });
}
