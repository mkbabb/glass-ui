// AY.W-PRIM-POLISH — own-surface DELTA capture (NOT a gate; the ledger evidence).
// Captures every fixed primitive surface at {light,dark} × {390 mobile, 1280
// desktop} into docs/tranches/AY/audit/visual/ with HONEST dimensions.

import { fileURLToPath } from "node:url";
import { test } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AY/audit/visual`;

const VIEWPORTS = [
    { name: "mobile390", w: 390, h: 844 },
    { name: "desktop1280", w: 1280, h: 800 },
] as const;

async function setScheme(page: import("@playwright/test").Page, scheme: string) {
    await page.emulateMedia({ colorScheme: scheme as "light" | "dark" });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(180);
}

for (const scheme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
        test.describe(`W-PRIM-POLISH capture (${scheme} · ${vp.name})`, () => {
            test(`buttons — gold CTA hover + the corrected specimen (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(resolveScene("display", "buttons").path, {
                    waitUntil: "networkidle",
                });
                await setScheme(page, scheme);

                // The four-state-contract section (carries the corrected specimen).
                const specimen = page
                    .locator("button", { hasText: "Hover (sim.)" })
                    .first();
                await specimen.scrollIntoViewIfNeeded();
                await page.waitForTimeout(120);
                const sBox = (await specimen.boundingBox())!;
                await page.screenshot({
                    path: `${OUT}/W-PRIM-POLISH-buttons-specimen-${vp.name}-${scheme}.png`,
                    clip: {
                        x: Math.max(0, sBox.x - 100),
                        y: Math.max(0, sBox.y - 12),
                        width: Math.min(vp.w, sBox.width + 320),
                        height: sBox.height + 24,
                    },
                });

                // The gold CTA, hovered (the deepened plate + white label).
                const gold = page.locator("button.btn-audacious-gold").first();
                await gold.scrollIntoViewIfNeeded();
                await gold.hover();
                await page.waitForTimeout(450);
                const gBox = (await gold.boundingBox())!;
                await page.screenshot({
                    path: `${OUT}/W-PRIM-POLISH-gold-hover-${vp.name}-${scheme}.png`,
                    clip: {
                        x: Math.max(0, gBox.x - 12),
                        y: Math.max(0, gBox.y - 12),
                        width: gBox.width + 24,
                        height: gBox.height + 24,
                    },
                });
            });

            test(`badge — dark destructive plate (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(resolveScene("display", "badge").path, {
                    waitUntil: "networkidle",
                });
                await setScheme(page, scheme);
                const badge = page
                    .locator("[class*='bg-destructive']")
                    .first();
                await badge.scrollIntoViewIfNeeded();
                await page.waitForTimeout(120);
                const bBox = (await badge.boundingBox())!;
                await page.screenshot({
                    path: `${OUT}/W-PRIM-POLISH-badge-destructive-${vp.name}-${scheme}.png`,
                    clip: {
                        x: Math.max(0, bBox.x - 16),
                        y: Math.max(0, bBox.y - 12),
                        width: bBox.width + 160,
                        height: bBox.height + 24,
                    },
                });
            });

            test(`checks — switch glass track (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto(resolveScene("forms", "checks").path, {
                    waitUntil: "networkidle",
                });
                await setScheme(page, scheme);
                const sw = page.locator("[data-slot='switch']").first();
                await sw.scrollIntoViewIfNeeded();
                await page.waitForTimeout(120);
                const swBox = (await sw.boundingBox())!;
                await page.screenshot({
                    path: `${OUT}/W-PRIM-POLISH-switch-glass-${vp.name}-${scheme}.png`,
                    clip: {
                        x: Math.max(0, swBox.x - 16),
                        y: Math.max(0, swBox.y - 16),
                        width: swBox.width + 120,
                        height: swBox.height + 32,
                    },
                });
            });
        });
    }
}

// The dark modal scrim — captured ONLY in dark (the D3 defect is dark-only; the
// open Dialog over a live page, the receding ink scrim replacing the cream fog).
for (const vp of VIEWPORTS) {
    test(`dialog scrim — dark recedes to ink (${vp.name})`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.goto(resolveScene("containers", "dialog").path, {
            waitUntil: "networkidle",
        });
        await setScheme(page, "dark");
        // Open the first dialog trigger.
        const trigger = page
            .locator("button", { hasText: /open|dialog/i })
            .first();
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();
        await page.waitForTimeout(500);
        await page.screenshot({
            path: `${OUT}/W-PRIM-POLISH-dialog-scrim-${vp.name}-dark.png`,
        });
        // close
        await page.keyboard.press("Escape").catch(() => {});
    });
}
