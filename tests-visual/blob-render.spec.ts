// AX.W08 — proof:blob-render, the blob's CLOSING rendered-pixel gate.
//
// The structural antidote to the proof:blob-smin-normalized green-while-broken
// trap (the canonical AW false-green): that static gate grep'd the EXACT
// fudge-deletion that shipped the flood + ran a pure-math k-sweep in isolation —
// it renders ZERO pixels, so a canvas-filling slab passes it. This spec mounts the
// REAL <GooBlob> with BLOB_CONFIG_DEFAULTS on a real device, reads back the painted
// canvas, and asserts the SMIN UN-FLOOD the static gate is blind to.
//
// WHAT W08 OWNS vs W15 (the disjointness boundary — wave spec §"NOT in scope"):
//   W08 UN-FLOODS the smin OVER-MERGE — the slab where `min(a,b) − k` drove the
//   composite SDF negative across the WHOLE canvas (alpha = 1 everywhere). The
//   un-flood is proven by THREE deltas: (1) the painted interior drops out of the
//   flood band into a CONTAINED field, (2) a strong centre-vs-corner luma gradient
//   appears (a FIELD, not a flat slab), and (3) a transparent margin opens on the
//   left/right (the slab touched all four edges). The FOOTPRINT containment on ALL
//   four sides — shrinking the body/orbit/satellite radii so the droplet clears the
//   top/bottom too — is W15's geometry job (the radii W08 explicitly leaves alone;
//   W15 dependsOn W08 and RE-POINTS this gate's thresholds to the footprint-fit
//   band). So W08 asserts the slab→field un-flood; it does NOT demand the tight
//   four-side footprint margin that is W15's to deliver.
//
// READBACK MECHANISM (inherited from AX.W00 — the orchestrator real-device fix). A
// WebGL2 canvas is NOT reliably readable via `ctx.drawImage(canvas) + getImageData`:
// without `preserveDrawingBuffer:true` the drawing buffer reads EMPTY post-composite
// (the blob read 0.000 that way), and a raw readback GPU-stalls on software GL. The
// robust cross-context readback is a COMPOSITED element screenshot
// (`locator.screenshot()`) decoded with pngjs — it captures exactly the displayed
// pixels regardless of the GL context's preserveDrawingBuffer.
//
// CLIP-ROBUST BACKGROUND + REGIONS (the W08 measurement fix). The goo-blob story
// mounts each <GooBlob> in a `rounded-card overflow-hidden` cell, so the canvas
// SCREENSHOT's literal CORNER pixels fall outside the rounded clip and read DARK —
// a naive 4-corner-average background (W00's loose floor) is corrupted by them and
// reports a false flood. W08 estimates the background as the MODAL (most-common,
// 16-step-quantized) colour, which is the cream field for a contained droplet, and
// measures coverage over an INTERIOR INSET box (the rounded-corner band excluded).
// This separates a contained droplet from a flood cleanly on the real device:
//   contained droplet → interior coverage ≈ 0.22, modal bg BRIGHT, gradient ≫ 0
//   flood (the slab)  → interior coverage ≈ 0.74, NO gradient (alpha = 1)
//
// keyframes I-1/I-2 instrument design: the SCENE is re-sourced from the manifest
// (pi-manifest.ts, never a hand path), and each readback is sampled over N frames
// with a robust anti-flake MEDIAN-of-runs verdict (a single flaky frame cannot flip
// it). The blob breathes/orbits, so coverage oscillates — the verdict reads the PEAK
// per run (the most-filled frame, which must STILL be a contained field).

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

// ── tunables (the W08 un-flood band — clip-robust interior-inset metrics) ─────────
const INTERIOR_INSET = 0.12; // exclude the outer rounded-corner band from coverage
const COVERAGE_MIN = 0.1; // a contained field paints SOMETHING (not blank); droplet ≈ 0.22
const COVERAGE_MAX = 0.55; // NOT the slab (the flood reads ≈ 0.74 interior); the un-flood ceil
const GRADIENT_MIN_DELTA = 25; // centre-vs-corner |Δluma| floor (a FIELD, not a flat slab)
const SIDE_MARGIN_MAX_FRAC = 0.2; // the un-flood opens a transparent L/R margin (slab = 1.0)
const EDGE_RING_W = 2; // the literal-edge ring width (px) sampled for the L/R margin
const EDGE_SPAN_INSET = 0.25; // sample the MIDDLE 50% of an edge (skip the rounded corners)
const BLOB_FRAMES = 6; // read back N frames; the verdict is the PEAK coverage
const ANTI_FLAKE_RUNS = 3; // 3-run median verdict (anti-flake)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| over the modal bg = "painted"

test.setTimeout(180_000);

/** Median of a numeric array (the robust anti-flake verdict). */
function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/** Composited element screenshot → decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/**
 * The MODAL background RGB — the most-common 16-step-quantized colour over the whole
 * canvas. For a contained droplet that is the cream field; UNLIKE a 4-corner average
 * it is immune to the rounded-card clip's dark corner pixels (which corrupt W00's
 * loose corner-average into a false flood reading on this story's clipped cells).
 */
function modalBackground(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const key = ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
        counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    let best = 0;
    let bestKey = 0;
    for (const [k, c] of counts) {
        if (c > best) {
            best = c;
            bestKey = k;
        }
    }
    return [
        ((bestKey >> 8) & 15) * 16 + 8,
        ((bestKey >> 4) & 15) * 16 + 8,
        (bestKey & 15) * 16 + 8,
    ];
}

/** |ΔR|+|ΔG|+|ΔB| of a pixel vs the background. */
function diffFromBg(data: Buffer, i: number, bg: [number, number, number]): number {
    return (
        Math.abs(data[i]! - bg[0]) +
        Math.abs(data[i + 1]! - bg[1]) +
        Math.abs(data[i + 2]! - bg[2])
    );
}

/**
 * Interior coverage = fraction of INTERIOR-INSET pixels differing from the modal
 * background (painted). The inset excludes the rounded-corner band; the modal bg is
 * clip-robust. A contained droplet paints a bounded interior region; a flood fills
 * it (the slab); a blank paints nothing.
 */
function interiorCoverage(png: PNG, bg: [number, number, number], threshold: number): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let differ = 0;
    let total = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            total++;
            if (diffFromBg(data, (y * w + x) * 4, bg) > threshold) differ++;
        }
    }
    return total === 0 ? 0 : differ / total;
}

/** Mean luma over a centred box of half-side `half` px. */
function lumaBox(png: PNG, cx: number, cy: number, half: number): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.max(0, Math.floor(cx - half));
    const x1 = Math.min(w, Math.ceil(cx + half));
    const y0 = Math.max(0, Math.floor(cy - half));
    const y1 = Math.min(h, Math.ceil(cy + half));
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            sum += 0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!;
            n++;
        }
    }
    return n === 0 ? 0 : sum / n;
}

/**
 * Centre-vs-interior-corner luma delta — a FIELD has a bright/dark centre falling to
 * the cream background at the interior corner; a flat slab is the same luma
 * everywhere (delta → 0). The interior corner sits inside the rounded-card clip.
 */
function centreVsCornerDelta(png: PNG): number {
    const { width: w, height: h } = png;
    const half = Math.max(2, Math.floor(Math.min(w, h) * 0.06));
    const ix = Math.floor(w * INTERIOR_INSET) + half + 2;
    const iy = Math.floor(h * INTERIOR_INSET) + half + 2;
    const centre = lumaBox(png, w / 2, h / 2, half);
    const corner = lumaBox(png, ix, iy, half);
    return Math.abs(centre - corner);
}

/**
 * Left/right transparent-margin fraction — the un-flood opens a margin on the L/R
 * (the slab touched all four edges). Sampled on the literal-edge 2px rings over the
 * MIDDLE 50% of the edge (skipping the rounded corners). Returns the WORSE (max) of
 * left/right. NB: the TOP/BOTTOM margin is NOT asserted here — the default body/orbit
 * radii make the droplet taller than the box clears, which is W15's FOOTPRINT job
 * (W15 dependsOn W08 + re-points this gate to the four-side footprint-fit band).
 */
function worstSideMargin(png: PNG, bg: [number, number, number], threshold: number): number {
    const { width: w, height: h, data } = png;
    const y0 = Math.floor(h * EDGE_SPAN_INSET);
    const y1 = Math.ceil(h * (1 - EDGE_SPAN_INSET));
    const ringFrac = (xs: () => Iterable<[number, number]>): number => {
        let total = 0;
        let differ = 0;
        for (const [x, y] of xs()) {
            total++;
            if (diffFromBg(data, (y * w + x) * 4, bg) > threshold) differ++;
        }
        return total === 0 ? 0 : differ / total;
    };
    const left = ringFrac(function* () {
        for (let x = 0; x < EDGE_RING_W; x++) for (let y = y0; y < y1; y++) yield [x, y];
    });
    const right = ringFrac(function* () {
        for (let x = w - EDGE_RING_W; x < w; x++) for (let y = y0; y < y1; y++) yield [x, y];
    });
    return Math.max(left, right);
}

test.describe("blob-render (π lane — fail-CLOSED, the blob's CLOSING gate)", () => {
    test("blob UN-FLOODS to a contained metaball field on BLOB_CONFIG_DEFAULTS (interior band + gradient + side margin)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        // The goo-blob story mounts SEVERAL <GooBlob> instances; the first is the
        // BLOB_CONFIG_DEFAULTS (quadratic, idle-mood) render — the gate target.
        const blobCanvas = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });
        // Let the demand-driven loop settle into the resting droplet pose.
        await page.waitForTimeout(600);

        // Per run: read N frames, take the PEAK-coverage frame as the run's witness
        // (the droplet breathes/orbits — the peak is the most-filled frame, which must
        // STILL be a contained field). The verdict over runs is the median of each.
        const coverages: number[] = [];
        const gradients: number[] = [];
        const margins: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let peakCov = 0;
            let peakGrad = 0;
            let peakMargin = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const png = await grab(blobCanvas);
                const bg = modalBackground(png);
                const cov = interiorCoverage(png, bg, COLOR_DIFF_THRESHOLD);
                if (cov > peakCov) {
                    peakCov = cov;
                    peakGrad = centreVsCornerDelta(png);
                    peakMargin = worstSideMargin(png, bg, COLOR_DIFF_THRESHOLD);
                }
                await page.waitForTimeout(80);
            }
            coverages.push(peakCov);
            gradients.push(peakGrad);
            margins.push(peakMargin);
        }
        const coverage = median(coverages);
        const gradient = median(gradients);
        const sideMargin = median(margins);

        // 1. UN-FLOOD — the interior is a CONTAINED field, NOT the canvas-filling slab.
        expect(
            coverage,
            `blob interior coverage ${coverage.toFixed(3)} is below the non-blank floor ${COVERAGE_MIN} — the blob did not paint (blank canvas)`,
        ).toBeGreaterThanOrEqual(COVERAGE_MIN);
        expect(
            coverage,
            `blob interior coverage ${coverage.toFixed(3)} exceeds the un-flood ceil ${COVERAGE_MAX} — the blob FLOODED (the smin over-merge slab; the flood reads ≈ 0.74 interior). This is the born-RED witness the static proof:blob-smin-normalized is blind to.`,
        ).toBeLessThanOrEqual(COVERAGE_MAX);

        // 2. FIELD-NOT-SLAB — a strong centre-vs-corner luma gradient (the flood is
        // alpha = 1 everywhere = no gradient).
        expect(
            gradient,
            `blob centre-vs-corner luma delta ${gradient.toFixed(1)} is below the field floor ${GRADIENT_MIN_DELTA} — the canvas reads as a FLAT slab (alpha = 1 everywhere), not a metaball field`,
        ).toBeGreaterThanOrEqual(GRADIENT_MIN_DELTA);

        // 3. SIDE MARGIN — the un-flood opens a transparent margin on the L/R (the slab
        // touched all four edges). The four-side footprint margin is W15's geometry job.
        expect(
            sideMargin,
            `blob worst L/R side-margin fraction ${sideMargin.toFixed(3)} exceeds the ceil ${SIDE_MARGIN_MAX_FRAC} — the droplet still hard-clips the left/right border (the flood signature; the un-flood must open an L/R margin)`,
        ).toBeLessThanOrEqual(SIDE_MARGIN_MAX_FRAC);
    });
});
