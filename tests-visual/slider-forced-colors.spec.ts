// A focused Slider keeps a visible focus mark under forced colors. Forced colors drop
// every `box-shadow`, so the track's ring (and the spectrum thumb's) must be an outline
// there. Each cell focuses the thumb by keyboard, then reads the arm's computed outline
// and the pixels of a band just outside the marked box against the same band unfocused.
import { expect, test, type Page } from "@playwright/test";

const ARMS = [
    { id: "scrubber", target: ".slider-track" },
    { id: "invalid", target: ".slider-track" },
    { id: "spectrum", target: ".slider-thumb" },
] as const;

async function band(page: Page, row: string, target: string): Promise<Buffer> {
    const box = await page.locator(`[data-row="${row}"] ${target}`).boundingBox();
    if (!box) throw new Error(`no ${target} in ${row}`);
    const pad = 6;
    return page.screenshot({
        clip: { x: box.x - pad, y: box.y - pad, width: box.width + pad * 2, height: box.height + pad * 2 },
        animations: "disabled",
    });
}

test.describe("slider forced colors · a focused Slider keeps a focus mark", () => {
    for (const arm of ARMS) {
        test(`slider forced colors · ${arm.id} · the focused mark is an outline that paints`, async ({ page }) => {
            await page.emulateMedia({ forcedColors: "active" });
            await page.goto("/tests-visual/slider-forced-colors/harness.html");
            await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
            await page.locator(`[data-row="${arm.id}"] .slider-thumb`).waitFor();
            await page.waitForTimeout(200);
            const before = await band(page, arm.id, arm.target);
            // A key step focuses the thumb by keyboard, so `:focus-visible` matches.
            await page.locator(`[data-row="${arm.id}"] .slider-thumb`).focus();
            await page.keyboard.press("ArrowRight");
            await page.keyboard.press("ArrowLeft");
            await page.waitForTimeout(200);
            const r = await page.evaluate(
                ({ row, target }) => {
                    const thumb = document.querySelector(`[data-row="${row}"] .slider-thumb`)!;
                    const cs = getComputedStyle(document.querySelector(`[data-row="${row}"] ${target}`)!);
                    return {
                        forced: matchMedia("(forced-colors: active)").matches,
                        focusVisible: thumb.matches(":focus-visible"),
                        style: cs.outlineStyle,
                        width: parseFloat(cs.outlineWidth),
                        offset: parseFloat(cs.outlineOffset),
                    };
                },
                { row: arm.id, target: arm.target },
            );
            const after = await band(page, arm.id, arm.target);
            const painted = !after.equals(before);
            test.info().annotations.push({ type: "outline", description: JSON.stringify({ ...r, painted }) });
            expect(r.forced).toBe(true);
            expect(r.focusVisible).toBe(true);
            expect(r.style).toBe("solid");
            expect(r.width).toBeGreaterThanOrEqual(2);
            expect(r.offset).toBeGreaterThanOrEqual(1);
            // The focused frame differs from the unfocused one around the marked box.
            expect(painted).toBe(true);
        });
    }
});
