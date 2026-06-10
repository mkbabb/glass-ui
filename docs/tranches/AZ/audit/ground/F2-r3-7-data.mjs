import { chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import fs from "node:fs/promises";
const GROUND="/Users/mkbabb/Programming/glass-ui/docs/tranches/AZ/audit/ground";
const browser=await chromium.launch({ args:[
  "--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader",
  "--ignore-gpu-blocklist","--enable-webgl","--disable-gpu-sandbox" ] });
const ctx=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const page=await ctx.newPage();
page.setDefaultTimeout(9000);
await page.goto("http://localhost:5199/dock/layers",{waitUntil:"commit",timeout:20000});
await page.waitForTimeout(1500);
await page.evaluate(()=>document.documentElement.classList.remove("dark"));
await page.waitForTimeout(300);

const probe=await page.evaluate(()=>{
  function lum(rgb){const m=rgb.match(/[\d.]+/g);if(!m)return 0;const[r,g,b]=m.slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*b;}
  function ratio(a,b){const la=lum(a)+0.05,lb=lum(b)+0.05;return Math.max(la,lb)/Math.min(la,lb);}
  const docks=Array.from(document.querySelectorAll(".glass-dock"));
  const out=docks.map(d=>{ const cs=getComputedStyle(d);
    const ctrl=d.querySelector("button,.dock-icon-button,.dock-tab-button,[role='button'],a"); const tc=ctrl?getComputedStyle(ctrl).color:null;
    let el=d,bucket="(none)"; while(el){const v=getComputedStyle(el).getPropertyValue("--glass-backdrop").trim(); if(v&&v!=="dark"){bucket=v;break;} el=el.parentElement;}
    return { w:Math.round(d.getBoundingClientRect().width),
      glassBackdrop:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
      tintStrength:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
      tintStrengthAa:cs.getPropertyValue("--glass-tint-strength-aa").trim()||"(unset)",
      glassLevel:cs.getPropertyValue("--glass-level").trim()||"(unset)",
      dockBg:cs.backgroundColor, backdropFilter:cs.backdropFilter, ctrlColor:tc, ancestorBucket:bucket,
      ctrlVsWhite: tc?+ratio(tc,"rgb(255,255,255)").toFixed(2):null,
      ctrlVsDockBg: tc?+ratio(tc,cs.backgroundColor).toFixed(2):null };
  });
  return { supportsContrastColor: CSS.supports("color","contrast-color(white)"),
    rootBackdrop: getComputedStyle(document.documentElement).getPropertyValue("--glass-backdrop").trim()||"(unset)",
    rootTintStrength: getComputedStyle(document.documentElement).getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    rootTintAa: getComputedStyle(document.documentElement).getPropertyValue("--glass-tint-strength-aa").trim()||"(unset)",
    docks: out };
});
console.log("R3-7 PROBE:",JSON.stringify(probe,null,2));

// white-behind: does the declarative bucket auto-fire? (it won't)
const white=await page.evaluate(()=>{
  let s=document.getElementById("__f2w__"); if(!s){s=document.createElement("div");s.id="__f2w__";s.style.cssText="position:fixed;inset:0;background:#fff;z-index:-5;";document.body.prepend(s);}
  const d=document.querySelector(".glass-dock"); const cs=getComputedStyle(d);
  return { tintStrengthAfterWhite:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    backdropAfterWhite:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)" };
});
console.log("R3-7 WHITE-BEHIND (no consumer bucket set):",JSON.stringify(white));

// Now FORCE the bucket as a consumer WOULD (set --glass-backdrop:light on body) and re-probe
const forced=await page.evaluate(()=>{
  function lum(rgb){const m=rgb.match(/[\d.]+/g);if(!m)return 0;const[r,g,b]=m.slice(0,3).map(Number).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*r+0.7152*g+0.0722*b;}
  function ratio(a,b){const la=lum(a)+0.05,lb=lum(b)+0.05;return Math.max(la,lb)/Math.min(la,lb);}
  document.body.style.setProperty("--glass-backdrop","light");
  const d=document.querySelector(".glass-dock"); const cs=getComputedStyle(d);
  const ctrl=d.querySelector("button,.dock-icon-button,[role='button'],a"); const tc=ctrl?getComputedStyle(ctrl).color:null;
  return { tintStrengthForced:cs.getPropertyValue("--glass-tint-strength").trim()||"(unset)",
    backdropForced:cs.getPropertyValue("--glass-backdrop").trim()||"(unset)",
    dockBgForced:cs.backgroundColor, ctrlColorForced:tc,
    ctrlVsWhiteForced: tc?+ratio(tc,"rgb(255,255,255)").toFixed(2):null };
});
console.log("R3-7 FORCED-LIGHT-BUCKET (what a consumer must opt into):",JSON.stringify(forced));
await fs.writeFile(`${GROUND}/F2-r3-7-probe.json`, JSON.stringify({probe,white,forced},null,2));
await browser.close();
console.log("DONE");
