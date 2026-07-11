import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9334");
const ctx = b.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/?capture=/substrates/dot-flow-field&mode=dark", { waitUntil: "load" });
let t0=Date.now(); while(Date.now()-t0<15000){ if(await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break; await page.waitForTimeout(150);}
await page.waitForTimeout(2500);
const r = await page.evaluate(() => {
  const cv = document.querySelector("canvas.dot-flow-field-canvas");
  const av = document.querySelector("canvas.aurora-canvas");
  function chan(c){ if(!c) return "none"; try{if(c.getContext('webgpu'))return 'webgpu';}catch(e){} try{if(c.getContext('webgl2'))return 'webgl2';}catch(e){} try{if(c.getContext('webgl'))return 'webgl';}catch(e){} return 'unknown'; }
  return { gpuPresent: typeof navigator.gpu !== "undefined", dotflow: chan(cv), aurora: chan(av) };
});
console.log(JSON.stringify(r));
await page.close(); await b.close();
