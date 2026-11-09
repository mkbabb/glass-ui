// U/B7 G1 (6c, 6e) — D-3: the Select listbox takes the room it has, and below 30rem it
// opens as a bottom sheet.
//
// On the 10.1.1 tag the listbox is clamped to min(24rem, 60dvh) whatever the room, so a
// twelve-row list scrolls inside an 800px viewport with most of the page empty below it,
// and on a phone it opens as a narrow anchored list. Both cases fail there.
import { expect, test, type Page } from "@playwright/test";

async function openSelect(page: Page): Promise<void> {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=select&layered=1");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.locator('[data-witness="select-trigger"]').click();
    await expect(page.locator('[data-witness="select"]')).toBeVisible();
    await page.waitForTimeout(350);
}

test("a twelve-row list that fits the room shows whole", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openSelect(page);
    const got = await page.locator('[data-witness="select"]').evaluate((el) => {
        const port = el.querySelector<HTMLElement>('[data-slot="select-viewport"]')!;
        return {
            clientHeight: port.clientHeight,
            scrollHeight: port.scrollHeight,
            rows: el.querySelectorAll('[role="option"]').length,
            bottom: el.getBoundingClientRect().bottom,
            vh: window.innerHeight,
        };
    });
    expect(got.rows).toBe(12);
    expect(got.clientHeight, `${got.clientHeight} < ${got.scrollHeight}`).toBeGreaterThanOrEqual(got.scrollHeight);
    expect(got.vh - got.bottom).toBeGreaterThanOrEqual(15.5);
});

test("a short viewport bounds the list 16px from the edge and it scrolls inside", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 360 });
    await openSelect(page);
    const got = await page.locator('[data-witness="select"]').evaluate((el) => {
        const port = el.querySelector<HTMLElement>('[data-slot="select-viewport"]')!;
        return {
            clientHeight: port.clientHeight,
            scrollHeight: port.scrollHeight,
            bottom: el.getBoundingClientRect().bottom,
            top: el.getBoundingClientRect().top,
            vh: window.innerHeight,
        };
    });
    expect(got.scrollHeight).toBeGreaterThan(got.clientHeight);
    expect(got.top).toBeGreaterThanOrEqual(15.5);
    expect(got.vh - got.bottom).toBeGreaterThanOrEqual(15.5);
});

test("below 30rem the listbox is a bottom sheet at full width", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await openSelect(page);
    const got = await page.locator('[data-witness="select"]').evaluate((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
            form: el.getAttribute("data-form"),
            left: r.left,
            width: r.width,
            bottom: r.bottom,
            vw: document.documentElement.clientWidth,
            vh: window.innerHeight,
            topLeft: parseFloat(cs.borderTopLeftRadius),
            bottomLeft: parseFloat(cs.borderBottomLeftRadius),
        };
    });
    expect(got.form).toBe("sheet");
    expect(Math.abs(got.left)).toBeLessThanOrEqual(1);
    expect(Math.abs(got.width - got.vw)).toBeLessThanOrEqual(1);
    expect(Math.abs(got.vh - got.bottom)).toBeLessThanOrEqual(1);
    expect(got.topLeft).toBeGreaterThan(8);
    expect(got.bottomLeft).toBe(0);
});
