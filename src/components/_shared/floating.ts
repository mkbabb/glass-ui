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

const RETIRED_FLOATING_ATTRS = new Set([
    "align-flip",
    "alignFlip",
    "arrow-padding",
    "arrowPadding",
    "as",
    "as-child",
    "asChild",
    "avoid-collisions",
    "avoidCollisions",
    "collision-boundary",
    "collision-padding",
    "collisionBoundary",
    "collisionPadding",
    "dir",
    "disable-outside-pointer-events",
    "disable-update-on-layout-shift",
    "disableOutsidePointerEvents",
    "disableUpdateOnLayoutShift",
    "force-mount",
    "forceMount",
    "hide-shifted-arrow",
    "hide-when-detached",
    "hideShiftedArrow",
    "hideWhenDetached",
    "memo-dependencies",
    "memoDependencies",
    "position-strategy",
    "positionStrategy",
    "prioritize-position",
    "prioritizePosition",
    "reference",
    "side-flip",
    "sideFlip",
    "sticky",
    "trap-focus",
    "trapFocus",
    "update-position-strategy",
    "updatePositionStrategy",
]);

/** Keep retired positioning/polymorphism props from surviving through `$attrs`. */
export function floatingContentAttrs(
    attrs: Readonly<Record<string, unknown>>,
): Record<string, unknown> {
    return Object.fromEntries(
        Object.entries(attrs).filter(([key]) => !RETIRED_FLOATING_ATTRS.has(key)),
    );
}
