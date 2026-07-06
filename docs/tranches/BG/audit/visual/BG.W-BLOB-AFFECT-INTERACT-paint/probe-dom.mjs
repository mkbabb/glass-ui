import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/substrates/blob", { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(4500);
const info = await page.evaluate(() => {
  const out = {};
  const canvases = [...document.querySelectorAll("canvas")];
  out.canvasDetail = canvases.map(c => ({ cls: c.className, w: c.width, h: c.height, parentCls: c.parentElement?.className?.slice(0,40) }));
  out.gooBlobCanvases = document.querySelectorAll(".goo-blob-canvas").length;
  out.wrappers = document.querySelectorAll(".goo-blob-wrapper").length;
  out.hitLayers = document.querySelectorAll(".goo-blob-hit").length;
  const wrap = document.querySelector(".goo-blob-wrapper");
  const hit = wrap?.querySelector(".goo-blob-hit");
  const canv = wrap?.querySelector(".goo-blob-canvas");
  const cs = (el) => el ? getComputedStyle(el) : null;
  out.wrapperStyle = wrap ? { pe: cs(wrap).pointerEvents } : null;
  out.hitStyle = hit ? { pe: cs(hit).pointerEvents, clip: cs(hit).clipPath, cursor: cs(hit).cursor } : null;
  out.canvasStyle = canv ? { pe: cs(canv).pointerEvents } : null;
  const presetRegion = document.querySelector(".configurator-presets");
  out.presetRegionText = presetRegion ? presetRegion.innerText.replace(/\s+/g,' ').slice(0,300) : null;
  out.presetButtons = presetRegion ? presetRegion.querySelectorAll("button,[role='button'],[role='radio']").length : 0;
  // SDF hit-test: elementFromPoint at studio bead centre vs box corner
  if (hit) {
    const r = hit.getBoundingClientRect();
    const cx = Math.round(r.left + r.width/2), cy = Math.round(r.top + r.height/2);
    const cornerX = Math.round(r.left + r.width*0.04), cornerY = Math.round(r.top + r.height*0.04);
    const centreEl = document.elementFromPoint(cx, cy);
    const cornerEl = document.elementFromPoint(cornerX, cornerY);
    out.hitTest = {
      beadRect: {left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height)},
      centre: {x: cx, y: cy, el: centreEl?.className?.toString().slice(0,50), isHit: centreEl?.classList?.contains("goo-blob-hit")},
      corner: {x: cornerX, y: cornerY, el: cornerEl?.className?.toString().slice(0,60), isHit: cornerEl?.classList?.contains("goo-blob-hit")},
    };
  }
  return out;
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await b.close();
