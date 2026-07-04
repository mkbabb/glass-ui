// Deep-probe the counter-scale: sample root scale, .dock-persistent scale, and the
// glyph bbox together per-frame during the collapse morph, to attribute the 1.49
// glyph-aspect distortion in the early (punch) window.
import { chromium } from "playwright-core";
const MODE = process.argv[2] || "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load" });
for (let i = 0; i < 120; i++) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await sleep(100); }
const idx = await page.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")];
    for (let i = 0; i < docks.length; i++) { const d = docks[i]; if (d.querySelector(".dock-persistent") && !d.classList.contains("vertical") && d.getBoundingClientRect().width < 300) return i; }
    return -1;
});
async function meas() { return page.evaluate((i)=>{ const d=[...document.querySelectorAll(".glass-dock")][i]; return {w:d.getBoundingClientRect().width, morphing:d.getAttribute("data-morphing"), punching:d.getAttribute("data-punching")}; }, idx); }
// hover then leave to collapse
const c = await page.evaluate((i)=>{const d=[...document.querySelectorAll(".glass-dock")][i];const r=d.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};}, idx);
await page.mouse.move(c.x,c.y); await sleep(60); await page.mouse.move(30,860);
// wait for morph onset
for (let i=0;i<90;i++){const m=await meas(); if(m.morphing!=null||m.w<200) break; await sleep(60);}
// dense rAF series capturing persistent scale
const series = await page.evaluate(async ({i})=>{
  const d=[...document.querySelectorAll(".glass-dock")][i];
  const p=d.querySelector(".dock-persistent");
  const frames=[]; const start=performance.now();
  return await new Promise(res=>{
    function tick(){
      const now=performance.now();
      const dcs=getComputedStyle(d), pcs=getComputedStyle(p);
      const glyph=p.querySelector("svg"); const gr=glyph.getBoundingClientRect();
      const pr=p.getBoundingClientRect();
      frames.push({
        t:+(now-start).toFixed(0),
        morphing:d.getAttribute("data-morphing"), punching:d.getAttribute("data-punching"),
        rootScale:dcs.scale, rootTransform:dcs.transform,
        persistScale:pcs.scale, persistTransform:pcs.transform,
        sizeScale:dcs.getPropertyValue("--dock-size-scale").trim().slice(0,40),
        stretch:dcs.getPropertyValue("--stretch").trim(),
        punchStretch:dcs.getPropertyValue("--dock-punch-stretch").trim(),
        glyphW:+gr.width.toFixed(2), glyphH:+gr.height.toFixed(2), glyphAsp:+(gr.width/gr.height).toFixed(3),
        persistW:+pr.width.toFixed(2), persistH:+pr.height.toFixed(2),
      });
      if(now-start<400) requestAnimationFrame(tick); else res(frames);
    }
    requestAnimationFrame(tick);
  });
},{i:idx});
console.log(JSON.stringify({idx,series}));
await page.close(); await browser.close();
