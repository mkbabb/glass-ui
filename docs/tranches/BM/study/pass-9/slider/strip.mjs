// BM pass 9 (DESIGN §12): strips of P9-slider held open, in headless Chromium at 390 px, light and dark, for the design's
// pictures. Chromium paints in software and is not Safari; these show the shape only.
// Run: ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-9/slider/strip.mjs
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const body = readFileSync(path.resolve(HERE, "../../pages/P9-slider.html"), "utf8");
const wrap = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>body{margin:0}</style></head><body>${body}</body></html>`;
const browser = await chromium.launch({ headless: true });
try {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const page = await ctx.newPage();
      await page.setContent(wrap, { waitUntil: "load" });
      const sec = page.locator("section").first();
      await sec.screenshot({ path: path.join(HERE, `strip-rest-${scheme}.png`) });
      await page.click("#hold"); await page.waitForTimeout(500);
      await sec.screenshot({ path: path.join(HERE, `strip-held-${scheme}.png`) });
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
console.log("strips written");
