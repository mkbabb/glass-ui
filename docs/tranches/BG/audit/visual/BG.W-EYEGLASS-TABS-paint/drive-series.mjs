// The DRIVEN 60fps frame-series harness (AC3, net-new) — the Chromium refraction arm.
// Pointer-inject the tab select → WAAPI-seek the glide+squish transitions frame-by-frame
// (getAnimations().currentTime = frameSchedule[i]) → force a repaint of the
// backdrop-filter:url() raster → crop the bar-band at the SAME geometry per frame. Records
// BOTH the ground-truth indicator rect signal (cx/w/h per seeked frame) AND the PNG frames
// (for the visual gestalt + a PNG-centroid cross-check). Feeds the 17.7 gesture-frame-recorder.
//
//   MODE=light|dark  GESTURE=t2|t3|t4   node drive-series.mjs
import { chromium } from "playwright";
import fs from "fs";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const MODE = process.env.MODE || "light";
const GESTURE = process.env.GESTURE || "t3";
const PRM = process.env.PRM === "1";
// reference gesture map: T2/T4 = 1-slot, T3 = 2-slot (the reference travel + continuous-transit)
const GEST = { t2: { from: 0, to: 1 }, t3: { from: 0, to: 2 }, t4: { from: 2, to: 3 } }[GESTURE];
const FPS = 60, STEP = 1000 / FPS, FRAMES = 24; // 24 frames ≈ 383ms covers the 400ms transition
const schedule = Array.from({ length: FRAMES }, (_, i) => +(i * STEP).toFixed(3));

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.emulateMedia({ colorScheme: MODE, reducedMotion: PRM ? "reduce" : "no-preference" });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m)=>{try{localStorage.setItem("vueuse-color-scheme",m);}catch{} document.documentElement.classList.toggle("dark",m==="dark"); document.documentElement.style.colorScheme=m;}, MODE);
await page.waitForTimeout(2000);

// Setup: scroll eyeglass strip into view, reset to `from`, record centers + a fixed bar-band clip.
const setup = await page.evaluate(async (from) => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    s.scrollIntoView({ block: "center" });
    await new Promise(r=>setTimeout(r,500));
    const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
    tabs[from].click();
    await new Promise(r=>setTimeout(r,650));
    const centers = tabs.map(t=>{const r=t.getBoundingClientRect(); return +(r.left+r.width/2).toFixed(1);});
    const sr = s.getBoundingClientRect();
    return { centers, band: { x: Math.round(sr.left-6), y: Math.round(sr.top-16), width: Math.round(sr.width+12), height: Math.round(sr.height+32) } };
}, GEST.from);

// Click target, register transitions, pause the glide+squish anims.
await page.evaluate(async (to) => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
    tabs[to].click();
    await new Promise(r=>requestAnimationFrame(()=>r()));
    window.__egAnims = document.getAnimations().filter(a=>{const t=a.effect&&a.effect.target; return t && s.contains(t) && /segmented-indicator/.test(t.className||"");});
    window.__egAnims.forEach(a=>a.pause());
    window.__egInd = s.querySelector(".segmented-indicator");
}, GEST.to);

const signal = [];
for (let i = 0; i < schedule.length; i++) {
    const t = schedule[i];
    const rect = await page.evaluate(async (tt) => {
        window.__egAnims.forEach(a=>{ try{ a.currentTime = tt; }catch(e){} });
        void window.__egInd.getBoundingClientRect();
        await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>r())));
        const r = window.__egInd.getBoundingClientRect();
        return { cx:+(r.left+r.width/2).toFixed(2), w:+r.width.toFixed(2), h:+r.height.toFixed(2), top:+r.top.toFixed(2), bot:+r.bottom.toFixed(2) };
    }, t);
    const fp = `${OUT}frames_${GESTURE}_${MODE}${PRM?'_prm':''}__f${String(i).padStart(2,'0')}.png`;
    await page.screenshot({ path: fp, clip: setup.band });
    signal.push({ i, t, ...rect });
}

const meta = { gesture: GESTURE, mode: MODE, prm: PRM, centers: setup.centers, from: GEST.from, to: GEST.to, band: setup.band, schedule, signal };
fs.writeFileSync(`${OUT}series_${GESTURE}_${MODE}${PRM?'_prm':''}.json`, JSON.stringify(meta, null, 2));
console.log(`SERIES ${GESTURE} ${MODE}${PRM?' PRM':''}: from=${GEST.from} to=${GEST.to} centers=${JSON.stringify(setup.centers)}`);
console.log("cx signal:", signal.map(s=>s.cx).join(", "));
console.log("w  signal:", signal.map(s=>s.w).join(", "));
await page.close();
await browser.close().catch(()=>{});
