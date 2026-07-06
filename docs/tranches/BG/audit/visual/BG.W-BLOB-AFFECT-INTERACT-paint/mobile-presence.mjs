import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 390, height: 844 }); // iPhone-class
await page.goto("http://localhost:5200/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(4500);
const info = await page.evaluate(() => {
  const canv = [...document.querySelectorAll(".goo-blob-canvas")];
  const hit = [...document.querySelectorAll(".goo-blob-hit")];
  const sizes = canv.map(c => { const r = c.getBoundingClientRect(); return { w: Math.round(r.width), h: Math.round(r.height), visible: r.width>0 && r.height>0 }; });
  return {
    gooBlobCanvases: canv.length,
    hitLayers: hit.length,
    sizes,
    anyVisible: sizes.some(s => s.visible),
    presetButtons: document.querySelectorAll(".configurator-presets button, .configurator-presets [role='button'], .configurator-presets [role='radio']").length,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.close(); await b.close();
