// glass-ui 10.1.2 — the engine witnesses for the declared seat marker (atlas G-4, arm
// b-ii; INBOUND O-102d). Each drives `release-10-1-2/harness.html?scene=<name>` (the real
// components from `src/` under the demo's own cascade) and reads focus and attributes,
// never pixels, at 1440 and 390. Engines: the `chromium-headless-new` project, and the
// `webkit` project on Playwright WebKit 2287 (`webkit-2287.config.ts`, under
// `guarded --exclusive webkit`). RED on a 10.1.1 tree carrying this spec and harness
// except where a test says it is a regression arm, GREEN on 10.1.2.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, scene: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=${scene}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.locator('[data-witness="seat-0"]').waitFor();
}

const active = (page: Page) =>
    page.evaluate(
        () =>
            document.activeElement?.getAttribute("data-witness") ??
            document.activeElement?.getAttribute("data-item") ??
            null,
    );

/**
 * Tab from the `before` stop to the `after` stop, recording each stop on the way. WebKit's
 * plain Tab skips buttons by default (Safari's "Press Tab to highlight each item" is off),
 * so there the walk presses Option-Tab, which is Safari's full sequential focus order.
 */
async function tabWalk(page: Page, browserName: string): Promise<(string | null)[]> {
    const key = browserName === "webkit" ? "Alt+Tab" : "Tab";
    await page.locator('[data-witness="before"]').focus();
    const walk: (string | null)[] = [];
    for (let i = 0; i < 16; i++) {
        await page.keyboard.press(key);
        const at = await active(page);
        walk.push(at);
        if (at === "after") break;
    }
    return walk;
}

const run = (page: Page) => page.locator(".dock-run");

for (const [label, viewport] of [
    ["1440", { width: 1440, height: 900 }],
    ["390", { width: 390, height: 844 }],
] as const) {
    test.describe(`10.1.2 · ${label}`, () => {
        test.use({ viewport });

        test("G-4 · the atlas shapes seated in a run are all Tab-reachable", async ({
            page,
            browserName,
        }) => {
            await open(page, "atlas");
            expect(await tabWalk(page, browserName)).toEqual([
                "seat-0",
                "filter",
                "gear",
                "handle",
                "year-from",
                "year-to",
                "dark",
                "after",
            ]);
        });

        test("G-4 · arrows rove only the declared seats; an undeclared control keeps its keys", async ({
            page,
        }) => {
            await open(page, "atlas");
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-9");
            await page.keyboard.press("ArrowLeft");
            expect(await active(page)).toBe("seat-0");
            for (const name of ["gear", "handle", "dark"]) {
                await page.locator(`[data-witness="${name}"]`).focus();
                await page.keyboard.press("ArrowRight");
                expect(await active(page), name).toBe(name);
            }
        });

        test("G-4 · a run with an undeclared child claims no toolbar role", async ({ page }) => {
            await open(page, "atlas");
            expect(await run(page).getAttribute("role")).toBeNull();
            expect(await run(page).getAttribute("aria-orientation")).toBeNull();
        });

        // Regression arm: green on 10.1.1 too, which claimed the role over every run.
        test("G-4 · an all-declared run is one toolbar stop with arrows across it", async ({
            page,
            browserName,
        }) => {
            await open(page, "declared");
            expect(await run(page).getAttribute("role")).toBe("toolbar");
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "after"]);
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-1");
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-2");
        });

        // Regression arm: green on 10.1.1 too (its held-control clause), kept because the
        // (b-ii) contract must hold it without that clause.
        test("G-4 · a RadioGroup and a ToggleGroup seated directly keep their arrows", async ({
            page,
        }) => {
            await open(page, "composites");
            for (const group of ["radio", "toggle"]) {
                await page.locator(`[data-item="${group}-x"]`).focus();
                await page.keyboard.press("ArrowRight");
                expect(await active(page), group).toBe(`${group}-y`);
            }
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-9");
        });
    });
}
