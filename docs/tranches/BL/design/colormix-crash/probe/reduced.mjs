// Loads the reduced test case in one engine and records whether the page process
// aborts. One browser per run, one context, both closed in finally.
//
// usage: node reduced.mjs <reduced.html> <webkit|chromium> <out.json>
import { webkit, chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";

const [FILE, NAME, OUT] = process.argv.slice(2);
const engine = NAME === "chromium" ? chromium : webkit;
const html = readFileSync(FILE, "utf8");

let browser;
const row = { engine: NAME, crashed: false, resolved: null, error: null };
try {
    browser = await engine.launch({ headless: true });
    row.version = browser.version();
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        page.on("crash", () => { row.crashed = true; });
        await page.setContent(html, { timeout: 10000 });
        await page.waitForTimeout(300);
        row.resolved = await page.evaluate(() => getComputedStyle(document.querySelector(".box")).backgroundColor);
    } catch (e) {
        row.error = String(e.message || e).split("\n")[0];
    } finally {
        await context.close().catch(() => {});
    }
} finally {
    if (browser) await browser.close().catch(() => {});
}
console.log(JSON.stringify(row));
writeFileSync(OUT, JSON.stringify(row, null, 1));
