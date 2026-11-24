// Fix seat 14, readings only: what the hover media features read in the project's own page and
// in a fresh mouse context at 1440 opened from the same browser, and what a mouse hover does to
// the controls harness's scale-on-hover tile there (`:hover` matched, computed scale).
import { test, type Page } from "@playwright/test";
import { gotoReady } from "../release-11-1-1/film";

const HARNESS = "/tests-visual/release-11-1-1/controls-harness.html";

async function read(page: Page) {
    await gotoReady(page, HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(400);
    const media = await page.evaluate(() =>
        Object.fromEntries(
            ["(hover: hover)", "(any-hover: hover)", "(pointer: fine)", "(pointer: coarse)", "(any-pointer: fine)"].map((q) => [q, matchMedia(q).matches]),
        ),
    );
    const tile = page.locator('[data-testid="c-lift"]');
    const rest = await tile.evaluate((el) => getComputedStyle(el).scale);
    await tile.hover();
    await page.waitForTimeout(800);
    const hovered = await tile.evaluate((el) => ({ matches: el.matches(":hover"), scale: getComputedStyle(el).scale }));
    return { ua: await page.evaluate(() => navigator.userAgent), media, rest, hovered };
}

test("hover media · the project's page and a fresh 1440 mouse context", async ({ page, browser }, info) => {
    const own = await read(page);
    const desk = await browser.newContext({
        baseURL: info.project.use.baseURL,
        viewport: { width: 1440, height: 900 },
        colorScheme: "light",
        reducedMotion: "no-preference",
    });
    let fresh;
    try {
        fresh = await read(await desk.newPage());
    } finally {
        await desk.close();
    }
    const reading = { project: info.project.name, baseURL: info.project.use.baseURL, own, fresh };
    console.log("READING", JSON.stringify(reading));
});
