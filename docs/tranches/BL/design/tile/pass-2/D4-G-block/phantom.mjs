#!/usr/bin/env node
// D4-G block test · does a body PAINT where its tile is not? K2 with the Back section never rendered at mount (the
// 1600 px spacer, as register.mjs `cvspacer`), the selected tile (ease-out-back) far below the port. The visible
// port is shot with the selection on that tile and with no selection (`sel=none`): any pixel that differs is a body
// painted somewhere on screen while its tile is offscreen. Then the tile is revealed and the same pair is shot
// around it, where the body must paint (a control: a live body differs from no selection).
//   node phantom.mjs --arms name=<build>,… --json <file>
import fs from "node:fs";
import path from "node:path";
import { browser, closeBrowsers, parseArgs, serve, acquireLock, load, ENGINE_LABEL, PNG } from "../../harness/lib.mjs";
const a = parseArgs();
const ARMS = a.arms.split(",").map((kv) => { const [name, dir] = kv.split("="); return { name, dir: path.resolve(dir) }; });
const lock = await acquireLock("D4-G phantom");
const rows = [];
const INIT = () => { const st = document.createElement("style"); st.textContent = ".catalogue-section:first-of-type { margin-bottom: 1600px; }";
  const put = () => { if (document.head) { document.head.append(st); return true; } return false; };
  if (!put()) new MutationObserver((_, o) => { if (put()) o.disconnect(); }).observe(document, { childList: true, subtree: true }); };
for (const engine of ["chromium", "webkit"]) for (const arm of ARMS) {
  const srv = await serve(path.join(arm.dir, "dist"));
  const shots = {};
  for (const sel of ["7", "none"]) {
    const b = await browser(engine); const ctx = await b.newContext({ viewport: { width: 1000, height: 900 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage(); await page.addInitScript(`(${INIT.toString()})()`);
    await page.goto(`${srv.url}/index.html?scene=specimen-migrated&sel=${sel}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__tile?.ready === true);
    await page.mouse.move(1, 1); await page.waitForTimeout(700);
    const clip = await page.evaluate(() => { const r = document.querySelector(".fading-scroll").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
    shots[sel] = { mount: PNG.sync.read(await page.screenshot({ clip })) };
    await page.evaluate(() => { document.querySelectorAll("[data-item]")[7].scrollIntoView({ block: "center" }); });
    await page.waitForTimeout(500);
    shots[sel].revealed = PNG.sync.read(await page.screenshot({ clip }));
    await ctx.close();
  }
  const diff = (p, q) => { let n = 0; for (let i = 0; i < p.data.length; i += 4) if (Math.abs(p.data[i] - q.data[i]) + Math.abs(p.data[i + 1] - q.data[i + 1]) + Math.abs(p.data[i + 2] - q.data[i + 2]) > 30) n++; return n; };
  const r = { engine: ENGINE_LABEL[engine], arm: arm.name, mountDiffPx: diff(shots["7"].mount, shots.none.mount), revealedDiffPx: diff(shots["7"].revealed, shots.none.revealed), load: load() };
  rows.push(r);
  console.log(`${r.engine.padEnd(17)} ${arm.name.padEnd(10)} tile far offscreen: ${r.mountDiffPx} px of the visible port differ from no selection (a phantom body if > 0) · revealed: ${r.revealedDiffPx} px differ (the live body; must be > 0) · load ${r.load}`);
  await srv.close();
}
fs.writeFileSync(a.json, JSON.stringify(rows, null, 1));
await closeBrowsers(); lock.release();
