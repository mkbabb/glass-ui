// Per-route warm-field hue. `aurora-hero.ts` owns both the section degree source and
// warm projection, so chassis fields and hero specimens share the same [25, 95]° wedge.

import { categoryHue } from "./category-hero";
import { sectionHueDeg, warmProjectHue } from "./aurora-hero";

/** A field hue is runtime-guaranteed warm: a degree ∈ [25,95]. */
export type WarmHue = number;

/**
 * The per-route WARM field hue. Reads the category's section ramp index via the
 * documented `categoryHue` source, looks up its degree via `sectionHueDeg`, and
 * projects it into [25,95] via `warmProjectHue`. This adapter owns no color math.
 */
export function warmFieldHue(categoryId: string): WarmHue {
    return warmProjectHue(sectionHueDeg(categoryHue(categoryId)));
}
