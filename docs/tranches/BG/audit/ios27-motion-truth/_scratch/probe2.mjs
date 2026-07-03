import { chromium } from "playwright-core";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9345");
const ctx = browser.contexts()[0];
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto("http://localhost:5200/dock/overview", { waitUntil: "networkidle" });
await new Promise(r => setTimeout(r, 2000));
const dock = page.locator(".glass-dock.relative.z-10").first();
await dock.scrollIntoViewIfNeeded();
await new Promise(r => setTimeout(r, 500));
const box = await dock.boundingBox();
console.log("box", box);
const cls = () => page.evaluate(() => document.querySelector(".glass-dock.relative.z-10")?.className);
await page.mouse.move(box.x + box.width/2, box.y + box.height/2, { steps: 6 });
await new Promise(r => setTimeout(r, 600));
console.log("hover:", await cls());
await page.mouse.move(box.x + box.width/2, box.y - 250, { steps: 6 });
for (let t = 0; t <= 5500; t += 500) {
  console.log(`t+${t}ms:`, (await cls())?.match(/expanded|collapsed|pinned/g)?.join(","));
  await new Promise(r => setTimeout(r, 500));
}
const box2 = await dock.boundingBox();
console.log("box after:", box2);
await browser.close();
