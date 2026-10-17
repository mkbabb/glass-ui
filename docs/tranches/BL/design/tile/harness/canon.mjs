#!/usr/bin/env node
// canon.mjs · H3-4, H5-1 · CANON, R-7's one instrument: the canon law on widened twins, read in the engine with the
// cascade it actually runs (REGISTRY §P4-6.2 H5-1, M-14).
//
// H3-4 widened the canon unit's fixtures (48 twins) and parsed every corner rule in the engine. On floor v3 it went
// blind (F3-1): the tile corner is a `.toggle-group__item` rule inside `@container not style(--selection-tile: none)`,
// which CANON read as reaching every pill too, so it found no tile corner at all. Pass 4's two critics then found two
// plants outside A, S and H that every unit passed (`D′c` §5.2): a fact reset unlayered after the layer (no tile
// anywhere), and a pill corner from a selector that does not name `toggle-group`. H5-1 makes CANON read what the
// engine paints:
//
//   CONTAINERS  each rule's enclosing `@container [name] <condition>` is evaluated against the twin's own query
//               container: an unnamed style query's container is the subject's parent (every element is a style
//               container), a named one the nearest ancestor whose `container-name` lists it. `style(--p: v)`,
//               `style(--p)`, `not`, `and`, `or` and parentheses are read; `--p` is the container's computed value
//               (the engine's own cascade of the fact, so an unlayered reset after the layer is seen as it paints).
//               Any other condition is UNEVALUATED, which fails the `unmatched` law: never "no reach"
//   CASCADE     the corner each twin wears is the winner among the rules that reach it, ranked as CSS Cascade 5 ranks
//               them: importance, then cascade LAYER (unlayered above every layer for a normal declaration and below
//               every layer for an `!important` one; a later layer above an earlier one, reversed for `!important`;
//               a declaration directly in a layer above that layer's sublayers), then specificity, then order of
//               appearance. `@media` and `@supports` are evaluated on the page; `@scope` is read with its root and
//               limit. A specificity-first ranker passes the `unlayered` plant and fails the `lowlayer` control
//   REACH       every rule that sets `border-radius` or a corner longhand and reaches an item, WHATEVER its selector
//               names (`D′c` §5.2 `foreign`). A rule whose subject is a pseudo-element sets the pseudo-element's
//               corner, not the item's, and is listed, not ranked
//   STATES      the winner is read twice per twin: at REST (the selector as written: `:hover`, `:focus-visible`,
//               `:active` match nothing on an unfocused, unhovered twin) and ENGAGED (state pseudo-classes stripped,
//               as the pass-2 unit did, so a corner that only an engaged state writes is still read)
//
//   LAW (1) tile corner   exactly one rule reaches a tile and not its pill twin, and its corner is var(--radius-field)
//       (2) tile winner   every tile twin wears var(--radius-field) at rest, and var(--radius-field) or inherit engaged
//       (3) pill winner   every pill twin wears var(--radius-pill) at rest, and var(--radius-pill) or inherit engaged
//       (4) unmatched     every corner selector is matched by the engine and every condition around it is evaluated
//
// FIXTURES  every item twin (tile and pill: the same group, item and children, the tile spelling on or off) at size
//           sm | md | lg × orientation horizontal | vertical × children none | one label | two rows | media and label
//           × state on | off: 3 × 2 × 4 × 2 = 48 twins. The item carries the library's classes (`pill-row` since
//           floor v3), so a rule on any of them reaches it.
// The tile spelling is the route's: `route.json` → `"canon": { "group": "<attrs>", "item": "<attrs>", "inner":
// "<html>", "sel": "<a selector that reaches the tile>" }`. The default is D′'s declaration (`data-shape="cell"` on the
// group). The plants on a build are spelled on `sel`, so each route is planted on its own spelling:
//   a         the same reach in a second sheet in another spelling (`:is(<sel>)`) at 12 px: two tile corners
//   s         a size arm on the tile, `.toggle-group[data-size="sm"] :is(<sel>)` on --radius-panel
//   h         a structural re-spelling, `.toggle-group__item:has(> * + *)` at 12 px
//   layer     `D′c` §5.2: an unlayered `.toggle-group { --selection-tile: none }` after the layer: no tile anywhere
//   foreign   `D′c` §5.2: `.pill-row.control-surface { border-radius: 12px }` in `@layer components`: a pill corner
//             from a selector that does not name toggle-group
//   unlayered `:where(.toggle-group__item) { border-radius: 12px }` unlayered: zero specificity, but above the layer
//   cq        `@layer components { @container style(--selection-tile: none) { .toggle-group__item.control-surface
//             { border-radius: 12px } } }`: a pill corner that only a container condition scopes
// and two controls that must PASS: `lowlayer` (a (0,3,0) corner in `@layer base`, below the library's layer) and
// `cqoff` (the `cq` rule under `style(--selection-tile: plated)`, which no twin's container holds).
//
//   node canon.mjs --build <dir> [--plant a|s|h|layer|foreign|unlayered|cq|lowlayer|cqoff] [--engine chromium|webkit]
//   node canon.mjs --fixture [--fault canon-<plant>] [--engine chromium|webkit]
// On a build the page's own sheets are read (the library as the scene app bundles it); with no tile writer law (1)
// FAILS, as it should. The fixture's sheet is the floor-v3 shape: the fact, a declaration that writes it, the stadium,
// and the field corner under the container condition.
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
export const ITEM_CLASS = "toggle-group__item pill-row control-surface glass-control-edge glass-capsule-hover tap-squish focus-ring";
export const PLANTS = ["a", "s", "h", "layer", "foreign", "unlayered", "cq", "lowlayer", "cqoff"];
export const plants = (sel) => ({
  a: `:is(${sel}) { border-radius: 12px; }`,
  s: `.toggle-group[data-size="sm"] :is(${sel}) { border-radius: var(--radius-panel); }`,
  h: `.toggle-group__item:has(> * + *) { border-radius: 12px; }`,
  layer: `.toggle-group { --selection-tile: none; }`,
  foreign: `@layer components { .pill-row.control-surface { border-radius: 12px; } }`,
  unlayered: `:where(.toggle-group__item) { border-radius: 12px; }`,
  cq: `@layer components { @container style(--selection-tile: none) { .toggle-group__item.control-surface { border-radius: 12px; } } }`,
  lowlayer: `@layer base { .toggle-group .toggle-group__item.control-surface { border-radius: 12px; } }`,
  cqoff: `@layer components { @container style(--selection-tile: plated) { .toggle-group__item.control-surface { border-radius: 12px; } } }`,
});
/** The fixture's sheet: the fact, its writer, the stadium on every item and the field corner on the tile, once. */
export const CLEAN_SHEET = `@property --selection-tile { syntax: "none | flush | plated"; inherits: true; initial-value: none; }
@layer base, components;
@layer components {
  .toggle-group { --selection-tile: none; }
  .toggle-group[data-shape="cell"] { --selection-tile: flush; }
  .toggle-group__item { border-radius: var(--radius-pill); }
  .toggle-group__item:focus-visible { border-radius: inherit; }
  .toggle-group__item::before { border-radius: inherit; }
  @container not style(--selection-tile: none) {
    .toggle-group__item { border-radius: var(--radius-field) !important; }
  }
}`;

/** In the page: mount the twins, walk the sheets with their layers and conditions, rank each twin's corner. */
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

  // ── layers: the order each layer name is first seen, per parent ──
  const layerKids = new Map(); // parent path key → [child names in first-seen order]
  let anon = 0;
  const regLayer = (parent, name) => {
    const k = parent.join(".");
    if (!layerKids.has(k)) layerKids.set(k, []);
    const kids = layerKids.get(k);
    if (!kids.includes(name)) kids.push(name);
    return [...parent, name];
  };
  const regPath = (parent, dotted) => { let p = parent; for (const n of dotted.split(".")) p = regLayer(p, n.trim()); return p; };
  const layerIndex = (p) => p.map((n, i) => layerKids.get(p.slice(0, i).join(".")).indexOf(n));

  // ── the walk: every corner declaration with its selector, importance, layer, conditions and order ──
  const rules = [];
  const inactive = [];
  let order = 0;
  const CORNER = /^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/;
  const walk = (list, ctx) => {
    for (const r of list) {
      const c = { ...ctx };
      const T = r.constructor?.name;
      if (T === "CSSImportRule") {
        let lp = c.layer;
        if (r.layerName !== null && r.layerName !== undefined) lp = r.layerName === "" ? regLayer(c.layer, `#anon${anon++}`) : regPath(c.layer, r.layerName);
        try { if (r.styleSheet) walk(r.styleSheet.cssRules, { ...c, layer: lp }); } catch {}
        continue;
      }
      if (T === "CSSLayerStatementRule") { for (const n of r.nameList) regPath(c.layer, n); continue; }
      if (T === "CSSLayerBlockRule") c.layer = r.name ? regPath(c.layer, r.name) : regLayer(c.layer, `#anon${anon++}`);
      if (T === "CSSMediaRule") c.media = [...c.media, r.media.mediaText];
      if (T === "CSSSupportsRule") c.supports = [...c.supports, r.conditionText];
      if (T === "CSSContainerRule") {
        let name = (r.containerName ?? "").trim(), query = r.containerQuery;
        if (query === undefined) { // an engine without containerQuery: the name, if any, leads conditionText
          const t = (r.conditionText ?? "").trim(), m = t.match(/^(?!not\b|style\b)([A-Za-z_][\w-]*)\s+(.*)$/s);
          if (m) { name = m[1]; query = m[2]; } else query = t;
        }
        c.conds = [...c.conds, { name, query: query.trim() }];
      }
      if (T === "CSSScopeRule") c.scope = { start: r.start ?? ":root", end: r.end ?? null };
      // a nested rule's selector is made absolute (`&` is the parent's list); declarations after a nested rule
      // (CSSNestedDeclarations) belong to the parent's selector
      if (r.selectorText !== undefined && r.style) c.sel = c.sel ? (r.selectorText.includes("&") ? r.selectorText.replaceAll("&", `:is(${c.sel})`) : `:is(${c.sel}) ${r.selectorText}`) : r.selectorText;
      if (r.style && (r.selectorText !== undefined || T === "CSSNestedDeclarations") && c.sel) {
        const props = [];
        for (let i = 0; i < r.style.length; i++) if (CORNER.test(r.style[i])) props.push(r.style[i]);
        if (props.length) {
          const short = r.style.getPropertyValue("border-radius");
          const value = (short || r.style.getPropertyValue(props[props.length - 1])).trim();
          const important = (short ? r.style.getPropertyPriority("border-radius") : r.style.getPropertyPriority(props[props.length - 1])) === "important";
          const rec = { sel: c.sel, value, important, layer: c.layer, conds: c.conds, scope: c.scope, sheet: c.sheet, order: order++, media: c.media, supports: c.supports };
          const active = c.media.every((m) => matchMedia(m).matches) && c.supports.every((s) => CSS.supports(s));
          if (active) rules.push(rec); else inactive.push(rec);
        }
      }
      if (r.cssRules) walk(r.cssRules, c);
    }
  };
  [...document.styleSheets].forEach((s, k) => {
    const sheet = s.ownerNode?.getAttribute?.("data-canon-sheet") ?? (s.href ? s.href.split("/").pop() : `inline#${k}`);
    try { walk(s.cssRules, { sel: "", layer: [], conds: [], media: [], supports: [], scope: null, sheet }); } catch { /* cross-origin: none here */ }
  });

  // ── selectors ──
  const split = (sel) => { const out = []; let d = 0, cur = "", q = null; for (const ch of sel) { if (q) { if (ch === q) q = null; cur += ch; continue; } if (ch === '"' || ch === "'") q = ch; if (ch === "(" || ch === "[") d++; if (ch === ")" || ch === "]") d--; if (ch === "," && !d) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
  const STATE = /:(hover|active|focus-visible|focus-within|focus)\b/g;
  const PSEUDO_EL = /::[\w-]+(\([^)]*\))?|:(before|after|first-line|first-letter)\b/g;
  const pseudoSubject = (s) => /(::[\w-]+(\([^)]*\))?|:(before|after|first-line|first-letter))\s*$/.test(s);
  /** specificity [a, b, c] of one complex selector (CSS Selectors 4: :is/:not/:has the max of their arguments, :where 0) */
  const spec = (s) => {
    let a = 0, b = 0, c = 0, i = 0;
    const ident = () => { while (i < s.length && (/[\w\- -￿]/.test(s[i]) || s[i] === "\\")) i += s[i] === "\\" ? 2 : 1; };
    const parens = () => { if (s[i] !== "(") return ""; let d = 0, st = i; for (; i < s.length; i++) { if (s[i] === "(") d++; else if (s[i] === ")" && --d === 0) { i++; break; } } return s.slice(st + 1, i - 1); };
    const maxOf = (list) => split(list).map(spec).reduce((m, x) => (x[0] > m[0] || (x[0] === m[0] && (x[1] > m[1] || (x[1] === m[1] && x[2] > m[2]))) ? x : m), [0, 0, 0]);
    while (i < s.length) {
      const ch = s[i];
      if (ch === "#") { a++; i++; ident(); }
      else if (ch === ".") { b++; i++; ident(); }
      else if (ch === "[") { b++; let q = null; for (; i < s.length; i++) { if (q) { if (s[i] === q) q = null; continue; } if (s[i] === '"' || s[i] === "'") q = s[i]; else if (s[i] === "]") { i++; break; } } }
      else if (ch === ":" && s[i + 1] === ":") { c++; i += 2; ident(); parens(); }
      else if (ch === ":") {
        i++; const st = i; ident(); const name = s.slice(st, i).toLowerCase();
        if (name === "where") parens();
        else if (["is", "not", "has", "matches", "-webkit-any", "any"].includes(name)) { const m = maxOf(parens()); a += m[0]; b += m[1]; c += m[2]; }
        else if (["nth-child", "nth-last-child"].includes(name)) { b++; const arg = parens(); const of = arg.match(/\bof\s+(.+)$/s); if (of) { const m = maxOf(of[1]); a += m[0]; b += m[1]; c += m[2]; } }
        else if (["before", "after", "first-line", "first-letter"].includes(name)) c++;
        else { b++; parens(); }
      }
      else if (/[A-Za-z_\\ -￿]/.test(ch) || (ch === "-" && /[A-Za-z_-]/.test(s[i + 1] ?? ""))) { c++; ident(); }
      else i++;
    }
    return [a, b, c];
  };

  // ── container conditions, on the twin's own query container ──
  const containerOf = (el, name) => {
    if (!name) return el.parentElement;
    for (let p = el.parentElement; p; p = p.parentElement) if (getComputedStyle(p).containerName.split(/\s+/).includes(name)) return p;
    return null;
  };
  /** evaluate a container query string on container `ct`; throws "unevaluated" on anything but style() logic */
  const evalQuery = (q, ct) => {
    let i = 0;
    const ws = () => { while (/\s/.test(q[i] ?? "")) i++; };
    const word = (w) => { ws(); if (q.slice(i, i + w.length).toLowerCase() === w && !/[\w-]/.test(q[i + w.length] ?? "")) { i += w.length; return true; } return false; };
    const balanced = () => { let d = 0, st = i; for (; i < q.length; i++) { if (q[i] === "(") d++; else if (q[i] === ")" && --d === 0) { i++; break; } } return q.slice(st + 1, i - 1); };
    const decl = (body) => {
      const m = body.trim().match(/^(--[\w-]+)\s*(?::\s*(.+))?$/s);
      if (!m) throw new Error(`unevaluated style() «${body.trim()}»`);
      const got = ct ? getComputedStyle(ct).getPropertyValue(m[1]).trim().replace(/\s+/g, " ") : "";
      return m[2] === undefined ? got !== "" : got === m[2].trim().replace(/\s+/g, " ");
    };
    const primary = () => {
      ws();
      if (/^style\(/i.test(q.slice(i))) { i += 5; return decl(balanced()); }
      if (q[i] === "(") return evalQuery(balanced(), ct);
      throw new Error(`unevaluated container condition «${q.slice(i).slice(0, 60)}»`);
    };
    const not = () => (word("not") ? !primary() : primary());
    const and = () => { let v = not(); while (word("and")) v = not() && v; return v; };
    const or = () => { let v = and(); while (word("or")) v = and() || v; return v; };
    const v = or(); ws();
    if (i < q.length) throw new Error(`unevaluated container condition tail «${q.slice(i, i + 40)}»`);
    return v;
  };
  const condsHold = (el, conds) => conds.every((c) => evalQuery(c.query, containerOf(el, c.name)));
  const inScope = (el, scope) => {
    if (!scope) return true;
    const root = el.closest(scope.start);
    if (!root) return false;
    if (!scope.end) return true;
    for (let p = el; p && p !== root; p = p.parentElement) if (p.matches(scope.end)) return false;
    return true;
  };
  const scoped = (one, scope) => (!scope ? one : one.includes(":scope") ? one.replaceAll(":scope", `:is(${scope.start})`) : `:is(${scope.start}) ${one}`);

  // ── reach, per selector of each rule ──
  const reached = [];
  const unmatched = [];
  const pseudo = [];
  for (const r of rules) for (const one of split(r.sel)) {
    const label = `${one}${r.conds.length ? ` @container ${r.conds.map((c) => `${c.name ? c.name + " " : ""}${c.query}`).join(" & ")}` : ""}${r.scope ? ` @scope (${r.scope.start})${r.scope.end ? ` to (${r.scope.end})` : ""}` : ""}${r.layer.length ? ` @layer ${r.layer.join(".")}` : " (unlayered)"}${r.important ? " !important" : ""}`;
    if (pseudoSubject(one)) { pseudo.push({ sel: label, value: r.value, sheet: r.sheet }); continue; }
    const empty = (x) => x.replace(/:(not|is|where|has)\(\s*\)/g, "").trim() || "*";
    const rest = scoped(empty(one.replace(PSEUDO_EL, "")), r.scope);
    const engaged = scoped(empty(one.replace(PSEUDO_EL, "").replace(STATE, "")), r.scope);
    const rec = { ...r, one, label, spec: spec(one), restOn: new Set(), engagedOn: new Set() };
    try {
      for (const t of twins) for (const [kind, el] of [["tile", t.tile], ["pill", t.pill]]) {
        if (!inScope(el, r.scope)) continue;
        const hit = el.matches(engaged) && condsHold(el, r.conds);
        if (!hit) continue;
        rec.engagedOn.add(`${kind}|${t.key}`);
        if (el.matches(rest)) rec.restOn.add(`${kind}|${t.key}`);
      }
    } catch (e) { unmatched.push({ sel: label, sheet: r.sheet, error: String(e.message ?? e).slice(0, 100) }); continue; }
    if (rec.engagedOn.size) reached.push(rec);
  }

  // ── the cascade: importance, layer, specificity, order ──
  const layerCmp = (p, q) => { // > 0 when p outranks q for a NORMAL declaration
    const a = layerIndex(p), b = layerIndex(q);
    for (let k = 0; k < Math.max(a.length, b.length); k++) {
      if (k >= a.length) return 1; // p is directly in this layer (or unlayered): above q's sublayer
      if (k >= b.length) return -1;
      if (a[k] !== b[k]) return a[k] - b[k];
    }
    return 0;
  };
  const beats = (x, y) => {
    if (x.important !== y.important) return x.important;
    const l = layerCmp(x.layer, y.layer);
    if (l) return x.important ? l < 0 : l > 0;
    for (let k = 0; k < 3; k++) if (x.spec[k] !== y.spec[k]) return x.spec[k] > y.spec[k];
    return x.order > y.order;
  };
  const winner = (key, set) => { let w = null; for (const r of reached) if (r[set].has(key) && (!w || beats(r, w))) w = r; return w; };
  const wins = [];
  for (const t of twins) for (const kind of ["tile", "pill"]) {
    const key = `${kind}|${t.key}`;
    const rw = winner(key, "restOn"), ew = winner(key, "engagedOn");
    wins.push({ kind, twin: t.key, rest: rw ? { value: rw.value, label: rw.label, sheet: rw.sheet } : null, engaged: ew ? { value: ew.value, label: ew.label, sheet: ew.sheet } : null });
  }
  // the facts the engine computed on each twin's container, printed beside the law
  const factOf = (el) => getComputedStyle(el.parentElement).getPropertyValue("--selection-tile").trim() || "(unset)";
  const facts = [...new Set(twins.map((t) => `${factOf(t.tile)}/${factOf(t.pill)}`))];
  // a rule reaches a tile and not its pill twin when, for some twin pair, it reaches the tile (engaged) and not the pill
  const tileOnly = reached.map((r) => {
    const only = twins.filter((t) => r.engagedOn.has(`tile|${t.key}`) && !r.engagedOn.has(`pill|${t.key}`));
    return only.length ? { sel: r.label, value: r.value, sheet: r.sheet, twins: only.length, first: only[0].key } : null;
  }).filter(Boolean);
  host.remove();
  return {
    twins: twins.length, rules: rules.length + inactive.length, inactive: inactive.length, reached: reached.length,
    containered: reached.filter((r) => r.conds.length).length, layers: [...layerKids.entries()].map(([k, v]) => `${k || "(root)"}: ${v.join(", ")}`).join(" · "),
    facts, tileOnly, wins, unmatched, pseudo,
  };
}

const FIELD = "var(--radius-field)", PILL = "var(--radius-pill)";
export function judgeCanon(m) {
  const rows = [];
  const distinct = [...new Map(m.tileOnly.map((r) => [`${r.sheet}|${r.sel}`, r])).values()];
  const one = distinct.length === 1 && distinct[0].value === FIELD;
  rows.push({ pass: one, what: "tile corner", line: `exactly one rule reaches a tile and not its pill twin, on ${FIELD} · ${distinct.length} rule(s)${distinct.length ? ": " + distinct.map((r) => `«${r.sel}» → ${r.value} (${r.sheet}; ${r.twins}/${m.twins} twins, first ${r.first})`).join("; ") : ": no rule declares the tile"}` });
  const judgeWins = (kind, want) => {
    const bad = m.wins.filter((w) => w.kind === kind && (w.rest?.value !== want || ![want, "inherit"].includes(w.engaged?.value)));
    const sample = [...new Map(bad.map((w) => [`${w.rest?.label}|${w.rest?.value}|${w.engaged?.label}|${w.engaged?.value}`, w])).values()].slice(0, 3);
    const of = m.wins.filter((w) => w.kind === kind).length;
    const restWin = [...new Set(m.wins.filter((w) => w.kind === kind && w.rest).map((w) => `«${w.rest.label}» → ${w.rest.value}`))].slice(0, 2).join("; ");
    return { pass: bad.length === 0, line: `every ${kind} twin wears ${want} at rest and ${want} or inherit engaged, ranked by importance, layer, specificity, order · ${of - bad.length}/${of} twins${bad.length ? `; wrong: ${sample.map((w) => `${w.twin} rest ${w.rest ? `«${w.rest.label}» → ${w.rest.value}` : "no corner rule"}, engaged ${w.engaged ? `«${w.engaged.label}» → ${w.engaged.value}` : "none"}`).join(" | ")}` : `; rest winner ${restWin || "none"}`}` };
  };
  rows.push({ what: "tile winner", ...judgeWins("tile", FIELD) });
  rows.push({ what: "pill winner", ...judgeWins("pill", PILL) });
  rows.push({ pass: m.unmatched.length === 0, what: "unmatched", line: `every corner selector is matched by the engine and every condition around it evaluated · ${m.unmatched.length} not${m.unmatched.length ? ": " + m.unmatched.slice(0, 3).map((u) => `«${u.sel}» (${u.error})`).join("; ") : ""}` });
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
    if (plantKey && !plantCss) throw new Error(`--plant is one of ${PLANTS.join(", ")}`);
    let P;
    if (target.kind === "fixture") {
      // the fixture: its own page with the clean sheet (and the plant in a second sheet, after it)
      const srv = await serve(() => FIXTURE_HTML([["fixture.css", CLEAN_SHEET], ...(plantCss ? [[`plant-${plantKey}.css`, plantCss]] : [])]));
      P = await openPage({ ...target, url: (q) => `${srv.url}/?${q}` }, engine, "__index");
      P.srvClose = srv.close;
    } else {
      P = await openPage(target, engine, "__index");
      if (plantCss) await P.page.addStyleTag({ content: plantCss });
    }
    const m = await P.page.evaluate(canonRead, { tile, sizes: SIZES, orientations: ORIENTATIONS, states: STATES, children: CHILDREN, itemClass: ITEM_CLASS });
    await P.close(); if (P.srvClose) await P.srvClose();
    const head = `${m.twins} twins (tile/pill container facts ${m.facts.join(", ")}), ${m.rules} corner rules (${m.inactive} under an @media/@supports that does not hold; ${m.reached} reach an item, ${m.containered} inside a container query; ${m.pseudo.length} on a pseudo-element, listed not ranked) · tile spelling «${tile.sel}»`;
    const cells = judgeCanon(m).map((r) => ({ gating: true, pass: r.pass, scene: "canon", arm: "library",
      line: `canon ${r.what}${plantKey ? ` (plant ${plantKey})` : ""} · ${r.line} · ${head}` }));
    return { id: "CANON", title: "the canon law on widened twins, each rule's container condition evaluated on the twin and every corner ranked by layer before specificity (H3-4, H5-1; R-7)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells, notes: [`layers ${m.layers || "none"}`] };
  });
}
