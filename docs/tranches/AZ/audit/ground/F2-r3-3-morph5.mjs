import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser=await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await ctx.newPage();
page.setDefaultTimeout(8000);
page.on("pageerror",e=>console.log("PAGEERR:",e.message));
await page.goto("http://localhost:5199/dock/overview",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(2500);
console.log("title:", await page.title());

// Use the data-testid="dock-capture" collapsible dock (the morph-reliable one, ~490px expanded / ~collapsed).
// Locate it; scroll into view; get its box.
const box = await page.evaluate(()=>{
  const d=document.querySelector('[data-testid="dock-capture"]') || Array.from(document.querySelectorAll(".glass-dock")).find(x=>!x.className.includes("always-expanded")&&!x.className.includes("vertical"));
  if(!d) return null; d.scrollIntoView({block:"center"}); const r=d.getBoundingClientRect();
  // mark it for fast lookup
  d.setAttribute("data-f2","1");
  return {x:r.x,y:r.y,w:r.width,h:r.height,collapsed:!d.className.includes("always-expanded")};
});
console.log("BOX:", JSON.stringify(box));
if(!box){ console.log("NO DOCK"); await browser.close(); process.exit(0); }

const read=()=>page.evaluate(()=>{ const d=document.querySelector('[data-f2="1"]'); const r=d.getBoundingClientRect();
  const v=getComputedStyle(d).getPropertyValue("--dock-morph-t").trim(); return {w:+r.width.toFixed(1),right:+r.right.toFixed(1),mt:v===""?null:parseFloat(v)}; });

// 1) Move mouse AWAY and wait for collapse (collapseDelay 600ms on this dock)
await page.mouse.move(box.x-200, box.y-200);
await page.waitForTimeout(1200);
const collapsed = await read();
console.log("COLLAPSED STATE:", JSON.stringify(collapsed));

// 2) Edge-flicker probe: real mouse to the COLLAPSED dock's right edge, then sample width as it morphs.
// Re-read collapsed box.
const cb = await page.evaluate(()=>{ const d=document.querySelector('[data-f2="1"]'); const r=d.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right}; });
console.log("COLLAPSED BOX:", JSON.stringify(cb));

const series=[];
const t0=Date.now();
// Hover at the right edge (the edge case). Then poll width via evaluate every ~30ms for 1.2s.
await page.mouse.move(Math.round(cb.right-3), Math.round(cb.y+cb.h/2), {steps:2});
for(let i=0;i<40;i++){ const s=await read(); series.push({ph:"hover-edge",t:Date.now()-t0,...s}); await page.waitForTimeout(25); }
// Now move OUT just past the (now-expanded) edge and back IN repeatedly at the boundary — the classic thrash
for(let cyc=0;cyc<4;cyc++){
  const cur=await read();
  await page.mouse.move(Math.round(cb.x+cur.w+30), Math.round(cb.y+cb.h/2), {steps:1}); // just outside
  for(let i=0;i<10;i++){ const s=await read(); series.push({ph:"out"+cyc,t:Date.now()-t0,...s}); await page.waitForTimeout(25); }
  const cur2=await read();
  await page.mouse.move(Math.round(cb.x+cur2.w-3), Math.round(cb.y+cb.h/2), {steps:1}); // back at edge
  for(let i=0;i<10;i++){ const s=await read(); series.push({ph:"in"+cyc,t:Date.now()-t0,...s}); await page.waitForTimeout(25); }
}

// analyze: width oscillation within each phase block + mt overshoot
const blocks={}; for(const s of series){ (blocks[s.ph]=blocks[s.ph]||[]).push(s.w); }
let flickerBlocks=0,maxRev=0;
for(const k in blocks){ const ws=blocks[k]; let rev=0,prev=0;
  for(let i=1;i<ws.length;i++){ const dd=ws[i]-ws[i-1]; if(Math.abs(dd)>2){ const sg=Math.sign(dd); if(prev!==0&&sg!==prev)rev++; prev=sg; } }
  if(rev>=2)flickerBlocks++; maxRev=Math.max(maxRev,rev); }
const ws=series.map(s=>s.w); const mts=series.filter(s=>s.mt!=null).map(s=>s.mt);
const stats={ flickerBlocks,maxRev,nBlocks:Object.keys(blocks).length, wmin:+Math.min(...ws).toFixed(1),wmax:+Math.max(...ws).toFixed(1),
  span:+(Math.max(...ws)-Math.min(...ws)).toFixed(1), mtMax:mts.length?+Math.max(...mts).toFixed(3):null, didMorph:(Math.max(...ws)-Math.min(...ws))>10, nSamples:series.length };
console.log("STATS:", JSON.stringify(stats));
await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify({box:cb,stats,series},null,2));

// element-screenshot at the edge (faster than full-page; live page full-page times out)
try{
  const cur=await read();
  await page.mouse.move(Math.round(cb.x+cur.w-3), Math.round(cb.y+cb.h/2),{steps:1});
  await page.waitForTimeout(120);
  const el=await page.$('[data-f2="1"]');
  if(el) await el.screenshot({path:`${GROUND}/F2-r3-3-edge-hover.png`, timeout:6000});
}catch(e){ console.log("SHOT skip:",e.message.slice(0,60)); }
await browser.close();
console.log("DONE");
