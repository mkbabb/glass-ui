// U/B7 G1 (6d) — the one sizing law for DropdownMenu, Select and Popover: collision
// avoidance on both axes with 16px padding, at most min(22rem, 100vw - 2rem) wide, as
// tall as the room it opened into with internal scroll, on the card radius.
//
// On the 10.1.1 tag the plates pass no collision padding, so a menu opened from a trigger
// at the right edge meets the viewport edge, and the menu's measure has no ceiling.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, trigger: string, content: string) {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=sizing&layered=1");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.locator(`[data-witness="${trigger}"]`).click();
    const plate = page.locator(`[data-witness="${content}"]`);
    await expect(plate).toBeVisible();
    await page.waitForTimeout(350);
    return plate.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const card = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--radius-card"),
        ) * parseFloat(getComputedStyle(document.documentElement).fontSize);
        return {
            left: r.left,
            right: r.right,
            top: r.top,
            bottom: r.bottom,
            width: r.width,
            vw: document.documentElement.clientWidth,
            vh: window.innerHeight,
            radius: parseFloat(cs.borderTopLeftRadius),
            card,
            scrollHeight: el.scrollHeight,
            clientHeight: el.clientHeight,
            overflowY: cs.overflowY,
            overscroll: cs.overscrollBehaviorY,
        };
    });
}

for (const [label, trigger, content] of [
    ["DropdownMenu", "long-trigger", "long-menu"],
    ["Popover", "pop-trigger", "pop"],
] as const) {
    test(`${label} at the right edge: 16px from the edge, at most 22rem wide, card radius`, async ({ page }) => {
        const got = await open(page, trigger, content);
        expect(got.width).toBeLessThanOrEqual(352.5);
        expect(got.vw - got.right, `right gap ${got.vw - got.right}`).toBeGreaterThanOrEqual(15.5);
        expect(got.left).toBeGreaterThanOrEqual(15.5);
        expect(got.radius).toBeCloseTo(16, 0);
    });
}

test("a forty-row menu opened low fits the room and scrolls inside", async ({ page }) => {
    const got = await open(page, "tall-trigger", "tall-menu");
    expect(got.top).toBeGreaterThanOrEqual(15.5);
    expect(got.vh - got.bottom).toBeGreaterThanOrEqual(15.5);
    expect(got.scrollHeight).toBeGreaterThan(got.clientHeight);
    expect(got.overflowY).toBe("auto");
    expect(got.overscroll).toBe("contain");
});

test("the phone viewport: a long menu is the viewport less 1rem a side at most", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const got = await open(page, "long-trigger", "long-menu");
    expect(got.width).toBeLessThanOrEqual(320 - 32 + 0.5);
    expect(got.left).toBeGreaterThanOrEqual(15.5);
    expect(got.vw - got.right).toBeGreaterThanOrEqual(15.5);
});
