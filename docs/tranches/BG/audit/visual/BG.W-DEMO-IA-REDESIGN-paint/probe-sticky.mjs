import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/display/atoms", { waitUntil: "load" });
await page.waitForSelector("main", { timeout: 15000 });
await page.evaluate(()=>{ const m=document.querySelector("main.demo-main-scroller"); m.style.scrollBehavior="auto"; });
await page.waitForTimeout(1500);
for (const sy of [0, 80, 160, 300, 380]) {
  const r = await page.evaluate(async (y) => {
    const m = document.querySelector("main.demo-main-scroller");
    m.scrollTop = y;
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const sh = document.querySelector(".story-hero-shrink");
    const title = document.querySelector(".story-hero-shrink .story-hero-title");
    const header = sh?.closest("header");
    const mr = m.getBoundingClientRect();
    const rect = e => { if(!e) return null; const b=e.getBoundingClientRect(); return {top:Math.round(b.top-mr.top), h:Math.round(b.height), bottom:Math.round(b.bottom-mr.top)}; };
    return {
      scrollTop: m.scrollTop,
      maxScroll: m.scrollHeight - m.clientHeight,
      shrink: rect(sh),
      shrinkPos: sh?getComputedStyle(sh).position:null,
      title: rect(title),
      header: rect(header),
      headerTag: header?.tagName || (sh?.parentElement?.tagName),
      shrinkScale: sh?getComputedStyle(sh).scale:null,
    };
  }, sy);
  console.log(`ST=${String(r.scrollTop).padStart(3)} (max ${r.maxScroll})  shrink{top:${r.shrink?.top}, h:${r.shrink?.h}} pos=${r.shrinkPos} scale=${r.shrinkScale}  title{top:${r.title?.top},h:${r.title?.h}}  headerBox{top:${r.header?.top},h:${r.header?.h},bot:${r.header?.bottom}} tag=${r.headerTag}`);
}
await page.close();
await b.close();
