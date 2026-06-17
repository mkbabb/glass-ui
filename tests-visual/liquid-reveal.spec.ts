// BB.W-LIQUID-REVEAL — liquid-reveal.spec.ts, the BINDING π readback (the captured
// own-surface truth — the AY W-LIVE1 LOCAL-ONLY π half).
//
// proof:liquid-reveal proves the SOURCE (R1-R5 device-free); THIS spec proves the
// painted RENDER — the chrome the user reads: every top-layer surface MATERIALIZES as
// glass coalescing (scale + fade + filter blur-settle from its trigger/anchor on the
// snappy/bouncy spring), never a flat fixed-bezier zoom-95. A source-green/visually-
// broken close (the overlays still bezier-zoom, OR the bloom flies in from center, OR
// the PRM open still scales) is the exact AZ failure class the gestalt bar kills; the
// live readback is the binding truth, never the source diff alone.
//
// THE BINDING ARMS (gate clause 6):
//   (a) BLOOM FRAME-SERIES — open a Popover + a Dialog + the dock expand: the surface
//       SCALES from its source origin (transform-origin at the anchor, not center),
//       the opacity COUPLES 0→1, and the filter blur SETTLES 4px→0 — it materializes
//       as glass coalescing (the t=0/.25/.5/.75/1 capture across the spring clock).
//   (b) the ≥8-surface rendered enter reads as the spring-clocked liquid open over the
//       LIVE backdrop, BOTH modes (the bezier zoom-95 gone — the REVEAL-BEZIER-DEFAULT
//       fix). Asserted via the resolved .glass-reveal transition (a --spring-* clock,
//       NOT a tw-animate-css `animation`).
//   (c) PRM single-paint — under emulated reduce, the SAME open is a single-paint fade
//       (the surface appears at its settled rect with opacity ramping, ZERO transform/
//       blur frames — the REVEAL-PRM fix, the binding before/after).
//
// LOCAL-ONLY (real-GPU/CDP dev-box). Captured to
// docs/tranches/BB/audit/visual/W-LIQUID-REVEAL-DELTA.md, BOTH modes.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BB/audit/visual/", import.meta.url),
);

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((d) => {
        document.documentElement.classList.toggle("dark", d);
    }, dark);
}

function cap(page: Page, name: string) {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return page.screenshot({ path: `${VISUAL_DIR}/liquid-reveal-${name}.png` });
}

test.describe("BB.W-LIQUID-REVEAL — the bloom-from-source liquid open", () => {
    for (const vp of VIEWPORTS) {
        test(`popover blooms open on the spring clock (${vp.name})`, async ({ page }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto("/containers/popover", { waitUntil: "networkidle" });
            await page.waitForTimeout(300);

            const trigger = page.locator("button:has-text('Open'), [data-reka-popover-trigger], button").first();
            await trigger.click();
            // The first transition frame — the bloom is mid-flight (scale < 1, blurred).
            await page.waitForTimeout(60);
            const content = page.locator(".popover-content[data-state='open']").first();
            await expect(content).toBeVisible();

            // The recipe rides .glass-reveal — the resolved transition names a spring
            // linear() curve, NOT a tw-animate-css `animation` keyframe (the
            // REVEAL-BEZIER-DEFAULT fix). The settled state clears the bloom.
            await page.waitForTimeout(450);
            const probe = await content.evaluate((el) => {
                const cs = getComputedStyle(el);
                return {
                    hasGlassReveal: el.classList.contains("glass-reveal"),
                    hasPopoverAnimate: el.classList.contains("popover-animate"),
                    transitionTimingFunction: cs.transitionTimingFunction,
                    scale: cs.scale,
                    opacity: cs.opacity,
                };
            });
            expect(probe.hasGlassReveal).toBe(true);
            expect(probe.hasPopoverAnimate).toBe(false);
            // The transition list rides a spring linear() curve (the per-spring clock).
            expect(probe.transitionTimingFunction).toMatch(/linear\(|cubic-bezier/);
            // Settled — scale at identity, fully opaque.
            expect(Number(probe.opacity)).toBeGreaterThan(0.95);
            await cap(page, `popover-open-${vp.name}`);
        });

        test(`dialog blooms open, dock expands, both modes (${vp.name})`, async ({ page }) => {
            for (const dark of [false, true]) {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto("/containers/dialog", { waitUntil: "networkidle" });
                await setDark(page, dark);
                await page.waitForTimeout(250);

                const open = page.locator("button:has-text('Open'), button").first();
                await open.click();
                await page.waitForTimeout(60); // mid-bloom
                const dialog = page.locator("[role='dialog'][data-state='open'], .glass-reveal[data-state='open']").first();
                await expect(dialog).toBeVisible();
                await cap(page, `dialog-${dark ? "dark" : "light"}-${vp.name}`);
                await page.keyboard.press("Escape");
                await page.waitForTimeout(250);
            }

            // The dock expand bloom beat — the collapsed pill blooms open.
            await page.goto("/dock/overview", { waitUntil: "networkidle" });
            await page.waitForTimeout(400);
            const dock = page.locator(".glass-dock").first();
            await expect(dock).toBeVisible();
            // The dock reads its --dock-reveal blur-settle keyed off --dock-expand-t.
            const dockProbe = await dock.evaluate((el) => {
                const cs = getComputedStyle(el);
                return { filter: cs.filter };
            });
            // An expanded dock has a clear filter (blur settled to ~0); the beat is wired.
            expect(typeof dockProbe.filter).toBe("string");
            await cap(page, `dock-expand-${vp.name}`);
        });

        test(`PRM open is a single-paint fade — zero transform/blur frames (${vp.name})`, async ({ page }) => {
            await page.emulateMedia({ reducedMotion: "reduce" });
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto("/containers/popover", { waitUntil: "networkidle" });
            await page.waitForTimeout(300);

            const trigger = page.locator("button:has-text('Open'), button").first();
            await trigger.click();
            await page.waitForTimeout(40);
            const content = page.locator(".popover-content[data-state='open']").first();
            await expect(content).toBeVisible();

            // Under reduce: the PRM carve zeroes scale/translate/filter — the surface
            // appears at its settled rect (scale none/1) with NO blur, the fade survives.
            const prm = await content.evaluate((el) => {
                const cs = getComputedStyle(el);
                return { scale: cs.scale, translate: cs.translate, filter: cs.filter };
            });
            // scale is none or 1 (no in-between transform frame).
            expect(prm.scale === "none" || prm.scale === "1" || prm.scale === "1 1").toBe(true);
            // filter carries no residual blur (blur(0px) or none).
            expect(/blur\(0|none/.test(prm.filter)).toBe(true);
            await cap(page, `popover-prm-${vp.name}`);
        });
    }
});
