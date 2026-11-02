// glass-ui 10.1.4 — the engine witnesses for sci-report O-119 (g) and the `@page` half
// of (f), each a defect Gregg works around at 10.1.3. Each drives
// `release-10-1-4/harness.html?scene=…` (the real components from `src/` under the
// demo's own cascade) and reads layout, computed style or the printed PDF's page boxes,
// never pixels. Engines: the `chromium-headless-new` project, and the `webkit` project
// on Playwright WebKit 2287 (`webkit-2287.config.ts`, under `guarded --exclusive
// webkit`). RED on a 10.1.3 tree carrying this spec and harness, GREEN on 10.1.4.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-4/harness.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
}

/** Let the platform deliver its first ResizeObserver observation and the rAF dispatch. */
async function settle(page: Page): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((r) =>
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => requestAnimationFrame(() => r())),
                ),
            ),
    );
    await page.waitForTimeout(200);
}

/** Every page box in a PDF Chromium printed, as `[width, height]` in points. */
function mediaBoxes(pdf: Buffer): number[][] {
    const text = pdf.toString("latin1");
    return [...text.matchAll(/\/MediaBox\s*\[\s*([\d.\s-]+)\]/g)].map((m) => {
        const [x0, y0, x1, y1] = m[1].trim().split(/\s+/).map(Number);
        return [Math.round(x1 - x0), Math.round(y1 - y0)];
    });
}

/** The print-time reads the `@page` cure changes, under `emulateMedia({ media: "print" })`. */
async function printReads(page: Page) {
    await page.emulateMedia({ media: "print" });
    return page.evaluate(() => {
        const adjust = (el: Element) => {
            const cs = getComputedStyle(el);
            return (
                cs.getPropertyValue("print-color-adjust") ||
                cs.getPropertyValue("-webkit-print-color-adjust")
            );
        };
        const stage = document.querySelector('[data-slot="deck-stage"]');
        return {
            htmlAdjust: adjust(document.documentElement),
            bodyAdjust: adjust(document.body),
            appBlock: getComputedStyle(document.getElementById("app")!).minBlockSize,
            stagePage: stage ? getComputedStyle(stage).getPropertyValue("page") : null,
            supportsPage: CSS.supports("page", "deck"),
            pageRules: [...document.styleSheets].flatMap((sheet) => {
                const walk = (rules: CSSRuleList): string[] =>
                    [...rules].flatMap((r) =>
                        r instanceof CSSPageRule
                            ? [`@page ${r.selectorText}`.trim()]
                            : "cssRules" in r
                              ? walk((r as CSSGroupingRule).cssRules)
                              : [],
                    );
                return walk(sheet.cssRules);
            }),
        };
    });
}

test.describe("O-119 (g): DataTable learns its width on mount", () => {
    test("a responsive DataTable in a 390 px box is a card list on the first observation, with no resize", async ({
        page,
    }) => {
        await open(page, "scene=table&width=390");
        await settle(page);
        const host = page.locator('[data-witness="host"]');
        expect((await host.boundingBox())!.width).toBe(390);
        await expect(host.locator(".data-table-cards")).toHaveCount(1);
        await expect(host.locator(".data-table-card")).toHaveCount(3);
        await expect(host.locator("table")).toHaveCount(0);
    });

    test("the same DataTable in a 900 px box stays a table", async ({ page }) => {
        await open(page, "scene=table&width=900");
        await settle(page);
        const host = page.locator('[data-witness="host"]');
        await expect(host.locator("table")).toHaveCount(1);
        await expect(host.locator(".data-table-cards")).toHaveCount(0);
    });
});

test.describe("O-119 (f), the @page half: only a deck prints at slide geometry", () => {
    test("a page without a deck keeps the reader's print defaults", async ({ page }) => {
        await open(page, "scene=print-plain");
        const reads = await printReads(page);
        expect(reads.stagePage).toBeNull();
        // The library cascade declares no unnamed page: only the deck's named one.
        expect(reads.pageRules).toEqual(["@page deck"]);
        // The deck's print resets do not reach a page that has no deck.
        expect(reads.htmlAdjust).toBe("economy");
        expect(reads.bodyAdjust).toBe("economy");
        expect(reads.appBlock).toBe("50px");
    });

    test("a deck page takes the deck's print resets and its named page", async ({
        page,
        browserName,
    }) => {
        await open(page, "scene=print-deck");
        const reads = await printReads(page);
        expect(reads.htmlAdjust).toBe("exact");
        expect(reads.bodyAdjust).toBe("exact");
        expect(reads.appBlock).toBe("0px");
        expect(reads.supportsPage).toBe(true);
        expect(reads.pageRules).toEqual(["@page deck"]);
        // WebKit 2287 parses `page` (`CSS.supports` is true, above) but does not
        // serialize it in computed style (it reads ""); the stage's page is read in
        // Chromium, and its printed boxes in the page.pdf cell below.
        if (browserName === "chromium") expect(reads.stagePage).toBe("deck");
    });

    test("page.pdf: a page without a deck prints on the default paper (Letter)", async ({
        page,
        browserName,
    }) => {
        test.skip(browserName !== "chromium", "page.pdf is Chromium's");
        await open(page, "scene=print-plain");
        await page.emulateMedia({ media: "print" });
        const boxes = mediaBoxes(await page.pdf({ preferCSSPageSize: true }));
        expect(boxes.length).toBeGreaterThan(0);
        for (const box of boxes) expect(box).toEqual([612, 792]);
    });

    test("page.pdf: a deck page prints one 1280x720 page per slide", async ({
        page,
        browserName,
    }) => {
        test.skip(browserName !== "chromium", "page.pdf is Chromium's");
        await open(page, "scene=print-deck");
        await page.emulateMedia({ media: "print" });
        const boxes = mediaBoxes(await page.pdf({ preferCSSPageSize: true }));
        // 1280 x 720 CSS px = 960 x 540 pt.
        expect(boxes).toEqual([
            [960, 540],
            [960, 540],
        ]);
    });
});
