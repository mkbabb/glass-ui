#!/usr/bin/env node
// D4 pass 11 · CRITIC probe CRIT11-C1: the pass-10 critic's crit10-c1 (`../../../pass-10/D4-Dp10-crit/probes/crit10-c1.mjs`,
// itself pass 9's crit9-c1 with the scroll-walk fix), copied with ONE change (REGISTRY §P10-6 (2)): REST AFTER A FIRST
// SCROLL. Before the ResizeObserver and the layout-shift observer are installed and before rest is read, every option is
// scrolled into view in turn (two frames each), every scroller in the scene and the window go back to 0, and the page
// settles, so K2's consumer `content-visibility: auto` placeholder (`harness/k2.mjs:33`) has been laid out once and its
// remembered size, not the 104 px placeholder, is what rest reads (D′c10 §2.3). Run on A10 (`--build a10-src`), as in
// pass 10, and on this seat's A11 (`--scenes` a comma list overrides SCENES; A11's scenes are gated like C1's).
// Pass-10 header follows.
// D4 pass 10 · CRITIC: pass 9's crit9-c1 (../../../pass-9/D4-Dp9-crit/probes/crit9-c1.mjs), copied with ONE fix: the
// scroll walk stops before document.scrollingElement (pass 9 counted the window scroll twice, D′c9 §3.3), and run on the
// pass-10 attack route A10 (../routes/A10: c1long is a 47-label ladder, 14 to 60 characters).
// Pass 9 header follows.: O-103c's condition attacked past both pass-8 reads.
//   "C1 is a cell in BOTH states; selection must not change its geometry (no layout shift)."
// The pass-8 BUILD probe (`../../../pass-8/probes/c1-box.mjs`) reads model writes at 1000×900; the pass-8 critic's
// (`../../../pass-8/D4-Dp8-crit/probes/crit-c1-states.mjs`, run here too, as fixed) reads offsetLeft/Top/Width/Height,
// which are INTEGERS: a sub-pixel move, and any move inside an option (its label, its count), reads 0 there. This probe:
//   - reads every box with getBoundingClientRect in DOCUMENT coordinates (sub-pixel), with every transform, scale,
//     translate and rotate inside the scene neutralised for the instant of the read (layout does not depend on them;
//     the hover scale and the press squish are engagement, not geometry), so a held press is read too. Transitions
//     and animations are suspended for that instant as well: a transition outranks `!important`, and the smoke run
//     (`../logs/smoke-crit9-chromium.log`) read the press squish (184 → 178.48 px) through the neutraliser without it;
//   - reads the group, every option, and every element child of every option (C1's label and count spans), plus the
//     label's line count (Range.getClientRects over its text);
//   - drives every state by real input: rest (nothing selected); a click on every option; hover on a rest and on the
//     selected option; a held press on a rest option and its release; Tab to the one tab stop (focus-visible); ArrowDown
//     through every option;
//   - on three compositions (`../routes/A9`): `c1-migrated` (the route of record), `c1long-migrated` (C1's anatomy at
//     its own 192 px with a ladder of labels 14..30 characters, one apart, so weight 500 → 600 lands on a wrap
//     boundary), `c1bare-migrated` (C1 with L-3's `--selection-paint: bare` written on the group);
//   - at 390×844 and 1440×900, light, dark, PRT.
//   - and, reported (not gating here: not C1), the transcribed tile sites `preset-migrated` (K1), `specimen-migrated`
//     (K2) and `f1-migrated` (F1) under the same walk, for the same weight re-wrap the ladder looks for.
// Cells per composition × viewport × mode:
//   cell-every-state   every option 16px and a column in every state
//   box-no-shift       group and options, sub-pixel, max deviation from rest ≤ 0.50 px over every state
//   content-no-shift   every option's element children, sub-pixel, ≤ 0.50 px; and every label's line count unchanged
//   resize-observer    border-box size changes on the group, the options and their children after the initial entries: 0
//   layout-shift       the Layout Instability API's entries over the walk: 0, where `supportedEntryTypes` lists
//                      `layout-shift`; UNMEASURED otherwise (never a vacuous PASS: Playwright WebKit lacks the API)
//   carrier (c1bare)   T-3's own read (measure.compare ≥ 3:1 pixels, content hidden) of the selected option against a
//                      rest option of the same size: ≥ the bar of half the perimeter (the bare tile keeps its perimeter)
//   node crit9-c1.mjs --build <A9 route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2, shot, compare, meanRect, contrast } from "../../../harness/lib.mjs";

const VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
const SCENES0 = ["c1-migrated", "c1long-migrated", "c1bare-migrated", "preset-migrated", "specimen-migrated", "f1-migrated", "single", "vertical"];
const SCENE_ARG = process.argv.indexOf("--scenes");
const SCENES = SCENE_ARG > 0 ? process.argv[SCENE_ARG + 1].split(",") : SCENES0;
// the transcribed tile sites (K1 preset, K2 specimen, F1) are read for the same weight re-wrap, reported (not C1: info);
// so are the library's two one-line pill groups (`single`, `vertical`, harness scenes), where the same 500 → 600 swap
// can only move width: info, and the cell check does not apply to a pill
const GATED = new Set(SCENE_ARG > 0 ? SCENES.filter((x) => x.startsWith("c1")) : SCENES.slice(0, 3));
const PILLS = new Set(["single", "vertical"]);
const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";

const INSTALL = () => {
  const scene = document.querySelector("[data-scene]");
  const items = [...scene.querySelectorAll("[data-item]")];
  const els = [scene.querySelector("[data-group]"), ...items, ...items.flatMap((el) => [...el.children])];
  window.__c9 = { ro: 0, seen: new Set(), shift: 0, shifts: 0, cls: false };
  const ro = new ResizeObserver((es) => { for (const e of es) { if (window.__c9.seen.has(e.target)) window.__c9.ro++; else window.__c9.seen.add(e.target); } });
  els.forEach((el) => ro.observe(el, { box: "border-box" }));
  if ((PerformanceObserver.supportedEntryTypes ?? []).includes("layout-shift")) {
    try { new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__c9.shift += e.value; window.__c9.shifts++; } }).observe({ type: "layout-shift", buffered: false }); window.__c9.cls = true; } catch { window.__c9.cls = false; }
  }
};
const READ = (neutral) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const scene = document.querySelector("[data-scene]");
  // layout position: viewport box plus every ancestor scroller's offset, so a scroller the walk scrolls (the specimen's
  // port, F1's row) reads as no move (smoke3 read 143 px and 70 px there in document coordinates)
  const r = (el) => { const b = el.getBoundingClientRect(); let sx = scrollX, sy = scrollY; for (let a = el.parentElement; a && a !== document.scrollingElement; a = a.parentElement) { sx += a.scrollLeft; sy += a.scrollTop; } return { x: b.left + sx, y: b.top + sy, w: b.width, h: b.height }; };
  const lines = (el) => { const t = [...el.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()); if (!t) return 0; const rg = document.createRange(); rg.selectNodeContents(t); const ys = new Set([...rg.getClientRects()].map((q) => Math.round(q.top))); return ys.size; };
  const items = [...scene.querySelectorAll("[data-item]")];
  const out = {
    group: r(scene.querySelector("[data-group]")),
    items: items.map((el) => { const c = getComputedStyle(el); return { ...r(el), r: c.borderTopLeftRadius, dir: c.flexDirection, fw: c.fontWeight, bg: c.backgroundColor, on: el.getAttribute("aria-checked") === "true" || el.dataset.state === "on", fv: el.matches(":focus-visible"), hov: el.matches(":hover"), act: el.matches(":active"), kids: [...el.children].map((k) => ({ ...r(k), lines: lines(k), text: (k.textContent ?? "").trim().slice(0, 32) })) }; }),
  };
  st.remove();
  return out;
};
const settle = async (page) => {
  const t0 = Date.now();
  await page.waitForTimeout(80);
  while (Date.now() - t0 < 4000) {
    const n = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
    if (n === 0) break;
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(120);
};
const dev = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.w - b.w), Math.abs(a.h - b.h));

await cli("CRIT11-C1", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const scene of SCENES) for (const vp of VIEWPORTS) for (const mode of ["light", "dark", "prt"]) {
    const P = await openPage(target, engine, scene, { mode });
    const states = [];
    let c9 = null, carrier = null;
    try {
      const { page } = P;
      await page.setViewportSize(vp);
      await page.mouse.move(2, 2);
      await page.evaluate(() => window.__tile.select(null));
      await settle(page);
      await page.evaluate(async () => {
        const raf = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        for (const el of document.querySelectorAll("[data-scene] [data-item]")) { el.scrollIntoView({ block: "center", inline: "nearest" }); await raf(); }
        for (const el of document.querySelectorAll("[data-scene], [data-scene] *")) { if (el.scrollTop || el.scrollLeft) { el.scrollTop = 0; el.scrollLeft = 0; } }
        scrollTo(0, 0); await raf();
      });
      await settle(page);
      await page.evaluate(INSTALL);
      await page.waitForTimeout(200);
      const rd = async (what) => { states.push({ what, ...(await page.evaluate(READ, NEUTRAL)) }); };
      await rd("rest");
      const loc = page.locator("[data-scene] [data-item]");
      const n = await loc.count();
      for (let k = 0; k < n; k++) { await loc.nth(k).click(); await page.mouse.move(2, 2); await settle(page); await rd(`click ${k}`); }
      await loc.nth(0).hover(); await settle(page); await rd("hover rest 0");
      await loc.nth(n - 1).hover(); await settle(page); await rd(`hover selected ${n - 1}`);
      await loc.nth(1).hover(); await page.mouse.down(); await page.waitForTimeout(220); await rd("press rest 1 (held)");
      await page.mouse.up(); await page.mouse.move(2, 2); await settle(page); await rd("after press: 1 selected");
      await page.evaluate(() => { document.activeElement?.blur?.(); document.body.focus(); });
      for (let t = 0; t < 12; t++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => !!document.activeElement?.closest?.("[data-scene] [data-item]"))) break; }
      await settle(page); await rd("focus-visible (Tab)");
      for (let k = 0; k < n; k++) { await page.keyboard.press("ArrowDown"); await settle(page); await rd(`ArrowDown ${k + 1}`); }
      c9 = await page.evaluate(() => ({ ro: window.__c9.ro, shift: window.__c9.shift, shifts: window.__c9.shifts, cls: window.__c9.cls }));
      if (scene === "c1bare-migrated") {
        // select option 1, park, blur; T-3's read of option 1 (selected) against option 2 (rest, the same two-row size)
        await page.evaluate(() => document.activeElement?.blur?.());
        await loc.nth(1).click(); await page.mouse.move(2, 2); await page.evaluate(() => document.activeElement?.blur?.()); await settle(page);
        await loc.nth(1).scrollIntoViewIfNeeded();
        await page.addStyleTag({ content: "[data-scene] [data-item] * { visibility: hidden !important; }" });
        await page.waitForTimeout(300);
        const [a, b] = [await loc.nth(1).boundingBox(), await loc.nth(2).boundingBox()];
        const cl = (o) => ({ x: Math.round(o.x), y: Math.round(o.y), width: Math.floor(Math.min(a.width, b.width)), height: Math.floor(Math.min(a.height, b.height)) });
        const A = await shot(page, cl(a)), B = await shot(page, cl(b));
        const cmp = compare(A, B, null, Math.round(4 * A.dsf)), d2 = A.dsf * A.dsf, c = cl(a);
        const inset = Math.min(6, c.width / 3, c.height / 3), inner = (q) => ({ x: q.x + inset, y: q.y + inset, w: q.width - 2 * inset, h: q.height - 2 * inset });
        const fill = contrast(meanRect(A, inner(cl(a))), meanRect(B, inner(cl(b))));
        const bar = 0.5 * 2 * (c.width + c.height);
        const bg = await page.evaluate(() => [...document.querySelectorAll("[data-scene] [data-item]")].slice(1, 3).map((el) => getComputedStyle(el).backgroundColor));
        carrier = { area: cmp.c3 / d2, edge: cmp.c3Edge / d2, bar, fill, size: `${c.width}×${c.height}`, bg };
      }
    } finally { await P.close(); }
    const tag = `${scene} ${vp.width}×${vp.height} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT VERIFIED)"}`;
    if (!states.length || !states[0].items.length) { cells.push({ gating: GATED.has(scene), pass: false, line: `${tag} · no options` }); continue; }
    const ref = states[0];
    const bad = [];
    for (const s of states) s.items.forEach((it, k) => { if (it.r !== "16px" || it.dir !== "column") bad.push(`${s.what} opt ${k}: ${it.r} ${it.dir}`); });
    const onSeq = states.map((s) => s.items.findIndex((i) => i.on)).join(",");
    if (!PILLS.has(scene)) cells.push({ gating: GATED.has(scene), pass: P.modeOk && bad.length === 0, what: "cell-every-state", line: `${tag} · cell-every-state · ${states.length} states, ${ref.items.length} options · ${bad.length ? `NOT A CELL in ${bad.length}: ${bad.slice(0, 4).join("; ")}` : "every option 16px, column, in every state"} · on per state ${onSeq}` });
    let maxB = 0, whereB = "";
    let maxC = 0, whereC = "";
    const lineMoves = [];
    for (const s of states.slice(1)) {
      const g = dev(s.group, ref.group); if (g > maxB) { maxB = g; whereB = `group, ${s.what}`; }
      s.items.forEach((it, k) => {
        const d = dev(it, ref.items[k]); if (d > maxB) { maxB = d; whereB = `opt ${k} (${ref.items[k].w.toFixed(2)}×${ref.items[k].h.toFixed(2)} → ${it.w.toFixed(2)}×${it.h.toFixed(2)}), ${s.what}`; }
        it.kids.forEach((kd, j) => {
          const r0 = ref.items[k].kids[j]; if (!r0) return;
          const dd = dev(kd, r0); if (dd > maxC) { maxC = dd; whereC = `opt ${k} child ${j} «${r0.text}» (x ${r0.x.toFixed(2)}→${kd.x.toFixed(2)}, w ${r0.w.toFixed(2)}→${kd.w.toFixed(2)}, h ${r0.h.toFixed(2)}→${kd.h.toFixed(2)}; weight ${ref.items[k].fw}→${it.fw}), ${s.what}`; }
          if (kd.lines !== r0.lines) lineMoves.push(`opt ${k} «${r0.text}» child ${j} ${r0.lines}→${kd.lines} lines (${s.what})`);
        });
      });
    }
    const sizes = [...new Set(ref.items.map((it) => `${it.w.toFixed(2)}×${it.h.toFixed(2)}`))].join(", ");
    cells.push({ gating: GATED.has(scene), pass: P.modeOk && maxB <= 0.5, what: "box-no-shift", line: `${tag} · box-no-shift (sub-pixel, transforms neutralised) · rest option sizes ${sizes}; group ${ref.group.w.toFixed(2)}×${ref.group.h.toFixed(2)} · max deviation ${maxB.toFixed(3)} px${maxB ? ` (${whereB})` : ""} · want ≤ 0.50` });
    cells.push({ gating: GATED.has(scene), pass: P.modeOk && maxC <= 0.5 && lineMoves.length === 0, what: "content-no-shift", line: `${tag} · content-no-shift · ${ref.items.reduce((a, it) => a + it.kids.length, 0)} children · max deviation ${maxC.toFixed(3)} px${maxC ? ` (${whereC})` : ""} · label line counts ${lineMoves.length ? `CHANGE in ${lineMoves.length}: ${[...new Set(lineMoves)].slice(0, 4).join("; ")}` : `unchanged (rest ${ref.items.map((it) => it.kids[0]?.lines ?? 0).join("")})`} · want ≤ 0.50, no re-wrap` });
    cells.push({ gating: GATED.has(scene), pass: c9?.ro === 0, what: "resize-observer", line: `${tag} · resize-observer · size changes after the initial entries: ${c9?.ro ?? "unread"} · want 0` });
    if (c9?.cls) cells.push({ gating: GATED.has(scene), pass: c9.shift === 0, what: "layout-shift", line: `${tag} · layout-shift · ${c9.shifts} entries, sum ${c9.shift.toFixed(5)} · want 0` });
    else cells.push({ gating: GATED.has(scene), pass: null, what: "layout-shift", line: `${tag} · layout-shift · UNMEASURED: supportedEntryTypes lists no layout-shift in this engine` });
    if (carrier) {
      const ok = carrier.area >= carrier.bar || carrier.fill >= 3;
      cells.push({ gating: GATED.has(scene) && P.modeOk, pass: P.modeOk ? ok : null, what: "carrier", line: `${tag} · carrier (bare C1: selected opt 1 vs rest opt 2, content hidden) · ${f2(carrier.area)} px² ≥3:1 (band ${f2(carrier.edge)}) vs bar ${f2(carrier.bar)} on ${carrier.size} · fill ${f2(carrier.fill)}:1 · bg selected ${carrier.bg[0]} rest ${carrier.bg[1]}` });
    }
  }
  return { id: SCENE_ARG > 0 ? "CRIT11-C1-A11" : "CRIT11-C1", title: "(rest after a first scroll) C1 under O-103c, sub-pixel and inside the option, by real input; C1 with long labels; C1 under L-3 bare (pass-9 CRITIC probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
