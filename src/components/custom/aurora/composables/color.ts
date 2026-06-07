import {
    MAX_STOPS,
    DEFAULT_AURORA_CONFIG,
    type AuroraConfig,
} from "../constants/presets";

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
    interpolateHue,
    type HueInterpolationMethod,
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
    // fail-explicit: optional out-buffer, not a masking default — `out` is an
    // explicitly OPTIONAL reuse buffer; allocating one when absent is the
    // documented contract, not synthesis of a required dependency.
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
 * - `complementary` — stops travel from the seed hue toward its opposite (+180°)
 *   along the LONG arc (keeps the ramp saturated; the short arc cuts through grey
 *   on a warm→cool pair — the muddy-midtone defect).
 * - `split-complementary` — anchor + the two hues flanking the complement (±150/210).
 * - `triad` — stops distributed across the seed hue and its two 120° partners.
 * - `tetradic` — anchor + the three 90° partners (90/180/270).
 * - `monochrome` — every stop holds the seed hue; only L and C travel.
 */
export type AuroraHarmony =
    | "analogous"
    | "complementary"
    | "split-complementary"
    | "triad"
    | "tetradic"
    | "monochrome";

/**
 * Eased L/C journey shapes for the derived ramp. `bell` (the W5 default for chroma)
 * peaks the chroma in the mids and desaturates the extremes — the painterly
 * "saturated body, calm edges" curve. `linear` is the prior monotone falloff
 * (the named pre-W5 branch — NOT a back-compat alias, a first-class choice).
 */
export type DeriveEasing = "linear" | "sine" | "bell";

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
    /** L-ramp easing across the band. Default `linear` (monotone ascent). */
    lightnessEasing?: DeriveEasing;
    /** C-ramp easing. Default `bell` (peak in the mids — the W5 painterly default). */
    chromaEasing?: DeriveEasing;
    /**
     * Warm-light / cool-shadow temperature coupling (0..1). A hue delta that warms
     * the lights and cools the shadows — the single most-cited painting rule, the
     * fold that makes the oil/oil-pastel mediums read as mixed paint. Default 0.
     */
    temperatureShift?: number;
}

/** The harmony → value.js HueInterpolationMethod arc map. Verified against the enum. */
const HARMONY_METHOD: Record<AuroraHarmony, HueInterpolationMethod> = {
    // `longer` keeps the long arc saturated (the short arc greys a warm→cool pair).
    complementary: "longer",
    "split-complementary": "longer",
    analogous: "shorter",
    monochrome: "shorter",
    triad: "increasing",
    tetradic: "increasing",
};

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
        lightnessEasing = "linear",
        chromaEasing = "bell",
        temperatureShift = 0,
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

        // L: eased ascent across the band. `linear` is the monotone ascent; `sine`
        // softens the ends; `bell` peaks the mid-L.
        const L = lLow + (lHigh - lLow) * easeRamp(t, lightnessEasing);

        // C: the eased chroma journey. `bell` (the W5 default) peaks the chroma in
        // the mids and desaturates the extremes; `linear`/`sine` fall off toward the
        // apex per `chromaFalloff` (the named pre-W5 monotone falloff).
        const cTop = anchor.C * chromaFalloff;
        let C: number;
        if (chromaEasing === "bell") {
            // Peak the chroma in the mids; the extremes read calm. `chromaFalloff`
            // sets the floor at both ends relative to the anchor.
            C = cTop + (anchor.C - cTop) * bell(t);
        } else {
            const e = chromaEasing === "sine" ? easeRamp(t, "sine") : t;
            C = anchor.C - (anchor.C - cTop) * e;
        }

        let h = deriveHue(anchor.h, harmony, hueSpread, t);
        // Warm-light / cool-shadow: warm (toward ~70°, orange) as it lightens, cool
        // (toward ~250°, blue) as it darkens. A signed nudge centred on the mid.
        if (temperatureShift > 0) {
            h = applyTemperature(h, t, temperatureShift);
        }

        stops.push(gamutMapStop({ L, C, h }));
    }
    return stops;
}

/** Eased ramp 0..1 → 0..1. `bell` is handled separately (a chroma-only curve). */
function easeRamp(t: number, easing: DeriveEasing): number {
    if (easing === "sine") return 0.5 - 0.5 * Math.cos(Math.PI * t);
    // `linear` and `bell` (which uses bell() for C, easeRamp linear for L) → identity.
    return t;
}

/** Bell curve peaking at t=0.5 (1.0 at the centre, 0 at the ends). */
function bell(t: number): number {
    return Math.sin(Math.PI * t);
}

/** Warm the lights, cool the shadows by a signed hue nudge centred on the mid. */
function applyTemperature(h: number, t: number, amount: number): number {
    const wrap = (x: number) => ((x % 360) + 360) % 360;
    // -1 at the deep base, +1 at the pale apex.
    const signed = (t - 0.5) * 2;
    // Warm pole ~70° (orange), cool pole ~250° (blue) — nudge toward warm as t→1.
    const delta = signed * amount * 22; // up to ~22° of warm/cool swing
    return wrap(h + delta);
}

/**
 * Hue per harmony, walked across the ramp parameter `t` (0..1) THROUGH value.js's
 * `interpolateHue` in the NORMALIZED-TURNS domain (`/360` in, `*360` out — value.js
 * takes turns [0,1], NOT degrees; passing degrees silently misbehaves because the
 * `.5` short-arc threshold is a half-TURN). The harmony→method map is FIXED:
 * `complementary`/`split-complementary` use `longer` (long arc, stays saturated);
 * `analogous`/`monochrome` use `shorter`; `triad`/`tetradic` use `increasing`.
 */
function deriveHue(
    anchorHue: number,
    harmony: AuroraHarmony,
    hueSpread: number,
    t: number,
): number {
    const wrap = (h: number) => ((h % 360) + 360) % 360;
    const method = HARMONY_METHOD[harmony];
    // value.js interpolateHue takes turns; `arc(h0,h1)` lerps the anchor→target arc.
    const arc = (h0: number, h1: number): number =>
        wrap(interpolateHue(wrap(h0) / 360, wrap(h1) / 360, t, method) * 360);
    switch (harmony) {
        case "monochrome":
            return wrap(anchorHue);
        case "complementary":
            // Travel from the anchor toward its opposite along the LONG arc.
            return arc(anchorHue, anchorHue + 180);
        case "split-complementary":
            // Anchor → one of the complement flanks (±150 from anchor = 30 off comp).
            return arc(anchorHue + 150, anchorHue + 210);
        case "triad":
            // Distribute across anchor → +120 → +240 along the increasing arc.
            return arc(anchorHue, anchorHue + 240);
        case "tetradic":
            // Anchor → +90 → +180 → +270 along the increasing arc.
            return arc(anchorHue, anchorHue + 270);
        case "analogous":
        default:
            // Walk the anchor hue across ±hueSpread (centred on the anchor).
            return arc(anchorHue - hueSpread, anchorHue + hueSpread);
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

// ── deriveScene — one seed + a mood word → a whole AuroraConfig (W5) ──────────

/** Atmospheric mood words for {@link deriveScene}. */
export type AuroraMood = "atmospheric" | "painterly" | "vivid" | "muted";

/**
 * A nuclei layout on a rule-of-thirds / golden prior — deterministic placement
 * for `count` nuclei (NOT centred), so a derived scene reads as a composed field.
 */
function thirdsNuclei(count: number): AuroraConfig["nuclei"] {
    const T = [0.33, 0.67];
    // The golden-prior anchor points, walked deterministically.
    const anchors: [number, number][] = [
        [T[0]!, T[0]!],
        [T[1]!, T[1]!],
        [T[1]!, T[0]!],
        [T[0]!, T[1]!],
        [0.5, 0.5],
        [0.5, T[0]!],
    ];
    const n = Math.max(1, Math.min(anchors.length, count));
    return Array.from({ length: n }, (_, i) => {
        const [x, y] = anchors[i]!;
        return {
            x,
            y,
            radius: 0.5,
            paletteBias: n === 1 ? 0 : i / (n - 1),
            valueBias: (i % 2 === 0 ? 1 : -1) * 0.05,
            driftRadius: 0.045,
            driftPhase: (i * 2.4) % (Math.PI * 2),
        };
    });
}

interface MoodRecipe {
    harmony: AuroraHarmony;
    medium: AuroraConfig["medium"];
    temperatureShift: number;
    chromaEasing: DeriveEasing;
    saturation: number;
    warpAmount: number;
    valueVariance: number;
    breathDepth: number;
    zones: number;
}

const MOOD_RECIPE: Record<AuroraMood, MoodRecipe> = {
    atmospheric: {
        harmony: "analogous",
        medium: "smooth",
        temperatureShift: 0.3,
        chromaEasing: "bell",
        saturation: 0.95,
        warpAmount: 0.55,
        valueVariance: 0.08,
        breathDepth: 0.06,
        zones: 2,
    },
    painterly: {
        harmony: "split-complementary",
        medium: "oil",
        temperatureShift: 0.6,
        chromaEasing: "bell",
        saturation: 1.05,
        warpAmount: 0.45,
        valueVariance: 0.12,
        breathDepth: 0.04,
        zones: 3,
    },
    vivid: {
        harmony: "triad",
        medium: "watercolor",
        temperatureShift: 0.2,
        chromaEasing: "linear",
        saturation: 1.2,
        warpAmount: 0.5,
        valueVariance: 0.14,
        breathDepth: 0.05,
        zones: 3,
    },
    muted: {
        harmony: "monochrome",
        medium: "pastel",
        temperatureShift: 0.15,
        chromaEasing: "bell",
        saturation: 0.78,
        warpAmount: 0.4,
        valueVariance: 0.06,
        breathDepth: 0.03,
        zones: 2,
    },
};

/**
 * Seed ONE color + a mood word into a WHOLE `AuroraConfig` — palette (via
 * `deriveAurora`), nuclei layout (a rule-of-thirds/golden prior), medium, and the
 * motion/output knobs the mood implies. A SUPERSET front door over `deriveAurora`:
 * a consumer hands a seed + `"painterly"` and gets a coherent backdrop, not just a
 * palette. The base is the wispy-sky `DEFAULT_AURORA_CONFIG` (every field the mood
 * does not touch stays the library default).
 */
export function deriveScene(
    seed: string | OklchStop,
    mood: AuroraMood = "atmospheric",
): AuroraConfig {
    const r = MOOD_RECIPE[mood];
    const palette = deriveAurora(seed, {
        harmony: r.harmony,
        temperatureShift: r.temperatureShift,
        chromaEasing: r.chromaEasing,
        stopCount: 4,
    });
    return {
        ...DEFAULT_AURORA_CONFIG,
        palette,
        nuclei: thirdsNuclei(r.zones),
        medium: r.medium,
        saturation: r.saturation,
        warpAmount: r.warpAmount,
        valueVariance: r.valueVariance,
        breathDepth: r.breathDepth,
    };
}
