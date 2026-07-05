// BG.W-DOCK-GLYPH-RIGID paint-judge — PASS-side pixel witness. Shoots the collapsed
// REST circle + a mid-morph frame WHILE [data-punching] is active (whatever the glyph
// aspect is), then records the measured glyph aspect at that frame. On the FIXED build
// the punch-active frame paints an UNDISTORTED glyph (aspect ~1.0) over a deforming
// plate — the rigid-content-over-morphing-plate contract, in pixels. (The FAIL-side
// twin capture-punchframe.mjs only shot when glyphAsp>1.3, so it caught nothing here.)
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
async function box(){ return page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:Math.max(0,r.left-120),y:Math.max(0,r.top-60),width:Math.min(600,r.width+240),height:r.height+120};},idx); }
async function state(){ return page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const p=d.querySelector(".dock-persistent");const g=p.querySelector("svg");const gr=g.getBoundingClientRect();const cs=getComputedStyle(d);const csp=getComputedStyle(p);return {morphing:d.getAttribute("data-morphing"),punching:d.getAttribute("data-punching"),pillW:+d.getBoundingClientRect().width.toFixed(1),glyphAsp:+(gr.width/gr.height).toFixed(3),glyphW:+gr.width.toFixed(1),rootScale:cs.scale,childScale:csp.scale,root_punch:cs.getPropertyValue("--dock-punch-stretch").trim(),child_punch:csp.getPropertyValue("--dock-punch-stretch").trim()};},idx); }
async function centre(){ return page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};},idx); }

// ── settled collapsed circle ──
let c=await centre();
await page.mouse.move(c.x,c.y); await sleep(60); await page.mouse.move(30,860);
for(let i=0;i<90;i++){const s=await state(); if(s.pillW<70&&s.morphing==null){break;} await sleep(60);}
await sleep(400);
{ const b=await box(); await page.screenshot({path:`${OUT}/punch-${MODE}-01-collapsed-rest.png`, clip:b}); console.log("collapsed-rest:", JSON.stringify(await state())); }

// ── mid-morph punch-active frame (rigid glyph) ──
c=await centre();
await page.mouse.move(c.x,c.y);
let shot=false;
for(let i=0;i<600;i++){
  const s=await state();
  // shoot at a punch-active OR actively-morphing frame with the plate deformed
  if((s.punching!=null || (s.morphing!=null && Math.abs(parseFloat((s.rootScale||"1 1").split(" ")[0])-1)>0.05))){
    const b=await box();
    await page.screenshot({path:`${OUT}/punch-${MODE}-02-midmorph-rigid-glyph.png`, clip:b});
    console.log("MIDMORPH-PUNCH FRAME SHOT:", JSON.stringify(s));
    shot=true; break;
  }
  await page.mouse.move(c.x+(i%2),c.y);
  await sleep(4);
}
if(!shot) console.log("did not catch a punch/deform frame");
await page.close(); await browser.close();
