// Fix seat 5 probe, readings only (no cell fails on what it reads).
//
//   stall  the reopen cell's sequence on a Collapsible (open, rest 900 ms, close, 50 ms,
//          reopen; `closeturn` opens from closed and closes 60 ms in, the turn the other way; `late` waits 130 ms, so the reopen lands near the closed end), filmed whole: each frame's time and the region's height, and the page
//          time of each input event, so a hole can be placed before the close, between
//          the close and the reopen, or after the reopen. `alone` closes from rest with no
//          reopen, `open` opens from closed with no turn.
import { test, type Page } from "@playwright/test";

const HARNESS = "/tests-visual/release-11-1-1/exits-harness.html";
const TRIGGER = '[data-testid="x-collapsible"]';
const CONTENT = '[data-testid="x-collapsible-content"]';

async function tap(page: Page, project: string) {
    await page.locator(TRIGGER).scrollIntoViewIfNeeded();
    const b = (await page.locator(TRIGGER).boundingBox())!;
    if (project.endsWith("-phone")) await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
    else await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
}

async function film(page: Page) {
    await page.evaluate((sel) => {
        const w = window as unknown as { __f: { frames: [number, number][]; inputs: [string, number, number][]; stop: boolean } };
        const f = { frames: [] as [number, number][], inputs: [] as [string, number, number][], stop: false };
        w.__f = f;
        const tick = (t: number) => {
            const el = document.querySelector(sel);
            f.frames.push([+t.toFixed(1), el ? +el.getBoundingClientRect().height.toFixed(1) : 0]);
            if (!f.stop) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        for (const type of ["pointerdown", "click"]) addEventListener(type, (e) => f.inputs.push([type, +performance.now().toFixed(1), f.frames.length]), { capture: true });
    }, CONTENT);
    await page.waitForTimeout(80);
}

async function stop(page: Page) {
    return page.evaluate(() => {
        const f = (window as unknown as { __f: { frames: [number, number][]; inputs: [string, number, number][]; stop: boolean } }).__f;
        f.stop = true;
        return { frames: f.frames, inputs: f.inputs };
    });
}

for (const kind of ["closeturn", "reopen", "late", "alone", "open"] as const) {
    test(`stall · ${kind}`, async ({ page }, info) => {
        const project = info.project.name;
        await page.goto(HARNESS);
        await page.locator("body[data-ready='1']").waitFor({ state: "attached" }).catch(() => {});
        await page.waitForTimeout(600);
        if (kind !== "open" && kind !== "closeturn") {
            await tap(page, project);
            await page.waitForTimeout(900);
        }
        await film(page);
        await tap(page, project);
        if (kind === "reopen" || kind === "late" || kind === "closeturn") {
            await page.waitForTimeout(kind === "late" ? 130 : kind === "closeturn" ? 60 : 50);
            await tap(page, project);
        }
        await page.waitForTimeout(900);
        const f = await stop(page);
        let hole = 0, at = -1;
        for (let i = 1; i < f.frames.length; i++) {
            const g = f.frames[i][0] - f.frames[i - 1][0];
            if (g > hole) { hole = g; at = i; }
        }
        const read = { kind, hole: +hole.toFixed(1), holeFrame: at, holeAt: at > 0 ? f.frames[at - 1][0] : null, inputs: f.inputs, frames: f.frames.slice(0, 60) };
        await info.attach("stall", { body: JSON.stringify(read), contentType: "application/json" });
    });
}
