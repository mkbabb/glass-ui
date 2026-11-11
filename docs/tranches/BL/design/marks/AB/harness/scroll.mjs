// O-230 (3): does anything on a mark move at a scroll stop?   scroll.mjs <engine> <out> ctl=<url> a=<url> b=<url>
// The sheet at rest (every mark drawn), then a wheel scroll of 6 × 60 px; at 100 ms after the
// last wheel, every running animation or transition on any mark is listed, and again at 1 s.
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, open } from "./lib.mjs";
const [engine, out, ...cands] = process.argv.slice(2);
const C = Object.fromEntries(cands.map((s) => s.split("=")));
const rec = { engine, cells: [] };
const running = (page) => page.evaluate(() => document.getAnimations().filter((a) => a.effect?.target?.closest?.("[data-probe]") && a.playState === "running").map((a) => `${a.constructor.name}:${a.animationName ?? a.transitionProperty}`));
const browser = await launch(engine);
try {
    for (const c of Object.keys(C)) {
        const { context, page } = await open(browser, `${C[c]}/ab/index.html?scene=sheet&shape=underline&theme=light`, { width: 1440, height: 900 });
        try {
            await page.waitForTimeout(2500);
            await page.mouse.move(400, 400);
            for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 60); await page.waitForTimeout(16); }
            await page.waitForTimeout(100);
            const at100 = await running(page);
            await page.waitForTimeout(900);
            const at1s = await running(page);
            const scrollListeners = await page.evaluate(() => window.scrollY);
            rec.cells.push({ cand: c, scrolledTo: scrollListeners, runningAt100msAfterStop: at100, runningAt1s: at1s });
        } finally { await context.close(); }
    }
} finally {
    await browser.close();
    writeFileSync(join(out, `scroll-${engine}.json`), JSON.stringify(rec, null, 1));
    console.log(JSON.stringify(rec));
}
