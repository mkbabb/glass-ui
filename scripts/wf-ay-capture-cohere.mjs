// AY.W-LIVE1 freshness re-capture — the W-COHERE four-substrate SET contact sheet
// re-shot on the CURRENT tree (the colocation constants extraction touched the
// declared surface paths after the original capture commit; behavior-identical by
// the unit fleets, but the cardinal gate's freshness clause demands pixels, not
// prose). Re-shoots the SAME scenes the original W-COHERE step captured, per
// viewport × scheme:
//   blob          : the goo-blob canvas element crop on /substrates/blob
//   constellation : the composed scene viewport shot on /substrates/constellation
//   fourier       : the fourier-field story shot on /substrates/fourier-field
//   dock          : the vertical glass rail element crop (desktop) + the composed
//                   mobile viewport, on the constellation scene (the rail floats
//                   over the lattice — the set's reference pairing)
//
// Modeled on scripts/wf-ay-capture-blob2.mjs. The blob/constellation/fourier routes
// carry no live Aurora (no ReadPixels stall) — normal headless captures run clean.

import { resolve } from "node:path";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const VISUAL_DIR = resolve(ROOT, "docs/tranches/AY/audit/visual");
const BASE_URL = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

const VIEWPORTS = [
    { id: "desktop1280", width: 1280, height: 800 },
    { id: "mobile390", width: 390, height: 844 },
];
const THEMES = ["light", "dark"];

async function shoot(browser, { route, vp, theme, name, crop }) {
    const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme === "dark" ? "dark" : "light",
    });
    const page = await ctx.newPage();
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
    await page.evaluate((dark) => {
        document.documentElement.classList.toggle("dark", dark);
    }, theme === "dark");
    if (crop) {
        const el = page.locator(crop).first();
        await el.waitFor({ state: "visible", timeout: 15_000 });
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1400);
        await el.screenshot({ path: resolve(VISUAL_DIR, name) });
    } else {
        await page.waitForTimeout(1400);
        await page.screenshot({ path: resolve(VISUAL_DIR, name) });
    }
    await ctx.close();
    return name;
}

async function run() {
    mkdirSync(VISUAL_DIR, { recursive: true });
    const browser = await chromium.launch();
    const captured = [];
    try {
        for (const vp of VIEWPORTS) {
            for (const theme of THEMES) {
                // blob — the warm-cream gel bead element crop.
                captured.push(
                    await shoot(browser, {
                        route: "/substrates/blob",
                        vp,
                        theme,
                        name: `W-COHERE-blob-${vp.id}-${theme}.png`,
                        crop: '[data-testid="goo-blob-canvas"]',
                    }),
                );
                // constellation — the composed scene (lattice + floating rail).
                captured.push(
                    await shoot(browser, {
                        route: "/substrates/constellation",
                        vp,
                        theme,
                        name: `W-COHERE-constellation-${vp.id}-${theme}.png`,
                    }),
                );
                // fourier — the comet field story.
                captured.push(
                    await shoot(browser, {
                        route: "/substrates/fourier-field",
                        vp,
                        theme,
                        name: `W-COHERE-fourier-${vp.id}-${theme}.png`,
                    }),
                );
                // dock — the vertical glass rail crop (desktop) / the composed
                // mobile viewport over the constellation scene.
                captured.push(
                    await shoot(browser, {
                        route: "/substrates/constellation",
                        vp,
                        theme,
                        name: `W-COHERE-dock-${vp.id}-${theme}.png`,
                        crop: vp.id === "desktop1280" ? ".glass-dock" : undefined,
                    }),
                );
            }
        }
        console.log(`captured ${captured.length}/16:`);
        for (const n of captured) console.log(`  ${n}`);
    } finally {
        await browser.close();
    }
}

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
