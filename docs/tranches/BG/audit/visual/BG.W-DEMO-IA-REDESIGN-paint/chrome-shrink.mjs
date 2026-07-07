import { chromium } from "playwright";
import fs from "fs";
const OUT = "docs/tranches/BG/audit/visual/BG.W-DEMO-IA-REDESIGN-paint";
const ROUTES = ["/display/atoms", "/data/metrics", "/motion/scroll"];
const MODES = ["light", "dark"];
const STEPS = [0,20,40,60,80,100,120,140,160,180];
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const results = {};
for (const route of ROUTES) {
  for (const mode of MODES) {
    const key = `${route}|${mode}`;
    const page = await ctx.newPage();
    await page.addInitScript((m) => { try { localStorage.setItem("vueuse-color-scheme", m); } catch(e){} }, mode);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:5200" + route, { waitUntil: "load" });
    await page.waitForSelector("main", { timeout: 15000 });
    await page.evaluate((m) => {
      document.documentElement.classList.toggle("dark", m === "dark");
      document.documentElement.style.colorScheme = m;
      const sc = document.querySelector("main.demo-main-scroller");
      if (sc) sc.style.scrollBehavior = "auto";
    }, mode);
    await page.waitForTimeout(1800);
    const glRenderer = await page.evaluate(() => {
      try { const c=document.createElement("canvas"); const gl=c.getContext("webgl2"); const e=gl.getExtension("WEBGL_debug_renderer_info"); return gl.getParameter(e.UNMASKED_RENDERER_WEBGL); } catch(e){ return "n/a"; }
    });
    const frames = [];
    for (const s of STEPS) {
      const rec = await page.evaluate(async (sy) => {
        const main = document.querySelector("main.demo-main-scroller") || document.querySelector("main");
        main.style.scrollBehavior = "auto";
        main.scrollTop = sy;
        // settle two frames so the scroll-driven animation samples the new progress
        await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
        const shrink = document.querySelector(".story-hero-shrink");
        const scrollAway = document.querySelector(".story-hero-scroll-away");
        const title = document.querySelector(".story-hero-shrink .story-hero-title, .story-hero-shrink h1");
        let scaleNum = 1;
        if (shrink) { const sc = getComputedStyle(shrink).scale; scaleNum = sc==="none"?1:parseFloat(sc.split(" ")[0]); }
        return {
          scrollTop: main.scrollTop,
          wrapperScale: scaleNum,
          wrapperScaleRaw: shrink?getComputedStyle(shrink).scale:null,
          wrapperTranslate: shrink?getComputedStyle(shrink).translate:null,
          wrapperOpacity: shrink?parseFloat(getComputedStyle(shrink).opacity):null,
          titleOpacity: title?parseFloat(getComputedStyle(title).opacity):null,
          shrinkExists: !!shrink,
          scrollAwayExists: !!scrollAway,
        };
      }, s);
      frames.push(rec);
    }
    // painted captures at 0, 80, 160
    const rk = route.replace(/\//g,"_").replace(/^_/,"");
    for (const sy of [0,80,160]) {
      await page.evaluate((y)=>{ const m=document.querySelector("main.demo-main-scroller")||document.querySelector("main"); m.style.scrollBehavior="auto"; m.scrollTop=y; }, sy);
      await page.waitForTimeout(350);
      await page.screenshot({ path: `${OUT}/chrome_${rk}_${mode}_s${sy}.png`, fullPage: false });
    }
    results[key] = { glRenderer, frames };
    await page.close();
  }
}
fs.writeFileSync(`${OUT}/chrome-shrink-frames.json`, JSON.stringify(results, null, 2));
for (const [k,v] of Object.entries(results)) {
  const scales = v.frames.map(f=>f.wrapperScale);
  const titleOps = v.frames.map(f=>f.titleOpacity);
  const wrapOps = v.frames.map(f=>f.wrapperOpacity);
  const sts = v.frames.map(f=>f.scrollTop);
  const mono = scales.every((s,i)=> i===0 || s <= scales[i-1] + 1e-6);
  const min = Math.min(...scales), max=Math.max(...scales);
  const minTitleOp = Math.min(...titleOps);
  const distinct = new Set(scales.map(s=>s.toFixed(3))).size;
  console.log(`${k}  scale ${max.toFixed(3)}->${min.toFixed(3)} mono=${mono} distinctFrames=${distinct} minTitleOp=${minTitleOp} scrollAway=${v.frames[0].scrollAwayExists} GL=${v.glRenderer.slice(0,34)}`);
  console.log(`   ST:     [${sts.join(", ")}]`);
  console.log(`   scales: [${scales.map(s=>s.toFixed(3)).join(", ")}]`);
  console.log(`   titleOp:[${titleOps.map(s=>s.toFixed(2)).join(", ")}]`);
}
await b.close();
