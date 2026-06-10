import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 3 });
const page = await ctx.newPage();
await page.goto("http://localhost:5199/substrates/blob", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// capture the whole top swatch row at 3x DSF
const row = await page.evaluate(()=>{
  const sw = Array.from(document.querySelectorAll(".watercolor-swatch"));
  if(!sw.length) return null;
  const rs = sw.map(s=>s.getBoundingClientRect());
  const x = Math.min(...rs.map(r=>r.x)), y=Math.min(...rs.map(r=>r.y));
  const x2=Math.max(...rs.map(r=>r.x+r.width)), y2=Math.max(...rs.map(r=>r.y+r.height));
  // inspect the filter element resolution
  const filt = document.querySelector("filter[id*='watercolor-filter']");
  const turb = filt?.querySelector("feTurbulence");
  const disp = filt?.querySelector("feDisplacementMap");
  return {count:sw.length, x,y,w:x2-x,h:y2-y,
    filterId: filt?.id, filterRes: filt?.getAttribute("filterRes"),
    turbBaseFreq: turb?.getAttribute("baseFrequency"), turbOctaves: turb?.getAttribute("numOctaves"),
    dispScale: disp?.getAttribute("scale"),
    swatchFilter: getComputedStyle(sw[0]).filter };
});
console.log("SWATCH ROW:", JSON.stringify(row,null,2));
if(row){
  await page.screenshot({ path:`${GROUND}/F2-r3-9-swatch-row-3x.png`, clip:{x:Math.max(0,row.x),y:Math.max(0,row.y),width:row.w,height:Math.min(400,row.h)} });
  // tight zoom on the red swatch top-left edge (banding shows on curved color edges)
  const red = await page.evaluate(()=>{ const s=document.querySelectorAll(".watercolor-swatch")[1]; const r=s.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
  if(red) await page.screenshot({ path:`${GROUND}/F2-r3-9-red-swatch-edge-3x.png`, clip:{x:Math.max(0,red.x-2),y:Math.max(0,red.y+red.h*0.15),width:Math.min(90,red.w*0.4),height:90} });
}
await browser.close();
console.log("DONE");
