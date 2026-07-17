// The ambient-hue histogram (a FREE rider), in this
// colocated leaf (the luminance leaf). The
// `useGlassBackdropLuminance` observer COMPOSES it — the histogram accumulate/resolve
// math + the value.js color-source live HERE ONCE, the observer keeps the sampling
// loop + the DOM/canvas plumbing. Moving the value.js import WITH the histogram keeps
// `proof:single-color-core` following the ONE color source into the leaf.
//
// iOS-27's defining glass move is richer than the legibility darken: the plate
// ABSORBS the room's HUE — a now-playing pill warms violet over "Your Essentials",
// teal over "Chill" (the same pill, a sub-perceptual cast per album). This rides as
// a 12-bucket chroma×alpha-weighted OKLCh hue histogram accumulated INSIDE the
// EXISTING per-pixel loop (the SAME getImageData pass — NO second canvas, NO second
// getImageData, the budget is the existing loop). The chroma×alpha weight makes a
// gray pixel contribute ~0 (a gray room tints NOTHING — the correct null identity);
// the picked hue is written as a complete `oklch()` at a FIXED sub-perceptual
// chroma/L so the plate absorbs the CAST, never the backdrop's saturation.
//
// The sRGB→OKLCh conversion routes through Value's final-object `rgb` factory and
// `convertColor`; no matrix or CSS-text detour lives here.
import { convertColor, rgb } from "@mkbabb/value.js/color";
import { colorValue, numericChannel } from "../color/value";

const AMBIENT_HUE_BUCKETS = 12; // 30° per bucket — the coarse modal-hue resolution.
// The fixed sub-perceptual chroma + lightness the ambient HUE is written at. The
// plate absorbs the ROOM'S HUE at the LIBRARY'S calm chroma — NEVER the backdrop's
// (a vivid album yields a faint cast, not a saturated plate). Mid-L so the mix reads
// in both modes; chroma well below the warm-cream identity's own.
const AMBIENT_HUE_L = 0.72;
const AMBIENT_HUE_C = 0.06;
// The minimum chroma-weighted mass (relative to the pixel count) below which the
// sample is NULL — a flat-gray backdrop has near-zero chroma mass, so it writes NO
// hue (the correct gray-room-tints-nothing identity).
const AMBIENT_NULL_MASS = 0.004;

/** A 12-bucket chroma×alpha-weighted OKLCh hue accumulator over the SAME pixel pass. */
export interface HueHistogram {
    /** chroma×alpha mass per hue bucket (the bucket weight). */
    weight: Float64Array;
    /** Σ chroma×alpha·cos(h) per bucket (for the circular-mean refine). */
    sumCos: Float64Array;
    /** Σ chroma×alpha·sin(h) per bucket. */
    sumSin: Float64Array;
    /** total chroma×alpha mass (the null-detection denominator numerator). */
    totalMass: number;
    /** total pixels accumulated (the null-mass denominator). */
    n: number;
}

export function makeHueHistogram(): HueHistogram {
    return {
        weight: new Float64Array(AMBIENT_HUE_BUCKETS),
        sumCos: new Float64Array(AMBIENT_HUE_BUCKETS),
        sumSin: new Float64Array(AMBIENT_HUE_BUCKETS),
        totalMass: 0,
        n: 0,
    };
}

/**
 * Bin ONE sRGB pixel (composited triple, already over-white) into the histogram,
 * weighted by its OKLCh chroma × the source alpha — a low-chroma/gray pixel
 * contributes ~0. The sRGB→OKLCh math is value.js's primitives (NOT hand-rolled).
 */
export function accumulateHuePixel(
    h: HueHistogram,
    r: number,
    g: number,
    b: number,
    alpha: number,
): void {
    h.n++;
    const source = colorValue("accumulateHuePixel:rgb", rgb(r, g, b));
    const converted = colorValue(
        "accumulateHuePixel:oklch",
        convertColor(source, "oklch"),
    );
    const [, chroma, hue] = converted.channels;
    const C = numericChannel(chroma, "accumulateHuePixel");
    const H = numericChannel(hue, "accumulateHuePixel");
    if (!Number.isFinite(C) || !Number.isFinite(H) || C <= 0) return;
    const mass = C * alpha; // chroma × alpha — a gray pixel weighs ~0 (the null floor).
    if (mass <= 0) return;
    const hueRad = (H * Math.PI) / 180;
    let bucket = Math.floor((H / 360) * AMBIENT_HUE_BUCKETS) % AMBIENT_HUE_BUCKETS;
    if (bucket < 0) bucket += AMBIENT_HUE_BUCKETS;
    h.weight[bucket]! += mass;
    h.sumCos[bucket]! += mass * Math.cos(hueRad);
    h.sumSin[bucket]! += mass * Math.sin(hueRad);
    h.totalMass += mass;
}

/**
 * Resolve the histogram → a complete `oklch()` ambient-hue string, or `transparent`
 * for a NULL (gray) sample. The modal bucket's chroma-weighted CIRCULAR MEAN is the
 * picked hue; it is emitted at the FIXED sub-perceptual chroma/L (a HUE event, never
 * the backdrop's saturation).
 */
export function resolveAmbientHue(h: HueHistogram): string {
    if (h.n === 0 || h.totalMass / h.n < AMBIENT_NULL_MASS) return "transparent";
    // pick the modal (heaviest) bucket.
    let modal = 0;
    for (let i = 1; i < AMBIENT_HUE_BUCKETS; i++) {
        if (h.weight[i]! > h.weight[modal]!) modal = i;
    }
    if (h.weight[modal]! <= 0) return "transparent";
    // the chroma-weighted circular mean of the modal bucket (refine off the 30° bin).
    let hueDeg =
        (Math.atan2(h.sumSin[modal]!, h.sumCos[modal]!) * 180) / Math.PI;
    if (hueDeg < 0) hueDeg += 360;
    return `oklch(${AMBIENT_HUE_L} ${AMBIENT_HUE_C} ${hueDeg.toFixed(1)})`;
}
