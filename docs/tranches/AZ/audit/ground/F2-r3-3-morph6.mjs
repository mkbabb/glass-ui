import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser=await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await ctx.newPage();
page.setDefaultTimeout(8000);
await page.goto("http://localhost:5199/dock/overview",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(2500);

// Target the FIRST collapsible non-vertical dock (i:1). Mark + scroll.
const box=await page.evaluate(()=>{
  const ds=Array.from(document.querySelectorAll(".glass-dock"));
  const d=ds.find(x=>!x.className.includes("always-expanded")&&!x.className.includes("vertical"));
  if(!d) return null; d.setAttribute("data-f2","1"); d.scrollIntoView({block:"center"});
  const r=d.getBoundingClientRect();
  // is there a startCollapsed? read state attrs
  return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,held:d.getAttribute("data-held"),density:d.getAttribute("data-density")};
});
console.log("BOX:",JSON.stringify(box));
const read=()=>page.evaluate(()=>{ const d=document.querySelector('[data-f2="1"]'); const r=d.getBoundingClientRect(); return +r.width.toFixed(1); });

// FULL hover-in (move over center), wait, then move FAR away, watch collapse over 3s
await page.mouse.move(Math.round(box.x+box.w/2), Math.round(box.y+box.h/2),{steps:3});
await page.waitForTimeout(500);
const wHover=await read();
await page.mouse.move(50,50,{steps:3});
const collapseTrace=[];
const t0=Date.now();
for(let i=0;i<120;i++){ collapseTrace.push({t:Date.now()-t0,w:await read()}); await page.waitForTimeout(25); }
const wMin=Math.min(...collapseTrace.map(x=>x.w)), wMax=Math.max(...collapseTrace.map(x=>x.w));
console.log("hover w:",wHover,"after-leave 3s: wMin=",wMin,"wMax=",wMax,"collapsed?",wMin<wHover-20);

// If it collapsed, do the EDGE THRASH: cursor exactly at collapsed right edge.
let edgeStats=null;
if(wMin < wHover-20){
  // re-read collapsed box
  const cb=await page.evaluate(()=>{ const d=document.querySelector('[data-f2="1"]'); const r=d.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right}; });
  // sit at the exact collapsed right edge - this is THE edge case
  const series=[]; const tt=Date.now();
  await page.mouse.move(Math.round(cb.right), Math.round(cb.y+cb.h/2),{steps:1});
  for(let i=0;i<80;i++){ series.push({t:Date.now()-tt,w:await read()}); await page.waitForTimeout(20); }
  // count reversals
  let rev=0,prev=0; const ws=series.map(s=>s.w);
  for(let i=1;i<ws.length;i++){const dd=ws[i]-ws[i-1]; if(Math.abs(dd)>2){const sg=Math.sign(dd); if(prev!==0&&sg!==prev)rev++; prev=sg;}}
  edgeStats={reversals:rev, wmin:Math.min(...ws),wmax:Math.max(...ws), n:ws.length, series:series.slice(0,40)};
  console.log("EDGE-THRASH:",JSON.stringify({reversals:rev,wmin:Math.min(...ws),wmax:Math.max(...ws),flicker:rev>=3}));
}
await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify({box,wHover,collapseTrace,edgeStats},null,2));
await browser.close();
console.log("DONE");
