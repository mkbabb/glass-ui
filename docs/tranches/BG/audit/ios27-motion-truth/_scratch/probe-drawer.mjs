import { chromium } from "playwright-core";
const browser = await chromium.connectOverCDP("http://127.0.0.1:9345");
const ctx = browser.contexts()[0];
const page = ctx.pages()[0] ?? (await ctx.newPage());
await page.goto("http://localhost:5200/compositions/drawer-live-behind", { waitUntil: "networkidle" });
await page.waitForSelector("main");
await new Promise(r => setTimeout(r, 1500));
await page.locator("#detent-half").scrollIntoViewIfNeeded();
await new Promise(r => setTimeout(r, 400));
await page.locator("#detent-half").click();
await new Promise(r => setTimeout(r, 1200));
const state = () => page.evaluate(() => {
  const s = document.querySelector("[data-glass-drawer]");
  if (!s) return null;
  const cs = getComputedStyle(s);
  const r = s.getBoundingClientRect();
  return {
    t: cs.getPropertyValue("--glass-drawer-t"),
    transform: cs.transform, translate: cs.translate,
    rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
    vh: innerHeight,
    snapAttr: s.getAttribute("data-glass-drawer-snap-points"),
    activeText: document.body.textContent.match(/active: [\d.]+/)?.[0],
  };
});
console.log("after open-half:", JSON.stringify(await state()));
const grip = page.locator("[data-glass-drawer-handle]").first();
const gb = await grip.boundingBox();
console.log("grip box:", gb);
if (gb) {
  const gx = gb.x + gb.width / 2, gy = gb.y + gb.height / 2;
  await page.mouse.move(gx, gy, { steps: 3 });
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) { await page.mouse.move(gx, gy + i * 50); await new Promise(r => setTimeout(r, 20)); }
  console.log("mid-drag:", JSON.stringify(await state()));
  await page.mouse.up();
  await new Promise(r => setTimeout(r, 1200));
  console.log("after release:", JSON.stringify(await state()));
}
await browser.close();
