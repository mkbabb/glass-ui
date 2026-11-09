// glass-ui 11.0.0 critique 1 — probes. Layout and hit-testing only, never pixels.
import { expect, test, type Page } from "@playwright/test";

const HARNESS = "/docs/release-11.0.0/critique-1/harness.html";
async function open(page: Page, q: string) {
    await page.goto(`${HARNESS}?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(400);
}
const rect = (page: Page, sel: string) =>
    page.evaluate((s) => {
        const r = document.querySelector<HTMLElement>(s)!.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width };
    }, sel);

/** Press the summary and sample the dock's painted inline edges every frame for 900 ms. */
async function pressAndTrace(page: Page) {
    const trace = page.evaluate(
        () =>
            new Promise<{ left: number; right: number }[]>((resolve) => {
                const dock = document.querySelector<HTMLElement>('[data-probe="dock"]')!;
                const out: { left: number; right: number }[] = [];
                const t0 = performance.now();
                const tick = () => {
                    const r = dock.getBoundingClientRect();
                    out.push({ left: r.left, right: r.right });
                    if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                    else resolve(out);
                };
                requestAnimationFrame(tick);
            }),
    );
    const h = page.locator('[data-probe="handle"]');
    if (test.info().project.use.hasTouch) await h.tap();
    else await h.click();
    return trace;
}

for (const box of ["flex", "grid"] as const) {
    for (const anchor of ["end", "start"] as const) {
        test(`anchor=${anchor} in a ${box} row with free space pins the dock to that edge`, async ({ page }) => {
            await open(page, `scene=row&box=${box}&anchor=${anchor}`);
            const row = await rect(page, '[data-probe="row"]');
            const dock = await rect(page, '[data-probe="dock"]');
            const margins = await page.evaluate(() => {
                const cs = getComputedStyle(document.querySelector('[data-probe="dock"]')!);
                return { start: cs.marginInlineStart, end: cs.marginInlineEnd };
            });
            test.info().annotations.push({ type: "geometry", description: JSON.stringify({ row, dock, margins }) });
            const edge = anchor === "end" ? row.right - dock.right : dock.left - row.left;
            expect(Math.abs(edge), `the ${anchor} edge gap (dock ${dock.left}..${dock.right} in row ${row.left}..${row.right}; margins ${JSON.stringify(margins)})`).toBeLessThan(1.5);
        });
    }
}

test("atlas lane: the figure dock's end edge holds through the press expand", async ({ page }) => {
    await open(page, "scene=atlas");
    const ctl = await rect(page, '[data-probe="control"]');
    const before = await rect(page, '[data-probe="dock"]');
    const frames = await pressAndTrace(page);
    await page.waitForTimeout(300);
    const after = await rect(page, '[data-probe="dock"]');
    const drift = Math.max(...frames.map((f) => Math.abs(f.right - before.right)));
    test.info().annotations.push({ type: "geometry", description: JSON.stringify({ ctl, before, after, drift, n: frames.length }) });
    expect(Math.abs(before.right - ctl.right), "collapsed handle at the lane's end").toBeLessThan(1.5);
    expect(after.width, "the dock expanded").toBeGreaterThan(before.width + 40);
    expect(drift, "end edge drift across the morph").toBeLessThan(2);
});

test("page dock: every posture stays on screen and hit-testable", async ({ page }) => {
    await open(page, "scene=page");
    const vw = page.viewportSize()!.width;
    const touch = !!test.info().project.use.hasTouch;
    const onScreen = async (label: string) => {
        const d = await rect(page, '[data-probe="dock"]');
        expect(d.left, `${label}: left`).toBeGreaterThanOrEqual(-0.5);
        expect(d.right, `${label}: right`).toBeLessThanOrEqual(vw + 0.5);
        const hScroll = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        expect(hScroll, `${label}: no horizontal page scroll`).toBeLessThanOrEqual(0);
    };
    await onScreen("collapsed");
    const handle = page.locator('[data-probe="handle"]');
    if (touch) await handle.tap();
    else await handle.hover();
    await page.waitForTimeout(900);
    const expanded = await page.evaluate(() => document.querySelector('[data-probe="dock"]')!.getAttribute("data-expanded") ?? document.querySelector('[data-probe="dock"]')!.className);
    test.info().annotations.push({ type: "expanded", description: String(expanded) });
    await onScreen("expanded");
    const hits = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-seat]")].map((s) => {
            const r = s.getBoundingClientRect();
            const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return { seat: s.dataset.seat, w: r.width, hit: !!el && s.contains(el) };
        }),
    );
    test.info().annotations.push({ type: "hits", description: JSON.stringify(hits) });
    expect(hits.length).toBe(5);
    for (const h of hits) expect(h.hit, `seat ${h.seat} hit-testable`).toBe(true);
    for (const h of hits) expect(h.w, `seat ${h.seat} width`).toBeGreaterThanOrEqual(touch ? 40 : 28);
    // Leave: a press outside (touch) or moving away (fine) collapses it again.
    if (touch) await page.locator('[data-probe="outside"]').tap();
    else await page.mouse.move(5, 5);
    await page.waitForTimeout(2500);
    await onScreen("re-collapsed");
});
