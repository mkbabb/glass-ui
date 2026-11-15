// Fix seat 2: captures the scrubber at 0, 50 and 100 (geometry harness, sm/md/lg) at 3x in
// light and dark, so the thumb's paint is judged by eye. One browser, one context per
// theme, closed in finally.
//   node slider-capture.mjs <base-url> <out-prefix> [css]
import { chromium } from "playwright";

const [base, out, css = ""] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    for (const theme of ["light", "dark"]) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 3 });
        try {
            const page = await context.newPage();
            for (const value of [0, 50, 100]) {
                await page.goto(`${base}/tests-visual/release-11-0-2/geometry-harness.html?value=${value}&theme=${theme}`);
                await page.locator("body[data-ready='1'] [data-cell] .slider-thumb").first().waitFor();
                if (css) await page.addStyleTag({ content: css });
                await page.waitForTimeout(300);
                for (const size of ["sm", "lg"]) {
                    const b = await page.locator(`[data-cell="scrubber-${size}-horizontal"] .slider-track`).evaluate((t) => {
                        const r = t.getBoundingClientRect();
                        return { x: r.x, y: r.y, w: r.width, h: r.height };
                    });
                    await page.screenshot({ path: `${out}-${theme}-${size}-${value}.png`, clip: { x: b.x - 8, y: b.y - 8, width: b.w + 16, height: b.h + 16 } });
                }
            }
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
