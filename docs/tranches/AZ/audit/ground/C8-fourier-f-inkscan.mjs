// LANE C8 — true painted-ink bounds of the ℱ glyph within its hover rect (R3-15).
// Pixel-scans the captured hover-rect PNG region to find the actual ink bbox,
// vs the geometric center of the rounded hover/shadow pill.
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";

const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(`${BASE}/foundations/intro`, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(1500);
await page.evaluate(() => { try { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); } catch {} });
await page.waitForTimeout(300);

// In-page pixel-ink scan: render the home-link region to a canvas via html2canvas-free
// approach — instead read the glyph ink directly by drawing the script-F char to a
// canvas with the SAME font + rect, then scan ink rows/cols. This isolates the glyph's
// intrinsic ink-vs-advance asymmetry that the user perceives.
const result = await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="glass-ui home"]');
    const span = link.querySelector("span");
    const cs = getComputedStyle(span);
    const lr = link.getBoundingClientRect();
    // Build a canvas the size of the hover rect; draw the glyph centered as the CSS does
    // (flex center => baseline-ish center of the line box at rect center).
    const dpr = 4;
    const W = Math.round(lr.width), H = Math.round(lr.height);
    const cv = document.createElement("canvas");
    cv.width = W * dpr; cv.height = H * dpr;
    const g = cv.getContext("2d");
    g.scale(dpr, dpr);
    g.clearRect(0, 0, W, H);
    g.fillStyle = "#000";
    g.font = `italic ${cs.fontSize} ${cs.fontFamily}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    // The flex container centers the inline span; textBaseline middle approximates the
    // line-box center placement at the rect center.
    g.fillText("ℱ", W / 2, H / 2);
    const img = g.getImageData(0, 0, W * dpr, H * dpr).data;
    let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1;
    for (let y = 0; y < H * dpr; y++) {
        for (let x = 0; x < W * dpr; x++) {
            const a = img[(y * W * dpr + x) * 4 + 3];
            if (a > 32) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
        }
    }
    if (maxX < 0) return { error: "no ink rendered (font may differ in canvas)" };
    // back to CSS px
    const ink = { x: minX / dpr, y: minY / dpr, w: (maxX - minX) / dpr, h: (maxY - minY) / dpr };
    const inkCx = ink.x + ink.w / 2, inkCy = ink.y + ink.h / 2;
    return {
        rect: { w: W, h: H, cx: W / 2, cy: H / 2 },
        ink,
        inkCenter: { x: inkCx, y: inkCy },
        offsetFromRectCenter: { dx: inkCx - W / 2, dy: inkCy - H / 2 },
        fontFamily: cs.fontFamily,
    };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
