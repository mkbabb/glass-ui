// Critic 8 probe, readings only: what the page sees of the row B cell's touch drag on
// Chromium at 390 (CDP touch, as the spec drags). For each release it records every
// pointermove and the pointerup the page receives after the twelfth move, and the
// sheet's top from the release on. "at rest" is the spec's six still moves at the last
// point; "rest by jitter" holds the finger with six moves of one pixel up and down, so
// the page does receive moves while the finger stands; "at speed" is the spec's.
import { test, type Page } from "@playwright/test";
import { gotoReady, pressOn } from "../release-11-1-1/film";

const SHEET = '[data-testid="s-content"]';

async function drag(page: Page, steps: number, px: number, still: "none" | "same" | "jitter") {
    const grip = (await page.locator(`${SHEET} [data-slot="sheet-detent-handle"]`).boundingBox())!;
    const x = grip.x + grip.width / 2, y0 = grip.y + grip.height / 2;
    const cdp = await page.context().newCDPSession(page);
    const touch = (type: string, y?: number) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: y === undefined ? [] : [{ x, y, id: 1 }] } as never);
    await touch("touchStart", y0);
    for (let i = 1; i <= steps; i++) { await touch("touchMove", y0 + i * px); await page.waitForTimeout(16); }
    await page.evaluate(() => (window as unknown as { __ev?: { k: string }[] }).__ev?.push({ k: "after-12" }));
    if (still !== "none") for (let i = 0; i < 6; i++) { await touch("touchMove", y0 + steps * px + (still === "jitter" ? (i % 2 ? 1 : -1) : 0)); await page.waitForTimeout(20); }
    await page.evaluate(() => {
        const w = window as unknown as { __film?: { t0: number; mark: number } };
        if (w.__film) w.__film.mark = performance.now() - w.__film.t0;
    });
    await touch("touchEnd");
    await cdp.detach();
}

for (const still of ["none", "same", "jitter"] as const) {
    test(`rest · release ${still === "none" ? "at speed" : still === "same" ? "at rest (the spec's)" : "at rest by jitter"}`, async ({ page }, info) => {
        test.skip(info.project.name !== "chromium-phone", "CDP touch");
        await gotoReady(page, "/tests-visual/release-11-1-1/sheet-harness.html");
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
        await page.waitForTimeout(300);
        await pressOn(page, info.project.name, '[data-testid="s-open"]');
        await page.locator(`${SHEET}[data-state="open"]`).waitFor();
        await page.waitForTimeout(1200);
        await drag(page, 12, 22, "same");
        await page.waitForTimeout(1200);
        await page.evaluate((sel) => {
            const w = window as unknown as { __ev: unknown[]; __film: { t0: number; mark: number; frames: number[][]; stop: boolean } };
            w.__ev = [];
            for (const k of ["pointermove", "pointerup", "pointercancel"])
                addEventListener(k, (e) => w.__ev.push({ k, t: Math.round((e as PointerEvent).timeStamp), y: (e as PointerEvent).clientY }), { capture: true });
            const film = { t0: performance.now(), mark: -1, frames: [] as number[][], stop: false };
            w.__film = film;
            const tick = (ft: number) => {
                const el = document.querySelector(sel);
                if (el) film.frames.push([ft - film.t0, el.getBoundingClientRect().top]);
                if (!film.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, SHEET);
        await page.waitForFunction(() => (window as unknown as { __film: { frames: unknown[] } }).__film.frames.length > 0);
        await drag(page, 12, -15, still);
        await page.waitForTimeout(1000);
        const out = await page.evaluate(() => {
            const w = window as unknown as { __ev: { k: string }[]; __film: { mark: number; frames: number[][]; stop: boolean } };
            w.__film.stop = true;
            const i = w.__ev.findIndex((e) => e.k === "after-12");
            const tail = w.__ev.slice(i + 1);
            const f = w.__film;
            const before = f.frames.filter((x) => x[0] < f.mark);
            const after = f.frames.filter((x) => x[0] >= f.mark).slice(0, 14);
            return { movesAfterTwelfth: tail.filter((e) => e.k === "pointermove").length, tail, top: [before[before.length - 1], ...after].map((x) => [Math.round(x[0] - f.mark), +x[1].toFixed(1)]) };
        });
        await info.attach("rest", { body: JSON.stringify(out), contentType: "application/json" });
        console.log(info.title, JSON.stringify(out));
    });
}
