import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const reduce = process.argv[2] === "reduce";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
if (reduce) await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://localhost:5200/containers/drawer", { waitUntil: "load" });
await page.waitForTimeout(1000);
await page.evaluate(() => {
  window.__s = []; window.__run = true;
  (function loop(n){
    // max scalar across ALL mounted drawer sheets (the open one drives it)
    let v = 0, has=0;
    for (const e of document.querySelectorAll('.glass-drawer')){ const x=parseFloat(e.style.getPropertyValue('--glass-drawer-t')); if(!isNaN(x)){ has=1; v=Math.max(v,x); } }
    window.__s.push([n, has?v:null]);
    if(window.__run) requestAnimationFrame(loop);
  })(performance.now());
});
const t0 = await page.evaluate(()=>performance.now());
await page.getByRole("button", { name: /open drawer/i }).first().click();
await page.waitForTimeout(700);
const s = await page.evaluate(()=>{ window.__run=false; return window.__s; });
const after = s.filter(x=>x[0]>=t0);
const settled = after.length? after[after.length-1][1] : null;
// motion frames = frames where scalar strictly between 0 and settled (in-flight)
const motion = after.filter(x=> x[1]!=null && x[1]>0.005 && Math.abs(x[1]-settled)>0.02);
const firstNonZeroIdx = after.findIndex(x=> x[1]!=null && x[1]>0.005);
console.log(JSON.stringify({ reduce, settled, motionFrames: motion.length, firstResponseFrameIdx: firstNonZeroIdx, trace: after.slice(firstNonZeroIdx>=0?firstNonZeroIdx:0, (firstNonZeroIdx>=0?firstNonZeroIdx:0)+8).map(x=>x[1]==null?null:+x[1].toFixed(3)) }));
await page.close(); await browser.close();
