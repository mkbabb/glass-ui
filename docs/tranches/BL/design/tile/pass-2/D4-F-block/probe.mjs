#!/usr/bin/env node
// D4-F-block/probe.mjs · REGISTRY §6.1 question 1, discrimination. Does a structural selector over a ToggleGroupItem's
// direct children tell a second ROW from an inline ADORNMENT, in both engines?
//   node probe.mjs --build <out>/builds/<label> --reading r1|r2 [--engines chromium,webkit] [--json <file>]
// Two reads per case, per item:
//   match  `el.matches()` for the three candidate selectors (W7, R1, R2 below), independent of which rule the build
//          ships, so one table compares the readings on the same DOM;
//   paint  what the build's own rule painted: computed and used corner (CSS Backgrounds 3 §5.5), box, the rung,
//          flex-direction, white-space, `--selection-perimeter`, and the label's line count and clip.
// A case passes when every item's PAINT class equals the case's expected class: `pill` (used corner = h/2 and the
// box at its rung, one line) or `cell` (used corner = the resolved `--radius-field`, a column). A case that reads the
// shipped consumer composition is information, never gating. Surgeries edit only slot content in the live DOM
// (the item element is the library's); each is named in its case row. Holds the harness lock; prints the load.
import fs from "node:fs";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion } from "../../harness/lib.mjs";

const SEL = {
  W7: ".toggle-group__item:has(> * + *)",
  R1: ".toggle-group__item:has(> :not(svg, img, .badge-atom, .sr-only) ~ :not(svg, img, .badge-atom, .sr-only))",
  R2: ".toggle-group__item:has(> .toggle-group__media, > .toggle-group__meta)",
};

// surgeries (slot content only)
const S = {
  count: () => document.querySelectorAll("[data-item] .badge-atom").forEach((b) => {
    const s = document.createElement("span"); s.className = "text-muted-foreground tabular-nums"; s.setAttribute("data-ink", ""); s.textContent = "5"; b.replaceWith(s); }),
  srOnly: () => document.querySelectorAll("[data-item] .badge-atom").forEach((b) => {
    const s = document.createElement("span"); s.className = "sr-only"; s.textContent = "unread messages"; b.replaceWith(s); }),
  wrapGlyph: () => document.querySelectorAll("[data-item] > svg").forEach((g) => {
    const s = document.createElement("span"); s.className = "tile-glyph-row"; g.replaceWith(s); s.append(g); }),
  glyphSpanText: () => document.querySelectorAll("[data-item]").forEach((it) => {
    const g = document.createElement("span"); g.className = "basis-icon font-serif-math"; g.setAttribute("aria-hidden", "true"); g.textContent = "∑";
    const label = it.querySelector(":scope > span").textContent; it.replaceChildren(g, document.createTextNode(" " + label)); }),
  glyphSpanSpan: () => document.querySelectorAll("[data-item]").forEach((it) => {
    const g = document.createElement("span"); g.className = "basis-icon font-serif-math"; g.setAttribute("aria-hidden", "true"); g.textContent = "∑";
    const l = document.createElement("span"); l.textContent = it.querySelector(":scope > span").textContent; it.replaceChildren(g, l); }),
  longSpan: () => { const g = document.querySelector("[data-group]"); g.style.maxInlineSize = "140px";
    const it = document.querySelector("[data-item]"); it.querySelector("span").textContent = "Exponential out and back again"; },
  longText: () => { const g = document.querySelector("[data-group]"); g.style.maxInlineSize = "140px";
    const it = document.querySelector("[data-item]"); it.replaceChildren(document.createTextNode("Exponential out and back again")); },
};

// [id, scene, surgery, expected, gating, note]
const CASES = {
  r1: [
    ["icon+label", "pill-icon", null, "pill", true, "H-10 pill-icon: a bare svg icon beside a label span"],
    ["label+Badge", "pill-badge", null, "pill", true, "H-10 pill-badge: a label span beside a library Badge"],
    ["K1", "preset", null, "cell", true, "K1 library arm, unmigrated markup: a name span over a readout span"],
    ["K2", "specimen", null, "cell", true, "K2 library arm, unmigrated markup: a stage span, a name span, an sr-only description"],
    ["V1", "strip-migrated", null, "cell", true, "V1 on ToggleGroupItem (route-r1): a bare glyph svg over a label span"],
    ["wrap-span", "single", "longSpan", "pill", true, "a bare label in a span, 30 characters, the group held to 140 px (TF-7)"],
    ["wrap-text", "single", "longText", "pill", true, "the same label as a bare text node (TF-7, C-3)"],
    ["label+count", "pill-badge", "count", "pill", false, "the Badge swapped for a consumer count span (C1's shape: a label and a count)"],
    ["glyph span + text", "pill-icon", "glyphSpanText", "pill", false, "fourier-analysis BasisSelector.vue:158-162 as shipped: a glyph span and a bare text label"],
    ["glyph span + label span", "pill-icon", "glyphSpanSpan", "pill", false, "the same with the label in a span, the label element TF-7's ellipsis asks for"],
    ["label+sr-only", "pill-badge", "srOnly", "pill", false, "the Badge swapped for an sr-only span"],
    ["V1 glyph in a row", "strip-migrated", "wrapGlyph", "cell", false, "V1 with each glyph wrapped in a span: the structural spelling reading 1 would ask of V1"],
    ["K1 shipped", "preset-verbatim", null, "cell", false, "K1 as shipped (rounded-pill and the consumer's paint)"],
  ],
  r2: [
    ["icon+label", "pill-icon", null, "pill", true, "H-10 pill-icon, default slot"],
    ["label+Badge", "pill-badge", null, "pill", true, "H-10 pill-badge, default slot"],
    ["K1", "preset-migrated", null, "cell", true, "K1 with its readout in #meta (route-r2)"],
    ["K2", "specimen-migrated", null, "cell", true, "K2 with its stage in #media (route-r2)"],
    ["V1", "strip-migrated", null, "cell", true, "V1 with its glyph in #media (route-r2)"],
    ["wrap-span", "single", "longSpan", "pill", true, "a bare label in a span, 30 characters, the group held to 140 px (TF-7)"],
    ["wrap-text", "single", "longText", "pill", true, "the same label as a bare text node (TF-7, C-3)"],
    ["label+count", "pill-badge", "count", "pill", false, "the Badge swapped for a consumer count span"],
    ["glyph span + text", "pill-icon", "glyphSpanText", "pill", false, "fourier-analysis BasisSelector.vue:158-162 as shipped: a glyph span and a bare text label"],
    ["glyph span + label span", "pill-icon", "glyphSpanSpan", "pill", false, "the same with the label in a span, the label element TF-7's ellipsis asks for"],
    ["label+sr-only", "pill-badge", "srOnly", "pill", false, "the Badge swapped for an sr-only span"],
    ["K1 unmigrated", "preset", null, "cell", false, "K1 library arm, markup NOT moved into #meta (question 4's cost)"],
    ["K2 unmigrated", "specimen", null, "cell", false, "K2 library arm, markup NOT moved into #media"],
  ],
};

function readItems(sel) {
  const probe = document.createElement("div"); probe.style.borderRadius = "var(--radius-field)"; document.body.append(probe);
  const field = parseFloat(getComputedStyle(probe).borderTopLeftRadius); probe.remove();
  return [...document.querySelectorAll("[data-scene] [data-item]")].map((el) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const rc = parseFloat(cs.borderTopLeftRadius), used = Math.min(rc, r.width / 2, r.height / 2);
    const rung = parseFloat(cs.minBlockSize);
    const label = [...el.children].find((c) => c.tagName !== "svg" && !c.classList.contains("sr-only") && !c.classList.contains("toggle-group__media")) ?? null;
    let lines = null, clipped = null;
    if (label) {
      const range = document.createRange(); range.selectNodeContents(label);
      lines = new Set([...range.getClientRects()].map((q) => Math.round(q.top))).size;
      clipped = label.scrollWidth > label.clientWidth + 0.5;
    } else {
      const t = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim());
      if (t) { const range = document.createRange(); range.selectNodeContents(t); lines = new Set([...range.getClientRects()].map((q) => Math.round(q.top))).size; clipped = el.scrollWidth > el.clientWidth + 0.5; }
    }
    const kids = [...el.children].map((c) => c.tagName.toLowerCase() + (c.classList.length ? "." + [...c.classList].slice(0, 2).join(".") : ""));
    const m = Object.fromEntries(Object.entries(sel).map(([k, s]) => [k, el.matches(s)]));
    const one = r.height <= rung + 0.75;
    const cls = Math.abs(used - field) < 0.5 && cs.flexDirection === "column" ? "cell"
      : Math.abs(used - r.height / 2) < 0.5 && one ? "pill"
      : Math.abs(used - r.height / 2) < 0.5 ? "lozenge" : "other";
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), rung, computed: cs.borderTopLeftRadius, used: +used.toFixed(2), field,
      dir: cs.flexDirection, ws: cs.whiteSpace, perim: cs.getPropertyValue("--selection-perimeter").trim(), lines, clipped, kids, m, cls };
  });
}

// the live flip: a second row appended to, then removed from, one pill (framed reads)
async function flip(P, reading) {
  return P.page.evaluate(async ({ reading }) => {
    const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const it = document.querySelector("[data-item]");
    const read = () => { const cs = getComputedStyle(it), r = it.getBoundingClientRect(); return `${r.width.toFixed(1)}×${r.height.toFixed(1)} ${cs.borderTopLeftRadius} ${cs.flexDirection} perim ${cs.getPropertyValue("--selection-perimeter").trim()}`; };
    const before = read();
    const row = document.createElement("span"); row.textContent = "0.35 s";
    if (reading === "r2") row.className = "toggle-group__meta";
    it.append(row); await frame(); const added = read();
    row.remove(); await frame(); const removed = read();
    return { before, added, removed };
  }, { reading });
}

const args = parseArgs();
const reading = args.reading === "r2" ? "r2" : "r1";
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock(`d4f-block-${reading}`);
const target = await openTarget(args);
const out = { reading, build: target.label, meta: target.meta, selectors: SEL, engines: {} };
console.log(`D4-F question 1 · reading ${reading} · ${target.label} (${target.meta.sha}, flavor ${target.meta.flavor}) · lock waited ${lock.waitedS}s · load ${load()} at start`);
let pass = 0, n = 0;
for (const engine of engines) {
  const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load(), cases: [] };
  console.log(`\n${E.version} · load ${E.loadStart}`);
  for (const [id, scene, surgery, expected, gating, note] of CASES[reading]) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    if (surgery) { await P.page.evaluate(`(${S[surgery].toString()})()`); await P.page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); }
    const items = await P.page.evaluate(readItems, SEL);
    const got = [...new Set(items.map((x) => x.cls))];
    const ok = items.length > 0 && items.every((x) => x.cls === expected);
    const matchTally = Object.fromEntries(Object.keys(SEL).map((k) => [k, `${items.filter((x) => x.m[k]).length}/${items.length}`]));
    const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
    if (gating) { n++; if (ok) pass++; }
    const x = items[0] ?? {};
    const line = `${gating ? (ok ? "PASS" : "FAIL") : "INFO"} ${id} [${scene}${surgery ? " + " + surgery : ""}] expected ${expected}, painted ${got.join("/")} (${items.length} items) · match W7 ${matchTally.W7} R1 ${matchTally.R1} R2 ${matchTally.R2} · item0 ${x.w}×${x.h} rung ${x.rung} ${x.computed}→${x.used} (h/2 ${(x.h / 2).toFixed(2)}, field ${x.field}) ${x.dir} ${x.ws} perim ${x.perim} lines ${x.lines} clipped ${x.clipped} · children [${(x.kids ?? []).join(" ")}]${errs ? ` · ${errs} console errors` : ""}`;
    console.log("  " + line);
    E.cases.push({ id, scene, surgery, expected, gating, note, ok, got, matchTally, items, errors: P.logs.filter((l) => l.type === "error" || l.type === "pageerror") });
    await P.close();
  }
  const P = await openPage(target, engine, "single", { mode: "light" });
  E.flip = await flip(P, reading);
  await P.close();
  console.log(`  FLIP single item 0: before ${E.flip.before} | row added ${E.flip.added} | row removed ${E.flip.removed}`);
  E.loadEnd = load();
  console.log(`  load ${E.loadEnd} at end`);
}
console.log(`\n${pass}/${n} gating cells pass (both engines) · load ${load()} at end`);
out.pass = pass; out.n = n;
if (typeof args.json === "string") fs.writeFileSync(args.json, JSON.stringify(out, null, 1));
await closeBrowsers();
await target.close();
lock.release();
process.exit(0);
