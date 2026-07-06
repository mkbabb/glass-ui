import { chromium } from "playwright";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto("http://localhost:5200/?capture=%2Fsubstrates%2Fconcentric&mode=light", { waitUntil: "load" });
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await page.waitForTimeout(150);
}
const info = await page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    return canvases.map((c, i) => {
        const r = c.getBoundingClientRect();
        // ancestry chain of classes
        let chain = [];
        let el = c;
        for (let d = 0; d < 6 && el; d++) {
            chain.push((el.tagName || "").toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.split(/\s+/).slice(0, 3).join(".") : ""));
            el = el.parentElement;
        }
        const cs = getComputedStyle(c);
        return {
            i, dw: c.width, dh: c.height,
            rect: { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) },
            opacity: cs.opacity, position: cs.position, zIndex: cs.zIndex, visibility: cs.visibility,
            chain,
        };
    });
});
console.log(JSON.stringify(info, null, 2));
await page.close();
await browser.close();
