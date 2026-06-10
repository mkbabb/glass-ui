import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto("http://localhost:5199/dock/layers", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.evaluate(() => { Object.defineProperty(document,"hidden",{value:true,configurable:true}); document.dispatchEvent(new Event("visibilitychange")); });
await page.waitForTimeout(300);

// Find the switcher-rail INSIDE the showcase (show-rail), not the dock-layer rail tabs
const info = await page.evaluate(() => {
  // The switcher rail in the demo: look for the rail with show-rail near "Switcher rail" heading
  const rails = Array.from(document.querySelectorAll(".dock-layer-rail"));
  return rails.map(r => {
    const rect = r.getBoundingClientRect();
    const tabs = Array.from(r.querySelectorAll("button"));
    const cs = getComputedStyle(r);
    return {
      rect: {x:rect.x,y:rect.y,w:rect.width,h:rect.height},
      bg: cs.backgroundColor, br: cs.borderRadius, w: cs.width, p: cs.padding,
      tabSvgs: tabs.map(t=>{ const s=t.querySelector("svg"); const sr=s?.getBoundingClientRect(); const ts=t.getBoundingClientRect();
        const svgCS = s?getComputedStyle(s):null;
        return { tabW: ts.width.toFixed(0), tabH: ts.height.toFixed(0), svgW: sr?.width.toFixed(1), svgH: sr?.height.toFixed(1), svgCssW: svgCS?.width, svgCssH: svgCS?.height, viewBox: s?.getAttribute("viewBox"), strokeW: svgCS?.strokeWidth }; }),
    };
  });
});
console.log(JSON.stringify(info, null, 2));

// zoom the first rail with width>0 height>40 (the vertical demo rail)
const target = info.find(r => r.rect.h > 50 && r.rect.w < 60) || info[0];
if (target) {
  const r = target.rect;
  await page.screenshot({ path: `${GROUND}/F2-r3-1-rail-tight-zoom.png`, clip: { x: Math.max(0,r.x-6), y: Math.max(0,r.y-6), width: r.w+12, height: r.h+12 } });
  // 4x upscale via deviceScaleFactor already 2; do a clip then we read it
}
await browser.close();
console.log("DONE");
