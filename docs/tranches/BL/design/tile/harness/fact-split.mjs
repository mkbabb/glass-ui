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
//
// H6-3 · A SEGMENTEDTABS IN AN OPTION (REGISTRY §P5-6.2; rows R-2, FV-2). Every group resets the fact; the other
// `.pill-row` holder, SegmentedTabs, reset nothing on floor v4, so a strip inside a tile option read the option's tile
// fact and its tabs stacked two rows, silently in production (`Fc5` §3.1). The matrix's fourth options (`td`, `pd`) each
// hold a strip whose tabs carry two block rows; the same strip beside the groups is the reference. In light and dark:
//   strip in a tile option   the tab holds one row, the strip is the reference strip's height (± 0.5 px), nothing is
//                            cut past the tab, and on a development flavour nothing names `td` a second row
//   strip in a pill option   the tab holds one row, nothing is cut past the tab, the option keeps the block size of
//                            its group's direct option `pa` (± 0.5 px), and on a development flavour nothing names `pd`
//                            a second row
// The X-5 name ("holds an interactive descendant") on `td` and `pd` is expected and not read here (ATTACK `x5` owns it).
//
// H6-4 · `none!` AT `option` (REGISTRY §P5-6.2; row E-3, REPORTED, not gating). An inline `--selection-tile: none
// !important` on the tile group's direct option (`?w=option&v=none!`). CSS puts an inline `!important` above every
// layer, so no floor can refuse it, and the floor states what it does instead (FV5-3): the option's geometry follows
// the group (a tile: the field corner, a column) while the clip and the one-row law follow the option. The cell reads
// the paint against that sentence: info-pass when the paint is the stated split, info-fail when it is anything else.
//
// H7 · THREE MORE COMPOSITIONS, read on the unwritten matrix page in light and dark (REGISTRY §P6-4; rows R-10, R-2, FV-2).
//   foreign ancestor (H7-1, B-1; R-10)  a pill group whose parent is a Card (`.card`, options `ca`, `cb`): want a pill, as
//                            `pa`. A rule outside the route that writes the tile fact on a group by its ancestor
//                            (`.card > .toggle-group { --selection-tile: flush }` in base.css, `D′c6` §4.1) turns them into
//                            tiles. SHEET's `writers` cell is the static half (sheet.mjs)
//   consumer flush on a strip (H7-2, O-1; R-2, FV-2)  a strip a consumer writes `flush` on by an unlayered rule on the
//                            strip itself (`data-mx-st="cf"`), read against the floor's own sentence on strips (the tile
//                            fact's registration comment in the worktree's utilities/base.css; build.mjs `floorText`):
//                              "… a strip's tabs are always pills" (floor v5): the promise is that the write is refused,
//                              the tab one row at the reference strip's height. REPORTED (info) on this form: the floor has not yet
//                              written O-1's ruled sentence (a)
//                              "… pills unless a rule of yours writes on the strip" (O-1 (a), ruled by O-103; floor v6; any
//                              sentence with "unless … on the/a strip"): the promise is that the write lands, the tab
//                              leaves the one-row law (a second row, or a strip that is not the reference's height),
//                              while the unwritten reference strip holds one row. GATING on this form
//                              no strip sentence: reported (info-fail), the floor promises nothing
//   responsive strip in a tile option (H7-3, B-3; R-2, FV-2)  a responsive SegmentedTabs below its breakpoint in the tile
//                            group's fifth option (`te`): `.segmented-tabs__mobile` and its SelectTrigger, judged as H6-3
//                            judges the strip, against the same responsive strip beside the groups: the trigger holds one
//                            row, nothing is cut past it, the mobile root is the reference's height (± 0.5 px), the
//                            trigger paints the reference trigger's plate (its computed background colour and image and
//                            its backdrop filter, string-equal: the flush option's rule strips a `[data-state]` control's
//                            plate, control-surfaces.css), and on a development flavour nothing names `te` a second row.
//                            The trigger's fact is printed, never judged
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
// ── H6-3 · the strips ────────────────────────────────────────────────────────────────────────────────────────
/** Paint reads of the matrix strips (`data-mx-st`): the first tab's text rows (the midpoint chain), its box, the strip's
 *  box, the tab's spans cut past it, the strip's display and the tab's fact (printed, never judged). */
export const READ_ST = async () => {
  await window.__th.frame();
  const out = {};
  for (const which of ["t", "p", "ref", "cf"]) {
    const strip = document.querySelector(`[data-mx-st="${which}"]`);
    const tab = strip && strip.querySelector(".segmented-tab, .st-tab");
    if (!tab) { out[which] = null; continue; }
    const boxes = [], rg = document.createRange(), tw = document.createTreeWalker(tab, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.textContent.trim()) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
    boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity;
    for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
    const tb = tab.getBoundingClientRect(), sb = strip.getBoundingClientRect();
    const past = [...tab.querySelectorAll("*")].filter((k) => { const r = k.getBoundingClientRect(); return r.height > 0 && (r.bottom > tb.bottom + 1 || r.top < tb.top - 1); }).length;
    out[which] = { rows, tabW: tb.width, tabH: tb.height, stripH: sb.height, past, display: getComputedStyle(strip).display, fact: getComputedStyle(tab).getPropertyValue("--selection-tile").trim() };
  }
  return out;
};
// ── H7-3 · the responsive strip below its breakpoint ────────────────────────────────────────────────────────────
/** Paint reads of the responsive strips (`data-mx-stm`): whether the root is the mobile root, its box, its trigger's text
 *  rows, box, spans cut past it, its plate (background colour and image, backdrop filter) and its fact (printed). */
export const READ_STM = async () => {
  await window.__th.frame();
  const out = {};
  for (const which of ["t", "ref"]) {
    const root = document.querySelector(`[data-mx-stm="${which}"]`);
    const trig = root && root.querySelector("button, [role=combobox]");
    if (!trig) { out[which] = root ? { mobile: root.matches(".segmented-tabs__mobile, .stm"), noTrigger: true } : null; continue; }
    const boxes = [], rg = document.createRange(), tw = document.createTreeWalker(trig, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.textContent.trim()) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
    boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity;
    for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
    const tb = trig.getBoundingClientRect(), rb = root.getBoundingClientRect(), cs = getComputedStyle(trig);
    const past = [...trig.querySelectorAll("*")].filter((k) => { const r = k.getBoundingClientRect(); return r.height > 0 && (r.bottom > tb.bottom + 1 || r.top < tb.top - 1); }).length;
    const plate = `bg ${cs.backgroundColor} · image ${cs.backgroundImage} · backdrop ${cs.backdropFilter || cs.webkitBackdropFilter || "none"}`;
    out[which] = { mobile: root.matches(".segmented-tabs__mobile, .stm"), rows, tW: tb.width, tH: tb.height, rootH: rb.height, past, plate, fact: cs.getPropertyValue("--selection-tile").trim() };
  }
  return out;
};
const stmDesc = (r) => (r.noTrigger ? "no trigger" : `trigger ${f2(r.tW)}×${f2(r.tH)}, ${r.rows} row(s), ${r.past} cut · root ${f2(r.rootH)}${r.mobile ? " (the mobile root)" : " (NOT the mobile root)"} · trigger fact ${r.fact || "(unset)"}`);
/** judge the responsive strip in the tile option against the reference responsive strip */
export function judgeStm(r, ref, names) {
  if (!ref || ref.noTrigger || !ref.mobile) return { pass: false, why: !ref ? "no reference responsive strip" : "the REFERENCE responsive strip did not collapse to its mobile root: the composition is broken" };
  if (ref.rows !== 1) return { pass: false, why: `the REFERENCE trigger holds ${ref.rows} rows: the composition is broken` };
  if (!r || r.noTrigger) return { pass: false, why: "no responsive strip (or no trigger) in the option" };
  const one = r.rows === 1 && r.past === 0, h = Math.abs(r.rootH - ref.rootH) <= 0.5, plate = r.plate === ref.plate;
  const named = names.length ? `; NAMED ${names.length}× «${names[0].slice(0, 90)}»` : "";
  return { pass: r.mobile && one && h && plate && !names.length, why: `${r.mobile ? "the mobile root" : "NOT the mobile root"} · ${one ? "the trigger holds one row" : `the trigger STACKS ${r.rows} rows${r.past ? `, ${r.past} cut` : ""}`} · root ${f2(r.rootH)} against the reference ${f2(ref.rootH)}${h ? "" : " (CHANGED)"} · ${plate ? "the trigger paints the reference's plate" : `the trigger's plate DIFFERS from the reference's: the option's tile fact reached it («${r.plate.slice(0, 120)}» against «${ref.plate.slice(0, 120)}»)`}${named}` };
}
// ── H7-2 · the floor's sentence on strips, and what a consumer write on a strip paints ──────────────────────────────
/** the floor's promise about a strip, from its registration comment: "always" (the write is refused), "unless" (the
 *  write lands; O-1 (a)) or null (no strip sentence) */
export function stripPromise(text) {
  if (!text) return { form: null, sentence: "" };
  const sentences = text.split(/(?<=[.;])\s+/);
  const unless = sentences.find((x) => /\bunless\b[^.]*\bon (the|a) strip\b/i.test(x));
  if (unless) return { form: "unless", sentence: unless };
  const always = sentences.find((x) => /strip'?s tabs are always pills|strips? (is|are) always pills/i.test(x));
  if (always) return { form: "always", sentence: always };
  return { form: null, sentence: "" };
}
export function judgeCf(r, ref, promise) {
  if (!r || !ref) return { gating: promise.form === "unless", pass: false, why: !ref ? "no reference strip" : "no consumer-written strip" };
  const lands = r.rows >= 2 || r.past > 0 || Math.abs(r.stripH - ref.stripH) > 0.5;
  const measured = lands ? `the consumer's write LANDS: the tab ${r.rows} row(s)${r.past ? `, ${r.past} cut` : ""}, strip ${f2(r.stripH)} against the reference ${f2(ref.stripH)}` : `the consumer's write is REFUSED: the tab one row, strip ${f2(r.stripH)} against the reference ${f2(ref.stripH)}`;
  if (promise.form === "unless") {
    const ok = lands && ref.rows === 1;
    return { gating: true, pass: ok, why: `the floor says «${promise.sentence.slice(0, 260)}» (O-1 (a): gating) · ${measured}${ref.rows === 1 ? "" : ` · the unwritten reference tab holds ${ref.rows} rows`} · ${ok ? "the sentence is TRUE" : "the sentence is FALSE"}` };
  }
  if (promise.form === "always") return { gating: false, pass: !lands, why: `the floor says «${promise.sentence.slice(0, 260)}» (reported until the floor states O-1's ruled (a), O-103) · ${measured} · ${lands ? "the sentence is FALSE" : "the sentence is true"}` };
  return { gating: false, pass: false, why: `the floor states no promise about a strip (no registration comment, or no strip sentence in it) · ${measured}` };
}
const stDesc = (r) => `tab ${f2(r.tabW)}×${f2(r.tabH)}, ${r.rows} row(s), ${r.past} span(s) cut · strip ${f2(r.stripH)} (${r.display}) · tab fact ${r.fact || "(unset)"}`;
/** judge one strip read against the reference strip: in a tile option the strip keeps its own height; in a pill option
 *  the option keeps its pill's block size */
export function judgeSt(kind, r, ref, opt, pillRef, names) {
  if (!r || !ref) return { pass: false, why: !ref ? "no reference strip" : "no strip in the option" };
  if (ref.rows !== 1) return { pass: false, why: `the REFERENCE strip's tab holds ${ref.rows} rows: the composition is broken` };
  const one = r.rows === 1 && r.past === 0;
  const named = names.length ? `; NAMED ${names.length}× «${names[0].slice(0, 90)}»` : "";
  if (kind === "tile") {
    const h = Math.abs(r.stripH - ref.stripH) <= 0.5;
    return { pass: one && h && !names.length, why: `${one ? "the tab holds one row" : `the tab STACKS ${r.rows} rows${r.past ? `, ${r.past} cut` : ""}: the option's tile fact reached the strip`} · strip ${f2(r.stripH)} against the reference ${f2(ref.stripH)}${h ? "" : " (CHANGED)"}${named}` };
  }
  const held = opt && pillRef && Math.abs(opt.h - pillRef.h) <= 0.5;
  return { pass: one && held && !names.length, why: `${one ? "the tab holds one row" : `the tab STACKS ${r.rows} rows${r.past ? `, ${r.past} cut` : ""}`} · option ${opt ? `${f2(opt.w)}×${f2(opt.h)}` : "?"} against the pill pa ${pillRef ? f2(pillRef.h) : "?"}${held ? "" : " (the pill GREW)"}${named}` };
}
async function matrix(target, engine, cells) {
  const dev = !!target.meta.dev;
  const namesFor = (P, id) => P.logs.filter((l) => (l.type === "error" || l.type === "pageerror") && l.text.includes(`value="${id}" asks for a second row`)).map((l) => l.text);
  const read = async (mode, w, v, st = false) => {
    const P = await openPage(target, engine, "matrix-migrated", { mode, query: w ? { w, v } : {} });
    const ids = ["ta", "tb", "tn0", "pa", "pb", "pn0", "td", "pd"];
    const r = await P.page.evaluate(READ_MX, st ? [...ids, "ca", "cb"] : ids);
    const s = st ? await P.page.evaluate(READ_ST) : null;
    const m = st ? await P.page.evaluate(READ_STM) : null;
    const card = st ? await P.page.evaluate(() => { const g = document.querySelector('[data-mx-item="ca"]')?.parentElement; return g ? { parent: g.parentElement?.matches(".card") ?? false, cls: g.parentElement?.className.split(" ")[0] ?? "" } : null; }) : null;
    const floor = st ? await P.page.evaluate(() => window.__tile.floor?.tileFact ?? null) : null;
    const names = Object.fromEntries([...ids, "te", "ca", "cb"].map((id) => [id, namesFor(P, id)]));
    await P.close();
    return { r, s, m, card, floor, names };
  };
  for (const mode of ["light", "dark"]) {
    const ref = await read(mode, "", "", true);
    const tileRef = ref.r.ta;
    // H6-3 · the strips, on the unwritten page
    for (const [k, which, id] of [["tile", "t", "td"], ["pill", "p", "pd"]]) {
      const r = ref.s[which], j = judgeSt(k, r, ref.s.ref, ref.r[id], ref.r.pa, dev ? ref.names[id] : []);
      cells.push({ gating: true, pass: j.pass, line: `matrix ${mode} · strip in a ${k} option (${id}) [segmented-in-${k}] · want one row, ${k === "tile" ? "the reference strip's height" : "the pill's block size"}${dev ? ", no second-row name" : ""} · ${j.why}${r ? ` · ${stDesc(r)}` : ""} · reference ${ref.s.ref ? stDesc(ref.s.ref) : "none"}${dev ? "" : " · names: production flavour, not read"}` });
    }
    // H7-1 · a pill group under a `.card` ancestor: no rule outside the route writes the fact on it (B-1; R-10)
    for (const id of ["ca", "cb"]) {
      const r = ref.r[id], names = dev ? ref.names[id] : [];
      const j = judgeMx("pill", r, ref.r.pa, "pill", tileRef, names);
      cells.push({ gating: true, pass: j.pass, line: `matrix ${mode} · a pill group under a .card ancestor, option ${id} [foreign-ancestor] · want a pill, as pa (no rule outside the route writes the tile fact) · ${j.why}${r ? ` · ${mxDesc(r)}` : ""} · group's parent ${ref.card ? `${ref.card.cls}${ref.card.parent ? " (.card)" : " (NOT .card: the composition is broken)"}` : "none"}${dev ? "" : " · names: production flavour, not read"}` });
      if (ref.card && !ref.card.parent) cells[cells.length - 1].pass = false;
    }
    // H7-2 · a consumer's flush on a strip, against the floor's own sentence (O-1; reported on floor v5's form)
    {
      const promise = stripPromise(ref.floor), j = judgeCf(ref.s.cf, ref.s.ref, promise);
      cells.push({ gating: j.gating, pass: j.pass, line: `matrix ${mode} · consumer flush on a strip (cf) [strip-write] · want the floor's sentence on strips true of the paint · ${j.why}${ref.s.cf ? ` · ${stDesc(ref.s.cf)}` : ""}` });
    }
    // H7-3 · a responsive strip below its breakpoint in a tile option (B-3), judged as H6-3 judges the strip
    {
      const r = ref.m.t, j = judgeStm(r, ref.m.ref, dev ? ref.names.te : []);
      cells.push({ gating: true, pass: j.pass, line: `matrix ${mode} · responsive strip in a tile option (te) [mobile-in-tile] · want the mobile root, one row, the reference's height, the reference's plate${dev ? ", no second-row name" : ""} · ${j.why}${r ? ` · ${stmDesc(r)}` : ""} · reference ${ref.m.ref ? stmDesc(ref.m.ref) : "none"}${dev ? "" : " · names: production flavour, not read"}` });
    }
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
    // H6-4 · `none!` at option: reported against FV5-3's sentence (light only)
    if (mode === "light") {
      const got = await read(mode, "option", "none!"), r = got.r.ta;
      const geomGroup = !!r && Math.abs(r.used - 16) <= 0.5 && r.dir === "column";
      const pillReaders = !!r && (r.clip > tileRef.clip || r.crows !== tileRef.crows);
      const stated = geomGroup && pillReaders;
      cells.push({ gating: false, pass: stated, line: `none! light · option · tile group, option ta · an inline --selection-tile: none !important (above every layer; reported, not gating) · want FV5-3's stated split: the geometry follows the group (the field corner, a column), the clip and the one-row law follow the option · ${!r ? "no such option" : stated ? "the paint is the stated split" : geomGroup ? "NOT the stated split: the geometry follows the group and the option's readers do not take the write (the write did not land)" : pillReaders ? "NOT the stated split: the geometry follows the write too" : "NOT the stated split: neither reader takes the write"}${r ? ` · ${mxDesc(r)} · reference ${mxDesc(tileRef)}` : ""}` });
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
