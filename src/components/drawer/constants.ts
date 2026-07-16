// Shared Drawer constants. The snap engine and DI context import these values so
// each motion authority and context label has one definition.

import type { DrawerDirection } from "./index";

/**
 * The Drawer snap spring authority. `SpringProgress` uses this response and damping
 * pair to drive `--glass-drawer-t`; the measured band gives a brisk arrival with
 * about 1.5% overshoot. Fling selection remains a separate velocity decision.
 */
export const DRAWER_SNAP = { response: 0.32, dampingFraction: 0.8 } as const;

/**
 * Peek/half/full detents used by live-behind bottom and top sheets when the
 * consumer supplies no `snapPoints`. Side drawers use a full slide with no detents;
 * `resolveDefaultSnapPoints` therefore returns `[]` for either side axis.
 */
export const BOTTOM_SHEET_LADDER: readonly number[] = [0.12, 0.5, 1];

/**
 * Resolve the live-behind default snap ladder from `direction`. A
 * bottom/top sheet gets the peek/half/full ladder; a left/right side-lens gets a
 * full-slide (no detents — an empty ladder, so `useDrawerSnap` treats it as a single
 * open/closed slide). A consumer-supplied `snapPoints` always wins over this default.
 */
export function resolveDefaultSnapPoints(
    direction: DrawerDirection,
): readonly number[] {
    if (direction === "left" || direction === "right") return [];
    // bottom (default) + top — the peek/half/full bottom-sheet ladder.
    return BOTTOM_SHEET_LADDER;
}

/**
 * The drag-release velocity threshold (px/s). A flung drag whose release velocity
 * exceeds this advances a detent in the drag direction (the `useDockState`-style
 * velocity-aware decision); a slow release below it snaps to the NEAREST detent. The
 * sign of the velocity selects the direction (toward-open vs toward-closed).
 */
export const DRAWER_FLING_VELOCITY = 450;

/** `Symbol()` label for the `DrawerSnapContext` injection key (`drawerSnapContext.ts`). */
export const DRAWER_SNAP_LABEL = "glass-ui:drawer-snap-context";
