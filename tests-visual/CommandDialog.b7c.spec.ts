// U/B7c C3-1 and C3-2 — the atlas homepage school finder, in a consumer layer order
// under a root with `overflow-x: clip` (atlas's base sheet).
//
// C3-1: opening the modal palette leaves `body` alone, holds the page through the root,
// keeps the sticky row and the scroll position, and lets go on close without a jump.
// Red on 79a9e3eea: reka's DialogOverlay wrote `overflow: hidden` onto `body`.
//
// C3-2: the short first group keeps its rows at the top of the list, and its heading
// does not sit under the next group's. Red on 79a9e3eea: the flex list shrank the
// "Dashboards" group to a sliver.
import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

async function open(page: Page): Promise<void> {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=palette&layered=1");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(100);
}

const row = (page: Page) =>
    page.locator('[data-witness="sticky-row"]').evaluate((el) => el.getBoundingClientRect().top);

const pageState = (page: Page) =>
    page.evaluate(() => ({
        bodyOverflow: getComputedStyle(document.body).overflowY,
        bodyInline: document.body.style.overflow,
        bodyPadding: document.body.style.paddingRight,
        rootInline: document.documentElement.style.overflow,
        scrollY: window.scrollY,
    }));

test("C3-1: the modal finder holds the page through the root and lets go without a jump", async ({ page }) => {
    await open(page);
    const before = await row(page);
    const rootBefore = (await pageState(page)).rootInline;

    await page.locator('[data-witness="finder"]').click();
    await expect(page.locator('[data-witness="palette-list"]')).toBeVisible();
    await page.waitForTimeout(400);
    const held = await pageState(page);
    expect(held.bodyInline).toBe("");
    expect(held.bodyPadding).toBe("");
    expect(held.bodyOverflow).toBe("visible");
    expect(held.rootInline).toBe("hidden");
    expect(held.scrollY).toBe(1500);
    expect(Math.abs((await row(page)) - before)).toBeLessThanOrEqual(0.5);

    // The page behind does not scroll under a wheel on the scrim.
    await page.mouse.move(20, 820);
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(200);
    expect((await pageState(page)).scrollY).toBe(1500);

    await page.keyboard.press("Escape");
    await expect(page.locator('[data-witness="palette-list"]')).toHaveCount(0);
    await page.waitForTimeout(600);
    const released = await pageState(page);
    expect(released.rootInline).toBe(rootBefore);
    expect(released.bodyInline).toBe("");
    expect(released.scrollY).toBe(1500);
    expect(Math.abs((await row(page)) - before)).toBeLessThanOrEqual(0.5);
});

test("C3-2: the short first group keeps its rows in view under its own heading", async ({ page }) => {
    await open(page);
    await page.locator('[data-witness="finder"]').click();
    const list = page.locator('[data-witness="palette-list"]');
    await expect(list).toBeVisible();
    await page.waitForTimeout(300);
    const m = await list.evaluate((el) => {
        const group = el.querySelector<HTMLElement>('[data-witness="group-dashboards"]')!;
        const units = el.querySelector<HTMLElement>('[data-witness="group-units"]')!;
        const heading = (g: HTMLElement) => g.querySelector<HTMLElement>(".command__group-label")!.getBoundingClientRect();
        const firstRow = group.querySelector<HTMLElement>('[role="option"]')!.getBoundingClientRect();
        const listRect = el.getBoundingClientRect();
        return {
            groupClient: group.clientHeight,
            groupScroll: group.scrollHeight,
            dashBottom: heading(group).bottom,
            unitsTop: heading(units).top,
            firstRowTop: firstRow.top,
            firstRowBottom: firstRow.bottom,
            listTop: listRect.top,
            listBottom: listRect.bottom,
            listScrollTop: el.scrollTop,
        };
    });
    // The group is as tall as its content: nothing is clipped inside it.
    expect(m.groupClient).toBeGreaterThanOrEqual(m.groupScroll - 1);
    // The two headings do not overlap.
    expect(m.unitsTop).toBeGreaterThanOrEqual(m.dashBottom - 0.5);
    // The first dashboard row is on screen inside the list when the palette opens.
    expect(m.listScrollTop).toBe(0);
    expect(m.firstRowTop).toBeGreaterThanOrEqual(m.listTop);
    expect(m.firstRowBottom).toBeLessThanOrEqual(m.listBottom);
});
