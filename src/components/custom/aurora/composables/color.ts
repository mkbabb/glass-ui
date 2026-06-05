import { MAX_STOPS } from "../constants/presets";

// inv-K-2 / AU.W5 — the single canonical color core is value.js's Ottosson
// primitives. The SHARED runtime-JS hoist (oklchToLinear / cssToOklch /
// oklchStopToHex + the blob's gamma exit) now lives in the `/color` leaf
// (`src/composables/color`), which aurora AND the goo-blob both consume. aurora
// imports the leaf core for its own composers AND re-exports it so the
// `@mkbabb/glass-ui/aurora` surface is unchanged (no break). The aurora-DOMAIN
// composers below (deriveAurora, the gamut-mapper, the palette bake) keep
// sourcing their math from value.js DIRECTLY — that is still ONE source
// (value.js), not a re-implementation. `__tests__/color-equivalence.test.ts` is
// the drift canary.
import {
    cssToOklch,
    oklchStopToHex,
    oklchToLinear,
    type OklchStop,
} from "../../../../composables/color";
import {
    srgbToOKLab,
    oklabToLinearSRGB,
    rawOklabToOklch,
    rawOklchToOklab,
    gamutMapOKLab,
    isInSRGBGamut,
} from "@mkbabb/value.js";

// Re-export the shared color core from the leaf (AU.W5 hoist — surface preserved).
export {
    cssToOklch,
    oklchStopToHex,
    oklchToLinear,
} from "../../../../composables/color";
export type { OklchStop } from "../../../../composables/color";

/**
 * Pack up to `maxStops` OklchStops into linear-sRGB triples. When `out` is
 * provided the buffer is filled in place (no allocation) — the runtime owns a
 * single buffer reused on every config update so a slider drag does not churn
 * the GC. Unused slots are zero-filled; the shader clamps via `uStopCount`.
 */
export function flattenPalette(
    stops: OklchStop[],
    maxStops: number = MAX_STOPS,
    out?: Float32Array,
): Float32Array {
    const buf = out ?? new Float32Array(maxStops * 3);
    const n = Math.min(stops.length, maxStops);
    for (let i = 0; i < n; i++) {
        const [r, g, b] = oklchToLinear(stops[i]!);
        buf[i * 3 + 0] = r;
        buf[i * 3 + 1] = g;
        buf[i * 3 + 2] = b;
    }
    for (let i = n; i < maxStops; i++) {
        buf[i * 3 + 0] = 0;
        buf[i * 3 + 1] = 0;
        buf[i * 3 + 2] = 0;
    }
    return buf;
}

/**
 * Derive a cheap CSS `linear-gradient` from an Aurora palette — the static
 * first-frame placeholder painted under the WebGL canvas while the runtime
 * arms (see `useAurora`'s deferred init / Aurora.vue's placeholder element).
 *
 * The shader interpolates the same OKLCh stops in linear sRGB; here we render
 * each stop as a gamma-sRGB hex so the browser's gradient compositor produces
 * a visually-adjacent approximation with zero JS and zero GPU on first paint.
 * A diagonal axis (135deg) reads as atmospheric depth rather than a flat band.
 *
 * Single-stop palettes degrade to a flat fill; an empty palette yields
 * `transparent` so the placeholder is simply invisible (the canvas still
 * fades in over it once armed).
 */
export function paletteToCssGradient(stops: OklchStop[]): string {
    if (stops.length === 0) return "transparent";
    if (stops.length === 1) return oklchStopToHex(stops[0]!);
    const n = stops.length;
    const segments = stops.map((stop, i) => {
        const pct = Math.round((i / (n - 1)) * 100);
        return `${oklchStopToHex(stop)} ${pct}%`;
    });
    return `linear-gradient(135deg, ${segments.join(", ")})`;
}

export function hexToOklchStop(hex: string): OklchStop {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const [L, a, bch] = srgbToOKLab(r / 255, g / 255, b / 255);
    const [Lo, C, H] = rawOklabToOklch(L, a, bch);
    return { L: Lo, C, h: H };
}

/**
 * Harmony schemes for {@link deriveAurora}. Each maps the seed hue onto the
 * derived stops differently:
 * - `analogous` — the ramp walks the seed hue ± a small spread (neighbouring
 *   hues; the painterly default).
 * - `complementary` — stops split between the seed hue and its opposite (+180°).
 * - `triad` — stops distributed across the seed hue and its two 120° partners.
 * - `monochrome` — every stop holds the seed hue; only L and C travel.
 */
export type AuroraHarmony =
    | "analogous"
    | "complementary"
    | "triad"
    | "monochrome";

export interface DeriveAuroraOptions {
    /** Number of stops to produce. Default 4; clamped to [2, MAX_STOPS]. */
    stopCount?: number;
    /** Hue scheme across the ramp. Default "analogous". */
    harmony?: AuroraHarmony;
    /** Total L travel across the ramp, in OKLCh L units. Default ~0.32. */
    lightnessSpread?: number;
    /** C multiplier at the pale apex (toward 1 = no falloff). Default ~0.85. */
    chromaFalloff?: number;
    /** Hue walk in degrees for analogous; ignored by monochrome. Default ~28. */
    hueSpread?: number;
}

/**
 * Painterly L band — a deep base, a near-white atmospheric apex. The derived L
 * ramp is clamped into this window so no stop reads as pure black or blown white,
 * matching the authored presets' "deep → cream" shape.
 */
const DERIVE_L_BAND: readonly [number, number] = [0.35, 0.95];

/**
 * Seed ONE color into a harmonious, gamut-safe N-stop aurora palette.
 *
 * A thin COMPOSING producer over the shipped value.js Ottosson core (inv J-10:
 * no color math is re-implemented here). The seed's `{L,C,h}` is the anchor; the
 * ramp spreads L across a painterly band, falls C off toward the pale apex, and
 * walks the hue per `harmony`. EVERY derived stop is gamut-mapped through
 * value.js's `gamutMapOKLab` so none falls outside sRGB.
 *
 * Deterministic and DOM-free (SSR / happy-dom safe — `cssToOklch` is the only
 * string path and it parses via value.js, not a canvas). The returned length is
 * clamped to `[2, MAX_STOPS]`; L is monotonic ascending across the ramp.
 *
 * @param seed any CSS color string OR an `OklchStop` anchor.
 * @param options ramp shape — stop count, harmony, L/C/h spreads.
 */
export function deriveAurora(
    seed: string | OklchStop,
    options: DeriveAuroraOptions = {},
): OklchStop[] {
    const anchor: OklchStop = typeof seed === "string" ? cssToOklch(seed) : seed;

    const {
        stopCount = 4,
        harmony = "analogous",
        lightnessSpread = 0.32,
        chromaFalloff = 0.85,
        hueSpread = 28,
    } = options;

    const n = Math.max(2, Math.min(MAX_STOPS, Math.round(stopCount)));
    const [lMin, lMax] = DERIVE_L_BAND;

    // L ramp: spread the anchor L symmetrically by lightnessSpread, then clamp the
    // window into the painterly band. The window is shifted (not squashed) when an
    // edge clamps so the total travel is preserved where the band allows.
    let lLow = anchor.L - lightnessSpread / 2;
    let lHigh = anchor.L + lightnessSpread / 2;
    if (lLow < lMin) {
        lHigh += lMin - lLow;
        lLow = lMin;
    }
    if (lHigh > lMax) {
        lLow -= lHigh - lMax;
        lHigh = lMax;
    }
    lLow = Math.max(lMin, lLow);
    lHigh = Math.min(lMax, lHigh);

    const stops: OklchStop[] = [];
    for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0 : i / (n - 1); // 0 = deep base, 1 = pale apex

        const L = lLow + (lHigh - lLow) * t;

        // C falls off toward the apex: full anchor chroma at the base, scaled by
        // chromaFalloff at the pale top (pale tops read atmospheric, not neon).
        const C = anchor.C * (1 - (1 - chromaFalloff) * t);

        const h = deriveHue(anchor.h, harmony, hueSpread, t);

        stops.push(gamutMapStop({ L, C, h }));
    }
    return stops;
}

/** Hue per harmony, walked across the ramp parameter `t` (0..1). */
function deriveHue(
    anchorHue: number,
    harmony: AuroraHarmony,
    hueSpread: number,
    t: number,
): number {
    const wrap = (h: number) => ((h % 360) + 360) % 360;
    switch (harmony) {
        case "monochrome":
            return wrap(anchorHue);
        case "complementary":
            // Lerp from the anchor hue toward its opposite across the ramp.
            return wrap(anchorHue + 180 * t);
        case "triad":
            // Distribute across anchor → +120 → +240 along the ramp.
            return wrap(anchorHue + 240 * t);
        case "analogous":
        default:
            // Walk the anchor hue across ±hueSpread (centred on the anchor).
            return wrap(anchorHue + hueSpread * (t - 0.5) * 2);
    }
}

/**
 * Gamut-map one OklchStop through value.js's Ottosson core
 * (`rawOklchToOklab → gamutMapOKLab → rawOklabToOklch`). Hue is preserved exactly
 * by the adaptive-L0 strategy; the result is in-sRGB to the rendering pipeline's
 * tolerance.
 *
 * `gamutMapOKLab` maps onto the gamut HULL — analytically in-gamut, but the
 * boundary point lands EXACTLY on a sRGB face, where the OKLCh round-trip's float
 * error can push a channel a hair past [0,1] for a neon/near-primary seed
 * (`#00ff00`, `#0000ff`, …). Two distinct escapes:
 *
 *  - OVER-1 overshoot (a channel > 1) — the dangerous one: the bake path
 *    (`oklchToLinear`) lower-clamps with `Math.max(0,·)` but does NOT cap the top,
 *    so an uncorrected overshoot would reach the GPU. A bounded inward-chroma
 *    nudge clears every over-1 escape (verified 0 over-1 across the neon × harmony
 *    matrix); hue and L are untouched, chroma shrinks ≤ ~0.6% (imperceptible).
 *  - sub-1.1e-4 NEGATIVE residual (a channel < 0 by ≤ 0.027/255) — irreducible
 *    float noise of the hull placement on deep blues; chroma-shrink cannot move
 *    it (it is L/face-direction, not chroma-direction). It is below perception
 *    AND the bake's `Math.max(0,·)` wrap already clamps it, so it never paints.
 *
 * The loop breaks the instant the stop reads strictly in-gamut; the 6-step cap
 * bounds the negative-residual case (which never converges) so this stays O(1).
 */
function gamutMapStop(stop: OklchStop): OklchStop {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [Lm, am, bm] = gamutMapOKLab(L, a, b);
    const [Lo, C, H] = rawOklabToOklch(Lm, am, bm);
    let safeC = C;
    for (let k = 0; k < 6; k++) {
        const [lx, ax, bx] = rawOklchToOklab(Lo, safeC, H);
        const [lr, lg, lb] = oklabToLinearSRGB(lx, ax, bx);
        if (isInSRGBGamut(lr, lg, lb)) break;
        safeC *= 0.999; // pull chroma 0.1% inward — hue/L preserved
    }
    return { L: Lo, C: safeC, h: H };
}
