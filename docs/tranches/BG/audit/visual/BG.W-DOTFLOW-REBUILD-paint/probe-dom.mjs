import { chromium } from "playwright";
const browser = await chromium.connectOverCDP("http://localhost:9334");
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/?capture=/substrates/dot-flow-field&mode=dark", { waitUntil: "load" });
let t0=Date.now(); while(Date.now()-t0<15000){ if(await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break; await page.waitForTimeout(150);}
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const canvases = [...document.querySelectorAll("canvas")].map((c,i)=>{
    const r=c.getBoundingClientRect();
    return {i, cls:c.className||"(none)", parentCls:c.parentElement?.className||"", w:c.width, h:c.height, rect:{x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}};
  });
  const wrapper = document.querySelector(".dot-flow-field-wrapper");
  const scroller = document.querySelector("main.demo-main-scroller") || document.querySelector("main");
  return { nCanvas: canvases.length, canvases, hasWrapper: !!wrapper, wrapperCls: wrapper?.className||null, scrollerCls: scroller?.className||null, scrollTop: scroller?.scrollTop, docH: document.documentElement.scrollHeight };
});
console.log(JSON.stringify(info,null,2));
await page.close(); await browser.close();
