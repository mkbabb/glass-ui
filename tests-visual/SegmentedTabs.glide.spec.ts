// U/B7 G1 (1) — the SegmentedTabs glide, sampled every frame in a real engine.
//
// The owner's order of 2026-10-19 (O-4): "The tabs animations on the filter on the
// homepage is flashy and too gaudy--more glass-ui and subtle". The spec (PLAN §4.1,
// R-TABS §3): one object moves, the indicator, at its own size, in one monotone leg;
// the strip does not move and no tab scales on hover or press.
//
// On the 10.1.1 tag the indicator spans and swells in transit (R-TABS §2 measured
// 125.7–245.3 px of width on an adjacent hop), the pressed tab squishes to 0.97, and an
// inactive tab lifts on hover. Each assertion below fails there.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page): Promise<void> {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=tabs");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(400);
}

interface Frame {
    t: number;
    x: number;
    w: number;
    h: number;
    stripLeft: number;
    btnTransform: string;
    btnScale: string;
}

/** Click tab `to` from inside the page and record every frame for `ms`. */
async function hop(page: Page, to: number, ms = 700): Promise<Frame[]> {
    return page.evaluate(
        ([to, ms]) =>
            new Promise<Frame[]>((resolve) => {
                const strip = document.querySelector<HTMLElement>(".segmented-tabs")!;
                const ind = strip.querySelector<HTMLElement>(".segmented-indicator")!;
                const btn = strip.querySelectorAll<HTMLElement>(".segmented-tab")[to]!;
                const frames: Frame[] = [];
                const t0 = performance.now();
                const sample = () => {
                    const r = ind.getBoundingClientRect();
                    const cs = getComputedStyle(btn);
                    frames.push({
                        t: performance.now() - t0,
                        x: r.left,
                        w: r.width,
                        h: r.height,
                        stripLeft: strip.getBoundingClientRect().left,
                        btnTransform: cs.transform,
                        btnScale: cs.scale,
                    });
                    if (performance.now() - t0 < ms) requestAnimationFrame(sample);
                    else resolve(frames);
                };
                btn.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
                btn.click();
                requestAnimationFrame(sample);
            }),
        [to, ms] as const,
    );
}

const identity = (transform: string, scale: string) =>
    (transform === "none" || /^matrix\(1, 0, 0, 1, /.test(transform)) &&
    (scale === "none" || scale === "1");

for (const [label, to] of [
    ["adjacent hop", 1],
    ["far hop", 4],
] as const) {
    test(`${label}: the indicator glides at its own size in one monotone leg`, async ({ page }) => {
        await open(page);
        const rest = await page.evaluate(() => {
            const strip = document.querySelector<HTMLElement>(".segmented-tabs")!;
            const r = strip.querySelector<HTMLElement>(".segmented-indicator")!.getBoundingClientRect();
            const target = strip.querySelectorAll<HTMLElement>(".segmented-tab");
            return {
                w: r.width,
                h: r.height,
                tabs: Array.from(target, (b) => b.getBoundingClientRect().left),
            };
        });
        const frames = await hop(page, to);
        expect(frames.length).toBeGreaterThan(10);

        // Size: constant on every frame.
        const widths = frames.map((f) => f.w);
        const heights = frames.map((f) => f.h);
        expect(Math.max(...widths) - rest.w, `width rose to ${Math.max(...widths)}`).toBeLessThanOrEqual(0.5);
        expect(rest.w - Math.min(...widths), `width fell to ${Math.min(...widths)}`).toBeLessThanOrEqual(0.5);
        expect(Math.max(...heights) - rest.h).toBeLessThanOrEqual(0.5);
        expect(rest.h - Math.min(...heights)).toBeLessThanOrEqual(0.5);

        // One leg: x never moves backwards, and it lands on the target tab.
        for (let i = 1; i < frames.length; i++) {
            expect(frames[i]!.x, `frame ${i} moved back`).toBeGreaterThanOrEqual(frames[i - 1]!.x - 0.25);
        }
        const last = frames[frames.length - 1]!;
        expect(Math.abs(last.x - rest.tabs[to]!)).toBeLessThanOrEqual(1);
        // It settles inside the travel clock (210 ms at tempo 1), with room for frame jitter.
        const settled = frames.find((f) => Math.abs(f.x - rest.tabs[to]!) <= 0.5);
        expect(settled, "never reached the target").toBeDefined();
        expect(settled!.t).toBeLessThan(400);

        // The strip does not move.
        const lefts = frames.map((f) => f.stripLeft);
        expect(Math.max(...lefts) - Math.min(...lefts)).toBeLessThanOrEqual(0.01);

        // The pressed tab does not squish.
        for (const f of frames) {
            expect(identity(f.btnTransform, f.btnScale), `press ${f.btnTransform} / ${f.btnScale}`).toBe(true);
        }
    });
}

test("hover on an inactive tab changes its colour and nothing else", async ({ page }) => {
    await open(page);
    const tab = page.locator(".segmented-tab").nth(2);
    const before = await tab.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { color: cs.color, rect: el.getBoundingClientRect().toJSON() };
    });
    await tab.hover();
    await page.waitForTimeout(450);
    const after = await tab.evaluate((el) => {
        const cs = getComputedStyle(el);
        return {
            color: cs.color,
            transform: cs.transform,
            scale: cs.scale,
            translate: cs.translate,
            rect: el.getBoundingClientRect().toJSON(),
        };
    });
    expect(identity(after.transform, after.scale), `${after.transform} / ${after.scale}`).toBe(true);
    expect(after.translate === "none" || after.translate === "0px").toBe(true);
    expect(after.rect.width).toBeCloseTo(before.rect.width, 1);
    expect(after.rect.top).toBeCloseTo(before.rect.top, 1);
    expect(after.color).not.toBe(before.color);
});

// U/B7d M3 repair 1. The active tab forwards a press to the grabbable indicator. Measured
// on /sci: re-clicking it threw the indicator 635 px right in one frame, past the strip's
// end, and in Chromium it stayed there.
function startTrace(page: Page, ms: number): Promise<void> {
    return page.evaluate((ms) => {
        const ind = document.querySelector<HTMLElement>(".segmented-indicator")!;
        const xs: number[] = [];
        const t0 = performance.now();
        (window as unknown as { __xs: Promise<number[]> }).__xs = new Promise((resolve) => {
            const sample = () => {
                xs.push(ind.getBoundingClientRect().left);
                if (performance.now() - t0 < ms) requestAnimationFrame(sample);
                else resolve(xs);
            };
            requestAnimationFrame(sample);
        });
    }, ms);
}

for (const [label, off] of [
    ["on its centre", 0],
    ["off its centre", 30],
] as const) {
    test(`re-clicking the active tab ${label} moves nothing`, async ({ page }) => {
        await open(page);
        const box = await page.locator(".segmented-tab[data-active]").boundingBox();
        const restX = await page.locator(".segmented-indicator").evaluate((el) => el.getBoundingClientRect().left);
        await startTrace(page, 900);
        await page.mouse.click(box!.x + box!.width / 2 + off, box!.y + box!.height / 2);
        const frames = await page.evaluate(() => (window as unknown as { __xs: Promise<number[]> }).__xs);
        expect(frames.length).toBeGreaterThan(10);
        for (const x of frames) expect(Math.abs(x - restX), `indicator at ${x}, rest ${restX}`).toBeLessThanOrEqual(0.5);
        const style = await page.locator(".segmented-indicator").getAttribute("style");
        expect(style ?? "", "gesture residue on the indicator").not.toMatch(/transform:\s*translate/);
        await expect(page.locator(".segmented-tab[data-active]")).toHaveCount(1);
    });
}

test("the indicator can be dragged to the next tab, and stays under the label it commits", async ({ page }) => {
    await open(page);
    const a = await page.locator(".segmented-tab").nth(0).boundingBox();
    const b = await page.locator(".segmented-tab").nth(1).boundingBox();
    const y = a!.y + a!.height / 2;
    await page.mouse.move(a!.x + a!.width / 2 + 10, y);
    await page.mouse.down();
    await page.mouse.move(b!.x + b!.width / 2 + 10, y, { steps: 8 });
    await page.waitForTimeout(250);
    const mid = await page.locator(".segmented-indicator").evaluate((el) => el.getBoundingClientRect().left);
    expect(Math.abs(mid - b!.x), `mid-drag indicator at ${mid}, next tab at ${b!.x}`).toBeLessThanOrEqual(12);
    await page.mouse.up();
    await page.waitForTimeout(700);
    const rest = await page.locator(".segmented-indicator").evaluate((el) => el.getBoundingClientRect().left);
    const active = page.locator(".segmented-tab[data-active]");
    const activeBox = await active.boundingBox();
    expect(Math.abs(rest - activeBox!.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(activeBox!.x - b!.x)).toBeLessThanOrEqual(1);
});

// U/B7d M3 repair 2. A press on the active tab, a drag out and back, and a release on the
// start point. Measured on atlas /vft-germination: the indicator kept
// `transition-property: none`, and the next click landed with no glide in Chromium and
// in one frame in Firefox. The press lands on a whole pixel, as a mouse reports it, and the
// pointer is still moving when it is released.
for (const dx of [8, 24]) {
    test(`a ${dx} px drag out and back, released on its start, leaves the next hop gliding`, async ({ page }) => {
        await open(page);
        const a = await page.locator(".segmented-tab[data-active]").boundingBox();
        const x0 = Math.round(a!.x + a!.width / 2);
        const y = Math.round(a!.y + a!.height / 2);
        await page.mouse.move(x0, y);
        await page.mouse.down();
        await page.mouse.move(x0 + dx, y, { steps: 4 });
        // Hold past the Draggable's 100 ms velocity window, so the release still carries
        // the return's speed.
        await page.waitForTimeout(150);
        await page.mouse.move(x0, y, { steps: 4 });
        await page.mouse.up();
        await page.waitForTimeout(300);
        const style = (await page.locator(".segmented-indicator").getAttribute("style")) ?? "";

        const target = await page.locator(".segmented-tab").nth(1).evaluate((el) => el.getBoundingClientRect().left);
        const from = await page.locator(".segmented-indicator").evaluate((el) => el.getBoundingClientRect().left);
        const frames = await hop(page, 1);
        const travel = target - from;
        expect(Math.abs(travel)).toBeGreaterThan(20);
        // A glide crosses the hop in several frames; no single frame carries more than half.
        const moving = frames.filter((f, i) => Math.abs(f.x - (i > 0 ? frames[i - 1]!.x : from)) > 0.25).length;
        let maxStep = Math.abs(frames[0]!.x - from);
        for (let i = 1; i < frames.length; i++) maxStep = Math.max(maxStep, Math.abs(frames[i]!.x - frames[i - 1]!.x));
        const settled = frames.find((f) => Math.abs(f.x - target) <= 0.5);
        expect(settled, "never reached the next tab").toBeDefined();
        expect(settled!.t).toBeLessThan(400);
        expect(moving, `moving frames ${moving}`).toBeGreaterThanOrEqual(4);
        expect(maxStep, `largest frame step ${maxStep} of ${travel}`).toBeLessThanOrEqual(Math.abs(travel) / 2);
        expect(style, "gesture residue on the indicator").not.toMatch(/transition-property:\s*none|transform:\s*translate/);
    });
}
