import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser=await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:4});
const page=await ctx.newPage();
page.setDefaultTimeout(10000);
const park=()=>page.evaluate(()=>{ try{Object.defineProperty(document,"hidden",{value:true,configurable:true});}catch(e){} document.dispatchEvent(new Event("visibilitychange")); });

// ===== R3-15: ℱ wordmark optical centering — PARK then high-DSF zoom on the glyph box =====
await page.goto("http://localhost:5199/foundations/intro",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(1500);
await park();
await page.waitForTimeout(400);
const fbox=await page.evaluate(()=>{ const a=document.querySelector('a[aria-label="glass-ui home"]'); if(!a)return null;
  const r=a.getBoundingClientRect(); return {x:r.x,y:r.y,w:r.width,h:r.height}; });
console.log("FBOX:",JSON.stringify(fbox));
if(fbox){
  // hover to show the bg/shadow, then zoom the box at DSF=4
  await page.mouse.move(Math.round(fbox.x+fbox.w/2),Math.round(fbox.y+fbox.h/2));
  await page.waitForTimeout(200);
  await page.screenshot({path:`${GROUND}/F2-r3-15-fmark-hover-zoom.png`, clip:{x:Math.max(0,fbox.x-6),y:Math.max(0,fbox.y-6),width:fbox.w+12,height:fbox.h+12}, timeout:8000}).catch(e=>console.log("shot1 fail",e.message.slice(0,40)));
  // also measure the painted-ink centroid via canvas pixel sampling of the screenshot region
  const ink=await page.evaluate(({x,y,w,h})=>{
    // rasterize the glyph link area is hard in-page; instead measure ink via the span's
    // computed metrics: italic lean offset = (advance - ink) asymmetry is not in DOM.
    // Report the link padding/justify so we know the box-centering basis.
    const a=document.querySelector('a[aria-label="glass-ui home"]'); const cs=getComputedStyle(a);
    const span=a.querySelector('span'); const scs=getComputedStyle(span);
    return {justify:cs.justifyContent,align:cs.alignItems,display:cs.display,
      fontStyle:scs.fontStyle, fontSize:scs.fontSize, fvs:scs.fontVariationSettings, lineHeight:scs.lineHeight,
      textAlign:scs.textAlign, paddingL:cs.paddingLeft, paddingR:cs.paddingRight}; },fbox);
  console.log("FMARK STYLE:",JSON.stringify(ink));
}

// ===== R3-7: dock-over-light — use a route that loads cleanly. Park the renderer first. =====
// /dock/layers loads fine (verified). It shows a horizontal collapsible dock at the BOTTOM
// over the light page body. Probe its glass tint vars + control text contrast over white.
await page.goto("http://localhost:5199/dock/layers",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(1200);
await page.evaluate(()=>document.documentElement.classList.remove("dark"));
await park();
await page.waitForTimeout(300);
const probe=await page.evaluate(()=>{
  function lum(rgb){const m=rgb.match(/[\d.]+/g);if(!m)return 0;const[r,g,b]=m.slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*b;}
  function ratio(a,b){const la=lum(a)+0.05,lb=lum(b)+0.05;return Math.max(la,lb)/Math.min(la,lb);}
  // pick the demo bottom dock (the .glass-dock with the nav controls)
  const docks=Array.from(document.querySelectorAll(".glass-dock"));
  const out=docks.map(d=>{ const cs=getComputedStyle(d);
    const ctrl=d.querySelector("button,.dock-icon-button,.dock-tab-button,[role='button'],a"); const tc=ctrl?getComputedStyle(ctrl).color:null;
    // ancestor with --glass-backdrop:light?
    let el=d,bucket="(none)"; while(el){const v=getComputedStyle(el).getPropertyValue("--glass-backdrop").trim(); if(v&&v!=="dark"){bucket=v+"@"+(el.className?.toString?.().slice(0,30)||el.tagName);break;} el=el.parentElement;}
    return { w:Math.round(d.getBoundingClientRect().width),
      glassBackdrop:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
      tintStrength:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
      tintStrengthAa:cs.getPropertyValue("--glass-tint-strength-aa").trim()||"(unset)",
      glassLevel:cs.getPropertyValue("--glass-level").trim()||"(unset)",
      dockBg:cs.backgroundColor, backdropFilter:cs.backdropFilter,
      ctrlColor:tc, ancestorBucket:bucket,
      ctrlVsWhite: tc?+ratio(tc,"rgb(255,255,255)").toFixed(2):null,
      ctrlVsDockBg: tc?+ratio(tc,cs.backgroundColor).toFixed(2):null };
  });
  return { supportsContrastColor: CSS.supports("color","contrast-color(white)"),
    rootBackdrop: getComputedStyle(document.documentElement).getPropertyValue("--glass-backdrop").trim()||"(unset)",
    rootTintStrength: getComputedStyle(document.documentElement).getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    docks: out };
});
console.log("R3-7 DOCK-LAYERS LIGHT PROBE:",JSON.stringify(probe,null,2));

// paint white behind + re-probe the tint (does the bucket auto-fire? it won't — declarative)
const white=await page.evaluate(()=>{
  function lum(rgb){const m=rgb.match(/[\d.]+/g);if(!m)return 0;const[r,g,b]=m.slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*b;}
  let s=document.getElementById("__f2w__"); if(!s){s=document.createElement("div");s.id="__f2w__";s.style.cssText="position:fixed;inset:0;background:#fff;z-index:-5;";document.body.prepend(s);}
  const d=document.querySelector(".glass-dock"); const cs=getComputedStyle(d);
  return { tintStrengthAfterWhite:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    backdropAfterWhite:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
    note:"declarative bucket — white-behind does NOT auto-set --glass-backdrop:light" };
});
console.log("R3-7 WHITE-BEHIND:",JSON.stringify(white));
await page.screenshot({path:`${GROUND}/F2-r3-7-dock-layers-light.png`, fullPage:false, timeout:8000}).catch(e=>console.log("shot2 fail",e.message.slice(0,40)));
await browser.close();
console.log("DONE");
