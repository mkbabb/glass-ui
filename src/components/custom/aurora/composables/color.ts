import type { OklchStop } from "../presets";
import { MAX_STOPS } from "../presets";

// inv-K-2 (value.js-K, K.W2c): the single canonical color core lives in
// value.js `src/units/color/`. glass-ui's aurora consumes the Ottosson
// OKLab/OKLCh/sRGB primitives from there — it does NOT re-implement them. The
// 8 byte-for-byte duplicates that lived here (srgbToOKLab, oklab<->oklch,
// oklab->linear/rgb255, css->rgb 1×1-canvas, …) are DELETED; the kept aurora
// helpers below re-source their math from value.js. A deleted symbol cannot
// duplicate; `__tests__/color-equivalence.test.ts` is the canary.
import {
    srgbToOKLab,
    oklabToLinearSRGB,
    oklabToRgb255,
    rawOklabToOklch,
    rawOklchToOklab,
    gamutMapOKLab,
    parseCSSColor,
    colorUnit2,
} from "@mkbabb/value.js";

/**
 * OKLCh stop to linear-sRGB in [0, 1] — bundle-canonical bake target.
 * The shader ACES-tonemaps in linear, so the LUT must stay linear.
 *
 * The OKLCh→linear math is value.js's canonical Ottosson path
 * (`rawOklchToOklab` → `oklabToLinearSRGB`, inv-K-2). The `Math.max(0, ·)` wrap
 * is aurora's OWN ACES-in-linear contract — value.js's `oklabToLinearSRGB` does
 * not clamp negative linear (an out-of-gamut stop yields negatives; the wrap
 * keeps them off the GPU). The equivalence test asserts the COMPOSED path.
 */
export function oklchToLinear(stop: OklchStop): [number, number, number] {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [lr, lg, lb] = oklabToLinearSRGB(L, a, b);
    return [Math.max(0, lr), Math.max(0, lg), Math.max(0, lb)];
}

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

export function oklchStopToHex(s: OklchStop): string {
    const [L, a, b] = rawOklchToOklab(s.L, s.C, s.h);
    const [r, g, bch] = oklabToRgb255(L, a, b);
    const toHex = (v: number) => Math.round(v).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(bch)}`;
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
 * Resolve any CSS color string to an OKLCh stop via value.js's parser — the
 * single canonical core (inv-K-2). Replaces the former 1×1-canvas `cssToRgb`
 * DOM trick, so this now works in SSR / happy-dom (no `document` required).
 *
 * Semantics differ from the old canvas path (which masked them): an INVALID
 * string THROWS (the canvas silently returned gray); ALPHA is dropped (OklchStop
 * has no alpha; the canvas blended against a gray pre-fill); out-of-gamut inputs
 * are NOT byte-clamped. Callers feeding user-supplied / possibly-transparent
 * strings should wrap in try/catch and decide an alpha policy.
 */
export function cssToOklch(css: string): OklchStop {
    // `parseCSSColor` returns a loosely-typed parse-mode ValueUnit whose channels
    // are themselves ValueUnits; the cast bridges it to `colorUnit2`'s param type
    // (the same idiom value.js's own demo uses), and `Number(...)` coerces each
    // parse-mode channel to the raw [0,1] sRGB number `srgbToOKLab` expects.
    const parsed = parseCSSColor(css) as Parameters<typeof colorUnit2>[0];
    const rgb = colorUnit2(parsed, "rgb").value;
    const [L, a, bch] = srgbToOKLab(Number(rgb.r), Number(rgb.g), Number(rgb.b));
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
 * (`rawOklchToOklab → gamutMapOKLab → rawOklabToOklch`) so the returned stop is
 * guaranteed in-sRGB. Hue is preserved exactly by the adaptive-L0 strategy.
 */
function gamutMapStop(stop: OklchStop): OklchStop {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);
    const [Lm, am, bm] = gamutMapOKLab(L, a, b);
    const [Lo, C, H] = rawOklabToOklch(Lm, am, bm);
    return { L: Lo, C, h: H };
}
