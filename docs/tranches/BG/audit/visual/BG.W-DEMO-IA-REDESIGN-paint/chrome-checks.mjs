import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];

// ---------- Check 1: subordinate eyebrow/blurb fade only AFTER pin (0-160 held) ----------
async function subordinateFade(route) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:5200" + route, { waitUntil: "load" });
  await page.waitForSelector(".story-hero-shrink", { timeout: 15000 });
  await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.style.scrollBehavior="auto"; document.getAnimations().forEach(a=>{if(a.timeline===document.timeline){try{a.finish()}catch(e){}}}); });
  await page.waitForTimeout(800);
  const out = [];
  for (const sy of [0,80,160,220,280]) {
    const r = await page.evaluate(async (y)=>{
      const m=document.querySelector("main.demo-main-scroller"); m.scrollTop=y;
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
      const eb=document.querySelector(".story-hero-shrink .story-header-eyebrow");
      const bl=document.querySelector(".story-hero-shrink .story-header-blurb");
      return { st:m.scrollTop, eyebrow: eb?parseFloat(getComputedStyle(eb).opacity):null, blurb: bl?parseFloat(getComputedStyle(bl).opacity):null };
    }, sy);
    out.push(r);
  }
  await page.close();
  return out;
}

// ---------- Check 2: PRM static full-size header ----------
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
    // is the shrink animation active under PRM? getAnimations on the shrink el
    const anims = sh.getAnimations().map(a=>({name:a.animationName, tl: a.timeline?a.timeline.constructor.name:null}));
    return { scaleAt0:s0, scaleAt160:s160, animCount: anims.length, anims };
  });
  await page.close();
  return r;
}

// ---------- Check 3: entrance beats (translateY rise on mount) ----------
async function entranceBeats(route) {
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  // navigate and immediately capture the entrance transforms
  await page.goto("http://localhost:5200" + route, { waitUntil: "commit" });
  await page.waitForSelector(".story-hero-cluster", { timeout: 15000 });
  // sample transforms across the first ~400ms of the entrance
  const frames = [];
  for (let i=0;i<10;i++){
    const r = await page.evaluate(()=>{
      const q=s=>document.querySelector(s);
      const rd=el=>{ if(!el) return null; const cs=getComputedStyle(el); return { t: cs.transform, o: parseFloat(cs.opacity) }; };
      return {
        eyebrow: rd(".story-hero-cluster .story-header-eyebrow"),
        title: rd(".story-hero-cluster .story-hero-title"),
        blurb: rd(".story-hero-cluster .story-header-blurb"),
        anims: document.querySelectorAll(".story-hero-cluster [style], .story-hero-cluster *").length,
      };
    });
    frames.push(r);
    await page.waitForTimeout(45);
  }
  // did any element show a non-identity transform (translateY) at some early frame + opacity<1?
  const hadRise = frames.some(f => [f.eyebrow,f.title,f.blurb].some(e => e && e.t && e.t!=="none" && /matrix/.test(e.t) && e.o < 0.999));
  // count distinct opacity states on title (rise frames)
  const titleOps = frames.map(f=>f.title?.o).filter(x=>x!=null);
  const distinctTitleOp = new Set(titleOps.map(x=>x.toFixed(2))).size;
  await page.close();
  return { hadRise, distinctTitleOp, titleOps: titleOps.map(x=>x.toFixed(2)), sampleEarly: frames[0], sampleLate: frames[9] };
}

// ---------- Check 4: E1 route census ----------
async function routeCensus() {
  const page = await ctx.newPage();
  await page.goto("http://localhost:5200/", { waitUntil: "load" });
  await page.waitForTimeout(1000);
  const r = await page.evaluate(()=>{
    // access the vue-router via the app if exposed; else count nav links
    const w = window;
    let routes = null;
    try {
      // router often exposed on __VUE_DEVTOOLS or app config
      const app = document.querySelector("#app")?.__vue_app__;
      const rt = app?.config?.globalProperties?.$router;
      if (rt) routes = rt.getRoutes().filter(x=>x.components && Object.keys(x.components).length).map(x=>x.path);
    } catch(e){}
    return { routes };
  });
  await page.close();
  return r;
}

const sub = {};
for (const route of ["/display/atoms","/data/metrics","/motion/scroll"]) sub[route] = await subordinateFade(route);
const prm = await prmHeader("/display/atoms");
const ent = await entranceBeats("/display/atoms");
const census = await routeCensus();

console.log("=== SUBORDINATE FADE (eyebrow/blurb opacity by scrollTop; should hold ~1 through 0-160, fade after) ===");
for (const [r,frames] of Object.entries(sub)) {
  console.log(` ${r}`);
  for (const f of frames) console.log(`   st=${String(f.st).padStart(3)} eyebrow=${f.eyebrow} blurb=${f.blurb}`);
}
console.log("=== PRM (reduced motion) header ===");
console.log(JSON.stringify(prm));
console.log("=== ENTRANCE BEATS ===");
console.log(JSON.stringify(ent, null, 1));
console.log("=== ROUTE CENSUS ===");
console.log("routeCount:", census.routes?.length, "sample:", census.routes?.slice(0,5));
await b.close();
