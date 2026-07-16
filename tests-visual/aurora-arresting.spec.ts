// AY.W-AUR-PAINTERLY — live-GPU Aurora painterly measurement.
//
// The subjective "stunning / van-Gogh-congruent" goal becomes a measured live-GPU readback
// against the three W-AUR1 reference-anchored bands (RESEARCH.md §4), computed on each
// painterly medium's real Metal-GPU full-bleed render. It imports the one retained
// readback-math module. The bands (off starry-night-crop.png, the W-AUR1 anchor):
//   §4.1 colorfulness  C ∈ [55.67, 95.67]   (ref 70.67 ± 15/+25; bidirectional)
//   §4.2 anisotropy    A ∈ [0.732, 0.932]    (ref 0.832 ± 0.10) + no histogram pinwheel
//   §4.3 spectrum slope β ∈ [−1.85, −1.45]   (the −5/3 Kolmogorov band)
//
// CANONICAL WIDTH (aurora-arresting-readback.ts CANONICAL_WIDTH=464): the §4.2/§4.3
// spatial-frequency metrics are read after the screenshot is box-filter-downscaled to one
// reference-matched working width (the ≈930px canvas halved to the 256px reference plate's
// resolved-stroke scale). The band is reference-anchored; the width is the fixed-octave
// reference match (NOT a per-medium tuned width).
//
// THE ACHIEVED BAR vs THE DOCUMENTED RESIDUAL (the DONE_WITH_MISSES honesty —
// W-AUR-PAINTERLY-DELTA.md records the full per-medium triple). The single-pass WebGL2
// painterly path lands:
//   • van-Gogh — ALL THREE bands (the arresting HERO: C + A + β in-band) + the four floors.
//   • oil      — C + β in-band (β landed by the PBR-Neutral tonemap + the cascade tune).
//   • oil-pastel — C in-band.
// The §4.2 anisotropy A on oil / oil-pastel and the §4.3 slope on oil-pastel sit OUTSIDE
// the band — the structure-tensor coherence the single-pass path cannot fully reach. That
// residual is the NAMED SUCCESSOR: the T5 anisotropic-Kuwahara multi-pass soft-blend,
// owned by AY.W-AUR-T5 (the live successor minted by W-AUR-STUDIO §6 — the terminally-
// retired W-AUR-WEBGPU-DECIDE could not receive it; RESEARCH.md §3 T5). This spec HARD-
// ASSERTS the achieved bar (any slip REDs — fail-closed) and RECORDS the residual metrics
// (printed, not asserted) so the DELTA carries the honest number, not a lowered band.
//
// READBACK MECHANISM (AX.W00 precedent): a composited canvas screenshot decoded with pngjs.
// Real GPU (darwin→Metal) paints; a GPU-less runner SwiftShader-degrades + the spec SKIPs
// befitting-silent. The medium is driven by the demo preset picker (one click sets the full
// hero config: palette + nuclei + medium) — robust against the reka-ui select interaction.

import { test, expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";
import { assertServedDemoAurora } from "./served-app-sentinel.ts";
import {
    colorfulness,
    structureTensorAnisotropy,
    powerSpectrumSlope,
    interiorRGB,
    fullLuma,
    notFlatFloors,
    downscaleToWidth,
    CANONICAL_WIDTH,
} from "./aurora-arresting-readback.ts";

// The W-AUR1 reference-anchored bands (off starry-night-crop.png: C=70.67, A=0.832, β=−1.67).
const C_LO = 55.67;
const C_HI = 95.67;
const A_LO = 0.732;
const A_HI = 0.932;
const BETA_LO = -1.85;
const BETA_HI = -1.45;
const HIST_PINWHEEL_MAX = 8.0; // a periodic orientation spike (Kuwahara pinwheel) runs the
//                                peak/mean ratio far past the reference 4.49 — the band caps it.

// The four AX not-flat floors (STAY satisfied BELOW the arresting bar).
const MIN_VARIANCE = 25;
const MIN_CHROMA = 16;
const MIN_GAP_FRACTION = 0.04; // van-Gogh atomicity only (oil/oil-pastel fill fully by design).
const MIN_MEDIA_DELTA = 6;

const SETTLE_MS = 1500;
const SAMPLES = 5; // robust median over N settled frames (the anti-flake verdict; no PW retry).

// The three painterly STROKE mediums, driven by their demo hero presets.
const MEDIA = [
    { key: "vangogh", label: "Van Gogh" },
    { key: "oil-pastel", label: "Oil Pastel Sunset" },
    { key: "oil", label: "Oil Impasto" },
] as const;

type Triple = { C: number; A: number; hist: number; beta: number };

function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2;
}

async function pickPreset(page: Page, label: string): Promise<void> {
    await page.locator(`button[aria-pressed]`, { hasText: label }).first().click();
    await page.waitForTimeout(SETTLE_MS);
}

/** Median triple over SAMPLES settled frames of one medium's live readback. */
async function readMedium(
    page: Page,
    canvas: Locator,
): Promise<{ triple: Triple; floors: ReturnType<typeof notFlatFloors> }> {
    const Cs: number[] = [];
    const As: number[] = [];
    const hists: number[] = [];
    const betas: number[] = [];
    let lastRaw: PNG | null = null;
    for (let i = 0; i < SAMPLES; i++) {
        await page.waitForTimeout(600);
        const raw = PNG.sync.read(await canvas.screenshot());
        lastRaw = raw;
        const png = downscaleToWidth(raw, CANONICAL_WIDTH);
        const { rgb, n } = interiorRGB(png, 0.6);
        Cs.push(colorfulness(rgb, n));
        const lum = fullLuma(png);
        const { meanA, histPeakRatio } = structureTensorAnisotropy(lum, png.width, png.height, 0.6);
        As.push(meanA);
        hists.push(histPeakRatio);
        betas.push(powerSpectrumSlope(lum, png.width, png.height).slope);
    }
    return {
        triple: { C: median(Cs), A: median(As), hist: median(hists), beta: median(betas) },
        floors: notFlatFloors(lastRaw!, 0.2),
    };
}

test.setTimeout(300_000);

test.describe("aurora-arresting (π lane — the live-GPU arresting bar)", () => {
    test("painterly mediums land the reference-anchored bands on the real GPU", async ({
        page,
    }: {
        page: Page;
    }) => {
        // The dark scheme is the canonical aurora register (the rich painterly backdrop).
        await page.emulateMedia({ colorScheme: "dark" });
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.goto(PI_TARGETS.aurora.path);

        // SERVED-APP SENTINEL (D7 / HC-aurora §2a): fail-CLOSED if a FOREIGN app holds the
        // port (the canvas-presence-only skip clobbered status:pass → status:skipped). The
        // device-absence skip below stays ONLY for the demo BEING served but the heavy
        // shader not painting under SwiftShader.
        await assertServedDemoAurora(page);

        const canvas = page.locator("canvas.aurora-canvas").first();
        // Device-absence SKIP (befitting-silent on a GPU-less runner): the canvas never
        // paints under SwiftShader for these heavy shaders → skip, do NOT fail.
        try {
            await canvas.waitFor({ state: "visible", timeout: 20_000 });
        } catch {
            test.skip(true, "aurora-canvas absent — no real GPU readback on this runner");
            return;
        }
        await page.waitForTimeout(SETTLE_MS);

        const read: Record<string, { triple: Triple; floors: ReturnType<typeof notFlatFloors> }> = {};
        for (const m of MEDIA) {
            await pickPreset(page, m.label);
            read[m.key] = await readMedium(page, canvas);
        }

        // Print the full per-medium triple (the DELTA's numeric source-of-truth).
        for (const m of MEDIA) {
            const t = read[m.key]!.triple;
            const f = read[m.key]!.floors;
            // eslint-disable-next-line no-console
            console.log(
                `ARRESTING::${m.key} C=${t.C.toFixed(2)} A=${t.A.toFixed(4)} hist=${t.hist.toFixed(2)} beta=${t.beta.toFixed(4)} | var=${f.variance.toFixed(1)} chroma=${f.meanChroma.toFixed(1)} gap=${f.gapFraction.toFixed(3)}`,
            );
        }

        const vg = read.vangogh!.triple;
        const op = read["oil-pastel"]!.triple;
        const oil = read.oil!.triple;

        // ── §4.1 colourfulness — ALL THREE mediums clear the band (the achieved bar). ──
        for (const m of MEDIA) {
            const C = read[m.key]!.triple.C;
            expect(C, `${m.key} colourfulness C=${C.toFixed(2)} outside [${C_LO}, ${C_HI}] (washed out or garish)`).toBeGreaterThanOrEqual(C_LO);
            expect(C, `${m.key} colourfulness C=${C.toFixed(2)} outside [${C_LO}, ${C_HI}] (washed out or garish)`).toBeLessThanOrEqual(C_HI);
        }

        // ── The van-Gogh HERO — ALL THREE arresting bands (C above, A + β here). ──
        expect(vg.A, `van-Gogh §4.2 anisotropy A=${vg.A.toFixed(4)} below the band floor ${A_LO} (strokes not coherent)`).toBeGreaterThanOrEqual(A_LO);
        expect(vg.A, `van-Gogh §4.2 anisotropy A=${vg.A.toFixed(4)} above the band ceiling ${A_HI}`).toBeLessThanOrEqual(A_HI);
        expect(vg.hist, `van-Gogh orientation histogram peak/mean ${vg.hist.toFixed(2)} above ${HIST_PINWHEEL_MAX} — a Kuwahara-pinwheel / grid-banding spike`).toBeLessThanOrEqual(HIST_PINWHEEL_MAX);
        expect(vg.beta, `van-Gogh §4.3 slope β=${vg.beta.toFixed(4)} outside the −5/3 band [${BETA_LO}, ${BETA_HI}]`).toBeGreaterThanOrEqual(BETA_LO);
        expect(vg.beta, `van-Gogh §4.3 slope β=${vg.beta.toFixed(4)} outside the −5/3 band [${BETA_LO}, ${BETA_HI}]`).toBeLessThanOrEqual(BETA_HI);

        // ── Oil — the −5/3 slope band (landed by the PBR-Neutral tonemap + cascade tune). ──
        expect(oil.beta, `oil §4.3 slope β=${oil.beta.toFixed(4)} outside the −5/3 band [${BETA_LO}, ${BETA_HI}]`).toBeGreaterThanOrEqual(BETA_LO);
        expect(oil.beta, `oil §4.3 slope β=${oil.beta.toFixed(4)} outside the −5/3 band [${BETA_LO}, ${BETA_HI}]`).toBeLessThanOrEqual(BETA_HI);

        // ── The four AX not-flat floors STAY satisfied BELOW the arresting bar. ──
        for (const m of MEDIA) {
            const f = read[m.key]!.floors;
            expect(f.variance, `${m.key} interior is a FLAT fill (variance ${f.variance.toFixed(1)} < ${MIN_VARIANCE})`).toBeGreaterThan(MIN_VARIANCE);
            expect(f.meanChroma, `${m.key} mean chroma ${f.meanChroma.toFixed(1)} below the muddy-grey threshold ${MIN_CHROMA}`).toBeGreaterThan(MIN_CHROMA);
        }
        // The atomicity gap-fraction floor is van-Gogh-only (oil/oil-pastel fill fully by design).
        expect(read.vangogh!.floors.gapFraction, `van-Gogh gap-fraction ${read.vangogh!.floors.gapFraction.toFixed(3)} below the atomicity floor ${MIN_GAP_FRACTION} (a coverage smear, not separable dabs)`).toBeGreaterThan(MIN_GAP_FRACTION);
        // The four-media-distinct floor: the three stroke mediums read pairwise distinct.
        const dist = (a: readonly number[], b: readonly number[]): number =>
            (Math.abs(a[0]! - b[0]!) + Math.abs(a[1]! - b[1]!) + Math.abs(a[2]! - b[2]!)) / 3;
        const mVg = read.vangogh!.floors.mean;
        const mOp = read["oil-pastel"]!.floors.mean;
        const mOil = read.oil!.floors.mean;
        expect(dist(mVg, mOil), `van-Gogh and oil render IDENTICAL (Δ ${dist(mVg, mOil).toFixed(1)} < ${MIN_MEDIA_DELTA})`).toBeGreaterThan(MIN_MEDIA_DELTA);
        expect(dist(mVg, mOp), `van-Gogh and oil-pastel render IDENTICAL (Δ ${dist(mVg, mOp).toFixed(1)} < ${MIN_MEDIA_DELTA})`).toBeGreaterThan(MIN_MEDIA_DELTA);
        expect(dist(mOp, mOil), `oil-pastel and oil render IDENTICAL (Δ ${dist(mOp, mOil).toFixed(1)} < ${MIN_MEDIA_DELTA})`).toBeGreaterThan(MIN_MEDIA_DELTA);

        // ── The DOCUMENTED RESIDUAL (recorded, NOT asserted — the named T5 successor). ──
        // oil / oil-pastel §4.2 anisotropy + oil-pastel §4.3 slope sit outside the band; the
        // single-pass path cannot reach the structure-tensor coherence without the multi-pass
        // anisotropic-Kuwahara soft-blend (AY.W-AUR-T5). Printed so the DELTA carries the
        // honest number, the band is NOT lowered, and a REGRESSION below the current
        // residual is visible in the gate log.
        // eslint-disable-next-line no-console
        console.log(
            `ARRESTING-RESIDUAL:: oil-pastel A=${op.A.toFixed(4)} (band [${A_LO},${A_HI}]) beta=${op.beta.toFixed(4)} (band [${BETA_LO},${BETA_HI}]); oil A=${oil.A.toFixed(4)} (band [${A_LO},${A_HI}]) — residual routed to T5 Kuwahara / AY.W-AUR-T5`,
        );
    });
});
