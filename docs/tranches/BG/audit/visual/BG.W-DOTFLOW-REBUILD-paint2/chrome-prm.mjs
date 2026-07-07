// PRM check — Chrome/Metal with prefers-reduced-motion:reduce. The dot-flow substrate must paint
// ONE deterministic static frame then park (no ambient motion). Capture two frames ~1s apart; a
// PRM-correct viz shows motion≈0 (static) while STILL painting the field (not black).
import { chromium } from "playwright";
import { PNG } from "pngjs";
import { readFileSync } from "node:fs";
const OUT = new URL(".", import.meta.url).pathname;
const ROUTE = "/substrates/dot-flow-field";
const CDP = process.env.CDP_URL || "http://localhost:9333";
const SEL = ".rounded-card canvas";

function census(path) {
    const png = PNG.sync.read(readFileSync(path));
    const { width: w, height: h, data } = png;
    let sum = 0, sq = 0, n = 0, max = 0;
    for (let i = 0; i < data.length; i += 4) {
        const l = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        sum += l; sq += l * l; n++; if (l > max) max = l;
    }
    const mean = sum / n;
    return { meanLum: +mean.toFixed(2), stdev: +Math.sqrt(Math.max(0, sq / n - mean * mean)).toFixed(2), max: +max.toFixed(1) };
}
function frameDiff(a, b) {
    const pa = PNG.sync.read(readFileSync(a)); const pb = PNG.sync.read(readFileSync(b));
    if (pa.width !== pb.width || pa.height !== pb.height) return -1;
    let d = 0, n = 0;
    for (let i = 0; i < pa.data.length; i += 16) {
        const la = 0.299 * pa.data[i] + 0.587 * pa.data[i + 1] + 0.114 * pa.data[i + 2];
        const lb = 0.299 * pb.data[i] + 0.587 * pb.data[i + 1] + 0.114 * pb.data[i + 2];
        d += Math.abs(la - lb); n++;
    }
    return +(d / n).toFixed(3);
}

const browser = await chromium.connectOverCDP(CDP);
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent(ROUTE)}&mode=dark`, { waitUntil: "load", timeout: 30000 });
const t0 = Date.now();
while (Date.now() - t0 < 15000) { if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break; await page.waitForTimeout(150); }
await page.evaluate((sel) => { const cv = document.querySelector(sel); if (cv) cv.scrollIntoView({ block: "center" }); }, SEL);
await page.waitForTimeout(2500);
const rect = await page.evaluate((sel) => { const cv = document.querySelector(sel); if (!cv) return null; const r = cv.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, SEL);
const clip = { x: Math.max(0, Math.round(rect.x)), y: Math.max(0, Math.round(rect.y)), width: Math.round(Math.min(rect.w, 1440 - Math.max(0, rect.x))), height: Math.round(Math.min(rect.h, 900 - Math.max(0, rect.y))) };
const f1 = `${OUT}chrome-prm-dark-1.png`; await page.screenshot({ path: f1, clip });
await page.waitForTimeout(1000);
const f2 = `${OUT}chrome-prm-dark-2.png`; await page.screenshot({ path: f2, clip });
const motion = frameDiff(f1, f2);
const c = census(f1);
console.log(JSON.stringify({ prm: true, motion, census: c, note: "motion≈0 => static; meanLum>dead-black+max>0 => field painted", f1 }, null, 2));
await page.close();
await browser.close();
