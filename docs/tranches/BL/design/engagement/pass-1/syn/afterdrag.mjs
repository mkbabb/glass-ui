#!/usr/bin/env node
// afterdrag.mjs · synthesis seam check (D5 pass 1). After a pointer drag and release on the slider (no keyboard),
// does an in-place `:has(:focus-visible)` engaged arm stay grown? Reads the root's width and scale at 50, 600 and
// 1500 ms after release, the thumb's :focus-visible and the active element. A plain click is the control.
// After R-C's c-afterdrag.mjs (which read --engage); this one reads geometry, so it serves any route.
// node afterdrag.mjs --build <dir> [--engine webkit]
import { Engine, serveTarget, openPage, center, acquireLock, load, parseArgs } from "../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
console.log(`# afterdrag · ${a.build} · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
for (const mode of ["drag", "click"]) {
  const P = await openPage(E, T, "slider", { theme: "light" });
  const rd = () => P.page.evaluate(() => {
    const r = document.querySelector(".glass-slider"); const th = document.querySelector('[role="slider"]');
    return { w: r.getBoundingClientRect().width.toFixed(1), sc: getComputedStyle(r).scale, fv: th.matches(":focus-visible"), act: document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName };
  });
  const rest = await rd();
  const c = await center(P.page, '[role="slider"]');
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
  if (mode === "drag") { for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); } await P.page.waitForTimeout(250); }
  await P.page.mouse.up(); await P.page.mouse.move(2, 2);
  const out = []; let prev = 0;
  for (const t of [50, 600, 1500]) { await P.page.waitForTimeout(t - prev); prev = t; const r = await rd(); out.push(`${t} ms: width ${r.w} (×${(r.w / rest.w).toFixed(3)}) scale ${r.sc} thumb:focus-visible ${r.fv} active ${r.act}`); }
  console.log(`  REPORT     ${mode} release · rest ${rest.w} · ${out.join(" · ")} · load ${load()}`);
  await P.close();
}
await E.close(); T.close(); console.log(`# done · load ${load()}`);
