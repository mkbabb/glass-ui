import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9477";
const b = await chromium.connectOverCDP(CDP);
const ctx = await b.newContext({ deviceScaleFactor: 2, colorScheme: "light", viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto("http://localhost:5200/substrates", { waitUntil: "domcontentloaded" });
// let reveal fire + settle fully (>1.4s)
await page.waitForTimeout(2200);
const r = await page.evaluate(async () => {
  const cv = document.querySelector("canvas[data-substrate-reveal]") || document.querySelector("main canvas");
  const before = { attr: cv?.hasAttribute("data-substrate-reveal"), anims: (cv?.getAnimations?.()||[]).map(a=>a.animationName), filter: getComputedStyle(cv).filter };
  // scroll off-and-back: scroll the scroller down then back to top to re-intersect the canvas
  const scroller = document.querySelector("main") || document.scrollingElement;
  scroller.scrollTo(0, scroller.scrollHeight);
  await new Promise(r=>setTimeout(r,400));
  scroller.scrollTo(0, 0);
  await new Promise(r=>setTimeout(r,300));
  // sample filter over 900ms to see if a SECOND bloom runs (brightness would dip+overshoot again)
  const t0 = performance.now(); const bs=[];
  await new Promise(res=>{ const tk=()=>{ const c=document.querySelector("canvas[data-substrate-reveal]")||document.querySelector("main canvas"); const f=getComputedStyle(c).filter; const m=/brightness\(([^)]+)\)/.exec(f); bs.push(m?parseFloat(m[1]):1); if(performance.now()-t0<900) requestAnimationFrame(tk); else res(); }; requestAnimationFrame(tk); });
  const after = { attr: cv?.hasAttribute("data-substrate-reveal"), anims: (document.querySelector("canvas[data-substrate-reveal]")?.getAnimations?.()||[]).map(a=>a.animationName), minB: Math.min(...bs), maxB: Math.max(...bs) };
  return { before, after };
});
console.log(JSON.stringify(r, null, 2));
// second bloom would show minB well below 1 (the dim floor 0.4) + maxB overshoot; a settled one-shot stays flat at 1
const secondBloom = r.after.minB < 0.9 || r.after.maxB > 1.05;
console.log("SECOND_BLOOM_FIRED:", secondBloom, "(expect false)");
await page.close(); await ctx.close(); await b.close();
