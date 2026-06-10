// D4-glass-grid-math lane — suffusion-map capture (READ-ONLY audit).
// Visits representative thin content pages + the suffused references and
// captures full-page PNGs into this ground dir, prefixed d4-.
import { chromium } from "playwright";

const BASE = "http://localhost:5199";
const OUT = new URL(".", import.meta.url).pathname;

const ROUTES = [
    // THIN content pages (no declared background — the quiet default).
    ["forms/inputs", "d4-thin-forms-inputs"],
    ["data/table", "d4-thin-data-table"],
    ["data/data-table", "d4-thin-data-datatable"],
    ["compositions/settings", "d4-thin-settings"],
    ["compositions/form-validation", "d4-thin-form-validation"],
    ["containers/dialog", "d4-thin-dialog"],
    ["feedback/alert", "d4-thin-feedback-alert"],
    ["display/buttons", "d4-thin-display-buttons"],
    ["display/card", "d4-thin-display-card"],
    ["containers/accordion", "d4-thin-accordion"],
    ["composables/use-token-color", "d4-thin-composable"],
    ["motion/curve-gallery", "d4-thin-curve-gallery"],
    // SUFFUSED references (declared background).
    ["data/metric-cell", "d4-suf-metric-cell-grid"],
    ["compositions/math-paper", "d4-suf-math-paper-grid"],
    ["foundations/paper-glass", "d4-suf-paper-glass-hero"],
    ["foundations/intro", "d4-suf-intro-aurora-hero"],
    // DOCK (R3-1/2) + over-spend checks.
    ["dock/layers", "d4-dock-layers"],
    ["dock/overview", "d4-dock-overview"],
    ["compositions/instrument-chassis", "d4-comp-instrument-chassis"],
    ["substrates/glass-material", "d4-substrate-glass-material"],
];

const browser = await chromium.launch();
const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 1,
});

// Park any live WebGL/canvas substrate before capture (avoid mid-frame noise).
async function park() {
    await page.evaluate(() => {
        Object.defineProperty(document, "hidden", {
            value: true,
            configurable: true,
        });
        document.dispatchEvent(new Event("visibilitychange"));
    });
}

for (const [route, name] of ROUTES) {
    try {
        await page.goto(`${BASE}/${route}`, {
            waitUntil: "networkidle",
            timeout: 20000,
        });
        await page.waitForTimeout(900);
        await park();
        await page.waitForTimeout(300);
        await page.screenshot({
            path: `${OUT}${name}.png`,
            fullPage: true,
        });
        console.log(`OK  ${route} -> ${name}.png`);
    } catch (e) {
        console.log(`ERR ${route}: ${e.message}`);
    }
}

await browser.close();
console.log("DONE");
