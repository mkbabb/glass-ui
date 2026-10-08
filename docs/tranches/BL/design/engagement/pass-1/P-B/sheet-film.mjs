#!/usr/bin/env node
// sheet-film.mjs · P-B. The detented Sheet's grip filmed per frame through E-4's fling (released at once) and still
// release (250 ms stop), on a build carrying the local position fix (sheet-position-local.patch). Prints the grip's y
// every frame from 60 ms before release to 900 ms after, so a one-frame jump can be placed (drag step or settle).
// node sheet-film.mjs --build <dir> [--engine webkit]
import { Engine, serveTarget, openPage, center, acquireLock, load, parseArgs } from "../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
const waited = await acquireLock();
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
console.log(`# sheet-film · ${a.build} · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
const sel = '[data-slot="sheet-detent-handle"]';
for (const still of [false, true]) {
  const P = await openPage(E, T, "sheet", { theme: "light" });
  await P.page.evaluate((sel) => { window.__fr = []; const el = document.querySelector(sel); const t0 = performance.now(); const tick = () => { window.__fr.push([performance.now() - t0, el.getBoundingClientRect().top]); if (performance.now() - t0 < 4000) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, sel);
  const c = await center(P.page, sel);
  await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
  for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x, c.y - 40 * k); await P.page.waitForTimeout(16); }
  if (still) await P.page.waitForTimeout(250);
  const tUp = await P.page.evaluate(() => performance.now()); await P.page.mouse.up();
  await P.page.waitForTimeout(1200);
  const { fr, t0 } = await P.page.evaluate(() => ({ fr: window.__fr, t0: performance.timeOrigin }));
  const startAt = await P.page.evaluate(() => performance.now()) ;
  // frames are relative to the film's own start; find release by the page clock
  const filmStart = await P.page.evaluate(() => 0);
  const rel = fr.map(([t, y]) => [t, y]);
  let prev = null; const rows = [];
  for (const [t, y] of rel) { rows.push(`${t.toFixed(0)}:${y.toFixed(1)}${prev !== null && Math.abs(y - prev) > 20 ? "!" : ""}`); prev = y; }
  console.log(`  REPORT     ${still ? "still" : "fling"} · release at page t ${tUp.toFixed(0)} ms · grip top per frame (t:y, ! = a move > 20 px in one frame): ${rows.filter((_, i) => i % 1 === 0).join(" ")} · load ${load()}`);
  await P.close();
}
await E.close(); T.close(); console.log(`# done · load ${load()}`);
