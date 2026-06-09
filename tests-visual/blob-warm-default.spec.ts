// AY.W-BLOB1 — proof:blob-warm-default, the BORN-RED default-warmth gate.
//
// The keystone OPEN item (RESEARCH.md §1 OPEN-1): the DEFAULT <GooBlob> renders a
// DARK coffee-bean, not the "warm-cream living bead" every doc claims. Root cause is
// two shipped defaults — types.ts:251 `paletteStops: []` (the body falls back to the
// mounted near-black `color`) + types.ts:291 `rimColor: "var(--foreground)"` (near-black
// warm-ink in light mode). The "warm-cream" identity is a thin specular/rim sheen on a
// DARK body; it does not make the body read cream.
//
// THIS GATE IS BORN-RED AT HEAD BY DESIGN. It mounts the REAL <GooBlob> with
// BLOB_CONFIG_DEFAULTS, reads back the painted BODY pixels, and asserts the resting body
// mean OKLCh-L reads as a LIGHT bead (L >= WARM_BEAD_L_MIN, the warm-cream band). At HEAD
// the dark default measures WELL BELOW that floor — the calm composite reference plate
// (tests-visual/fixtures/blob-default-charcoal-HEAD.png) reads a body mean L ≈ 0.53
// (a brown/charcoal body whose mean is LIFTED by the lit-rim + cream-AA pixels), and the
// LIVE demo render over the near-black var(--primary) body reads lower still — so this
// spec FAILS at HEAD. The falsifiable target W-BLOB2 turns GREEN by shipping the
// warm-cream OKLCh default paletteStops base (RESEARCH.md §2.1). This is the difference
// between an artefact "doc exists" gate and a real measured gate: a doc EXISTING does not
// close the dark-default defect; a measured body-L crossing the warm-cream band does.
//
// READBACK MECHANISM (inherited from blob-render.spec.ts — the cardinal AX real-device
// fix). A WebGL2 canvas is NOT reliably readable via getImageData without
// preserveDrawingBuffer:true (the buffer reads EMPTY post-composite). The robust
// cross-context readback is a COMPOSITED element screenshot (locator.screenshot())
// decoded with pngjs — it captures exactly the displayed pixels.
//
// CLIP-ROBUST BODY ISOLATION (the blob-render.spec.ts known hazard, restated): the story
// mounts each <GooBlob> in a `rounded-card overflow-hidden` cell, so the canvas
// screenshot's literal CORNER pixels fall outside the rounded clip and read dark. We
// estimate the background as the MODAL (most-common, 16-step-quantized) colour (the cream
// field for a contained droplet) and read the BODY mean-L over the painted (differ-from-
// modal-bg) interior-inset pixels only — the cream field does not dilute the body-L, and
// the rounded-corner band is excluded. A harness that cannot separate a charcoal body
// from a cream one cannot bound the W-BLOB2 tuner — so the body isolation is the
// load-bearing leg (the named-successor diagnostic-loop trigger if it cannot read cleanly).
//
// OKLCh-L is computed INLINE (tests-visual ships only @playwright/test + pngjs — no
// culori): sRGB -> linear (the standard OETF inverse) -> the Bjorn Ottosson linear-sRGB
// -> OKLab M1/M2 matrices + the cube-root nonlinearity (the SAME path
// src/composables/glass/webgl/shaders/procedural-color.glsl.ts uses in-shader). L = the
// OKLab L channel in [0,1].

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

// ── the warm-bead band (RESEARCH.md §2.1 + the spec's HARD GATE) ───────────────────
// The BINDING assert: the resting body mean OKLCh-L must clear the warm-cream floor. At
// HEAD the dark default measures well below it (the calm reference plate ≈ 0.53; the live
// near-black var(--primary) body lower) — robustly born-RED. The 0.62 floor is the
// warm-cream band entry: a genuine cream body (e.g. an OKLCh L≈0.85 stop family) clears it
// comfortably, while the brown/charcoal HEAD default (mean ≈ 0.53, lit-rim-lifted) does not.
const WARM_BEAD_L_MIN = 0.62; // the resting body mean OKLCh-L floor — a warm-cream bead
const DARK_DEFAULT_L_REF = 0.55; // the born-RED reference: HEAD's brown/charcoal body measures ≲ 0.55

// ── readback tunables (the blob-render.spec.ts clip-robust precedent) ──────────────
const INTERIOR_INSET = 0.12; // exclude the outer rounded-corner band from the body region
const COLOR_DIFF_THRESHOLD = 40; // |dR|+|dG|+|dB| over the modal bg = "painted" (a body pixel)
const BLOB_FRAMES = 6; // read back N frames; the verdict is the median body-L
const ANTI_FLAKE_RUNS = 3; // 3-run median verdict (anti-flake)

test.setTimeout(180_000);

/** Median of a numeric array (the robust anti-flake verdict). */
function median(xs: number[]): number {
    const s = [...xs].sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/** Composited element screenshot -> decoded RGBA (the robust GPU-canvas readback). */
async function grab(locator: Locator): Promise<PNG> {
    return PNG.sync.read(await locator.screenshot());
}

/**
 * The MODAL background RGB — the most-common 16-step-quantized colour over the canvas.
 * For a contained droplet that is the cream field; UNLIKE a 4-corner average it is immune
 * to the rounded-card clip's dark corner pixels (the blob-render.spec.ts clip-robust fix).
 */
function modalBackground(png: PNG): [number, number, number] {
    const { data } = png;
    const counts = new Map<number, number>();
    for (let i = 0; i < data.length; i += 4) {
        const key =
            ((data[i]! >> 4) << 8) | ((data[i + 1]! >> 4) << 4) | (data[i + 2]! >> 4);
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

/** |dR|+|dG|+|dB| of a pixel vs the background. */
function diffFromBg(data: Buffer, i: number, bg: [number, number, number]): number {
    return (
        Math.abs(data[i]! - bg[0]) +
        Math.abs(data[i + 1]! - bg[1]) +
        Math.abs(data[i + 2]! - bg[2])
    );
}

/** sRGB 8-bit channel -> linear-light [0,1] (the standard OETF inverse). */
function srgbToLinear(c8: number): number {
    const c = c8 / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/**
 * OKLab L of an sRGB pixel — the Bjorn Ottosson linear-sRGB -> OKLab path (the same
 * matrices procedural-color.glsl.ts uses in-shader). Returns L in [0,1].
 */
function oklabL(r8: number, g8: number, b8: number): number {
    const r = srgbToLinear(r8);
    const g = srgbToLinear(g8);
    const b = srgbToLinear(b8);
    // linear-sRGB -> LMS (Ottosson M1)
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    // LMS' -> OKLab (Ottosson M2) — L channel only.
    return 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
}

/**
 * The resting BODY mean OKLCh-L over the painted (differ-from-modal-bg) interior-inset
 * pixels. The modal bg (the cream field) is excluded, so the measure is the body's own
 * luminance — a charcoal body reads L < 0.30, a warm-cream body reads L >= 0.62. Returns
 * null if too few body pixels were painted (a blank/broken render — the diagnostic-loop
 * trigger, distinct from a charcoal body).
 */
function bodyMeanL(png: PNG, bg: [number, number, number]): number | null {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let sum = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) <= COLOR_DIFF_THRESHOLD) continue; // background -> skip
            sum += oklabL(data[i]!, data[i + 1]!, data[i + 2]!);
            n++;
        }
    }
    if (n < 64) return null; // too few body pixels — a broken/blank render, not a body
    return sum / n;
}

// AY.W-BLOB2 — the cream body is a FIXED light OKLCh base (the `color.paletteStops` ramp),
// NOT a token that flips with the theme, so it must read LIGHT (body mean OKLCh-L >= 0.62)
// in BOTH light AND dark mode. The gate runs the SAME readback under each colorScheme.
const COLOR_SCHEMES = ["light", "dark"] as const;

for (const scheme of COLOR_SCHEMES) {
    test.describe(`blob-warm-default (π lane — fail-CLOSED, ${scheme})`, () => {
        test.use({ colorScheme: scheme });
        test(`the DEFAULT <GooBlob> body reads as a WARM-CREAM bead in ${scheme} mode (resting body mean OKLCh-L >= 0.62)`, async ({
            page,
        }) => {
            await page.goto(PI_TARGETS.blob.path);
            // The story mounts SEVERAL <GooBlob> instances; the FIRST is the
            // BLOB_CONFIG_DEFAULTS render (the bare default — the gate target, same as
            // blob-render.spec.ts uses .first()).
            const blobCanvas = page
                .locator('canvas[data-testid="goo-blob-canvas"]')
                .first();
            await blobCanvas.waitFor({ state: "visible", timeout: 20_000 });
            // Let the demand-driven loop settle into the resting droplet pose.
            await page.waitForTimeout(600);

            // Per run: read N frames, take the median body-L (the droplet breathes; the
            // body luminance is stable across the breath — the median is the robust value).
            const bodyLs: number[] = [];
            let brokenReads = 0;
            for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
                const frameLs: number[] = [];
                for (let f = 0; f < BLOB_FRAMES; f++) {
                    const png = await grab(blobCanvas);
                    const bg = modalBackground(png);
                    const L = bodyMeanL(png, bg);
                    if (L === null) brokenReads++;
                    else frameLs.push(L);
                    await page.waitForTimeout(80);
                }
                if (frameLs.length > 0) bodyLs.push(median(frameLs));
            }

            // The body must paint SOMETHING (the diagnostic-loop trigger — a harness that
            // cannot read a body cannot bound the tuner; a HARNESS bug, not a research miss).
            expect(
                bodyLs.length,
                `the blob body could not be isolated cleanly in ${scheme} mode — ${brokenReads} broken/blank reads, ${bodyLs.length} clean runs. The modal-bg + interior-inset readback could not separate a body region from the cream field (the blob-render.spec.ts rounded-card clip hazard). Fix the readback BEFORE close — a harness that cannot read the body cannot bound the W-BLOB2 tuner.`,
            ).toBeGreaterThan(0);

            const bodyL = median(bodyLs);

            // THE BINDING ASSERT. The resting body mean OKLCh-L must read as a WARM-CREAM
            // bead in BOTH light AND dark mode. W-BLOB2 ships the light warm-cream OKLCh
            // default `color.paletteStops` base (a FIXED light OKLCh ramp, not a token that
            // flips) so the body reads L >= 0.62 either scheme; the old `paletteStops: []`
            // charcoal default measured ≈ 0.53 (born-RED).
            expect(
                bodyL,
                `the DEFAULT blob body mean OKLCh-L = ${bodyL.toFixed(3)} (${scheme} mode) is below the warm-cream-bead floor ${WARM_BEAD_L_MIN} — a bare <GooBlob :config="BLOB_CONFIG_DEFAULTS"> paints a ${
                    bodyL <= DARK_DEFAULT_L_REF ? "DARK coffee-bean body" : "too-dark body"
                }, not the "warm-cream living bead" the docs claim. FIX: ship the light warm-cream OKLCh default color.paletteStops base + the warm mid-tone rimColor (RESEARCH.md §2.1 / W-BLOB2).`,
            ).toBeGreaterThanOrEqual(WARM_BEAD_L_MIN);
        });
    });
}
