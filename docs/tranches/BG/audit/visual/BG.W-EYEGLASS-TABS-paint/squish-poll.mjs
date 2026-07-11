// Squish poll — the `--stretch` travel-squish is JS-driven (rAF release-at-arrival),
// NOT a pure CSS transition, so it can't be WAAPI-seeked. Measure the TRUE squish by
// polling computed `scale` + `--stretch` + rect-width via rAF during NATURAL playback.
// Records the mid-flight peak composed core-width and the release-to-rest at settle.
//   MODE=light|dark  PRM=0|1  node squish-poll.mjs
import { chromium } from "playwright";
import fs from "fs";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const MODE = process.env.MODE || "light";
const PRM = process.env.PRM === "1";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.emulateMedia({ colorScheme: MODE, reducedMotion: PRM ? "reduce" : "no-preference" });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m)=>{try{localStorage.setItem("vueuse-color-scheme",m);}catch{} document.documentElement.classList.toggle("dark",m==="dark"); document.documentElement.style.colorScheme=m;}, MODE);
await page.waitForTimeout(2000);

async function poll(from, to, label) {
    return await page.evaluate(async ({ from, to }) => {
        const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
        s.scrollIntoView({ block: "center" });
        const tabs = Array.from(s.querySelectorAll(".segmented-tab"));
        const ind = s.querySelector(".segmented-indicator");
        tabs[from].click();
        await new Promise(r=>setTimeout(r,650));
        const restW = ind.getBoundingClientRect().width;
        const restStretch = getComputedStyle(ind).getPropertyValue("--stretch").trim();
        const samples = [];
        tabs[to].click();
        const t0 = performance.now();
        await new Promise((resolve) => {
            function step() {
                const now = performance.now() - t0;
                const cs = getComputedStyle(ind);
                const r = ind.getBoundingClientRect();
                samples.push({ t:+now.toFixed(1), stretch:+(cs.getPropertyValue("--stretch")||1), blob:+(cs.getPropertyValue("--tab-blob")||1), scale: cs.scale, w:+r.width.toFixed(2), h:+r.height.toFixed(2) });
                if (now < 500) requestAnimationFrame(step); else resolve();
            }
            requestAnimationFrame(step);
        });
        return { restW:+restW.toFixed(2), restStretch, samples };
    }, { from, to });
}

const out = {};
for (const [label, [from, to]] of Object.entries({ t2: [0,1], t3: [0,2], t4: [2,3] })) {
    const r = await poll(from, to, label);
    // peak stretch + peak width
    const peakStretch = Math.max(...r.samples.map(s=>s.stretch));
    const peakW = Math.max(...r.samples.map(s=>s.w));
    const settleW = r.samples.slice(-5).reduce((a,s)=>a+s.w,0)/5;
    out[label] = { restW: r.restW, restStretch: r.restStretch, peakStretch:+peakStretch.toFixed(4), peakW:+peakW.toFixed(2), peakW_over_restW:+(peakW/r.restW).toFixed(4), settleW:+settleW.toFixed(2), settleW_over_restW:+(settleW/r.restW).toFixed(4), samples: r.samples };
}
fs.writeFileSync(`${OUT}squish_${MODE}${PRM?'_prm':''}.json`, JSON.stringify(out, null, 2));
for (const [k,v] of Object.entries(out)) {
    console.log(`${k}: restW=${v.restW} peakStretch=${v.peakStretch} peakW=${v.peakW} (peak/rest=${v.peakW_over_restW}) settleW/rest=${v.settleW_over_restW}`);
}
await page.close();
await browser.close().catch(()=>{});
