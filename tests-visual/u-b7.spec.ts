// glass-ui U/B7 (atlas, proposed 10.2.0) — the engine witnesses. Each drives
// `u-b7/harness.html?scene=<name>` (the real components from `src/` under the demo's
// own cascade) and reads layout, hit-testing, scroll offsets and focus, never pixels.
// D-5 and the run's page containment are RED on 10.1.1 (bbf176f02) with this spec and
// harness, and GREEN on u/b7-glass-perf. Config: `u-b7/playwright.config.ts`.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/u-b7/harness.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
}

type RunState = { top: number; max: number; pageY: number; visible: number[]; focused: number | null };
const runState = (page: Page) =>
    page.evaluate((): RunState => {
        const run = document.querySelector<HTMLElement>(".dock-run")!;
        const port = run.getBoundingClientRect();
        const visible = [...run.querySelectorAll<HTMLElement>("[data-seat]")]
            .filter((s) => {
                const r = s.getBoundingClientRect();
                return r.top >= port.top - 0.5 && r.bottom <= port.bottom + 0.5;
            })
            .map((s) => Number(s.dataset.seat));
        const f = (document.activeElement as HTMLElement | null)?.closest<HTMLElement>("[data-seat]");
        return {
            top: run.scrollTop,
            max: run.scrollHeight - run.clientHeight,
            pageY: scrollY,
            visible,
            focused: f ? Number(f.dataset.seat) : null,
        };
    });

test.describe("U/B7", () => {
    // ── D-5 · a seat tapped 100 ms after its owner opens the vertical dock ──────────
    test("D-5 · a seat pressed mid-morph after an owner-opened expand is hit and activated", async ({
        page,
    }, info) => {
        await open(page, "scene=dock-morph");
        await page.waitForTimeout(500);
        await page.evaluate(() => (window as any).__dock().expand());
        await page.waitForTimeout(100);
        const at = await page.evaluate(() => {
            const seat = document.querySelector<HTMLElement>('[data-seat="2"]')!;
            const r = seat.getBoundingClientRect();
            const x = r.left + r.width / 2;
            const y = r.top + r.height / 2;
            const hit = document.elementFromPoint(x, y);
            return {
                x,
                y,
                morphing: document.querySelector(".glass-dock")!.hasAttribute("data-morphing"),
                onSeat: !!hit && seat.contains(hit),
            };
        });
        expect(at.morphing, "the probe lands inside the morph").toBe(true);
        expect(at.onSeat, "the seat is inside the dock's hit box").toBe(true);
        if (info.project.use.hasTouch && info.project.name.startsWith("chromium")) {
            await page.touchscreen.tap(at.x, at.y);
        } else {
            await page.mouse.click(at.x, at.y);
        }
        await page.waitForTimeout(50);
        expect(await page.evaluate(() => [...(window as any).__clicks])).toEqual(["Section 2"]);
    });

    // ── the expanded run (R-INTERACT §7, PLAN §2.4) ─────────────────────────────────
    test("run · the wheel reaches every seat, returns to the top, and never scrolls the page", async ({
        page,
    }) => {
        await open(page, "scene=dock-run&open=1&seats=16");
        await page.waitForTimeout(800);
        const box = (await page.locator(".dock-run").boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        const seen = new Set<number>((await runState(page)).visible);
        const tops: number[] = [];
        let pageY = 0;
        for (const dir of [60, -60]) {
            // 24 steps each way: past the end, and past the Firefox wheel-transaction lapse
            for (let i = 0; i < 24; i++) {
                await page.mouse.wheel(0, dir);
                await page.waitForTimeout(250);
                const s = await runState(page);
                s.visible.forEach((v) => seen.add(v));
                tops.push(s.top);
                pageY = Math.max(pageY, s.pageY);
            }
        }
        const s = await runState(page);
        expect(s.max, "the run overflows its port").toBeGreaterThan(0);
        expect([...seen].sort((a, b) => a - b)).toEqual(Array.from({ length: 16 }, (_, i) => i + 1));
        expect(Math.max(...tops), "the wheel reaches the end").toBeGreaterThanOrEqual(s.max - 1);
        expect(tops.at(-1), "the wheel returns to the top (no trap)").toBe(0);
        expect(pageY, "the page behind the dock did not scroll").toBe(0);
    });

    test("run · the arrows walk every seat once, in order, each one in view", async ({ page }) => {
        await open(page, "scene=dock-run&open=1&seats=16");
        await page.waitForTimeout(800);
        await page.locator('[data-seat="1"]').focus();
        const walk: number[] = [];
        for (let i = 0; i < 15; i++) {
            await page.keyboard.press("ArrowDown");
            await page.waitForTimeout(250);
            const s = await runState(page);
            walk.push(s.focused ?? -1);
            expect(s.visible, `seat ${s.focused} is in view`).toContain(s.focused);
            expect(s.pageY).toBe(0);
        }
        expect(walk).toEqual(Array.from({ length: 15 }, (_, i) => i + 2));
    });

    test("run · every seat is clickable once reached", async ({ page }) => {
        await open(page, "scene=dock-run&open=1&seats=16");
        await page.waitForTimeout(800);
        for (let seat = 1; seat <= 16; seat++) {
            const el = page.locator(`[data-seat="${seat}"]`);
            await el.scrollIntoViewIfNeeded();
            await page.waitForTimeout(250);
            await el.click();
        }
        const clicks = await page.evaluate(() => [...(window as any).__clicks]);
        expect(clicks).toEqual(Array.from({ length: 16 }, (_, i) => `Section ${i + 1}`));
        expect(await page.evaluate(() => scrollY)).toBe(0);
    });

    test("run · a touch drag pans the run and not the page", async ({ page, context }, info) => {
        test.skip(!info.project.name.startsWith("chromium") || !info.project.use.hasTouch, "CDP touch input: Chromium coarse only");
        await open(page, "scene=dock-run&open=1&seats=16");
        await page.waitForTimeout(800);
        const box = (await page.locator(".dock-run").boundingBox())!;
        const cx = box.x + box.width / 2;
        const cy = box.y + box.height / 2;
        const cdp = await context.newCDPSession(page);
        const swipe = async (dy: number) => {
            const y0 = cy + (dy > 0 ? 60 : -60);
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: cx, y: y0 }] });
            for (let k = 1; k <= 8; k++) {
                await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: cx, y: y0 - (dy * k) / 8 }] });
                await page.waitForTimeout(16);
            }
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            await page.waitForTimeout(500);
        };
        let pageY = 0;
        const tops: number[] = [];
        for (const dy of [80, 80, 80, 80, -80, -80, -80, -80, -80, -80]) {
            await swipe(dy);
            const s = await runState(page);
            tops.push(s.top);
            pageY = Math.max(pageY, s.pageY);
        }
        const max = (await runState(page)).max;
        expect(Math.max(...tops)).toBeGreaterThanOrEqual(max - 1);
        expect(tops.at(-1)).toBe(0);
        expect(pageY).toBe(0);
    });

    // ── F6 · the ground does not follow the scroll ─────────────────────────────────
    test("F6 · twelve scroll steps write nothing to the aurora ground", async ({ page }) => {
        await open(page, "scene=aurora-scroll&mode=css");
        await page.waitForTimeout(600);
        await page.evaluate(() => {
            (window as any).__groundWrites = 0;
            const mo = new MutationObserver((records) => {
                (window as any).__groundWrites += records.length;
            });
            for (const el of document.querySelectorAll(".aurora-placeholder")) {
                mo.observe(el, { attributes: true, attributeFilter: ["style"] });
            }
        });
        for (let i = 0; i < 12; i++) {
            await page.mouse.wheel(0, 240);
            await page.waitForTimeout(120);
        }
        expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
        expect(await page.evaluate(() => (window as any).__groundWrites)).toBe(0);
    });
});

// ── anchor · the figure dock pins to the named edge of its container ────────────────
const rectOf = (page: Page, sel: string) =>
    page.evaluate((s) => {
        const r = document.querySelector<HTMLElement>(s)!.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    }, sel);

test.describe("anchor", () => {
    const cells: { box: "flex" | "grid"; anchor: "start" | "end"; dir: "ltr" | "rtl"; orientation: "horizontal" | "vertical" }[] = [];
    for (const box of ["flex", "grid"] as const)
        for (const anchor of ["start", "end"] as const) {
            cells.push({ box, anchor, dir: "ltr", orientation: "horizontal" });
            cells.push({ box, anchor, dir: "ltr", orientation: "vertical" });
        }
    cells.push({ box: "flex", anchor: "end", dir: "rtl", orientation: "horizontal" });
    for (const c of cells) {
        test(`anchor · ${c.anchor} in a ${c.box} ${c.orientation === "vertical" ? "column" : "row"} (${c.dir}) with free space pins the dock to that edge`, async ({ page }) => {
            await open(page, `scene=figure-row&box=${c.box}&anchor=${c.anchor}&dir=${c.dir}&orientation=${c.orientation}`);
            await page.waitForTimeout(400);
            const row = await rectOf(page, '[data-probe="row"]');
            const dock = await rectOf(page, '[data-probe="dock"]');
            let near: number;
            let far: number;
            if (c.orientation === "vertical") {
                near = c.anchor === "end" ? row.bottom - dock.bottom : dock.top - row.top;
                far = c.anchor === "end" ? dock.top - row.top : row.bottom - dock.bottom;
            } else {
                // The inline end is the right in ltr and the left in rtl.
                const atRight = (c.anchor === "end") === (c.dir === "ltr");
                near = atRight ? row.right - dock.right : dock.left - row.left;
                far = atRight ? dock.left - row.left : row.right - dock.right;
            }
            const at = JSON.stringify({ row, dock });
            expect(Math.abs(near), `the anchored edge sits on the container's edge: ${at}`).toBeLessThan(1.5);
            expect(far, `the free space is on the other side: ${at}`).toBeGreaterThan(100);
        });
    }

    test("anchor · atlas's figure lane holds its end edge through the press expand", async ({ page }, info) => {
        await open(page, "scene=figure-atlas");
        await page.waitForTimeout(400);
        const control = await rectOf(page, '[data-probe="control"]');
        const before = await rectOf(page, '[data-probe="dock"]');
        const trace = page.evaluate(
            () =>
                new Promise<number[]>((resolve) => {
                    const dock = document.querySelector<HTMLElement>('[data-probe="dock"]')!;
                    const out: number[] = [];
                    const t0 = performance.now();
                    const tick = () => {
                        out.push(dock.getBoundingClientRect().right);
                        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                        else resolve(out);
                    };
                    requestAnimationFrame(tick);
                }),
        );
        const handle = page.locator('[data-probe="handle"]');
        if (info.project.use.hasTouch) await handle.tap();
        else await handle.click();
        const rights = await trace;
        await page.waitForTimeout(300);
        const after = await rectOf(page, '[data-probe="dock"]');
        const drift = Math.max(...rights.map((r) => Math.abs(r - before.right)));
        expect(Math.abs(before.right - control.right), "the collapsed handle sits at the lane's end").toBeLessThan(1.5);
        expect(after.width, "the dock expanded").toBeGreaterThan(before.width + 40);
        expect(drift, "the end edge holds across the morph").toBeLessThan(2);
    });
});
