// Critic 10 (critic 8's probe, as critic 9 ran it, unchanged), readings only: the row B cell ("a detented Sheet dragged up and let go
// ... springs on from where the finger left it") as the spec states it, with the drag made
// by the mouse, so Playwright WebKit, whose touchscreen cannot drag, is read too. The
// sequence, the reads and the bounds are the spec's; only the input differs.
import { expect, test, type Page } from "@playwright/test";
import { gotoReady, pressOn, worstFrameShare } from "../release-11-1-1/film";

const SHEET = '[data-testid="s-content"]';
type S = { t: number; present: boolean; y?: number };

async function start(page: Page) {
    await page.evaluate((sheet) => {
        const w = window as unknown as { __sheet: { t0: number; mark: number; stop: boolean; frames: S[] } };
        const film = { t0: performance.now(), mark: -1, stop: false, frames: [] as S[] };
        w.__sheet = film;
        const tick = (ft: number) => {
            const el = document.querySelector(sheet);
            film.frames.push(el ? { t: ft - film.t0, present: true, y: el.getBoundingClientRect().top } : { t: ft - film.t0, present: false });
            if (!film.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, SHEET);
    await page.waitForFunction(() => (window as unknown as { __sheet: { frames: unknown[] } }).__sheet.frames.length > 0);
}
const mark = (page: Page) => page.evaluate(() => { const f = (window as unknown as { __sheet: { t0: number; mark: number } }).__sheet; f.mark = performance.now() - f.t0; });
async function stop(page: Page, ms: number) {
    await page.waitForTimeout(ms);
    return page.evaluate(() => { const f = (window as unknown as { __sheet: { mark: number; stop: boolean; frames: S[] } }).__sheet; f.stop = true; return { mark: f.mark, frames: f.frames }; });
}
async function drag(page: Page, steps: number, px: number, atRest: boolean, doMark = false) {
    const grip = (await page.locator(`${SHEET} [data-slot="sheet-detent-handle"]`).boundingBox())!;
    const x = grip.x + grip.width / 2, y0 = grip.y + grip.height / 2;
    await page.mouse.move(x, y0);
    await page.mouse.down();
    for (let i = 1; i <= steps; i++) { await page.mouse.move(x, y0 + i * px); await page.waitForTimeout(16); }
    if (atRest) for (let i = 0; i < 6; i++) { await page.mouse.move(x, y0 + steps * px); await page.waitForTimeout(20); }
    if (doMark) await mark(page);
    await page.mouse.up();
}

for (const release of ["at speed", "at rest"] as const) {
    test(`rowb · a detented Sheet dragged up by the mouse and let go ${release}`, async ({ page }, info) => {
        await gotoReady(page, "/tests-visual/release-11-1-1/sheet-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(300);
        await pressOn(page, info.project.name, '[data-testid="s-open"]');
        await page.locator(`${SHEET}[data-state="open"]`).waitFor();
        await page.waitForTimeout(1200);
        const vh = page.viewportSize()!.height;
        await drag(page, 12, 22, true);
        await page.waitForTimeout(1200);
        const half = (vh - (await page.locator(SHEET).boundingBox())!.y) / vh;
        await start(page);
        await drag(page, 12, -15, release === "at rest", true);
        const film = await stop(page, 1400);
        const before = film.frames.filter((f) => f.t < film.mark && f.present);
        const after = film.frames.filter((f) => f.t >= film.mark && f.present);
        const from = before[before.length - 1].y!, end = after[after.length - 1].y!;
        const series: [number, number][] = [before[before.length - 1], ...after].map((f) => [f.t, f.y!]);
        const read = {
            half: +half.toFixed(3), from: Math.round(from), end: Math.round(end),
            fromRung: +((vh - from) / vh).toFixed(3), endRung: +((vh - end) / vh).toFixed(3),
            share: +worstFrameShare(series, Math.abs(from - end)).toFixed(3),
            frames: series.map(([t, y]) => [Math.round(t - film.mark), Math.round(y)]).slice(0, 40),
        };
        const at = JSON.stringify(read);
        await info.attach("sheet", { body: at, contentType: "application/json" });
        expect(Math.abs(read.half - 0.5), `the first drag left the sheet on its 0.5 rung ${at}`).toBeLessThanOrEqual(0.01);
        expect(read.fromRung, `past the midpoint ${at}`).toBeGreaterThan(0.7);
        expect(read.fromRung, `short of 0.9 ${at}`).toBeLessThan(0.88);
        expect(read.share, `no frame over a fifth of the travel left ${at}`).toBeLessThanOrEqual(0.2);
        expect(Math.abs(read.endRung - 0.9), `settles on 0.9 ${at}`).toBeLessThanOrEqual(0.01);
    });
}
