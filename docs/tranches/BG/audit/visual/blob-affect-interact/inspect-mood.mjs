import { chromium } from "playwright";
const browser=await chromium.connectOverCDP("http://localhost:9333");
const ctx=browser.contexts()[0];
const page=await ctx.newPage();
await page.setViewportSize({width:1440,height:900});
await page.goto("http://localhost:5200/?capture=/substrates/blob&mode=light",{waitUntil:"load"});
const t0=Date.now();while(Date.now()-t0<15000){if(await page.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))break;await page.waitForTimeout(150);}
const info=await page.evaluate(()=>{
  const trig=Array.from(document.querySelectorAll('[role="combobox"],button[aria-haspopup],[data-slot="select-trigger"],.control-surface,.dock-select-trigger'));
  return trig.map(t=>({tag:t.tagName,role:t.getAttribute("role"),aria:t.getAttribute("aria-label"),haspopup:t.getAttribute("aria-haspopup"),cls:((t.className.baseVal!==undefined?t.className.baseVal:t.className)||"").slice(0,60),text:t.textContent.trim().slice(0,30)}));
});
console.log("TRIGGERS:",JSON.stringify(info,null,1));
const moodWords=["idle","happy","curious","sleepy","excited"];
const found=await page.evaluate((mw)=>{
  const trig=Array.from(document.querySelectorAll('[role="combobox"],button[aria-haspopup],[data-slot="select-trigger"],button'));
  for(const t of trig){ const tx=t.textContent.trim().toLowerCase(); if(mw.includes(tx)){ const r=t.getBoundingClientRect(); return {text:tx,x:r.x+r.width/2,y:r.y+r.height/2,tag:t.tagName,role:t.getAttribute("role")}; } }
  return null;
},moodWords);
console.log("MOOD TRIGGER:",JSON.stringify(found));
if(found){
  await page.mouse.click(found.x,found.y);
  await page.waitForTimeout(500);
  const opts=await page.evaluate(()=>Array.from(document.querySelectorAll('[role="option"]')).map(o=>({t:o.textContent.trim(),y:Math.round(o.getBoundingClientRect().y),x:Math.round(o.getBoundingClientRect().x+o.getBoundingClientRect().width/2)})));
  console.log("OPTIONS AFTER CLICK:",JSON.stringify(opts));
}
await page.close();await browser.close();
