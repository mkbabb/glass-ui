// U/B7 G1 (3) — hover and press carry no spatial leg on the capsule register and the
// ToggleGroup (PLAN §4.2 "Reader act": no scale on hover or press).
//
// On the v10.1.1 tag `.glass-capsule-hover:hover` scales to 1.015 on the cartoon-punch
// curve, and a pressed ToggleGroupItem squishes to 0.96 (`.tap-squish`). Each cell fails
// there and passes here.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page): Promise<void> {
    await page.goto("/tests-visual/b7-shape/harness.html?scene=press");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(300);
}

const scaleOf = (page: Page, sel: string) =>
    page.locator(sel).evaluate((el) => {
        const cs = getComputedStyle(el);
        return { scale: cs.scale, transform: cs.transform };
    });

const isOne = ({ scale, transform }: { scale: string; transform: string }) =>
    (scale === "none" || scale === "1") &&
    (transform === "none" || /^matrix\(1, 0, 0, 1, /.test(transform));

for (const sel of ['[data-witness="toggle-b"]', '[data-witness="chip"]']) {
    test(`hover leaves ${sel} at scale 1`, async ({ page }) => {
        await open(page);
        await page.locator(sel).hover();
        await page.waitForTimeout(400);
        const s = await scaleOf(page, sel);
        expect(isOne(s), `${s.scale} / ${s.transform}`).toBe(true);
    });
}

test("a held press leaves a ToggleGroupItem at scale 1", async ({ page }) => {
    await open(page);
    const item = page.locator('[data-witness="toggle-b"]');
    const box = (await item.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(400);
    const s = await scaleOf(page, '[data-witness="toggle-b"]');
    await page.mouse.up();
    expect(isOne(s), `${s.scale} / ${s.transform}`).toBe(true);
});
