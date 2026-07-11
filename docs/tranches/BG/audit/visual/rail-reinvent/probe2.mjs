// Probe 2 — resolve the φ² tokens to REAL px (probe-element offsetWidth), measure
// the fan CONTAINER bbox ratio, and pixel-read rest containment (no painted core
// pixel in the gutter past the dock edge) + the hairline presence.
import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9477";
const BASE = "http://localhost:5200";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: "light" });
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent("/dock/rail")}&mode=light`, { waitUntil: "load", timeout: 30000 });
await page.waitForFunction(() => document.documentElement.hasAttribute("data-capture-ready"), { timeout: 30000 });
await page.waitForTimeout(600);

const out = await page.evaluate(() => {
    const round = (n) => Math.round(n * 100) / 100;
    // resolve a token calc to px via a probe element
    function resolvePx(el, expr) {
        const p = document.createElement("div");
        p.style.cssText = `position:absolute;visibility:hidden;height:0;width:${expr}`;
        el.appendChild(p);
        const w = p.getBoundingClientRect().width;
        p.remove();
        return round(w);
    }
    const res = [];
    const stacks = Array.from(document.querySelectorAll(".dock-stack"));
    for (const stack of stacks) {
        const orient = stack.getAttribute("data-orientation");
        const frame = stack.closest(".glass-dock-frame");
        const dock = frame?.querySelector(".glass-dock");
        const dockBox = dock?.getBoundingClientRect();
        const overhang = resolvePx(stack, "var(--dock-rail-overhang)");
        const minor = resolvePx(stack, "var(--dock-rail-overhang-minor)");
        const span = resolvePx(stack, "var(--dock-rail-fan-span)");
        // hairline pseudo — read the ::before background + size
        const beforeBg = getComputedStyle(stack, "::before").backgroundColor;
        const beforeW = getComputedStyle(stack, "::before").inlineSize || getComputedStyle(stack, "::before").width;
        res.push({
            orient,
            tokenOverhang: overhang, tokenMinor: minor, tokenSpan: span,
            tokenRatio: minor ? round(overhang / minor) : null,
            hairlineBeforeBg: beforeBg, hairlineBeforeW: beforeW,
            dockRight: dockBox ? round(dockBox.right) : null,
            dockTop: dockBox ? round(dockBox.top) : null,
        });
    }
    return res;
});
console.log("TOKEN/HAIRLINE:", JSON.stringify(out, null, 2));

// Pixel-read: sample the SidebarDock core-row gutter (just OUTSIDE dock right edge)
// at REST — must be background (no core glass), and sample the hairline band.
const shot = await page.screenshot({ fullPage: false });
await ctx.close();
await browser.close();

import { PNG } from "pngjs";
const img = PNG.sync.read(shot);
const at = (x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i+1], img.data[i+2], img.data[i+3]]; };
// SidebarDock: dock right edge ≈ 79 CSS → 158 px. core row y≈604 CSS → 1208 px.
// gutter just outside: x 82..90 CSS → 164..180 px. Sample a few.
const rows = [1160, 1200, 1240];
console.log("\nGUTTER PIXELS just right of SidebarDock edge (rest, should be page bg, not glass):");
for (const y of rows) {
    const samples = [160, 168, 176, 184].map((x) => `x${x}:${at(x, y).slice(0,3).join(",")}`);
    console.log(`  y${y}: ${samples.join("  ")}`);
}
// hairline: at the core trailing edge x≈158 (79 CSS) band
console.log("\nHAIRLINE band at dock trailing edge (x156..160 px), core rows:");
for (const y of [1170, 1190, 1210, 1230]) {
    const samples = [150, 154, 156, 158, 160].map((x) => `x${x}:${at(x,y).slice(0,3).join(",")}`);
    console.log(`  y${y}: ${samples.join("  ")}`);
}
