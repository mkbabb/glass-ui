import { chromium } from "playwright";
const b = await chromium.connectOverCDP("http://localhost:9333");
const ctx = b.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/display/atoms", { waitUntil: "load" });
await page.waitForSelector("main", { timeout: 15000 });
await page.waitForTimeout(1800);
const r = await page.evaluate(async () => {
  const main = document.querySelector("main.demo-main-scroller");
  const out = { found: !!main };
  if (main) {
    out.before = { sh: main.scrollHeight, ch: main.clientHeight, st: main.scrollTop, oy: getComputedStyle(main).overflowY };
    main.scrollTop = 200;
    out.afterSet = main.scrollTop;
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    out.afterRaf = main.scrollTop;
  }
  // enumerate ALL scrollable elements on page
  const all = [...document.querySelectorAll("*")].filter(el=>{
    const s=getComputedStyle(el); return (s.overflowY==="auto"||s.overflowY==="scroll") && el.scrollHeight>el.clientHeight+4;
  }).map(el=>({tag:el.tagName, cls:(el.className||"").toString().slice(0,45), sh:el.scrollHeight, ch:el.clientHeight}));
  out.scrollables = all;
  // what does document/body scroll look like
  out.docScroll = {se: document.scrollingElement?.scrollHeight, ce: document.scrollingElement?.clientHeight, st: document.scrollingElement?.scrollTop};
  return out;
});
console.log(JSON.stringify(r, null, 2));
await page.close();
await b.close();
