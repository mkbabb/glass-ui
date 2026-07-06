// Capture a list of routes (both modes) via real Chrome CDP → fullPage PNGs.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTES = (process.env.ROUTES || "").split(",").filter(Boolean);
const MODES = (process.env.MODES || "dark").split(",");
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
for (const route of ROUTES) {
  for (const mode of MODES) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); }
    await page.waitForTimeout(400);
    const slug = route.replace(/^\//, "").replace(/\//g, "-");
    const outPath = `${OUT}${slug}-chrome-${mode}.png`;
    await page.screenshot({ path: outPath, fullPage: true });
    console.log("saved " + outPath);
    await page.close();
  }
}
await browser.close();
