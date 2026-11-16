// O-360a: a viewport resize that crosses a dock's breakpoint while its morph runs raises
// no ResizeObserver loop, and no other window error or console error. The page is
// value.js's dock shape (`ro-loop/ro-harness.html?scene=consumer&responsive=1`). The
// dock sits in a host div sized by the dock. At 1024 and up it folds when idle and a
// seat shows its words; below that it is pinned open without them, so each crossing
// starts a morph to a different expanded box. Four sequences:
//   out-and-back  1440 -> 390x844, ~230 ms later -> 1440x900 (color's o21 trigger)
//   back-and-out  390 -> 1440x900, ~230 ms later -> 390x844
//   unfold        the same crossing pair while a hover unfold runs
//   fold          the same crossing pair while the idle fold runs
// Imports nothing from the tree under test, so the cell runs unchanged on v11.0.1.
import { expect, test, type Page } from "@playwright/test";

const WIDE = { width: 1440, height: 900 };
const NARROW = { width: 390, height: 844 };

function collect(page: Page): string[] {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
        if (m.type() === "error") errors.push(`console.error: ${m.text()}`);
    });
    return errors;
}

async function open(page: Page): Promise<void> {
    await page.addInitScript(() => {
        const w = window as unknown as { __errors: string[] };
        w.__errors = [];
        window.addEventListener("error", (e) => w.__errors.push(`window error: ${e.message}`), true);
    });
    await page.goto("/tests-visual/ro-loop/ro-harness.html?scene=consumer&responsive=1");
    await page.locator("body[data-ready='1'] .ro-dock").waitFor();
    await page.waitForTimeout(1200);
}

const morphing = (page: Page, on: boolean) =>
    page.waitForFunction(
        (on) => (document.querySelector(".glass-dock[data-morphing]") !== null) === on,
        on,
        { timeout: 15_000, polling: "raf" },
    );

async function cross(page: Page, first: typeof WIDE, second: typeof WIDE): Promise<void> {
    await page.setViewportSize(first);
    await page.waitForTimeout(230);
    await page.setViewportSize(second);
    await page.waitForTimeout(2500);
}

async function errorsOf(page: Page, errors: string[]): Promise<string[]> {
    const own = await page.evaluate(() => (window as unknown as { __errors: string[] }).__errors);
    return [...own, ...errors];
}

test.describe("ro-loop · a breakpoint resize mid-morph raises no ResizeObserver loop", () => {
    test.skip(({ browserName }) => browserName === "webkit" && !process.env.RO_LOOP_WEBKIT, "WebKit runs on build 2287 under --exclusive webkit");

    test("out-and-back: 1440 -> 390, ~230 ms -> 1440", async ({ page }) => {
        const errors = collect(page);
        await page.setViewportSize(WIDE);
        await open(page);
        await cross(page, NARROW, WIDE);
        expect(await errorsOf(page, errors)).toEqual([]);
    });

    test("back-and-out: 390 -> 1440, ~230 ms -> 390", async ({ page }) => {
        const errors = collect(page);
        await page.setViewportSize(NARROW);
        await open(page);
        await cross(page, WIDE, NARROW);
        expect(await errorsOf(page, errors)).toEqual([]);
    });

    test("unfold: the crossing pair while a hover unfold runs", async ({ page }) => {
        test.setTimeout(60_000);
        const errors = collect(page);
        await page.setViewportSize(WIDE);
        await open(page);
        // The dock mounts open and folds one idle window after mount.
        await morphing(page, true);
        await morphing(page, false);
        const box = (await page.locator(".ro-dock").boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
        await morphing(page, true);
        await page.waitForTimeout(60);
        await cross(page, NARROW, WIDE);
        expect(await errorsOf(page, errors)).toEqual([]);
    });

    test("fold: the crossing pair while the idle fold runs", async ({ page }) => {
        test.setTimeout(60_000);
        const errors = collect(page);
        await page.setViewportSize(WIDE);
        await open(page);
        await morphing(page, true);
        await page.waitForTimeout(60);
        await cross(page, NARROW, WIDE);
        expect(await errorsOf(page, errors)).toEqual([]);
    });
});
