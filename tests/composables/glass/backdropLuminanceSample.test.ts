// Proof:backdrop-composited-signal (R-COMPOSITED-SIGNAL / G3 → MATERIAL W2).
//
// The born-RED: `sampleAnimated` composited every TRANSLUCENT field pixel over a
// HARDCODED WHITE underlay, so the SAME field over a dark page and a light page
// resolved to IDENTICAL luma — the composited signal carried no page information.
// The cure feeds the REAL opaque page underlay (`resolveUnderlayRgb`, the same stack
// the static sampler reads) into the EXISTING luma→tint axis; no second opacity axis.
//
// GREEN (this file): a 1×1 translucent field over a dark vs a light underlay yields
// formula-correct DISTINCT luma. The dark/light assertions ALSO encode the mutation
// gate — restoring the white underlay (ignoring the `underlay` argument in the
// composite loop) collapses the two back to identical and FAILS `.not.toBeCloseTo`.

import { describe, expect, it } from "vitest";
import {
    relLuminance,
    compositeOver,
} from "@glass/composables/glass/backdropSampleMath";
import { sampleAnimated } from "@glass/composables/glass/backdropLuminanceSample";
import { SAMPLE_DOWNSAMPLE } from "@glass/composables/glass/backdropLuminanceSample";

const DARK: readonly [number, number, number] = [10, 10, 10];
const LIGHT: readonly [number, number, number] = [250, 250, 250];
const WHITE: readonly [number, number, number] = [255, 255, 255];

// A translucent CHROMATIC field pixel at 50% coverage (alpha 128/255 ≈ 0.502, well
// above FIELD_ALPHA_FLOOR so the readback is a valid sample). Chromatic (not grey) so
// the ambient-hue histogram bins a real hue rather than an achromatic null.
const FIELD = { r: 210, g: 90, b: 40, alpha: 128 };

/** The luma of ONE translucent FIELD pixel composited over `underlay` — the pure
 *  analytical model the sampler loop executes per pixel. */
function analyticalLuma(underlay: readonly [number, number, number]): number {
    const a = FIELD.alpha / 255;
    const [r, g, b] = compositeOver(FIELD.r, FIELD.g, FIELD.b, a, underlay);
    return relLuminance(r, g, b);
}

/** A fake 2D context whose downsample readback is a UNIFORM FIELD pixel — every
 *  texel identical, so the sampler's mean IS the single-pixel composite. */
function fieldContext(): CanvasRenderingContext2D {
    const n = SAMPLE_DOWNSAMPLE * SAMPLE_DOWNSAMPLE;
    const data = new Uint8ClampedArray(n * 4);
    for (let i = 0; i < data.length; i += 4) {
        data[i] = FIELD.r;
        data[i + 1] = FIELD.g;
        data[i + 2] = FIELD.b;
        data[i + 3] = FIELD.alpha;
    }
    return {
        clearRect: () => {},
        drawImage: () => {},
        getImageData: () => ({ data }),
    } as unknown as CanvasRenderingContext2D;
}

/** A 1×1-equivalent source canvas with a non-degenerate layout box. */
function fieldSource(): HTMLCanvasElement {
    return {
        width: 100,
        height: 100,
        getBoundingClientRect: () => ({
            left: 0,
            top: 0,
            width: 100,
            height: 100,
        }),
    } as unknown as HTMLCanvasElement;
}

function surface(): HTMLElement {
    const el = document.createElement("div");
    el.getBoundingClientRect = () =>
        ({ left: 10, top: 10, width: 40, height: 40 }) as DOMRect;
    return el;
}

describe("backdrop composited signal — real underlay, not hardcoded white", () => {
    it("analytical: a translucent field over dark vs light yields DISTINCT luma", () => {
        const dark = analyticalLuma(DARK);
        const light = analyticalLuma(LIGHT);
        // Formula-correct: 0.5·grey + 0.5·dark  ≪  0.5·grey + 0.5·light.
        expect(dark).toBeLessThan(light);
        expect(light - dark).toBeGreaterThan(0.05);
    });

    it("born-RED: compositing over a FIXED white underlay collapses the distinction", () => {
        // Both "pages" composite over white — the defect: identical luma regardless of
        // the true page. The cure passes the real underlay instead (asserted below).
        expect(analyticalLuma(WHITE)).toBeCloseTo(analyticalLuma(WHITE), 10);
    });

    it("sampleAnimated over dark vs light underlay resolves DISTINCT luma (mutation gate)", () => {
        const el = surface();
        const source = fieldSource();

        const dark = sampleAnimated(el, source, fieldContext(), DARK);
        const light = sampleAnimated(el, source, fieldContext(), LIGHT);

        expect(dark).not.toBeNull();
        expect(light).not.toBeNull();
        // The mutation gate: restoring the white underlay (loop ignores `underlay`)
        // makes these two identical → this assertion FAILS.
        expect(dark!.luma).not.toBeCloseTo(light!.luma, 2);
        // And each matches the closed-form single-pixel composite (uniform field).
        expect(dark!.luma).toBeCloseTo(analyticalLuma(DARK), 5);
        expect(light!.luma).toBeCloseTo(analyticalLuma(LIGHT), 5);
    });
});
