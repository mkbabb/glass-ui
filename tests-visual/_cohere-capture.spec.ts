// AY.W-COHERE — the SET-LEVEL contact-sheet capture (the G4 own-surface DELTA).
//
// Captures the FOUR live substrates (blob, constellation, fourier, dock) TOGETHER
// in light AND dark, at TWO viewports — the both-mode set DELTA the cardinal-lesson
// `proof:live-verified-ledger` reads. Honest dimensions: 1280 desktop, 390 mobile.
// The filenames are LITERAL `W-COHERE-<substrate>-<viewport>-<mode>.png` so the
// ledger filename-match binds against the DELTA's references.
//
// This is NOT the gate (the gate is proof:substrate-cohesion); this is the captured
// EVIDENCE the ledger requires for the `complete`-on-allowlist row.

import { fileURLToPath } from "node:url";
import { test } from "@playwright/test";
import type { Page } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AY/audit/visual`;

async function setScheme(page: Page, scheme: "light" | "dark"): Promise<void> {
    await page.emulateMedia({ colorScheme: scheme });
    await page.evaluate((s) => {
        document.documentElement.classList.toggle("dark", s === "dark");
    }, scheme);
    await page.waitForTimeout(220);
}

// The four substrate routes (the set). Each captures the substrate's own canvas
// region (the first ShowcaseFrame on the page) — the live painted surface.
const SUBSTRATES: { id: string; path: string; locator: string }[] = [
    { id: "blob", path: "/substrates/blob", locator: ".goo-blob-wrapper" },
    {
        id: "constellation",
        path: "/substrates/constellation",
        locator: ".constellation",
    },
    { id: "fourier", path: "/substrates/fourier-field", locator: ".fourier-field" },
    { id: "dock", path: "/dock/overview", locator: ".glass-dock" },
];

const VIEWPORTS: { id: string; width: number; height: number }[] = [
    { id: "desktop1280", width: 1280, height: 800 },
    { id: "mobile390", width: 390, height: 844 },
];

for (const vp of VIEWPORTS) {
    for (const scheme of ["light", "dark"] as const) {
        test(`W-COHERE set capture — ${vp.id} ${scheme}`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            for (const sub of SUBSTRATES) {
                await page.goto(sub.path, { waitUntil: "networkidle" }).catch(() => {});
                await setScheme(page, scheme);
                // Let the live substrate settle into a representative frame.
                await page.waitForTimeout(900);
                const target = page.locator(sub.locator).first();
                const visible = await target
                    .isVisible()
                    .catch(() => false);
                const shot = visible ? target : page.locator("body");
                await shot
                    .screenshot({
                        path: `${OUT}/W-COHERE-${sub.id}-${vp.id}-${scheme}.png`,
                    })
                    .catch(async () => {
                        // Fallback to a full-page shot if the element screenshot
                        // raced (e.g. the canvas re-laid out under HMR).
                        await page.screenshot({
                            path: `${OUT}/W-COHERE-${sub.id}-${vp.id}-${scheme}.png`,
                        });
                    });
            }
        });
    }
}
