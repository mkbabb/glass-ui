// AY.W-SB1 — own-surface DELTA capture + the G6 runtime witnesses (NOT a gate;
// the ledger evidence + the born-RED π readbacks). Captures the fixed front-door,
// the constellation hero paint, and the no-wrap headline into
// docs/tranches/AY/audit/visual/ at honest dimensions (390 mobile, 1280 desktop).

import { fileURLToPath } from "node:url";
import { test, expect } from "@playwright/test";

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
        test.describe(`W-SB1 capture (${scheme} · ${vp.name})`, () => {
            // ── G6a — the front door NAVIGATES + the cards are glass ──────────
            test(`intro front-door — glass cards + live nav (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto("/", { waitUntil: "networkidle" });
                await setScheme(page, scheme);
                await page.waitForTimeout(400);

                // Capture the front-door hero + the glass category grid.
                await page.screenshot({
                    path: `${OUT}/W-SB1-intro-frontdoor-${vp.name}-${scheme}.png`,
                    fullPage: false,
                });

                // G6a witness: the category cards are RouterLink anchors to real
                // paths; a click CHANGES the router path (born-RED: pathChanged
                // false on the old #/slug hrefs).
                const firstCard = page.locator('a[href="/substrates"]').first();
                await expect(firstCard).toHaveCount(1);
                const before = page.url();
                await firstCard.scrollIntoViewIfNeeded();
                await firstCard.click();
                await page.waitForTimeout(400);
                const after = page.url();
                expect(after).not.toBe(before);
                expect(after).toContain("/substrates");
            });
        });
    }
}
