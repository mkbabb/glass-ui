const { chromium } = require("playwright");
const path = "/Users/mkbabb/Programming/glass-ui/docs/tranches/AY/audit/design-r2/captures";
(async () => {
    const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
    const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 })).newPage();
    await page.goto("http://localhost:5199/compositions/auth-shell", { waitUntil: "load" });
    await page.waitForTimeout(3000);
    const toggle = page.locator(".dark-mode-toggle-button, [class*=dark-mode-toggle]").first();
    const n = await page.locator(".dark-mode-toggle-button, [class*=dark-mode-toggle]").count();
    console.log("toggles found:", n);
    if (n > 0) {
        await toggle.click();
        await page.waitForTimeout(2200);
        await page.screenshot({ path: `${path}/X-auth-shell-dark-intoggle.png` });
        console.log("OK in-app dark");
    } else {
        console.log("NO TOGGLE FOUND — dumping candidates");
        const btns = await page.locator("button").evaluateAll((els) => els.map((e) => e.getAttribute("aria-label") || e.className).slice(0, 30));
        console.log(JSON.stringify(btns, null, 0).slice(0, 800));
    }
    await browser.close();
})();
