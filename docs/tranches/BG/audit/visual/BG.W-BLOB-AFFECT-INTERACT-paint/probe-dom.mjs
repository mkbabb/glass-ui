import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9334");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5201/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(4000);
const info = await page.evaluate(() => {
  const out = {};
  // canvases + which are goo-blob GL
  const canvases = [...document.querySelectorAll("canvas")];
  out.canvasDetail = canvases.map(c => ({
    cls: c.className,
    w: c.width, h: c.height,
    testid: c.getAttribute("data-testid"),
    parentCls: c.parentElement?.className,
  }));
  out.gooBlobCanvases = document.querySelectorAll(".goo-blob-canvas").length;
  out.wrappers = document.querySelectorAll(".goo-blob-wrapper").length;
  out.hitLayers = document.querySelectorAll(".goo-blob-hit").length;
  // computed styles of the STUDIO (first) wrapper + hit
  const wrap = document.querySelector(".goo-blob-wrapper");
  const hit = wrap?.querySelector(".goo-blob-hit");
  const canv = wrap?.querySelector(".goo-blob-canvas");
  const cs = (el) => el ? getComputedStyle(el) : null;
  out.wrapperStyle = wrap ? { pe: cs(wrap).pointerEvents } : null;
  out.hitStyle = hit ? { pe: cs(hit).pointerEvents, clip: cs(hit).clipPath, cursor: cs(hit).cursor } : null;
  out.canvasStyle = canv ? { pe: cs(canv).pointerEvents } : null;
  // preset chips — inspect the configurator presets region
  const presetRegion = document.querySelector(".configurator-presets");
  out.presetRegionHtml = presetRegion ? presetRegion.innerText.replace(/\s+/g,' ').slice(0,200) : null;
  out.presetButtons = presetRegion ? presetRegion.querySelectorAll("button,[role='button'],[role='radio']").length : 0;
  // mood select items
  return out;
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await b.close();
