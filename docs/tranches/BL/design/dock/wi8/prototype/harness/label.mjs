// label.mjs <port> <tag> [--engine chromium|webkit]
// P-2 and P-3: how the name enters (A, B) and whether every name fits in the slack.
// For each design: hover each labelled seat; pause the name's transitions at half their
// time, crop the name (dpr 2) and read its glyph edge contrast (mean |gradient| of
// luminance over the crop); let them finish and read again. Also the label readings the
// run wrote (need, room, fits) and the time the name is readable (opacity >= 0.8 and,
// for B, scale >= 0.98), from a rAF poll.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const { PNG } = require("pngjs");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const OUT = new URL("../label/", import.meta.url);
mkdirSync(OUT, { recursive: true });
const res = [];
function edgeContrast(buf) {
    const img = PNG.sync.read(buf);
    let s = 0, n = 0;
    const Lx = (x, y) => { const i = (y * img.width + x) * 4; return 0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2]; };
    for (let y = 1; y < img.height - 1; y++) for (let x = 1; x < img.width - 1; x++) { s += Math.abs(Lx(x + 1, y) - Lx(x - 1, y)) + Math.abs(Lx(x, y + 1) - Lx(x, y - 1)); n++; }
    return s / n;
}
let browser;
try {
    browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
    for (const w of [1440, 390]) for (const design of ["a", "b"]) {
        const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 2 });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-std&label=${design}`);
            await page.waitForSelector("[data-testid=w-std]");
            await page.waitForTimeout(500);
            const sb = await page.locator("[data-testid=w-std] .dock-layer--summary").boundingBox();
            await page.mouse.move(sb.x + sb.width / 2 - 4, sb.y + sb.height / 2);
            await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2, { steps: 3 });
            await page.waitForTimeout(1200);
            for (const id of ["read", "search", "library", "marks", "settings"]) {
                await page.mouse.move(4, 700);
                await page.waitForTimeout(400);
                const seat = page.locator(`[data-testid=w-std-${id}]`);
                const b = await seat.boundingBox();
                if (!b) { res.push({ engine, w, design, id, error: "no seat box" }); continue; }
                // readable time: poll in rAF from the move
                await page.evaluate((id) => {
                    const lab = document.querySelector(`[data-testid=w-std-${id}] .dock-seat-label`);
                    window.__readable = null;
                    const t0 = performance.now();
                    window.__t0 = t0;
                    const tick = () => {
                        const cs = getComputedStyle(lab);
                        const sc = cs.scale === "none" ? 1 : parseFloat(cs.scale);
                        if (window.__readable == null && parseFloat(cs.opacity) >= 0.8 && sc >= 0.98) window.__readable = performance.now() - t0;
                        if (performance.now() - t0 < 800) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }, id);
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                await page.waitForTimeout(40);
                // pause the name's transitions at half their time
                const half = await page.evaluate((id) => {
                    const lab = document.querySelector(`[data-testid=w-std-${id}] .dock-seat-label`);
                    const anims = lab.getAnimations();
                    for (const an of anims) { const d = an.effect.getComputedTiming().duration; an.pause(); an.currentTime = d / 2; }
                    const seats = [...document.querySelectorAll("[data-testid=w-std] .dock-run > *")];
                    const spatial = seats.map((s) => s.getAnimations().filter((x) => /translate|scale|inline-size/.test(x.transitionProperty || "")).length);
                    const labSpatial = anims.filter((x) => /translate|scale/.test(x.transitionProperty || "")).map((x) => x.transitionProperty);
                    return { n: anims.length, shown: lab.parentElement.hasAttribute("data-label-shown"), labSpatial, seatSpatial: spatial };
                }, id);
                const lb = await page.locator(`[data-testid=w-std-${id}] .dock-seat-label`).boundingBox();
                let midC = null, endC = null, name = null;
                if (lb && half.shown) {
                    const clip = { x: lb.x - 4, y: lb.y - 4, width: lb.width + 8, height: lb.height + 8 };
                    const mid = await page.screenshot({ clip });
                    midC = edgeContrast(mid);
                    await page.evaluate((id) => { for (const an of document.querySelector(`[data-testid=w-std-${id}] .dock-seat-label`).getAnimations()) an.finish(); }, id);
                    await page.waitForTimeout(60);
                    const lb2 = await page.locator(`[data-testid=w-std-${id}] .dock-seat-label`).boundingBox();
                    const end = await page.screenshot({ clip: { x: lb2.x - 4, y: lb2.y - 4, width: lb2.width + 8, height: lb2.height + 8 } });
                    endC = edgeContrast(end);
                    name = `label.${tag}.${engine}.${w}.${design}.${id}`;
                    writeFileSync(new URL(name + ".mid.png", OUT), mid);
                    writeFileSync(new URL(name + ".end.png", OUT), end);
                }
                await page.waitForTimeout(500);
                const readable = await page.evaluate(() => window.__readable);
                const fit = await page.evaluate(() => (window.__dockLabelReadings || []).slice(-1)[0] || null);
                const box = await page.evaluate(() => { const d = document.querySelector("[data-testid=w-std]"); const r = d.getBoundingClientRect(); const p = d.querySelector(".dock-plate").getBoundingClientRect(); return [r.x, r.width, p.x, p.width]; });
                res.push({ engine, w, design, id, shown: half.shown, fit, readableMs: readable == null ? null : +readable.toFixed(0), midContrast: midC && +midC.toFixed(2), endContrast: endC && +endC.toFixed(2), ratio: midC && endC ? +(midC / endC).toFixed(3) : null, labSpatial: half.labSpatial, seatSpatial: half.seatSpatial, box, png: name });
                console.log(JSON.stringify(res[res.length - 1]));
            }
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`label.${tag}.${engine}.json`, OUT), JSON.stringify(res, null, 1));
}
