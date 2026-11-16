// Critic 2: a detented Sheet dismissed by a drag down (the table marks the route CUT on
// 11.1.0). Films opacity times the share of the plate on screen, frame by frame, from the
// release of the drag until the plate is gone.   node detent-drag.mjs <base url> <out.json>
import { chromium } from "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.1.1/node_modules/playwright/index.mjs";
import fs from "node:fs";
const [base, out] = process.argv.slice(2);
const browser = await chromium.launch();
const result = { base, cells: [] };
try {
    for (const form of [{ name: "1440", viewport: { width: 1440, height: 900 }, hasTouch: false }, { name: "390", viewport: { width: 390, height: 844 }, hasTouch: false }]) {
        const ctx = await browser.newContext({ viewport: form.viewport });
        try {
            const page = await ctx.newPage();
            await page.goto(base + "/tests-visual/release-11-1-1/exits-harness.html");
            await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
            await page.waitForTimeout(400);
            await page.locator('[data-testid="x-detent"]').click();
            await page.locator('[data-testid="x-detent-content"][data-state="open"]').waitFor();
            await page.waitForTimeout(1200);
            await page.evaluate(() => {
                const film = { frames: [], stop: false, up: -1 }; window.__f = film; const t0 = performance.now();
                const tick = (now) => {
                    const el = document.querySelector('[data-testid="x-detent-content"]');
                    if (!el) film.frames.push([Math.round(now - t0), 0, null]);
                    else {
                        const r = el.getBoundingClientRect(); let o = 1;
                        for (let n = el; n; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display === "none" || cs.visibility === "hidden") { o = 0; break; } o *= parseFloat(cs.opacity); }
                        const h = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
                        film.frames.push([Math.round(now - t0), +(o * h).toFixed(1), Math.round(r.top)]);
                    }
                    if (!film.stop) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                window.__up = () => (film.up = performance.now() - t0);
            });
            const box = await page.locator('[data-testid="x-detent-content"]').boundingBox();
            const x = box.x + box.width / 2, y0 = box.y + 14;
            await page.mouse.move(x, y0);
            await page.mouse.down();
            for (let i = 1; i <= 12; i++) { await page.mouse.move(x, y0 + i * 30); await page.waitForTimeout(16); }
            await page.evaluate(() => window.__up());
            await page.mouse.up();
            await page.waitForTimeout(1800);
            const film = await page.evaluate(() => { window.__f.stop = true; return window.__f; });
            const rest = film.frames[0][1];
            const after = film.frames.filter((f) => f[0] >= film.up);
            const goneAt = after.findIndex((f) => f[1] <= 0.5);
            const seen = after.slice(0, goneAt < 0 ? after.length : goneAt + 1).map((f) => [f[0] - Math.round(film.up), +(f[1] / rest).toFixed(3)]);
            let worst = 0; for (let i = 1; i < seen.length; i++) worst = Math.max(worst, seen[i - 1][1] - seen[i][1]);
            const before = film.frames.filter((f) => f[0] < film.up).slice(-10).map((f) => [f[0] - Math.round(film.up), +(f[1] / rest).toFixed(3)]);
            const state = await page.locator('[data-testid="x-detent-content"]').count();
            result.cells.push({ form: form.name, restPx: rest, atRelease: seen[0]?.[1], gone: goneAt >= 0, stillMounted: state, lastSeenShare: seen.length > 1 ? seen[seen.length - 2][1] : null, worstSampleDrop: +worst.toFixed(3), before, frames: seen });
        } finally { await ctx.close(); }
    }
    fs.writeFileSync(out, JSON.stringify(result));
    for (const c of result.cells) console.log(JSON.stringify({ ...c, frames: c.frames.length + " samples", head: c.frames.slice(0, 6), tail: c.frames.slice(-4) }));
} finally { await browser.close(); }
