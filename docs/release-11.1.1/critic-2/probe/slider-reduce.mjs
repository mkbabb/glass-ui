// Critic 2: under prefers-reduced-motion, does the Slider's own motion still travel?
// The slider sheet is unlayered, and the reduced-motion fallback is now a normal rule in a
// last layer. Reads computed clocks, then holds a press on the scrubber and films the
// fill's transform frame by frame.   node slider-reduce.mjs <base url> <out.json>
import { chromium } from "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [base, out] = process.argv.slice(2);
const browser = await chromium.launch();
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    try {
        const page = await ctx.newPage();
        await page.goto(base + "/tests-visual/slider-forced-colors/harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(500);
        const clocks = await page.evaluate(() => {
            const q = (s) => document.querySelector(`[data-row="scrubber"] ${s}`);
            const read = (s) => { const el = q(s); if (!el) return null; const cs = getComputedStyle(el); return { property: cs.transitionProperty, duration: cs.transitionDuration, timing: cs.transitionTimingFunction.slice(0, 60) }; };
            return { reduce: matchMedia("(prefers-reduced-motion: reduce)").matches, root: read(".glass-slider"), range: read(".slider-range"), thumb: read(".slider-thumb"), track: read(".slider-track") };
        });
        await page.evaluate(() => {
            const el = document.querySelector('[data-row="scrubber"] .slider-range');
            const film = { frames: [], stop: false, mark: -1, up: -1 }; window.__f = film; const t0 = performance.now();
            const tick = (now) => { film.frames.push([Math.round(now - t0), getComputedStyle(el).transform, el.getAnimations().filter((a) => a.playState === "running").length]); if (!film.stop) requestAnimationFrame(tick); };
            requestAnimationFrame(tick);
            window.__mark = () => (film.mark = performance.now() - t0); window.__up = () => (film.up = performance.now() - t0);
        });
        const box = await page.locator('[data-row="scrubber"] .glass-slider').boundingBox();
        await page.waitForTimeout(100);
        await page.evaluate(() => window.__mark());
        await page.mouse.move(box.x + box.width * 0.4, box.y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(600);
        await page.evaluate(() => window.__up());
        await page.mouse.up();
        await page.waitForTimeout(700);
        const film = await page.evaluate(() => { window.__f.stop = true; return window.__f; });
        const leg = (a, b) => { const fr = film.frames.filter((f) => f[0] >= a && f[0] < b); const distinct = [...new Set(fr.map((f) => f[1]))]; return { distinct: distinct.length, running: fr.filter((f) => f[2] > 0).length, values: distinct.slice(0, 12) }; };
        const result = { base, clocks, press: leg(film.mark, film.up), release: leg(film.up, Infinity) };
        fs.writeFileSync(out, JSON.stringify(result, null, 1));
        console.log(JSON.stringify(result));
    } finally { await ctx.close(); }
} finally { await browser.close(); }
