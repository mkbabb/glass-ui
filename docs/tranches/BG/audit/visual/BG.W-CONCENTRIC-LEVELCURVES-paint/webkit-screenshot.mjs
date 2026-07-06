// playwright-webkit element screenshots (captures composited GL) — concentric vs a KNOWN-GOOD
// aurora route, on the SAME WebKit engine, to prove concentric-specific blank.
import { webkit } from "playwright";
import { PNG } from "pngjs";

function stats(buf) {
    const p = PNG.sync.read(buf), d = p.data, W = p.width, H = p.height;
    let s = 0; const luma = new Float64Array(W * H);
    for (let i = 0, q = 0; i < d.length; i += 4, q++) { const v = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; luma[q] = v; s += v; }
    let edge = 0, cnt = 0; for (let y = 0; y < H; y++) for (let x = 1; x < W; x++) { edge += Math.abs(luma[y * W + x] - luma[y * W + x - 1]); cnt++; }
    return { mean: +(s / (W * H) / 255).toFixed(5), edge: +(edge / cnt / 255).toFixed(5), w: W, h: H };
}

const browser = await webkit.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });

async function grab(route, sel) {
    await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(route)}&mode=light`, { waitUntil: "load", timeout: 30000 });
    const t0 = Date.now();
    while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); }
    await page.waitForTimeout(1500);
    const loc = page.locator(sel).first();
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    const buf = await loc.screenshot();
    return stats(buf);
}

const conc = await grab("/substrates/concentric", ".concentric-canvas");
console.log("CONCENTRIC(webkit) " + JSON.stringify(conc));
const aur = await grab("/substrates/aurora", ".aurora-canvas");
console.log("AURORA(webkit) " + JSON.stringify(aur));
await browser.close();
