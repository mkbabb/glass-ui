// reread.mjs <port> <cell>: which flag a trigger frame's second read follows (the dock:reread mark's detail).
import { chromium } from "playwright";
const [port, cell] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`);
    await page.waitForSelector(`[data-testid=${cell}]`);
    await page.waitForTimeout(600);
    const b = await page.locator(`[data-testid=${cell}]`).boundingBox();
    for (let k = 0; k < 2; k++) {
        await page.evaluate(() => performance.clearMarks());
        await page.mouse.move(b.x + b.width / 2 - 5, b.y + b.height / 2);
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 3 });
        await page.waitForTimeout(1200);
        const un = await page.evaluate(() => performance.getEntriesByType("mark").filter((m) => m.name.startsWith("dock:")).map((m) => m.name.slice(5) + (m.detail ? JSON.stringify(m.detail) : "")));
        await page.evaluate(() => performance.clearMarks());
        await page.mouse.click(4, 4);
        await page.waitForTimeout(1200);
        const fo = await page.evaluate(() => performance.getEntriesByType("mark").filter((m) => m.name.startsWith("dock:")).map((m) => m.name.slice(5) + (m.detail ? JSON.stringify(m.detail) : "")));
        console.log(k, "unfold", un.join(" "), "| fold", fo.join(" "));
    }
    await ctx.close();
} finally {
    await browser.close();
}
