// mark8.mjs <port> <tag> [--engine chromium|webkit]: S1's engine read of the carried run mark (RU-66 as amended by C7-1),
// the cell its plant needs (RULINGS-7 RU-66's witness: "the mark's move removed, so the plate jumps"), since the unit
// test reads no glide. dock-wi8.vue's w-std at 1440 by 900, light, fine pointer: the dock opened by hover, then a press
// on Library while Reader is current. Every animation frame for 900 ms reads the mark (.dock-run-mark): its box in the
// viewport and its background, and the current seat's own background. Read: the frames strictly between the mark's
// first box and its last (a glide has several; a jump has none or one), the largest step in one frame against the
// whole travel, whether the mark ends centred on Library's box (within 1 px), and the seat under it painting no fill.
// One browser, one context, closed in finally. Output: logs/s8-mark-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
let out = { engine };
try {
    browser = engine === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light" });
    try {
        const page = await ctx.newPage();
        await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=w-std`, { waitUntil: "load" });
        await page.waitForSelector("[data-testid=w-std]", { timeout: 30000 });
        await page.mouse.move(5, 5);
        await sleep(1200);
        const box = await page.locator("[data-testid=w-std]").boundingBox();
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
        await sleep(1500);
        const before = await page.evaluate(() => {
            const m = document.querySelector("[data-testid=w-std] .dock-run-mark");
            const r = m?.getBoundingClientRect();
            return m ? { x: r.x, w: r.width, bg: getComputedStyle(m).backgroundColor } : null;
        });
        await page.evaluate(() => {
            window.__mf = [];
            window.__mon = true;
            const tick = () => {
                const m = document.querySelector("[data-testid=w-std] .dock-run-mark");
                const r = m?.getBoundingClientRect();
                window.__mf.push(m ? [+r.x.toFixed(2), +r.width.toFixed(2)] : null);
                if (window.__mon) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        await page.locator("[data-testid=w-std-library]").click();
        await sleep(900);
        const res = await page.evaluate(() => {
            window.__mon = false;
            const seat = document.querySelector("[data-testid=w-std-library]");
            const s = seat.getBoundingClientRect();
            const m = document.querySelector("[data-testid=w-std] .dock-run-mark");
            const r = m?.getBoundingClientRect();
            return { frames: window.__mf, seat: [s.x, s.width], mark: r ? [r.x, r.width] : null, seatBg: getComputedStyle(seat).backgroundColor, current: seat.getAttribute("aria-current") };
        });
        const xs = res.frames.filter(Boolean).map((f) => f[0]);
        const first = xs[0], last = xs[xs.length - 1];
        const between = xs.filter((x) => Math.abs(x - first) > 0.5 && Math.abs(x - last) > 0.5).length;
        let step = 0;
        for (let i = 1; i < xs.length; i++) step = Math.max(step, Math.abs(xs[i] - xs[i - 1]));
        const travel = Math.abs(last - first);
        out = { engine, before, after: res.mark, seat: res.seat, current: res.current, seatBg: res.seatBg, frames: xs.length, first, last, travel: +travel.toFixed(2), between, largestStep: +step.toFixed(2), stepShare: travel ? +(step / travel).toFixed(3) : null, onSeat: res.mark ? Math.abs(res.mark[0] + res.mark[1] / 2 - (res.seat[0] + res.seat[1] / 2)) <= 1 : false, glides: between >= 3 };
        console.log(JSON.stringify(out));
    } finally {
        await ctx.close();
    }
} finally {
    await browser?.close();
}
writeFileSync(new URL(`../../logs/s8-mark-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
