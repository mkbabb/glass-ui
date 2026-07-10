// Studio-body scroll capture — scroll the configurator into view (inner scroller) then screenshot.
// Supplementary visual proof of the STANDARDIZED studio frame (stage LEFT, controls RIGHT).
// argv: <route> <mode>  ; connects to CDP_URL.
import { chromium } from "playwright";

const route = process.argv[2];
const mode = process.argv[3];
const CDP = process.env.CDP_URL || "http://localhost:9334";
const OUT = new URL(".", import.meta.url).pathname;
const slug = route.replace(/^\//, "").replace(/\//g, "-");

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
const url = `http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=${mode}`;
await page.goto(url, { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) {
    const ready = await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"));
    if (ready) break;
    await page.waitForTimeout(150);
}
await page.waitForTimeout(500);
// scroll the configurator into view within its scroll ancestor
const scrolled = await page.evaluate(() => {
    const cfg = document.querySelector('[data-slot="configurator"]');
    if (!cfg) return { ok: false };
    cfg.scrollIntoView({ block: "center", inline: "nearest" });
    // small nudge upward so the top of the studio + section heading read
    const scroller = document.querySelector("main");
    return { ok: true, cfgTop: cfg.getBoundingClientRect().top };
});
await page.waitForTimeout(900); // let viz repaint after scroll + any scroll-driven reveal settle
const outPath = `${OUT}studio-body-${slug}-chrome-${mode}.png`;
await page.screenshot({ path: outPath, fullPage: false });
console.log(JSON.stringify({ route, mode, scrolled, out: outPath.split("/").pop() }));
await page.close();
await browser.close();
