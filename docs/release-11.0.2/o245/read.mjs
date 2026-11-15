// The O-245 read: the dark gloss card's plate layers with the pointer away from the
// card and on it, and a crop of each, for one tree.
//   node read.mjs <base-url> <label>
import { chromium } from "playwright";
const [base, label] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    const context = await browser.newContext({ viewport: { width: 900, height: 600 }, colorScheme: "dark" });
    try {
        const page = await context.newPage();
        await page.goto(`${base}/docs/release-11.0.2/o245/harness/index.html`);
        const card = page.locator('[data-probe="card"]');
        await card.waitFor();
        await page.waitForTimeout(800);
        const read = () =>
            page.evaluate(() => {
                const el = document.querySelector('[data-probe="card"]');
                const cs = getComputedStyle(el);
                const b = getComputedStyle(el, "::before");
                const a = getComputedStyle(el, "::after");
                return {
                    classes: el.className,
                    boxShadow: cs.boxShadow,
                    backgroundImage: cs.backgroundImage,
                    backgroundColor: cs.backgroundColor,
                    before: { content: b.content, opacity: b.opacity, background: b.backgroundImage, blend: b.mixBlendMode },
                    after: { content: a.content, opacity: a.opacity, background: a.backgroundImage },
                };
            });
        await page.mouse.move(10, 10);
        await page.waitForTimeout(500);
        const away = await read();
        const box = await card.boundingBox();
        const clip = { x: box.x - 30, y: box.y - 30, width: box.width + 60, height: box.height + 60 };
        await page.screenshot({ path: `${label}-away.png`, clip });
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(500);
        const on = await read();
        await page.screenshot({ path: `${label}-on.png`, clip });
        console.log(JSON.stringify({ label, away, on }, null, 1));
    } finally { await context.close(); }
} finally { await browser.close(); }
