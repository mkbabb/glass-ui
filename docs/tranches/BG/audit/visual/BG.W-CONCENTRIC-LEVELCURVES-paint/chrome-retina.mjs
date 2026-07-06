// Chrome retina (deviceScaleFactor=2 via CDP Emulation) concentric hero — confirm whether the
// dashed-contour defect persists at the criteria's 2880×1800-class resolution or is DPR-1 only.
import { chromium } from "playwright";
import { PNG } from "pngjs";
const CDP = process.env.CDP_URL || "http://localhost:9333";
function stats(buf) {
    const p = PNG.sync.read(buf), d = p.data, W = p.width, H = p.height;
    let s = 0; const luma = new Float64Array(W * H);
    for (let i = 0, q = 0; i < d.length; i += 4, q++) { const v = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; luma[q] = v; s += v; }
    let edge = 0, cnt = 0; for (let y = 0; y < H; y++) for (let x = 1; x < W; x++) { edge += Math.abs(luma[y * W + x] - luma[y * W + x - 1]); cnt++; }
    return { mean: +(s / (W * H) / 255).toFixed(5), edge: +(edge / cnt / 255).toFixed(5), w: W, h: H };
}
const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
const client = await page.context().newCDPSession(page);
await client.send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 2, mobile: false });
const mode = process.argv[2] || "light";
await page.goto(`http://localhost:5200/?capture=%2Fsubstrates%2Fconcentric&mode=${mode}`, { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); }
const conc = page.locator(".concentric-canvas");
await conc.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const OUT = new URL(".", import.meta.url).pathname;
const path = `${OUT}concentric-chrome-${mode}-hero-2x.png`;
await conc.screenshot({ path });
const buf = await conc.screenshot();
console.log("CHROME-2X " + JSON.stringify({ mode, path, ...stats(buf), backing: await page.evaluate(() => { const c = document.querySelector(".concentric-canvas"); return { cw: c.width, ch: c.height }; }) }));
await page.close();
await browser.close();
