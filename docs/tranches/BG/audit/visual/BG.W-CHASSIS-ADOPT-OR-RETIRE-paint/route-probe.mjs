import { chromium } from "playwright";
const browser = await chromium.connectOverCDP(process.env.CDP_URL);
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
await page.goto(`${process.env.ORIGIN}/`, { waitUntil: "load" });
await page.waitForTimeout(1500);
const routes = await page.evaluate(() => {
  const links = Array.from(document.querySelectorAll("a[href]"))
    .map(a => a.getAttribute("href"))
    .filter(h => h && h.startsWith("/") && !h.startsWith("//"));
  return Array.from(new Set(links)).sort();
});
console.log(JSON.stringify(routes));
await page.close();
await browser.close().catch(()=>{});
