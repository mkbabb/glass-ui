import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9334");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5201/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(3500);
const info = await page.evaluate(() => {
  const wrap = document.querySelector(".goo-blob-wrapper");
  const hit = document.querySelector(".goo-blob-hit");
  const canvases = [...document.querySelectorAll("canvas")];
  let glCount = 0;
  for (const c of canvases) {
    try { if (c.getContext("webgl2") || c.getContext("webgl")) glCount++; } catch {}
  }
  return {
    url: location.href,
    hasWrapper: !!wrap,
    hasHit: !!hit,
    canvasCount: canvases.length,
    glCount,
    mainChildren: document.querySelector("main")?.children.length ?? null,
    presetChips: document.querySelectorAll(".configurator-presets button, .configurator-presets [role='button']").length,
  };
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await b.close();
