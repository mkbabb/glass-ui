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
import { PNG } from "pngjs";

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

type Anchor = "right" | "left" | "bottom" | "top";

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
    anchor === "right" ? b.right : anchor === "left" ? b.left : anchor === "top" ? b.top : b.bottom;
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
// box's centre). The settle is read on every frame after the morph (critique-4 D-2):
// a vertical dock (bottom, top) re-eased its `scale` from a third of its height when
// `[data-morphing]` cleared, on 10.1.2 and on every 10.1.3 round before round 4.
for (const anchor of ["right", "left", "bottom", "top"] as const) {
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
            let last = all.length - 1;
            while (last >= 0 && !all[last].morphing) last -= 1;
            const settling = all.slice(last + 1);
            expect(settling.length, "frames read after the morph settled").toBeGreaterThan(10);
            expect(
                Math.max(...settling.map((f) => boxDistance(f.dock, settled))),
                "every frame after the morph paints the settled box (no snap)",
            ).toBeLessThan(1);
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

// ── critique-4 (round 4) ─────────────────────────────────────────────────────────────

// D-1: nothing the dock paints shows outside its plate during a morph. The layers lay
// out where they rest and the plate grows over them from the anchored edge, so on an
// edge-anchored dock the full pane's open-side controls painted on the bare stage:
// ahead of the plate on an expand, behind it on a collapse, and on both legs of a
// reversal. fourier's L2-15 predicate (every visible control inside the dock) applied
// to every frame. Per frame and per witnessed element: its painted opacity (the
// product up to the dock), and its box cut by every ancestor that clips it (computed
// `overflow`), against the plate's box. RED on the round-3 branch (right and bottom:
// "Publish" and "View layers" fully outside at full opacity) and on 10.1.2 (the
// symmetric overhang); GREEN once the box clips to the plate while it morphs. The
// frozen-frame cell below shows the same in paint.
type Spill = { label: string; by: number; opacity: number };

async function recordSpill(page: Page, ms: number): Promise<void> {
    await page.evaluate((ms) => {
        const w = window as unknown as { __spill: { morphing: boolean; spill: Spill[] }[] };
        w.__spill = [];
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const seen = [...dock.querySelectorAll<HTMLElement>("[data-witness]")];
        const visible = (el: HTMLElement) => {
            const r = el.getBoundingClientRect();
            let [l, t, rr, b] = [r.left, r.top, r.right, r.bottom];
            for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
                const cs = getComputedStyle(a);
                const box = a.getBoundingClientRect();
                if (cs.overflowX !== "visible") [l, rr] = [Math.max(l, box.left), Math.min(rr, box.right)];
                if (cs.overflowY !== "visible") [t, b] = [Math.max(t, box.top), Math.min(b, box.bottom)];
            }
            return { l, t, r: rr, b };
        };
        const opacity = (el: HTMLElement) => {
            let o = 1;
            for (let q: HTMLElement | null = el; q && q !== dock.parentElement; q = q.parentElement) {
                const cs = getComputedStyle(q);
                if (cs.visibility === "hidden") return 0;
                o *= Number(cs.opacity);
            }
            return o;
        };
        const t0 = performance.now();
        const tick = () => {
            const p = plate.getBoundingClientRect();
            const spill: Spill[] = [];
            for (const el of seen) {
                const o = opacity(el);
                if (o <= 0.1) continue;
                const v = visible(el);
                if (v.r - v.l <= 0 || v.b - v.t <= 0) continue;
                const by = Math.max(p.left - v.l, v.r - p.right, p.top - v.t, v.b - p.bottom);
                if (by > 1) spill.push({ label: el.dataset.witness!, by: Math.round(by), opacity: Math.round(o * 100) / 100 });
            }
            w.__spill.push({ morphing: dock.hasAttribute("data-morphing"), spill });
            if (performance.now() - t0 < ms) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, ms);
}

const spillFrames = (page: Page) =>
    page.evaluate(
        () => (window as unknown as { __spill: { morphing: boolean; spill: Spill[] }[] }).__spill,
    );

for (const [anchor, width] of [
    ["right", 390],
    ["right", 1440],
    ["left", 390],
    ["bottom", 390],
] as const) {
    test.describe(`10.1.3 · ${width} · ${anchor}-anchored, the plate holds what it paints`, () => {
        test.use({ viewport: { width, height: width > 1000 ? 900 : 844 } });
        test("D-1 (critique-4) · no control paints outside the plate on the expand or the collapse", async ({
            page,
        }) => {
            await open(page, anchor);
            const { x, y } = mid(await rect(page, EDIT));
            await recordSpill(page, 1300);
            await page.mouse.move(x, y);
            await page.waitForTimeout(1400);
            await expect(page.locator(".glass-dock")).toHaveClass(/expanded/);
            const expand = (await spillFrames(page)).filter((f) => f.morphing);
            await recordSpill(page, 1300);
            await page.mouse.move(4, 700);
            await page.mouse.down();
            await page.mouse.up();
            await page.waitForTimeout(1400);
            await expect(page.locator(".glass-dock")).toHaveClass(/collapsed/);
            const collapse = (await spillFrames(page)).filter((f) => f.morphing);
            expect(expand.length, "the hover morphed").toBeGreaterThan(3);
            expect(collapse.length, "the click-away morphed").toBeGreaterThan(3);
            expect(
                expand.filter((f) => f.spill.length).map((f) => f.spill),
                "expand frames that paint a control outside the plate",
            ).toEqual([]);
            expect(
                collapse.filter((f) => f.spill.length).map((f) => f.spill),
                "collapse frames that paint a control outside the plate",
            ).toEqual([]);
        });
    });
}

// The double reversal (critique-4 R): a hover expand, `collapse()` 120 ms in, then the
// pointer re-hovers 120 ms into that collapse. Three legs, every frame inside the plate.
for (const anchor of ["right", "bottom"] as const) {
    test.describe(`10.1.3 · 390 · ${anchor}-anchored double reversal, the plate holds what it paints`, () => {
        test.use({ viewport: { width: 390, height: 844 } });
        test("D-1 (critique-4) · no control paints outside the plate through a double reversal", async ({
            page,
        }) => {
            await open(page, anchor);
            await page.evaluate(() => {
                const w = window as unknown as { __dock: { collapse: () => void } };
                const dock = document.querySelector(".glass-dock")!;
                const seen = new MutationObserver(() => {
                    if (!dock.hasAttribute("data-morphing")) return;
                    seen.disconnect();
                    setTimeout(() => w.__dock.collapse(), 120);
                });
                seen.observe(dock, { attributes: true, attributeFilter: ["data-morphing"] });
            });
            const s = mid(await rect(page, '[data-witness="summary"]'));
            await recordSpill(page, 2000);
            await page.mouse.move(s.x, s.y);
            await page.waitForTimeout(240);
            // Off the dock and back: the re-hover lands mid-collapse.
            await page.mouse.move(4, 700);
            await page.mouse.move(s.x, s.y);
            await page.waitForTimeout(1900);
            const morph = (await spillFrames(page)).filter((f) => f.morphing);
            expect(morph.length, "the legs morphed").toBeGreaterThan(10);
            expect(
                morph.filter((f) => f.spill.length).map((f) => f.spill),
                "frames that paint a control outside the plate",
            ).toEqual([]);
        });
    });
}

// The same in paint: the page's rAF is frozen mid-morph (the spring stops on that
// frame) and the stage beside the plate's open side is compared with the same stage at
// rest. Any control there paints ink; a box shadow does not reach the threshold. The
// freeze is set by the plate's travel, not a frame count, so both engines stop on the
// same geometry (WebKit's frames advance further apart): the expand at 40 % of its
// travel, the collapse at 30 %. RED on the round-3 branch ("View layers" and "Publish"
// opaque on the stage on the expand, their ghosts on the collapse), GREEN with the
// plate clip.
async function freezeAt(page: Page, leg: "expand" | "collapse", travel: number): Promise<void> {
    await page.evaluate(
        ({ leg, travel }) => {
            const w = window as unknown as { __frozen?: boolean };
            const dock = document.querySelector<HTMLElement>(".glass-dock")!;
            const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
            const raf = window.requestAnimationFrame.bind(window);
            const from = plate.getBoundingClientRect().width;
            const seen = new MutationObserver(() => {
                if (!dock.hasAttribute("data-morphing")) return;
                seen.disconnect();
                // The plate's other end: the reserved box on an expand (its layout width,
                // which the morph's scale leaves alone), the collapsed plate on a collapse.
                const to = leg === "expand" ? dock.offsetWidth : Number(dock.dataset.restWidth);
                const tick = () => {
                    const at = plate.getBoundingClientRect().width;
                    if ((at - from) / (to - from) >= travel) {
                        window.requestAnimationFrame = (() => 0) as typeof window.requestAnimationFrame;
                        w.__frozen = true;
                        return;
                    }
                    raf(tick);
                };
                raf(tick);
            });
            seen.observe(dock, { attributes: true, attributeFilter: ["data-morphing"] });
        },
        { leg, travel },
    );
}

/** Pixels whose colour differs between the two images by more than 48 in a channel. */
function inkDelta(pa: PNG, pb: PNG): number {
    let n = 0;
    for (let i = 0; i < pa.data.length; i += 4) {
        const d = Math.max(
            Math.abs(pa.data[i] - pb.data[i]),
            Math.abs(pa.data[i + 1] - pb.data[i + 1]),
            Math.abs(pa.data[i + 2] - pb.data[i + 2]),
        );
        if (d > 48) n += 1;
    }
    return n;
}

for (const [leg, travel] of [
    ["expand", 0.4],
    ["collapse", 0.3],
] as const) {
    test.describe(`10.1.3 · 390 · right-anchored ${leg}, frozen at ${travel * 100} % of its travel`, () => {
        test.use({ viewport: { width: 390, height: 844 } });
        test(`D-1 (critique-4) · the stage beside the plate paints no control mid-${leg}`, async ({
            page,
        }) => {
            await open(page, "right");
            const { x, y } = mid(await rect(page, EDIT));
            const stage = await rect(page, '[data-witness="stage"]');
            const rest = await rect(page, ".dock-plate");
            // The stage left of the collapsed plate, over the dock's row, read at rest.
            const strip = {
                x: Math.ceil(stage.left + 2),
                y: Math.floor(rest.top),
                width: Math.floor(rest.left - 4 - (stage.left + 2)),
                height: Math.ceil(rest.bottom - rest.top),
            };
            const base = PNG.sync.read(await page.screenshot({ clip: strip }));
            if (leg === "collapse") {
                await page.mouse.move(x, y);
                await page.waitForTimeout(1400);
                await expect(page.locator(".glass-dock")).toHaveClass(/expanded/);
                await expect(page.locator(".glass-dock")).not.toHaveAttribute("data-morphing");
                await page.evaluate(
                    (w) => (document.querySelector<HTMLElement>(".glass-dock")!.dataset.restWidth = `${w}`),
                    rest.right - rest.left,
                );
            }
            await freezeAt(page, leg, travel);
            if (leg === "expand") {
                await page.mouse.move(x, y);
            } else {
                await page.mouse.move(4, 700);
                await page.evaluate(() =>
                    (window as unknown as { __dock: { collapse: () => void } }).__dock.collapse(),
                );
            }
            await page.waitForFunction(() => (window as unknown as { __frozen?: boolean }).__frozen);
            await page.waitForTimeout(150);
            expect(
                await page.evaluate(() =>
                    document.querySelector(".glass-dock")!.hasAttribute("data-morphing"),
                ),
                "frozen mid-morph",
            ).toBe(true);
            const plate = await rect(page, ".dock-plate");
            // Only the stage the frozen plate does not cover, less a margin for its rim.
            const width = Math.min(strip.width, Math.floor(plate.left - 6 - strip.x));
            expect(width, "the frozen plate leaves stage to read").toBeGreaterThan(30);
            const shot = PNG.sync.read(await page.screenshot({ clip: { ...strip, width } }));
            // The rest strip cut to the same width, in device pixels.
            const ref = new PNG({ width: shot.width, height: shot.height });
            PNG.bitblt(base, ref, 0, 0, shot.width, shot.height, 0, 0);
            expect(inkDelta(shot, ref), "control ink on the stage beside the plate").toBe(0);
        });
    });
}
