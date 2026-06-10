import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.on("pageerror", e=>console.log("PAGEERR:",e.message));
await page.goto("http://localhost:5199/dock/overview", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// Enumerate all .glass-dock instances and their collapse state
const docks = await page.evaluate(()=>{
  const ds = Array.from(document.querySelectorAll(".glass-dock"));
  return ds.map((d,i)=>{
    const r=d.getBoundingClientRect();
    const cs=getComputedStyle(d);
    return {i, x:r.x.toFixed(0),y:r.y.toFixed(0),w:r.width.toFixed(0),h:r.height.toFixed(0),
      morphT: cs.getPropertyValue("--dock-morph-t").trim()||"(unset)",
      held: d.getAttribute("data-held"), density: d.getAttribute("data-density"),
      vertical: d.className.includes("vertical"),
      collapsible: !d.className.includes("always-expanded")};
  });
});
console.log("DOCKS:", JSON.stringify(docks,null,2));

// Pick a collapsible horizontal dock (the morph subject). Prefer one with morph-t defined.
const target = docks.find(d=>d.collapsible && !d.vertical && +d.w>0) || docks[0];
if(!target){ console.log("NO DOCK"); await browser.close(); process.exit(0); }
console.log("TARGET:", JSON.stringify(target));

// Instrument morph-t + width across repeated edge-hover in/out cycles
const series = await page.evaluate(async (idx)=>{
  const d = document.querySelectorAll(".glass-dock")[idx];
  const r0 = d.getBoundingClientRect();
  const readT=()=>{ const v=getComputedStyle(d).getPropertyValue("--dock-morph-t").trim(); return v===""?null:parseFloat(v); };
  const W=()=>d.getBoundingClientRect().width;
  const out=[];
  // hover targets: the RIGHT EDGE (the edge case), and just outside it
  const edgeX = r0.right - 1, midY = r0.top + r0.height/2, outX = r0.right + 60;
  const evt=(type,x,y)=>{ const o={clientX:x,clientY:y,bubbles:true,cancelable:true,pointerType:"mouse",pointerId:1};
    d.dispatchEvent(new PointerEvent(type,o));
    // also fire mouse events some handlers use
    if(type==="pointerenter") d.dispatchEvent(new MouseEvent("mouseenter",o));
    if(type==="pointerleave") d.dispatchEvent(new MouseEvent("mouseleave",o));
    if(type==="pointermove") d.dispatchEvent(new MouseEvent("mousemove",o));
  };
  for(let c=0;c<8;c++){
    evt("pointerenter",edgeX,midY); evt("pointermove",edgeX,midY);
    for(let f=0;f<10;f++){ await new Promise(r=>requestAnimationFrame(r)); out.push({c,ph:"in",t:readT(),w:+W().toFixed(2)}); }
    evt("pointermove",outX,midY); evt("pointerleave",outX,midY);
    for(let f=0;f<10;f++){ await new Promise(r=>requestAnimationFrame(r)); out.push({c,ph:"out",t:readT(),w:+W().toFixed(2)}); }
  }
  return out;
}, target.i);

// Analyze: within a single 'in' block, does width oscillate non-monotonically (flicker)?
function blockStats(samples){
  const blocks={};
  for(const s of samples){ const k=s.c+"-"+s.ph; (blocks[k]=blocks[k]||[]).push(s.w); }
  let maxInBlockReversals=0, flickerBlocks=0;
  for(const k in blocks){
    const ws=blocks[k]; let rev=0,prev=0;
    for(let i=1;i<ws.length;i++){ const dd=ws[i]-ws[i-1]; if(Math.abs(dd)>1){ const sg=Math.sign(dd); if(prev!==0&&sg!==prev) rev++; prev=sg; } }
    if(rev>=2) flickerBlocks++;
    maxInBlockReversals=Math.max(maxInBlockReversals,rev);
  }
  return {maxInBlockReversals, flickerBlocks, nBlocks:Object.keys(blocks).length};
}
const stats = blockStats(series);
const widths=series.map(s=>s.w).filter(w=>w>0);
console.log("MORPH STATS:", JSON.stringify({...stats, wmin:Math.min(...widths).toFixed(1), wmax:Math.max(...widths).toFixed(1)}));
await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify({target,stats,series},null,2));

// static capture hovered at edge
await page.mouse.move(+target.x + +target.w - 1, +target.y + +target.h/2);
await page.waitForTimeout(150);
await page.screenshot({ path:`${GROUND}/F2-r3-3-edge-hover.png` });
await browser.close();
console.log("DONE");
