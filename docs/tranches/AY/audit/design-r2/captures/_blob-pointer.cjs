const { chromium } = require("playwright");
const path = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AY/audit/design-r2/captures";
(async () => {
    const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })).newPage();
    await page.goto("http://localhost:5199/substrates/blob", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    const canvas = page.locator("canvas").first();
    await canvas.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1200);
    const box = await canvas.boundingBox();
    console.log("canvas box", JSON.stringify(box));
    if (box) {
        for (let i = 0; i <= 10; i++) {
            await page.mouse.move(box.x + box.width * (0.15 + 0.05 * i), box.y + box.height * 0.55);
            await page.waitForTimeout(60);
        }
        await page.waitForTimeout(600);
    }
    await page.screenshot({ path: `${path}/X-blob-pointer.png` });
    // click impulse
    if (box) {
        await page.mouse.click(box.x + box.width * 0.65, box.y + box.height * 0.5);
        await page.waitForTimeout(350);
    }
    await page.screenshot({ path: `${path}/X-blob-click.png` });
    console.log("OK blob states");
    await browser.close();
})();
