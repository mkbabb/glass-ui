#!/usr/bin/env node
// (pass 3: copied unchanged from pass-2 for the D′ spec seat; the shared instrument)
// D4-D′ prototype probe (from D4-Dp-spec/probes; the prototype added --sites) · §7.3 items 1, 4 and 6 on the route's MIGRATED arms (the arms that declare `shape="cell"`).
// The H-3 scenes (preset-invalid, -sibling, -tone-*) transcribe the library arm, which under D′ is an undeclared
// pill; so this probe applies each H-3 condition to the migrated preset, specimen and strip and runs T-3's own
// measurement and verdict (measure.mjs selectedSeparation + judgeT3), light, dark, PRT (Playwright WebKit: the
// forced level-0 path), both engines.
//   --part states   the conditions: valid, invalid (the group's data-invalid + aria-invalid, as controlStateAttrs
//                   stamps them), sibling (a full-ink border from a sibling state, unlayered (0,2,0)), consumer
//                   (the shipped composition's border and shadow reset on every item), tone-translucent,
//                   tone-unresolvable
//   --part hover    item 4: the selected tile against a HOVERED unselected sibling (ink hidden, scale pinned): the
//                   ≥ 3:1 area must still clear T-3's bar; and hovered against rest (the hover light, ≥ 2 %)
//   --part ink      item 6 (X-2): the stage stroke and the label ink of the selected vs an unselected tile, read
//                   from computed style, as contrast against each other
//   --part a11y     Q-9 (a): under prefers-contrast: more and forced-colors: active (Chromium emulation; Playwright
//                   WebKit takes contrast only), the selected tile's box must not move (the accessibility.css 2 px
//                   !important border is exempted for the tile) and its computed border and perimeter are printed
//   node states.mjs --build <out>/builds/<label> --part states|hover|ink [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, compare, contrast, clipAround } from "../../../harness/lib.mjs";
import { selectedSeparation, judgeT3, tagItems } from "../../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const part = String(args.part ?? "states");
const SITES = String(args.sites ?? "preset-migrated,specimen-migrated,strip-migrated").split(","); // --sites: e.g. f1-migrated (R-5)
const COND = {
  valid: null,
  invalid: (g) => { g.setAttribute("data-invalid", ""); g.setAttribute("aria-invalid", "true"); },
  sibling: (g) => { for (const i of g.querySelectorAll("[data-item]")) i.classList.add("th-bound"); },
  consumer: null,
  "tone-translucent": (g) => g.style.setProperty("--selection-tone", "rgb(120 80 200 / 0.35)"),
  "tone-unresolvable": (g) => g.style.setProperty("--selection-tone", "var(--th-undefined-tone)"),
};
const CSS = {
  sibling: ".th-bound[data-item] { border-color: var(--foreground); }",
  consumer: "[data-arm=\"migrated\"] [data-item] { border-color: transparent; box-shadow: none; outline: 1px dashed transparent; outline-offset: -1px; }",
};
const lock = await acquireLock(`dp-proto-${part}`);
const target = await openTarget(args);
console.log(`D4-D′ prototype probe · part ${part} · ${target.label} · load ${load()} at start`);
let pass = 0, n = 0;
const wait = (P, ms) => P.page.waitForTimeout(ms);
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  for (const scene of SITES) for (const mode of ["light", "dark", "prt"]) {
    if (part === "states") {
      for (const [c, fn] of Object.entries(COND)) {
        const P = await openPage(target, engine, scene, { mode });
        if (CSS[c]) await P.page.addStyleTag({ content: CSS[c] });
        if (fn) await P.page.evaluate((src) => { const g = document.querySelector("[data-group]"); (0, eval)(`(${src})`)(g); }, fn.toString());
        await wait(P, 300);
        const j = judgeT3(await selectedSeparation(P));
        const ok = P.modeOk && j.pass; n++; if (ok) pass++;
        console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${c} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${j.line} · ${j.fillLine} · load ${load()}`);
        await P.close();
      }
    } else if (part === "hover") {
      const P = await openPage(target, engine, scene, { mode });
      await tagItems(P);
      const idx = await P.page.evaluate(() => { const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const sz = th.size(its[s]); let u = -1, b = Infinity; its.forEach((e, i) => { if (i === s) return; const z = th.size(e), d = Math.abs(z.w - sz.w) + Math.abs(z.h - sz.h); if (d < b) { b = d; u = i; } }); return { s, u }; });
      const rect = (i) => P.page.evaluate((q) => window.__th.rect(document.querySelector(q)), `[data-th-idx="${i}"]`);
      const pin = (on) => P.page.evaluate(({ s, u, on }) => { const th = window.__th; th.hideInk(on); for (const i of [s, u]) th.pin(document.querySelector(`[data-th-idx="${i}"]`), on); }, { ...idx, on });
      await P.page.mouse.move(2, 2); await pin(true); await wait(P, 400);
      const rs = await rect(idx.s), ru = await rect(idx.u);
      const w = Math.floor(Math.min(rs.w, ru.w)), h = Math.floor(Math.min(rs.h, ru.h));
      const cs = { x: Math.round(rs.x), y: Math.round(rs.y), width: w, height: h }, cu = { x: Math.round(ru.x), y: Math.round(ru.y), width: w, height: h };
      const S = await shot(P.page, cs), U0 = await shot(P.page, cu);
      await P.page.mouse.move(ru.x + ru.w / 2, ru.y + ru.h / 2); await wait(P, 700);
      const UH = await shot(P.page, cu);
      await pin(false);
      const cmp = compare(S, UH, null, Math.round(4 * S.dsf)), d2 = S.dsf * S.dsf, bar = (w + h);
      const hv = compare(U0, UH);
      const ok = P.modeOk && cmp.c3 / d2 >= bar && (100 * hv.changed) / hv.total >= 2; n++; if (ok) pass++;
      console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${P.modeLabel} · selected vs HOVERED unselected ≥3:1 ${(cmp.c3 / d2).toFixed(2)} px² (band ${(cmp.c3Edge / d2).toFixed(2)}) vs bar ${bar.toFixed(2)} (${(cmp.c3 / d2 / bar).toFixed(2)}×) · hover vs rest ${((100 * hv.changed) / hv.total).toFixed(2)} % moved · items ${idx.s}/${idx.u} · load ${load()}`);
      await P.close();
    } else if (part === "a11y") {
      if (mode !== "light") continue;
      for (const media of [{ contrast: "more" }, ...(engine === "chromium" ? [{ forcedColors: "active" }] : [])]) {
        const P = await openPage(target, engine, scene, { mode });
        // --plant: the exemption removed (HEAD's accessibility.css rule, re-declared for the tile)
        if (args.plant) await P.page.addStyleTag({ content: "@media (prefers-contrast: more), (forced-colors: active) { [data-state=\"on\"] { border-style: solid !important; border-width: 2px !important; } }" });
        await tagItems(P);
        const read = () => P.page.evaluate(() => { const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const el = its[s], r = el.getBoundingClientRect(), cs = getComputedStyle(el), b = getComputedStyle(el, "::before"); const kid = el.firstElementChild.getBoundingClientRect(); return { w: r.width, h: r.height, kidX: kid.x - r.x, kidY: kid.y - r.y, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, perim: `${b.borderTopWidth} ${b.borderTopColor} opacity ${b.opacity}` }; });
        const a = await read();
        await P.page.emulateMedia(media); await wait(P, 400);
        const b = await read();
        const moved = Math.max(Math.abs(a.kidX - b.kidX), Math.abs(a.kidY - b.kidY), Math.abs(a.w - b.w), Math.abs(a.h - b.h));
        const ok = moved < 0.5; n++; if (ok) pass++;
        console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${JSON.stringify(media)} · content moved ${moved.toFixed(2)} px (box ${a.w.toFixed(2)}×${a.h.toFixed(2)} → ${b.w.toFixed(2)}×${b.h.toFixed(2)}) · border ${b.border} · perimeter ${b.perim}`);
        await P.close();
      }
    } else if (part === "ink") {
      const P = await openPage(target, engine, scene, { mode });
      await tagItems(P);
      const r = await P.page.evaluate(() => {
        const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const u = s === 0 ? 1 : 0;
        const rgb = (v) => { const c = document.createElement("canvas").getContext("2d"); c.fillStyle = v; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data]; };
        const read = (i) => { const it = its[i]; const p = it.querySelector("path"); const lbl = it.querySelector("[data-line-slot]"); return { stroke: p ? getComputedStyle(p).stroke : null, label: getComputedStyle(lbl).color, strokeRgba: p ? rgb(getComputedStyle(p).stroke) : null, labelRgba: rgb(getComputedStyle(lbl).color), token: getComputedStyle(it).getPropertyValue("--selection-ink").trim() }; };
        return { s: read(s), u: read(u) };
      });
      // composite on the page ground to a contrast (the stroke/label alpha over --background)
      const bg = await P.page.evaluate(() => { const c = document.createElement("canvas").getContext("2d"); c.fillStyle = getComputedStyle(document.body).backgroundColor; c.fillRect(0, 0, 1, 1); return [...c.getImageData(0, 0, 1, 1).data]; });
      const over = (c) => c ? c.slice(0, 3).map((v, k) => v * (c[3] / 255) + bg[k] * (1 - c[3] / 255)) : null;
      const cst = r.s.strokeRgba ? contrast(over(r.s.strokeRgba), over(r.u.strokeRgba)) : null, clb = contrast(over(r.s.labelRgba), over(r.u.labelRgba));
      console.log(`  ${engine} ${scene} ${P.modeLabel} · stroke sel ${r.s.stroke} / unsel ${r.u.stroke}${cst ? ` (${cst.toFixed(2)}:1 on the ground)` : ""} · label sel ${r.s.label} / unsel ${r.u.label} (${clb.toFixed(2)}:1) · --selection-ink sel ${r.s.token} / unsel ${r.u.token}`);
      await P.close();
    }
  }
}
if (part !== "ink") console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);
