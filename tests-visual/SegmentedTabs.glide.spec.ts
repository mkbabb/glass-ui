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
