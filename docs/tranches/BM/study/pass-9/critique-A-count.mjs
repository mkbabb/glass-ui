// BM pass 9, critique A: how many animations P9-slider's model starts on a mouse hover (after its 120 ms dwell) and on a
// press, for A and B on the default (thumbless) md slider, read from document.getAnimations() in headless Chromium.
// Chromium is not Safari and has no GPU here: this counts declared CSS transitions that start, nothing about threads.
// Run: ~/.claude/guard/guarded --timeout 10 -- node docs/tranches/BM/study/pass-9/critique-A-count.mjs
// One browser, one context per cell, everything closed in finally. Writes critique-A-count.json.
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const page0 = readFileSync(path.resolve(HERE, "../pages/P9-slider.html"), "utf8");
const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${body}</body></html>`;
const out = { method: "pass-9/critique-A-count.mjs; headless Chromium, document.getAnimations() 40 ms after the state changes", cells: {} };
const browser = await chromium.launch({ headless: true });
try {
  for (const letter of ["a", "b"]) {
    for (const how of ["hover", "press"]) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
      try {
        const page = await ctx.newPage();
        await page.setContent(wrap(page0), { waitUntil: "load" });
        await page.waitForTimeout(150);
        const sel = `.letter[data-v="${letter}"] .sl[data-size="md"]`;
        const box = await page.evaluate((sel) => { const s = document.querySelector(sel); s.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(); return { x: r.left + r.width * 0.3, y: r.top + r.height / 2 }; }, sel);
        await page.mouse.move(5, 5);
        await page.waitForTimeout(100);
        await page.evaluate(() => document.getAnimations().forEach((a) => a.finish()));
        if (how === "hover") { await page.mouse.move(box.x, box.y); await page.waitForTimeout(120 + 40); }
        else { await page.mouse.move(box.x, box.y); await page.mouse.down(); await page.waitForTimeout(40); }
        const anims = await page.evaluate((sel) => {
          const s = document.querySelector(sel);
          return document.getAnimations().filter((a) => a.effect && a.effect.target && s.contains(a.effect.target)).map((a) => {
            const t = a.effect.target, pe = a.effect.pseudoElement || "";
            return `${t.className}${pe} ${a.transitionProperty || a.animationName || "?"}`;
          });
        }, sel);
        out.cells[`${letter.toUpperCase()} md thumbless, ${how}`] = { count: anims.length, animations: anims };
        if (how === "press") await page.mouse.up();
      } finally { await ctx.close(); }
    }
  }
} finally { await browser.close(); }
writeFileSync(path.resolve(HERE, "critique-A-count.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
