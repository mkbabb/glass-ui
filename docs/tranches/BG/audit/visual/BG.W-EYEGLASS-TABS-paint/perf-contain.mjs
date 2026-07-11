// Chrome dark busy refraction shot + `contain` bound check + a 4x-CPU perf trace of a
// natural T3 tab-select (the AC6 perf band — refraction re-raster over the live aurora).
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });

// ── contain check (light) ──
await page.emulateMedia({ colorScheme: "light" });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(2000);
const contain = await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const ind = s.querySelector(".segmented-indicator");
    const cs = getComputedStyle(ind);
    return { pillContain: cs.contain, pillWillChange: cs.willChange, stripContain: getComputedStyle(s).contain, pillPosition: cs.position };
});
console.log("CONTAIN:", JSON.stringify(contain));

// ── Chrome DARK busy refraction shot (symmetry with Safari) ──
await page.emulateMedia({ colorScheme: "dark" });
await page.evaluate(()=>{document.documentElement.classList.add("dark");document.documentElement.style.colorScheme="dark";});
await page.waitForTimeout(500);
await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const card = s.closest(".glass-card");
    const bg=document.createElement("div"); bg.style.cssText="position:fixed;inset:0;z-index:0;background:repeating-linear-gradient(45deg,#001a33 0 10px,#66ccff 10px 20px);";
    document.body.insertBefore(bg, document.body.firstChild);
    card.style.background="transparent";card.style.backdropFilter="none";card.style.webkitBackdropFilter="none";card.style.boxShadow="none";card.style.border="none";card.style.position="relative";card.style.zIndex="2";
    const c=document.querySelector("canvas.aurora-canvas"); if(c)c.style.opacity="0";
    s.scrollIntoView({block:"center"});
});
await page.waitForTimeout(600);
const box = await page.evaluate(()=>{const s=Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));const r=s.getBoundingClientRect();return {x:Math.round(r.left-10),y:Math.round(r.top-20),width:Math.round(r.width+20),height:Math.round(r.height+40)};});
await page.screenshot({ path: `${OUT}chrome__refract_busy_strip_dark.png`, clip: box });
console.log("CHROME DARK BUSY shot saved");

// ── 4x CPU perf trace of a natural T3 select (light, live aurora) ──
await page.emulateMedia({ colorScheme: "light" });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.waitForTimeout(1500);
const client = await page.context().newCDPSession(page);
await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
await page.evaluate(async ()=>{ const s=Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass")); s.scrollIntoView({block:"center"}); const tabs=Array.from(s.querySelectorAll(".segmented-tab")); tabs[0].click(); await new Promise(r=>setTimeout(r,700)); });
await client.send("Performance.enable");
// measure long tasks via PerformanceObserver during a T3 travel
const perf = await page.evaluate(async () => {
    const s=Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const tabs=Array.from(s.querySelectorAll(".segmented-tab"));
    const longTasks=[]; let frames=[]; let last=performance.now();
    const po=new PerformanceObserver((l)=>{for(const e of l.getEntries())longTasks.push(+e.duration.toFixed(1));});
    try{po.observe({entryTypes:["longtask"]});}catch(e){}
    let raf=true; function tick(){const n=performance.now();frames.push(+(n-last).toFixed(1));last=n;if(raf)requestAnimationFrame(tick);}
    requestAnimationFrame(tick);
    tabs[2].click(); // T3 travel
    await new Promise(r=>setTimeout(r,600));
    raf=false; po.disconnect();
    // frame intervals during the ~600ms window; count dropped (>~20ms at 4x throttle target ~16.7 but throttle stretches)
    const travelFrames=frames.slice(2, 40);
    const over33=travelFrames.filter(f=>f>33).length; // dropped frames (missed 30fps)
    const over50=travelFrames.filter(f=>f>50).length;
    return { longTasks, maxFrame:Math.max(...travelFrames), medianFrame:travelFrames.sort((a,b)=>a-b)[Math.floor(travelFrames.length/2)], over33, over50, nFrames:travelFrames.length };
});
console.log("PERF(4xCPU):", JSON.stringify(perf));
await client.send("Emulation.setCPUThrottlingRate", { rate: 1 });
await page.close();
await browser.close().catch(()=>{});
