import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
async function subordinateFade(route) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5200" + route, { waitUntil: "load" });
  await page.waitForSelector(".story-hero-shrink", { timeout: 15000 });
  await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.style.scrollBehavior="auto"; document.getAnimations().forEach(a=>{if(a.timeline===document.timeline){try{a.finish()}catch(e){}}}); });
  await page.waitForTimeout(700);
  const out = [];
  for (const sy of [0,80,160,220,280]) {
    const r = await page.evaluate(async (y)=>{
      const m=document.querySelector("main.demo-main-scroller"); m.scrollTop=y;
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      const eb=document.querySelector(".story-hero-shrink .story-header-eyebrow");
      const bl=document.querySelector(".story-hero-shrink .story-header-blurb");
      return { st:m.scrollTop, eyebrow: eb?+(+getComputedStyle(eb).opacity).toFixed(2):null, blurb: bl?+(+getComputedStyle(bl).opacity).toFixed(2):null };
    }, sy);
    out.push(r);
  }
  await page.close();
  return out;
}
async function prmHeader(route) {
  const page = await ctx.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5200" + route, { waitUntil: "load" });
  await page.waitForSelector(".story-hero-shrink", { timeout: 15000 });
  await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.style.scrollBehavior="auto"; });
  await page.waitForTimeout(600);
  const r = await page.evaluate(async ()=>{
    const m=document.querySelector("main.demo-main-scroller");
    const sh=document.querySelector(".story-hero-shrink");
    const read=async(y)=>{m.scrollTop=y; await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); const sc=getComputedStyle(sh).scale; return sc==="none"?1:parseFloat(sc.split(" ")[0]);};
    const s0=await read(0), s160=await read(160);
    const anims = sh.getAnimations().map(a=>({name:a.animationName, tl: a.timeline?a.timeline.constructor.name:null}));
    return { scaleAt0:s0, scaleAt160:s160, animCount: anims.length, anims };
  });
  await page.close();
  return r;
}
async function routeCensus() {
  const page = await ctx.newPage();
  await page.goto("http://localhost:5200/", { waitUntil: "load" });
  await page.waitForTimeout(1200);
  const r = await page.evaluate(()=>{
    let routes=null;
    try {
      const app = document.querySelector("#app")?.__vue_app__;
      const rt = app?.config?.globalProperties?.$router;
      if (rt) routes = rt.getRoutes().filter(x=>x.components && Object.keys(x.components).length).map(x=>x.path);
    } catch(e){ return {err: String(e)}; }
    return { routes };
  });
  await page.close();
  return r;
}
const sub={};
for (const route of ["/display/atoms","/data/metrics","/motion/scroll"]) sub[route]=await subordinateFade(route);
const prm = await prmHeader("/display/atoms");
const census = await routeCensus();
console.log("=== SUBORDINATE FADE ===");
for (const [r,frames] of Object.entries(sub)) { console.log(` ${r}: ${frames.map(f=>`st${f.st}[eb${f.eyebrow},bl${f.blurb}]`).join(" ")}`); }
console.log("=== PRM ===", JSON.stringify(prm));
console.log("=== CENSUS ===", census.routes?`count=${census.routes.length}`:JSON.stringify(census));
if (census.routes) {
  // subpath collision check: group leaf routes, none share unless declared family
  const dups = {};
  for (const p of census.routes) { dups[p]=(dups[p]||0)+1; }
  const collided = Object.entries(dups).filter(([,n])=>n>1);
  console.log("  duplicate-path count:", collided.length, collided.slice(0,5));
}
await b.close();
