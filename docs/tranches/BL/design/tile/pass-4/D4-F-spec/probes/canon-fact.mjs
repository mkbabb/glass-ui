#!/usr/bin/env node
// D4-F pass 4 · R-7 on floor v3: the canon law of `../../harness/canon.mjs` (H3-4), with each corner rule's enclosing
// `@container` conditions EVALUATED against the twin. floor v3 puts the tile corner under
// `@container not style(--selection-tile: none)`, and canon.mjs walks grouping rules without evaluating a condition,
// so on floor v3 it reads the field corner as reaching all 48 pill twins and reads 1/3 for every route (FLOOR-V3.md
// §5 F3-1; the harness cure is H5's). This probe is the route seat's own reading until then: the same twins, the same
// law, the same plants A, S, H on the route's spelling (`route.json` → `canon`), imported from canon.mjs unchanged;
// the one difference is that a rule under `style(<prop>: <v>)` / `not style(…)` reaches a twin only when the twin's
// parent (its query container: every element is a style container) computes the property to match. A condition of
// any other form is printed and treated as met.
//   node canon-fact.mjs --build <dir> [--plant a|s|h] [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf } from "../../../harness/lib.mjs";
import { SIZES, ORIENTATIONS, STATES, CHILDREN, ITEM_CLASS, plants, judgeCanon, tileFor } from "../../../harness/canon.mjs";

function canonFactRead({ tile, sizes, orientations, states, children, itemClass }) {
  const host = document.createElement("div");
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
  const rules = [], odd = new Set();
  const walk = (list, parentSel, conds, sheet) => {
    for (const r of list) {
      let sel = parentSel, cs = conds;
      if (r.constructor?.name === "CSSContainerRule" || r.containerQuery !== undefined || /^@container/.test(r.cssText ?? "")) cs = [...conds, (r.conditionText ?? r.containerQuery ?? "").trim()];
      if (r.selectorText !== undefined && r.style) {
        sel = parentSel ? (r.selectorText.includes("&") ? r.selectorText.replaceAll("&", `:is(${parentSel})`) : `:is(${parentSel}) ${r.selectorText}`) : r.selectorText;
        const decl = [];
        for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; if (/^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/.test(p)) decl.push(p); }
        if (r.style.getPropertyValue("border-radius")) decl.unshift("border-radius");
        if (decl.length) rules.push({ sel, value: (r.style.getPropertyValue("border-radius") || r.style.getPropertyValue(decl[decl.length - 1])).trim(), sheet, conds: cs });
      }
      if (r.cssRules) walk(r.cssRules, sel, cs, sheet);
    }
  };
  [...document.styleSheets].forEach((s, k) => { try { walk(s.cssRules, "", [], s.ownerNode?.getAttribute?.("data-canon-sheet") ?? (s.href ? s.href.split("/").pop() : `inline#${k}`)); } catch {} });
  const STYLE = /^(not\s+)?style\(\s*(--[\w-]+)\s*:\s*([^)]+?)\s*\)$/;
  const met = (conds, el) => conds.every((c) => {
    const m = c.match(STYLE);
    if (!m) { odd.add(c); return true; }
    const v = getComputedStyle(el.parentElement).getPropertyValue(m[2]).trim();
    return m[1] ? v !== m[3] : v === m[3];
  });
  const split = (sel) => { const out = []; let d = 0, cur = ""; for (const ch of sel) { if (ch === "(") d++; if (ch === ")") d--; if (ch === "," && !d) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
  const strip = (s) => s.replace(/::?(before|after|hover|active|focus-visible|focus-within|focus|marker|placeholder|backdrop)\b(\([^)]*\))?/g, "").trim() || "*";
  const tileOnly = [], pillScoped = [], unmatched = [];
  for (const r of rules) for (const one of split(r.sel)) {
    const s = strip(one);
    let onTile = [], onPill = [];
    try {
      for (const t of twins) { if (t.tile.matches(s) && met(r.conds, t.tile)) onTile.push(t.key); if (t.pill.matches(s) && met(r.conds, t.pill)) onPill.push(t.key); }
    } catch (e) { unmatched.push({ sel: one, sheet: r.sheet, error: String(e.message ?? e).slice(0, 80) }); continue; }
    const only = onTile.filter((k) => !onPill.includes(k));
    const tag = r.conds.length ? `@container ${r.conds.join(" / ")} ` : "";
    if (only.length) tileOnly.push({ sel: tag + one, value: r.value, sheet: r.sheet, twins: only.length, first: only[0] });
    if (onPill.length && /toggle-group/.test(one)) pillScoped.push({ sel: tag + one, value: r.value, sheet: r.sheet, twins: onPill.length });
  }
  const facts = { tile: getComputedStyle(twins[0].tile.parentElement).getPropertyValue("--selection-tile").trim(), pill: getComputedStyle(twins[0].pill.parentElement).getPropertyValue("--selection-tile").trim() };
  host.remove();
  return { twins: twins.length, rules: rules.length, tileOnly, pillScoped, unmatched, odd: [...odd], facts };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CANON-FACT", async (args, target) => {
    const engine = engineOf(args);
    const tile = tileFor(target);
    const plantKey = typeof args.plant === "string" ? args.plant : "";
    const plantCss = plantKey ? plants(tile.sel)[plantKey] : "";
    if (plantKey && !plantCss) throw new Error("--plant is one of a, s, h");
    const P = await openPage(target, engine, "__index");
    if (plantCss) await P.page.addStyleTag({ content: plantCss });
    const m = await P.page.evaluate(canonFactRead, { tile, sizes: SIZES, orientations: ORIENTATIONS, states: STATES, children: CHILDREN, itemClass: ITEM_CLASS });
    await P.close();
    const cells = judgeCanon(m).map((r) => ({ gating: true, pass: r.pass, scene: "canon", arm: "library",
      line: `canon-fact ${r.what}${plantKey ? ` (plant ${plantKey.toUpperCase()})` : ""} · ${m.twins} twins, ${m.rules} corner rules · twin facts tile ${m.facts.tile} / pill ${m.facts.pill} · tile spelling «${tile.sel}» · ${r.line}${m.odd.length ? ` · conditions not evaluated: ${m.odd.join(" | ")}` : ""}` }));
    return { id: "CANON-FACT", title: "the canon law with @container style() conditions evaluated (R-7 on floor v3; F3-1's blind spot)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
