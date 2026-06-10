// LANE C8 — fourier-F + logo-morph audit capture (READ-ONLY; captures only under AZ/audit/ground/).
// Measures the ℱ wordmark glyph centering within its hover/shadow rect (R3-15)
// and captures the shell rail home control region (R3-12).
import pw from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.js";
const { chromium } = pw;
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const BASE = "http://localhost:5199";

const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--use-angle=metal"],
});
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));

await page.goto(`${BASE}/foundations/intro`, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((e) => errors.push("GOTO: " + e.message));
await page.waitForTimeout(1800);
// Park live WebGL (aurora hero on this route).
await page.evaluate(() => {
    try {
        Object.defineProperty(document, "hidden", { value: true, configurable: true });
        document.dispatchEvent(new Event("visibilitychange"));
    } catch {}
}).catch(() => {});
await page.waitForTimeout(400);

// ── Measure the ℱ wordmark home control: the RouterLink (hover/shadow rect) and
//    the inner glyph <span> bounding box. Compute the glyph's offset within the rect.
const measure = await page.evaluate(() => {
    // The shell rail #persistent home control: a RouterLink[aria-label="glass-ui home"].
    const link = document.querySelector('a[aria-label="glass-ui home"]');
    if (!link) return { error: "no home link found" };
    const span = link.querySelector("span");
    const lr = link.getBoundingClientRect();
    const sr = span ? span.getBoundingClientRect() : null;
    // glyph's painted ink box via Range (tighter than the span's line-box)
    let inkRect = null;
    if (span && span.firstChild) {
        const range = document.createRange();
        range.selectNodeContents(span);
        const rr = range.getBoundingClientRect();
        inkRect = { x: rr.x, y: rr.y, w: rr.width, h: rr.height };
    }
    const cs = span ? getComputedStyle(span) : null;
    return {
        linkRect: { x: lr.x, y: lr.y, w: lr.width, h: lr.height, cx: lr.x + lr.width / 2, cy: lr.y + lr.height / 2 },
        spanRect: sr ? { x: sr.x, y: sr.y, w: sr.width, h: sr.height, cx: sr.x + sr.width / 2, cy: sr.y + sr.height / 2 } : null,
        inkRect,
        spanStyle: cs ? { fontStyle: cs.fontStyle, fontSize: cs.fontSize, fontVariationSettings: cs.fontVariationSettings } : null,
        // offset of glyph-ink center vs the hover-rect center (px). Positive x = glyph sits RIGHT of center.
        offset: inkRect ? {
            dx: (inkRect.x + inkRect.w / 2) - (lr.x + lr.width / 2),
            dy: (inkRect.y + inkRect.h / 2) - (lr.y + lr.height / 2),
        } : null,
    };
});

// Hover the home control to paint the hover/shadow register, then zoom-capture it.
const link = await page.$('a[aria-label="glass-ui home"]');
if (link) {
    const box = await link.boundingBox();
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(350);
        // crop a generous region around the rail top
        await page.screenshot({
            path: resolve(HERE, "C8-fourier-f-hover-rect.png"),
            clip: { x: Math.max(0, box.x - 24), y: Math.max(0, box.y - 16), width: 96, height: 96 },
        });
    }
}

await page.screenshot({ path: resolve(HERE, "C8-rail-home-region.png"), clip: { x: 0, y: 0, width: 140, height: 520 } });

console.log(JSON.stringify({ measure, errors }, null, 2));
await browser.close();
