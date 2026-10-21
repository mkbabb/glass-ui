#!/usr/bin/env node
// D4 pass 8 · CRITIC probe: O-103c's condition attacked past the BUILD seat's c1-box read. "C1 is a cell in BOTH
// states; selection must not change its geometry (no layout shift)." The BUILD probe reads model writes only, at the
// harness's one 1000×900 viewport. This one drives C1 by the real input paths and reads every interaction state, at
// 390×844 and 1440×900, light, dark and PRT:
//   rest (nothing selected, pointer parked) · each option selected by a real pointer click (pointer then parked) ·
//   hover on a rest option and on the selected option · press (pointer held down) on a rest option · keyboard focus
//   (focus-visible, reached by Tab then an arrow) on the selected option · each option selected by ArrowDown.
// In every state it reads, for every option and the group: the layout box (offsetLeft/Top/Width/Height, transforms
// excluded), the corner and the flex direction. Cells per viewport × mode:
//   cell-every-state   every option is 16px and a column in every state read
//   no-shift           every option's and the group's layout box equals the rest state's (max deviation ≤ 0.50 px)
//   resize-observer    a ResizeObserver on the group and every option, installed at rest, sees no size change
//                      through the whole walk (border-box entries after the initial one: want 0)
//   layout-shift       Chromium only: the sum of every `layout-shift` entry over the walk (hadRecentInput included),
//                      want 0. Playwright WebKit has no Layout Instability API: UNMEASURED there
//   node crit-c1-states.mjs --build <D4-Dp8 route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";

const VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
const INSTALL = () => {
  const scene = document.querySelector("[data-scene]");
  const els = [scene.querySelector("[data-group]"), ...scene.querySelectorAll("[data-item]")];
  window.__crit = { ro: 0, seen: new Set(), shift: 0, shifts: 0 };
  const ro = new ResizeObserver((es) => { for (const e of es) { if (window.__crit.seen.has(e.target)) window.__crit.ro++; else window.__crit.seen.add(e.target); } });
  els.forEach((el) => ro.observe(el, { box: "border-box" }));
  // an engine without the Layout Instability API accepts observe() silently (Playwright WebKit does): ask first, or
  // the cell reads 0 entries vacuously (this seat's first run did, D4-Dp8-critique §3.1)
  if (!(PerformanceObserver.supportedEntryTypes ?? []).includes("layout-shift")) { window.__crit.cls = false; return; }
  try {
    new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__crit.shift += e.value; window.__crit.shifts++; } }).observe({ type: "layout-shift", buffered: false });
    window.__crit.cls = true;
  } catch { window.__crit.cls = false; }
};
const READ = () => {
  const scene = document.querySelector("[data-scene]");
  const group = scene.querySelector("[data-group]");
  const box = (el) => ({ ol: el.offsetLeft, ot: el.offsetTop, ow: el.offsetWidth, oh: el.offsetHeight });
  const items = [...scene.querySelectorAll("[data-item]")];
  return {
    group: box(group),
    items: items.map((el) => { const c = getComputedStyle(el); return { ...box(el), r: c.borderTopLeftRadius, dir: c.flexDirection, on: el.getAttribute("aria-checked") === "true" || el.dataset.state === "on", fv: el.matches(":focus-visible"), hov: el.matches(":hover"), act: el.matches(":active") }; }),
  };
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
const dev = (a, b) => Math.max(...["ol", "ot", "ow", "oh"].map((k) => Math.abs(a[k] - b[k])));

await cli("CRIT-C1", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const vp of VIEWPORTS) for (const mode of ["light", "dark", "prt"]) {
    const P = await openPage(target, engine, "c1-migrated", { mode });
    const states = [];
    let crit = null;
    try {
      const { page } = P;
      await page.setViewportSize(vp);
      await page.mouse.move(2, 2);
      await page.evaluate(() => window.__tile.select(null));
      await settle(page);
      await page.evaluate(INSTALL);
      await page.waitForTimeout(200);
      const rd = async (what) => { states.push({ what, ...(await page.evaluate(READ)) }); };
      await rd("rest");
      const loc = page.locator("[data-scene] [data-item]");
      const n = await loc.count();
      const center = async (k) => { const b = await loc.nth(k).boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
      for (let k = 0; k < n; k++) {
        const [x, y] = await center(k);
        await page.mouse.click(x, y); await page.mouse.move(2, 2); await settle(page); await rd(`click ${k}`);
      }
      // the last option is selected now: hover a rest option, hover the selected one, press a rest option
      { const [x, y] = await center(0); await page.mouse.move(x, y); await settle(page); await rd("hover rest 0"); }
      { const [x, y] = await center(n - 1); await page.mouse.move(x, y); await settle(page); await rd(`hover selected ${n - 1}`); }
      { const [x, y] = await center(1); await page.mouse.move(x, y); await page.mouse.down(); await page.waitForTimeout(220); await rd("press rest 1 (held)"); await page.mouse.up(); await page.mouse.move(2, 2); await settle(page); await rd("after press: 1 selected"); }
      // keyboard: Tab into the group (the one tab stop, the selected option), then ArrowDown through every option
      await page.evaluate(() => { document.activeElement?.blur?.(); document.body.focus(); });
      for (let t = 0; t < 12; t++) { await page.keyboard.press("Tab"); if (await page.evaluate(() => !!document.activeElement?.closest?.("[data-scene] [data-item]"))) break; }
      await settle(page); await rd("focus-visible (Tab)");
      for (let k = 0; k < n; k++) { await page.keyboard.press("ArrowDown"); await settle(page); await rd(`ArrowDown ${k + 1}`); }
      crit = await page.evaluate(() => ({ ro: window.__crit.ro, shift: window.__crit.shift, shifts: window.__crit.shifts, cls: window.__crit.cls }));
    } finally { await P.close(); }
    const tag = `${vp.width}×${vp.height} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT VERIFIED)"}`;
    if (!states.length || !states[0].items.length) { cells.push({ gating: true, pass: false, line: `${tag} · no C1 options` }); continue; }
    const ref = states[0];
    const bad = [];
    for (const s of states) s.items.forEach((it, k) => { if (it.r !== "16px" || it.dir !== "column") bad.push(`${s.what} opt ${k}: ${it.r} ${it.dir}`); });
    const flags = states.map((s) => `${s.what}[on ${s.items.findIndex((i) => i.on)}${s.items.some((i) => i.fv) ? ` fv ${s.items.findIndex((i) => i.fv)}` : ""}${s.items.some((i) => i.hov) ? ` hov ${s.items.findIndex((i) => i.hov)}` : ""}${s.items.some((i) => i.act) ? ` act ${s.items.findIndex((i) => i.act)}` : ""}]`).join(" ");
    cells.push({ gating: true, pass: P.modeOk && bad.length === 0, what: "cell-every-state", line: `${tag} · cell-every-state · ${states.length} states read · ${bad.length ? `NOT A CELL in ${bad.length}: ${bad.slice(0, 4).join("; ")}` : "every option 16px, column, in every state"} · states ${flags}` });
    let maxD = 0, where = "";
    for (const s of states.slice(1)) {
      const g = dev(s.group, ref.group); if (g > maxD) { maxD = g; where = `group, ${s.what}`; }
      s.items.forEach((it, k) => { const d = dev(it, ref.items[k]); if (d > maxD) { maxD = d; where = `opt ${k}, ${s.what}`; } });
    }
    const sizes = ref.items.map((it) => `${it.ow}×${it.oh}`).join(", ");
    cells.push({ gating: true, pass: P.modeOk && maxD <= 0.5, what: "no-shift", line: `${tag} · no-shift · rest options ${sizes} (offset px); group ${ref.group.ow}×${ref.group.oh} · max layout deviation over every option and the group in every state ${f2(maxD)} px${maxD ? ` (${where})` : ""} · want ≤ 0.50` });
    cells.push({ gating: true, pass: crit?.ro === 0, what: "resize-observer", line: `${tag} · resize-observer · size changes seen on the group and ${ref.items.length} options after the initial entries: ${crit?.ro ?? "unread"} · want 0` });
    if (crit?.cls) cells.push({ gating: true, pass: crit.shift === 0, what: "layout-shift", line: `${tag} · layout-shift · ${crit.shifts} entries, sum ${crit.shift.toFixed(5)} over the walk (input-driven included) · want 0` });
    else cells.push({ gating: true, pass: null, what: "layout-shift", line: `${tag} · layout-shift · UNMEASURED: no Layout Instability API in this engine` });
  }
  return { id: "CRIT-C1", title: "C1 a cell in every interaction state, no layout shift by pointer, hover, press, focus or keys, at 390 and 1440 (pass-8 CRITIC probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
