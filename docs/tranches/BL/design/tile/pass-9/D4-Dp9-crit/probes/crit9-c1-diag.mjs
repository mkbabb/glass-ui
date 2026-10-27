#!/usr/bin/env node
// D4 pass 9 · CRITIC (completion seat) diagnostic for crit9-c1.mjs. That probe read FAIL on `c1long-migrated` only,
// with two kinds of evidence mixed together:
//   (a) box-no-shift / content-no-shift deviations of 413 px (390×844) and 821 px (1440×900) on the GROUP, and 72-94 px
//       on the info scenes (preset, specimen, F1) at 390: the size of a scroll, not of a layout change. crit9-c1's READ
//       adds `scrollX/scrollY` AND every ancestor's `scrollLeft/scrollTop`, and the ancestor walk reaches <html>, whose
//       scrollTop IS the window scroll, so a window scroll may be counted twice;
//   (b) at 390×844 only: a label 1→2 lines on selection (weight 500 → 600), ResizeObserver 12, Layout Instability 4
//       entries (scroll-independent readers).
// This probe separates them. Per scene and viewport (light): for every option, the LAYOUT box read three ways
// (offsetTop/Height chain to the group: scroll-free; getBoundingClientRect + scrollY; crit9-c1's sum), at rest and
// with each option selected by model write (`__tile.select`, no pointer, no scroll), plus the label's line count.
// Cells (each states a finding; PASS = the finding is observed, info only, never a gate):
//   rewrap      selecting some option changes that option's label line count and its layout height (scroll-free)
//   reflow      max scroll-free move of any option or the group between rest and any selection, px
//   scroll-2x   after a pointer click that scrolls the page, crit9-c1's sum minus the scroll-free read equals scrollY
// Second pass (added after the first run read no re-wrap under model writes): the same scroll-free read with each
// option selected by a REAL click (pointer parked after, as crit9-c1 does), so the two input paths are compared on one
// read; every option's computed weight and label line count is printed for the option that was just selected.
//   rewrap-click / reflow-click   as rewrap / reflow, by real click
//   node crit9-c1-diag.mjs --build <a9 build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf } from "../../../harness/lib.mjs";

const RUNS = [
  { scene: "c1long-migrated", vp: { width: 390, height: 844 } },
  { scene: "c1long-migrated", vp: { width: 1440, height: 900 } },
  { scene: "c1-migrated", vp: { width: 390, height: 844 } },
  { scene: "preset-migrated", vp: { width: 390, height: 844 } },
];
const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";
const READ = (neutral) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const scene = document.querySelector("[data-scene]"), group = scene.querySelector("[data-group]");
  const items = [...scene.querySelectorAll("[data-item]")];
  const free = (el) => { let x = 0, y = 0; for (let e = el; e && e !== group; e = e.offsetParent) { x += e.offsetLeft; y += e.offsetTop; } return { x, y, w: el.offsetWidth, h: el.offsetHeight }; };
  const sum = (el) => { const b = el.getBoundingClientRect(); let sx = scrollX, sy = scrollY; for (let a = el.parentElement; a; a = a.parentElement) { sx += a.scrollLeft; sy += a.scrollTop; } return { x: b.left + sx, y: b.top + sy }; };
  const doc = (el) => { const b = el.getBoundingClientRect(); return { x: b.left + scrollX, y: b.top + scrollY }; };
  const lines = (el) => { const t = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()); if (!t) return 0; const rg = document.createRange(); rg.selectNodeContents(t); return new Set([...rg.getClientRects()].map((q) => Math.round(q.top))).size; };
  const out = { scrollY, htmlTop: document.documentElement.scrollTop, scrolling: document.scrollingElement?.tagName,
    group: { ...free(group), w: group.offsetWidth, h: group.offsetHeight, sum: sum(group), doc: doc(group) },
    items: items.map((el) => ({ ...free(el), fw: getComputedStyle(el).fontWeight, on: el.dataset.state === "on" || el.getAttribute("aria-checked") === "true", lines: el.children[0] ? lines(el.children[0]) : 0, text: (el.children[0]?.textContent ?? "").trim() })) };
  st.remove(); return out;
};
const settle = async (page) => { await page.waitForTimeout(150); for (let t = 0; t < 60; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } };

await cli("CRIT9-C1-DIAG", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const { scene, vp } of RUNS) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    let rest, per = [], clicked = null, restC = null, perC = [];
    try {
      const { page } = P;
      await page.setViewportSize(vp); await page.mouse.move(2, 2);
      await page.evaluate(() => window.__tile.select(null)); await settle(page);
      rest = await page.evaluate(READ, NEUTRAL);
      const n = rest.items.length;
      for (let k = 0; k < n; k++) { await page.evaluate((v) => window.__tile.select(v), k); await settle(page); per.push(await page.evaluate(READ, NEUTRAL)); }
      // a pointer click on the last option (Playwright scrolls it into view), then the three reads
      await page.evaluate(() => window.__tile.select(null)); await settle(page);
      await page.locator("[data-scene] [data-item]").nth(n - 1).click(); await page.mouse.move(2, 2); await settle(page);
      clicked = await page.evaluate(READ, NEUTRAL);
      // the real-click pass: back to the top, nothing selected, then click each option in turn
      await page.evaluate(() => { window.__tile.select(null); document.activeElement?.blur?.(); scrollTo(0, 0); }); await settle(page);
      restC = await page.evaluate(READ, NEUTRAL);
      for (let k = 0; k < n; k++) { await page.locator("[data-scene] [data-item]").nth(k).click(); await page.mouse.move(2, 2); await settle(page); perC.push(await page.evaluate(READ, NEUTRAL)); }
    } finally { await P.close(); }
    const tag = `${scene} ${vp.width}×${vp.height} light`;
    // (b) the re-wrap, scroll-free
    const wraps = [];
    let reflow = 0, where = "";
    per.forEach((s, k) => {
      const a = rest.items[k], b = s.items[k];
      if (a.lines !== b.lines || Math.abs(a.h - b.h) > 0.5) wraps.push(`opt ${k} «${a.text}» ${a.lines}→${b.lines} lines, h ${a.h}→${b.h} (weight ${a.fw}→${b.fw})`);
      const g = Math.max(Math.abs(s.group.h - rest.group.h), Math.abs(s.group.w - rest.group.w)); if (g > reflow) { reflow = g; where = `group ${rest.group.w}×${rest.group.h} → ${s.group.w}×${s.group.h}, opt ${k} selected`; }
      s.items.forEach((it, j) => { const r0 = rest.items[j]; const d = Math.max(Math.abs(it.x - r0.x), Math.abs(it.y - r0.y), Math.abs(it.w - r0.w), Math.abs(it.h - r0.h)); if (d > reflow) { reflow = d; where = `opt ${j} (${r0.x},${r0.y} ${r0.w}×${r0.h} → ${it.x},${it.y} ${it.w}×${it.h}), opt ${k} selected`; } });
    });
    cells.push({ gating: false, pass: wraps.length > 0, line: `${tag} · rewrap · ${wraps.length ? `OBSERVED in ${wraps.length}: ${wraps.slice(0, 3).join("; ")}` : "none: no option's label line count or height changes when it is selected"}` });
    cells.push({ gating: false, pass: reflow > 0.5, line: `${tag} · reflow (offset chain to the group, scroll-free; model writes, no pointer) · max ${reflow.toFixed(2)} px${reflow ? ` (${where})` : ""}` });
    // (a) the double count
    const gs = clicked.group;
    const extraY = gs.sum.y - gs.doc.y;
    cells.push({ gating: false, pass: clicked.scrollY > 0 && Math.abs(extraY - clicked.scrollY) < 0.5, line: `${tag} · scroll-2x · after a pointer click on the last option: scrollY ${clicked.scrollY}, <html>.scrollTop ${clicked.htmlTop} (scrollingElement ${clicked.scrolling}); group y doc ${gs.doc.y.toFixed(2)} vs crit9-c1's sum ${gs.sum.y.toFixed(2)} (extra ${extraY.toFixed(2)}); group x doc ${gs.doc.x.toFixed(2)} vs sum ${gs.sum.x.toFixed(2)}; rest group y doc ${rest.group.doc.y.toFixed(2)}` });
    const wc = []; let rc = 0, wherec = "";
    perC.forEach((s, k) => {
      const a = restC.items[k], b = s.items[k];
      if (a.lines !== b.lines || Math.abs(a.h - b.h) > 0.5) wc.push(`opt ${k} «${a.text}» ${a.lines}→${b.lines} lines, h ${a.h}→${b.h} (weight ${a.fw}→${b.fw})`);
      s.items.forEach((it, j) => { const r0 = restC.items[j]; const d = Math.max(Math.abs(it.x - r0.x), Math.abs(it.y - r0.y), Math.abs(it.w - r0.w), Math.abs(it.h - r0.h)); if (d > rc) { rc = d; wherec = `opt ${j} (${r0.x},${r0.y} ${r0.w}×${r0.h} → ${it.x},${it.y} ${it.w}×${it.h}), opt ${k} clicked`; } });
    });
    const wts = perC.map((s, k) => `${k}:${restC.items[k].fw}→${s.items[k].fw}/${s.items[k].on ? "on" : "off"}`).join(" ");
    const wm = per.map((s, k) => `${k}:${rest.items[k].fw}→${s.items[k].fw}/${s.items[k].on ? "on" : "off"}`).join(" ");
    cells.push({ gating: false, pass: wc.length > 0, line: `${tag} · rewrap-click · ${wc.length ? `OBSERVED in ${wc.length}: ${wc.slice(0, 3).join("; ")}` : "none"} · weight of each option when it is selected, rest→selected/state: by click ${wts} · by model write ${wm}` });
    cells.push({ gating: false, pass: rc > 0.5, line: `${tag} · reflow-click (scroll-free) · max ${rc.toFixed(2)} px${rc ? ` (${wherec})` : ""}` });
  }
  return { id: "CRIT9-C1-DIAG", title: "crit9-c1's c1long reading split: the weight re-wrap (scroll-free) against the scroll double count (pass-9 CRITIC diagnostic, info only)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
