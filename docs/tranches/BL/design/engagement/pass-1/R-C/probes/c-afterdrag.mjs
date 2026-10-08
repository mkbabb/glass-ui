#!/usr/bin/env node
// c-afterdrag.mjs · after a pointer drag and release on the slider (no keyboard), does the engaged rung persist?
// Reads the root's computed --engage and its width at 50, 600 and 1500 ms after release, plus :focus-visible on the
// thumb and the active element. Both engines. node c-afterdrag.mjs --build <dir> [--engine webkit]
import { Engine, serveTarget, openPage, center, acquireLock, load, parseArgs } from "../../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
console.log(`# c-afterdrag · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
for (const mode of ["drag", "click"]) {
  const P = await openPage(E, T, "slider", { theme: "light" });
  const c = await center(P.page, '[role="slider"]');
  const rd = () => P.page.evaluate(() => { const r = document.querySelector(".glass-slider"); const th = document.querySelector('[role="slider"]');
    return { e: getComputedStyle(r).getPropertyValue("--engage").trim(), w: r.getBoundingClientRect().width.toFixed(1), fv: th.matches(":focus-visible"), act: document.activeElement?.getAttribute("role") }; });
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
  if (mode === "drag") { for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); } await P.page.waitForTimeout(250); }
  await P.page.mouse.up(); await P.page.mouse.move(2, 2);
  const out = [];
  for (const t of [50, 600, 1500]) { await P.page.waitForTimeout(t - (out.length ? [50, 600, 1500][out.length - 1] : 0)); out.push(`${t} ms: --engage ${(await rd()).e} width ${(await rd()).w} thumb:focus-visible ${(await rd()).fv} active ${(await rd()).act}`); }
  console.log(`  REPORT     ${mode} release · ${out.join(" · ")} · load ${load()}`);
  await P.close();
}
await E.close(); T.close(); console.log(`# done · load ${load()}`);
