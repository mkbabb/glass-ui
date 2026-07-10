// warm-field.ts — BG.W-FIELD-ACCENT-RECONCILE: the per-route WARM FIELD hue, a
// thin ADAPTER over the ONE warm-projection source (aurora-hero.ts).
//
// THE FOLD: this file once carried a verbatim parallel of aurora-hero.ts — its own
// `SECTION_HUE_DEG[13]` literal table, its own `projectWarm` body, its own
// `clampWarm`, and the dead `warmFieldHueMap` (0 consumers). All four are DELETED
// (clean break, no alias). The degree source is now `sectionHueDeg` (derived from
// SECTION_COLOR_OKLCH through `cssToOklch`) and the projection is `warmProjectHue` —
// both exported ONCE from aurora-hero.ts, so a hue re-tune is ONE edit and the
// chassis field hue + the hero specimen palettes read the SAME warm wedge.
//
// THE PURGE (the teal/navy bite) is preserved by construction: `warmProjectHue`
// folds every cool section degree into [25,95], so NO category's field is teal/navy.

import { categoryHue } from "./category-hero";
import { sectionHueDeg, warmProjectHue } from "./aurora-hero";

/** A field hue is runtime-guaranteed warm: a degree ∈ [25,95]. */
export type WarmHue = number;

/**
 * The per-route WARM field hue. Reads the category's section ramp index via the
 * ONE documented `categoryHue` source, looks up its degree via `sectionHueDeg`,
 * and warm-projects it into [25,95] via `warmProjectHue`. ONE adapter, ZERO local
 * color math — the single warm-projection source lives in aurora-hero.ts.
 */
export function warmFieldHue(categoryId: string): WarmHue {
    return warmProjectHue(sectionHueDeg(categoryHue(categoryId)));
}
