// AX.W12 — proof:π aurora-mediums-substrate — the OIL-medium visual-neutrality + organic
// -grain π-lane spec (the W12 close criterion, NON-NEGOTIABLE per AX.W00).
//
// W12 extracts the StrokeProfile substrate (the per-mode if-ladder + the four
// hand-unrolled stroke layers → struct StrokeProfile + profileFor + paintStrokeLayers)
// and authors the NET-NEW painterly noise basis (PCG2D integer-bit hash + 2D simplex
// gradient noise). The contract is VISUAL NEUTRALITY on the existing OIL medium: the
// extraction is a structural transposition (the oil bake must read identical-or-better),
// and the new basis must read ORGANIC (no sin()-periodicity banding, no value-noise
// axis-aligned lattice) where the painterly mediums opt in.
//
// READBACK MECHANISM (inherited from AX.W00 substrate-paints-color / aurora-atoms-render):
// a WebGL2 canvas is not reliably readable via ctx.drawImage+getImageData without
// preserveDrawingBuffer; the robust cross-context readback is a COMPOSITED element
// screenshot (locator.screenshot) decoded with pngjs. On a dev box the real GPU
// (darwin→Metal) paints; a GPU-less CI runner SwiftShader-degrades + the driver SKIPs
// befitting-silent. The live aurora defaults to WebGL2 (W07 WEBGPU_PARITY=false).
//
// THE TWO ASSERTIONS (headless-runnable on the real GPU):
//   (1) NEUTRALITY-FLOOR — the oil-medium bake paints a non-black, structured field: the
//       interior maxChannel clears a floor AND the interior has real spatial variance (the
//       strokework is present, not a flat fill). A black/flat oil canvas (a regression from
//       the extraction) REDs.
//   (2) ORGANIC-GRAIN — the oil field carries high-frequency local detail (the canvas
//       tooth + stroke grain), measured as the mean local |neighbour-Δ| over the interior.
//       A degenerate smooth/banded field (the value-noise lattice the new basis lifts) reads
//       LOW; a genuine organic grain reads above the floor.
//
// THE PAIRED-π BEFORE/AFTER + DELTA is the ORCHESTRATOR's binding capture (it has both the
// HEAD tree and the post-W12 tree): bake the oil medium on each, assert the perceptual
// delta is below the neutrality threshold, at ≥3 viewports × light/dark, plus the
// frontend-design organic-grain eye. This spec is the harness that capture rides + the
// headless non-degradation floor; it does NOT (cannot) compare two source trees from one run.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

const INTERIOR_INSET = 0.2; // sample the central 60% box (avoid the edge fade)
const SETTLE_MS = 700; // procedural loop → a settled frame before each read

// The oil bake must paint a structured non-black field: maxChannel clears MIN_MAXCHANNEL
// and the interior spatial variance clears MIN_VARIANCE (a flat fill REDs). The organic
// grain (mean local neighbour-delta) must clear MIN_GRAIN (a banded/smooth field REDs).
const MIN_MAXCHANNEL = 20; // not near-black (W00's loose floor is >0; oil is well above)
const MIN_VARIANCE = 30; // the interior is structured (strokework), not a flat slab
const MIN_GRAIN = 1.5; // high-frequency local detail (the canvas tooth + stroke grain)

// The three π viewports (the W00 protocol; the spec parametrizes the harness — the
// orchestrator's paired capture runs the full ≥3 × light/dark matrix).
const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "tablet", width: 1280, height: 800 },
    { name: "desktop", width: 1440, height: 900 },
] as const;

test.setTimeout(240_000);

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Interior maxChannel + per-channel variance + mean local neighbour-delta (organic grain). */
function interiorStats(png: PNG, inset: number) {
    const w = png.width;
    const h = png.height;
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let maxChannel = 0;
    let sum = 0;
    let sumSq = 0;
    let n = 0;
    let grainSum = 0;
    let grainN = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const r = png.data[i]!;
            const g = png.data[i + 1]!;
            const b = png.data[i + 2]!;
            const lum = (r + g + b) / 3;
            maxChannel = Math.max(maxChannel, r, g, b);
            sum += lum;
            sumSq += lum * lum;
            n++;
            // Local grain — the |Δ| to the right + lower neighbour (high-frequency detail).
            if (x + 1 < x1) {
                const ir = (y * w + (x + 1)) * 4;
                grainSum +=
                    Math.abs(r - png.data[ir]!) +
                    Math.abs(g - png.data[ir + 1]!) +
                    Math.abs(b - png.data[ir + 2]!);
                grainN++;
            }
            if (y + 1 < y1) {
                const id = ((y + 1) * w + x) * 4;
                grainSum +=
                    Math.abs(r - png.data[id]!) +
                    Math.abs(g - png.data[id + 1]!) +
                    Math.abs(b - png.data[id + 2]!);
                grainN++;
            }
        }
    }
    const mean = n === 0 ? 0 : sum / n;
    const variance = n === 0 ? 0 : sumSq / n - mean * mean;
    const grain = grainN === 0 ? 0 : grainSum / grainN;
    return { maxChannel, variance, grain, mean };
}

test.describe("aurora-mediums-substrate (π lane — oil-medium neutrality + organic grain)", () => {
    for (const vp of VIEWPORTS) {
        test(`the OIL medium bakes a structured organic field @ ${vp.name} (${vp.width}×${vp.height})`, async ({
            page,
        }: {
            page: Page;
        }) => {
            await page.setViewportSize({ width: vp.width, height: vp.height });
            await page.goto(PI_TARGETS.aurora.path);

            const canvas = page.locator("canvas.aurora-canvas").first();
            await canvas.waitFor({ state: "visible", timeout: 20_000 });

            const atomsSurface = page.locator("[data-aurora-atoms-surface]");
            await atomsSurface.waitFor({ state: "visible", timeout: 10_000 });

            // Select the OIL medium (the existing medium the substrate change must not
            // regress) via the atoms `medium` control.
            const mediumSelect = page.locator(`[data-atom="medium"] select`);
            await mediumSelect.selectOption("oil");

            await page.waitForTimeout(SETTLE_MS);
            const frame = await grab(canvas);
            const { maxChannel, variance, grain, mean } = interiorStats(
                frame,
                INTERIOR_INSET,
            );

            // (1) NEUTRALITY-FLOOR — the oil bake paints a non-black, structured field.
            expect(
                maxChannel,
                `oil-medium interior near-black (maxChannel ${maxChannel}) — the StrokeProfile extraction regressed the bake to black @ ${vp.name}`,
            ).toBeGreaterThan(MIN_MAXCHANNEL);
            expect(
                variance,
                `oil-medium interior is a FLAT fill (variance ${variance.toFixed(
                    1,
                )}, mean ${mean.toFixed(
                    1,
                )}) — the strokework vanished in the extraction @ ${vp.name}`,
            ).toBeGreaterThan(MIN_VARIANCE);

            // (2) ORGANIC-GRAIN — the field carries high-frequency local detail (the tooth
            // + stroke grain the new basis supplies organically, not a smooth/banded field).
            expect(
                grain,
                `oil-medium grain too smooth (local Δ ${grain.toFixed(
                    2,
                )}) — the field reads flat/banded, not organic paper/pigment @ ${vp.name}`,
            ).toBeGreaterThan(MIN_GRAIN);
        });
    }
});
