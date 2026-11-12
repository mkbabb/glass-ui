// Frames of the hero blob after a fast sweep and a release, for one tree.
//   node frames-probe.mjs <base-url> <label>
import { chromium } from "playwright";
const [base, label] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    const context = await browser.newContext({ viewport: { width: 800, height: 700 } });
    try {
        const page = await context.newPage();
        await page.goto(`${base}/tests-visual/release-11-0-2/blob-harness.html`);
        await page.locator(".goo-blob-canvas").waitFor();
        await page.waitForTimeout(1500);
        const api = await page.evaluate(() => document.querySelector(".goo-blob-canvas")?.getAttribute("data-api") ?? null);
        const box = await page.locator(".goo-blob-canvas").boundingBox();
        const hit = await page.evaluate(() => [...document.querySelectorAll(".goo-blob-wrapper *")].map((e) => e.className));
        const cx = box.x + box.width / 2, cy = box.y + box.height / 2;
        await page.mouse.move(cx - box.width, cy);
        await page.waitForTimeout(800);
        for (let i = 0; i <= 12; i++) await page.mouse.move(cx - box.width * 0.7 + i * box.width * 0.12, cy + Math.sin(i / 2) * box.height * 0.15);
        await page.waitForTimeout(0);
        for (const ms of [0, 50, 100, 150, 300]) {
            await page.screenshot({ clip: box, path: `${label}-${ms}.png` });
            await page.waitForTimeout(50);
        }
        console.log(JSON.stringify({ api, box, hit }));
    } finally { await context.close(); }
} finally { await browser.close(); }
