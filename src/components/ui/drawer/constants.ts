// BB.W-DRAWER-ABROGATE — the Drawer family colocated constants home.
//
// The module-scope magic constants the re-built Drawer snap engine reads live HERE
// (the feature-dir `constants.ts` convention, mirroring dock/constants.ts) rather
// than re-declared at the top of `useDrawerSnap.ts`. The DI context module
// (`composables/drawerSnapContext.ts`) imports its `Symbol(label)` from here so the
// label is never re-typed at two call sites.

import type { DrawerDirection } from "./index";

/**
 * The ONE drawer-snap spring authority — the sheet-settle (response, ζ) register the
 * house `SpringProgress` snap engine (`useDrawerSnap.ts`) drives `--glass-drawer-t`
 * off. This is the drawer's OWN settle clock — NOT a re-use of the dock's
 * `DOCK_SPRING` morph-settle (the per-spring-clock §6 doctrine: each register is its
 * own clock; a sheet that flings up to a detent settles slower + with a touch more
 * give than the dock's crisp 0.32/0.7 box-morph). Co-located here so the pair is
 * defined ONCE rather than at the top of the composable.
 *
 * `response 0.4` — the angular period (≈ the swing time); a hair looser than the
 * dock so the sheet reads as a heavier surface settling. `dampingFraction 0.82` —
 * the iOS "smooth" register: sub-perceptual overshoot (a settled sheet, not a
 * bouncing one) while staying alive on a flung release.
 */
export const DRAWER_SNAP = { response: 0.4, dampingFraction: 0.82 } as const;

/**
 * BB-2 (the direction-aware default snap ladder fold) — the peek/half/full detent
 * ladder a bottom/top sheet resolves when the consumer passes no `snapPoints`. The
 * value (12% peek · 50% half · 100% full) is the `DEFAULT_LIVE_SNAP_POINTS` shape
 * the prior vaul wrapper hardcoded, re-homed into the engine as the bottom/top
 * default. A side-lens (left/right) sheet resolves a FULL-SLIDE instead (no detents)
 * — `resolveDefaultSnapPoints` returns `[]` for the side axis.
 */
export const BOTTOM_SHEET_LADDER: readonly number[] = [0.12, 0.5, 1];

/**
 * BB-2 — resolve the DEFAULT snap ladder from `direction` natively (retiring the
 * Atlas `:snap-points="[]"` workaround). A bottom/top sheet gets the peek/half/full
 * ladder; a left/right side-lens gets a full-slide (no detents — an empty ladder, so
 * `useDrawerSnap` treats it as a single open/closed slide). A consumer-supplied
 * `snapPoints` always wins over this default.
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
