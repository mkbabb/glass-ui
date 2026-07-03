// BG.W-DOCK-INPLACE-MORPH — NON-AUTHORING interactive runtime probe (CDP -> real Chrome).
// Drives the LIVE (non-capture) /dock/overview shell, fires the in-dock morph trigger, and
// samples the runtime to confirm the HEADLINE: the in-dock button flips the REAL <aside> nav
// dock V<->H IN PLACE via the liquid teardrop. Confirms:
//  - the settled aside starts orientation=vertical
//  - firing `glass-ui-demo:toggle-dock-morph` DRIVES `--dock-morph-t` off 0 (the scalar field,
//    not a one-frame VT snap) + writes `--dock-morph-v` (the analytic-velocity squish)
//  - the `.dock-morph-bridge--inplace` liquid-teardrop bridge MOUNTS during the flight
//  - the goo teardrop filter engages in the occluded midpoint window
//  - after settle the aside `[data-shell-dock-orientation]` FLIPS to horizontal (a real V->H)
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { chromium } = require("playwright");

const OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DOCK-INPLACE-MORPH-paint";
const browser = await chromium.connectOverCDP("http://localhost:9466");
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto("http://localhost:5200/dock/overview", { waitUntil: "load", timeout: 30000 });
await page.waitForSelector("aside.demo-sidebar-rail", { timeout: 15000 });
await page.waitForTimeout(800);

const initial = await page.evaluate(() => {
    const aside = document.querySelector("aside.demo-sidebar-rail");
    return {
        orientation: aside?.getAttribute("data-shell-dock-orientation") ?? null,
        dockMorphT: getComputedStyle(aside).getPropertyValue("--dock-morph-t").trim(),
        bridgePresent: !!document.querySelector(".dock-morph-bridge--inplace"),
    };
});

// Fire the in-dock morph trigger (the SAME window event both shell dock ⇄ buttons dispatch).
await page.evaluate(() => window.dispatchEvent(new CustomEvent("glass-ui-demo:toggle-dock-morph")));

// Sample the morph runtime over ~1.4s at ~40ms cadence.
const samples = [];
for (let i = 0; i < 36; i++) {
    const s = await page.evaluate(() => {
        const aside = document.querySelector("aside.demo-sidebar-rail");
        const cs = getComputedStyle(aside);
        const bridge = document.querySelector(".dock-morph-bridge--inplace");
        let gooFilter = null;
        if (bridge) {
            const gooEl = bridge.querySelector(".dock-morph-bridge-goo");
            if (gooEl) gooFilter = getComputedStyle(gooEl).getPropertyValue("--dock-bridge-goo-filter").trim();
        }
        return {
            t: parseFloat(cs.getPropertyValue("--dock-morph-t").trim() || "0"),
            v: parseFloat(cs.getPropertyValue("--dock-morph-v").trim() || "0"),
            stretch: parseFloat(cs.getPropertyValue("--stretch").trim() || "1"),
            orientation: aside.getAttribute("data-shell-dock-orientation"),
            morphing: aside.hasAttribute("data-dock-morphing"),
            bridge: !!bridge,
            gooFilter,
        };
    });
    samples.push(s);
    await page.waitForTimeout(40);
}
await page.waitForTimeout(600);
const settled = await page.evaluate(() => {
    const aside = document.querySelector("aside.demo-sidebar-rail");
    return {
        orientation: aside.getAttribute("data-shell-dock-orientation"),
        morphing: aside.hasAttribute("data-dock-morphing"),
        dockMorphT: parseFloat(getComputedStyle(aside).getPropertyValue("--dock-morph-t").trim() || "0"),
        bridgePresent: !!document.querySelector(".dock-morph-bridge--inplace"),
    };
});

const tPeak = Math.max(...samples.map(s => s.t));
const vPeak = Math.max(...samples.map(s => Math.abs(s.v)));
const stretchPeak = Math.max(...samples.map(s => s.stretch));
const anyBridge = samples.some(s => s.bridge);
const anyMorphing = samples.some(s => s.morphing);
const anyGooEngaged = samples.some(s => s.gooFilter && s.gooFilter.includes("dock-morph-goo"));
const distinctTValues = new Set(samples.map(s => s.t.toFixed(3))).size;

const out = {
    initial, settled,
    tPeak, vPeak, stretchPeak, distinctTValues,
    anyBridge, anyMorphing, anyGooEngaged,
    flipped: initial.orientation !== settled.orientation,
    scalarDrove: tPeak > 0.05 && distinctTValues > 3, // not a one-frame VT snap
    samplesHead: samples.slice(0, 24),
};
writeFileSync(`${OUT}/interactive-runtime.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify({
    initialOrientation: initial.orientation,
    settledOrientation: settled.orientation,
    flipped: out.flipped,
    tPeak: +tPeak.toFixed(3), vPeak: +vPeak.toFixed(3), stretchPeak: +stretchPeak.toFixed(3),
    distinctTValues, scalarDrove: out.scalarDrove,
    anyBridge, anyMorphing, anyGooEngaged,
}, null, 2));
await ctx.close();
await browser.close();
