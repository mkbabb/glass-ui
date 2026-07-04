// Deep DOM probe for signal-truth criteria across the three routes.
import { chromium } from "playwright";
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";
const ROUTE = process.argv[2];
const MODE = process.argv[3] || "light";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: MODE });
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent(ROUTE)}&mode=${MODE}`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 30000 });
// give the observer a moment to run its sample loop
await page.waitForTimeout(1500);

const out = await page.evaluate(() => {
    const q = (s) => Array.from(document.querySelectorAll(s));
    const glassDock = q(".glass-dock");
    const dockInfo = glassDock.map(el => {
        const cs = getComputedStyle(el);
        return {
            cls: (typeof el.className === "string" ? el.className : "").slice(0, 80),
            sampledAttr: el.getAttribute("data-backdrop-sampled"),
            autoLuminance: el.getAttribute("auto-luminance"),
            luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
            hue: cs.getPropertyValue("--glass-ambient-hue").trim(),
            ambient: cs.getPropertyValue("--glass-ambient-strength").trim(),
            sampledVar: cs.getPropertyValue("--glass-backdrop-sampled").trim(),
            backdrop: cs.getPropertyValue("--glass-backdrop").trim(),
        };
    });
    const clearPlates = q(".glass-clear").map(el => {
        const cs = getComputedStyle(el);
        return {
            cls: (typeof el.className === "string" ? el.className : "").slice(0, 60),
            scrimStrength: cs.getPropertyValue("--glass-clear-scrim-strength").trim(),
            luma: cs.getPropertyValue("--glass-backdrop-luma").trim(),
            bg: cs.backgroundColor,
            beforeBg: getComputedStyle(el, "::before").background.slice(0, 120),
        };
    });
    const allSampled = q("[data-backdrop-sampled]").length;
    // Does the CSS cascade define --glass-clear-scrim-strength anywhere resolvable?
    const rootScrim = getComputedStyle(document.documentElement).getPropertyValue("--glass-clear-scrim-strength").trim();
    // Any element resolving a non-empty --glass-backdrop-hue (the dead channel)?
    let deadHueHits = 0;
    for (const el of q("*")) {
        if (getComputedStyle(el).getPropertyValue("--glass-backdrop-hue").trim()) deadHueHits++;
        if (deadHueHits > 3) break;
    }
    return {
        route: location.search,
        dockCount: glassDock.length,
        dockInfo: dockInfo.slice(0, 4),
        clearCount: clearPlates.length,
        clearPlates: clearPlates.slice(0, 4),
        totalSampled: allSampled,
        rootScrimStrength: rootScrim || "(empty)",
        deadHueHits,
    };
});
console.log(JSON.stringify(out, null, 2));
await ctx.close();
await browser.close();
