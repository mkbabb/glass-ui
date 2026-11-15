// Critic 1: captures the slider-at-minimum harness (light and dark) from one served tree, so
// the cell's reading can be re-read against paint. One browser, one context per shot, both
// closed in finally. Run under guarded, with the tree's own vite started by the caller.
//   node slider-min-capture.mjs <base-url> <out-prefix>
import { chromium } from "playwright";
const [base, out] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    for (const scheme of ["light", "dark"]) {
        const context = await browser.newContext({ viewport: { width: 420, height: 300 }, deviceScaleFactor: 3, colorScheme: scheme });
        try {
            const page = await context.newPage();
            await page.goto(`${base}/tests-visual/release-11-0-2/slider-harness.html`);
            await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
            if (scheme === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
            await page.waitForTimeout(500);
            await page.screenshot({ path: `${out}-${scheme}.png`, clip: { x: 30, y: 30, width: 280, height: 180 } });
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
