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
    convertColor,
    interpolateHue,
    mapColorToGamut,
    toRgba8,
    type HueInterpolationMethod,
} from "@mkbabb/value.js/color";
import {
    colorValue,
    numericChannel,
    oklchColor,
    opaqueCssColor,
} from "./value";

/** An OKLCh color stop. `L` 0..1, `C` 0..~0.4, `h` 0..360. */
export interface OklchStop {
    L: number;
    C: number;
    h: number;
}

/**
 * A color seam: resolves a CSS color string to a GAMMA-sRGB triple in [0,1].
 * `defaultBlobColorResolver` is the shipped default. A general-purpose injection
 * type — the `<FourierField>` background takes it as a REQUIRED `colorResolver`
 * prop (the SVG-field surface owns its own color pipeline). The goo-blob no longer
 * injects it: it resolves color internally through `cssToOklch → oklchToGammaRgb`
 * (W-BLOB3 STRIPPED the speculative DI built for an absent value.js consumer that
 * never repatriated).
 */
export type ColorResolver = (css: string) => [number, number, number];

/**
 * OKLCh stop → LINEAR-sRGB in [0,1] — aurora's bundle-canonical bake target (the
 * shader ACES-tonemaps in linear, so the LUT stays linear).
 *
 * value.js's canonical `oklch → convertColor(…, "srgb-linear")` path. The
 * `Math.max(0,·)` wrap is the ACES-in-linear contract — value.js
 * does not clamp negative linear (an out-of-gamut stop yields negatives; the wrap
 * keeps them off the GPU). The equivalence canary asserts the COMPOSED path.
 */
export function oklchToLinear(stop: OklchStop): [number, number, number] {
    const converted = colorValue(
        "oklchToLinear",
        convertColor(oklchColor(stop), "srgb-linear"),
    );
    const [r, g, b] = converted.channels;
    const lr = numericChannel(r, "oklchToLinear");
    const lg = numericChannel(g, "oklchToLinear");
    const lb = numericChannel(b, "oklchToLinear");
    return [Math.max(0, lr), Math.max(0, lg), Math.max(0, lb)];
}

/**
 * Warm-white catch-light → LINEAR-sRGB triple (AX.W11). The OKLCh-principled light
 * tint the painterly relight (aurora's impasto sheen, the blob's `warmCream`) adds
 * in LINEAR light — one shared OKLCh derivation both surfaces' light models route
 * through instead of an eyeballed sRGB-ish literal. Just `oklchToLinear({L,C,h})`
 * with a self-documenting name (the warm-light/cool-shadow temperature-coupling rule
 * the literature prescribes is "the catch-light is a warm, near-white OKLCh anchor").
 *
 * Aurora's default anchor is `(0.985, 0.0125, 77.5°)` — the OKLCh anchor that
 * reproduces the prior eyeballed `[1.0, 0.95, 0.88]` warm-white to <1e-3 linear (so
 * the live relight reads identically; the seam fix is invisible to the eye). The
 * blob's `warmCream` anchor is `(0.97, 0.03, 85°)` — a deeper, more-saturated cream;
 * W15 re-routes the blob default through THIS helper at that anchor (the cross-surface
 * unification: ONE OKLCh derive, each surface its own principled anchor).
 *
 * An invalid (non-finite) anchor THROWS — a library-internal contract violation, not
 * a silent grey return (the fail-explicit precept; a stale anchor must surface loud).
 */
export function warmCatchLight(
    L: number,
    C: number,
    hDeg: number,
): [number, number, number] {
    if (!Number.isFinite(L) || !Number.isFinite(C) || !Number.isFinite(hDeg)) {
        throw new Error(
            `warmCatchLight: non-finite OKLCh anchor (L=${L}, C=${C}, h=${hDeg})`,
        );
    }
    return oklchToLinear({ L, C, h: hDeg });
}

/**
 * OKLCh stop → GAMMA-sRGB in [0,1] — the blob's faithful-lift exit (DEC-AT-7's W7
 * GAMMA space). value.js's `toRgba8` returns clipped gamma-encoded 0..255; divide
 * to [0,1]. The blob's default resolver returns THIS space
 * so the W7 lift paints at parity (the LINEAR shader-quality flip + `linearToSrgb`
 * is the AU.W7 stage). Channels are clamped to [0,1] (an out-of-gamut stop is
 * already gamut-mapped upstream; this is the float-edge guard).
 */
export function oklchToGammaRgb(stop: OklchStop): [number, number, number] {
    const [r, g, b] = colorValue(
        "oklchToGammaRgb",
        toRgba8(oklchColor(stop), { gamut: "clip" }),
    );
    return [r / 255, g / 255, b / 255];
}

/**
 * Resolve any CSS color string to an OKLCh stop via value.js's parser — the single
 * canonical core (inv-K-2). DOM-free (SSR / happy-dom safe — no 1×1-canvas).
 *
 * Invalid, contextual, and non-opaque inputs throw one `GlassColorError` carrying
 * the parser diagnostics or the named local alpha failure. No catch-to-default
 * recovery occurs at this boundary.
 */
export function cssToOklch(css: string): OklchStop {
    const converted = colorValue(
        "cssToOklch",
        convertColor(opaqueCssColor(css, "cssToOklch"), "oklch"),
    );
    const [L, C, h] = converted.channels;
    const chroma = numericChannel(C, "cssToOklch");
    return {
        L: numericChannel(L, "cssToOklch"),
        C: chroma,
        // Hue is powerless for an achromatic color. Value represents that truth
        // as `none`; the numeric renderer projection canonically seats it at 0°.
        h: h === "none" && Math.abs(chroma) <= 1e-12
            ? 0
            : numericChannel(h, "cssToOklch"),
    };
}

/** OKLCh stop → `#rrggbb` gamma hex through value.js `toRgba8`. */
export function oklchStopToHex(s: OklchStop): string {
    const [r, g, b] = colorValue(
        "oklchStopToHex",
        toRgba8(oklchColor(s), { gamut: "clip" }),
    );
    const hex = (value: number) => value.toString(16).padStart(2, "0");
    return `#${hex(r)}${hex(g)}${hex(b)}`;
}

/**
 * The shipped default `ColorResolver` — `(css) => gamma [r,g,b]` via
 * `cssToOklch → oklchToGammaRgb` (the GAMMA exit; `proof:blob-space-gamma` witnesses
 * the `oklchToGammaRgb` resolve). The `<FourierField>` background passes THIS as its
 * `colorResolver` prop. The goo-blob inlines this exact body internally (W-BLOB3 —
 * no DI seam).
 */
export const defaultBlobColorResolver: ColorResolver = (css) =>
    oklchToGammaRgb(cssToOklch(css));

// ── Shared harmony vocabulary (AW.W11.b hoist) ───────────────────────────────
//
// The hue-scheme vocabulary aurora's `deriveAurora` and the blob's
// `deriveBlobPalette` BOTH consume — hoisted to the `/color` leaf so the two
// surfaces derive from ONE source (no second divergent `deriveHue`/`gamutMapStop`;
// `proof:single-color-core` keeps the math on value.js). Aurora re-exports this as
// `AuroraHarmony` for surface preservation (the prior name); the blob consumes
// `ColorHarmony` directly.

/**
 * Harmony schemes for the OKLCh palette derivers. Each maps the seed hue onto the
 * derived stops differently:
 * - `analogous` — neighbouring hues (seed ± a small spread).
 * - `complementary` — seed → +180° along the LONG arc (stays saturated; the short
 *   arc cuts through grey on a warm→cool pair).
 * - `split-complementary` — the two hues flanking the complement (±150/210).
 * - `triad` — seed + its two 120° partners.
 * - `tetradic` — seed + the three 90° partners.
 * - `monochrome` — every stop holds the seed hue; only L and C travel.
 */
export type ColorHarmony =
    | "analogous"
    | "complementary"
    | "split-complementary"
    | "triad"
    | "tetradic"
    | "monochrome";

/** The harmony → value.js HueInterpolationMethod arc map (verified against the enum). */
const HARMONY_METHOD: Record<ColorHarmony, HueInterpolationMethod> = {
    // `longer` keeps the long arc saturated (the short arc greys a warm→cool pair).
    complementary: "longer",
    "split-complementary": "longer",
    analogous: "shorter",
    monochrome: "shorter",
    triad: "increasing",
    tetradic: "increasing",
};

const wrapDeg = (h: number) => ((h % 360) + 360) % 360;

/**
 * Hue per harmony, walked across the ramp parameter `t` (0..1) THROUGH value.js's
 * degree-domain `interpolateHue`. The single canonical hue-walk both backdrops
 * consume.
 */
export function deriveHue(
    anchorHue: number,
    harmony: ColorHarmony,
    hueSpread: number,
    t: number,
): number {
    const method = HARMONY_METHOD[harmony];
    const arc = (h0: number, h1: number): number =>
        wrapDeg(
            colorValue(
                "deriveHue",
                interpolateHue(wrapDeg(h0), wrapDeg(h1), t, method),
            ),
        );
    switch (harmony) {
        case "monochrome":
            return wrapDeg(anchorHue);
        case "complementary":
            return arc(anchorHue, anchorHue + 180);
        case "split-complementary":
            return arc(anchorHue + 150, anchorHue + 210);
        case "triad":
            return arc(anchorHue, anchorHue + 240);
        case "tetradic":
            return arc(anchorHue, anchorHue + 270);
        case "analogous":
        default:
            return arc(anchorHue - hueSpread, anchorHue + hueSpread);
    }
}

/**
 * Gamut-map one OklchStop through value.js's final-object `mapColorToGamut`.
 * The single gamut-mapper both backdrops use.
 */
export function gamutMapStop(stop: OklchStop): OklchStop {
    const mapped = colorValue(
        "gamutMapStop",
        mapColorToGamut(oklchColor(stop), "srgb"),
    );
    const [L, C, h] = mapped.channels;
    return {
        L: numericChannel(L, "gamutMapStop"),
        C: numericChannel(C, "gamutMapStop"),
        h: numericChannel(h, "gamutMapStop"),
    };
}

/** Tuning for {@link deriveBlobPalette}. */
export interface DeriveBlobPaletteOptions {
    /** Number of stops to produce. Default 3; clamped to [2, 4]. */
    stopCount?: number;
    /** Hue scheme across the stops. Default `analogous`. */
    harmony?: ColorHarmony;
    /** Total L travel across the stops, in OKLCh L units. Default ~0.18. */
    lightnessSpread?: number;
    /** Hue walk in degrees for analogous; ignored by monochrome. Default ~24. */
    hueSpread?: number;
    /** Midpoint chroma-bump (keeps a vivid pair off the grey midpoint). Default ~0.03. */
    chromaBump?: number;
    /**
     * AY.W-COHERE E1 — the OKLCh-chroma CEILING on every derived stop (OKLCh C
     * units). When set, each stop's chroma is clamped to AT MOST this value AFTER
     * the midpoint bump and BEFORE the gamut-map — so the seed→palette derivation
     * can never amplify a vivid seed into the neon register the shader's
     * SSS/iridescence then over-drives. This is a CHROMA CAP, not a hue re-map: a
     * blue seed stays blue, just bounded to the non-neon chroma. `undefined` (the
     * default) leaves the derivation byte-identical to HEAD. The blob substrate
     * caps the MOOD/seed path into the warm-register band the FourierField comet +
     * the constellation focal share (the set-cohesion accent identity).
     */
    chromaCeiling?: number;
    /**
     * BG.W-BLOB-SATELLITE-SHADE (F9.R1 — the `uSatColor[]` companion) — pin the BODY
     * stop's OKLCh lightness. The default ramp centres L on the seed
     * (`anchor.L - lightnessSpread/2` at the body, climbing `lightnessSpread` to the
     * lightest satellite). When set, the body stop (t=0) anchors at exactly this L and
     * the satellites still climb `lightnessSpread` from it — so a consumer picks the
     * body luminance directly (the deep-body read) without moving the seed hue/chroma.
     * `undefined` (the default) leaves the derivation byte-identical to HEAD.
     */
    bodyLightness?: number;
    /**
     * BG.W-BLOB-SATELLITE-SHADE (F9.R1) — the OKLCh-lightness FLOOR on every derived
     * stop. Replaces the hardcoded `0.05` low clamp, so a consumer guarantees no stop
     * reads darker than this (a body/satellite that never collapses toward black). The
     * `0.98` high clamp is untouched. `undefined` → the byte-identical `0.05` floor.
     */
    lightnessFloor?: number;
}

/**
 * Seed ONE color into a harmonious, gamut-safe 2-4-stop OKLCh palette for the blob
 * — the blob-side twin of `deriveAurora`, consuming the SHARED `ColorHarmony`
 * vocabulary (no forked `deriveHue`). The body takes the deepest/most-saturated
 * stop; satellites take the lighter in-family stops. Every stop is gamut-mapped.
 * Deterministic + DOM-free (SSR-safe; `cssToOklch` parses via value.js).
 *
 * @param seed any CSS color string OR an `OklchStop` anchor.
 * @param options stop count, harmony, spreads.
 */
export function deriveBlobPalette(
    seed: string | OklchStop,
    options: DeriveBlobPaletteOptions = {},
): OklchStop[] {
    const anchor: OklchStop = typeof seed === "string" ? cssToOklch(seed) : seed;
    const {
        stopCount = 3,
        harmony = "analogous",
        lightnessSpread = 0.18,
        hueSpread = 24,
        chromaBump = 0.03,
        chromaCeiling,
        bodyLightness,
        lightnessFloor,
    } = options;

    // BG.W-BLOB-SATELLITE-SHADE — the BODY-stop L anchor. When `bodyLightness` is set,
    // the body (t=0) sits at exactly that L; otherwise the ramp centres on the seed
    // (`anchor.L - lightnessSpread/2` — the byte-identical HEAD baseline, same eval order).
    const baseL = bodyLightness !== undefined ? bodyLightness : anchor.L - lightnessSpread / 2;
    // The low clamp (default 0.05, the HEAD floor) is the `lightnessFloor` knob.
    const lowClamp = lightnessFloor !== undefined ? lightnessFloor : 0.05;

    const n = Math.max(2, Math.min(4, Math.round(stopCount)));
    const stops: OklchStop[] = [];
    for (let i = 0; i < n; i++) {
        const t = n === 1 ? 0 : i / (n - 1); // 0 = deep body, 1 = lighter satellite
        const L = baseL + lightnessSpread * t;
        // Midpoint chroma-bump: a bell (peaks at t=0.5) keeps a vivid pair off grey.
        let C = Math.max(0, anchor.C + chromaBump * Math.sin(Math.PI * t));
        // AY.W-COHERE E1 — the warm-register chroma cap. Applied AFTER the bump,
        // BEFORE the gamut-map, so a vivid seed cannot be derived into the neon
        // band the shader then over-drives. Hue + L are untouched (a cap, not a
        // re-map). `undefined` → byte-identical to HEAD.
        if (chromaCeiling !== undefined) C = Math.min(C, chromaCeiling);
        const h = deriveHue(anchor.h, harmony, hueSpread, t);
        stops.push(gamutMapStop({ L: Math.min(0.98, Math.max(lowClamp, L)), C, h }));
    }
    return stops;
}

// ── BC.W-ACCENT-TONE — the contrast-floored tonal-accent register (JS ink half) ──
//
// `useAccentTone` is the sync value.js-FREE shell (BI.W-CHIP-FOLD) — the contrast-safe
// label ink ON the active band, value.js-QUARANTINED behind a dynamic
// `import('./accent-tone-solve')` boundary (the value.js math lives in the
// `accent-tone-solve` leaf, reached ONLY for a concrete tone; a `var()` / unset tone
// stays value.js-free). Re-exported from this `/color` leaf; the `<Chip>` that consumes
// it imports the SHELL MODULE DIRECTLY (`./useAccentTone`, not this barrel) so its `/chip`
// eager chunk stays value.js-free, and ships /chip ONLY (OFF the value.js-free root barrel
// — the SCC-trap discipline).
export { useAccentTone } from "./useAccentTone";
export type { UseAccentToneOptions, UseAccentToneReturn } from "./useAccentTone";
