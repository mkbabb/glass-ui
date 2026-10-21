// U/B7 G1 (6b) — D-2: opening a menu or a listbox leaves the page's scroll alone.
//
// reka's scroll lock writes `overflow: hidden` onto `body`. Under atlas's root
// `overflow-x: clip` that makes `body` a scroll container, so every sticky ancestor
// drops to its in-flow position and the menu follows its trigger off screen. On the
// 10.1.1 tag DropdownMenu is modal by default and Select always locks, and both cases
// below fail. Here the menu is non-modal by default, the Select takes no lock, the plate
// contains its own overscroll, and the root keeps a stable gutter.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page): Promise<void> {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=sticky&layered=1");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(100);
}

const row = (page: Page) =>
    page.locator('[data-witness="sticky-row"]').evaluate((el) => el.getBoundingClientRect().top);

for (const [label, trigger, content] of [
    ["DropdownMenu", "menu-trigger", "menu"],
    ["Select", "select-trigger", "select"],
] as const) {
    test(`${label}: opening it keeps body scroll and the sticky row in place`, async ({ page }) => {
        await open(page);
        const before = await row(page);
        expect(before).toBeLessThanOrEqual(1);
        await page.locator(`[data-witness="${trigger}"]`).click();
        const plate = page.locator(`[data-witness="${content}"]`);
        await expect(plate).toBeVisible();
        await page.waitForTimeout(300);
        const state = await page.evaluate(() => ({
            bodyOverflow: getComputedStyle(document.body).overflowY,
            bodyInline: document.body.style.overflow,
            pointer: getComputedStyle(document.body).pointerEvents,
            scrollY: window.scrollY,
            gutter: getComputedStyle(document.documentElement).scrollbarGutter,
        }));
        expect(state.bodyInline).toBe("");
        expect(state.bodyOverflow).toBe("visible");
        // The menu is non-modal: the page behind stays interactive. (A listbox keeps
        // reka's outside-pointer guard while open; that guard does not touch scroll.)
        if (label === "DropdownMenu") expect(state.pointer).not.toBe("none");
        expect(state.scrollY).toBe(1500);
        expect(state.gutter).toBe("stable");
        expect(Math.abs((await row(page)) - before)).toBeLessThanOrEqual(0.5);
        // The plate opens against its trigger, on screen.
        const [t, p] = await Promise.all([
            page.locator(`[data-witness="${trigger}"]`).evaluate((el) => el.getBoundingClientRect().toJSON()),
            plate.evaluate((el) => el.getBoundingClientRect().toJSON()),
        ]);
        expect(p.top).toBeGreaterThanOrEqual(t.bottom - 1);
        expect(p.top - t.bottom).toBeLessThanOrEqual(12);
        // The plate's own scroll contains overscroll.
        const contain = await plate.evaluate((el) => {
            const port = el.querySelector<HTMLElement>('[data-slot="select-viewport"]') ?? el;
            return getComputedStyle(port).overscrollBehaviorY;
        });
        expect(contain).toBe("contain");
    });
}
