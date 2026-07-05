import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://localhost:9477");
const context = await browser.newContext({ deviceScaleFactor: 2, colorScheme: "dark", viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.goto("http://localhost:5200/?capture=/substrates/dot-flow-field&mode=dark", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 30000 });
await page.waitForTimeout(3000);

const info = await page.evaluate(() => {
  const scrollers = [...document.querySelectorAll("main, .demo-main-scroller, [class*=scroll]")].map(e => ({
    tag: e.tagName, cls: e.className?.toString().slice(0,60), sh: e.scrollHeight, ch: e.clientHeight, canScroll: e.scrollHeight > e.clientHeight
  })).filter(x=>x.canScroll);
  const canvases = [...document.querySelectorAll("canvas")].map((c,i) => {
    const r = c.getBoundingClientRect();
    return { i, w: c.width, h: c.height, bb: {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}, parentCls: c.parentElement?.className?.toString().slice(0,50) };
  });
  return { scrollers, canvases };
});
console.log(JSON.stringify(info, null, 2));
await context.close();
await browser.close();
