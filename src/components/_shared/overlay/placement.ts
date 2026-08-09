import type { Placement } from "../axes";

/**
 * The placement TYPES, and nothing else.
 *
 * This file is what is left of `_shared/floating.ts` after the 38-entry
 * retired-attribute denylist died (#19 W-SHIM-PURGE): four type
 * declarations that every portalled surface's props extend. It moves here
 * because the types belong beside the seam that consumes them
 * (`overlayContentAttrs`), not in a `_shared/` root that no longer has a
 * runtime half to justify its own file.
 */

/** Edge used to place floating content relative to its trigger. */
export type FloatingSide = Exclude<Placement, "center">;

/** Cross-axis alignment of floating content against its trigger. */
export type FloatingAlign = "start" | "center" | "end";

/** Placement controls intentionally shared by Glass floating surfaces. */
export interface FloatingPlacementProps {
    side?: FloatingSide;
    sideOffset?: number;
    align?: FloatingAlign;
    alignOffset?: number;
}
