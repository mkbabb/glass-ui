// Capture a PNG at the punch-window frame (glyph stretched) + the settled collapsed
// circle, cropped to the collapsible dock, on Chrome ANGLE-Metal. Painted evidence
// of the +48.8% mid-morph glyph distortion the frame-series measured.
import { chromium } from "playwright-core";
const MODE = process.argv[2] || "light";
const OUT = "docs/tranches/BG/audit/visual/glyph-rigid";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load" });
for (let i = 0; i < 120; i++) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await sleep(100); }
const idx = await page.evaluate(() => { const docks=[...document.querySelectorAll(".glass-dock")]; for(let i=0;i<docks.length;i++){const d=docks[i];if(d.querySelector(".dock-persistent")&&!d.classList.contains("vertical")&&d.getBoundingClientRect().width<300)return i;} return -1; });
async function box(){ return page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:Math.max(0,r.left-120),y:Math.max(0,r.top-60),width:Math.min(600,r.width+240),height:r.height+120,pw:r.width,morphing:d.getAttribute("data-morphing"),punching:d.getAttribute("data-punching")};},idx); }
async function state(){ return page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const p=d.querySelector(".dock-persistent");const g=p.querySelector("svg");const gr=g.getBoundingClientRect();return {morphing:d.getAttribute("data-morphing"),punching:d.getAttribute("data-punching"),pillW:+d.getBoundingClientRect().width.toFixed(1),glyphAsp:+(gr.width/gr.height).toFixed(3),glyphW:+gr.width.toFixed(1)};},idx); }

// settled collapsed circle first: collapse and let settle
let c=await page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};},idx);
await page.mouse.move(c.x,c.y); await sleep(60); await page.mouse.move(30,860);
for(let i=0;i<90;i++){const s=await state(); if(s.pillW<70&&s.morphing==null){break;} await sleep(60);}
await sleep(400);
{ const b=await box(); await page.screenshot({path:`${OUT}/punch-${MODE}-01-collapsed-rest.png`, clip:{x:b.x,y:b.y,width:b.width,height:b.height}}); console.log("collapsed-rest:", JSON.stringify(await state())); }

// now expand and freeze at a PUNCH frame. Poll rapidly for punching!=null and shoot.
c=await page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};},idx);
await page.mouse.move(c.x,c.y);
let shot=false;
for(let i=0;i<400;i++){
  const s=await state();
  if(s.punching!=null && s.glyphAsp>1.3){
    const b=await box();
    await page.screenshot({path:`${OUT}/punch-${MODE}-02-midmorph-glyph-stretched.png`, clip:{x:b.x,y:b.y,width:b.width,height:b.height}});
    console.log("PUNCH FRAME SHOT:", JSON.stringify(s));
    shot=true; break;
  }
  await page.mouse.move(c.x+(i%2),c.y);
}
if(!shot) console.log("did not catch punch frame");
await page.close(); await browser.close();
