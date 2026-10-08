#!/usr/bin/env node
// canon.mjs · H3-4 · the canon unit's fixtures, read in both engines (R-7: the canon unit fails plants A, S and H).
//
// The pass-2 canon unit (D′, `tests/styles/radius-role-canon.test.ts`) matched every corner-declaring selector
// against ONE md item with no children, under happy-dom, and counted a selector happy-dom could not parse as no
// reach. So a selector that needs a size, an orientation or a child reached nothing, and plants S and H passed
// 45/45 (`../pass-2/D4-Dp-critique.md` item 8). This witness keeps the unit's law and widens its fixtures:
//
//   FIXTURES  every item twin (tile and pill: the same group, item and children, the tile spelling on or off) at
//             size sm | md | lg × orientation horizontal | vertical × children none | one label | two rows | media
//             and label × state on | off: 3 × 2 × 4 × 2 = 48 twins
//   RULES     every style rule in every sheet the page holds (grouping rules and nesting walked, `&` resolved),
//             parsed by the ENGINE, that declares `border-radius` or a corner longhand. A selector the engine cannot
//             match (after state pseudo-classes and pseudo-elements are stripped, as the unit did) is a FAIL, never
//             "no reach"
//   LAW       (1) exactly one rule reaches a tile and not its pill twin, and its corner is `var(--radius-field)`;
//             (2) every corner a rule scoped to the group (`toggle-group` in its selector) writes on a pill is
//             `var(--radius-pill)` or `inherit`; (3) no corner selector is unmatched
//
// The tile spelling is the route's: `route.json` → `"canon": { "group": "<attrs>", "item": "<attrs>",
// "inner": "<html>", "sel": "<a selector that reaches the tile>" }`. The default is D′'s declaration
// (`data-shape="cell"` on the group). The plants are built on `sel`, so each route is planted on its own spelling:
//   A  the same reach in a second sheet in another spelling (`:is(<sel>)`) at 12 px: two tile corners
//   S  a size arm on the tile, `.toggle-group[data-size="sm"] :is(<sel>)` on `--radius-panel`
//   H  a structural re-spelling, `.toggle-group__item:has(> * + *)` at 12 px
//
//   node canon.mjs --build <dir> [--plant a|s|h] [--engine chromium|webkit]
//   node canon.mjs --fixture [--fault canon-a|canon-s|canon-h] [--engine chromium|webkit]
// On a build the page's own sheets are read (the library as the scene app bundles it); at HEAD no rule declares a
// tile, so law (1) FAILS there, as it should. The fixture's sheet is the minimal one that satisfies the law.
import fs from "node:fs";
import path from "node:path";
import { cli, openPage, engineVersion, engineOf, serve } from "./lib.mjs";

export const DEFAULT_TILE = { group: 'data-shape="cell"', item: "", inner: "", sel: '.toggle-group[data-shape="cell"] .toggle-group__item' };
export const SIZES = ["sm", "md", "lg"], ORIENTATIONS = ["horizontal", "vertical"], STATES = ["on", "off"];
export const CHILDREN = {
  none: "",
  label: "<span>Gentle</span>",
  rows: "<span>Gentle</span><span>0.5 s · ζ 0.8</span>",
  media: '<svg viewBox="0 0 1 1" aria-hidden="true"></svg><span>Gentle</span>',
};
export const ITEM_CLASS = "toggle-group__item control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring";
export const plants = (sel) => ({
  a: `:is(${sel}) { border-radius: 12px; }`,
  s: `.toggle-group[data-size="sm"] :is(${sel}) { border-radius: var(--radius-panel); }`,
  h: `.toggle-group__item:has(> * + *) { border-radius: 12px; }`,
});
/** The fixture's sheet: the stadium on every item, the field rung on the tile, once. */
export const CLEAN_SHEET = `.toggle-group__item { border-radius: var(--radius-pill); }
.toggle-group[data-shape="cell"] .toggle-group__item { border-radius: var(--radius-field); }
.toggle-group__item:focus-visible { border-radius: inherit; }`;

/** In the page: mount the twins, walk the sheets, judge the law. Returns plain data. */
function canonRead({ tile, sizes, orientations, states, children, itemClass }) {
  const host = document.createElement("div");
  host.setAttribute("data-canon", "");
  host.style.cssText = "position: absolute; left: -10000px; top: 0;";
  const twins = [];
  for (const size of sizes) for (const o of orientations) for (const [ck, inner] of Object.entries(children)) for (const st of states) {
    const mk = (isTile) => {
      const g = document.createElement("div");
      g.innerHTML = `<div class="toggle-group" data-slot="toggle-group" role="radiogroup" data-type="single" data-size="${size}" data-orientation="${o}" ${isTile ? tile.group : ""}><button type="button" class="${itemClass}" data-slot="toggle-group-item" role="radio" data-state="${st}" data-orientation="${o}" ${isTile ? tile.item : ""}>${isTile ? tile.inner : ""}${inner}</button></div>`;
      host.append(g);
      return g.querySelector("button");
    };
    twins.push({ key: `${size}/${o}/${ck}/${st}`, tile: mk(true), pill: mk(false) });
  }
  document.body.append(host);
  // every style rule, with its selector made absolute (CSS nesting: `&` is the parent's selector list)
  const rules = [];
  const walk = (list, parentSel, sheet) => {
    for (const r of list) {
      let sel = parentSel;
      if (r.selectorText !== undefined && r.style) {
        sel = parentSel ? (r.selectorText.includes("&") ? r.selectorText.replaceAll("&", `:is(${parentSel})`) : `:is(${parentSel}) ${r.selectorText}`) : r.selectorText;
        const decl = [];
        for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; if (/^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/.test(p)) decl.push(p); }
        if (r.style.getPropertyValue("border-radius")) decl.unshift("border-radius");
        if (decl.length) {
          const value = r.style.getPropertyValue("border-radius") || r.style.getPropertyValue(decl[decl.length - 1]);
          rules.push({ sel, value: value.trim(), sheet });
        }
      }
      if (r.cssRules) walk(r.cssRules, sel, sheet);
    }
  };
  [...document.styleSheets].forEach((s, k) => { try { walk(s.cssRules, "", s.ownerNode?.getAttribute?.("data-canon-sheet") ?? (s.href ? s.href.split("/").pop() : `inline#${k}`)); } catch { /* cross-origin: none here */ } });
  // split a selector list at top-level commas
  const split = (sel) => { const out = []; let d = 0, cur = ""; for (const ch of sel) { if (ch === "(" ) d++; if (ch === ")") d--; if (ch === "," && !d) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
  const strip = (s) => s.replace(/::?(before|after|hover|active|focus-visible|focus-within|focus|marker|placeholder|backdrop)\b(\([^)]*\))?/g, "").trim() || "*";
  const tileOnly = [], pillScoped = [], unmatched = [];
  for (const r of rules) for (const one of split(r.sel)) {
    const host = strip(one);
    let onTile = [], onPill = [];
    try {
      for (const t of twins) { if (t.tile.matches(host)) onTile.push(t.key); if (t.pill.matches(host)) onPill.push(t.key); }
    } catch (e) { unmatched.push({ sel: one, sheet: r.sheet, error: String(e.message ?? e).slice(0, 80) }); continue; }
    const only = onTile.filter((k) => !onPill.includes(k));
    if (only.length) tileOnly.push({ sel: one, value: r.value, sheet: r.sheet, twins: only.length, first: only[0] });
    if (onPill.length && /toggle-group/.test(one)) pillScoped.push({ sel: one, value: r.value, sheet: r.sheet, twins: onPill.length });
  }
  host.remove();
  return { twins: twins.length, rules: rules.length, tileOnly, pillScoped, unmatched };
}

export function judgeCanon(m) {
  const rows = [];
  const distinct = [...new Map(m.tileOnly.map((r) => [`${r.sheet}|${r.sel}`, r])).values()];
  const one = distinct.length === 1 && distinct[0].value === "var(--radius-field)";
  rows.push({ pass: one, what: "tile corner", line: `exactly one rule reaches a tile and not its pill twin, on var(--radius-field) · ${distinct.length} rule(s)${distinct.length ? ": " + distinct.map((r) => `«${r.sel}» → ${r.value} (${r.sheet}; ${r.twins}/${m.twins} twins, first ${r.first})`).join("; ") : ": no rule declares the tile"}` });
  const bad = m.pillScoped.filter((r) => !["var(--radius-pill)", "inherit"].includes(r.value));
  rows.push({ pass: bad.length === 0, what: "pill corner", line: `every group-scoped corner on a pill is var(--radius-pill) or inherit · ${m.pillScoped.length} rule(s) reach a pill${bad.length ? `; ${bad.length} do not: ` + bad.map((r) => `«${r.sel}» → ${r.value} (${r.sheet}; ${r.twins} twins)`).join("; ") : ""}` });
  rows.push({ pass: m.unmatched.length === 0, what: "unmatched", line: `every corner selector is matched by the engine · ${m.unmatched.length} unmatched${m.unmatched.length ? ": " + m.unmatched.slice(0, 3).map((u) => `«${u.sel}» (${u.error})`).join("; ") : ""}` });
  return rows;
}

/** The tile spelling for a target: route.json's `canon`, else D′'s declaration. */
export function tileFor(target) {
  const route = target.meta?.route;
  if (route) { try { const cfg = JSON.parse(fs.readFileSync(path.join(route, "route.json"), "utf8")); if (cfg.canon) return { ...DEFAULT_TILE, ...cfg.canon }; } catch {} }
  return DEFAULT_TILE;
}

const FIXTURE_HTML = (sheets) => `<!doctype html><meta charset="utf-8"><title>canon</title>
${sheets.map(([name, css]) => `<style data-canon-sheet="${name}">${css}</style>`).join("\n")}
<body><script>window.__tile = { ready: true, scenes: [] };</script></body>`;

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CANON", async (args, target) => {
    const engine = engineOf(args);
    const tile = target.kind === "fixture" ? DEFAULT_TILE : tileFor(target);
    const plantKey = target.kind === "fixture" ? (target.fault.startsWith("canon-") ? target.fault.slice(6) : "") : typeof args.plant === "string" ? args.plant : "";
    const plantCss = plantKey ? plants(tile.sel)[plantKey] : "";
    if (plantKey && !plantCss) throw new Error(`--plant is one of a, s, h`);
    let P;
    if (target.kind === "fixture") {
      // the fixture: its own page with the clean sheet (and the plant in a second sheet)
      const srv = await serve(() => FIXTURE_HTML([["fixture.css", CLEAN_SHEET], ...(plantCss ? [[`plant-${plantKey}.css`, plantCss]] : [])]));
      P = await openPage({ ...target, url: (q) => `${srv.url}/?${q}` }, engine, "__index");
      P.srvClose = srv.close;
    } else {
      P = await openPage(target, engine, "__index");
      if (plantCss) await P.page.addStyleTag({ content: plantCss });
    }
    const m = await P.page.evaluate(canonRead, { tile, sizes: SIZES, orientations: ORIENTATIONS, states: STATES, children: CHILDREN, itemClass: ITEM_CLASS });
    await P.close(); if (P.srvClose) await P.srvClose();
    const cells = judgeCanon(m).map((r) => ({ gating: true, pass: r.pass, scene: "canon", arm: "library",
      line: `canon ${r.what}${plantKey ? ` (plant ${plantKey.toUpperCase()})` : ""} · ${m.twins} twins, ${m.rules} corner rules · tile spelling «${tile.sel}» · ${r.line}` }));
    return { id: "CANON", title: "the canon unit's law on widened fixtures (size, orientation, children, state), parsed by the engine", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
