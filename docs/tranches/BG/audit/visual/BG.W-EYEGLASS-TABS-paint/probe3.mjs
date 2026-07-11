// Probe 3 — full route staging + backdrop analysis behind the eyeglass card.
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
await page.evaluate((m) => { try{localStorage.setItem("vueuse-color-scheme",m);}catch{} document.documentElement.classList.toggle("dark", m==="dark"); document.documentElement.style.colorScheme=m; }, MODE);
await page.waitForTimeout(2500);

const staging = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll("canvas")).map((c) => {
        const r = c.getBoundingClientRect();
        return { cls: c.className, w: Math.round(r.width), h: Math.round(r.height), pos: getComputedStyle(c).position, z: getComputedStyle(c).zIndex };
    });
    const s = Array.from(document.querySelectorAll(".segmented-tabs")).find((x) => x.hasAttribute("data-eyeglass"));
    const card = s.closest(".glass-card");
    const cardCs = card ? getComputedStyle(card) : null;
    // walk up to find what paints behind the card
    const bgChain = [];
    let el = card;
    for (let i=0; i<6 && el; i++){ const cs=getComputedStyle(el); bgChain.push({ tag: el.tagName, cls: (el.className||"").toString().slice(0,50), bg: cs.backgroundColor, bd: cs.backdropFilter.slice(0,30) }); el = el.parentElement; }
    return {
        canvasCount: canvases.length, canvases,
        cardBg: cardCs ? cardCs.backgroundColor : null,
        cardBackdrop: cardCs ? cardCs.backdropFilter : null,
        bgChain,
    };
});
console.log("STAGING:", JSON.stringify(staging, null, 2));
// Full page shot
await page.screenshot({ path: `${OUT}chrome__route_full_${MODE}.png`, fullPage: true });
console.log("FULL_SHOT saved");
await page.close();
await browser.close().catch(()=>{});
