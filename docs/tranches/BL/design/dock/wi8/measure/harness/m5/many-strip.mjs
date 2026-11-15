// many-strip.mjs <port> <out-dir> <engine> [label]: MEASURE-5, step 7. O-358's seven-seat dock (five tabs,
// two avatar seats) open at rest at 360 and 390, by a touch tap, shot as an element crop with 24 px of
// ground round it (Playwright's headless page screenshot; no screencapture). Also scrolled to its end.
// One browser, a new context per cell, everything closed in finally. Writes <out>/many.<engine>.<w>.<pos>.png.
import { chromium, webkit } from "playwright";
import { mkdirSync } from "node:fs";
const [port, out, eng] = process.argv.slice(2);
mkdirSync(out, { recursive: true });
const B = eng === "webkit" ? webkit : chromium;
const browser = await B.launch({ headless: true, ...(eng === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
try {
    for (const w of [360, 390]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: eng !== "webkit" });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-many`);
            await page.waitForSelector("[data-testid=w-many]");
            await page.waitForTimeout(600);
            await page.locator("[data-testid=w-many] .dock-layer--summary").tap();
            await page.waitForTimeout(1200);
            const shot = async (pos) => {
                const b = await page.locator("[data-testid=w-many]").boundingBox();
                await page.screenshot({ path: `${out}/many.${eng}.${w}.${pos}.png`, clip: { x: Math.max(0, b.x - 24), y: b.y - 24, width: Math.min(w, b.width + 48), height: b.height + 48 } });
                return await page.evaluate(() => {
                    const run = document.querySelector("[data-testid=w-many] .dock-run.is-active");
                    const seats = [...run.children].filter((c) => c.offsetParent);
                    const rr = run.getBoundingClientRect();
                    return { dock: document.querySelector("[data-testid=w-many]").getBoundingClientRect().width, run: rr.width, whole: run.hasAttribute("data-run-whole"), scroll: run.scrollLeft, seats: seats.map((c) => { const r = c.getBoundingClientRect(); return +(Math.max(0, Math.min(r.right, rr.right) - Math.max(r.left, rr.left)) / r.width).toFixed(2); }) };
                });
            };
            const a = await shot("start");
            await page.evaluate(() => { const run = document.querySelector("[data-testid=w-many] .dock-run.is-active"); run.scrollTo({ left: run.scrollWidth, behavior: "instant" }); });
            await page.waitForTimeout(600);
            const z = await shot("end");
            console.log(JSON.stringify({ eng, w, start: a, end: z }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser.close();
}
