// warm-field.ts — BD.W-FIELD-SCRIPT (the per-route WARM FIELD hue, DERIVED).
//
// The warm colorful page FIELD (src/styles/paper.css `.paper-field`) reads ONE
// number per route: `--field-h ∈ [25,95]`. This file DERIVES that number from
// the EXISTING category-color source — it does NOT mint a third per-category
// color registry (a `Record<category,hue>` would violate DRY against the
// documented `categoryHue` / `CATEGORY_PALETTE_HUES` sources, §3 of the
// page-background WAVE-AMENDMENT).
//
// THE ONE SOURCE: `categoryHue(id)` (category-hero.ts) is the documented section
// ramp INDEX (1-12). The ramp's degree literals (`SECTION_COLOR_OKLCH`,
// aurora-hero.ts — the SAME data) are the hue values. `warmFieldHue` reads the
// section degree for a category and WARM-PROJECTS it into the field band [25,95].
//
// THE PURGE (the teal/navy bite): the cool categories — substrates (teal 222.8),
// forms (indigo 265.5), navigation (ocean 208.0), motion (periwinkle 291.9),
// containers (slate 239.6), data (purple 305.9) — would, raw, paint cool/navy
// fields the brief forbids. The warm projection FOLDS every section degree into
// [25,95] deterministically, so NO category's field is ever teal/navy. The clamp
// is also re-asserted at the PAINT layer (paper.css `clamp(25, …, 95)`), so even
// a hand-passed cool degree cannot paint cool — belt and suspenders.

import { categoryHue, CATEGORY_HERO } from "./category-hero";

/** A field hue is runtime-guaranteed warm: a degree ∈ [25,95]. */
export type WarmHue = number;

export const WARM_HUE_LO = 25;
export const WARM_HUE_HI = 95;

/** The section ramp hue DEGREES (tokens/color-radius.css §section-color, read AS
 *  DATA — the SAME degrees aurora-hero.ts parses; no re-rolled color math). The
 *  index matches `categoryHue(id)` (the `--section-color-N` ramp index). */
const SECTION_HUE_DEG: readonly number[] = [
    359.8, // 0  rose
    305.9, // 1  purple
    265.5, // 2  indigo
    222.8, // 3  teal-cyan
    171.1, // 4  forest
    69.6, //  5  amber
    30.4, //  6  tomato-red
    317.5, // 7  violet
    8.4, //   8  ruby
    239.6, // 9  slate-blue
    128.8, // 10 olive
    208.0, // 11 ocean
    291.9, // 12 periwinkle
];

/** Hard warm-clamp — a degree projected into [25,95]. The TYPE invariant: a cool
 *  field is unrepresentable through this function. */
export const clampWarm = (h: number): WarmHue =>
    Math.max(WARM_HUE_LO, Math.min(WARM_HUE_HI, h));

/**
 * Warm-PROJECT a raw color-wheel degree (0-360) into the warm field band
 * [25,95]. A monotone fold around the warm anchor (amber ~62) that keeps the
 * 12 categories DISTINCT while landing every one warm — the teal/navy hues
 * collapse toward terracotta/sand, never cool. Reds (<25 / >340) settle to the
 * coral floor; greens/teals/blues/violets map across the amber→sand span.
 */
function projectWarm(deg: number): WarmHue {
    // Normalize to [0,360).
    const h = ((deg % 360) + 360) % 360;
    // Reds (340-360 / 0-25) → the coral-terracotta floor (38) — feedback/dock/ruby.
    if (h >= 340 || h < 25) return 38;
    // The warm wedge (25-95) is already in band — pass through, lightly settled.
    if (h <= 95) return clampWarm(h);
    // Everything cool (95-340: green→teal→blue→violet→magenta) folds across the
    // warm span by its distance into the cool arc, so distinct cools stay distinct
    // warms but NONE can land in [180,270] teal/navy (they map to 45-88 amber→sand).
    const t = (h - 95) / (340 - 95); // 0 at green edge → 1 at magenta edge
    return clampWarm(WARM_HUE_LO + 20 + t * (WARM_HUE_HI - (WARM_HUE_LO + 20)));
}

/**
 * The per-route WARM field hue. Reads the category's section ramp index via the
 * ONE documented `categoryHue` source, looks up its degree, and warm-projects it
 * into [25,95]. ONE adapter, ZERO new color registry.
 */
export function warmFieldHue(categoryId: string): WarmHue {
    const idx = categoryHue(categoryId); // the section ramp index (the ONE source)
    const deg = SECTION_HUE_DEG[((idx % 13) + 13) % 13] ?? 62;
    return projectWarm(deg);
}

/** The full per-category warm-field map (derived, for the chassis + tests). */
export function warmFieldHueMap(): Record<string, WarmHue> {
    return Object.fromEntries(
        Object.keys(CATEGORY_HERO).map((id) => [id, warmFieldHue(id)]),
    );
}
