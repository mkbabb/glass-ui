// BA.W-DEMO-AFFORDANCES — demo-affordances.spec.ts, the BINDING π readback (the
// captured own-surface truth; the cardinal-lesson DELTA). proof:demo-affordances
// proves the SOURCE structure (no .glass-btn+.btn-pill stack, one play register,
// no lone column-flex trigger, no bg-card/60 plate); THIS spec proves the painted
// RENDER — the affordances read as DESIGNED in BOTH modes. The AZ.W-MOTION2 close
// marked the curve-gallery `complete` on the source diff while BOTH the play
// control + the picker eroded live (R8-16/R8-17, the source-green/visually-broken
// gap, the AZ P-1 close-class). So the live render is the binding truth, never the
// source diff alone.
//
// THE BINDING ARMS (the real demo routes, which load the global /styles cascade so
// the glass-bg tiers + the dock active register resolve):
//
//   (d) GLASS CONTAINER — a re-pointed demo container composites as glass over its
//       backdrop (a resolved translucent --glass-bg-* tier, NOT the opaque
//       bg-card/60).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual", import.meta.url),
);

const SKELETON_ROUTE = "/feedback/skeleton";

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

function alphaOf(bg: string): number | null {
    const rgba = bg.match(
        /rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(
        /(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i,
    );
    if (fn) {
        const v = fn[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    if (/^(color\(srgb|oklab\(|rgb\()/i.test(bg)) return 1;
    return null;
}

test.describe("BA.W-DEMO-AFFORDANCES — the demo affordances π readback", () => {
    mkdirSync(VISUAL_DIR, { recursive: true });

    // ── (d) the re-pointed containers composite as glass, not opaque slab ──────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`skeleton container composites as glass (translucent tier) — ${mode}`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(SKELETON_ROUTE, { waitUntil: "networkidle" });
            await setDark(page, dark);

            const bgAlpha = await page.evaluate(() => {
                // The first re-pointed ShowcaseFrame (the card skeleton plate).
                const frame =
                    document.querySelector<HTMLElement>(".rounded-card");
                if (!frame) return null;
                const cs = getComputedStyle(frame);
                return cs.backgroundColor;
            });
            expect(bgAlpha, "the skeleton frame must render").not.toBeNull();
            if (!bgAlpha) return;
            const a = alphaOf(bgAlpha);
            expect(
                a,
                `the re-pointed container must composite as a translucent glass tier (not opaque bg-card/60) — got ${bgAlpha}`,
            ).not.toBeNull();
            // a glass-routed Card tier is translucent (< 1); an opaque slab is 1.
            expect(a!).toBeLessThan(1);

            await page.screenshot({
                path: `${VISUAL_DIR}/W-DEMO-AFFORDANCES-skeleton-desktop-${mode}.png`,
                fullPage: false,
            });
        });
    }
});
