// Refraction-mechanism proof — does `.glass-lens` on the tab indicator physically
// displace a textured backdrop on real Metal Chrome? (make-or-break signature #1 +
// the NF "primary works in paint or fails loud" bar). Inject a high-contrast striped
// backdrop reaching the pills, capture the EYEGLASS (glass-lens) pill vs a CONTROL
// (glass-capsule, blur-only) pill zoomed, so the bend is visible + measurable.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ORIGIN = process.env.ORIGIN || "http://localhost:5200";
const OUT = new URL(".", import.meta.url).pathname;
const MODE = process.env.MODE || "light";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 1200 });
await page.emulateMedia({ colorScheme: MODE });
await page.goto(`${ORIGIN}/navigation/tabs`, { waitUntil: "load", timeout: 30000 });
await page.evaluate((m)=>{try{localStorage.setItem("vueuse-color-scheme",m);}catch{} document.documentElement.classList.toggle("dark",m==="dark"); document.documentElement.style.colorScheme=m;}, MODE);
await page.waitForTimeout(2000);

// Inject a busy high-frequency backdrop DIRECTLY behind the eyeglass card, and make the
// intervening card translucent enough that the busy field reaches the pill's backdrop.
// This isolates the refraction: a glass-lens pill will WARP the stripes at its rim; a
// blur-only capsule pill will only BLUR them (no displacement). Runtime-only (no src edit).
await page.evaluate(() => {
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const card = s.closest(".glass-card");
    // A fixed busy pattern layer BEHIND the card (a high-contrast diagonal + checker mix).
    const bg = document.createElement("div");
    bg.id = "refract-test-bg";
    bg.style.cssText = "position:fixed;inset:0;z-index:0;background:"+
      "repeating-linear-gradient(45deg,#001a33 0 10px,#66ccff 10px 20px),"+
      "repeating-linear-gradient(-45deg,rgba(255,0,128,0.5) 0 14px,rgba(0,0,0,0) 14px 28px);"+
      "background-blend-mode:screen;";
    document.body.insertBefore(bg, document.body.firstChild);
    // Neutralize the card so the busy field reaches the pills (keep a light frost so we lens a
    // frosted-busy field per signature #7). Reduce opacity + drop its own blur so structure survives.
    card.style.background = "transparent";
    card.style.backdropFilter = "none";
    card.style.webkitBackdropFilter = "none";
    card.style.boxShadow = "none";
    card.style.border = "none";
    // Also raise the eyeglass card above the aurora so the test bg (z0) shows through
    card.style.position = "relative";
    card.style.zIndex = "2";
    // Hide the aurora canvas so it doesn't wash the test pattern
    const c = document.querySelector("canvas.aurora-canvas"); if (c) c.style.opacity = "0";
});
await page.waitForTimeout(600);

// Capture the eyeglass pill region zoomed (device-scale 3 for detail)
const rects = await page.evaluate(() => {
    const eg = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass"));
    const plain = Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>!x.hasAttribute("data-eyeglass") && x.querySelector(".segmented-indicator--anchor"));
    function box(s){ const ind=s.querySelector(".segmented-indicator"); const r=ind.getBoundingClientRect(); return {x:Math.round(r.left-30),y:Math.round(r.top-24),width:Math.round(r.width+60),height:Math.round(r.height+48)};}
    // scroll eyeglass into view
    eg.scrollIntoView({block:"center"});
    return { eg: box(eg) };
});
await page.waitForTimeout(500);
// re-measure after scroll
const egBox = await page.evaluate(()=>{ const eg=Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass")); const ind=eg.querySelector(".segmented-indicator"); const r=ind.getBoundingClientRect(); return {x:Math.round(r.left-40),y:Math.round(r.top-30),width:Math.round(r.width+80),height:Math.round(r.height+60)}; });
await page.screenshot({ path: `${OUT}chrome__refract_busy_eyeglass_${MODE}.png`, clip: egBox });
// Also a wider shot showing the whole strip over the busy field
const stripBox = await page.evaluate(()=>{ const eg=Array.from(document.querySelectorAll(".segmented-tabs")).find((x)=>x.hasAttribute("data-eyeglass")); const r=eg.getBoundingClientRect(); return {x:Math.round(r.left-10),y:Math.round(r.top-20),width:Math.round(r.width+20),height:Math.round(r.height+40)}; });
await page.screenshot({ path: `${OUT}chrome__refract_busy_strip_${MODE}.png`, clip: stripBox });
console.log("REFRACT shots saved", JSON.stringify(egBox), JSON.stringify(stripBox));
await page.close();
await browser.close().catch(()=>{});
