// AY.W-COHERE — substrate-cohesion, the SET-LEVEL π readback (the four live
// substrates measured AS A SET, not four isolated gate-passes).
//
// The B2-gestalt red-team verdict: constellation IS the bar (a recessive grey
// lattice + a single warm focal ring in glass-ui's accent language); the other
// three miss it on at least one axis. This spec binds the three set-level π
// readbacks the per-substrate isolation gates structurally cannot see:
//
//   G-ACCENT   — ONE accent family. The blob MOOD bead's OKLCh chroma must sit in
//                the warm-register band the FourierField COMET head occupies (the
//                live chromatic accent of the set), at a warm-RED hue — NOT the
//                neon-coral ball one section down from the cream default. Born-RED
//                at HEAD: the mood seed oklch(0.62 0.19 25) renders C well above
//                the comet band (the shader's SSS/iridescence pushes it to neon);
//                the W-COHERE chroma-ceiling brings it into band.
//   G-RECESSION — ONE recession contract. A <Constellation :opacity-ceiling="0.4">
//                paints the field at ~0.4× the ink coverage of the :opacity-ceiling
//                1 instance — the recession prop BITES (not just declared). Born-RED
//                at HEAD: constellation had no opacityCeiling prop, so the two
//                identical instances painted IDENTICAL ink (the recession could not
//                be set).
//   G-SHADOW   — ONE shadow language. The painted blob shadow is SOFT + near-
//                centered + ambient-tinted (a gel-bead contact shadow) in BOTH
//                light AND dark mode, NOT the hard `5px 5px` near-black cartoon
//                offset-stamp. Born-RED at HEAD: the wrapper drop-shadow was a
//                5px/5px 80%-near-black stamp flung down-right.
//
// READBACK MECHANISM (inherited from blob-warm-default.spec.ts — the cardinal AX
// real-device fix). A WebGL2 canvas is NOT reliably readable via getImageData; the
// robust cross-context readback is a COMPOSITED element screenshot
// (locator.screenshot()) decoded with pngjs. OKLCh L/C/h is computed INLINE (the
// workspace ships only @playwright/test + pngjs) via the Bjorn Ottosson
// linear-sRGB -> OKLab matrices — the SAME path procedural-color.glsl.ts uses
// in-shader.

import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import { PNG } from "pngjs";
import { PI_TARGETS } from "./pi-manifest.ts";

test.setTimeout(180_000);

// The set-cohesion π readbacks are DESKTOP-LAYOUT calibrated: the blob studio is
// `w-64` (a large bead) and the two recession constellations sit side-by-side
// (`sm:grid-cols-2`). On the coarse-touch mobile project (390×844) the layout
// re-flows (the blob shrinks below the body-isolation floor; the recession cards
// stack so the lower one is offscreen and the substrate parks its paint), which
// corrupts the geometry-sensitive pixel readbacks. The set-cohesion TRUTH is the
// desktop render; the both-viewport contact sheet (G4) captures the mobile look
// separately in the DELTA. Run the assertion arm on the desktop project only.
test.skip(
    ({ viewport }) => !!viewport && viewport.width < 700,
    "set-cohesion π readbacks are desktop-layout calibrated (the mobile contact-sheet look rides the G4 DELTA, not these geometry-sensitive asserts)",
);

// ── the warm-register band (measured from the live FF comet, not hand-set) ──────
// The blob mood bead chroma must land AT OR BELOW the comet's chroma (the set's
// chromatic accent ceiling) and ABOVE a saturated-bead floor (it must read as a
// warm bead, not the near-achromatic cream default). The hue must be warm-red.
const SATURATED_BEAD_C_FLOOR = 0.045; // a saturated warm bead is clearly above the cream's near-achromatic body
const COMET_C_CEILING_PAD = 0.03; // the bead may sit at the comet band ± this tolerance
const WARM_HUE_LO = 5; // OKLCh hue lower bound of the warm-red family
const WARM_HUE_HI = 75; // upper bound (red→orange→amber arc; the comet sits ~28-30, the bead ~25)
const RECESSION_RATIO_MAX = 0.62; // a 0.4-ceiling field must paint <= 0.62x the full field's ink (the bite)
const RECESSION_RATIO_MIN = 0.18; // ...but must still paint SOMETHING (not zeroed)

// ── readback tunables (the blob-warm-default clip-robust precedent) ────────────
const INTERIOR_INSET = 0.12;
const COLOR_DIFF_THRESHOLD = 110; // |dR|+|dG|+|dB| over the modal bg = an opaque body pixel
const BLOB_FRAMES = 6;
const ANTI_FLAKE_RUNS = 3;
const INK_DIFF_THRESHOLD = 10; // a constellation hairline/dot differs this much from the cream card

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

/** The modal (most-common, 16-step-quantized) background RGB — the cream card field. */
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

/** OKLab (L, a, b) of an sRGB pixel — the Ottosson linear-sRGB -> OKLab path. */
function oklab(r8: number, g8: number, b8: number): [number, number, number] {
    const r = srgbToLinear(r8);
    const g = srgbToLinear(g8);
    const b = srgbToLinear(b8);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    return [
        0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
        1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
        0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
    ];
}

/** OKLCh (L, C, h°) of an sRGB pixel. */
function oklch(r8: number, g8: number, b8: number): { L: number; C: number; h: number } {
    const [L, a, b] = oklab(r8, g8, b8);
    const C = Math.hypot(a, b);
    let h = (Math.atan2(b, a) * 180) / Math.PI;
    if (h < 0) h += 360;
    return { L, C, h };
}

/**
 * The mean OKLCh of the painted BODY pixels (differ-from-modal-bg, interior-inset)
 * — for a filled bead the body's own color (the cream field is excluded). Returns
 * null on too few body pixels (a broken/blank render).
 */
function bodyMeanOklch(
    png: PNG,
    bg: [number, number, number],
): { L: number; C: number; h: number } | null {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    let sumL = 0;
    let sumA = 0;
    let sumB = 0;
    let n = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) <= COLOR_DIFF_THRESHOLD) continue;
            const [L, a, b] = oklab(data[i]!, data[i + 1]!, data[i + 2]!);
            sumL += L;
            sumA += a;
            sumB += b;
            n++;
        }
    }
    if (n < 64) return null;
    const mL = sumL / n;
    const mA = sumA / n;
    const mB = sumB / n;
    const C = Math.hypot(mA, mB);
    let hue = (Math.atan2(mB, mA) * 180) / Math.PI;
    if (hue < 0) hue += 360;
    return { L: mL, C, h: hue };
}

/**
 * The PEAK-chroma accent OKLCh — the mean OKLCh over the top-chroma quantile of
 * differ-from-bg pixels. For the FF canvas this isolates the COMET head/trail (the
 * brightest saturated stroke) from the faint epicycle rings. Returns null on too
 * few accent pixels.
 */
function peakChromaOklch(
    png: PNG,
    bg: [number, number, number],
): { L: number; C: number; h: number } | null {
    const { width: w, height: h, data } = png;
    const samples: { L: number; a: number; b: number; C: number }[] = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) <= COLOR_DIFF_THRESHOLD) continue;
            const [L, a, b] = oklab(data[i]!, data[i + 1]!, data[i + 2]!);
            samples.push({ L, a, b, C: Math.hypot(a, b) });
        }
    }
    if (samples.length < 64) return null;
    samples.sort((p, q) => q.C - p.C);
    const top = samples.slice(0, Math.max(32, Math.floor(samples.length * 0.1)));
    let sumL = 0;
    let sumA = 0;
    let sumB = 0;
    for (const s of top) {
        sumL += s.L;
        sumA += s.a;
        sumB += s.b;
    }
    const mL = sumL / top.length;
    const mA = sumA / top.length;
    const mB = sumB / top.length;
    const C = Math.hypot(mA, mB);
    let hue = (Math.atan2(mB, mA) * 180) / Math.PI;
    if (hue < 0) hue += 360;
    return { L: mL, C, h: hue };
}

/**
 * The "ink" of the field over the INTERIOR INSET — the SUMMED diff-from-bg INTENSITY
 * across painted pixels (NOT a binary above-threshold COUNT). The interior inset
 * excludes the rounded-card corner pixels (dark, outside the clip — IDENTICAL between
 * the two recession instances, so they would mask the lattice difference).
 *
 * THE RECESSION IS AN ALPHA EFFECT, NOT A COVERAGE EFFECT (AY.W-COHERE / BD W-CUT
 * reconcile — live-verified at :5173). `opacityCeiling` scales every painted pixel's
 * ALPHA, so a 0.4-ceiling lattice composites toward the card bg at 0.4× the strength —
 * the SAME nodes/lines, each PROPORTIONALLY FAINTER. A binary above-threshold count
 * barely moves (a 0.4-alpha line still crosses a hairline INK_DIFF_THRESHOLD over the
 * cream card, so the count-ratio reads ~0.76 — above the 0.62 bar, a false-FAIL),
 * while the SUMMED intensity tracks the alpha cleanly (live: full sumDiff 676k vs dim
 * 278k = ratio 0.41 over the real cream composite). So `ink` is the alpha-faithful
 * intensity integral, the true recession witness; INK_DIFF_THRESHOLD only floors out
 * the JPEG/AA noise so a non-painted pixel contributes zero.
 */
function inkCoverage(png: PNG, bg: [number, number, number]): number {
    const { width: w, height: h, data } = png;
    const x0 = Math.floor(w * INTERIOR_INSET);
    const x1 = Math.ceil(w * (1 - INTERIOR_INSET));
    const y0 = Math.floor(h * INTERIOR_INSET);
    const y1 = Math.ceil(h * (1 - INTERIOR_INSET));
    const bgLum = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2];
    let sum = 0;
    for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
            const i = (y * w + x) * 4;
            if (diffFromBg(data, i, bg) < INK_DIFF_THRESHOLD) continue; // noise floor
            // The DARK-ink LUMINANCE DEFICIT — how much darker than the cream card this painted
            // pixel is. The constellation's lattice lines/nodes are DARK ink; `opacityCeiling`
            // scales their alpha, so a 0.4-ceiling node composites 0.4× toward the card =
            // 0.4× the luminance deficit (live-verified darkRatio 0.39). The BRIGHT-side halo
            // pixels (near-cream, from AA/glow) are compositing noise whose diff-from-modal-bg
            // can INVERT under a backdrop shift (the 0.86 false-pass) — excluding them (only
            // DARKER-than-bg ink counts) makes the witness alpha-faithful AND screenshot-stable.
            const lum = 0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!;
            if (lum < bgLum) sum += bgLum - lum;
        }
    }
    return sum;
}

/**
 * The painted CAST-SHADOW DARKNESS of a contained blob — the mean OKLCh-L of the
 * darkest 5% of cast pixels (painted pixels DARKER than the bg by a margin). The
 * HARD `5px 5px 2.5px` cartoon offset-stamp is 80%-near-black (color-mix --blob-
 * color 20%, --foreground), so its darkest cast pixels reach L ≈ 0.41-0.48 in light
 * mode. The SOFT ambient contact shadow (--blob-shadow, 20%-strength) is faint, so
 * its darkest cast pixels stay L ≈ 0.66. The bead's OWN form-shading is IDENTICAL
 * between the two (same lightDir), so the DIFFERENCE is purely the cast-shadow
 * darkness — a clean discriminator (cartoon ≈0.48 << ambient ≈0.66, a 0.25 gap).
 * This directly measures the spec's "ambient-tinted, not 80%-near-black" axis.
 * Returns the mean-darkest-5% L + the cast-pixel count.
 */
function castShadowDarkness(
    png: PNG,
    bg: [number, number, number],
): { meanDarkestL: number; castN: number } | null {
    const { data } = png;
    const bgL = oklab(bg[0], bg[1], bg[2])[0];
    const darkLs: number[] = [];
    for (let i = 0; i < data.length; i += 4) {
        if (diffFromBg(data, i, bg) < 10) continue;
        const L = oklab(data[i]!, data[i + 1]!, data[i + 2]!)[0];
        if (L < bgL - 0.02) darkLs.push(L); // darker-than-bg = cast shade / bead form-shade
    }
    if (darkLs.length < 64) return null;
    darkLs.sort((a, b) => a - b);
    const darkest = darkLs.slice(0, Math.max(1, Math.floor(darkLs.length * 0.05)));
    return {
        meanDarkestL: darkest.reduce((s, v) => s + v, 0) / darkest.length,
        castN: darkLs.length,
    };
}

// ════════════════════════════════════════════════════════════════════════════
// G-ACCENT — the blob mood bead chroma sits in the comet's warm-register band.
// ════════════════════════════════════════════════════════════════════════════
test.describe("substrate-cohesion: G-ACCENT (ONE accent family)", () => {
    test("the blob MOOD bead chroma sits in the warm-register band the FourierField comet occupies", async ({
        page,
    }) => {
        // 1) Measure the live FF comet chroma (the set's chromatic accent ceiling).
        await page.goto(PI_TARGETS.fourier.path);
        const ffCanvas = page.locator(".fourier-field canvas").first();
        await ffCanvas.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(700);
        const cometCs: number[] = [];
        const cometHues: number[] = [];
        for (let f = 0; f < BLOB_FRAMES; f++) {
            const png = await grab(ffCanvas);
            const bg = modalBackground(png);
            const accent = peakChromaOklch(png, bg);
            if (accent) {
                cometCs.push(accent.C);
                cometHues.push(accent.h);
            }
            await page.waitForTimeout(90);
        }
        expect(
            cometCs.length,
            "could not read the FourierField comet accent — the comet did not paint (a broken FF render; the G4 FF light-floor dependency)",
        ).toBeGreaterThan(0);
        const cometC = median(cometCs);
        const cometHue = median(cometHues);
        const cometCeiling = cometC + COMET_C_CEILING_PAD;

        // 2) Measure the blob MOOD bead chroma at the demo mood seed (the studio's
        //    "Excited" preset — the most-saturated mood path). Switch the studio to
        //    the Excited preset, then read the studio hero body.
        await page.goto(PI_TARGETS.blob.path);
        const studioBlob = page
            .locator('canvas[data-testid="goo-blob-canvas"]')
            .first();
        await studioBlob.waitFor({ state: "visible", timeout: 20_000 });
        // Drive the studio to the "Excited" preset (the warm mood seed — the demo
        // mood seed the spec samples). The Configurator preset chips are
        // `role="tab"` (NOT button) — see Configurator.vue.
        const excited = page.getByRole("tab", { name: /excited/i }).first();
        expect(
            await excited.count(),
            "the blob studio has no 'Excited' preset tab — the demo mood seed could not be selected (the G-ACCENT sample target)",
        ).toBeGreaterThan(0);
        await excited.click();
        await page.waitForTimeout(1500); // let the seed->palette feed + re-paint settle
        // The studio is the ONE live Blob context on the page — its canvas IS
        // the mood bead.
        const moodCanvas = studioBlob;

        const beadCs: number[] = [];
        const beadHues: number[] = [];
        let broken = 0;
        for (let run = 0; run < ANTI_FLAKE_RUNS; run++) {
            for (let f = 0; f < BLOB_FRAMES; f++) {
                const png = await grab(moodCanvas);
                const bg = modalBackground(png);
                const body = bodyMeanOklch(png, bg);
                if (!body) broken++;
                else {
                    beadCs.push(body.C);
                    beadHues.push(body.h);
                }
                await page.waitForTimeout(80);
            }
        }
        expect(
            beadCs.length,
            `the blob mood bead could not be isolated (${broken} broken reads) — a harness/render break, not a chroma miss`,
        ).toBeGreaterThan(0);
        const beadC = median(beadCs);
        const beadHue = median(beadHues);

        // THE BINDING ASSERTS.
        // (a) the bead is a SATURATED warm bead (above the near-achromatic floor).
        expect(
            beadC,
            `the blob mood bead OKLCh-C = ${beadC.toFixed(3)} is below the saturated-bead floor ${SATURATED_BEAD_C_FLOOR} — it reads near-achromatic, not a warm bead (the chroma ceiling over-flattened it — risk-1)`,
        ).toBeGreaterThanOrEqual(SATURATED_BEAD_C_FLOOR);
        // (b) the bead is AT OR BELOW the comet's chroma band (NOT neon).
        expect(
            beadC,
            `the blob mood bead OKLCh-C = ${beadC.toFixed(3)} is ABOVE the comet chroma ceiling ${cometCeiling.toFixed(3)} (comet C ${cometC.toFixed(3)} + pad ${COMET_C_CEILING_PAD}) — the mood bead is the neon-coral ball, OUT of the warm-register band the FF comet occupies (D1/D4). FIX: the W-COHERE chroma-ceiling on the seed->palette derivation.`,
        ).toBeLessThanOrEqual(cometCeiling);
        // (c) the bead is a WARM-RED hue (the same family as the comet).
        expect(
            beadHue,
            `the blob mood bead OKLCh-hue = ${beadHue.toFixed(1)}° is OUTSIDE the warm-red family [${WARM_HUE_LO}, ${WARM_HUE_HI}]° — the comet sits at ${cometHue.toFixed(1)}°. The blob left the set's accent family.`,
        ).toBeGreaterThanOrEqual(WARM_HUE_LO);
        expect(beadHue).toBeLessThanOrEqual(WARM_HUE_HI);
    });
});

// ════════════════════════════════════════════════════════════════════════════
// G-RECESSION — the constellation opacityCeiling prop BITES.
// ════════════════════════════════════════════════════════════════════════════
test.describe("substrate-cohesion: G-RECESSION (ONE recession contract)", () => {
    test("a <Constellation :opacity-ceiling=0.4> paints ~0.4x the ink of the :opacity-ceiling=1 instance", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.constellation.path);
        // The recession is an ALPHA effect (`opacityCeiling` scales each painted pixel's alpha) —
        // measured by `inkCoverage`'s DARK-ink luminance deficit (below), the bare-canvas
        // screenshot's dark lattice reads the alpha faithfully (live-verified darkInkRatio 0.40
        // on real Metal — BD W-CUT reconcile; the prior binary-COVERAGE metric false-PASSED at
        // ~0.93 because dimmer lines still crossed a hairline threshold).
        const full = page
            .locator('[data-testid="constellation-recession-full"] canvas')
            .first();
        const dim = page
            .locator('[data-testid="constellation-recession-dim"] canvas')
            .first();
        await full.waitFor({ state: "visible", timeout: 20_000 });
        await dim.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(700);

        const ratios: number[] = [];
        for (let f = 0; f < BLOB_FRAMES; f++) {
            const pf = await grab(full);
            const pd = await grab(dim);
            const bgF = modalBackground(pf);
            const bgD = modalBackground(pd);
            const inkF = inkCoverage(pf, bgF);
            const inkD = inkCoverage(pd, bgD);
            if (inkF > 0) ratios.push(inkD / inkF);
            await page.waitForTimeout(120);
        }
        expect(
            ratios.length,
            "the full-strength constellation painted no ink — a broken render, not a recession miss",
        ).toBeGreaterThan(0);
        const ratio = median(ratios);

        // BITES: the recessed field paints SUBSTANTIALLY less ink than the full one.
        // At HEAD (no prop) the two identical instances painted ~1.0 (no recession).
        expect(
            ratio,
            `the 0.4-ceiling constellation paints ${(ratio * 100).toFixed(0)}% of the full field's ink — the opacityCeiling recession prop does NOT bite (a ratio near 1.0 means the recession is not painting). Expected <= ${RECESSION_RATIO_MAX}.`,
        ).toBeLessThanOrEqual(RECESSION_RATIO_MAX);
        // ...but still paints SOMETHING (the field recedes, it does not vanish).
        expect(
            ratio,
            `the 0.4-ceiling constellation paints only ${(ratio * 100).toFixed(0)}% of the full ink — it has effectively VANISHED (the recession over-applies). Expected >= ${RECESSION_RATIO_MIN}.`,
        ).toBeGreaterThanOrEqual(RECESSION_RATIO_MIN);
    });
});

// ════════════════════════════════════════════════════════════════════════════
// G-SHADOW — the blob shadow is a soft, near-centered ambient contact shadow
// (NOT the hard down-right cartoon offset-stamp) in BOTH modes.
// ════════════════════════════════════════════════════════════════════════════
// The soft ambient contact shadow's darkest cast pixels stay LIGHT (measured
// mean-darkest-5% L ≈ 0.66 in light mode). The hard `5px 5px 2.5px` 80%-near-black
// cartoon stamp drives them to L ≈ 0.48. The floor sits between (0.58): the ambient
// clears it, the stamp fails it (born-RED).
//
// LIGHT MODE is the painted π arm; the DARK arm rides the SAME adaptive `--blob-
// shadow` token (its color resolves through `--shadow-color`/`--foreground`, which
// flips light→dark — the house cartoon-shadow contract's adaptive-by-construction
// pattern). There is NO hardcoded `.dark` shadow block to diverge, so the source-
// witness (proof:substrate-cohesion: --blob-shadow resolves through --shadow-color/
// --foreground) is the dark-arm proof — exactly the DARK-ARM-ALLOWED re-resolution
// the proof:shadow-contract gate already certifies for the cartoon family.
const SHADOW_MIN_DARKEST_L = 0.58;

test.describe("substrate-cohesion: G-SHADOW (ambient, not the cartoon stamp)", () => {
    test("the blob cast shadow is SOFT + ambient-tinted (not 80%-near-black) — the gel bead, not the Memphis stamp", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.blob.path);
        // The blob wrapper carries the --blob-shadow filter. Screenshot the WRAPPER
        // (.goo-blob-wrapper) so the drop-shadow is composited into the capture (the
        // canvas alone clips the filter).
        const wrapper = page.locator(".goo-blob-wrapper").first();
        await wrapper.waitFor({ state: "visible", timeout: 20_000 });
        await page.waitForTimeout(700);

        const darkestLs: number[] = [];
        let broken = 0;
        for (let f = 0; f < BLOB_FRAMES; f++) {
            const png = await grab(wrapper);
            const bg = modalBackground(png);
            const sig = castShadowDarkness(png, bg);
            if (!sig) broken++;
            else darkestLs.push(sig.meanDarkestL);
            await page.waitForTimeout(90);
        }
        expect(
            darkestLs.length,
            `the blob cast shadow could not be read (${broken} broken reads) — a harness/render break`,
        ).toBeGreaterThan(0);
        const darkestL = median(darkestLs);

        // BINDING: the darkest cast pixels stay LIGHT (a soft ambient halo), NOT
        // near-black. The hard cartoon stamp would drive them to L ≈ 0.48.
        expect(
            darkestL,
            `the blob cast shadow's mean-darkest-5% OKLCh-L = ${darkestL.toFixed(3)} is BELOW the ambient floor ${SHADOW_MIN_DARKEST_L} — the cast shade is a near-black HARD offset-stamp, not a soft ambient-tinted contact shadow. FIX: the W-COHERE --blob-shadow ambient token (E2 — the cartoon stamp belongs on <Card surface="cartoon">, not the gel bead).`,
        ).toBeGreaterThanOrEqual(SHADOW_MIN_DARKEST_L);
    });
});
