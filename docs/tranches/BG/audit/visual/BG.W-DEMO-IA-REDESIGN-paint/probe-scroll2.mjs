import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/display/atoms", { waitUntil: "load" });
await page.waitForSelector("main", { timeout: 15000 });
await page.waitForTimeout(1800);
// Method A: scrollTo instant
let a = await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.scrollTo({top:200,behavior:'instant'}); return m.scrollTop; });
// Method B: dispatch after removing smooth
let bb = await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.style.scrollBehavior='auto'; m.scrollTop=200; return m.scrollTop; });
// Method C: real wheel via CDP at center
await page.mouse.move(720, 450);
await page.mouse.wheel(0, 200);
await page.waitForTimeout(200);
let c = await page.evaluate(()=>document.querySelector("main.demo-main-scroller").scrollTop);
// check if main is actually the scroll port or if body/window scrolls
await page.evaluate(()=>window.scrollTo(0,200));
let w = await page.evaluate(()=>({win: window.scrollY, se: document.scrollingElement.scrollTop, main: document.querySelector("main.demo-main-scroller").scrollTop}));
// Is there a transform/contain on an ancestor making main not the scroll root? check main parent chain overflow
let chain = await page.evaluate(()=>{
  let el=document.querySelector("main.demo-main-scroller"), out=[];
  while(el){ const s=getComputedStyle(el); out.push({tag:el.tagName,cls:(el.className||"").toString().slice(0,30),oflow:`${s.overflowX}/${s.overflowY}`,pos:s.position,h:el.clientHeight,sh:el.scrollHeight}); el=el.parentElement; }
  return out;
});
console.log("A scrollTo instant:", a);
console.log("B style auto + scrollTop:", bb);
console.log("C wheel CDP:", c);
console.log("W window/se/main:", JSON.stringify(w));
console.log("CHAIN:", JSON.stringify(chain,null,1));
await page.close();
await b.close();
