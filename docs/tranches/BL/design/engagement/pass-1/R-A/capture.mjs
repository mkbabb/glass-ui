#!/usr/bin/env node
// R-A · owner-glance captures (REGISTRY §2.5, §3.3 item 5) for the trio on a build of the harness scene app:
// Switch (rest, pressed, commit crest, committed), Accordion trigger (rest, pressed, commit crest, committed),
// Slider (rest, held, keyboard-focused, released). Light and dark, fine pointer, at 2x. The crest frame is taken
// ~90 ms after the commit, where the `panel` spring's state coordinate passes ½ (the pop's crest); it is a frame in
// flight, read as such. Writes <out>/<build label>-<engine>-<theme>-<scene>-<state>.png and prints each with its
// measured scale.
//   node capture.mjs <build dir> <label> <out dir> [chromium|webkit]
import fs from "node:fs";
import { INIT, Engine, serveTarget, load, f, center } from "../../harness/lib.mjs";

const [build, label, out, engine = "chromium"] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const T = await serveTarget({ build }); const E = new Engine(engine); const b = await E.browser();
console.log(`# R-A capture · ${label} · ${engine} ${E.version} · load ${load()}`);
const SC = { switch: '[role="switch"]', accordion: ".disclosure-trigger", slider: ".glass-slider" };
for (const theme of ["light", "dark"]) for (const scene of ["switch", "accordion", "slider"]) {
  const ctx = await b.newContext({ viewport: { width: 520, height: 300 }, deviceScaleFactor: 2, colorScheme: theme });
  const page = await ctx.newPage(); await page.addInitScript(INIT);
  await page.goto(`${T.url}?scene=${scene}&theme=${theme}`, { timeout: 180000 }); await page.waitForFunction(() => window.__e?.ready === true, null, { timeout: 60000 });
  const sel = SC[scene]; const box = (await center(page, sel)).bx;
  const clip = { x: Math.max(0, box.x - 28), y: Math.max(0, box.y - 28), width: box.width + 56, height: box.height + 56 };
  const shot = async (state) => {
    const s = await page.evaluate((sel) => window.__eff(document.querySelector(sel)).s, sel);
    const p = `${out}/${label}-${engine}-${theme}-${scene}-${state}.png`;
    await page.screenshot({ path: p, clip, animations: "allow" });
    console.log(`${label} ${engine} ${theme} ${scene.padEnd(9)} ${state.padEnd(10)} scale ${f(s)} · load ${load()}`);
  };
  await page.mouse.move(5, 5); await page.waitForTimeout(300); await shot("rest");
  const at = scene === "slider" ? await center(page, '[role="slider"]') : await center(page, sel);
  if (scene === "slider") {
    await page.mouse.move(at.x, at.y); await page.mouse.down(); await page.waitForTimeout(450); await shot("held");
    await page.mouse.up(); await page.mouse.move(5, 5); await page.waitForTimeout(600); await shot("released");
    // keyboard focus from the sentinel before the scene: one Tab lands on the thumb with :focus-visible
    await page.evaluate(() => { document.activeElement?.blur(); document.querySelector('[data-sentinel="before"]').focus(); });
    await page.keyboard.press(engine === "webkit" ? "Alt+Tab" : "Tab");
    await page.waitForTimeout(450); await shot("focused");
  } else if (engine === "webkit" && scene === "accordion") {
    // Playwright WebKit closes the page on pointer entry over the disclosure trigger (PORTFOLIO §1.3 item 7, D4 PF-1;
    // a pointer capture hung here). The press and the commit are taken by keyboard: focus, Space held, Space released.
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
