import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const ROUTE = "/substrates/liquid-grid";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0];
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=light`, {
    waitUntil: "load",
});
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready")))
        break;
    await page.waitForTimeout(150);
}
const info = await page.evaluate(() => {
    const cvs = [...document.querySelectorAll("canvas")].map((c) => {
        const r = c.getBoundingClientRect();
        // walk up for identifying class
        let anc = c;
        const classes = [];
        for (let i = 0; i < 5 && anc; i++) {
            classes.push(anc.className && anc.className.toString ? anc.className.toString() : "");
            anc = anc.parentElement;
        }
        // detect gl type
        let type = "unknown";
        try {
            if (c.getContext && c.__probe !== 1) {
                // avoid clobbering: create fresh detection via attributes is impossible;
                // infer from testid/class
            }
        } catch (e) {}
        return {
            w: c.width,
            h: c.height,
            rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
            testid: c.getAttribute("data-testid"),
            cls: c.className.toString(),
            ancestry: classes,
        };
    });
    // page scroll height
    return {
        scrollH: document.documentElement.scrollHeight,
        viewportH: window.innerHeight,
        canvases: cvs,
    };
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await browser.close();
