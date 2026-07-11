import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
async function probe(route, mode, sel){
  const p = await ctx.newPage(); await p.setViewportSize({width:1440,height:900});
  await p.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`,{waitUntil:"load"});
  const t0=Date.now(); while(Date.now()-t0<15000){ if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break; await p.waitForTimeout(150);} await p.waitForTimeout(300);
  const out = await p.evaluate((sel)=>{
    const els=[...document.querySelectorAll(sel)].slice(0,4);
    return els.map(e=>{const cs=getComputedStyle(e); return {txt:cs.color, bg:cs.backgroundColor, bgImg:cs.backgroundImage!=="none", sample:(e.textContent||"").trim().slice(0,10)};});
  }, sel);
  console.log(`  ${mode.padEnd(5)} ${route}:`, JSON.stringify(out));
  await p.close();
}
console.log("=== avatar fallback chips (span with bg color) ===");
await probe("/data/avatar","light",".text-white");
await probe("/data/avatar","dark",".text-white");
console.log("=== badge loud pills (.badge-atom) ===");
await probe("/display/badge","light",".badge-atom");
await probe("/display/badge","dark",".badge-atom");
await b.close();
