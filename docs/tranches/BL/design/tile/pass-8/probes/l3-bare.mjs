#!/usr/bin/env node
// D4 pass 8 · BUILD seat probe: L-3's paint witness (O-94/O-94a R-2: the group's opt-out of the option's selected tint
// and pill corner, `--selection-paint: bare`). The registry asks for a FACT cell; H8 is H7 plus the B-1 writer read only,
// so this read is a pass-8 probe with its own fixture PASS and planted FAILs, not a FACT cell (folding it into FACT is
// a harness change under a new hash). It reads the compositions in `../routes/L3/compose.mjs` on a build made with
// `--route ../routes/L3` (fixture) or `--route ../routes/L3-plant-on-item` (the plant), light and dark.
// After one pointer commit (option `b` of ref-pill; every group shares the model, so `b` is selected in each), the
// pointer leaves, the page settles, and for each composition it reads options `a` (rest) and `b` (selected):
//   - the painted fill: the mean colour of each option's inner box (inset 6 px, so no edge or perimeter), its content
//     hidden, compared as a contrast ratio, selected against rest;
//   - the computed background-color, border-top-left-radius and `--selection-paint` of each option.
// Cells, each light and dark:
//   ref           control: ref-pill and ref-tile separate (fill ratio ≥ 1.08) on the library's tint; the pill is a stadium
//                 (corner > h/2), the tile 16px
//   bare-pill     the opt-out lands: selected and rest paint the same (ratio < 1.03, computed backgrounds equal) and
//                 neither option has a corner (0px)
//   bare-tile     the opt-out lands on a tile: the same fill, and the tile keeps its field corner (16px)
//   item-write    refused on the option: the options' fact reads `auto`, the tint separates and the stadium holds
//   ancestor      no effect from an ancestor: the tint separates and the stadium holds (the group resets the fact)
//   state         a bare group keeps its selection: `b` is checked and on, at weight 600 (the ink co-carrier stays),
//                 one tab stop, and ArrowRight from `b` checks `c`
// Plants: the planted composition (`L3-plant-on-item`) FAILs bare-pill and bare-tile; a library with the pin's paint
// line removed (BUILD.md, `l3-unpinned`) FAILs item-write.
//   node l3-bare.mjs --build <out>/builds/<l3 build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2, shot, meanRect, contrast, hex } from "../../harness/lib.mjs";

const CASES = ["ref-pill", "bare-pill", "ref-tile", "bare-tile", "item-write", "ancestor"];
const READ = (cases) => Object.fromEntries(cases.map((k) => {
  const g = document.querySelector(`[data-l3-case="${k}"] [data-l3-group]`);
  const items = g ? [...g.querySelectorAll("[data-item]")] : [];
  return [k, items.map((el) => {
    const c = getComputedStyle(el), r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, bg: c.backgroundColor, radius: c.borderTopLeftRadius, paint: c.getPropertyValue("--selection-paint").trim(), state: el.dataset.state, checked: el.getAttribute("aria-checked"), tab: el.tabIndex, weight: c.fontWeight };
  })];
}));

await cli("L3BARE", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const mode of ["light", "dark"]) {
    const P = await openPage(target, engine, "l3-migrated", { mode });
    let r, fills = {}, keys = null;
    try {
      const { page } = P;
      // one pointer commit, then the pointer leaves and the page settles
      await page.locator('[data-l3-case="ref-pill"] [data-item]').nth(1).click();
      await page.mouse.move(2, 2);
      await page.waitForTimeout(900);
      r = await page.evaluate(READ, CASES);
      // painted fill, content hidden
      await page.addStyleTag({ content: "[data-l3] [data-item] * { visibility: hidden !important; }" });
      await page.waitForTimeout(250);
      for (const k of CASES) {
        const [a, b] = r[k];
        if (!a || !b) continue;
        const inner = (o) => ({ x: o.x + 6, y: o.y + 6, w: Math.max(1, o.w - 12), h: Math.max(1, o.h - 12) });
        const clip = (o) => ({ x: Math.floor(o.x), y: Math.floor(o.y), width: Math.ceil(o.w), height: Math.ceil(o.h) });
        const sa = await shot(page, clip(a)), sb = await shot(page, clip(b));
        const ma = meanRect(sa, inner(a)), mb = meanRect(sb, inner(b));
        fills[k] = { a: ma, b: mb, ratio: contrast(ma, mb) };
      }
      // keys on the bare pill group: focus the selected option, ArrowRight
      const bp = page.locator('[data-l3-case="bare-pill"] [data-item]');
      await bp.nth(1).focus();
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(300);
      keys = await page.evaluate(() => [...document.querySelectorAll('[data-l3-case="bare-pill"] [data-item]')].map((el) => el.getAttribute("aria-checked")));
    } finally { await P.close(); }
    const tag = `${mode}${P.modeOk ? "" : " (MODE NOT VERIFIED)"}`;
    const f = (k) => (fills[k] ? `fill ${hex(fills[k].b)} on ${hex(fills[k].a)} = ${f2(fills[k].ratio)}:1` : "fill unread");
    const opt = (o) => `${f2(o.w)}×${f2(o.h)} corner ${o.radius} bg ${o.bg} fact ${o.paint || "(unset)"}`;
    const stadium = (o) => parseFloat(o.radius) >= o.h / 2 - 0.01;
    const sep = (k) => (fills[k]?.ratio ?? 0) >= 1.08;
    const same = (k) => (fills[k]?.ratio ?? 9) < 1.03 && r[k][0].bg === r[k][1].bg;
    const need = CASES.every((k) => r[k]?.length === 3);
    if (!need) { cells.push({ gating: true, pass: false, line: `${tag} · composition missing: ${CASES.map((k) => `${k} ${r[k]?.length ?? 0}`).join(", ")}` }); continue; }
    const [rp, bpl, rt, bt, iw, an] = CASES.map((k) => r[k]);
    cells.push({ gating: true, pass: P.modeOk && sep("ref-pill") && sep("ref-tile") && stadium(rp[0]) && stadium(rp[1]) && rt[1].radius === "16px", what: "ref", line: `${tag} · ref (control) · ref-pill ${f("ref-pill")}, selected ${opt(rp[1])} · ref-tile ${f("ref-tile")}, selected ${opt(rt[1])} · want both ≥ 1.08, a stadium and 16px` });
    cells.push({ gating: true, pass: same("bare-pill") && bpl[0].radius === "0px" && bpl[1].radius === "0px", what: "bare-pill", line: `${tag} · bare-pill · ${f("bare-pill")} · rest ${opt(bpl[0])} · selected ${opt(bpl[1])} · want the same paint (< 1.03, equal computed backgrounds) and no corner (0px)` });
    cells.push({ gating: true, pass: same("bare-tile") && bt[0].radius === "16px" && bt[1].radius === "16px", what: "bare-tile", line: `${tag} · bare-tile · ${f("bare-tile")} · rest ${opt(bt[0])} · selected ${opt(bt[1])} · want the same paint and the field corner (16px)` });
    cells.push({ gating: true, pass: iw.every((o) => o.paint === "auto") && sep("item-write") && stadium(iw[1]), what: "item-write", line: `${tag} · item-write (refused) · ${f("item-write")} · selected ${opt(iw[1])} · want the fact auto on every option, the tint (≥ 1.08) and the stadium` });
    cells.push({ gating: true, pass: sep("ancestor") && stadium(an[1]) && an.every((o) => o.paint === "auto"), what: "ancestor", line: `${tag} · ancestor (no effect) · ${f("ancestor")} · selected ${opt(an[1])} · want the tint, the stadium and the fact auto` });
    const tabs = bpl.filter((o) => o.tab === 0).length;
    const okState = bpl[1].checked === "true" && bpl[1].state === "on" && bpl[0].checked === "false" && bpl[1].weight === "600" && tabs === 1 && keys?.[2] === "true" && keys?.[1] === "false";
    cells.push({ gating: true, pass: okState, what: "state", line: `${tag} · state (bare-pill) · b checked ${bpl[1].checked}, data-state ${bpl[1].state}, weight ${bpl[1].weight}; a checked ${bpl[0].checked}; tab stops ${tabs} · ArrowRight from b → checked ${keys?.join("/")} · want b on at 600, one tab stop, c checked after the key` });
  }
  return { id: "L3BARE", title: "L-3: --selection-paint: bare on the group turns off the tint and the pill corner, and nothing else (pass-8 BUILD probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
