#!/usr/bin/env node
// D4 pass 10 · CRITIC probe: does "selection changes no geometry" (O-103c, O-103e) hold BY CONSTRUCTION under D′ v9,
// past H9's one ladder (17 labels at 192 px, read at 390 and 1440)? Two reads per scene × viewport:
//   GEOMETRY  every option and every element child's scroll-free box (the offsetLeft/Top chain to the group, and the
//             border box relative to the group's, with transforms, transitions and animations neutralised for the
//             read), every label's line count, and the group's size, at rest and with each option selected by a REAL
//             click (pointer parked after), and again by keys (Tab in, Space, ArrowDown/ArrowRight to the end).
//   STYLE     every LAYOUT-AFFECTING computed property of every option and every descendant (font-*, letter- and
//             word-spacing, line-height, text-transform, padding, border widths, margin, gap, display, white-space,
//             box-sizing, ...), compared between rest and selected (the option and its subtree), and between rest and
//             hover and focus-visible. A property that differs is a geometry change waiting for content to reach it,
//             even where no label happens to sit at a boundary; that is the "by construction" read the ladder cannot
//             make. (A selected and an unselected option are compared at the same index, so a per-index difference is
//             the state's alone.)
// Scenes: A10's `c1long-migrated` (47 labels, 14 to 60 characters, 192 px), `c1wide-migrated` (256 px),
// `c1bare-migrated`, `pillwrap-migrated` (7 pills, 260 px flex-wrap); the route's `c1-migrated`, `preset-migrated`,
// `specimen-migrated`, `f1-migrated`; the library pill scenes `single`, `pill-icon`, `pill-badge`, `vertical`.
// Viewports: SWEEP (12 widths, 320 to 1920) for the two ladders; FEW (390, 1440) for the rest. Light; and dark and PRT
// at 390 for c1long and pillwrap (the modes re-skin; their geometry is the same rules).
// Gating cells (this probe's own; they score no checklist row on their own): `geom` (max move ≤ 0.50 px, no re-wrap,
// every selection landed) and `style` (no layout property differs rest vs selected). Hover/focus diffs are info.
// Run it on D′ v9 (`a10-src`) and on the planted `weight-step` library (`a10-ws-src`): the plant must FAIL both reads.
//   node crit10-geom.mjs --build <A10 route build> [--engine webkit] [--out <dir>] [--quick]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const SWEEP = [320, 360, 375, 390, 412, 430, 540, 768, 1024, 1280, 1440, 1920];
const FEW = [390, 1440];
const PLAN = [
  { scene: "c1long-migrated", widths: SWEEP, modes: ["light"], extra: [{ w: 390, modes: ["dark", "prt"] }], keys: "ArrowDown" },
  { scene: "c1wide-migrated", widths: SWEEP, modes: ["light"], keys: "ArrowDown" },
  { scene: "c1bare-migrated", widths: FEW, modes: ["light"], keys: "ArrowDown" },
  { scene: "pillwrap-migrated", widths: FEW, modes: ["light"], extra: [{ w: 390, modes: ["dark", "prt"] }], keys: "ArrowRight" },
  { scene: "c1-migrated", widths: FEW, modes: ["light"], keys: "ArrowDown" },
  { scene: "preset-migrated", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "specimen-migrated", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "f1-migrated", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "single", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "pill-icon", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "pill-badge", widths: FEW, modes: ["light"], keys: "ArrowRight" },
  { scene: "vertical", widths: FEW, modes: ["light"], keys: "ArrowDown" },
];
const PROPS = ["font-weight", "font-size", "font-family", "font-style", "font-stretch", "font-variation-settings", "font-feature-settings", "font-optical-sizing", "font-synthesis", "font-kerning", "letter-spacing", "word-spacing", "line-height", "text-transform", "text-indent", "white-space", "overflow-wrap", "word-break", "hyphens", "padding-top", "padding-right", "padding-bottom", "padding-left", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width", "margin-top", "margin-right", "margin-bottom", "margin-left", "gap", "row-gap", "column-gap", "display", "box-sizing", "flex-direction", "flex-wrap", "flex-grow", "flex-shrink", "flex-basis", "min-width", "min-height", "max-width", "max-height", "align-items", "justify-content", "position", "inset", "aspect-ratio", "contain", "content-visibility", "writing-mode"];
const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";
const READ = ([neutral, props]) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const scene = document.querySelector("[data-scene]"), group = scene.querySelector("[data-group]");
  const g = group.getBoundingClientRect();
  const chain = (el) => { let x = 0, y = 0; for (let e = el; e && e !== group; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return { x, y, w: el.offsetWidth ?? 0, h: el.offsetHeight ?? 0 }; };
  // the border box relative to the group's, plus the scroll offset of every scroller from the element's parent up to
  // and including the group (F1's row is its own horizontal scroller: a selection that scrolls it moves no layout)
  const rel = (el) => { const b = el.getBoundingClientRect(); let sx = 0, sy = 0; for (let a = el.parentElement; a; a = a.parentElement) { sx += a.scrollLeft; sy += a.scrollTop; if (a === group) break; } return { x: b.left - g.left + sx, y: b.top - g.top + sy, w: b.width, h: b.height }; };
  const lines = (el) => { let n = 0; const ys = new Set(); const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); for (let t = walk.nextNode(); t; t = walk.nextNode()) { if (!t.textContent.trim()) continue; const rg = document.createRange(); rg.selectNodeContents(t); for (const q of rg.getClientRects()) if (q.width > 0) ys.add(Math.round(q.top - g.top)); n++; } return n ? ys.size : 0; };
  const style = (el) => { const c = getComputedStyle(el); return props.map((p) => c.getPropertyValue(p)).join("|"); };
  const items = [...group.querySelectorAll("[data-item]")].map((el) => {
    const sub = [el, ...el.querySelectorAll("*")];
    return { box: [chain(el), rel(el)], kids: sub.slice(1).filter((k) => k instanceof HTMLElement).map((k) => [chain(k), rel(k)]), lines: lines(el), style: sub.map(style), text: el.textContent.trim().replace(/\s+/g, " ").slice(0, 60), on: el.dataset.state === "on" || el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-pressed") === "true", fw: getComputedStyle(el).fontWeight };
  });
  const out = { group: { w: g.width, h: g.height, cw: group.offsetWidth, ch: group.offsetHeight }, items };
  st.remove(); return out;
};
const settle = async (page) => { await page.waitForTimeout(100); for (let t = 0; t < 80; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } };
const dv = (a, b) => Math.max(...["x", "y", "w", "h"].map((k) => Math.abs(a[k] - b[k])));
function geomDiff(rest, now) {
  let max = 0, where = "";
  const gd = Math.max(Math.abs(rest.group.w - now.group.w), Math.abs(rest.group.h - now.group.h), Math.abs(rest.group.cw - now.group.cw), Math.abs(rest.group.ch - now.group.ch));
  if (gd > max) { max = gd; where = `group ${f2(rest.group.w)}×${f2(rest.group.h)} → ${f2(now.group.w)}×${f2(now.group.h)}`; }
  const wraps = [];
  now.items.forEach((it, j) => {
    const r = rest.items[j];
    const d = Math.max(dv(r.box[0], it.box[0]), dv(r.box[1], it.box[1]), ...it.kids.map((k, q) => (r.kids[q] ? Math.max(dv(r.kids[q][0], k[0]), dv(r.kids[q][1], k[1])) : 999)));
    if (d > max) { max = d; where = `option ${j} «${r.text}» ${f2(r.box[1].w)}×${f2(r.box[1].h)}@${f2(r.box[1].x)},${f2(r.box[1].y)} → ${f2(it.box[1].w)}×${f2(it.box[1].h)}@${f2(it.box[1].x)},${f2(it.box[1].y)}`; }
    if (r.lines !== it.lines) wraps.push(`option ${j} «${r.text}» ${r.lines} → ${it.lines} lines`);
  });
  return { max, where, wraps };
}
function styleDiff(a, b, props) { // a, b: style arrays (option + subtree) of the same option in two states
  const out = new Set();
  a.forEach((s, i) => { if (!b[i]) return; const x = s.split("|"), y = b[i].split("|"); x.forEach((v, p) => { if (v !== y[p]) out.add(`${i === 0 ? "option" : `desc ${i}`} ${props[p]}: ${v} → ${y[p]}`); }); });
  return [...out];
}

await cli("CRIT10-GEOM", async (args, target) => {
  const engine = engineOf(args), cells = [], quick = !!args.quick;
  for (const pl of PLAN) {
    const runs = [];
    for (const w of quick ? FEW : pl.widths) for (const mode of pl.modes) runs.push({ w, mode });
    for (const ex of pl.extra ?? []) for (const mode of ex.modes) runs.push({ w: ex.w, mode });
    for (const { w, mode } of runs) {
      const P = await openPage(target, engine, pl.scene, { mode, query: { sel: "none" } });
      const tag = `${pl.scene} ${w}×900 ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"}`;
      let rest, clicks = [], keys = [], restK, hov = null, fv = null, keyNote = "", err = null;
      try {
        const { page } = P;
        await page.setViewportSize({ width: w, height: 900 }); await page.mouse.move(2, 2);
        await page.evaluate(() => window.__tile?.select?.(null)); await settle(page);
        rest = await page.evaluate(READ, [NEUTRAL, PROPS]);
        const loc = page.locator("[data-scene] [data-item]"), n = rest.items.length;
        for (let k = 0; k < n; k++) { await loc.nth(k).click(); await page.mouse.move(2, 2); await settle(page); clicks.push(await page.evaluate(READ, [NEUTRAL, PROPS])); }
        // hover a rest option (option 0 while the last is selected), read its style against rest
        await loc.nth(0).hover(); await settle(page); hov = await page.evaluate(READ, [NEUTRAL, PROPS]); await page.mouse.move(2, 2);
        // keys: clear, back to top, Tab in from the sentinel, Space, then the arrow to the end
        await page.evaluate(async () => { await window.__tile?.select?.(null); document.activeElement?.blur?.(); scrollTo(0, 0); }); await settle(page);
        restK = await page.evaluate(READ, [NEUTRAL, PROPS]);
        await page.evaluate(() => document.querySelector('[data-sentinel="before"]')?.focus());
        let first = -1;
        for (let t = 0; t < 6 && first < 0; t++) { await page.keyboard.press(P.keys.tab); await settle(page); first = await page.evaluate(() => { const a = document.activeElement; return a?.matches?.("[data-scene] [data-item]") ? [...document.querySelectorAll("[data-scene] [data-item]")].indexOf(a) : -1; }); }
        keyNote = first === 0 ? "" : `Tab landed on ${first}`;
        fv = await page.evaluate(READ, [NEUTRAL, PROPS]);
        if (first === 0) {
          await page.keyboard.press("Space"); await settle(page); keys.push(await page.evaluate(READ, [NEUTRAL, PROPS]));
          for (let k = 1; k < n; k++) { await page.keyboard.press(pl.keys); await settle(page); keys.push(await page.evaluate(READ, [NEUTRAL, PROPS])); }
        }
      } catch (e) { err = String(e.message ?? e).slice(0, 200); } finally { await P.close(); }
      if (err || !rest) { cells.push({ gating: true, pass: false, line: `${tag} · probe error: ${err ?? "no read"}` }); continue; }
      for (const [path, steps, r0] of [["click", clicks, rest], ["keys", keys, restK]]) {
        let max = 0, where = "", wraps = [], missed = [], sdiff = new Set();
        steps.forEach((s, k) => {
          if (!s.items[k]?.on || s.items.filter((i) => i.on).length !== 1) missed.push(k);
          const c = geomDiff(r0, s);
          if (c.max > max) { max = c.max; where = `${c.where} (option ${k} selected)`; }
          for (const x of c.wraps) wraps.push(`${x} (option ${k} selected)`);
          for (const d of styleDiff(r0.items[k].style, s.items[k].style, PROPS)) sdiff.add(d);
        });
        const landed = steps.length === r0.items.length && missed.length === 0;
        cells.push({ gating: true, pass: P.modeOk && landed && max <= 0.5 && wraps.length === 0, what: "geom", line: `${tag} · geom by ${path} · ${steps.length}/${r0.items.length} selections · max ${f2(max)} px${where ? ` (${where})` : ""} · ${wraps.length ? `RE-WRAP ${wraps.length}: ${wraps.slice(0, 3).join("; ")}` : "no re-wrap"}${missed.length ? ` · VACUOUS at ${missed.slice(0, 6).join(",")}${keyNote ? ` (${keyNote})` : ""}` : ""} · weight rest ${r0.items[0]?.fw} → selected ${steps[0]?.items[0]?.fw ?? "?"} · group ${f2(r0.group.w)}×${f2(r0.group.h)}` });
        cells.push({ gating: true, pass: landed && sdiff.size === 0, what: "style", line: `${tag} · style by ${path}: layout-affecting computed properties of the option and its subtree, rest vs selected · ${sdiff.size ? `DIFFER ${sdiff.size}: ${[...sdiff].slice(0, 4).join("; ")}` : `none differ (${PROPS.length} properties)`}` });
      }
      if (hov) { const d = styleDiff(clicks.at(-1).items[0].style, hov.items[0].style, PROPS); cells.push({ gating: false, pass: d.length === 0, what: "hover-style", line: `${tag} · hover (info): option 0 at rest vs hovered · ${d.length ? `DIFFER: ${d.slice(0, 4).join("; ")}` : "no layout property differs"} · geom ${f2(geomDiff(clicks.at(-1), hov).max)} px` }); }
      if (fv) { const d = styleDiff(restK.items[0].style, fv.items[0].style, PROPS); cells.push({ gating: false, pass: d.length === 0, what: "focus-style", line: `${tag} · focus-visible (info): option 0 at rest vs focused · ${d.length ? `DIFFER: ${d.slice(0, 4).join("; ")}` : "no layout property differs"} · geom ${f2(geomDiff(restK, fv).max)} px${keyNote ? ` · ${keyNote}` : ""}` }); }
    }
  }
  return { id: "CRIT10-GEOM", title: "selection changes no geometry by construction: a viewport sweep and a layout-property diff (pass-10 critic probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
