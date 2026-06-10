import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser = await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
const page = await ctx.newPage();

// ===== R3-15: the ℱ fourier wordmark centering in its hover/shadow (rounded-full) box =====
await page.goto("http://localhost:5199/foundations/intro", { waitUntil: "commit", timeout: 20000 });
await page.waitForTimeout(700);
const fmark = await page.evaluate(()=>{
  // the home RouterLink with aria-label "glass-ui home"
  const link = document.querySelector('a[aria-label="glass-ui home"]');
  if(!link) return null;
  const span = link.querySelector("span[aria-hidden]");
  const lr = link.getBoundingClientRect();
  // measure glyph INK bbox via Range over the text node
  const range = document.createRange();
  range.selectNodeContents(span);
  const gr = range.getBoundingClientRect();
  const cs = getComputedStyle(link);
  return {
    box:{x:lr.x,y:lr.y,w:lr.width,h:lr.height, cx:lr.x+lr.width/2, cy:lr.y+lr.height/2, br:cs.borderRadius},
    glyph:{x:gr.x,y:gr.y,w:gr.width,h:gr.height, cx:gr.x+gr.width/2, cy:gr.y+gr.height/2},
    offsetX:((gr.x+gr.width/2)-(lr.x+lr.width/2)).toFixed(2),
    offsetY:((gr.y+gr.height/2)-(lr.y+lr.height/2)).toFixed(2),
    pctX:(((gr.x+gr.width/2)-(lr.x+lr.width/2))/lr.width*100).toFixed(1),
    pctY:(((gr.y+gr.height/2)-(lr.y+lr.height/2))/lr.height*100).toFixed(1),
  };
});
console.log("R3-15 FMARK:", JSON.stringify(fmark,null,2));
// hover it to materialize the shadow/hover bg, then zoom
if(fmark){
  await page.mouse.move(fmark.box.cx, fmark.box.cy);
  await page.waitForTimeout(250);
  await page.screenshot({ path:`${GROUND}/F2-r3-15-fmark-hover-zoom.png`, clip:{x:Math.max(0,fmark.box.x-8),y:Math.max(0,fmark.box.y-8),width:fmark.box.w+16,height:fmark.box.h+16} });
}

// ===== R3-7: dock over light backdrop legibility =====
await page.goto("http://localhost:5199/dock/overview", { waitUntil: "commit", timeout: 20000 });
await page.evaluate(()=>document.documentElement.classList.remove("dark"));
await page.waitForTimeout(500);
function relLum(rgb){ const m=rgb.match(/[\d.]+/g).map(Number); const[r,g,b]=m.slice(0,3).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; }

const dockProbe = await page.evaluate(()=>{
  const dock=document.querySelector(".glass-dock"); if(!dock) return {found:false};
  const cs=getComputedStyle(dock);
  const ctrls=Array.from(dock.querySelectorAll("button, .dock-icon-button, .dock-tab-button, [role='button']")).slice(0,3);
  return {found:true,
    vars:{ backdrop:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
      tintStrength:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
      tintStrengthAa:cs.getPropertyValue("--glass-tint-strength-aa").trim()||"(unset)",
      tintSource:cs.getPropertyValue("--glass-tint-source").trim()||"(unset)",
      tintInk:cs.getPropertyValue("--glass-tint-ink").trim()||"(unset)",
      glassLevel:cs.getPropertyValue("--glass-level").trim()||"(unset)" },
    dockBg:cs.backgroundColor, backdropFilter:cs.backdropFilter,
    ctrlColors: ctrls.map(c=>getComputedStyle(c).color),
    supportsContrastColor: CSS.supports("color","contrast-color(white)") };
});
console.log("R3-7 DOCK PROBE (default light):", JSON.stringify(dockProbe,null,2));

// Now: paint a WHITE sheet behind everything (the VERY LIGHT backdrop the user named),
// and measure whether the dock auto-darkens. The bucket is declarative — without a consumer
// setting --glass-backdrop:light, nothing fires. Check whether the demo set it.
const whiteCase = await page.evaluate(()=>{
  let sheet=document.getElementById("__f2w__");
  if(!sheet){ sheet=document.createElement("div"); sheet.id="__f2w__"; sheet.style.cssText="position:fixed;inset:0;background:#fff;z-index:-1;"; document.body.prepend(sheet); }
  const dock=document.querySelector(".glass-dock"); const cs=getComputedStyle(dock);
  // does any ancestor carry --glass-backdrop:light?
  let el=dock, foundBucket=null;
  while(el){ const v=getComputedStyle(el).getPropertyValue("--glass-backdrop").trim(); if(v==="light"){foundBucket=el.className?.toString?.().slice(0,40)||el.tagName;break;} el=el.parentElement; }
  const ctrl=dock.querySelector("button,.dock-icon-button"); const text=ctrl?getComputedStyle(ctrl).color:cs.color;
  return { tintStrengthNow:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    backdropBucket:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
    bucketSetByAncestor: foundBucket||"(none)", textColor:text, dockBg:cs.backgroundColor };
});
console.log("R3-7 WHITE-BACKDROP CASE:", JSON.stringify(whiteCase,null,2));
// contrast of dock control text vs pure white (worst case if glass fully transparent)
const txt=whiteCase.textColor;
console.log("R3-7 text vs white contrast:", (function(){const la=relLum(txt)+0.05,lb=relLum("rgb(255,255,255)")+0.05;return (Math.max(la,lb)/Math.min(la,lb)).toFixed(2);})());
await page.waitForTimeout(200);
await page.screenshot({ path:`${GROUND}/F2-r3-7-dock-over-white.png` });

// Also test the foundations paper-glass page (a known light surface with glass cards)
await page.goto("http://localhost:5199/foundations/paper-glass", { waitUntil:"commit", timeout:20000 }).catch(()=>{});
await page.evaluate(()=>document.documentElement.classList.remove("dark"));
await page.waitForTimeout(500);
await page.screenshot({ path:`${GROUND}/F2-r3-7-paper-glass.png` });
const pgProbe = await page.evaluate(()=>{
  const cards=Array.from(document.querySelectorAll(".glass-card,.glass-floating,.glass-resting,[class*='glass-']")).slice(0,5);
  return cards.map(c=>{ const cs=getComputedStyle(c); return {cls:c.className?.toString?.().slice(0,40), backdrop:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)", tint:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)", color:cs.color}; });
});
console.log("R3-7 PAPER-GLASS CARDS:", JSON.stringify(pgProbe,null,2));

await browser.close();
console.log("DONE");
