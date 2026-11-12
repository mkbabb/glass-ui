// Drives test/glass-repro/dock-press-scroll.html on a vite dev server (URL arg): quick press on Again, PRM and not.
import { chromium } from "/Users/mkbabb/Programming/daraksha-wt/o1110-finish/node_modules/playwright/index.mjs";
const url = process.argv[2];
const browser = await chromium.launch();
try {
  for (const rm of ["reduce", "no-preference"]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    try {
      const page = await ctx.newPage();
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(800);
      await page.locator('[aria-label$="open the dock"]').first().hover();
      await page.waitForTimeout(900);
      const before = JSON.parse(await page.locator("#readout").textContent());
      await page.evaluate(() => { window.__ev = []; for (const t of ["pointerdown", "pointerup", "click"]) document.addEventListener(t, (e) => window.__ev.push(`${t}:${e.target.closest("[aria-label]")?.getAttribute("aria-label") ?? e.target.className}`), true); });
      await page.locator('[aria-label="Again"]').click();
      await page.waitForTimeout(300);
      const after = JSON.parse(await page.locator("#readout").textContent());
      console.log(JSON.stringify({ rm, before, after, events: await page.evaluate(() => window.__ev), dropped: after.presses === before.presses }));
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
