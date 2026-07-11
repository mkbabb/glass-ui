// Driving-harness diagnostic — after a select, what animations are seekable, and does
// seeking move the indicator POSITION (the glide) + SIZE (the squish)? Measures the
// indicator rect at a sweep of seeked currentTimes to prove WAAPI-seek drives the glide.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const MODE = process.env.MODE || "light";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.emulateMedia({ colorScheme: MODE, reducedMotion: "no-preference" });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m)=>{try{localStorage.setItem("vueuse-color-scheme",m);}catch{} document.documentElement.classList.toggle("dark",m==="dark"); document.documentElement.style.colorScheme=m;}, MODE);
await page.waitForTimeout(2000);

const diag = await page.evaluate(async () => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    s.scrollIntoView({ block: "center" });
    const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
    const ind = s.querySelector(".segmented-indicator");
    const raf = () => new Promise(r=>requestAnimationFrame(()=>r()));
    // ensure start = tab 0 (Grid)
    tabs[0].click(); await raf(); await new Promise(r=>setTimeout(r,600));
    const centers = tabs.map(t=>{const r=t.getBoundingClientRect(); return Math.round(r.left+r.width/2);});
    // click target = tab 2 (Kanban, 2-slot travel)
    tabs[2].click();
    await raf(); // let the transition register
    // enumerate animations on the strip subtree
    const anims = document.getAnimations().filter(a=>{const t=a.effect&&a.effect.target; return t && s.contains(t);});
    const animMeta = anims.map(a=>({ target:(a.effect.target.className||"").slice(0,40), prop:a.transitionProperty||a.animationName||null, dur:a.effect.getTiming().duration, playState:a.playState }));
    // pause all + sweep currentTime, measure indicator center-x + width
    anims.forEach(a=>a.pause());
    const sweep = [];
    for (const t of [0, 50, 100, 150, 200, 250, 300, 400]) {
        anims.forEach(a=>{ try{ a.currentTime = t; }catch(e){} });
        // force style/layout flush
        void ind.getBoundingClientRect();
        await raf();
        const r = ind.getBoundingClientRect();
        sweep.push({ t, cx:+ (r.left+r.width/2).toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1) });
    }
    return { centers, animMeta, sweep };
});
console.log(JSON.stringify(diag, null, 2));
await page.close();
await browser.close().catch(()=>{});
