#!/usr/bin/env node
// FACT · H4-1 · "is a tile" has one spelling (REGISTRY §P3-6.2; rows R-10 and R-2). Promoted from the D′ critic's
// probe (`../pass-3/D4-Dp-crit/probes/fact-split.mjs`, `D′c` §2) with the fixture and plant it owed, and made
// route-neutral: it reads the shared attack compositions (`attack-route/`), which carry both live declarations, so
// every route reads the same cells. Build with `build.mjs <wt> --label <l>-atk --route <harness>/attack-route`.
// The tile fact is `--selection-tile` (floor v2: `none | flush | plated`, inherited, reset on every group). Each cell
// puts the fact and the declaration where they could disagree and reads what the item wears, in light and dark:
//   declared          the tile group's item 0 (`specimen-migrated`, `.atk-tile`): want a tile fact and the field
//                     corner (16 px, ±0.5)
//   pill-in-tile      a pill group nested inside the tile group (`.atk-pill-in`): want a pill (fact none, used corner
//                     h/2, one row)
//   pill-beside-tile  the same pill group beside the tile group (`.atk-pill-beside`), the control: want a pill
//   tile-in-pill      a pill group holding a one-item tile group (`v2-migrated`, `.atk-outer`'s own items): want a
//                     pill (F's nesting reach, `Fc` §2.4)
//   fact-plated       the library `preset` arm (undeclared, two-row K1 options) with the consumer writing
//                     `--selection-tile: plated` on the group: want agreement, either a tile fact on the field
//                     corner or the write refused (fact none and a one-row pill)
//   fact-flush        the same with `flush`
// An unset fact (HEAD, where the fact does not exist) reads as no tile fact. A build that is not an attack build
// reads UNMEASURED on every attack cell.
//
// H5-2 · THE MATRIX (REGISTRY §P4-6.2; rows R-10, R-2). Pass 4 found its two new cells by asking where the fact can be
// written against where it is read (`D′c` §2 the option, `Fc` §2.1 a group inside an option). The matrix asks it in
// full on `matrix-migrated`: seven write sites (ancestor, group, wrapper, option, content, nested-group,
// nested-option) × `none`, `flush`, `plated` × a tile group and a pill group, each written inline at mount
// (`?w=&v=`), plus the unwritten references. Each cell is judged by PAINT, never by the item's computed fact (a pinned
// value prints as agreement, `D′c` §4): the used corner, the box against its reference, the text rows, the rows inside
// the option's content (the one-row law), the children the pill's label rule clips, content cut past the box, and on
// a development flavour the names the read option draws (gating there: a name on it is a false name or a split).
// What each site must read:
//   reference       the tile group's options are tiles and its nested group pills; the pill group's options pills and
//                   its nested group tiles (`pill-in-option`, `tile-in-option`: F's N3)
//   ancestor        unchanged (every group resets the fact)
//   group           the value decides: none is a pill, flush and plated a tile
//   wrapper         agreement: the options behind it read one fact (a coherent pill or tile; which one is printed)
//   option, content unchanged: the option and its content carry their group's fact (`item-none-in-tile`,
//                   `item-flush-in-pill`, `content-writes-none`)
//   nested-group    the value decides for the nested group's options (it is a group of its own)
//   nested-option   unchanged (that option carries its own group's fact)
// Light reads the whole matrix; dark reads the references and the two option cells.
//   node fact-split.mjs --build <out>/builds/<label>-atk | --fixture --family atk [--fault atk-split] [--engine webkit]
import { cli, openPage, engineVersion, engineOf, f2 } from "./lib.mjs";
import { ATTACK_LABEL } from "./attack-route/migrated.mjs";

export const isAttack = (m) => !!m && (m.label === ATTACK_LABEL || m.attack === true);
export const noFact = (f) => f === "" || f === "none";
/** The item's fact, box, used corner (CSS Backgrounds §5.5), text rows and flex direction, after two frames. */
export const READ_ITEM = async (sel) => {
  await window.__th.frame();
  const el = document.querySelector(sel);
  if (!el) return null;
  const c = window.__th.corner(el), cs = getComputedStyle(el);
  const tops = [];
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let t = w.nextNode(); t; t = w.nextNode()) {
    if (!t.textContent.trim() || t.parentElement.closest("sup")) continue;
    const rg = document.createRange(); rg.selectNodeContents(t);
    for (const q of rg.getClientRects()) if (q.height > 0 && !tops.some((y) => Math.abs(y - q.top) < q.height / 2)) tops.push(q.top);
  }
  return { w: c.w, h: c.h, computed: c.computed, used: c.used, ratio: c.used / (c.h / 2), fact: cs.getPropertyValue("--selection-tile").trim(), dir: cs.flexDirection, rows: tops.length };
};
const desc = (r) => `fact ${r.fact || "(unset)"} · ${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.ratio)}×h/2) · ${r.rows} row(s) · ${r.dir}`;
const isPill = (r) => noFact(r.fact) && Math.abs(r.used - r.h / 2) <= 0.5 && r.rows <= 1;
const isTile = (r) => !noFact(r.fact) && Math.abs(r.used - 16) <= 0.5;
const CELLS = [
  { id: "declared", scene: "specimen-migrated", sel: "[data-scene] .atk-tile [data-item]", want: "tile" },
  { id: "pill-in-tile", scene: "specimen-migrated", sel: "[data-scene] .atk-pill-in [data-atk-item]", want: "pill" },
  { id: "pill-beside-tile", scene: "specimen-migrated", sel: "[data-scene] .atk-pill-beside [data-atk-item]", want: "pill" },
  { id: "tile-in-pill", scene: "v2-migrated", sel: "[data-scene] .atk-outer > [data-item]", want: "pill" },
  { id: "fact-plated", scene: "preset", write: "plated", sel: "[data-scene] [data-item]", want: "agree" },
  { id: "fact-flush", scene: "preset", write: "flush", sel: "[data-scene] [data-item]", want: "agree" },
];
export function judgeFact(want, r) {
  if (!r) return { pass: false, why: "no such element" };
  if (want === "tile") return { pass: isTile(r), why: isTile(r) ? "a tile on the field corner" : "NOT a tile on the field corner" };
  if (want === "pill") return { pass: isPill(r), why: isPill(r) ? "a pill at h/2 on one row" : noFact(r.fact) ? "a pill fact, but the item does not wear a one-row stadium: a declaration's geometry reached it" : "a tile fact reached a pill group's item" };
  const ok = isTile(r) || isPill(r);
  return { pass: ok, why: ok ? (isTile(r) ? "the written fact and the geometry agree: a tile on the field corner" : "the write is refused: a one-row pill") : `the written fact and the geometry DISAGREE${!noFact(r.fact) && r.ratio > 0.99 ? ": a LOZENGE" : ""}` };
}

// ── H5-2 · the matrix ─────────────────────────────────────────────────────────────────────────────────────────
export const MX_SITES = ["ancestor", "group", "wrapper", "option", "content", "nested-group", "nested-option"];
export const MX_VALUES = ["none", "flush", "plated"];
const READ_SITE = { reference: ["a", "b", "n0"], ancestor: ["a"], group: ["a"], wrapper: ["b"], option: ["a"], content: ["a"], "nested-group": ["n0"], "nested-option": ["n0"] };
/** Paint reads of matrix options (by `data-mx-item`), after two frames: box, used corner, rows, content rows, clip, cut. */
export const READ_MX = async (ids) => {
  await window.__th.frame();
  const out = {};
  for (const id of ids) {
    const el = document.querySelector(`[data-mx-item="${id}"]`);
    if (!el) { out[id] = null; continue; }
    const c = window.__th.corner(el), cs = getComputedStyle(el), box = el.getBoundingClientRect();
    const rowsIn = (root) => { // the midpoint chain over the text boxes that belong to this option, not to a nested one
      const boxes = [], rg = document.createRange(), tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let n = tw.nextNode(); n; n = tw.nextNode()) {
        if (!n.textContent.trim() || n.parentElement.closest("[data-mx-item]") !== el) continue;
        rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r);
      }
      boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity;
      for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
      return rows;
    };
    const content = el.querySelector("[data-mx-content]");
    const clip = [...el.children].filter((k) => k.localName !== "svg" && !k.matches("[data-mx-item], [role=radiogroup], [role=group]") && ["hidden", "clip"].includes(getComputedStyle(k).overflowX)).length;
    let past = 0;
    for (const k of el.querySelectorAll("*")) { if (k.closest("[data-mx-item]") !== el) continue; const r = k.getBoundingClientRect(); if (r.height > 0 && (r.bottom > box.bottom + 1 || r.top < box.top - 1)) past++; }
    out[id] = { w: c.w, h: c.h, computed: c.computed, used: c.used, dir: cs.flexDirection, rows: rowsIn(el), crows: content ? rowsIn(content) : 0, clip, past };
  }
  return out;
};
const mxDesc = (r) => `${f2(r.w)}×${f2(r.h)} · ${r.computed} → used ${f2(r.used)} (${f2(r.used / (r.h / 2))}×h/2) · ${r.dir} · ${r.rows} row(s), content ${r.crows} row(s), ${r.clip} clipped child(ren), ${r.past} cut`;
const pillOk = (r, ref) => Math.abs(r.used - r.h / 2) <= 0.5 && r.rows <= 1 && r.past === 0 && (!ref || r.h <= ref.h + 0.5);
const tileOk = (r, ref) => Math.abs(r.used - 16) <= 0.5 && r.dir === "column" && r.past === 0 && r.crows === 2 && (!ref || r.clip <= ref.clip);
const same = (r, ref) => Math.abs(r.h - ref.h) <= 0.5 && Math.abs(r.w - ref.w) <= 0.5 && r.rows === ref.rows && r.crows === ref.crows && r.clip === ref.clip;
/** the named cells pass 4 found, as the matrix spells them */
export const MX_ALIAS = { "option none tile": "item-none-in-tile", "option flush pill": "item-flush-in-pill", "content none tile": "content-writes-none", "reference - tile n0": "pill-in-option", "reference - pill n0": "tile-in-option" };
/** judge one matrix read: want is "tile" | "pill" | "same" (the reference) | "agree" (either, coherent) */
export function judgeMx(want, r, ref, kindRef, tileRef, names) {
  if (!r) return { pass: false, why: "no such option" };
  const named = names.length ? `; NAMED ${names.length}× «${names[0].slice(0, 90)}»` : "";
  const nameOk = names.length === 0;
  if (want === "same") {
    const ok = (kindRef === "tile" ? tileOk(r, tileRef) : pillOk(r, ref)) && same(r, ref);
    return { pass: ok && nameOk, why: `${ok ? `unchanged: a ${kindRef} as its reference` : `CHANGED from its reference (${kindRef}, ${f2(ref.w)}×${f2(ref.h)}, ${ref.rows} row(s), content ${ref.crows}, ${ref.clip} clipped): the readers split`}${named}` };
  }
  if (want === "agree") {
    const t = tileOk(r, tileRef), p = pillOk(r, null);
    return { pass: (t || p) && nameOk, why: `${t ? "agree: a tile" : p ? "agree: a pill" : "the readers DISAGREE: neither a tile nor a pill"}${named}` };
  }
  const ok = want === "tile" ? tileOk(r, tileRef) : pillOk(r, kindRef === "pill" ? ref : null);
  return { pass: ok && nameOk, why: `${ok ? `a ${want}, as the value decides` : `NOT a ${want}: the value should decide`}${named}` };
}
async function matrix(target, engine, cells) {
  const dev = !!target.meta.dev;
  const namesFor = (P, id) => P.logs.filter((l) => (l.type === "error" || l.type === "pageerror") && l.text.includes(`value="${id}" asks for a second row`)).map((l) => l.text);
  const read = async (mode, w, v) => {
    const P = await openPage(target, engine, "matrix-migrated", { mode, query: w ? { w, v } : {} });
    const ids = ["ta", "tb", "tn0", "pa", "pb", "pn0"];
    const r = await P.page.evaluate(READ_MX, ids);
    const names = Object.fromEntries(ids.map((id) => [id, namesFor(P, id)]));
    await P.close();
    return { r, names };
  };
  for (const mode of ["light", "dark"]) {
    const ref = await read(mode, "", "");
    const tileRef = ref.r.ta;
    const kindOf = (k, slot) => (slot === "n0" ? (k === "tile" ? "pill" : "tile") : k);
    const push = (site, v, k, slot, want, got, refR) => {
      const id = `${k[0]}${slot}`, r = got.r[id], names = dev ? got.names[id] : [];
      const j = judgeMx(want, r, refR, kindOf(k, slot), slot === "n0" ? (k === "pill" ? tileRef : null) : tileRef, names);
      const alias = MX_ALIAS[`${site} ${v} ${k}${site === "reference" ? ` ${slot}` : ""}`];
      cells.push({ gating: true, pass: j.pass, line: `matrix ${mode} · ${site}${v !== "-" ? ` ${v}` : ""} · ${k} group, option ${id}${alias ? ` [${alias}]` : ""} · want ${want === "same" ? "unchanged" : want} · ${j.why}${r ? ` · ${mxDesc(r)}` : ""}${dev ? "" : " · names: production flavour, not read"}` });
    };
    for (const k of ["tile", "pill"]) for (const slot of READ_SITE.reference) push("reference", "-", k, slot, kindOf(k, slot), ref, ref.r[`${k[0]}${slot}`]);
    const sites = mode === "light" ? MX_SITES : ["option"];
    for (const site of sites) for (const v of mode === "light" ? MX_VALUES : ["none", "flush"]) {
      const got = await read(mode, site, v);
      for (const k of ["tile", "pill"]) for (const slot of READ_SITE[site]) {
        if (mode === "dark" && !MX_ALIAS[`${site} ${v} ${k}`]) continue;
        const base = kindOf(k, slot), refR = ref.r[`${k[0]}${slot}`];
        const want = ["ancestor", "option", "content", "nested-option"].includes(site) ? "same" : site === "wrapper" ? "agree" : v === "none" ? "pill" : "tile";
        push(site, v, k, slot, want === "same" ? "same" : want, got, refR);
        void base;
      }
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("FACT", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    const attack = isAttack(migration);
    for (const mode of ["light", "dark"]) for (const c of CELLS) {
      const line = (s) => `${c.id} ${mode} · ${s}`;
      if (!attack && c.scene !== "preset") { cells.push({ gating: true, pass: null, line: line(`UNMEASURED: not an attack build (migration ${migration?.label ?? "none"}); build with --route <harness>/attack-route`) }); continue; }
      const P = await openPage(target, engine, c.scene, { mode, query: { sel: "0" } });
      if (c.write) await P.page.evaluate((v) => document.querySelector("[data-scene] [data-group]").style.setProperty("--selection-tile", v), c.write);
      const r = await P.page.evaluate(READ_ITEM, c.sel);
      await P.close();
      const j = judgeFact(c.want, r);
      cells.push({ gating: true, pass: j.pass, line: line(`${c.write ? `--selection-tile: ${c.write} written on the group · ` : ""}want ${c.want} · ${j.why}${r ? ` · ${desc(r)}` : ""}`) });
    }
    if (attack) await matrix(target, engine, cells);
    else cells.push({ gating: true, pass: null, line: `matrix · UNMEASURED: not an attack build (migration ${migration?.label ?? "none"}); build with --route <harness>/attack-route` });
    return { id: "FACT", title: "is a tile has one spelling: the fact and the tile geometry agree under nesting, a written fact, and every write site × read site of the matrix, judged by paint (H4-1, H5-2; R-10, R-2)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
