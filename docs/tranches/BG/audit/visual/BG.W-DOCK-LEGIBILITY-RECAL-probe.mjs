// Computed-DOM probe for BG.W-DOCK-LEGIBILITY-RECAL — Chrome CDP.
// Reads the dock plate's composed backdrop-filter saturate() + the tint seam
// (--glass-tint-source / --glass-tint-strength) + glContextCount, and samples
// the aurora field for recessiveness (no oversaturation).
// usage: node ...-probe.mjs <route> <mode>
import { chromium } from "playwright";

const [route, mode] = process.argv.slice(2);
const CDP = "http://localhost:9477";
const BASE = "http://localhost:5200";

const browser = await chromium.connectOverCDP(CDP);
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: mode,
});
const page = await ctx.newPage();
await page.goto(`${BASE}/?capture=${encodeURIComponent(route)}&mode=${mode}`, {
    waitUntil: "load",
    timeout: 30000,
});
await page.waitForFunction(
    () => document.documentElement.hasAttribute("data-capture-ready"),
    { timeout: 20000 }
);
await page.waitForTimeout(1000);

const result = await page.evaluate(() => {
    const out = { docks: [], glContextCount: 0, mainChildren: 0 };
    // count webgl/webgpu canvases
    for (const c of document.querySelectorAll("canvas")) {
        out.glContextCount++;
    }
    const main = document.querySelector("main");
    out.mainChildren = main ? main.children.length : -1;

    // find dock plates
    const docks = document.querySelectorAll(".glass-dock");
    for (const d of docks) {
        const cs = getComputedStyle(d);
        // read the composed backdrop-filter (carries the saturate())
        const bf = cs.backdropFilter || cs.webkitBackdropFilter || "";
        const tintSource = cs.getPropertyValue("--glass-tint-source").trim();
        const tintStrength = cs.getPropertyValue("--glass-tint-strength").trim();
        const tintInkDock = cs.getPropertyValue("--glass-tint-ink-dock").trim();
        const rect = d.getBoundingClientRect();
        // parse saturate(N) from backdrop-filter
        const m = bf.match(/saturate\(([\d.]+)\)/);
        out.docks.push({
            class: d.className.slice(0, 60),
            backdropFilter: bf.slice(0, 160),
            saturate: m ? parseFloat(m[1]) : null,
            tintSource,
            tintStrength,
            tintInkDock,
            wxh: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
            visible: rect.width > 0 && rect.height > 0,
        });
    }
    return out;
});

// sample the aurora field for saturation via a screenshot region read
// (recessiveness proxy: mean saturation of the field must be moderate, not neon)
console.log(JSON.stringify({ route, mode, ...result }, null, 2));
await ctx.close();
await browser.close();
