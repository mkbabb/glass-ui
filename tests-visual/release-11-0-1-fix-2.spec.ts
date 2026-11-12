// glass-ui 11.0.1, fix 2 — the stadium dock's rest corner with and without the script's
// published cross extent. A server-rendered dock paints before its mounted hook writes
// `--dock-plate-cross-px`; the cascade it paints then is the mounted dock's with that
// inline property removed. In every geometry the corner must be the same length either
// way (half the plate's cross extent: its height when horizontal, its width when
// vertical), on the box and on the plate that inherits it.
//   f1  the owner's figure dock (11.0.1 harness), open and collapsed
//   f2  a plain horizontal dock, the house density and the cockpit preset (10.1.5 harness)
//   f3  a vertical dock (10.1.5 harness)
// 1440 fine and 390 coarse. Each cell prints a `f2 ` JSON row.
import { expect, test, type Page } from "@playwright/test";

type Read = { inline: string; root: string; plate: string; cross: number };

async function read(page: Page, sel: string): Promise<Read> {
    return page.evaluate((sel) => {
        const root = document.querySelector<HTMLElement>(sel)!;
        const plate = root.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const vertical = root.classList.contains("vertical");
        return {
            inline: root.style.getPropertyValue("--dock-plate-cross-px"),
            root: getComputedStyle(root).borderTopLeftRadius,
            plate: getComputedStyle(plate).borderTopLeftRadius,
            cross: vertical ? plate.offsetWidth : plate.offsetHeight,
        };
    }, sel);
}

async function cell(page: Page, url: string, sel: string, name: string): Promise<void> {
    await page.goto(url);
    await page.locator(sel).first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);
    const published = await read(page, sel);
    await page.evaluate((sel) => document.querySelector<HTMLElement>(sel)!.style.removeProperty("--dock-plate-cross-px"), sel);
    await page.waitForTimeout(200);
    const unpublished = await read(page, sel);
    console.log(`f2 ${JSON.stringify({ cell: name, published, unpublished })}`);
    expect(published.inline, `${name}: the script published its measure`).not.toBe("");
    const half = published.cross / 2;
    for (const [k, v] of [
        ["published root", published.root],
        ["published plate", published.plate],
        ["unpublished root", unpublished.root],
        ["unpublished plate", unpublished.plate],
    ] as const) {
        expect.soft(Math.abs(Number.parseFloat(v) - half), `${name}: ${k} ${v} is half the cross extent ${half}`).toBeLessThanOrEqual(0.5);
    }
}

for (const coarse of [false, true]) {
    const tag = coarse ? "390c" : "1440f";
    test.describe(`fix 2 ${tag}`, () => {
        test.use(
            coarse
                ? { hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } }
                : { viewport: { width: 1440, height: 900 } },
        );
        for (const state of ["open", "closed"] as const) {
            test(`f1 ${tag} the figure dock ${state}: the rest corner needs no script`, async ({ page }) => {
                await cell(page, `/tests-visual/release-11-0-1/harness.html?scene=figure&collapse=${state}`, ".witness-dock", `${tag} figure ${state}`);
            });
        }
        for (const preset of ["", "cockpit"]) {
            test(`f2 ${tag} a horizontal dock${preset ? ` (${preset})` : ""}: the rest corner needs no script`, async ({ page }) => {
                await cell(
                    page,
                    `/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=icon,icon,icon${preset ? `&preset=${preset}` : ""}`,
                    ".glass-dock",
                    `${tag} horizontal ${preset || "house"}`,
                );
            });
        }
        test(`f3 ${tag} a vertical dock: the rest corner needs no script`, async ({ page }) => {
            await cell(page, `/tests-visual/release-10-1-5/harness.html?scene=seats&kinds=icon,icon,icon&orientation=vertical&stageH=400`, ".glass-dock", `${tag} vertical`);
        });
    });
}
