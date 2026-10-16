#!/usr/bin/env node
// floor-v3/probes/pill-row.mjs · FV3-5's trades, read where T-2 does not look. T-2 (H3-3, H4-2) gates the five
// spellings of a second row; this probe reads what the `!important` law must leave alone, on item 0 of each gating
// pill scene (`single`, `vertical`, `pill-icon`, `pill-badge`, `tabs`), each case on a fresh page after mount:
//   vshow, hidden-attr, hidden-utility   a span hidden by `v-show`'s inline `display: none`, by the `hidden`
//                                        attribute, and by the `hidden` utility (@layer utilities): GATING, it must
//                                        compute `display: none` and take no box
//   inline-important                     a span with an inline `display: block !important`: INFO, the one spelling
//                                        above the law; rows and the console (a development flavour names it)
//   iflex                                an `inline-flex` wrapper (icon + text, gap 6px) in the label: GATING on one
//                                        row at the rung (a horizontal clip in a narrow column is printed, not gated) (the base layer makes the `svg` a block, so a wrapper run inline around
//                                        a block graphic breaks the row); the gap is printed (the trade)
//   graphic                              a 14 px `svg` appended to the label after its text: GATING on one row
//   badge (pill-badge)                   the Badge (`.badge-atom`, a flex item of the item): GATING, it keeps its own
//                                        display (inline-flex, blockified to flex as a flex item) and the item is one
//                                        row at its rung; arm `badge-law` (INFO) puts the Badge under the law, as
//                                        the candidate without its exclusion would
//   badge-in-label (pill-badge)          the same Badge moved inside the label span: GATING, inline-flex and one row;
//                                        arm `badge-in-label-law` (INFO) under the law: its display and box
//   node pill-row.mjs --build <out>/builds/<label> --engine chromium|webkit
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, f2 } from "../../../harness/lib.mjs";
import { tagItems } from "../../../harness/measure.mjs";

const args = parseArgs();
const engine = args.engine === "webkit" ? "webkit" : "chromium";
const lock = await acquireLock("fv3-pill-row");
const target = await openTarget(args);
console.log(`FV3-5 pill-row probe · ${target.label} (flavor ${target.meta.flavor}) · ${await engineVersion(engine)} · load ${load()} at start`);
const SCENES = ["single", "vertical", "pill-icon", "pill-badge", "tabs"];
const CASES = [["vshow", true], ["hidden-attr", true], ["hidden-utility", true], ["inline-important", false], ["iflex", true], ["graphic", true],
  ["badge", true], ["badge-law", false], ["badge-in-label", true], ["badge-in-label-law", false]];
let pass = 0, n = 0;
for (const scene of SCENES) for (const [kind, gates] of CASES) {
  if (kind.startsWith("badge") && scene !== "pill-badge") continue;
  const P = await openPage(target, engine, scene);
  await tagItems(P);
  await P.page.waitForTimeout(400);
  const before = P.logs.filter((l) => l.type === "error").length;
  const r = await P.page.evaluate(async (kind) => {
    const th = window.__th, el = document.querySelector('[data-th-idx="0"]');
    const label = el.querySelector("[data-line-slot]") ?? [...el.querySelectorAll("span")].find((e) => e.textContent.trim() && !e.children.length) ?? el;
    const rung = parseFloat(getComputedStyle(el).minBlockSize) || 0;
    const add = (css) => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); };
    let x = null;
    const span = (t) => { const s = document.createElement("span"); s.textContent = t; s.setAttribute("data-th-added", ""); return s; };
    if (kind === "vshow") { x = span("0.5 s"); x.style.display = "none"; label.append(x); }
    else if (kind === "hidden-attr") { x = span("0.5 s"); x.hidden = true; label.append(x); }
    else if (kind === "hidden-utility") { add("@layer utilities { .hidden { display: none; } }"); x = span("0.5 s"); x.className = "hidden"; label.append(x); }
    else if (kind === "inline-important") { x = span("0.5 s"); x.style.setProperty("display", "block", "important"); label.append(x); }
    else if (kind === "iflex") {
      x = document.createElement("span"); x.setAttribute("data-th-added", ""); x.style.cssText = "display: inline-flex; gap: 6px; align-items: center";
      x.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg><span>Grid</span>';
      label.replaceChildren(x);
    } else if (kind === "graphic") {
      x = document.createElementNS("http://www.w3.org/2000/svg", "svg"); x.setAttribute("viewBox", "0 0 24 24"); x.setAttribute("width", "14"); x.setAttribute("height", "14");
      x.innerHTML = '<circle cx="12" cy="12" r="8" fill="currentColor"/>'; label.append(x);
    } else if (kind.startsWith("badge-in-label")) { label.append(el.querySelector(".badge-atom")); if (kind.endsWith("-law")) add("@layer components { @container style(--selection-tile: none) { :where(.pill-row .badge-atom) { display: inline !important; } } }"); }
    else if (kind === "badge-law") add("@layer components { @container style(--selection-tile: none) { :where(.pill-row .badge-atom) { display: inline !important; } } }");
    await th.frame(); await new Promise((res) => setTimeout(res, 600)); await th.frame();
    const box = el.getBoundingClientRect();
    const badge = el.querySelector(".badge-atom");
    const t = kind.startsWith("badge") ? badge : x;
    const tb = t?.getBoundingClientRect();
    let gap = null;
    if (kind === "iflex") { const sv = x.querySelector("svg").getBoundingClientRect(), tx = x.querySelector("span").getBoundingClientRect(); gap = tx.left - sv.right; }
    return { display: t ? getComputedStyle(t).display : null, tw: tb?.width ?? 0, th: tb?.height ?? 0, rows: th.rows(el), cut: th.cut(el).n, h: box.height, rung, gap };
  }, kind);
  await P.close();
  const named = P.logs.filter((l) => l.type === "error").slice(before).map((l) => l.text);
  let ok = true;
  if (["vshow", "hidden-attr", "hidden-utility"].includes(kind)) ok = r.display === "none" && r.tw === 0 && r.th === 0;
  const oneRow = r.rows === 1 && r.cut === 0 && (!r.rung || Math.abs(r.h - r.rung) < 0.01);
  if (kind === "badge") ok = (r.display === "flex" || r.display === "inline-flex") && oneRow;
  if (kind === "badge-in-label") ok = r.display === "inline-flex" && oneRow;
  // a row, not a clip: the 64 px `vertical` column clips a wide label at the plate by design (floor v2 reads the same)
  if (kind === "iflex" || kind === "graphic") ok = r.rows === 1 && (!r.rung || Math.abs(r.h - r.rung) < 0.01);
  if (gates) { n++; if (ok) pass++; }
  console.log(`  ${gates ? (ok ? "PASS" : "FAIL") : "INFO"} ${engine} ${scene} #0 · ${kind} · the ${kind.startsWith("badge") ? "badge" : "added element"} computes display: ${r.display} · box ${f2(r.tw)}×${f2(r.th)}${r.gap !== null ? ` · icon→text gap ${f2(r.gap)} px (authored 6)` : ""} · item ${f2(r.h)} px at rung ${f2(r.rung)} · rows ${r.rows} · cut ${r.cut} · console errors ${named.length}${named.length ? ` «${named[0].slice(0, 120)}»` : ""} · load ${load()}`);
}
console.log(`${pass}/${n} gating cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(pass === n ? 0 : 1);
