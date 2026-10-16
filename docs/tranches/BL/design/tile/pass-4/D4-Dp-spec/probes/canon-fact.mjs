#!/usr/bin/env node
// canon-fact.mjs · D4-D′ pass-4 spec seat probe. CANON's law (../../../harness/canon.mjs, H3-4) read with the one thing
// floor v3 needs and canon.mjs does not do (FLOOR-V3 §5, F3-1): a rule inside a container query reaches a twin only
// when its condition holds there. `@container [not] style(--selection-tile: V)` is evaluated against the computed
// `--selection-tile` of the twin's PARENT (an unnamed style query's container is the nearest ancestor, and every
// element is a style container). Any other container condition is a FAIL (unmatched), never "no reach".
// Everything else is canon.mjs's: the 48 twins, the walk, the strip, judgeCanon's three laws, plants A / S / H on the
// route's tile spelling. A route probe, not a witness: it does not edit or replace the harness (one hash, H4-4); the
// cure belongs in canon.mjs at the next harness revision (H5).
//   node canon-fact.mjs --build <dir> [--plant a|s|h] [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf } from "../../../harness/lib.mjs";
import { DEFAULT_TILE, SIZES, ORIENTATIONS, STATES, CHILDREN, ITEM_CLASS, plants, judgeCanon, tileFor } from "../../../harness/canon.mjs";

function canonFactRead({ tile, sizes, orientations, states, children, itemClass }) {
  const host = document.createElement("div");
  host.setAttribute("data-canon", "");
  host.style.cssText = "position: absolute; left: -10000px; top: 0;";
  const twins = [];
  for (const size of sizes) for (const o of orientations) for (const [ck, inner] of Object.entries(children)) for (const st of states) {
    const mk = (isTile) => {
      const g = document.createElement("div");
      g.innerHTML = `<div class="toggle-group" data-slot="toggle-group" role="radiogroup" data-type="single" data-size="${size}" data-orientation="${o}" ${isTile ? tile.group : ""}><button type="button" class="${itemClass} pill-row" data-slot="toggle-group-item" role="radio" data-state="${st}" data-orientation="${o}" ${isTile ? tile.item : ""}>${isTile ? tile.inner : ""}${inner}</button></div>`;
      host.append(g);
      return g.querySelector("button");
    };
    twins.push({ key: `${size}/${o}/${ck}/${st}`, tile: mk(true), pill: mk(false) });
  }
  document.body.append(host);
  const factOf = (item) => getComputedStyle(item.parentElement).getPropertyValue("--selection-tile").trim();
  const facts = twins.map((t) => `${factOf(t.tile)}/${factOf(t.pill)}`);
  const rules = [];
  const walk = (list, parentSel, conds, sheet) => {
    for (const r of list) {
      let sel = parentSel, c = conds;
      if (typeof CSSContainerRule !== "undefined" && r instanceof CSSContainerRule) c = [...conds, (r.conditionText ?? r.containerQuery ?? "").trim()];
      if (r.selectorText !== undefined && r.style) {
        sel = parentSel ? (r.selectorText.includes("&") ? r.selectorText.replaceAll("&", `:is(${parentSel})`) : `:is(${parentSel}) ${r.selectorText}`) : r.selectorText;
        const decl = [];
        for (let i = 0; i < r.style.length; i++) { const p = r.style[i]; if (/^border(-(top|bottom|start|end)-(left|right|start|end))?-radius$/.test(p)) decl.push(p); }
        if (r.style.getPropertyValue("border-radius")) decl.unshift("border-radius");
        if (decl.length) {
          const value = r.style.getPropertyValue("border-radius") || r.style.getPropertyValue(decl[decl.length - 1]);
          rules.push({ sel, conds: c, value: value.trim(), sheet });
        }
      }
      if (r.cssRules) walk(r.cssRules, sel, c, sheet);
    }
  };
  [...document.styleSheets].forEach((s, k) => { try { walk(s.cssRules, "", [], s.href ? s.href.split("/").pop() : `inline#${k}`); } catch { /* cross-origin: none here */ } });
  const split = (sel) => { const out = []; let d = 0, cur = ""; for (const ch of sel) { if (ch === "(") d++; if (ch === ")") d--; if (ch === "," && !d) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
  const strip = (s) => s.replace(/::?(before|after|hover|active|focus-visible|focus-within|focus|marker|placeholder|backdrop)\b(\([^)]*\))?/g, "").trim() || "*";
  const holds = (el, cond) => {
    const m = cond.match(/^(not\s+)?\(?\s*style\(\s*--selection-tile\s*:\s*([\w-]+)\s*\)\s*\)?$/);
    if (!m) throw new Error(`container condition not evaluated: ${cond}`);
    return (factOf(el) === m[2]) !== !!m[1];
  };
  const tileOnly = [], pillScoped = [], unmatched = [];
  for (const r of rules) for (const one of split(r.sel)) {
    const label = one + (r.conds.length ? ` @container ${r.conds.join(" & ")}` : "");
    const onTile = [], onPill = [];
    try {
      const reaches = (el) => r.conds.every((c) => holds(el, c)) && el.matches(strip(one));
      for (const t of twins) { if (reaches(t.tile)) onTile.push(t.key); if (reaches(t.pill)) onPill.push(t.key); }
    } catch (e) { unmatched.push({ sel: label, sheet: r.sheet, error: String(e.message ?? e).slice(0, 80) }); continue; }
    const only = onTile.filter((k) => !onPill.includes(k));
    if (only.length) tileOnly.push({ sel: label, value: r.value, sheet: r.sheet, twins: only.length, first: only[0] });
    if (onPill.length && /toggle-group/.test(one)) pillScoped.push({ sel: label, value: r.value, sheet: r.sheet, twins: onPill.length });
  }
  host.remove();
  return { twins: twins.length, rules: rules.length, containered: rules.filter((r) => r.conds.length).length, facts: [...new Set(facts)], tileOnly, pillScoped, unmatched };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CANON-FACT", async (args, target) => {
    const engine = engineOf(args);
    const tile = target.kind === "fixture" ? DEFAULT_TILE : tileFor(target);
    const plantKey = typeof args.plant === "string" ? args.plant : "";
    const plantCss = plantKey ? plants(tile.sel)[plantKey] : "";
    if (plantKey && !plantCss) throw new Error("--plant is one of a, s, h");
    const P = await openPage(target, engine, "__index");
    if (plantCss) await P.page.addStyleTag({ content: plantCss });
    const m = await P.page.evaluate(canonFactRead, { tile, sizes: SIZES, orientations: ORIENTATIONS, states: STATES, children: CHILDREN, itemClass: ITEM_CLASS });
    await P.close();
    const factCell = { gating: true, pass: m.facts.length === 1 && m.facts[0] === "flush/none", scene: "canon", arm: "library",
      line: `canon-fact twin facts${plantKey ? ` (plant ${plantKey.toUpperCase()})` : ""} · every tile twin's group computes flush and every pill twin's none · read ${m.facts.join(", ")}` };
    const cells = [factCell, ...judgeCanon(m).map((r) => ({ gating: true, pass: r.pass, scene: "canon", arm: "library",
      line: `canon-fact ${r.what}${plantKey ? ` (plant ${plantKey.toUpperCase()})` : ""} · ${m.twins} twins, ${m.rules} corner rules (${m.containered} inside a container query, each evaluated on the twin's fact) · tile spelling «${tile.sel}» · ${r.line}` }))];
    return { id: "CANON-FACT", title: "CANON's law with each container condition evaluated on the twin's fact (route probe; F3-1)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}
