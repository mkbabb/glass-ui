// U/B7 G1 (6a) — D-1: the side sheet stays fixed to the viewport inside a consumer layer.
//
// atlas wraps the whole compiled glass sheet in `@layer atlas.recipes { … }` and clips
// the root with `overflow-x: clip`. Before the 10.1.x cure the sheet's `position: fixed`
// lived in `@layer components`, lost to a static rung rule, and the sheet rendered in
// flow below the fold (atlas G-1). The cure states `fixed` as a utility; inside the
// consumer wrap the nested utilities layer still follows components, so the utility wins.
// This spec proves it under the wrap: a sheet opened 1500px down a long page is fixed and
// on screen. The cure shipped in 10.1.1, so this witness passes on the tag; it is the
// proof D-1 asks for, and it fails on v10.1.0.
import { expect, test } from "@playwright/test";

for (const layered of [true, false]) {
    test(`sheet opened deep in the page is fixed and on screen (${layered ? "consumer layer" : "unlayered"})`, async ({ page }) => {
        await page.goto(`/tests-visual/b7-shape/harness.html?scene=sheet${layered ? "&layered=1" : ""}`);
        await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
        await page.evaluate(() => window.scrollTo(0, 1500));
        await page.evaluate(() => (window as unknown as { __open: () => void }).__open());
        const sheet = page.locator('[data-witness="sheet"]');
        await expect(sheet).toBeVisible();
        await page.waitForTimeout(700);
        const got = await sheet.evaluate((el) => ({
            position: getComputedStyle(el).position,
            rect: el.getBoundingClientRect().toJSON(),
            vw: document.documentElement.clientWidth,
            vh: window.innerHeight,
        }));
        expect(got.position).toBe("fixed");
        expect(got.rect.top).toBeGreaterThanOrEqual(-1);
        expect(got.rect.bottom).toBeLessThanOrEqual(got.vh + 1);
        expect(got.rect.right).toBeLessThanOrEqual(got.vw + 1);
        expect(got.rect.left).toBeGreaterThanOrEqual(0);
        expect(got.rect.height).toBeGreaterThan(got.vh * 0.5);
    });
}
