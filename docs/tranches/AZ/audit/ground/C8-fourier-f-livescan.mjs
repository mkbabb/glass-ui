// LANE C8 — LIVE painted-ink scan of the ℱ within its hover rect (R3-15).
// Screenshots the home-control rect from the LIVE DOM at dpr=4, then scans the
// red ℱ ink pixels to get the true visual center vs the hover-pill geometric center.
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
import { PNG } from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";

const browser = await chromium.launch({ headless: true, args: ["--use-gl=angle", "--use-angle=metal"] });
const DPR = 4;
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: DPR });
const page = await ctx.newPage();
await page.goto(`${BASE}/foundations/intro`, { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(1500);
await page.evaluate(() => { try { Object.defineProperty(document, "hidden", { value: true, configurable: true }); document.dispatchEvent(new Event("visibilitychange")); } catch {} });
await page.waitForTimeout(300);

const link = await page.$('a[aria-label="glass-ui home"]');
const box = await link.boundingBox(); // CSS px
// Hover to paint the hover/shadow pill, then clip exactly the link rect.
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(300);
const clipPath = resolve(HERE, "C8-fourier-f-liverect.png");
await page.screenshot({ path: clipPath, clip: box });

// Scan the PNG for the red ℱ ink (red glyph on a pale pill): ink = pixels where R >> G,B.
const png = PNG.sync.read(readFileSync(clipPath));
const { width: W, height: H, data } = png;
let minX = 1e9, maxX = -1, minY = 1e9, maxY = -1, n = 0;
for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const r = data[i], gg = data[i + 1], b = data[i + 2];
        // warm-red ink: red channel dominant and reasonably saturated
        if (r > 120 && r - gg > 50 && r - b > 50) {
            if (x < minX) minX = x; if (x > maxX) maxX = x;
            if (y < minY) minY = y; if (y > maxY) maxY = y; n++;
        }
    }
}
const out = { pngSize: { W, H }, dpr: DPR, inkPixels: n };
if (maxX >= 0) {
    // convert px → CSS px
    const ink = { x: minX / DPR, y: minY / DPR, w: (maxX - minX) / DPR, h: (maxY - minY) / DPR };
    const rectCx = W / DPR / 2, rectCy = H / DPR / 2;
    const inkCx = ink.x + ink.w / 2, inkCy = ink.y + ink.h / 2;
    out.rectCenter = { x: rectCx, y: rectCy };
    out.ink = ink;
    out.inkCenter = { x: inkCx, y: inkCy };
    out.offset = { dx: +(inkCx - rectCx).toFixed(2), dy: +(inkCy - rectCy).toFixed(2) };
    out.note = "dy<0 = glyph ink sits ABOVE the hover-pill center; dx!=0 = horizontally off-center";
} else {
    out.error = "no red ink found — adjust threshold";
}
console.log(JSON.stringify(out, null, 2));
await browser.close();
