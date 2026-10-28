// glass-ui 10.1.3 — the engine witnesses for an edge-anchored dock's first expand frame
// (value.js O-110, DOCK-ANCHOR-FIRST-FRAME). Each drives
// `release-10-1-3/harness.html?scene=edge-anchor` (fourier's canvas dock, pinned to the
// stage's right edge by `right` alone, or its mirror on the left; the real components
// from `src/` under the demo's own cascade) at fourier's widths, 360/390/430 (its
// `f-w14v-au2` L2-15) and 1440 (its `f-w14-control-row` G-h). Each reads boxes per
// frame and what a click reached, never pixels. Engines: the `chromium-headless-new`
// project, and the `webkit` project on Playwright WebKit 2287 (`webkit-2287.config.ts`,
// under `guarded --exclusive webkit`). RED on a 10.1.2 tree carrying this spec and
// harness, GREEN on 10.1.3; the click cell is RED in Chromium only (see it).
import { expect, test, type Page } from "@playwright/test";

type W = {
    __ready?: boolean;
    __edits: number;
    __events: string[][];
    __frames: Frame[];
};
type Box = { left: number; right: number; top: number; bottom: number };
type Frame = {
    morphing: boolean;
    dock: Box;
    edit: Box;
    summary: Box;
    collapsed: boolean;
    scrollWidth: number;
};

const EDIT = '[data-witness="Edit contour"]';

type Anchor = "right" | "left" | "bottom";

async function open(
    page: Page,
    anchor: Anchor,
    seat: "anchored" | "open" = "anchored",
): Promise<void> {
    await page.goto(
        `/tests-visual/release-10-1-3/harness.html?scene=edge-anchor&anchor=${anchor}&seat=${seat}`,
    );
    await page.waitForFunction(() => (window as unknown as W).__ready);
    await page.locator(EDIT).waitFor();
    await page.evaluate(() => document.fonts.ready);
    // The pointer starts off the dock, which rests collapsed.
    await page.mouse.move(4, 700);
    await page.waitForTimeout(300);
    await expect(page.locator(".glass-dock")).toHaveClass(/collapsed/);
    await expect(page.locator(".glass-dock")).not.toHaveAttribute("data-morphing");
}

/** Record every pointer event and click the page dispatches, with its target. */
async function listen(page: Page): Promise<void> {
    await page.evaluate((sel) => {
        const w = window as unknown as W;
        w.__events = [];
        const edit = document.querySelector(sel)!;
        for (const type of ["pointerdown", "pointerup", "click"]) {
            document.addEventListener(
                type,
                (e) => {
                    const t = e.target as Element;
                    w.__events.push([
                        type,
                        edit.contains(t) ? "edit" : t.className.toString().slice(0, 40),
                    ]);
                },
                true,
            );
            // What reached the page after the dock's capture-phase guard.
            window.addEventListener(type, (e) => {
                if (type === "click" && e.defaultPrevented)
                    w.__events.push(["click-prevented"]);
            });
        }
    }, EDIT);
}

/** Record the dock's and the Edit seat's painted boxes on every frame for `ms`. */
async function record(page: Page, ms: number): Promise<void> {
    await page.evaluate(
        ({ sel, ms }) => {
            const w = window as unknown as W;
            w.__frames = [];
            const dock = document.querySelector<HTMLElement>(".glass-dock")!;
            const edit = document.querySelector<HTMLElement>(sel)!;
            const summary = document.querySelector<HTMLElement>('[data-witness="summary"]')!;
            const box = (el: Element): Box => {
                const r = el.getBoundingClientRect();
                return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
            };
            const t0 = performance.now();
            const tick = () => {
                w.__frames.push({
                    morphing: dock.hasAttribute("data-morphing"),
                    dock: box(dock),
                    edit: box(edit),
                    summary: box(summary),
                    collapsed: (w as unknown as { __collapsedAt?: number }).__collapsedAt !== undefined,
                    scrollWidth: document.scrollingElement!.scrollWidth,
                });
                if (performance.now() - t0 < ms) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },
        { sel: EDIT, ms },
    );
}

const frames = (page: Page) => page.evaluate(() => (window as unknown as W).__frames);
const edits = (page: Page) => page.evaluate(() => (window as unknown as W).__edits);
const events = (page: Page) => page.evaluate(() => (window as unknown as W).__events);
const rect = async (page: Page, sel: string): Promise<Box> => {
    const b = (await page.locator(sel).boundingBox())!;
    return { left: b.x, right: b.x + b.width, top: b.y, bottom: b.y + b.height };
};

for (const [width, cell] of [
    [360, "fourier f-w14v-au2 L2-15"],
    [390, "fourier f-w14v-au2 L2-15"],
    [430, "fourier f-w14v-au2 L2-15"],
    [1440, "fourier f-w14-control-row G-h"],
] as const) {
    for (const anchor of ["right", "left"] as const) {
        test.describe(`10.1.3 · ${width} · ${anchor}-anchored (${cell})`, () => {
            test.use({ viewport: { width, height: width > 1000 ? 900 : 844 } });

            // fourier's gesture: Playwright's click on the collapsed dock's persistent
            // "Edit contour". The press focuses the seat, which expands the dock between
            // pointerdown and pointerup; the click must reach the seat it was aimed at.
            // A Chromium witness only: WebKit does not focus a button on press, so there
            // the dock expands after the click and this cell is GREEN on 10.1.2 too. The
            // two cells below witness WebKit.
            test("O-110 · a click on the anchored persistent seat of a collapsed dock reaches it", async ({
                page,
            }) => {
                await open(page, anchor);
                await listen(page);
                await page.locator(EDIT).click();
                await page.waitForTimeout(900);
                const seen = await events(page);
                expect(
                    seen,
                    "pointerdown, pointerup and click all on the seat",
                ).toEqual([
                    ["pointerdown", "edit"],
                    ["pointerup", "edit"],
                    ["click", "edit"],
                ]);
                expect(await edits(page), "the seat's own click handler ran once").toBe(
                    1,
                );
            });

            // The hover that expands the dock, read per frame: the first morph frame paints
            // the collapsed box, the anchored edge never moves, the pointer never leaves the
            // seat, and no frame widens the document.
            test("O-110 · the expand grows from the anchored edge from its first frame; the seat stays under the pointer", async ({
                page,
            }) => {
                await open(page, anchor);
                const rest = await rect(page, ".glass-dock");
                const seat = await rect(page, EDIT);
                const x = (seat.left + seat.right) / 2;
                const y = (seat.top + seat.bottom) / 2;
                await record(page, 1100);
                await page.mouse.move(x, y);
                await page.waitForTimeout(1200);
                const all = await frames(page);
                const morph = all.filter((f) => f.morphing);
                expect(morph.length, "the hover armed a morph").toBeGreaterThan(3);
                expect(all.at(-1)!.morphing, "the morph settled").toBe(false);

                const first = morph[0];
                expect(
                    first.dock.left,
                    "first frame: the collapsed box's left edge",
                ).toBeCloseTo(rest.left, 0);
                expect(
                    first.dock.right,
                    "first frame: the collapsed box's right edge",
                ).toBeCloseTo(rest.right, 0);
                const edge = (b: Box) => (anchor === "right" ? b.right : b.left);
                const drift = Math.max(
                    ...morph.map((f) => Math.abs(edge(f.dock) - edge(rest))),
                );
                expect(drift, "the anchored edge holds through the morph").toBeLessThan(
                    0.5,
                );
                const off = morph.filter(
                    (f) =>
                        x < f.edit.left ||
                        x > f.edit.right ||
                        y < f.edit.top ||
                        y > f.edit.bottom,
                );
                expect(off.length, "frames whose seat is not under the pointer").toBe(
                    0,
                );
                expect(
                    Math.max(...all.map((f) => f.scrollWidth)),
                    "no frame widens the document",
                ).toBeLessThanOrEqual(width);
                expect(
                    Math.max(...all.map((f) => f.dock.right)),
                    "no frame exceeds the viewport",
                ).toBeLessThanOrEqual(width);
                expect(
                    Math.min(...all.map((f) => f.dock.left)),
                    "no frame exceeds the viewport",
                ).toBeGreaterThanOrEqual(0);
            });

            // fourier's probe (frames.mjs): hover, and press once the morph is in flight. The
            // seat only moved (if at all) by the dock's own morph, so the guard keeps the
            // click (ask 2).
            test("O-110 · a press on the anchored persistent seat mid-expand is kept", async ({
                page,
            }) => {
                await open(page, anchor);
                await listen(page);
                const seat = await rect(page, EDIT);
                await page.mouse.move(
                    (seat.left + seat.right) / 2,
                    (seat.top + seat.bottom) / 2,
                );
                await page.waitForFunction(() =>
                    document
                        .querySelector(".glass-dock")!
                        .hasAttribute("data-morphing"),
                );
                await page.mouse.down();
                await page.mouse.up();
                await page.waitForTimeout(900);
                expect(await events(page)).toEqual([
                    ["pointerdown", "edit"],
                    ["pointerup", "edit"],
                    ["click", "edit"],
                ]);
                expect(await edits(page)).toBe(1);
            });
        });
    }
}

// ── critique-1 (round 1) ─────────────────────────────────────────────────────────────

const mid = (b: Box) => ({ x: (b.left + b.right) / 2, y: (b.top + b.bottom) / 2 });
const anchoredEdge = (anchor: Anchor) => (b: Box) =>
    anchor === "right" ? b.right : anchor === "left" ? b.left : b.bottom;
const sides = ["left", "right", "top", "bottom"] as const;
const boxDistance = (a: Box, b: Box) => Math.max(...sides.map((k) => Math.abs(a[k] - b[k])));

// D-1 (ask 2): a persistent seat on the OPEN side, the side the expand grows toward.
// The expand has to move it; the press that began on it must still reach it. In
// Chromium the press focuses the seat and the focus expands the dock before pointerup
// (pointer), or before the gesture's click is hit-tested (touch): RED on 10.1.2 and on
// the first 10.1.3 cure, GREEN on 10.1.1. WebKit does not focus on press, so it is
// GREEN on every tree.
for (const [anchor, width] of [
    ["right", 390],
    ["right", 1440],
    ["left", 390],
    ["bottom", 390],
] as const) {
    test.describe(`10.1.3 · ${width} · ${anchor}-anchored, open-side seat`, () => {
        test.use({ viewport: { width, height: width > 1000 ? 900 : 844 } });
        test("D-1 · a click on the open-side persistent seat of a collapsed dock reaches it", async ({
            page,
        }) => {
            await open(page, anchor, "open");
            await listen(page);
            await page.locator(EDIT).click();
            await page.waitForTimeout(900);
            expect(await events(page), "pointerdown, pointerup and click all on the seat").toEqual([
                ["pointerdown", "edit"],
                ["pointerup", "edit"],
                ["click", "edit"],
            ]);
            expect(await edits(page), "the seat's own click handler ran once").toBe(1);
            await expect(page.locator(".glass-dock"), "the press still expands the dock").toHaveClass(
                /expanded/,
            );
        });
    });
}

for (const width of [360, 390, 430]) {
    test.describe(`10.1.3 · ${width} · touch · right-anchored, open-side seat`, () => {
        test.use({ viewport: { width, height: 844 }, hasTouch: true });
        test("D-1 · a tap on the open-side persistent seat of a collapsed dock reaches it", async ({
            page,
        }) => {
            await open(page, "right", "open");
            await listen(page);
            const { x, y } = mid(await rect(page, EDIT));
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(900);
            const seen = await events(page);
            expect(seen.filter(([type]) => type === "click"), "the tap's click is on the seat").toEqual([
                ["click", "edit"],
            ]);
            expect(await edits(page), "the seat's own click handler ran once").toBe(1);
        });
    });
}

// D-2: the collapse, read per frame. The anchored edge holds, the box does not snap at
// settle, and the persistent seat never paints outside the shrinking plate. RED on
// 10.1.1, 10.1.2 and the first 10.1.3 cure (the collapse shrank toward the reserved
// box's centre).
for (const anchor of ["right", "left", "bottom"] as const) {
    test.describe(`10.1.3 · 390 · ${anchor}-anchored collapse`, () => {
        test.use({ viewport: { width: 390, height: 844 } });
        test("D-2 · the collapse shrinks toward the anchored edge and settles without a snap", async ({
            page,
        }) => {
            await open(page, anchor);
            const { x, y } = mid(await rect(page, EDIT));
            await page.mouse.move(x, y);
            await page.waitForTimeout(1300);
            await expect(page.locator(".glass-dock")).toHaveClass(/expanded/);
            await expect(page.locator(".glass-dock")).not.toHaveAttribute("data-morphing");
            const expanded = await rect(page, ".glass-dock");
            await record(page, 1600);
            // The click-away: a press outside the dock collapses it at once.
            await page.mouse.move(4, 700);
            await page.mouse.down();
            await page.mouse.up();
            await page.waitForTimeout(1700);
            const all = await frames(page);
            const settled = await rect(page, ".glass-dock");
            const morph = all.filter((f) => f.morphing);
            expect(morph.length, "the click-away armed a morph").toBeGreaterThan(3);
            expect(all.at(-1)!.morphing, "the morph settled").toBe(false);
            const edge = anchoredEdge(anchor);
            expect(
                Math.max(...morph.map((f) => Math.abs(edge(f.dock) - edge(expanded)))),
                "the anchored edge holds through the collapse",
            ).toBeLessThan(0.5);
            expect(
                boxDistance(morph.at(-1)!.dock, settled),
                "the last morph frame is the settled box",
            ).toBeLessThan(1);
            const outside = morph.filter(
                (f) =>
                    f.edit.left < f.dock.left - 1 ||
                    f.edit.right > f.dock.right + 1 ||
                    f.edit.top < f.dock.top - 1 ||
                    f.edit.bottom > f.dock.bottom + 1,
            );
            expect(outside.length, "frames whose seat paints outside the plate").toBe(0);
        });
    });
}

// D-1 (critique-3): a collapse that reverses an expand mid-morph. The public `collapse()`
// lands 120 ms into a hover expand; the reversal starts scaled. From then on the entering
// summary glyph paints inside the plate on every frame and settles without a jump. RED on
// 10.1.2 and on the round-2 branch for the right- and bottom-anchored docks (the summary
// laid out at the reserved box's start, outside the plate, and jumped ~245 px at settle);
// the left-anchored dock held there already, since its reserved start is the rest.
for (const anchor of ["right", "left", "bottom"] as const) {
    test.describe(`10.1.3 · 390 · ${anchor}-anchored reversal`, () => {
        test.use({ viewport: { width: 390, height: 844 } });
        test("D-1 (critique-3) · a collapse() mid-expand keeps the summary glyph inside the plate", async ({
            page,
        }) => {
            await open(page, anchor);
            await page.evaluate(() => {
                const w = window as unknown as {
                    __dock: { collapse: () => void };
                    __collapsedAt?: number;
                };
                const dock = document.querySelector(".glass-dock")!;
                const seen = new MutationObserver(() => {
                    if (!dock.hasAttribute("data-morphing")) return;
                    seen.disconnect();
                    setTimeout(() => {
                        w.__collapsedAt = performance.now();
                        w.__dock.collapse();
                    }, 120);
                });
                seen.observe(dock, { attributes: true, attributeFilter: ["data-morphing"] });
            });
            await record(page, 2200);
            const { x, y } = mid(await rect(page, '[data-witness="summary"]'));
            await page.mouse.move(x, y);
            await page.waitForTimeout(400);
            // The pointer leaves, so nothing re-expands the dock once it has collapsed.
            await page.mouse.move(4, 700);
            await page.waitForTimeout(2000);
            await expect(page.locator(".glass-dock")).toHaveClass(/collapsed/);
            const all = await frames(page);
            const settled = await rect(page, '[data-witness="summary"]');
            const after = all.filter((f) => f.collapsed && f.morphing);
            expect(after.length, "the reversal morphed").toBeGreaterThan(3);
            expect(all.at(-1)!.morphing, "the morph settled").toBe(false);
            const outside = after.filter(
                (f) =>
                    f.summary.left < f.dock.left - 1 ||
                    f.summary.right > f.dock.right + 1 ||
                    f.summary.top < f.dock.top - 1 ||
                    f.summary.bottom > f.dock.bottom + 1,
            );
            expect(outside.length, "frames whose summary glyph paints outside the plate").toBe(0);
            expect(
                boxDistance(after.at(-1)!.summary, settled),
                "the summary glyph's last morph frame is its rest",
            ).toBeLessThan(1);
        });
    });
}

// D-3: under `prefers-reduced-motion: reduce` the morph jumps (useDockSpring): no frame
// paints a box between the two rests. `reducedMotion` is a context option, not a test
// option: `test.use({ reducedMotion })` is ignored without a word and the page reads
// no-preference, which is how critique-1 saw a 530 ms morph. Under a real reduce the
// morph jumps on 10.1.2 and on 10.1.3; the cell guards that.
test.describe("10.1.3 · 390 · reduced motion", () => {
    test.use({ viewport: { width: 390, height: 844 }, contextOptions: { reducedMotion: "reduce" } });
    test("D-3 · under reduced motion the expand jumps to its rest", async ({ page }) => {
        await open(page, "right");
        expect(
            await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
            "the page reads reduce",
        ).toBe(true);
        const rest = await rect(page, ".glass-dock");
        const { x, y } = mid(await rect(page, EDIT));
        await record(page, 900);
        await page.mouse.move(x, y);
        await page.waitForTimeout(1000);
        const all = await frames(page);
        const settled = await rect(page, ".glass-dock");
        expect(boxDistance(rest, settled), "the hover expanded the dock").toBeGreaterThan(10);
        const between = all.filter(
            (f) => boxDistance(f.dock, rest) > 0.5 && boxDistance(f.dock, settled) > 0.5,
        );
        expect(between.length, "frames that paint a box between the two rests").toBe(0);
    });
});

// ── critique-2 (round 2) ─────────────────────────────────────────────────────────────

// D-1: a touch gesture need not tap. A vertical swipe across the expanded run, whose
// `touch-action` is `pan-x`, dispatches `pointerdown` and `pointerup` and nothing else:
// no click, no cancel. Escape then collapses the dock without a click anywhere, and a
// keyboard focus or a mouse hover must still expand it. RED on the round-1 cure (the
// touch press held until some later click), GREEN on 10.1.2 and here. The swipe is a
// CDP touch sequence, so this cell is Chromium's; the next one witnesses WebKit.
for (const after of ["focus", "hover"] as const) {
    test.describe(`10.1.3 · 390 · touch · run swipe, Escape, then ${after}`, () => {
        test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });
        test(`D-1 (critique-2) · after a clickless, cancel-less touch press, a ${after} expands the collapsed dock`, async ({
            page,
            browserName,
        }) => {
            test.skip(browserName !== "chromium", "a CDP touch swipe");
            await open(page, "right");
            const dock = page.locator(".glass-dock");
            const { x, y } = mid(await rect(page, EDIT));
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(1300);
            await expect(dock).toHaveClass(/expanded/);
            await listen(page);
            const cdp = await page.context().newCDPSession(page);
            const q = mid(await rect(page, '[data-witness="Equation"]'));
            const at = (dy: number) => [{ x: q.x, y: q.y + dy, id: 1 }];
            await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: at(0) });
            for (let i = 1; i <= 8; i++) {
                await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: at(i * 8) });
                await page.waitForTimeout(16);
            }
            await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
            await page.waitForTimeout(400);
            expect(
                (await events(page)).map(([type]) => type),
                "the swipe dispatched a press with no click",
            ).toEqual(["pointerdown", "pointerup"]);
            await page.locator('[data-witness="Equation"]').focus();
            await page.keyboard.press("Escape");
            await page.waitForTimeout(1300);
            await expect(dock, "Escape collapsed the dock").toHaveClass(/collapsed/);
            if (after === "focus") {
                await page.locator(EDIT).focus();
            } else {
                await page.mouse.move(4, 700);
                const s = mid(await rect(page, '[data-witness="summary"]'));
                await page.mouse.move(s.x, s.y, { steps: 3 });
            }
            await page.waitForTimeout(1000);
            await expect(dock).toHaveClass(/expanded/);
        });
    });
}

// The same state in any engine: a touch `pointerdown` and `pointerup` on the collapsed
// seat with no click (dispatched by script), then a keyboard focus.
test.describe("10.1.3 · 390 · a touch press with no tap, then focus", () => {
    test.use({ viewport: { width: 390, height: 844 } });
    test("D-1 (critique-2) · a focus after a clickless touch press expands the collapsed dock", async ({
        page,
    }) => {
        await open(page, "right");
        await page.evaluate((sel) => {
            const seat = document.querySelector(sel)!;
            const init = { bubbles: true, composed: true, pointerType: "touch", pointerId: 7, isPrimary: true };
            seat.dispatchEvent(new PointerEvent("pointerdown", init));
            seat.dispatchEvent(new PointerEvent("pointerup", init));
        }, EDIT);
        await page.waitForTimeout(200);
        await page.locator(EDIT).focus();
        await page.waitForTimeout(1000);
        await expect(page.locator(".glass-dock")).toHaveClass(/expanded/);
    });
});
