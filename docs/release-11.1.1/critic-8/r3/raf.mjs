// Critic 8, readings only: does a film's first frame lie before a mark stamped after the
// page has filmed it? The film's own sequence (`startFilm`, `firstFrame`, `markFilm` in
// tests-visual/release-11-1-1/film.ts) on a plain page, sixty times per form, and in each
// frame callback the frame's time beside `performance.now()` read at the callback's start.
//   node raf.mjs <webkit|chromium>
import { chromium, webkit } from "@playwright/test";

const engine = process.argv[2];
const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;
const browser = engine === "webkit" ? await webkit.launch({ executablePath: WEBKIT_2287 }) : await chromium.launch();
const forms = {
    phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: engine !== "webkit" },
    desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
};
const out = { engine, version: browser.version(), forms: {} };
try {
    for (const [name, opts] of Object.entries(forms)) {
        const context = await browser.newContext(opts);
        try {
            const page = await context.newPage();
            await page.setContent("<!doctype html><div style='width:100px;height:100px;background:#888'></div>");
            let notBefore = 0;
            let ahead = 0;
            let worstAhead = -Infinity;
            const cases = [];
            for (let i = 0; i < 60; i++) {
                await page.evaluate(() => {
                    const film = { frames: [], stop: false, mark: -1 };
                    window.__film = film;
                    const t0 = performance.now();
                    film.t0 = t0;
                    const tick = (frameTime) => {
                        const now = performance.now();
                        film.frames.push({ t: frameTime - t0, now: now - t0 });
                        if (!film.stop) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                });
                await page.waitForFunction(() => window.__film.frames.length > 0);
                await page.evaluate(() => (window.__film.mark = performance.now() - window.__film.t0));
                await page.waitForTimeout(60);
                const f = await page.evaluate(() => {
                    window.__film.stop = true;
                    return { mark: window.__film.mark, frames: window.__film.frames };
                });
                const first = f.frames[0];
                if (!(first.t < f.mark)) {
                    notBefore++;
                    cases.push({ mark: +f.mark.toFixed(3), t: +first.t.toFixed(3), now: +first.now.toFixed(3) });
                }
                for (const fr of f.frames) {
                    worstAhead = Math.max(worstAhead, fr.t - fr.now);
                    if (fr.t > fr.now) ahead++;
                }
            }
            out.forms[name] = { films: 60, firstNotBeforeMark: notBefore, framesStampedAfterTheirCallback: ahead, worstAheadMs: +worstAhead.toFixed(3), cases: cases.slice(0, 6) };
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
console.log(JSON.stringify(out));
