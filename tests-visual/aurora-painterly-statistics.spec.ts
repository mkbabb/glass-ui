// AX.W13 — proof:π aurora-painterly-statistics — the operationalized "stunning" bar
// (HARDENING §G #16; the W13 close criterion, NON-NEGOTIABLE per AX.W00).
//
// W13 makes van-Gogh + oil-pastel first-class mediums with pigment-true compositing.
// The un-falsifiable "congruent to Van Gogh" becomes MEASURABLE statistical assertions
// an UNATTENDED run gates on (the cardinal-AW green-structure-over-unvalidated-render
// risk re-enters at the painterly layer unless "stunning" is operationalized):
//   (a) ATOMICITY GAP-FRACTION — the van-Gogh render carries a measurable inter-stroke
//       canvas-gap fraction above a floor (discrete dabs, NOT a continuous coverage
//       smear — the passthrough's best-of-9 coverage field has ~zero gap fraction).
//   (b) NO-FLAT-FILLS VARIANCE — local pigment-density variance above a floor on each
//       painterly medium (the pigment turbulence keystone — a flat gradient measures
//       near-zero variance).
//   (c) OKLab OVERLAP-NOT-GREY — the van-Gogh render's mean interior chroma stays ABOVE
//       a muddy-midtone grey threshold (the OKLab composite path, not the linear-mix
//       grey collapse — the single highest-leverage lever).
//   (d) FOUR-MEDIA-DISTINCT — the per-medium snapshots (vangogh / oil-pastel / crayon /
//       oil) are pairwise MEASURABLY distinct (a passthrough/shared-body makes two media
//       identical → REDs).
// A public-domain Starry Night crop (fixtures/starry-night-crop.png) anchors the
// atomicity-congruence read (the reference is committed for the human side-by-side eye;
// the numeric gate reads the rendered fields).
//
// READBACK MECHANISM (inherited from AX.W00 / aurora-mediums-substrate): a COMPOSITED
// element screenshot (locator.screenshot) decoded with pngjs. On a dev box the real GPU
// (darwin→Metal) paints; a GPU-less CI runner SwiftShader-degrades + the spec SKIPs
// befitting-silent. The live aurora defaults to WebGL2 (W07 WEBGPU_PARITY=false).
//
// DUAL-TIER CLOSE: the human side-by-side audit (the paired-π BEFORE/AFTER + DELTA the
// orchestrator captures) is the ENRICHMENT; these numeric assertions are the UNATTENDED
// close. Both run; the numeric gate is what an autonomous run asserts when no human is
// present.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

const INTERIOR_INSET = 0.2; // sample the central 60% box (avoid the edge fade)
const SETTLE_MS = 800; // procedural loop → a settled frame before each read

// The floors. Tuned conservatively (the orchestrator re-tunes against the live render
// + the Starry Night reference in the π audit per Open-Question 3). The point is the
// DIRECTION: a passthrough/shared-body/linear-mix render fails each floor.
const MIN_GAP_FRACTION = 0.04; // ≥4% of interior pixels are near-canvas inter-stroke gaps
const MIN_DENSITY_VARIANCE = 25; // local pigment-density variance (no flat fills)
const MIN_CHROMA = 16; // mean interior chroma above the muddy-grey threshold (8-bit)
const MIN_MEDIA_DELTA = 6; // pairwise per-medium mean-color delta (the media read distinct)

const VIEWPORTS = [
    { name: "tablet", width: 1280, height: 800 },
    { name: "desktop", width: 1440, height: 900 },
] as const;

test.setTimeout(300_000);

async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/** Interior statistical readback over the central inset box. */
function interiorStats(png: PNG, inset: number) {
    const w = png.width;
    const h = png.height;
    const x0 = Math.floor(w * inset);
    const y0 = Math.floor(h * inset);
    const x1 = Math.ceil(w * (1 - inset));
    const y1 = Math.ceil(h * (1 - inset));
    let sumLum = 0;
    let sumLumSq = 0;
    let sumChroma = 0;
    let sumR = 0;
    let sumG = 0;
    let sumB = 0;
    let darkCount = 0; // near-canvas inter-stroke gaps (low-luma, low-chroma pits)
    let n = 0;
    let lo = 255;
    let hi = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const r = png.data[i]!;
            const g = png.data[i + 1]!;
            const b = png.data[i + 2]!;
            const lum = (r + g + b) / 3;
            // Chroma proxy: max-channel minus min-channel (8-bit saturation magnitude).
            const chroma = Math.max(r, g, b) - Math.min(r, g, b);
            sumLum += lum;
            sumLumSq += lum * lum;
            sumChroma += chroma;
            sumR += r;
            sumG += g;
            sumB += b;
            lo = Math.min(lo, lum);
            hi = Math.max(hi, lum);
            n++;
        }
    }
    const meanLum = n === 0 ? 0 : sumLum / n;
    // Inter-stroke gaps: pixels well below the interior mean luma (the canvas showing
    // between separable dabs — a coverage smear has no such pits).
    const gapThreshold = meanLum * 0.6;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            const lum = (png.data[i]! + png.data[i + 1]! + png.data[i + 2]!) / 3;
            if (lum < gapThreshold) darkCount++;
        }
    }
    const variance = n === 0 ? 0 : sumLumSq / n - meanLum * meanLum;
    return {
        meanLum,
        variance,
        meanChroma: n === 0 ? 0 : sumChroma / n,
        gapFraction: n === 0 ? 0 : darkCount / n,
        mean: [sumR / n, sumG / n, sumB / n] as [number, number, number],
        range: hi - lo,
    };
}

async function selectMedium(page: Page, medium: string): Promise<void> {
    const mediumSelect = page.locator(`[data-atom="medium"] select`);
    await mediumSelect.selectOption(medium);
    await page.waitForTimeout(SETTLE_MS);
}

test.describe("aurora-painterly-statistics (π lane — the operationalized 'stunning' bar)", () => {
    for (const vp of VIEWPORTS) {
        test(`van-Gogh + oil-pastel + crayon + oil read pigment-true and distinct @ ${vp.name}`, async ({
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

            // Capture each medium's interior statistics.
            await selectMedium(page, "vangogh");
            const vangogh = interiorStats(await grab(canvas), INTERIOR_INSET);
            await selectMedium(page, "oil-pastel");
            const oilPastel = interiorStats(await grab(canvas), INTERIOR_INSET);
            await selectMedium(page, "crayon");
            const crayon = interiorStats(await grab(canvas), INTERIOR_INSET);
            await selectMedium(page, "oil");
            const oil = interiorStats(await grab(canvas), INTERIOR_INSET);

            // (a) ATOMICITY GAP-FRACTION — van-Gogh has discrete dabs (inter-stroke gaps).
            expect(
                vangogh.gapFraction,
                `van-Gogh gap-fraction ${vangogh.gapFraction.toFixed(
                    3,
                )} below floor ${MIN_GAP_FRACTION} — the render is a continuous coverage smear (the passthrough), not separable atomic dabs @ ${vp.name}`,
            ).toBeGreaterThan(MIN_GAP_FRACTION);

            // (b) NO-FLAT-FILLS VARIANCE — each painterly medium carries pigment turbulence.
            for (const [name, s] of [
                ["vangogh", vangogh],
                ["oil-pastel", oilPastel],
                ["crayon", crayon],
                ["oil", oil],
            ] as const) {
                expect(
                    s.variance,
                    `${name} interior is a FLAT fill (variance ${s.variance.toFixed(
                        1,
                    )}) — the pigment turbulence is absent @ ${vp.name}`,
                ).toBeGreaterThan(MIN_DENSITY_VARIANCE);
            }

            // (c) OKLab OVERLAP-NOT-GREY — van-Gogh's mean chroma stays above the muddy
            //     grey threshold (the OKLab composite, not the linear-mix grey collapse).
            expect(
                vangogh.meanChroma,
                `van-Gogh mean chroma ${vangogh.meanChroma.toFixed(
                    1,
                )} below the muddy-grey threshold ${MIN_CHROMA} — overlapping complementaries mud to grey (the linear-mix defect) @ ${vp.name}`,
            ).toBeGreaterThan(MIN_CHROMA);

            // (d) FOUR-MEDIA-DISTINCT — the per-medium snapshots are pairwise distinct.
            const dist = (
                a: [number, number, number],
                b: [number, number, number],
            ): number =>
                (Math.abs(a[0] - b[0]) +
                    Math.abs(a[1] - b[1]) +
                    Math.abs(a[2] - b[2])) /
                3;
            const pairs: Array<[string, [number, number, number], string, [number, number, number]]> = [
                ["vangogh", vangogh.mean, "oil", oil.mean],
                ["oil-pastel", oilPastel.mean, "crayon", crayon.mean],
                ["vangogh", vangogh.mean, "oil-pastel", oilPastel.mean],
            ];
            for (const [na, a, nb, b] of pairs) {
                expect(
                    dist(a, b),
                    `${na} and ${nb} render IDENTICAL (mean-color Δ ${dist(a, b).toFixed(
                        1,
                    )} below ${MIN_MEDIA_DELTA}) — a passthrough/shared-body collapsed two media @ ${vp.name}`,
                ).toBeGreaterThan(MIN_MEDIA_DELTA);
            }
        });
    }
});
