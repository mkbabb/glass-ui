import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on("pageerror", e=>console.log("PAGEERR:",e.message));
await page.goto("http://localhost:5199/dock/overview", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(1800);

const docks = await page.evaluate(()=>{
  return Array.from(document.querySelectorAll(".glass-dock")).map((d,i)=>{
    const r=d.getBoundingClientRect(); const cs=getComputedStyle(d);
    return {i,x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),
      morphT:cs.getPropertyValue("--dock-morph-t").trim()||"(unset)",
      vertical:d.className.includes("vertical"), collapsible:!d.className.includes("always-expanded"),
      cls:d.className.toString().slice(0,60)};
  });
});
console.log("DOCKS:", JSON.stringify(docks,null,2));
const target = docks.find(d=>d.collapsible && !d.vertical && d.w>0) || docks.find(d=>d.collapsible) || docks[0];
console.log("TARGET:", JSON.stringify(target));

// Helper: read morph-t + width from the page using REAL mouse position (Playwright drives it)
async function readDock(idx){
  return await page.evaluate((i)=>{
    const d=document.querySelectorAll(".glass-dock")[i]; const r=d.getBoundingClientRect(); const cs=getComputedStyle(d);
    const t=cs.getPropertyValue("--dock-morph-t").trim();
    return {w:+r.width.toFixed(2), x:+r.x.toFixed(2), right:+r.right.toFixed(2), t:t===""?null:parseFloat(t)};
  }, idx);
}

// Sequence: drive the REAL mouse to the dock's right edge, sample width over time (settle),
// then to just-outside, sample, repeat. Watch for non-monotone width during settle (= flicker).
const series=[];
let d0 = await readDock(target.i);
console.log("INITIAL:", JSON.stringify(d0));
for(let cycle=0; cycle<6; cycle++){
  // hover the CURRENT right edge minus 2px (the edge case)
  let cur = await readDock(target.i);
  const edgeX = Math.round(cur.right - 2), midY = target.y + Math.round(target.h/2);
  await page.mouse.move(edgeX, midY, {steps:1});
  // sample 12 times @ ~25ms = 300ms settle window
  for(let s=0;s<12;s++){ await page.waitForTimeout(25); const d=await readDock(target.i); series.push({cycle,ph:"in",x:edgeX,...d}); }
  // move just OUTSIDE (right edge + 40)
  cur = await readDock(target.i);
  const outX = Math.round(cur.right + 40);
  await page.mouse.move(outX, midY, {steps:1});
  for(let s=0;s<12;s++){ await page.waitForTimeout(25); const d=await readDock(target.i); series.push({cycle,ph:"out",x:outX,...d}); }
}

// Analyze flicker: within each (cycle,ph) block, count monotonicity reversals in width >1px
const blocks={};
for(const s of series){ const k=s.cycle+"-"+s.ph; (blocks[k]=blocks[k]||[]).push(s.w); }
let flickerBlocks=0, maxRev=0;
for(const k in blocks){ const ws=blocks[k]; let rev=0,prev=0;
  for(let i=1;i<ws.length;i++){ const dd=ws[i]-ws[i-1]; if(Math.abs(dd)>1){ const sg=Math.sign(dd); if(prev!==0&&sg!==prev)rev++; prev=sg; } }
  if(rev>=2)flickerBlocks++; maxRev=Math.max(maxRev,rev); }
const ws=series.map(s=>s.w);
const stats={flickerBlocks, maxRev, nBlocks:Object.keys(blocks).length, wmin:Math.min(...ws).toFixed(1), wmax:Math.max(...ws).toFixed(1), span:(Math.max(...ws)-Math.min(...ws)).toFixed(1)};
console.log("MORPH STATS:", JSON.stringify(stats));

// Also probe morph-t oscillation: count distinct t-direction reversals in 'in' blocks
let tRev=0;
for(const k in blocks){ if(!k.endsWith("-in"))continue; }
const tsIn = series.filter(s=>s.ph==="in"&&s.t!=null).map(s=>s.t);
console.log("morph-t sample (in):", JSON.stringify(tsIn.slice(0,24)));

await fs.writeFile(`${GROUND}/F2-r3-3-morph-trace.json`, JSON.stringify({target,stats,series},null,2));

// Now: video-style flicker capture — sit at the exact edge and take 5 rapid frames
const cur=await readDock(target.i);
await page.mouse.move(Math.round(cur.right-2), target.y+Math.round(target.h/2), {steps:1});
for(let f=0;f<5;f++){ await page.waitForTimeout(60); await page.screenshot({ path:`${GROUND}/F2-r3-3-edge-frame-${f}.png`, clip:{x:Math.max(0,target.x-20),y:Math.max(0,target.y-20),width:target.w+120,height:target.h+40} }); }

await browser.close();
console.log("DONE");
