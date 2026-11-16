// glass-ui 11.1.1 witnesses: small controls whose state change must not move or reshape
// a box. Same four projects as `release-11-1-1.spec.ts`.
//
//   lift    after a tap on touch, a `scale-on-hover` element returns to its rest scale
import { expect, test, type Page } from "@playwright/test";
import { isPhone, pressOn } from "./release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/controls-harness.html";

async function openHarness(page: Page): Promise<void> {
    await page.goto(HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
}

test("lift · a scale-on-hover element returns to rest after a tap", async ({ page }, info) => {
    test.skip(!isPhone(info.project.name), "a tap is a touch claim");
    await openHarness(page);
    await pressOn(page, info.project.name, '[data-testid="c-lift"]');
    await page.waitForTimeout(800);
    const scale = await page.locator('[data-testid="c-lift"]').evaluate((el) => getComputedStyle(el).scale);
    expect(scale === "none" || scale === "1", `scale after the tap: ${scale}`).toBe(true);
});
