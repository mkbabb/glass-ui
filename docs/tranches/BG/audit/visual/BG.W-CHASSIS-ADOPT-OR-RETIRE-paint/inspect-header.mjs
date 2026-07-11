import { chromium } from "playwright";
const browser = await chromium.connectOverCDP(process.env.CDP_URL);
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
await page.goto(`${process.env.ORIGIN}/?capture=${encodeURIComponent(process.env.ROUTE)}&mode=light`, { waitUntil:"load" });
let ready=false; const t0=Date.now();
while(Date.now()-t0<15000){ ready=await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")); if(ready)break; await page.waitForTimeout(150);}
const info = await page.evaluate(()=>{
  const scope=document.querySelector("main")||document.body;
  return [...scope.querySelectorAll("header")].map(h=>({
    cls: h.className,
    tag: h.tagName,
    displayScaleTitle: [...h.querySelectorAll("h1,[class*='display']")].map(e=>(e.textContent||"").trim()).filter(Boolean),
    text: (h.textContent||"").replace(/\s+/g," ").trim().slice(0,120),
    childTags: [...h.children].map(c=>c.tagName+"."+(c.className||"").split(" ")[0])
  }));
});
console.log(JSON.stringify(info, null, 2));
await page.close(); await browser.close().catch(()=>{});
