import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
// list dock routes
const p0 = await ctx.newPage();
await p0.goto("http://localhost:5200/", { waitUntil: "load" });
await p0.waitForTimeout(1000);
const dockRoutes = await p0.evaluate(()=>{
  const app=document.querySelector("#app")?.__vue_app__;
  const rt=app?.config?.globalProperties?.$router;
  return rt?rt.getRoutes().map(x=>x.path).filter(p=>p.startsWith("/dock")):[];
});
console.log("DOCK ROUTES:", JSON.stringify(dockRoutes));
await p0.close();

// E2: capture a DockStage route via ?capture, sample aurora backdrop hue
async function warmField(route, mode){
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`http://localhost:5200/?capture=${route}&mode=${mode}`, { waitUntil: "load" });
  // poll data-capture-ready
  await page.waitForFunction(()=>document.documentElement.hasAttribute("data-capture-ready"), { timeout: 20000 });
  await page.waitForTimeout(300);
  const r = await page.evaluate(()=>{
    // find the aurora canvas and sample average color of exposed field
    const cvs = document.querySelector("canvas[data-glass-field-canvas], .dock-stage canvas, canvas");
    if(!cvs) return {err:"no canvas"};
    const w=cvs.width,h=cvs.height;
    const gl = cvs.getContext("webgl2")||cvs.getContext("webgl");
    // sample via drawing to 2d
    const c2=document.createElement("canvas"); c2.width=64;c2.height=64;
    const cx=c2.getContext("2d");
    try{ cx.drawImage(cvs,0,0,64,64);}catch(e){return {err:"drawImage "+e};}
    const d=cx.getImageData(0,0,64,64).data;
    let R=0,G=0,B=0,n=0;
    for(let i=0;i<d.length;i+=4){ if(d[i+3]>10){R+=d[i];G+=d[i+1];B+=d[i+2];n++;} }
    if(!n) return {err:"transparent canvas", cw:w,ch:h};
    R=Math.round(R/n);G=Math.round(G/n);B=Math.round(B/n);
    // hue
    const mx=Math.max(R,G,B),mn=Math.min(R,G,B); let hue=0;
    if(mx!==mn){const dd=mx-mn; if(mx===R)hue=((G-B)/dd)%6; else if(mx===G)hue=(B-R)/dd+2; else hue=(R-G)/dd+4; hue*=60; if(hue<0)hue+=360;}
    return { rgb:[R,G,B], hue:Math.round(hue), sat: mx===0?0:Math.round((mx-mn)/mx*100), warm: (hue<70||hue>330) };
  });
  await page.close();
  return { route, mode, ...r };
}
const target = dockRoutes.find(p=>/overview|^\/dock$/.test(p)) || dockRoutes[0] || "/dock";
for (const mode of ["light","dark"]) {
  console.log("E2 warmField", JSON.stringify(await warmField(target, mode)));
}

// Entrance beats: fresh load, sample title transform/opacity rapidly after mount
async function entrance(route){
  const page = await ctx.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const frames=[];
  await page.goto("http://localhost:5200"+route, { waitUntil:"domcontentloaded" });
  // sample as fast as possible for ~600ms
  const t0=Date.now();
  while(Date.now()-t0 < 700){
    const f = await page.evaluate(()=>{
      const rd=s=>{const el=document.querySelector(s); if(!el) return null; try{const cs=getComputedStyle(el); return {t:cs.transform, o:+(+cs.opacity).toFixed(3)};}catch(e){return null;}};
      return { title: rd(".story-hero-cluster .story-hero-title"), eyebrow: rd(".story-hero-cluster .story-header-eyebrow"), blurb: rd(".story-hero-cluster .story-header-blurb") };
    }).catch(()=>null);
    if(f) frames.push({dt:Date.now()-t0, ...f});
    await page.waitForTimeout(30);
  }
  await page.close();
  // detect rise: any element with translateY (matrix with ty!=0) AND opacity<1 in early frames
  const parseTY = t => { if(!t||t==="none") return 0; const m=t.match(/matrix\(([^)]+)\)/); if(m){const p=m[1].split(",").map(Number); return p[5]||0;} const m3=t.match(/matrix3d\(([^)]+)\)/); if(m3){const p=m3[1].split(",").map(Number); return p[13]||0;} return 0; };
  const titleFrames = frames.map(f=>({dt:f.dt, ty: f.title?+parseTY(f.title.t).toFixed(1):null, o: f.title?.o}));
  const roseTitle = titleFrames.some(f=> f.ty>1 && f.o<0.99);
  const eb = frames.map(f=>f.eyebrow?+parseTY(f.eyebrow.t).toFixed(1):null);
  const roseEyebrow = frames.some(f=> f.eyebrow && parseTY(f.eyebrow.t)>1 && f.eyebrow.o<0.99);
  const distinctO = new Set(titleFrames.map(f=>f.o).filter(x=>x!=null).map(x=>x.toFixed(2))).size;
  return { route, roseTitle, roseEyebrow, distinctTitleOpacityStates: distinctO, sample: titleFrames.slice(0,8) };
}
console.log("ENTRANCE display/atoms:", JSON.stringify(await entrance("/display/atoms"),null,1));
console.log("ENTRANCE data/metrics:", JSON.stringify(await entrance("/data/metrics"),null,1));
await b.close();
