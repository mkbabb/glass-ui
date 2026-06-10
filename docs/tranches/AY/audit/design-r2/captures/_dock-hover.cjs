const { chromium } = require("playwright");
const path = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AY/audit/design-r2/captures";
(async () => {
    const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })).newPage();
    await page.goto("http://localhost:5199/dock/overview", { waitUntil: "load" });
    await page.waitForTimeout(2500);
    // the first specimen dock lives inside the story content, not the shell rail
    const specimen = page.locator("main .glass-dock, [class*=story] .glass-dock").first();
    const box = await specimen.boundingBox();
    console.log("specimen box", JSON.stringify(box));
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(1600);
    }
    await page.screenshot({ path: `${path}/X-dock-overview-expanded.png` });
    console.log("OK dock hover");
    await browser.close();
})();
