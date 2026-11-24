// BM pass 10 (DESIGN §8.3): P10-slider held open (Hold open), at 390 px, light and dark, in headless Chromium.
// Shape only: Chromium is not Safari. Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-10/slider/strip.mjs
// One browser, one context per cell, closed in finally. Writes strip-held-{light,dark}.png.
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const body = readFileSync(path.resolve(HERE, "../../pages/P10-slider.html"), "utf8");
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0}</style></head><body>${body}</body></html>`;
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const p = await ctx.newPage();
      await p.setContent(html, { waitUntil: "load" }); await p.waitForTimeout(200);
      await p.click("#hold"); await p.waitForTimeout(500);
      const box = await p.evaluate(() => { const a = document.querySelector('.letter[data-v="a"]').getBoundingClientRect(), c = document.querySelector('.letter[data-v="c"]').getBoundingClientRect(); return { x: 0, y: a.top + scrollY, width: 390, height: c.bottom - a.top }; });
      await p.screenshot({ path: path.join(HERE, `strip-held-${scheme}.png`), clip: box, fullPage: true });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
