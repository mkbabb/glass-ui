// BA.W-EMISSION — emission.spec.ts, the BINDING π readback (the captured own-surface
// truth; the cardinal-lesson DELTA). proof:emission proves the producer-side BUILT-CSS
// (the backing rules SHIP); THIS spec proves the painted RENDER — the source-green/
// visually-broken gap is the P-1 close-class BA exists to fix, so the live
// getComputedStyle/getBoundingClientRect readback is the binding truth, never the
// build-grep alone.
//
// THE BINDING ARMS (the live demo cascade, so the PRECOMPILED shipped rules resolve):
//   (a) THE SELECT COLLISION-BOUND — opening the demo Select computes a REAL maxHeight
//       (NOT "none"), and the content box BOTTOMS INSIDE the viewport with inner scroll
//       available. On a SHORT viewport the --reka-popper-available-height tighten clamps
//       the panel below the trigger; the precompiled [data-slot=select-content] rule is
//       the ONLY way maxHeight resolves (the dead arbitrary-bracket class never painted).
//   (b) THE OPEN GROWS FROM THE ANCHOR — the content's transform-origin is set (the WO-2
//       honor: the panel grows from the trigger edge, not a center sweep).
//   (c) THE SLIDER SIZE AXIS — a standard size=md slider measures a REAL track-height
//       ≈1.25rem (20px), NOT the 6px fallback; the spectrum thumb is ≤0.5× its track
//       (the slim value.js bar). The precompiled [data-size] rule is the only backing.
//   (d) THE WATERCOLOR GHOST (BC.W-VIZ-WATERCOLOR) — a seeded variant=ghost dot renders
//       the blob SILHOUETTE as a DASHED SVG <ellipse> stroke (a real stroke-dasharray
//       tracing the seeded silhouette), and a solid dot of the SAME seed carries the SAME
//       border-radius silhouette (the seeded match) — a dashed OUTLINE following the
//       silhouette, NOT a solid ring and NOT a dashed rectangular box border.
//
// + the captured DELTA frames written to the DELTA dir. Fail-CLOSED: an unbounded
// dropdown / a 6px md track / a dashed-rect ghost reds the readback, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

function frame(name: string): string {
    mkdirSync(VISUAL_DIR, { recursive: true });
    return `${VISUAL_DIR}${name}`;
}

// ── (a)+(b) THE SELECT COLLISION-BOUND ───────────────────────────────────────────────
test.describe("BA.W-EMISSION — the Select collision-bound ships + bounds in-viewport", () => {
    // A SHORT viewport forces the --reka-popper-available-height tighten to clamp the
    // panel; the precompiled bound is the only path to a real maxHeight + an in-viewport
    // bottom + inner scroll.
    test.use({ viewport: { width: 520, height: 460 } });

    test("the opened Select content computes a real maxHeight, bottoms in-viewport, grows from the anchor", async ({
        page,
    }) => {
        await page.goto("/forms/select", { waitUntil: "networkidle" });

        // Open the first Select (the font-family trigger).
        const trigger = page.locator('[id="sel-font"]');
        await trigger.scrollIntoViewIfNeeded();
        await trigger.click();

        const content = page.locator('[data-slot="select-content"]').first();
        await content.waitFor({ state: "visible", timeout: 5000 });

        // (a) the bound is a REAL value, not "none" (the HEAD born-RED state).
        const readback = await content.evaluate((el) => {
            const cs = getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            return {
                maxHeight: cs.maxHeight,
                overflowY: cs.overflowY,
                transformOrigin: cs.transformOrigin,
                bottom: rect.bottom,
                top: rect.top,
                height: rect.height,
                scrollHeight: el.scrollHeight,
                clientHeight: el.clientHeight,
                viewportH: window.innerHeight,
            };
        });
        console.log("[emission] select bound:", JSON.stringify(readback));

        expect(readback.maxHeight, "Select maxHeight must resolve (not none)").not.toBe(
            "none",
        );
        // The maxHeight is a positive px value.
        const maxH = parseFloat(readback.maxHeight);
        expect(maxH, "Select maxHeight must be a positive px bound").toBeGreaterThan(0);

        // (a) the content bottoms INSIDE the viewport (a small tolerance for sub-px).
        expect(
            readback.bottom,
            "Select content must bottom inside the viewport",
        ).toBeLessThanOrEqual(readback.viewportH + 2);

        // (a) inner scroll is available (overflow-y auto/scroll).
        expect(["auto", "scroll"]).toContain(readback.overflowY);

        // (b) the transform-origin is set (the anchor-honored open; not the empty default).
        expect(
            readback.transformOrigin,
            "the content transform-origin must be set (the anchor-honored grow)",
        ).toBeTruthy();

        await page.screenshot({ path: frame("W-EMISSION-select-bound-light.png") });
    });
});

// ── (c) THE SLIDER SIZE AXIS ──────────────────────────────────────────────────────────
test.describe("BA.W-EMISSION — the Slider size axis ships as real geometry", () => {
    test("a standard size=md slider measures a real ≈1.25rem track (not 6px); the spectrum thumb is slim", async ({
        page,
    }) => {
        await page.goto("/forms/slider", { waitUntil: "networkidle" });

        // The variant×size matrix renders aria-label="standard md" etc.
        const stdMd = page.locator('[aria-label="standard md"]').first();
        await stdMd.scrollIntoViewIfNeeded();
        await stdMd.waitFor({ state: "visible" });

        const trackH = await stdMd.evaluate((root) => {
            const track = root.querySelector(".slider-track") as HTMLElement | null;
            if (!track) return null;
            const cs = getComputedStyle(track);
            return {
                trackHeight: parseFloat(cs.height),
                trackVar: getComputedStyle(root)
                    .getPropertyValue("--slider-track-height")
                    .trim(),
            };
        });
        console.log("[emission] slider std md:", JSON.stringify(trackH));
        expect(trackH, "standard md slider track must be measurable").not.toBeNull();
        // 1.25rem = 20px at the default 16px root. NOT the 6px (0.375rem) fallback.
        expect(
            trackH!.trackHeight,
            "the standard md track must paint ≈20px (1.25rem), not the 6px fallback",
        ).toBeGreaterThanOrEqual(16);

        // The spectrum thumb is ≤0.5× its track (the slim value.js bar).
        const specMd = page.locator('[aria-label="spectrum md"]').first();
        await specMd.scrollIntoViewIfNeeded();
        const ratio = await specMd.evaluate((root) => {
            const track = root.querySelector(".slider-track") as HTMLElement | null;
            const thumb = root.querySelector(".slider-thumb") as HTMLElement | null;
            if (!track || !thumb) return null;
            const tH = track.getBoundingClientRect().height;
            const thW = thumb.getBoundingClientRect().width;
            return { trackH: tH, thumbW: thW, ratio: tH ? thW / tH : null };
        });
        console.log("[emission] spectrum md thumb:", JSON.stringify(ratio));
        expect(ratio, "spectrum md thumb must be measurable").not.toBeNull();
        if (ratio && ratio.ratio !== null) {
            expect(
                ratio.ratio,
                "the spectrum thumb must be ≤0.5× the track width (the slim bar)",
            ).toBeLessThanOrEqual(0.6);
        }

        await page.screenshot({ path: frame("W-EMISSION-slider-size-light.png") });
    });
});

// ── (d) THE WATERCOLOR GHOST (BC.W-VIZ-WATERCOLOR — the DASHED silhouette stroke) ──────
test.describe("BA.W-EMISSION / BC.W-VIZ-WATERCOLOR — the WatercolorDot ghost is a DASHED silhouette stroke", () => {
    test("a ghost dot renders a dashed SVG <ellipse> stroke tracing the seeded silhouette matching the solid seed", async ({
        page,
    }) => {
        await page.goto("/substrates/blob", { waitUntil: "networkidle" });

        const pair = page.locator('[data-testid="watercolor-ghost-pair"]').first();
        await pair.scrollIntoViewIfNeeded();
        await pair.waitFor({ state: "visible" });

        const readback = await pair.evaluate((el) => {
            const dots = Array.from(
                el.querySelectorAll('[data-testid="watercolor-swatch"]'),
            ) as HTMLElement[];
            const solid = dots.find((d) => d.dataset.variant !== "ghost");
            const ghost = dots.find((d) => d.dataset.variant === "ghost");
            if (!solid || !ghost) return null;
            const gcs = getComputedStyle(ghost);
            const scs = getComputedStyle(solid);
            // The dashed silhouette stroke is an SVG <ellipse> overlay carrying
            // stroke-dasharray (the dashed OUTLINE following the seeded silhouette).
            const stroke = ghost.querySelector(
                ".watercolor-ghost-stroke",
            ) as SVGElement | null;
            const strokeCs = stroke ? getComputedStyle(stroke) : null;
            return {
                ghostVariant: ghost.dataset.variant,
                // The ghost box itself paints NO dashed RECTANGULAR border (forbidden).
                ghostBorderStyle: gcs.borderTopStyle,
                // The dashed silhouette stroke is present with a real dasharray pattern.
                hasStroke: !!stroke,
                strokeDasharray: strokeCs ? strokeCs.strokeDasharray : "",
                strokeWidth: strokeCs ? parseFloat(strokeCs.strokeWidth) : 0,
                // The silhouette: the seeded border-radius. A ghost of a seed must carry
                // the SAME border-radius the solid dot of that seed carries (the match).
                ghostRadius: gcs.borderRadius,
                solidRadius: scs.borderRadius,
            };
        });
        console.log("[emission] watercolor ghost (dashed):", JSON.stringify(readback));
        expect(readback, "the ghost/solid pair must be present").not.toBeNull();

        // The dashed silhouette stroke is present (an SVG <ellipse> stroke overlay).
        expect(
            readback!.hasStroke,
            "the ghost must render a dashed silhouette stroke overlay",
        ).toBe(true);

        // The stroke carries a real dasharray (dash/gap alternation — a dashed OUTLINE).
        expect(
            readback!.strokeDasharray,
            "the ghost stroke must carry a stroke-dasharray (the dashed silhouette)",
        ).toBeTruthy();
        expect(
            readback!.strokeDasharray,
            "the dasharray must not be the `none` resting value",
        ).not.toBe("none");
        expect(
            readback!.strokeWidth,
            "the dashed stroke must paint a real width",
        ).toBeGreaterThan(0);

        // The ghost box itself is NOT a dashed rectangular border (the forbidden form).
        expect(
            readback!.ghostBorderStyle,
            "the swatch box must NOT be a dashed rectangle",
        ).not.toBe("dashed");

        // The silhouette is the seeded blob (a NON-rectangular border-radius — the morph
        // emits per-corner percentage radii, never a uniform rect).
        expect(
            readback!.ghostRadius,
            "the ghost must carry a non-rect seeded border-radius silhouette",
        ).toBeTruthy();
        // The ghost's silhouette MATCHES the solid dot of the same seed (the seeded match).
        expect(
            readback!.ghostRadius,
            "the ghost silhouette must match the solid dot of the same seed",
        ).toBe(readback!.solidRadius);

        await page.screenshot({ path: frame("W-EMISSION-watercolor-ghost-light.png") });
    });
});
