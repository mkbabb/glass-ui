// WebKit control: does this Playwright WebKit paint backdrop-filter at all, and does a
// clip-path on the plate itself (our mechanism) or on its ancestor (the naive shared
// silhouette) change it? Static data: pages, no app code.
import { webkit, chromium } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const engine = process.argv[2] === "chromium" ? chromium : webkit;
const stripes = "background:repeating-linear-gradient(90deg,#222 0 6px,#eee 6px 12px)";
const cases = {
    plain: `<div style="position:absolute;left:40px;top:40px;width:300px;height:56px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)"></div>`,
    selfPathClip: `<div style="position:absolute;left:40px;top:40px;width:300px;height:56px;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);clip-path:path('M28 0 L272 0 C287.5 0 300 12.5 300 28 C300 43.5 287.5 56 272 56 L28 56 C12.5 56 0 43.5 0 28 C0 12.5 12.5 0 28 0 Z')"></div>`,
    ancestorPathClip: `<div style="position:absolute;left:40px;top:40px;width:300px;height:56px;clip-path:path('M28 0 L272 0 C287.5 0 300 12.5 300 28 C300 43.5 287.5 56 272 56 L28 56 C12.5 56 0 43.5 0 28 C0 12.5 12.5 0 28 0 Z')"><div style="position:absolute;inset:0;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)"></div></div>`,
};
const browser = await engine.launch({ headless: true });
const out = {};
try {
    for (const [k, html] of Object.entries(cases)) {
        const ctx = await browser.newContext({ viewport: { width: 400, height: 140 } });
        try {
            const page = await ctx.newPage();
            await page.setContent(`<body style="margin:0;height:140px;${stripes}">${html}</body>`);
            await page.waitForTimeout(300);
            const buf = await page.screenshot({ path: `${process.argv[3]}/${process.argv[2]}-control-${k}.png` });
            out[k] = await page.evaluate(async (b64) => {
                const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
                const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
                const g = c.getContext("2d"); g.drawImage(img, 0, 0);
                const row = (y) => { const d = g.getImageData(100, y, 120, 1).data; const ls = []; for (let i = 0; i < d.length; i += 4) ls.push(d[i]); const m = ls.reduce((a, b) => a + b, 0) / ls.length; return Number(Math.sqrt(ls.reduce((a, b) => a + (b - m) ** 2, 0) / ls.length).toFixed(1)); };
                return { plateRowStd: row(68), outsideRowStd: row(120) };
            }, buf.toString("base64"));
            out[k].computed = await page.evaluate(() => { const e = [...document.querySelectorAll("div")].pop(); const cs = getComputedStyle(e); return cs.backdropFilter || cs.webkitBackdropFilter; });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); }
console.log(process.argv[2], JSON.stringify(out));
