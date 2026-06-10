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
                await page.goto("/foundations/intro", { waitUntil: "networkidle" });
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

            // ── G6b — the constellation hero PAINTS (non-zero host + canvas) ──
            test(`compositions/hero — constellation paints (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.w, height: vp.h });
                await page.goto("/compositions/hero", { waitUntil: "networkidle" });
                await setScheme(page, scheme);
                await page.waitForTimeout(700);

                // The constellation host (.story-hero-bg) must have a non-zero
                // block-size, and its canvas backing must be sized past the
                // 300×150 default. Born-RED: host h=0, canvas 300×150.
                const readback = await page.evaluate(() => {
                    const host = document.querySelector(".story-hero-bg");
                    const canvas = document.querySelector(
                        ".story-hero-bg canvas",
                    ) as HTMLCanvasElement | null;
                    if (!host) return { hostH: -1, canvasW: -1, canvasH: -1 };
                    const hr = host.getBoundingClientRect();
                    return {
                        hostH: Math.round(hr.height),
                        canvasW: canvas?.width ?? -1,
                        canvasH: canvas?.height ?? -1,
                    };
                });
                // host fills the hero (hundreds of px, not 0); canvas sized past
                // the 300×150 default.
                expect(readback.hostH).toBeGreaterThan(200);
                expect(readback.canvasW).toBeGreaterThan(300);

                await page.screenshot({
                    path: `${OUT}/W-SB1-hero-constellation-${vp.name}-${scheme}.png`,
                    fullPage: false,
                });
            });

            // ── G6d — the headline does NOT wrap mid-word ("f / or") ──────────
            test(`compositions/hero — no mid-word wrap (${scheme}·${vp.name})`, async ({
                page,
            }) => {
                // Force a narrow width that historically wrapped the headline.
                await page.setViewportSize({ width: 420, height: 720 });
                await page.goto("/compositions/hero", { waitUntil: "networkidle" });
                await setScheme(page, scheme);
                await page.waitForTimeout(1600); // let the typewriter settle

                // The ℱ-glyph and the leading "or" must share a line: the glyph's
                // bounding-box top equals the "or" run's top (same line). We read
                // the nowrap unit's geometry — the glyph span and its sibling text
                // node sit inside ONE `.whitespace-nowrap` span.
                const sameLine = await page.evaluate(() => {
                    const glyph = document.querySelector(
                        "h2 .fourier-f",
                    ) as HTMLElement | null;
                    if (!glyph) return { ok: false, reason: "no glyph" };
                    const nowrap = glyph.closest(".whitespace-nowrap");
                    if (!nowrap) return { ok: false, reason: "glyph not in nowrap unit" };
                    // The nowrap unit's client rects: a single line means ONE rect
                    // row (height ~ one line). If the f and or split, the unit would
                    // span two rect rows.
                    const rects = nowrap.getClientRects();
                    return {
                        ok: rects.length === 1,
                        rectRows: rects.length,
                    };
                });
                expect(sameLine.ok).toBe(true);

                const h2 = page.locator("h2").first();
                await h2.scrollIntoViewIfNeeded();
                const box = (await h2.boundingBox())!;
                await page.screenshot({
                    path: `${OUT}/W-SB1-headline-nowrap-${scheme}.png`,
                    clip: {
                        x: Math.max(0, box.x - 8),
                        y: Math.max(0, box.y - 8),
                        width: Math.min(420, box.width + 16),
                        height: box.height + 16,
                    },
                });
            });
        });
    }
}
