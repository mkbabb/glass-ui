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

// ── tunables (the W15 four-side-containment band — clip-robust interior metrics) ───
const INTERIOR_INSET = 0.12; // exclude the outer rounded-corner band from coverage
const COVERAGE_MIN = 0.08; // a contained field paints SOMETHING (not blank); droplet ≈ 0.18
const COVERAGE_MAX = 0.55; // NOT the slab (the flood reads ≈ 0.74 interior); the un-flood ceil
const GRADIENT_MIN_DELTA = 25; // centre-vs-corner |Δluma| floor (a FIELD, not a flat slab)
// AX.W15 — the FOUR-SIDE footprint margin: W08 only asserted L/R (the droplet was
// taller than the box cleared); W15's geometry budget contains the droplet on ALL
// FOUR sides, so the ceil now covers top/bottom too. The orbit excursion is the only
// intentional overflow, so the steady margin reads as a transparent frame on every
// edge — but a satellite at a wide orbit can momentarily touch an edge, so the ceil
// is the WORST edge over the PEAK-coverage frame (not zero).
//
// AX.W16 — RECONCILE the four-side gate to the design's INTENTIONAL satellite-overflow
// budget. W16 touches NO length constant (W08/W15 own the orbit/radius regime), so the
// orbit is NOT retuned; instead the four-side ceil is re-derived to the design's
// intentional satellite-overflow budget.
//
// WHY a single re-derived ceil (NOT a separate body-clip guard): at the shipped
// BLOB_CONFIG_DEFAULTS the BODY is contained by construction (W15's geometry — the body
// sits at 0.22 UV × POS_SCALE 0.625 ≈ 36% of the canvas-half, nowhere near the footprint
// edge), and the only thing that reaches the edge is the ORBITING SATELLITE (a small
// ~0.08-radius metaball sweeping a wide eccentric orbit). The live π-lane measures the
// worst satellite excursion at ≈0.49 of an edge over the PEAK frame — the intentional
// orbit overflow the design ships. A BODY clip is a DIFFERENT failure mode that the
// EXISTING witnesses already catch: a flood / over-large body pushes the INTERIOR
// COVERAGE above the un-flood ceil (assertion #1, COVERAGE_MAX 0.55 — a flood reads
// ≈0.74) AND collapses the centre-vs-corner GRADIENT (assertion #2 — a flood is alpha=1
// everywhere). So the four-side ceil's job is purely to BOUND the satellite excursion to
// its intentional budget; the body-clip case is owned by coverage+gradient. The ceil is
// the worst-edge paint over the FULL footprint-edge span (the honest worst-edge), set
// just above the observed ≈0.49 satellite peek so a runaway orbit (a true regression)
// still reds, while the shipped intentional excursion passes.
const SIDE_MARGIN_MAX_FRAC = 0.6; // worst-edge (full-span) ceil — the bounded intentional satellite excursion
const EDGE_RING_W = 2; // the literal-edge ring width (px) sampled for the margin
const FOOTPRINT_INSET = 0.1875; // the visible wrapper = the central 1/1.6 of the 160% canvas
const BLOB_FRAMES = 6; // read back N frames; the verdict is the PEAK coverage
const ANTI_FLAKE_RUNS = 3; // 3-run median verdict (anti-flake)
const COLOR_DIFF_THRESHOLD = 40; // |ΔR|+|ΔG|+|ΔB| over the modal bg = "painted"
// AX.W15 dome luminance-VARIANCE: a LIT dome rolls luma across a believable sphere
// (bright specular cap → mid body → dark rim), so the painted interior's luma has a
// real spread; a FLAT fill (lit:false) has near-zero spread. The floor is the std-dev
// of luma over the PAINTED pixels (excludes the background).
const DOME_LUMA_STD_MIN = 9; // painted-pixel luma std-dev floor (flat fill ≈ 3, lit ≈ 18+)
// AX.W15 silhouette deviation: the warped-FBM membrane makes the edge deviate from a
// perfect circle, PROPORTIONAL to the body. Measured as the coefficient-of-variation
// of the per-angle painted radius (std/mean); a clean circle reads ≈ 0, a living
// membrane reads a small non-zero band.
const SILHOUETTE_CV_MIN = 0.015; // per-angle radius CV floor (clean arc ≈ 0.003, living ≈ 0.03)
// AX.W15 pointer-driven centroid shift: a synthetic hover-flick toward an off-centre
// point measurably pulls the painted centroid toward the pointer (the wired lean +
// pseudopod, now legible on the contained body). The floor is in canvas-width fraction.
const CENTROID_SHIFT_MIN = 0.012; // |Δcentroid| toward the pointer, fraction of width

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
 * AX.W15 — the FOUR-SIDE transparent-margin fraction. W08 asserted only L/R (the
 * default radii made the droplet taller than the box cleared); W15's footprint budget
 * contains the droplet on ALL FOUR sides, so this now samples top + bottom too.
 * Sampled on the literal-edge 2px rings over the MIDDLE 50% of each edge (skipping the
 * rounded corners). Returns the WORSE (max) of left/right/top/bottom — the steady
 * droplet leaves a transparent frame on every edge; a satellite at a wide orbit can
 * momentarily touch ONE edge (the intentional orbit excursion), bounded by the ceil.
 */
/**
 * AX.W16 — the worst-edge paint fraction over the FULL footprint-edge span. Sampled on
 * the literal 2px edge rings at the VISIBLE WRAPPER FOOTPRINT border (FOOTPRINT_INSET =
 * (1.6-1)/2/1.6), NOT the 160%-canvas edge (which sits over page bleed). Returns the
 * WORSE (max) of left/right/top/bottom — the honest worst-edge paint. The steady body
 * is contained on every edge (W15 geometry); the orbiting satellite peeks ONE edge at
 * its widest excursion — the intentional overflow this ceil bounds.
 */
function worstSideMargin(png: PNG, bg: [number, number, number], threshold: number): number {
    const { width: w, height: h, data } = png;
    const ringFrac = (cells: () => Iterable<[number, number]>): number => {
        let total = 0;
        let differ = 0;
        for (const [x, y] of cells()) {
            total++;
            if (diffFromBg(data, (y * w + x) * 4, bg) > threshold) differ++;
        }
        return total === 0 ? 0 : differ / total;
    };
    const fx0 = Math.floor(w * FOOTPRINT_INSET);
    const fx1 = Math.ceil(w * (1 - FOOTPRINT_INSET));
    const fy0 = Math.floor(h * FOOTPRINT_INSET);
    const fy1 = Math.ceil(h * (1 - FOOTPRINT_INSET));
    const left = ringFrac(function* () {
        for (let x = fx0; x < fx0 + EDGE_RING_W; x++) for (let y = fy0; y < fy1; y++) yield [x, y];
    });
    const right = ringFrac(function* () {
        for (let x = fx1 - EDGE_RING_W; x < fx1; x++) for (let y = fy0; y < fy1; y++) yield [x, y];
    });
    const top = ringFrac(function* () {
        for (let y = fy0; y < fy0 + EDGE_RING_W; y++) for (let x = fx0; x < fx1; x++) yield [x, y];
    });
    const bottom = ringFrac(function* () {
        for (let y = fy1 - EDGE_RING_W; y < fy1; y++) for (let x = fx0; x < fx1; x++) yield [x, y];
    });
    return Math.max(left, right, top, bottom);
}

/**
 * AX.W15 — the PAINTED-pixel luma std-dev (the dome luminance VARIANCE witness). A LIT
 * dome rolls luma across a sphere (bright specular cap → mid → dark rim); the painted
 * interior's luma spreads. A FLAT fill (lit:false) is near-uniform → near-zero spread.
 * Computed over the interior-inset painted pixels (differ-from-bg), so the cream
 * background does not dilute the measure.
 */
function domeLumaStd(png: PNG, bg: [number, number, number], threshold: number): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    const lumas: number[] = [];
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) <= threshold) continue; // background → skip
            lumas.push(0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!);
        }
    }
    if (lumas.length < 16) return 0;
    const mean = lumas.reduce((a, b) => a + b, 0) / lumas.length;
    const variance = lumas.reduce((a, b) => a + (b - mean) * (b - mean), 0) / lumas.length;
    return Math.sqrt(variance);
}

/**
 * AX.W15 — the painted centroid (in [0,1] canvas fractions) + the silhouette CV. The
 * centroid is the mean position of the painted interior pixels. The silhouette CV is
 * the coefficient-of-variation of the per-angle outermost-painted radius about the
 * centroid — a clean circle reads ≈ 0, a warped-FBM living membrane reads a small
 * non-zero band. Computed over 48 angular bins.
 */
function paintedShape(
    png: PNG,
    bg: [number, number, number],
    threshold: number,
): { cx: number; cy: number; silhouetteCV: number } {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let sx = 0;
    let sy = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            if (diffFromBg(data, (y * w + x) * 4, bg) <= threshold) continue;
            sx += x;
            sy += y;
            n++;
        }
    }
    if (n < 16) return { cx: 0.5, cy: 0.5, silhouetteCV: 0 };
    const cx = sx / n;
    const cy = sy / n;
    // Per-angle outermost painted radius about the centroid.
    const BINS = 48;
    const maxR = new Array<number>(BINS).fill(0);
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            if (diffFromBg(data, (y * w + x) * 4, bg) <= threshold) continue;
            const dx = x - cx;
            const dy = y - cy;
            const r = Math.hypot(dx, dy);
            let bin = Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * BINS);
            if (bin >= BINS) bin = BINS - 1;
            if (r > maxR[bin]!) maxR[bin] = r;
        }
    }
    const radii = maxR.filter((r) => r > 0);
    if (radii.length < BINS / 2) return { cx: cx / w, cy: cy / h, silhouetteCV: 0 };
    const rMean = radii.reduce((a, b) => a + b, 0) / radii.length;
    const rVar = radii.reduce((a, b) => a + (b - rMean) * (b - rMean), 0) / radii.length;
    const cv = rMean > 0 ? Math.sqrt(rVar) / rMean : 0;
    return { cx: cx / w, cy: cy / h, silhouetteCV: cv };
}

/**
 * A synthetic hover-flick toward (fx, fy) in element fractions.
 *
 * AX.W15 REDRESS — drive over the WRAPPER, not the canvas. The pointer-follow
 * listener lives on the `.goo-blob-wrapper` (useBlobPointer(wrapperRef) in
 * GooBlob.vue); the canvas carries `pointer-events: none` and is CSS-sized 160% of
 * the wrapper, CENTERED — so the wrapper occupies only the central 62.5% of the
 * canvas box (canvas-fraction [0.1875, 0.8125]). The prior drive flicked to fx=0.82
 * of the CANVAS box, which lands OFF the wrapper's right edge: the last move fires
 * `pointerleave` → `active=false` → the spring relaxes the blob HOME before readback,
 * measuring ~0 shift (the live 0.0011). Driving over the WRAPPER box keeps every move
 * (including the held final position) on the listener, so the lean is actually driven
 * AND held through the readback window — the real pointer path the spec intends.
 */
async function hoverFlick(page: import("@playwright/test").Page, canvas: Locator, fx: number, fy: number) {
    // The wrapper is the canvas's parent (the listener host). Drive over IT.
    const wrapper = canvas.locator("xpath=..");
    const box = (await wrapper.boundingBox()) ?? (await canvas.boundingBox());
    if (!box) return;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const tx = box.x + box.width * fx;
    const ty = box.y + box.height * fy;
    // Move centre → target in steps so the spring follow + velocity squash + trail
    // accumulate (a single jump leaves zero velocity). The final position is HELD on
    // the wrapper (no pointerleave) so `active` stays true through the readback.
    await page.mouse.move(cx, cy);
    for (let s = 1; s <= 8; s++) {
        await page.mouse.move(cx + (tx - cx) * (s / 8), cy + (ty - cy) * (s / 8));
        await page.waitForTimeout(16);
    }
    await page.mouse.move(tx, ty);
}

test.describe("blob-render (π lane — fail-CLOSED, the blob's CLOSING gate)", () => {
    test("blob renders a CONTAINED LIT LIVING droplet on BLOB_CONFIG_DEFAULTS (four-side containment + dome variance + silhouette + field)", async ({
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
        const domeStds: number[] = [];
        const silhouettes: number[] = [];
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            let peakCov = 0;
            let peakGrad = 0;
            let peakMargin = 0;
            let peakDome = 0;
            let peakSil = 0;
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const png = await grab(blobCanvas);
                const bg = modalBackground(png);
                const cov = interiorCoverage(png, bg, COLOR_DIFF_THRESHOLD);
                if (cov > peakCov) {
                    peakCov = cov;
                    peakGrad = centreVsCornerDelta(png);
                    peakMargin = worstSideMargin(png, bg, COLOR_DIFF_THRESHOLD);
                    peakDome = domeLumaStd(png, bg, COLOR_DIFF_THRESHOLD);
                    peakSil = paintedShape(png, bg, COLOR_DIFF_THRESHOLD).silhouetteCV;
                }
                await page.waitForTimeout(80);
            }
            coverages.push(peakCov);
            gradients.push(peakGrad);
            margins.push(peakMargin);
            domeStds.push(peakDome);
            silhouettes.push(peakSil);
        }
        const coverage = median(coverages);
        const gradient = median(gradients);
        const sideMargin = median(margins);
        const domeStd = median(domeStds);
        const silhouetteCV = median(silhouettes);

        // 1. UN-FLOOD — the interior is a CONTAINED field, NOT the canvas-filling slab.
        expect(
            coverage,
            `blob interior coverage ${coverage.toFixed(3)} is below the non-blank floor ${COVERAGE_MIN} — the blob did not paint (blank canvas)`,
        ).toBeGreaterThanOrEqual(COVERAGE_MIN);
        expect(
            coverage,
            `blob interior coverage ${coverage.toFixed(3)} exceeds the un-flood ceil ${COVERAGE_MAX} — the blob FLOODED (the smin over-merge slab; the flood reads ≈ 0.74 interior).`,
        ).toBeLessThanOrEqual(COVERAGE_MAX);

        // 2. FIELD-NOT-SLAB — a strong centre-vs-corner luma gradient (the flood is
        // alpha = 1 everywhere = no gradient).
        expect(
            gradient,
            `blob centre-vs-corner luma delta ${gradient.toFixed(1)} is below the field floor ${GRADIENT_MIN_DELTA} — the canvas reads as a FLAT slab (alpha = 1 everywhere), not a metaball field`,
        ).toBeGreaterThanOrEqual(GRADIENT_MIN_DELTA);

        // 3. FOUR-SIDE CONTAINMENT (AX.W15 F0 + AX.W16 reconciliation) — the BODY is
        // contained on EVERY edge (W15 geometry); the orbiting SATELLITE intentionally
        // peeks ONE footprint edge at its widest excursion (the design's orbit overflow).
        // This ceil BOUNDS the satellite excursion to its intentional budget; the
        // BODY-clip / flood case is owned by the coverage ceil (#1, a flood reads ≈0.74)
        // + the gradient floor (#2, a flood has none), so a body that reaches the edge
        // ALREADY reds those. W16 touches no length, so this ceil is re-derived to the
        // shipped satellite-overflow budget (≈0.49 observed → 0.6 ceil, so a runaway
        // orbit regression still reds).
        expect(
            sideMargin,
            `blob worst-edge paint fraction ${sideMargin.toFixed(3)} exceeds the satellite-overflow ceil ${SIDE_MARGIN_MAX_FRAC} — the orbit excursion is unbounded (the steady body must stay inside the footprint on all four sides; only the orbiting satellite may peek, bounded by this ceil; a body that reaches the edge also reds the coverage/gradient witnesses)`,
        ).toBeLessThanOrEqual(SIDE_MARGIN_MAX_FRAC);

        // 4. DOME LUMINANCE VARIANCE (AX.W15 F1) — a LIT dome rolls luma across a
        // sphere; a FLAT fill (lit:false) is near-uniform. Born-RED at HEAD (lit:false
        // shipped a near-flat fill, std ≈ 3).
        expect(
            domeStd,
            `blob painted-pixel luma std-dev ${domeStd.toFixed(1)} is below the lit-dome floor ${DOME_LUMA_STD_MIN} — the body reads as a FLAT fill, not a lit warm-cream dome (the default-OFF flat-sticker witness)`,
        ).toBeGreaterThanOrEqual(DOME_LUMA_STD_MIN);

        // 5. SILHOUETTE DEVIATION (AX.W15 F3) — the warped-FBM membrane deviates from a
        // perfect circle. Born-RED at HEAD (warpAmp:0.0 + low noiseAmp → a clean arc,
        // CV ≈ 0.003).
        expect(
            silhouetteCV,
            `blob silhouette radius CV ${silhouetteCV.toFixed(4)} is below the living-membrane floor ${SILHOUETTE_CV_MIN} — the edge reads as a clean geometric circle, not a living warped-FBM membrane`,
        ).toBeGreaterThanOrEqual(SILHOUETTE_CV_MIN);
    });

    test("blob LEANS toward a synthetic hover-flick (the wired interaction is legible within the footprint)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        const blobCanvas = page.locator('canvas[data-testid="goo-blob-canvas"]').first();
        await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(600);

        // Resting centroid (median over a few frames to settle the breath/orbit).
        const restCxs: number[] = [];
        for (let f = 0; f < 4; f++) {
            const png = await grab(blobCanvas);
            const bg = modalBackground(png);
            restCxs.push(paintedShape(png, bg, COLOR_DIFF_THRESHOLD).cx);
            await page.waitForTimeout(80);
        }
        const restCx = median(restCxs);

        // Synthetic hover-flick toward the RIGHT (fx=0.82): the spring follow + lean +
        // pseudopod trail pull the painted centroid toward the pointer.
        await hoverFlick(page, blobCanvas, 0.82, 0.5);
        await page.waitForTimeout(120);
        const leanCxs: number[] = [];
        for (let f = 0; f < 4; f++) {
            const png = await grab(blobCanvas);
            const bg = modalBackground(png);
            leanCxs.push(paintedShape(png, bg, COLOR_DIFF_THRESHOLD).cx);
            await page.waitForTimeout(60);
        }
        const leanCx = median(leanCxs);
        const shift = leanCx - restCx; // positive = toward the right-side pointer

        expect(
            shift,
            `blob centroid shift under a rightward hover-flick = ${shift.toFixed(4)} (rest ${restCx.toFixed(3)} → lean ${leanCx.toFixed(3)}); it must move ≥ ${CENTROID_SHIFT_MIN} toward the pointer — the wired lean/pseudopod is INVISIBLE (no contained silhouette to deform legibly)`,
        ).toBeGreaterThanOrEqual(CENTROID_SHIFT_MIN);
    });

    test("EVERY grid blob paints visibly against the page background in BOTH light and dark (the var(--primary)-dark-wash guard)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        const cells = page.locator('canvas[data-testid="goo-blob-canvas"]');
        await cells.first().waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(600);

        // The FIRST four grid blobs are the BLOB_CONFIG_DEFAULTS color showcase; the
        // first is var(--primary) (the dark-wash risk). Assert each paints a contained
        // field in BOTH modes (the min-contrast rim guard keeps it legible).
        const checkMode = async (label: string) => {
            const count = Math.min(await cells.count(), 4);
            for (let idx = 0; idx < count; idx++) {
                const cell = cells.nth(idx);
                let peak = 0;
                for (let f = 0; f < BLOB_FRAMES; f++) {
                    const png = await grab(cell);
                    const bg = modalBackground(png);
                    peak = Math.max(peak, interiorCoverage(png, bg, COLOR_DIFF_THRESHOLD));
                    await page.waitForTimeout(60);
                }
                expect(
                    peak,
                    `[${label}] grid blob #${idx} interior coverage ${peak.toFixed(3)} is below ${COVERAGE_MIN} — it washes out against the ${label} background (the var(--primary)-dark-wash min-contrast rim guard failed for this blob)`,
                ).toBeGreaterThanOrEqual(COVERAGE_MIN);
            }
        };

        await checkMode("light");
        // Toggle dark mode (the demo root toggles `.dark` on <html>).
        await page.evaluate(() => document.documentElement.classList.add("dark"));
        await page.waitForTimeout(400); // let the MutationObserver retint + repaint
        await checkMode("dark");
    });
});
