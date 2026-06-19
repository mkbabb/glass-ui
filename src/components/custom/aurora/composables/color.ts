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
    deriveHue,
    gamutMapStop,
    oklchStopToHex,
    oklchToLinear,
    type ColorHarmony,
    type OklchStop,
} from "../../../../composables/color";
import {
    srgbToOKLab,
    rawOklabToOklch,
    interpolateHue,
} from "@mkbabb/value.js";

// Re-export the shared color core from the leaf (AU.W5 hoist — surface preserved).
export {
    cssToOklch,
    oklchStopToHex,
    oklchToLinear,
} from "../../../../composables/color";
export type { OklchStop } from "../../../../composables/color";

// AW.W11.b — the harmony vocabulary (deriveHue / gamutMapStop / the harmony union)
// is HOISTED to the `/color` leaf so the blob and aurora derive from ONE source
// (no second forked `deriveHue`/`gamutMapStop`). `AuroraHarmony` stays as the
// public alias of the shared `ColorHarmony` (surface preserved — no break).
export type { ColorHarmony } from "../../../../composables/color";

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
 * Harmony schemes for {@link deriveAurora} — the PUBLIC alias of the shared
 * `ColorHarmony` vocabulary hoisted to the `/color` leaf (AW.W11.b). The blob and
 * aurora derive from this ONE union; aurora keeps the `AuroraHarmony` name for
 * surface preservation. See `ColorHarmony` for the per-scheme semantics.
 */
export type AuroraHarmony = ColorHarmony;

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
    /**
     * BC.W-VIZ-AURORA (A7) — the additive DERIVE-path hue-EXCLUSION axis (the
     * speedtest-AX cross-repo fold). Named OKLCh hue bands (each `[startDeg, endDeg]`,
     * wrap-around supported via `start > end`) that EVERY derived stop's hue must fall
     * OUTSIDE. The mechanism that makes "teal-on-navy is GONE" enforceable in the DERIVE
     * path, not just the static default — a consumer deriving a palette FROM any seed
     * can never re-introduce a purged band (e.g. `avoidHues: [[170, 200]]` excludes the
     * teal arc by construction). The exclusion RE-ROUTES the walked hue to the nearest
     * band EDGE (preserving L/C — no chroma flatten); it is NOT a post-hoc desaturate.
     * Additive + default-unset → byte-identical derive (the `WarpMode`-additive-widen
     * precedent: `proof:aurora-atoms-roundtrip` stays GREEN by construction).
     */
    avoidHues?: readonly (readonly [number, number])[];
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
        lightnessEasing = "linear",
        chromaEasing = "bell",
        temperatureShift = 0,
        avoidHues,
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
        // Warm-light / cool-shadow: warm (toward WARM_POLE) as it lightens, cool
        // (toward COOL_POLE) as it darkens — interpolated toward the named poles.
        if (temperatureShift > 0) {
            h = applyTemperature(h, t, temperatureShift);
        }
        // BC.W-VIZ-AURORA (A7) — HONOR avoidHues: re-route the walked hue OUT of any
        // excluded band to the nearest band edge (L/C preserved — no chroma flatten).
        // The load-bearing half of the fold: the option is ACTED ON, not parsed-and-
        // dropped, so a derived ramp cannot land a stop inside a purged hue arc.
        if (avoidHues && avoidHues.length > 0) {
            h = routeHueOutOfBands(h, avoidHues);
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

/**
 * The named temperature poles (OKLCh hue degrees). The lights warm toward
 * `WARM_POLE` (orange); the shadows cool toward `COOL_POLE` (blue) — the single
 * most-cited painting rule. ONE retunable source: shift a pole here and the whole
 * warm/cool axis re-anchors. Previously the model was a blind ±degree nudge whose
 * comment NAMED these poles but never used them (the documented-model-≠-implementation
 * seam AX.W10 closes — the model IS the implementation now).
 */
const WARM_POLE = 70; // orange — the lit edge
const COOL_POLE = 250; // blue — the shadow

/**
 * The maximum hue THROW (degrees) toward a pole at full `amount=1` and the
 * t-extremes. The temperature coupling tints the hue TOWARD the named pole but the
 * throw is BOUNDED to this cap, so a hue near a pole moves the same perceptual
 * distance as a hue far from it (a symmetric warm/cool swing) and never snaps onto
 * the pole. 22° matches the prior ±22° throw — a regression-safe re-derivation that
 * keeps the warm-light/cool-shadow swing magnitude identical at the boundaries while
 * the DIRECTION now genuinely tracks the named poles.
 */
const TEMPERATURE_MAX_THROW = 22;

/**
 * Warm the lights, cool the shadows by stepping the hue TOWARD the named poles.
 * `t∈[0,1]` is the ramp position (0 = deep base/shadow, 1 = pale apex/light);
 * `amount∈[0,1]` is the coupling strength. The light end (t>0.5) steps toward
 * `WARM_POLE`, the shadow end (t<0.5) toward `COOL_POLE`, by up to
 * `|signed|·amount·MAX_THROW` degrees — so the documented poles ARE the model AND the
 * swing magnitude stays bounded + symmetric (the documented-model-IS-the-implementation
 * fix without a base-hue-dependent over-swing).
 */
function applyTemperature(h: number, t: number, amount: number): number {
    // -1 at the deep base (shadow), +1 at the pale apex (light); 0 at the mid (no shift).
    const signed = (t - 0.5) * 2;
    if (signed === 0 || amount === 0) return h;
    const pole = signed >= 0 ? WARM_POLE : COOL_POLE;
    // The toward-pole SHORTER-arc direction (value.js owns the cylindrical hue math):
    // a tiny step toward the pole reveals the signed direction without a hand-rolled wrap.
    const toward = interpolateHue(h, pole, 1, "shorter");
    const signedArc = ((toward - h + 540) % 360) - 180; // [-180, 180], toward the pole
    const dir = Math.sign(signedArc);
    // Bounded throw: never overshoot the pole, never exceed MAX_THROW.
    const throwDeg = Math.min(
        Math.abs(signed) * amount * TEMPERATURE_MAX_THROW,
        Math.abs(signedArc),
    );
    return ((h + dir * throwDeg) % 360 + 360) % 360;
}

const wrap360 = (h: number): number => ((h % 360) + 360) % 360;

/** True iff hue `h` (deg) is INSIDE the band `[start, end]` (wrap-around if start > end). */
function hueInBand(h: number, start: number, end: number): boolean {
    const hh = wrap360(h);
    const s = wrap360(start);
    const e = wrap360(end);
    return s <= e ? hh >= s && hh <= e : hh >= s || hh <= e;
}

/** The shorter cyclic angular distance between two hues (deg, always ≥ 0). */
function hueDist(a: number, b: number): number {
    const d = Math.abs(wrap360(a) - wrap360(b)) % 360;
    return d > 180 ? 360 - d : d;
}

/**
 * BC.W-VIZ-AURORA (A7) — re-route a hue OUT of any excluded band to the nearest band
 * EDGE (a tiny ε past the boundary so the in-band test is strictly false). L/C are
 * untouched (no chroma flatten). Iterated a bounded number of passes so an exit from
 * one band that lands inside an adjacent band re-routes again; the loop terminates (the
 * bands are finite + each move strictly exits the band it was in). If the excluded set
 * covers the whole wheel (a degenerate config) the loop bails and returns the last hue.
 */
function routeHueOutOfBands(
    h: number,
    bands: readonly (readonly [number, number])[],
): number {
    const EPS = 0.5; // a half-degree past the edge — strictly outside the band test
    let hue = wrap360(h);
    for (let pass = 0; pass < bands.length + 2; pass++) {
        let moved = false;
        for (const [start, end] of bands) {
            if (!hueInBand(hue, start, end)) continue;
            // Move to whichever band edge is the shorter cyclic distance away, ε past it.
            const lowEdge = wrap360(start - EPS);
            const highEdge = wrap360(end + EPS);
            hue = hueDist(hue, lowEdge) <= hueDist(hue, highEdge) ? lowEdge : highEdge;
            moved = true;
        }
        if (!moved) return hue; // outside every band — done
    }
    return hue; // bailed (degenerate full-wheel exclusion) — return the best effort
}

// `deriveHue` + `gamutMapStop` are HOISTED to the `/color` leaf (AW.W11.b) and
// imported above — aurora and the blob derive from ONE source (no forked copies).
//
// AX.W10 — the dead second seed→whole-scene door (the prior mood-word config
// derive + its own mood union + recipe table + duplicated thirds prior) is DELETED
// (zero non-test consumers; the converged `resolveAtoms` door in `atoms.ts` is the
// ONE consumer-facing surface). The only unique value it carried — the
// mood→medium/temperature/chroma coupling — folds into the surviving door's COLOR
// atom (`resolveAtoms`'s colorEnergy → temperatureShift on the palette derive). The
// rule-of-thirds nuclei prior is single-sourced at ONE home (`nucleiPrior` in
// `atoms.ts`).
