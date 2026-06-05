// AU.W5 — the `/color` runtime-JS leaf (DEC-AT-7 / inv-AT-color).
//
// ONE runtime-JS color source. The Ottosson OKLab/OKLCh/sRGB primitives live in
// value.js `src/units/color/` (inv-K-2); this leaf is the thin value.js-backed
// hoist that aurora's bake AND the goo-blob's gamma exit both consume — so the
// shared color core is a clean leaf (imports value.js; nothing imports a glass-ui
// component back; `proof:color-acyclic` keeps the published graph a DAG). No color
// math is re-implemented here (`proof:single-color-core`).
//
// "One core" binds the MATH SOURCE (value.js), NOT the return space — the leaf
// ships BOTH `oklchToLinear` (aurora's linear bake target; the shader
// ACES-tonemaps in linear) AND `oklchToGammaRgb` (the blob's GAMMA exit, DEC-AT-7:
// the W7 faithful lift paints gamma sRGB, so its default resolver returns gamma —
// forcing one return space re-introduces the A5/A2 darkening defect). The CSS
// token tier stays native (guarded) — this leaf governs only the runtime-JS tier.

import {
    colorUnit2,
    oklabToLinearSRGB,
    oklabToRgb255,
    parseCSSColor,
    rawOklabToOklch,
    rawOklchToOklab,
    srgbToOKLab,
} from "@mkbabb/value.js";

/** An OKLCh color stop. `L` 0..1, `C` 0..~0.4, `h` 0..360. */
export interface OklchStop {
    L: number;
    C: number;
    h: number;
}

/**
 * The injected color seam (DEC-AT-2, consumed by the AU.W7 blob). Resolves a CSS
 * color string to a GAMMA-sRGB triple in [0,1]. `defaultBlobColorResolver` is the
 * opt-in default; a consumer (value.js) may inject its own.
 */
export type ColorResolver = (css: string) => [number, number, number];

/**
 * OKLCh stop → LINEAR-sRGB in [0,1] — aurora's bundle-canonical bake target (the
 * shader ACES-tonemaps in linear, so the LUT stays linear).
 *
 * value.js's canonical Ottosson path (`rawOklchToOklab → oklabToLinearSRGB`,
 * inv-K-2). The `Math.max(0,·)` wrap is the ACES-in-linear contract — value.js
 * does not clamp negative linear (an out-of-gamut stop yields negatives; the wrap
 * keeps them off the GPU). The equivalence canary asserts the COMPOSED path.
 */
export function oklchToLinear(stop: OklchStop): [number, number, number] {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [lr, lg, lb] = oklabToLinearSRGB(L, a, b);
    return [Math.max(0, lr), Math.max(0, lg), Math.max(0, lb)];
}

/**
 * OKLCh stop → GAMMA-sRGB in [0,1] — the blob's faithful-lift exit (DEC-AT-7's W7
 * GAMMA space). value.js's `oklabToRgb255` returns gamma-encoded 0..255 (HSV/sRGB,
 * no extra OETF); divide to [0,1]. The blob's default resolver returns THIS space
 * so the W7 lift paints at parity (the LINEAR shader-quality flip + `linearToSrgb`
 * is the AU.W7 stage). Channels are clamped to [0,1] (an out-of-gamut stop is
 * already gamut-mapped upstream; this is the float-edge guard).
 */
export function oklchToGammaRgb(stop: OklchStop): [number, number, number] {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [r, g, bch] = oklabToRgb255(L, a, b);
    const c = (v: number) => Math.min(1, Math.max(0, v / 255));
    return [c(r), c(g), c(bch)];
}

/**
 * Resolve any CSS color string to an OKLCh stop via value.js's parser — the single
 * canonical core (inv-K-2). DOM-free (SSR / happy-dom safe — no 1×1-canvas).
 *
 * Semantics: an INVALID string THROWS; ALPHA is dropped (OklchStop has no alpha);
 * out-of-gamut inputs are NOT byte-clamped. Callers feeding user / possibly-
 * transparent strings should wrap in try/catch and decide an alpha policy.
 */
export function cssToOklch(css: string): OklchStop {
    const parsed = parseCSSColor(css) as Parameters<typeof colorUnit2>[0];
    const rgb = colorUnit2(parsed, "rgb").value;
    const [L, a, bch] = srgbToOKLab(Number(rgb.r), Number(rgb.g), Number(rgb.b));
    const [Lo, C, H] = rawOklabToOklch(L, a, bch);
    return { L: Lo, C, h: H };
}

/** OKLCh stop → `#rrggbb` gamma hex (value.js `oklabToRgb255`). */
export function oklchStopToHex(s: OklchStop): string {
    const [L, a, b] = rawOklchToOklab(s.L, s.C, s.h);
    const [r, g, bch] = oklabToRgb255(L, a, b);
    const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(bch)}`;
}

/**
 * The OPT-IN default `ColorResolver` — `(css) => gamma [r,g,b]` via
 * `cssToOklch → oklchToGammaRgb`. The AU.W7 goo-blob requires an INJECTED resolver
 * and throws by THIS name on a no-resolver mount (the loud failure, not a silent
 * gray default); value.js supplies its own, the demo story uses this one.
 */
export const defaultBlobColorResolver: ColorResolver = (css) =>
    oklchToGammaRgb(cssToOklch(css));
