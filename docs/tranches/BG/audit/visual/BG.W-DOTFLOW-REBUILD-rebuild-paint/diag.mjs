import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://localhost:9477");
const context = await browser.newContext({ deviceScaleFactor: 2, colorScheme: "dark", viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
const page = await context.newPage();
const logs = [];
page.on("console", m => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", e => logs.push(`[pageerror] ${e.message}`));

await page.goto("http://localhost:5200/?capture=/substrates/dot-flow-field&mode=dark", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), null, { timeout: 30000 });
await page.waitForTimeout(3000);

// scroll into view
await page.evaluate(() => {
  const main = document.querySelector("main.demo-main-scroller");
  const wrap = document.querySelector(".dot-flow-field-wrapper");
  const wr = wrap.getBoundingClientRect(), mr = main.getBoundingClientRect();
  main.scrollTop += (wr.top - mr.top) - 90;
});
await page.waitForTimeout(1500);

// move pointer over the canvas center to wake + pointer
const bb = await page.evaluate(() => {
  const c = document.querySelector(".dot-flow-field-wrapper canvas");
  const r = c.getBoundingClientRect();
  return { x: r.x, y: r.y, w: r.width, h: r.height };
});
await page.mouse.move(bb.x + bb.w/2, bb.y + bb.h/2, { steps: 10 });
await page.waitForTimeout(6000); // long warm-up while pointer inside

// in-page readback: draw the webgl canvas into a 2d canvas and getImageData
const readback = await page.evaluate(() => {
  const c = document.querySelector(".dot-flow-field-wrapper canvas");
  const out = { ctxType: null };
  // Determine context type without clobbering: check via toDataURL length + drawImage readback
  const rb = document.createElement("canvas"); rb.width = 300; rb.height = 140;
  const ctx = rb.getContext("2d", { willReadFrequently: true });
  try { ctx.drawImage(c, 0, 0, 300, 140); } catch(e) { return { err: "drawImage:" + e.message }; }
  const d = ctx.getImageData(0,0,300,140).data;
  let sum=0,n=0,mx=0,nonblack=0;
  for (let i=0;i<d.length;i+=4){ const l=0.2126*d[i]+0.7152*d[i+1]+0.0722*d[i+2]; sum+=l;n++; if(l>mx)mx=l; if(l>12)nonblack++; }
  out.mean = +(sum/n).toFixed(2); out.max = +mx.toFixed(1); out.nonblackPct = +(100*nonblack/n).toFixed(2);
  out.cw = c.width; out.ch = c.height;
  return out;
});

// substrate probe — does the app expose anything? check window for gpu tier hints
const gpuInfo = await page.evaluate(() => {
  const r = { hasGPU: !!navigator.gpu };
  return r;
});

console.log("readback:", JSON.stringify(readback));
console.log("navigator.gpu present:", JSON.stringify(gpuInfo));
console.log("--- console logs (last 40) ---");
console.log(logs.slice(-40).join("\n"));
await context.close();
await browser.close();
