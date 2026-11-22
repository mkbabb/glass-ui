// Critic 11, readings only: a Tooltip's entrance and exit on the exits harness at 1440, filmed
// per animation frame: the content's computed scale, opacity and box. It asks whether the
// entrance moves on more than opacity (the tooltip register's slight scale with its squish),
// and whether 11.1.0 grew the hint as it arrived.
import { test } from "@playwright/test";
import { gotoReady } from "../release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";
const CONTENT = '[data-testid="x-tooltip-content"]';

test("tooltip scale · the entrance and the exit, per frame", async ({ page }, info) => {
    test.skip(info.project.name.endsWith("-phone"), "a Tooltip does not open on touch");
    await gotoReady(page, HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const reads: unknown[] = [];
    for (let i = 0; i < 3; i++) {
        await page.mouse.move(5, 5);
        await page.waitForTimeout(700);
        await page.evaluate((sel) => {
            const w = window as unknown as { __tt: { t0: number; stop: boolean; frames: unknown[] } };
            const film = { t0: performance.now(), stop: false, frames: [] as unknown[] };
            w.__tt = film;
            const tick = (ft: number) => {
                const el = document.querySelector(sel) as HTMLElement | null;
                if (el) {
                    const cs = getComputedStyle(el);
                    const b = el.getBoundingClientRect();
                    film.frames.push({ t: Math.round(ft - film.t0), state: el.dataset.state, scale: cs.scale, op: +(+cs.opacity).toFixed(3), w: +b.width.toFixed(1), h: +b.height.toFixed(1), cls: el.className.includes("glass-reveal") });
                } else film.frames.push({ t: Math.round(ft - film.t0), present: false });
                if (!film.stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, CONTENT);
        await page.locator('[data-testid="x-tooltip"]').hover();
        await page.waitForTimeout(900);
        await page.mouse.move(5, 5);
        await page.waitForTimeout(600);
        const frames = await page.evaluate(() => {
            const f = (window as unknown as { __tt: { stop: boolean; frames: unknown[] } }).__tt;
            f.stop = true;
            return f.frames;
        });
        reads.push(frames);
    }
    await info.attach("tooltip", { body: JSON.stringify(reads), contentType: "application/json" });
});
