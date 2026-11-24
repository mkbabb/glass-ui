// The Slider with its thumb at each end: does anything run past the Slider's box?
// node slider-end.mjs <out.json> <name:port>...  (one browser; a context per cell and build)
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const require = createRequire(new URL("../../trees/v11.1.1/package.json", import.meta.url).pathname);
const { chromium } = require("playwright");
const [OUT, ...BUILDS] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rows = [];
const browser = await chromium.launch({ headless: true });
const version = browser.version();
try {
    for (const cell of [{ n: "390t", vp: { width: 390, height: 844 }, t: true }, { n: "1440", vp: { width: 1440, height: 900 }, t: false }]) {
        for (const b of BUILDS) {
            const [name, port] = b.split(":");
            const context = await browser.newContext({ viewport: cell.vp, hasTouch: cell.t, isMobile: cell.t, deviceScaleFactor: 2, colorScheme: "dark" });
            try {
                const page = await context.newPage();
                await page.goto(`http://127.0.0.1:${port}/forms/slider`, { waitUntil: "load" });
                await sleep(2000);
                const n = await page.evaluate(() => document.querySelectorAll("[data-slot=slider]").length);
                for (let i = 0; i < n; i++) {
                    for (const key of ["Home", "End"]) {
                        const thumbs = page.locator("[data-slot=slider]").nth(i).locator(".slider-thumb");
                        const k = await thumbs.count();
                        if (!k) continue;
                        const th = key === "End" ? thumbs.nth(k - 1) : thumbs.nth(0);
                        await th.focus();
                        await page.keyboard.press(key);
                        await sleep(400);
                        const r = await page.evaluate(([i]) => {
                            const s = document.querySelectorAll("[data-slot=slider]")[i];
                            const sr = s.getBoundingClientRect();
                            let past = 0;
                            for (const e of s.querySelectorAll("*")) {
                                const q = e.getBoundingClientRect();
                                if (!q.width) continue;
                                past = Math.max(past, q.right - sr.right, sr.left - q.left);
                            }
                            const vertical = s.getAttribute("data-orientation") === "vertical";
                            return { vertical, w: Math.round(sr.width), sw: s.scrollWidth, cw: s.clientWidth, past: Math.round(past * 10) / 10 };
                        }, [i]);
                        rows.push({ build: name, cell: cell.n, slider: i, key, ...r });
                    }
                }
                await page.close();
            } catch (e) {
                rows.push({ build: name, cell: cell.n, error: String(e).slice(0, 200) });
            } finally {
                await context.close();
            }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(OUT, JSON.stringify({ engine: "chromium", version, rows }, null, 1));
for (const r of rows) console.log(JSON.stringify(r));
