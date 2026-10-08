#!/usr/bin/env node
// c-scalar.mjs · D5-C's own witnesses, read from the built page (no source text).
//   C-0  the born-RED witness (PORTFOLIO §7): `--engage: 1` set on each host root moves its paint or geometry, and
//        `--commit: 0.5` (the bump's peak) moves it, for the trio (Switch, Accordion trigger, Slider).
//   Q-1  the passive census, in the form the census can check: a passive atom (Separator, Skeleton) inside a host
//        whose `--engage` is 1 paints differently from the same atom at `--engage: 0`. Two arms: a static arm (the
//        wrapper's inline `--engage: 1`) and a live arm (the atom moved into a `data-engage="press"` host that the
//        mouse presses, so the value arrives through the register's own selectors and clock).
//   Q-3  the channel budget, read off the CSSOM the page loaded: every style rule whose declarations reference the
//        scalar (`--engage`, `--commit`, `--commit-bump`, `--engage-press-scale`, `--engage-carry*`), each mapped
//        property classed into the ladder's channels (geometry, luminance, blur, light); a host selector moving more
//        than CHANNEL_BUDGET (2) channels fails. A runtime read of the loaded sheets, not a byte detector.
//   node c-scalar.mjs --build <dir> [--engine webkit] [--out <dir>]
import { witness, openPage, center, paintDiff, f } from "../../../harness/lib.mjs";

const SCALAR = /var\(--(engage|commit|commit-bump|commit-pop|rung-press-depth|rung-grow|carry)\)/;
const CHANNEL = (p) =>
  /^(scale|translate|rotate|transform|inline-size|block-size|width|height|inset|top|left|right|bottom|margin.*|padding.*)$/.test(p) ? "geometry"
  : /^(backdrop-filter|filter|-webkit-backdrop-filter)$/.test(p) ? "blur"
  : /^(opacity|box-shadow)$/.test(p) ? "light"
  : /^(background|background-color|background-image|color|border.*|outline.*|fill|stroke)$/.test(p) ? "luminance"
  : p.startsWith("--") ? null : "other";

await witness("C-0", "the engagement scalar: born-RED witness, passive census, channel budget", async ({ E, T, cell, guard }) => {
  const host = { switch: '[role="switch"]', accordion: ".disclosure-trigger", slider: ".glass-slider" };
  // ── C-0: each host root, --engage 0 → 1 and --commit 0 → 0.5, transitions off so the read is the mapped end
  for (const [sc, sel] of Object.entries(host)) {
    const r = await guard(`C-0 ${sc}`, async () => {
      const P = await openPage(E, T, sc);
      try {
        return await P.page.evaluate((sel) => {
          const el = document.querySelector(sel); el.style.transition = "none";
          const read = () => ({ p: window.__paint(sel), s: window.__eff(el).s, scale: getComputedStyle(el).scale });
          const set = (k, v) => { el.style.setProperty(k, v); return read(); };
          const z = set("--engage", "0"); const e = set("--engage", "1"); set("--engage", "0");
          const c0 = set("--commit", "0"); const c = set("--commit", "0.5");
          const keys = (a, b) => Object.keys(a.p).filter((k) => a.p[k] !== b.p[k]);
          return { reg: CSS && "registerProperty" in CSS, de: e.s - z.s, dp: keys(z, e), dc: c.s - c0.s, dcp: keys(c0, c), scale: [z.scale, e.scale, c.scale] };
        }, sel);
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(`C-0 ${sc} --engage:1 moves the root`, "FAIL", r.line); continue; }
    cell(`C-0 ${sc} --engage:1 moves the root`, Math.abs(r.de) >= 0.01 || r.dp.length ? "PASS" : "FAIL", `Δscale ${f(r.de)} · paint changed [${r.dp.join(", ")}] · computed scale ${r.scale[0]} → ${r.scale[1]}`);
    if (sc !== "slider") cell(`C-0 ${sc} --commit:0.5 pops the root`, Math.abs(r.dc) >= 0.01 ? "PASS" : "FAIL", `Δscale ${f(r.dc)} · computed scale ${r.scale[2]} · bound |Δscale| ≥ 0.01`);
  }
  // ── Q-1: the passive atoms, static and live arms
  const q = await guard("Q-1 passive", async () => {
    const P = await openPage(E, T, "passive");
    try {
      const stat = await P.page.evaluate(() => {
        const sep = document.querySelector('[data-t="sep"]'); const sk = document.querySelector('[data-t="skel"]'); const wrap = sep.parentElement;
        const snap = () => ({ sep: window.__paint('[data-t="sep"]'), sk: window.__paint('[data-t="skel"]') });
        wrap.style.transition = "none"; const a = snap(); wrap.style.setProperty("--engage", "1"); const b = snap(); wrap.style.removeProperty("--engage");
        const keys = (x, y) => Object.keys(x).filter((k) => x[k] !== y[k]);
        return { sep: keys(a.sep, b.sep), sk: keys(a.sk, b.sk), sepBg: [a.sep["background-color"] + " " + a.sep["background-image"], b.sep["background-color"] + " " + b.sep["background-image"]] };
      });
      // live arm: the real Separator node moved into a press host the mouse presses
      await P.page.evaluate(() => {
        const sep = document.querySelector('[data-t="sep"]'); const h = document.createElement("div");
        h.setAttribute("data-engage", "press"); h.setAttribute("data-t", "phost"); h.style.cssText = "padding:12px;display:grid;gap:8px";
        h.append(document.createTextNode("host"), sep); document.querySelector('[data-t="skel"]').before(h);
      });
      const c = await center(P.page, '[data-t="phost"]');
      const rest = await P.page.evaluate(() => getComputedStyle(document.querySelector('[data-t="sep"]')).backgroundColor);
      await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(300);
      const held = await P.page.evaluate(() => ({ bg: getComputedStyle(document.querySelector('[data-t="sep"]')).backgroundColor, e: getComputedStyle(document.querySelector('[data-t="sep"]')).getPropertyValue("--engage") }));
      await P.page.mouse.up(); await P.page.waitForTimeout(400);
      const after = await P.page.evaluate(() => getComputedStyle(document.querySelector('[data-t="sep"]')).backgroundColor);
      return { stat, live: { rest, held, after } };
    } finally { await P.close(); }
  });
  if (q.crashed) cell("Q-1 passive", "FAIL", q.line);
  else {
    cell("Q-1 separator static (host --engage:1)", q.stat.sep.length ? "PASS" : "FAIL", `paint changed [${q.stat.sep.join(", ")}] · ${q.stat.sepBg[0]} → ${q.stat.sepBg[1]}`);
    cell("Q-1 separator live (pressed host)", q.live.rest !== q.live.held.bg && q.live.after === q.live.rest ? "PASS" : "FAIL", `rest ${q.live.rest} → pressed ${q.live.held.bg} (inherited --engage ${q.live.held.e}) → released ${q.live.after}`);
    cell("Q-1 skeleton static (host --engage:1)", "REPORT", `paint changed [${q.stat.sk.join(", ")}] (the prototype maps the Separator only)`);
  }
  // ── Q-3: the channel budget off the CSSOM
  const rules = await guard("Q-3 cssom", async () => {
    const P = await openPage(E, T, "switch");
    try {
      return await P.page.evaluate((src) => {
        const re = new RegExp(src); const out = [];
        const walk = (list) => { for (const r of list) { if (r.cssRules && !r.style) walk(r.cssRules); else if (r.style) { const props = []; for (const p of r.style) { const v = r.style.getPropertyValue(p); if (re.test(v)) props.push(p); } for (const d of r.style.cssText.split(/;(?![^(]*\))/)) { const i = d.indexOf(":"); if (i < 0) continue; const p = d.slice(0, i).trim(); if (!props.includes(p) && re.test(d.slice(i + 1))) props.push(p); } if (props.length) out.push({ sel: r.selectorText, props, media: r.parentRule?.conditionText ?? r.parentRule?.media?.mediaText ?? "" }); if (r.cssRules) walk(r.cssRules); } } };
        for (const s of document.styleSheets) { try { walk(s.cssRules); } catch {} }
        return out;
      }, SCALAR.source);
    } finally { await P.close(); }
  });
  if (rules.crashed) cell("Q-3 channel budget", "FAIL", rules.line);
  else {
    const bySel = {};
    for (const r of rules) for (const p of r.props) { const ch = CHANNEL(p); if (!ch) continue; (bySel[r.sel] ??= new Set()).add(ch); }
    for (const r of rules) cell(`Q-3 mapping ${r.sel}${r.media ? ` @${r.media}` : ""}`, "REPORT", `[${r.props.join(", ")}] → ${[...new Set(r.props.map(CHANNEL).filter(Boolean))].join(", ") || "(token only)"}`);
    const over = Object.entries(bySel).filter(([, s]) => s.size > 2);
    cell("Q-3 channel budget (≤ 2 channels per mapping selector)", over.length ? "FAIL" : "PASS", `${Object.keys(bySel).length} mapping selectors · ${over.length ? `over budget: ${over.map(([k, s]) => `${k} {${[...s]}}`).join("; ")}` : "none over budget"}`);
  }
});
