// AY.W-EGG — own-surface DELTA capture + the per-egg π readback (NOT the gate;
// the proof:easter-eggs source-witness is the gate, this is the ledger
// evidence). Each egg FIRES on the live demo and the reaction is read back, then
// captured. Honest dimensions: 390 mobile, 1280 desktop.

import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AY/audit/visual`;

async function setScheme(
    page: import("@playwright/test").Page,
    scheme: "light" | "dark",
) {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(180);
}

// ── E4 — the 404 constellation + the empty-states mascot ────────────────────
for (const scheme of ["light", "dark"] as const) {
    test(`E4 404 paints the lattice (${scheme})`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto("/this/route/does/not/exist", {
            waitUntil: "networkidle",
        });
        await setScheme(page, scheme);
        await page.waitForTimeout(500);

        const has404 = await page.evaluate(() =>
            document.body.textContent?.includes("Lost in the lattice"),
        );
        expect(has404).toBe(true);

        await page.screenshot({
            path: `${OUT}/W-EGG-404-lattice-desktop1280-${scheme}.png`,
            fullPage: false,
        });
    });
}

test("E4 empty-states mascot is mounted (light·mobile390)", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/compositions/empty-states", { waitUntil: "networkidle" });
    await setScheme(page, "light");
    await page.waitForTimeout(500);

    const mascot = await page.evaluate(() => {
        const el = document.querySelector('[data-egg="empty-states-mascot"]');
        return { present: !!el };
    });
    expect(mascot.present).toBe(true);

    await page.screenshot({
        path: `${OUT}/W-EGG-mascot-mobile390-light.png`,
        fullPage: false,
    });
});
