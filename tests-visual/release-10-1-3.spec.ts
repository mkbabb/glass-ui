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
type Frame = { morphing: boolean; dock: Box; edit: Box; scrollWidth: number };

const EDIT = '[data-witness="Edit contour"]';

async function open(page: Page, anchor: "right" | "left"): Promise<void> {
    await page.goto(
        `/tests-visual/release-10-1-3/harness.html?scene=edge-anchor&anchor=${anchor}`,
    );
    await page.waitForFunction(() => (window as unknown as W).__ready);
    await page.locator(EDIT).waitFor();
    await page.evaluate(() => document.fonts.ready);
    // The pointer starts off the dock, which rests collapsed.
    await page.mouse.move(4, 600);
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
