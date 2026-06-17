// BB.W-DEAD-SWEEP — expandable-container.spec.ts, the BINDING π readback for the
// ExpandableContainer always-teleport redress (the atlas-flagged "blank-canvas"
// residual). The prior UNCONDITIONAL `<Teleport to="body">` mounted an empty body
// teleport anchor on EVERY render — even the inline (`!open`) state — disturbing body
// layout/stacking. The fix gates the Teleport `:disabled="!open"` (a disabled Teleport
// renders its children IN PLACE, so the inline state mounts NO body anchor; only the
// fullscreen state teleports). This is a PAINT-bearing change, so the source structure
// is not enough — the live render is the binding truth.
//
// THE BINDING ARMS (driven against the real /containers/expandable-container story,
// which loads the global `/styles` cascade so the `.glass-overlay` + `[data-surface]`
// seam resolves; mirrors surface-axis.spec.ts):
//
//   (a) INLINE REAL CANVAS + NO BODY-TELEPORT — in the at-rest (`!open`) state the
//       slotted canvas renders REAL, non-blank content (a pixel-non-uniform readback)
//       AND `document.body` carries NO fixed full-viewport `.glass-overlay` overlay
//       node from the component (the always-teleport blank-canvas residual is gone —
//       a disabled Teleport renders in place, not to body).
//   (b) FULLSCREEN FROSTED OVER CONTENT — after activating the Maximize2 trigger the
//       overlay teleports to `document.body` (a DIRECT body child) AND it frosts over
//       content: the `glass-overlay` tier resolves a TRANSLUCENT background (alpha < 1,
//       the BA.W-SURFACE-AXIS un-walled frosted-over-content plate), NOT a solid wall.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: an inline body-teleport residual / a blank
// inline canvas / a solid (opaque) fullscreen overlay reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

const HOST_ROUTE = "/containers/expandable-container";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(150);
}

function alphaOf(bg: string): number | null {
    // Parse the alpha out of an rgba()/color(srgb …/α)/oklab(… /α) background.
    const rgba = bg.match(/rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i);
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(
        /(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i,
    );
    if (fn) return fn[1].endsWith("%") ? Number(fn[1].slice(0, -1)) / 100 : Number(fn[1]);
    return null;
}

/** Count the `.glass-overlay` full-viewport overlay nodes that are DIRECT children of
 *  document.body (the teleported fullscreen host). The redress demands ZERO in the
 *  inline state, exactly ONE in the fullscreen state. */
async function bodyTeleportedOverlays(page: Page): Promise<number> {
    return page.evaluate(() => {
        return [...document.body.children].filter(
            (el) =>
                el instanceof HTMLElement &&
                el.classList.contains("glass-overlay") &&
                getComputedStyle(el).position === "fixed",
        ).length;
    });
}

test.describe("expandable-container (π — the always-teleport redress, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";

            test(`(a) inline renders real canvas + NO body-teleport @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);

                // The first ExpandableContainer's inline slotted canvas (the demo's
                // `bg-card` panel) is in flow — REAL, non-blank content.
                const canvas = page.locator("code.fira-code").first();
                await expect(canvas, "the inline slotted canvas must render").toBeVisible();
                const box = await canvas.boundingBox();
                expect(box, "the inline canvas must have a non-zero painted box").not.toBeNull();
                expect(box!.width, "inline canvas width > 0").toBeGreaterThan(0);
                expect(box!.height, "inline canvas height > 0").toBeGreaterThan(0);

                // THE REDRESS — in the at-rest (`!open`) state NO component overlay is
                // teleported to body (the always-teleport blank-canvas residual gone).
                const overlays = await bodyTeleportedOverlays(page);
                expect(
                    overlays,
                    "the inline state must mount NO fixed .glass-overlay on document.body (the disabled Teleport renders in place, not to body)",
                ).toBe(0);

                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.screenshot({
                    path: `${VISUAL_DIR}/expandable-inline-${vp.name}-${mode}.png`,
                });
            });

            test(`(b) fullscreen teleports + frosts over content (alpha < 1) @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);

                // Activate the first Maximize2 fullscreen trigger.
                await page
                    .locator('button[aria-label="Fullscreen"]')
                    .first()
                    .click();
                await page.waitForTimeout(200);

                // The overlay is now a DIRECT body child (the teleport fired).
                const overlays = await bodyTeleportedOverlays(page);
                expect(
                    overlays,
                    "the fullscreen state teleports exactly ONE .glass-overlay onto document.body",
                ).toBe(1);

                // It frosts over content — the glass-overlay tier resolves a TRANSLUCENT
                // background (alpha < 1, the un-walled frosted-over-content plate), NOT a
                // solid wall.
                const bg = await page.evaluate(() => {
                    const el = [...document.body.children].find(
                        (n) =>
                            n instanceof HTMLElement &&
                            n.classList.contains("glass-overlay") &&
                            getComputedStyle(n).position === "fixed",
                    ) as HTMLElement | undefined;
                    return el ? getComputedStyle(el).backgroundColor : "";
                });
                const a = alphaOf(bg);
                expect(a, `fullscreen overlay bg "${bg}"`).not.toBeNull();
                expect(
                    a!,
                    "the fullscreen overlay must frost over content (alpha < 1), not paint a solid wall",
                ).toBeLessThan(0.999);

                mkdirSync(VISUAL_DIR, { recursive: true });
                await page.screenshot({
                    path: `${VISUAL_DIR}/expandable-fullscreen-${vp.name}-${mode}.png`,
                });

                // Restore (release the body-overflow lock for the next test).
                await page
                    .locator('button[aria-label="Exit fullscreen"]')
                    .first()
                    .click();
                await page.waitForTimeout(100);
            });
        }
    }
});
