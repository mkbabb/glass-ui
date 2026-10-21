#!/usr/bin/env node
// C-A5 adversarial probe (D5 pass 5): the capsule's hover lift and press snap on a library toggle the candidate ships.
// Not a witness; scored in C-A5.md against CK-11 (FL-1: "the capsule's press snap and hover lift are retired, not
// overridden") and CK-14 (FL-4: "no hover latch: the Button's coarse tap settling at 1.015 fails"). App: ca5-App.vue
// (build.mjs --app), scene `capsule`: the Configurator preset strip; the target is the second chip (not active).
// One browser per run, a context per cell, closed in finally (lib.mjs openPage/Engine). No screenshot.
//   node ca5-capsule.mjs --build <out>/builds/ca5app-<label> [--engine chromium|webkit]
// Cells:
//   capsule hover · fine     the chip's computed `scale` and painted/layout width ratio at rest and hovered 400 ms.
//                            FAIL when the hover writes geometry (|scale − 1| > 0.002): the lift is not retired
//   capsule press · fine     hovered, then the primary button held 250 ms: FAIL when the press writes geometry by a
//                            class rung (`:active` snap) rather than the door
//   capsule tap · coarse     a touch tap (hasTouch; isMobile in Chromium), then +900 ms with no pointer: FAIL when the
//                            chip stays off scale 1 (the hover latch); UNMEASURED when the page does not report a
//                            coarse, hover-less pointer (the engine's emulation limit)
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const SEL = ".configurator-preset-chip";
const read = () => { const e = document.querySelectorAll(".configurator-preset-chip")[1]; const cs = getComputedStyle(e); const r = e.getBoundingClientRect(); return { scale: cs.scale, ratio: r.width / e.offsetWidth, hover: e.matches(":hover"), active: e.matches(":active"), cls: e.className.split(" ").filter((c) => /capsule|engage/.test(c)).join(" ") }; };
const num = (s) => (s === "none" ? 1 : Number.parseFloat(s));

await acquireLock();
console.log(`C-A5 capsule probe · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, "capsule", { theme });
    try {
      const { page } = P;
      await page.waitForTimeout(200);
      const r0 = await page.evaluate(read);
      const c = await page.evaluate(() => { const r = document.querySelectorAll(".configurator-preset-chip")[1].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      await page.mouse.move(c.x, c.y); await page.waitForTimeout(400);
      const r1 = await page.evaluate(read);
      cell(`capsule hover · fine · ${theme}`, Math.abs(num(r1.scale) - 1) > 0.002 ? "FAIL" : "PASS",
        `chip (${r0.cls}) rest scale ${r0.scale} (painted/layout ${f(r0.ratio, 4)}) → hovered 400 ms (:hover ${r1.hover}) scale ${r1.scale} (${f(r1.ratio, 4)}) (bound: the hover writes no geometry, |scale − 1| ≤ 0.002)`);
      await page.mouse.down(); await page.waitForTimeout(250);
      const r2 = await page.evaluate(read);
      await page.mouse.up(); await page.waitForTimeout(600);
      const r3 = await page.evaluate(read);
      cell(`capsule press · fine · ${theme}`, r2.active && Math.abs(num(r2.scale) - num(r1.scale)) > 0.002 ? "FAIL" : "PASS",
        `held 250 ms (:active ${r2.active}): scale ${r2.scale} (${f(r2.ratio, 4)}) · released +600 ms still hovered: scale ${r3.scale} (bound: no :active class rung writes the press's geometry)`);
    } finally { await P.close(); }
  }
  for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, "capsule", { theme, coarse: true });
    try {
      const { page } = P;
      await page.waitForTimeout(200);
      const c = await page.evaluate(() => { const r = document.querySelectorAll(".configurator-preset-chip")[1].getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
      await page.touchscreen.tap(c.x, c.y); await page.waitForTimeout(900);
      const r = await page.evaluate(read); const st = await page.evaluate(() => window.__e.state());
      const name = `capsule tap · coarse · ${theme}`;
      if (!P.modeOk) cell(name, "UNMEASURED", `the page does not report a coarse hover-less pointer (${P.modeLine}): engine emulation limit · scale +900 ms ${r.scale}, :hover ${r.hover}, state ${st}`);
      else cell(name, Math.abs(num(r.scale) - 1) > 0.002 ? "FAIL" : "PASS", `${P.modeLine} · tap committed (state ${st}) · +900 ms: scale ${r.scale} (${f(r.ratio, 4)}), :hover ${r.hover} (bound: no hover latch, settles at 1 ± 0.002)`);
    } finally { await P.close(); }
  }
} finally { await E.close?.(); T.close?.(); }
const fails = out.filter((s) => /^\s+FAIL/.test(s)).length;
console.log(`C-A5 capsule probe · ${engine} · ${out.length - fails} other, ${fails} fail · load ${load()} at end`);
process.exit(0);
