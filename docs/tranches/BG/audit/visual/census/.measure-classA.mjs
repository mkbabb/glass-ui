import { chromium } from "playwright";
import { readFileSync } from "node:fs";
// reuse the census contrast fn
const src = readFileSync("./census.mjs","utf8");
const m = src.match(/const CENSUS_FN = `([\s\S]*?)`;/);
const CENSUS_FN = m[1].replace(/\\\\/g,"\\").replace(/\\`/g,"`").replace(/\\\$/g,"$");
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0] || await b.newContext();
const p = await ctx.newPage();
await p.setViewportSize({width:1440,height:900});

async function ready(){const t0=Date.now();while(Date.now()-t0<15000){if(await p.evaluate(()=>document.documentElement.hasAttribute("data-capture-ready")))return;await p.waitForTimeout(150);}}

// ---- BADGE (default visible) ----
await p.goto("http://localhost:5200/?capture=/display/badge&mode=dark",{waitUntil:"load"});
await ready(); await p.waitForTimeout(400);
let res = await p.evaluate(new Function("return ("+CENSUS_FN+")()"));
console.log(`\n=== /display/badge dark: counted=${res.counted}  WCAG-fail among viols:`);
res.violations.filter(v=>v.wcagFail).forEach(v=>console.log(`  WCAGFAIL ${v.ratio} "${v.sample}" txt[${v.txt}] on[${v.plate}] .${v.cls}`));
console.log(`  (raw viols total ${res.violations.length}, wcagFail ${res.violations.filter(v=>v.wcagFail).length})`);
// show the loud pills specifically (badge-atom / section-color)
let pills = await p.evaluate(() => {
  const out=[];
  document.querySelectorAll('*').forEach(el=>{
    if(el.children.length===0){const t=(el.textContent||"").trim();
      const cs=getComputedStyle(el); const bg=cs.backgroundColor;
      const par=el.closest('[class*="badge"],[style*="section-color"],[style*="viz-"]');
      if(t && t.length<16 && (/badge/i.test(el.className||"")|| (par&&par!==el))){
        out.push({t:t.slice(0,14),color:cs.color, cls:(el.className?.toString?.()||"").slice(0,30)});
      }}});
  return out.slice(0,20);
});
console.log("  loud-pill sample inks:");
pills.forEach(h=>console.log(`    "${h.t}" color=${h.color} .${h.cls}`));

// ---- AVATAR (behind atoms family switcher) ----
await p.goto("http://localhost:5200/?capture=/display/atoms&mode=dark",{waitUntil:"load"});
await ready(); await p.waitForTimeout(400);
// find + click the avatar family switch tab
const clicked = await p.evaluate(() => {
  const cand=[...document.querySelectorAll('button,[role="tab"],a,[data-family],[data-id]')]
    .find(e=>/avatar/i.test(e.textContent||"")||/avatar/i.test(e.getAttribute?.('data-id')||"")||/avatar/i.test(e.getAttribute?.('data-family')||""));
  if(cand){cand.click();return cand.outerHTML.slice(0,80);}
  return null;
});
console.log(`\n=== /display/atoms — avatar switch clicked: ${clicked ? "YES ("+clicked+")" : "NOT FOUND"}`);
await p.waitForTimeout(800);
let av = await p.evaluate(() => {
  const out=[];
  document.querySelectorAll('*').forEach(el=>{
    if(el.children.length===0){const t=(el.textContent||"").trim();
      if(/^[A-Z]{2}$/.test(t)){const cs=getComputedStyle(el);
        // composited bg
        let n=el,bg="";while(n){const c=getComputedStyle(n).backgroundColor;if(c&&c!=="rgba(0, 0, 0, 0)"){bg=c;break;}n=n.parentElement;}
        out.push({t,color:cs.color,bg});}}});
  return out.slice(0,20);
});
console.log(`  avatar initials found: ${av.length}`);
av.forEach(h=>console.log(`    "${h.t}" ink=${h.color} on bg=${h.bg}`));
await p.close(); await b.close();
