import { chromium } from "playwright";
import fs from "node:fs";
import { PNG } from "pngjs";
const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOTFLOW-REBUILD-rebuild-paint";

function census(pngPath) {
  const png = PNG.sync.read(fs.readFileSync(pngPath));
  const { width: W, height: H, data } = png;
  let sum=0,n=0,p=[],colored=0;
  for (let i=0;i<data.length;i+=4){const r=data[i],g=data[i+1],b=data[i+2];const l=0.2126*r+0.7152*g+0.0722*b;sum+=l;n++;p.push(l);if(Math.max(r,g,b)-Math.min(r,g,b)>16)colored++;}
  p.sort((a,b)=>a-b);
  return { W,H,mean:+(sum/n).toFixed(1),p99:p[Math.floor(n*0.99)],max:p[n-1],coloredPct:+(100*colored/n).toFixed(1)};
}
function fdiff(a,b){const A=PNG.sync.read(fs.readFileSync(a)),B=PNG.sync.read(fs.readFileSync(b));let d=0,n=0;for(let i=0;i<A.data.length;i+=4){const la=0.2126*A.data[i]+0.7152*A.data[i+1]+0.0722*A.data[i+2];const lb=0.2126*B.data[i]+0.7152*B.data[i+1]+0.0722*B.data[i+2];d+=Math.abs(la-lb);n++;}return +(d/n).toFixed(2);}

const browser = await chromium.connectOverCDP("http://localhost:9477");
const context = await browser.newContext({ deviceScaleFactor: 2, colorScheme: "dark", viewport: { width: 1440, height: 1000 }, reducedMotion: "no-preference" });
const page = await context.newPage();
const errs=[];
page.on("pageerror", e=>errs.push(e.message));
page.on("console", m=>{ if(m.type()==="error") errs.push("[console.error] "+m.text()); });

// NORMAL interactive route — NO ?capture=
await page.goto("http://localhost:5200/substrates/dot-flow-field", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
// scroll to the viz
await page.evaluate(() => {
  const main = document.querySelector("main.demo-main-scroller") || document.scrollingElement;
  const wrap = document.querySelector(".dot-flow-field-wrapper");
  if (wrap) { const wr=wrap.getBoundingClientRect(); const mr=(main.getBoundingClientRect?.()||{top:0}); main.scrollTop += (wr.top-(mr.top||0))-90; }
});
await page.waitForTimeout(2000);

const bb = await page.evaluate(() => {
  const c = document.querySelector(".dot-flow-field-wrapper canvas");
  if(!c) return null;
  const r=c.getBoundingClientRect();
  let wgpu=false,gl2=false; try{wgpu=!!c.getContext("webgpu");}catch(e){} try{gl2=!!c.getContext("webgl2");}catch(e){}
  return { x:r.x,y:r.y,w:r.width,h:r.height, wgpu, gl2, cw:c.width, ch:c.height };
});
if(!bb){ console.log("NO CANVAS on normal route"); await context.close(); await browser.close(); process.exit(0); }
console.log("normal-route canvas:", JSON.stringify(bb));

// move mouse over canvas + wait, then capture 2 frames 800ms apart
await page.mouse.move(bb.x+bb.w/2, bb.y+bb.h/2, {steps:10});
await page.waitForTimeout(5000);
const clip={x:Math.round(bb.x),y:Math.round(bb.y),width:Math.round(bb.w),height:Math.round(bb.h)};
const f1=`${OUT}/normal-dark-canvas-t1.png`; await page.screenshot({path:f1, clip});
await page.waitForTimeout(900);
const f2=`${OUT}/normal-dark-canvas-t2.png`; await page.screenshot({path:f2, clip});
const full=`${OUT}/normal-dark-full.png`; await page.screenshot({path:full});

console.log("census t1:", JSON.stringify(census(f1)));
console.log("motion t1->t2 (800ms):", fdiff(f1,f2));
console.log("errors:", errs.slice(0,10).join(" | ") || "(none)");
await context.close();
await browser.close();
