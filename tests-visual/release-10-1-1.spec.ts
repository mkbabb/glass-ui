// glass-ui 10.1.1 — the engine witnesses, one per cure. Each drives
// `release-10-1-1/harness.html?scene=<name>` (the real components from `src/` under
// the demo's own cascade) and reads layout, hit-testing and focus, never pixels.
// Every witness here is RED on a 10.1.0 tree carrying this spec and harness, and GREEN on
// 10.1.1, except the O-102 (6) block, which is a GUARD and says so: it is green on both.
// Engines: the `chromium-headless-new` and `coarse-touch` projects, and the `webkit`
// project (Playwright WebKit 2287, `webkit-2287.config.ts`, under
// `guarded --exclusive webkit`).
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, scene: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-1/harness.html?scene=${scene}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
}

/** Five points inside `sel`'s box (centre + four inset corners) and whether each
 *  hit-tests to the element or a descendant of it (or of `also`, a surface allowed
 *  to overlap it, as a submenu overlaps its parent's edge). */
async function hits(page: Page, sel: string, also?: string): Promise<boolean[]> {
    return page.evaluate(([s, a]) => {
        const el = document.querySelector<HTMLElement>(s!);
        const other = a ? document.querySelector<HTMLElement>(a) : null;
        if (!el) return [false];
        const r = el.getBoundingClientRect();
        const pts = [
            [r.left + r.width / 2, r.top + r.height / 2],
            [r.left + 6, r.top + 6],
            [r.right - 6, r.top + 6],
            [r.left + 6, r.bottom - 6],
            [r.right - 6, r.bottom - 6],
        ];
        return pts.map(([x, y]) => {
            const at = document.elementFromPoint(x!, y!);
            return !!at && (el.contains(at) || !!other?.contains(at));
        });
    }, [sel, also] as const);
}

const DESK = { width: 1440, height: 900 };
const PHONE = { width: 390, height: 844 };

test.describe("10.1.1", () => {
    // ── (1) atlas G-1 ────────────────────────────────────────────────────────
    test("G-1 · an open sheet is fixed and inside the viewport", async ({ page }) => {
        await open(page, "sheet");
        const sheet = page.locator('[data-witness="sheet"]');
        await expect(sheet).toBeVisible();
        await page.waitForTimeout(600); // the entry spring settles
        const m = await sheet.evaluate((el) => {
            const r = el.getBoundingClientRect();
            return {
                position: getComputedStyle(el).position,
                top: r.top,
                bottom: r.bottom,
                right: r.right,
                vh: innerHeight,
                vw: innerWidth,
            };
        });
        expect(m.position).toBe("fixed");
        expect(m.top).toBeGreaterThanOrEqual(0);
        expect(m.bottom).toBeLessThanOrEqual(m.vh + 1);
        expect(Math.round(m.right)).toBe(m.vw);
    });

    // ── (2) atlas G-2 ────────────────────────────────────────────────────────
    test("G-2 · a menu and its submenu paint above the dock's rung", async ({ page }) => {
        await open(page, "menu");
        await expect(page.locator('[data-witness="menu"]')).toBeVisible();
        await expect(page.locator('[data-witness="submenu"]')).toBeVisible();
        await page.waitForTimeout(400);
        expect(await hits(page, '[data-witness="menu"]', '[data-witness="submenu"]')).toEqual([true, true, true, true, true]);
        expect(await hits(page, '[data-witness="submenu"]')).toEqual([true, true, true, true, true]);
    });

    // ── (3) atlas G-3 ────────────────────────────────────────────────────────
    test("G-3 · a composite in a container seat keeps its tab stop and its arrows", async ({
        page,
    }) => {
        await open(page, "seat");
        const first = page.locator('[data-witness="seat-0"]');
        await expect(first).toBeVisible();
        // One tab stop inside the group, on the selected item.
        await expect
            .poll(() =>
                page.evaluate(() =>
                    [...document.querySelectorAll<HTMLElement>("[data-item]")]
                        .filter((i) => i.tabIndex === 0)
                        .map((i) => i.dataset.item),
                ),
            )
            .toEqual(["x"]);
        // Tab from the run's stop reaches the group.
        await first.focus();
        await page.keyboard.press("Tab");
        expect(await page.evaluate(() => document.activeElement?.getAttribute("data-item"))).toBe(
            "x",
        );
        // An arrow inside the group is the group's: it moves to the next item.
        await page.keyboard.press("ArrowRight");
        expect(await page.evaluate(() => document.activeElement?.getAttribute("data-item"))).toBe(
            "y",
        );
    });

    test("G-3 · a composite seated directly in the run keeps its arrows", async ({ page }) => {
        await open(page, "seat-direct");
        const radio = page.locator('[data-item="x"]');
        await expect(radio).toBeVisible();
        await radio.focus();
        await page.keyboard.press("ArrowRight");
        // The group's own roving takes the arrow; the run never moves to the next seat.
        expect(await page.evaluate(() => document.activeElement?.getAttribute("data-item"))).toBe(
            "y",
        );
        // And the run's arrows, from a seat that is its own control, skip the group.
        await page.locator('[data-witness="seat-0"]').focus();
        await page.keyboard.press("ArrowRight");
        expect(
            await page.evaluate(() => document.activeElement?.getAttribute("data-witness")),
        ).toBe("seat-2");
    });

    // ── (4) O-102 (3) ────────────────────────────────────────────────────────
    for (const [label, trigger, slot] of [
        ["dropdown", "menu-trigger", "menu-content"],
        ["popover", "pop-trigger", "popover-content"],
        ["select", "select-trigger", "select-content"],
    ] as const) {
        test(`O-102(3) · a ${label} opened from a seat closes when the dock collapses`, async ({
            page,
        }) => {
            await open(page, "collapse");
            const t = page.locator(`[data-witness="${trigger}"]`);
            await expect(t).toBeVisible();
            await t.click();
            const content = page.locator(`[data-slot="${slot}"]`);
            await expect(content).toBeVisible();
            await page.evaluate(() =>
                (window as unknown as { __dock: () => { collapse(): void } }).__dock().collapse(),
            );
            await expect(content).toHaveCount(0, { timeout: 3000 });
        });
    }

    // A keyboard-opened menu closed by the collapse hands focus to the dock's summary.
    // On 10.1.0 the menu stayed open; before the hand-off, the close dropped focus to
    // <body> (the menu's own return aims at its trigger, inert in the collapsed face).
    test("O-102(3) · a collapse-closed menu hands focus to the summary, not <body>", async ({
        page,
    }) => {
        await open(page, "collapse");
        const t = page.locator('[data-witness="menu-trigger"]');
        await expect(t).toBeVisible();
        await t.focus();
        await page.keyboard.press("Enter");
        await expect(page.locator('[data-slot="menu-content"]')).toBeVisible();
        await expect
            .poll(() => page.evaluate(() => document.activeElement?.getAttribute("role")))
            .toBe("menuitem");
        await page.evaluate(() =>
            (window as unknown as { __dock: () => { collapse(): void } }).__dock().collapse(),
        );
        await expect(page.locator('[data-slot="menu-content"]')).toHaveCount(0, { timeout: 3000 });
        await page.waitForTimeout(300); // past the menu's own (inert-refused) focus return
        expect(
            await page.evaluate(() =>
                document.activeElement?.classList.contains("dock-layer--summary"),
            ),
        ).toBe(true);
    });

    // ── (5) O-102 (6) — a GUARD, not a red/green witness ─────────────────────
    // Green on 10.1.0 and 10.1.1 alike: a glass Popover from a seat is unclipped at both
    // widths, portalled or not (reka's wrapper is `position: fixed`, and the dock's
    // `contain: layout` makes the dock, not the clipping run, its containing block).
    // The row itself is NOT cured in 10.1.1 and is returned to the owner (CHANGELOG):
    // the plate in frame 12.51.30 is an absolute float inside the run, and the run, a
    // scroll port, clips every seat's cross-axis overhang (`dock/styles/run.css`). This
    // guard holds only the overlay half, which the consumer's own cure now rides.
    for (const [label, viewport] of [
        ["desktop", DESK],
        ["phone", PHONE],
    ] as const) {
        for (const portal of ["1", "0"]) {
            test(`O-102(6) · a popover opened from a seat is not clipped (${label}, portal=${portal})`, async ({
                page,
            }) => {
                await page.setViewportSize(viewport);
                await page.goto(`/tests-visual/release-10-1-1/harness.html?scene=clip&portal=${portal}`);
                await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
                const t = page.locator('[data-witness="pop-trigger"]');
                await expect(t).toBeVisible();
                await t.click();
                const pop = page.locator('[data-witness="pop"]');
                await expect(pop).toBeVisible();
                await page.waitForTimeout(400);
                expect(await hits(page, '[data-witness="pop"]')).toEqual([true, true, true, true, true]);
            });
        }
    }

    // ── (6) Skeleton shimmer (O-102b (3)) ────────────────────────────────────
    test("Skeleton · shimmer travels, the plain tile breathes, an off-screen one is paused", async ({
        page,
    }) => {
        await open(page, "skeleton");
        const read = (w: string) =>
            page.evaluate((sel) => {
                const el = document.querySelector(`[data-witness="${sel}"]`)!;
                const after = getComputedStyle(el, "::after");
                return {
                    content: after.content,
                    name: after.animationName,
                    state: after.animationPlayState,
                    host: getComputedStyle(el).animationName,
                };
            }, w);
        const on = await read("shimmer");
        expect(on.content).not.toBe("none");
        expect(on.name).toMatch(/^skeleton-shimmer\b/); // the SFC scopes the keyframe name
        expect(on.host).toBe("none"); // one rest carrier per tile
        const plain = await read("plain");
        expect(plain.content).toBe("none");
        expect(plain.host).toMatch(/^skeleton-breathe\b/);
        await expect.poll(async () => (await read("far")).state).toBe("paused");
        await page.locator('[data-witness="far"]').scrollIntoViewIfNeeded();
        await expect.poll(async () => (await read("far")).state).toBe("running");
    });

    test("Skeleton · shimmer holds still under reduced motion", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await open(page, "skeleton");
        const m = await page.evaluate(() => {
            const el = document.querySelector('[data-witness="shimmer"]')!;
            const after = getComputedStyle(el, "::after");
            return { content: after.content, name: after.animationName };
        });
        expect(m.content).not.toBe("none"); // a static sheen, not an absent one
        expect(m.name).toBe("none");
    });
});
