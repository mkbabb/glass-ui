// glass-ui 11.0.0 critique 2 — the dock in every posture. Layout, hit-testing and real
// pointer/touch delivery only, never pixels.
import { expect, test, type Page } from "@playwright/test";

const HARNESS = "/docs/release-11.0.0/critique-2/harness.html";
const DOCK = '[data-probe="dock"]';
async function open(page: Page, q: string) {
    await page.goto(`${HARNESS}?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(500);
}
const touch = () => !!test.info().project.use.hasTouch;
const rect = (page: Page, sel: string) =>
    page.evaluate((s) => {
        const r = document.querySelector<HTMLElement>(s)!.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    }, sel);
const cls = (page: Page) => page.evaluate((s) => document.querySelector(s)!.className, DOCK);
const note = (k: string, v: unknown) => test.info().annotations.push({ type: k, description: JSON.stringify(v) });

async function press(page: Page, x: number, y: number) {
    if (touch()) await page.touchscreen.tap(x, y);
    else await page.mouse.click(x, y);
}
async function pressSel(page: Page, sel: string) {
    const r = await rect(page, sel);
    await press(page, r.left + r.width / 2, r.top + r.height / 2);
}

async function onScreen(page: Page, label: string) {
    const vw = page.viewportSize()!.width;
    const vh = page.viewportSize()!.height;
    const d = await rect(page, DOCK);
    expect(d.left, `${label}: left`).toBeGreaterThanOrEqual(-0.5);
    expect(d.right, `${label}: right`).toBeLessThanOrEqual(vw + 0.5);
    expect(d.top, `${label}: top`).toBeGreaterThanOrEqual(-0.5);
    expect(d.bottom, `${label}: bottom`).toBeLessThanOrEqual(vh + 0.5);
    const hScroll = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    expect(hScroll, `${label}: no horizontal page scroll`).toBeLessThanOrEqual(0);
}

/** Every seat is hit-testable at its centre, and a real press on one reaches its handler. */
async function seatsWork(page: Page, label: string, n: number, pressed: string) {
    const hits = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-seat]")].map((s) => {
            const r = s.getBoundingClientRect();
            const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
            return { seat: s.dataset.seat, w: r.width, h: r.height, hit: !!el && s.contains(el) };
        }),
    );
    note(`${label} hits`, hits);
    expect(hits.length, `${label}: seat count`).toBe(n);
    for (const h of hits) expect(h.hit, `${label}: seat ${h.seat} hit-testable`).toBe(true);
    for (const h of hits) expect(Math.min(h.w, h.h), `${label}: seat ${h.seat} size`).toBeGreaterThanOrEqual(touch() ? 40 : 28);
    const before = await page.evaluate((s) => (window as any).__clicks[s] ?? 0, pressed);
    await pressSel(page, `[data-seat="${pressed}"]`);
    await page.waitForTimeout(150);
    const after = await page.evaluate((s) => (window as any).__clicks[s] ?? 0, pressed);
    expect(after, `${label}: a press on ${pressed} reaches it`).toBe(before + 1);
}

for (const orient of ["horizontal", "vertical"] as const) {
    test(`${orient} page dock: collapsed → expanded → collapsed → pinned`, async ({ page }) => {
        await open(page, `scene=page&orient=${orient}&collapse=closed`);
        await onScreen(page, "collapsed");
        expect(await cls(page)).toContain("collapsed");
        // Expand by hover (fine) or tap (coarse).
        if (touch()) await pressSel(page, '[data-probe="handle"]');
        else await page.hover('[data-probe="handle"]');
        await page.waitForTimeout(1000);
        note("expanded class", await cls(page));
        expect(await cls(page), "expanded").toMatch(/\bexpanded\b/);
        await onScreen(page, "expanded");
        await seatsWork(page, "expanded", 5, "Library");
        // Leave: move away (fine) or tap outside (coarse).
        if (touch()) await pressSel(page, '[data-probe="outside"]');
        else await page.mouse.move(900 > page.viewportSize()!.width ? 300 : 900, 300);
        await page.waitForTimeout(4500); // DOCK_COLLAPSE_DELAY_MS is 3600
        note("left class", await cls(page));
        if (!touch()) expect(await cls(page), "collapsed after leave").toMatch(/\bcollapsed\b/);
        await onScreen(page, "re-collapsed");
        if (!touch()) {
            // Keyboard: Tab from the button before the dock lands on the summary (a
            // disclosure whose focus-in is stopped by design); Enter opens it.
            await page.focus('[data-probe="before"]');
            await page.keyboard.press("Tab");
            await page.keyboard.press("Enter");
            await page.waitForTimeout(1000);
            note("focus class", await cls(page));
            expect(await cls(page), "expanded by keyboard focus").toMatch(/\bexpanded\b/);
            await onScreen(page, "focus-expanded");
        }
    });
    for (const c of ["open", "false"] as const) {
        test(`${orient} page dock collapse=${c}: rest posture works`, async ({ page }) => {
            await open(page, `scene=page&orient=${orient}&collapse=${c}`);
            note("class", await cls(page));
            expect(await cls(page), "expanded at rest").toMatch(/\bexpanded\b/);
            await onScreen(page, "rest");
            await seatsWork(page, "rest", 5, "Settings");
            await page.waitForTimeout(600);
            await onScreen(page, "after press");
        });
    }
}

test("figure dock (atlas lane): press opens, Escape / press outside / focus exit close; end edge holds", async ({ page }) => {
    await open(page, "scene=figure");
    const ctl = await rect(page, '[data-probe="control"]');
    const rest = await rect(page, DOCK);
    note("rest", { ctl, rest });
    expect(Math.abs(rest.right - ctl.right), "collapsed handle at the lane's end").toBeLessThan(1.5);
    // Hover never opens a press-only dock.
    if (!touch()) {
        await page.hover('[data-probe="handle"]');
        await page.waitForTimeout(900);
        expect(await cls(page), "hover keeps it closed").toMatch(/\bcollapsed\b/);
    }
    const trace = page.evaluate(
        (sel) =>
            new Promise<number[]>((resolve) => {
                const dock = document.querySelector<HTMLElement>(sel)!;
                const out: number[] = [];
                const t0 = performance.now();
                const tick = () => {
                    out.push(dock.getBoundingClientRect().right);
                    if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                    else resolve(out);
                };
                requestAnimationFrame(tick);
            }),
        DOCK,
    );
    await pressSel(page, '[data-probe="handle"]');
    const rights = await trace;
    const open1 = await rect(page, DOCK);
    note("open", { open1, drift: Math.max(...rights.map((r) => Math.abs(r - rest.right))) });
    expect(await cls(page)).toMatch(/\bexpanded\b/);
    expect(open1.width, "expanded").toBeGreaterThan(rest.width + 40);
    expect(Math.max(...rights.map((r) => Math.abs(r - rest.right))), "end edge drift").toBeLessThan(2);
    await onScreen(page, "figure open");
    await seatsWork(page, "figure", 3, "Download");
    expect(await cls(page), "a seat press keeps it open").toMatch(/\bexpanded\b/);
    // Escape closes.
    await page.keyboard.press("Escape");
    await page.waitForTimeout(900);
    expect(await cls(page), "Escape closes").toMatch(/\bcollapsed\b/);
    // Press opens, press outside closes.
    await pressSel(page, '[data-probe="handle"]');
    await page.waitForTimeout(900);
    expect(await cls(page)).toMatch(/\bexpanded\b/);
    await pressSel(page, '[data-probe="outside"]');
    await page.waitForTimeout(900);
    expect(await cls(page), "press outside closes").toMatch(/\bcollapsed\b/);
    const back = await rect(page, DOCK);
    expect(Math.abs(back.right - rest.right), "rest end edge after close").toBeLessThan(1.5);
    expect(Math.abs(back.width - rest.width), "rest width after close").toBeLessThan(1.5);
    if (!touch()) {
        // Keyboard: Enter on the summary opens; focus leaving to the page closes.
        await page.focus('[data-probe="outside"]');
        await page.keyboard.press("Shift+Tab");
        const onDock = await page.evaluate((sel) => !!document.activeElement?.closest(sel), DOCK);
        note("shift-tab lands in dock", onDock);
        if (onDock) {
            await page.keyboard.press("Enter");
            await page.waitForTimeout(900);
            expect(await cls(page), "Enter opens").toMatch(/\bexpanded\b/);
            await page.focus('[data-probe="outside"]');
            await page.waitForTimeout(900);
            expect(await cls(page), "focus exit closes").toMatch(/\bcollapsed\b/);
        }
    }
});

// The CHANGELOG and MIGRATION say `anchor="start|end"` "names the edge that stays put while
// the dock opens and closes". Lay the dock where the library itself puts it (its own auto
// inline margins centre it in a row) and trace the named edge through a press expand.
for (const anchor of ["end", "start"] as const) {
    test(`anchor=${anchor} in a free row: does the named edge stay put?`, async ({ page }) => {
        await open(page, `scene=row&anchor=${anchor}`);
        const rest = await rect(page, DOCK);
        const trace = page.evaluate(
            (sel) =>
                new Promise<{ l: number; r: number }[]>((resolve) => {
                    const dock = document.querySelector<HTMLElement>(sel)!;
                    const out: { l: number; r: number }[] = [];
                    const t0 = performance.now();
                    const tick = () => {
                        const b = dock.getBoundingClientRect();
                        out.push({ l: b.left, r: b.right });
                        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                        else resolve(out);
                    };
                    requestAnimationFrame(tick);
                }),
            DOCK,
        );
        await pressSel(page, '[data-probe="handle"]');
        const frames = await trace;
        const after = await rect(page, DOCK);
        const edge = (f: { l: number; r: number }) => (anchor === "end" ? f.r : f.l);
        const restEdge = anchor === "end" ? rest.right : rest.left;
        const drift = Math.max(...frames.map((f) => Math.abs(edge(f) - restEdge)));
        note("row", { rest, after, drift, grew: after.width - rest.width });
        expect(after.width, "expanded").toBeGreaterThan(rest.width + 40);
        expect(drift, `the named ${anchor} edge drift through the expand`).toBeLessThan(2);
    });
}

// Keyboard entry, isolated: a fresh page, and the same after a hover-click-leave cycle.
for (const orient of ["horizontal", "vertical"] as const) {
    for (const cycle of [false, true]) {
        test(`kbd ${orient}${cycle ? " after a hover-click-leave cycle" : " fresh"}: Tab to the summary, Enter expands it`, async ({ page }) => {
            test.skip(touch(), "keyboard cell: fine pointer only");
            await open(page, `scene=page&orient=${orient}&collapse=closed`);
            if (cycle) {
                await page.hover('[data-probe="handle"]');
                await page.waitForTimeout(1000);
                await pressSel(page, '[data-seat="Library"]');
                await page.mouse.move(900, 300);
                await page.waitForTimeout(4500);
                expect(await cls(page)).toMatch(/\bcollapsed\b/);
            }
            await page.focus('[data-probe="before"]');
            await page.keyboard.press("Tab");
            await page.waitForTimeout(1000);
            const active = await page.evaluate((sel) => {
                const a = document.activeElement as HTMLElement | null;
                return { tag: a?.tagName, seat: a?.dataset?.seat, label: a?.getAttribute("aria-label"), inDock: !!a?.closest(sel) };
            }, DOCK);
            note("active", active);
            expect(active.inDock, "Tab lands in the dock").toBe(true);
            expect(active.label, "Tab lands on the summary disclosure").toBe("Expand dock");
            await page.keyboard.press("Enter");
            await page.waitForTimeout(1000);
            note("class", await cls(page));
            expect(await cls(page), "Enter on the summary expands").toMatch(/\bexpanded\b/);
            await onScreen(page, "keyboard-expanded");
            const inDock = await page.evaluate((sel) => !!document.activeElement?.closest(sel), DOCK);
            expect(inDock, "focus stays in the dock after Enter").toBe(true);
        });
    }
}
