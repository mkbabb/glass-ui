import type { Placement } from "./axes";

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
