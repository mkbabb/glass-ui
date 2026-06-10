import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
// Launch with GPU/swiftshader so a live WebGL background doesn't deadlock headless
const browser=await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await ctx.newPage();
page.on("pageerror",e=>console.log("PAGEERR:",e.message));
await page.goto("http://localhost:5199/dock/overview",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(2500);
console.log("title:", await page.title().catch(e=>"ERR:"+e.message));

// Single-evaluate driver: find the FIRST collapsible horizontal dock, simulate hover-at-edge
// via the dock's own pointer handlers, and sample --dock-morph-t + width across an rAF loop.
const result = await page.evaluate(async ()=>{
  const docks=Array.from(document.querySelectorAll(".glass-dock"));
  const meta=docks.map((d,i)=>{ const r=d.getBoundingClientRect(); return {i,w:Math.round(r.width),vertical:d.className.includes("vertical"),collapsible:!d.className.includes("always-expanded")}; });
  const tgt=meta.find(m=>m.collapsible&&!m.vertical&&m.w>0)||meta.find(m=>m.collapsible)||meta[0];
  if(!tgt) return {err:"no dock", meta};
  const d=docks[tgt.i];
  const readT=()=>{ const v=getComputedStyle(d).getPropertyValue("--dock-morph-t").trim(); return v===""?null:parseFloat(v); };
  const W=()=>d.getBoundingClientRect().width;
  const R=()=>d.getBoundingClientRect();
  const fire=(type,x,y)=>{ const o={clientX:x,clientY:y,bubbles:true,cancelable:true,pointerType:"mouse",pointerId:1};
    d.dispatchEvent(new PointerEvent(type,o));
    if(type==="pointerenter"){ d.dispatchEvent(new MouseEvent("mouseenter",o)); d.dispatchEvent(new MouseEvent("mouseover",o)); }
    if(type==="pointerleave"){ d.dispatchEvent(new MouseEvent("mouseleave",o)); d.dispatchEvent(new MouseEvent("mouseout",o)); }
    if(type==="pointermove") d.dispatchEvent(new MouseEvent("mousemove",o));
  };
  const series=[];
  const t0=performance.now();
  const sample=(cycle,ph)=>{ const r=R(); series.push({cycle,ph,t:+(performance.now()-t0).toFixed(1),w:+r.width.toFixed(2),right:+r.right.toFixed(2),mt:readT()}); };
  for(let cycle=0;cycle<6;cycle++){
    const r=R(); const edgeX=r.right-2, midY=r.top+r.height/2;
    fire("pointerenter",edgeX,midY); fire("pointermove",edgeX,midY);
    for(let f=0;f<18;f++){ await new Promise(rs=>requestAnimationFrame(rs)); sample(cycle,"in"); }
    const r2=R(); const outX=r2.right+50;
    fire("pointermove",outX,midY); fire("pointerleave",outX,midY);
    for(let f=0;f<18;f++){ await new Promise(rs=>requestAnimationFrame(rs)); sample(cycle,"out"); }
  }
  // analyze flicker: per (cycle,ph) block, count width-direction reversals >1px
  const blocks={}; for(const s of series){ const k=s.cycle+"-"+s.ph; (blocks[k]=blocks[k]||[]).push(s.w); }
  let flickerBlocks=0,maxRev=0;
  for(const k in blocks){ const ws=blocks[k]; let rev=0,prev=0;
    for(let i=1;i<ws.length;i++){ const dd=ws[i]-ws[i-1]; if(Math.abs(dd)>1){ const sg=Math.sign(dd); if(prev!==0&&sg!==prev)rev++; prev=sg; } }
    if(rev>=2)flickerBlocks++; maxRev=Math.max(maxRev,rev); }
  const ws=series.map(s=>s.w);
  const mts=series.filter(s=>s.mt!=null).map(s=>s.mt);
  return { tgt, meta, stats:{flickerBlocks,maxRev,nBlocks:Object.keys(blocks).length,
    wmin:+Math.min(...ws).toFixed(1),wmax:+Math.max(...ws).toFixed(1),
    mtMax:mts.length?+Math.max(...mts).toFixed(3):null, mtMin:mts.length?+Math.min(...mts).toFixed(3):null}, series };
});
console.log("RESULT:", JSON.stringify({tgt:result.tgt,stats:result.stats,meta:result.meta},null,2));
await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify(result,null,2));

// Capture 5 rapid frames at the edge
await page.evaluate((idx)=>{ const d=document.querySelectorAll(".glass-dock")[idx]; const r=d.getBoundingClientRect();
  const o={clientX:r.right-2,clientY:r.top+r.height/2,bubbles:true,pointerType:"mouse",pointerId:1};
  d.dispatchEvent(new PointerEvent("pointerenter",o)); d.dispatchEvent(new MouseEvent("mouseenter",o)); }, result.tgt?.i ?? 0);
const tb = await page.evaluate((idx)=>{ const r=document.querySelectorAll(".glass-dock")[idx].getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; }, result.tgt?.i ?? 0);
for(let f=0;f<5;f++){ await page.waitForTimeout(70); await page.screenshot({path:`${GROUND}/F2-r3-3-edge-frame-${f}.png`, clip:{x:Math.max(0,tb.x-20),y:Math.max(0,tb.y-15),width:Math.min(700,tb.w+150),height:tb.h+30}}); }

await browser.close();
console.log("DONE");
