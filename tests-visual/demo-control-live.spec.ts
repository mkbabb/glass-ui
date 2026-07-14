// BI.W-GRAIN-WIRE — demo-control-live.spec.ts, the BINDING behaviour readback (the
// LOCAL-ONLY π half). proof:demo-control-live proves the SOURCE (DCL1/DCL2 device-
// free — the enrolled knobs are read outside their control + the named tokens are
// written); THIS spec proves the LIVE contract on /compositions/settings:
//
//   (a) THE GRAIN SLIDER drives grain density. Dragging the "Grain" slider tracks
//       `getComputedStyle(--glass-grain-opacity)` on the settings surface — up on
//       ArrowRight, down on ArrowLeft (the slider is no longer a no-op).
//   (b) THE PAPER-UNDERPAINT SWITCH toggles the real overlay. The settings surface
//       carries `.paper-grain-overlay` while ON and loses it while OFF — a per-region
//       texture delta the screenshots capture. BOTH modes.
//
// LOCAL-ONLY (real-browser dev-box; loads :5199). Chromium desktop + coarse-touch run
// it via the `--run pi` enrolled glob; rides the B-close gestalt ceremony. Captured to
// docs/tranches/BI/audit/visual/.

import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BI/audit/visual/", import.meta.url),
);

const SURFACE = ".settings-page";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(80);
}

// getComputedStyle of a custom property on the settings surface.
async function grainToken(page: Page): Promise<number> {
    const raw = await page.locator(SURFACE).first().evaluate((el) =>
        getComputedStyle(el as HTMLElement)
            .getPropertyValue("--glass-grain-opacity")
            .trim(),
    );
    return Number.parseFloat(raw);
}

async function hasOverlay(page: Page): Promise<boolean> {
    return page
        .locator(SURFACE)
        .first()
        .evaluate((el) => (el as HTMLElement).classList.contains("paper-grain-overlay"));
}

test.beforeEach(async ({ page }) => {
    mkdirSync(VISUAL_DIR, { recursive: true });
    await page.goto("/compositions/settings", { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
});

for (const dark of [false, true]) {
    const mode = dark ? "dark" : "light";

    // ── (a) the grain slider drives --glass-grain-opacity ────────────────────────
    test(`(a) grain slider tracks --glass-grain-opacity [${mode}]`, async ({
        page,
    }) => {
        await setDark(page, dark);

        const slider = page.getByRole("slider", { name: /grain/i }).first();
        await slider.scrollIntoViewIfNeeded();
        const base = await grainToken(page);
        expect(Number.isNaN(base)).toBe(false);

        // ArrowRight raises the slider → the grain token rises with it.
        await slider.focus();
        for (let i = 0; i < 6; i++) await page.keyboard.press("ArrowRight");
        await page.waitForTimeout(120);
        const raised = await grainToken(page);
        expect(raised).toBeGreaterThan(base);

        await page.screenshot({
            path: `${VISUAL_DIR}grain-slider-raised-${mode}.png`,
        });

        // ArrowLeft lowers it → the grain token falls back.
        for (let i = 0; i < 10; i++) await page.keyboard.press("ArrowLeft");
        await page.waitForTimeout(120);
        const lowered = await grainToken(page);
        expect(lowered).toBeLessThan(raised);
    });

    // ── (b) the paper-underpaint switch toggles the overlay ──────────────────────
    test(`(b) paper-underpaint switch toggles .paper-grain-overlay [${mode}]`, async ({
        page,
    }) => {
        await setDark(page, dark);

        // Default ON — the overlay is present on the settings surface.
        expect(await hasOverlay(page)).toBe(true);
        await page.screenshot({
            path: `${VISUAL_DIR}paper-grain-on-${mode}.png`,
        });

        const sw = page.getByRole("switch", { name: /paper underpaint/i }).first();
        await sw.scrollIntoViewIfNeeded();

        // Toggle OFF — the overlay leaves.
        await sw.click();
        await page.waitForTimeout(120);
        expect(await hasOverlay(page)).toBe(false);
        await page.screenshot({
            path: `${VISUAL_DIR}paper-grain-off-${mode}.png`,
        });

        // Toggle back ON — the overlay returns (round-trip, no stuck state).
        await sw.click();
        await page.waitForTimeout(120);
        expect(await hasOverlay(page)).toBe(true);
    });
}
