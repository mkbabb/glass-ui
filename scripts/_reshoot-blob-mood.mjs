import { chromium } from "@playwright/test";
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://127.0.0.1:5199";
const OUT = "docs/tranches/AY/audit/visual";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto(`${BASE}/substrates/blob`, { waitUntil: "networkidle" });
await page.waitForSelector("canvas", { timeout: 8000 });
await page.evaluate(() => { const c = document.querySelector("canvas"); c.scrollIntoView({ block: "center", behavior: "instant" }); });
await page.waitForTimeout(1000);
const canvas = page.locator("canvas").first();
const box = await canvas.boundingBox();
// drive the mood-lean by hovering across the blob over 5 frames (the pointer-follow squish)
const xs = [0.3, 0.45, 0.55, 0.7, 0.5];
const ys = [0.4, 0.5, 0.45, 0.6, 0.5];
for (let i = 0; i < 5; i++) {
  await page.mouse.move(box.x + box.width * xs[i], box.y + box.height * ys[i], { steps: 8 });
  await page.waitForTimeout(280);
  await canvas.screenshot({ path: `${OUT}/W-BLOB2-blob-mood-hover-frame${i + 1}-desktop-light.png`, scale: "css", type: "png" });
}
await browser.close();
console.log("mood-lean frames re-shot: 5");
