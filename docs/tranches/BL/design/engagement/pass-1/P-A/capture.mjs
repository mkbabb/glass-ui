#!/usr/bin/env node
// P-A · owner-glance captures (REGISTRY §2.5) on a build of P-A's scene app: one exemplar per built class.
//   chosen     switch (body travel), checkbox (pop), chip (selectable)
//   pressed    chipaction (an action Chip: the stateless commit through the parity edge), button
//   disclosed  accordion trigger
//   held       slider (rest, held, released)
// States: rest, pressed (pointer held 250 ms), crest (90 ms after release, a frame in flight), committed (900 ms
// later). Light and dark, fine pointer, 2x. HEAD's accordion in WebKit is taken by keyboard: its pointer entry closes
// the page (PF-1). Each frame prints its measured scale and the load.
//   node capture.mjs <build dir> <label> <out dir> [chromium|webkit]
import fs from "node:fs";
import { INIT, Engine, serveTarget, load, f, center, acquireLock } from "../../harness/lib.mjs";

const [build, label, out, engine = "chromium"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const waited = await acquireLock();
const T = await serveTarget({ build }); const E = new Engine(engine); const b = await E.browser();
console.log(`# P-A capture · ${label} · ${engine} ${E.version} · lock wait ${waited.toFixed(1)} s · load ${load()}`);
const SC = { switch: '[role="switch"]', checkbox: '[role="checkbox"]', chip: ".glass-chip", chipaction: ".glass-chip", button: ".button", accordion: ".disclosure-trigger", slider: ".glass-slider" };
for (const theme of ["light", "dark"]) for (const scene of Object.keys(SC)) {
  const ctx = await b.newContext({ viewport: { width: 520, height: 300 }, deviceScaleFactor: 2, colorScheme: theme });
  const page = await ctx.newPage(); await page.addInitScript(INIT);
  try {
    await page.goto(`${T.url}?scene=${scene}&theme=${theme}`, { timeout: 180000 }); await page.waitForFunction(() => window.__e?.ready === true, null, { timeout: 60000 });
  } catch (e) { console.log(`${label} ${engine} ${theme} ${scene} SKIPPED (${String(e).slice(0, 80)})`); await ctx.close(); continue; }
  const sel = SC[scene]; const box = (await center(page, sel)).bx;
  const clip = { x: Math.max(0, box.x - 28), y: Math.max(0, box.y - 28), width: box.width + 56, height: box.height + 56 };
  const shot = async (state) => {
    const s = await page.evaluate((sel) => window.__eff(document.querySelector(sel)).s, sel);
    const p = `${out}/${label}-${engine}-${theme}-${scene}-${state}.png`;
    await page.screenshot({ path: p, clip, animations: "allow" });
    console.log(`${label} ${engine} ${theme} ${scene.padEnd(10)} ${state.padEnd(11)} scale ${f(s)} · load ${load()}`);
  };
  await page.mouse.move(5, 5); await page.waitForTimeout(300); await shot("rest");
  const at = scene === "slider" ? await center(page, '[role="slider"]') : await center(page, sel);
  if (scene === "slider") {
    await page.mouse.move(at.x, at.y); await page.mouse.down(); await page.waitForTimeout(450); await shot("held");
    await page.mouse.up(); await page.mouse.move(5, 5); await page.waitForTimeout(600); await shot("released");
  } else if (engine === "webkit" && scene === "accordion" && label === "head") {
    await page.focus(sel); await page.waitForTimeout(200);
    await page.keyboard.down("Space"); await page.waitForTimeout(250); await shot("pressed-kbd");
    await page.keyboard.up("Space"); await page.waitForTimeout(90); await shot("crest");
    await page.evaluate(() => document.activeElement?.blur()); await page.waitForTimeout(900); await shot("committed");
  } else {
    await page.mouse.move(at.x, at.y); await page.mouse.down(); await page.waitForTimeout(250); await shot("pressed");
    await page.mouse.up(); await page.waitForTimeout(90); await shot("crest");
    await page.mouse.move(5, 5); await page.waitForTimeout(900); await shot("committed");
  }
  await ctx.close();
}
await E.close(); T.close();
console.log(`# done · load ${load()}`);
