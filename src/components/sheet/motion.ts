// Pure sheet-motion helpers — the side sheet's spring translate + the scrim's
// position-synced opacity. One source for the surface (SheetContent) and the scrim
// (ModalOverlay); both pure fns are unit-pinnable.

import type { Placement } from "../_shared/axes";

/** The four slide placements (a `center` modal is Dialog's non-slide path). */
export type SidePlacement = Exclude<Placement, "center">;

/**
 * The side sheet's slide as a CSS `translate` LONGHAND value ("<lp> <lp>").
 * `p`: 0 = mounted at rest, 1 = one own-dimension offscreen along the anchored
 * axis. This is a `translate` longhand, NOT a `transform` function —
 * `translateX()`/`translateY()` are invalid as a `translate` value and paint
 * nothing (R1). `p` is left unclamped so the spring's overshoot IS the settle.
 */
export function sheetSlideTransform(placement: SidePlacement, p: number): string {
    switch (placement) {
        case "right":
            return `${p * 100}% 0`; // p=1 → "100% 0"   off the right edge
        case "left":
            return `${-p * 100}% 0`; // p=1 → "-100% 0"  off the left edge
        case "bottom":
            return `0 ${p * 100}%`; // p=1 → "0 100%"   off the bottom edge
        case "top":
            return `0 ${-p * 100}%`; // p=1 → "0 -100%"  off the top edge
    }
}

/**
 * Scrim opacity synced to the surface position: 1 at open (p=0), 0 at dismissed
 * (p=1). Clamped so the spring overshoot (p<0 or p>1) never pushes opacity out of
 * [0,1]. Reads the SAME live scalar as the surface → no desync through an interrupt.
 */
export function scrimOpacity(p: number): number {
    return Math.min(1, Math.max(0, 1 - p));
}

/** The dismissed floor and the committed span of the detent scrim law. */
const SCRIM_DETENT_FLOOR = 0.28;
const SCRIM_DETENT_SPAN = 0.44;

/**
 * Scrim opacity for a DETENTED sheet, off the rung scalar rather than the slide: a
 * peek barely dims and a full commits hard, which is what makes a partly-open sheet
 * read as a sheet over a live page rather than as a modal that failed to arrive.
 *
 * The two figures are the shipped law relocated, not new ones — the drawer's
 * `0.28 + t·0.44` measured CORRECT and survived its own audit; it only ever lived in a
 * stylesheet with one consumer and an `@import` lane of its own. Here it is a pure
 * function beside the slide law it is the sibling of, and it is CONDITIONAL: a sheet
 * with no ladder keeps `scrimOpacity`, so nothing pays for a rung it does not have.
 */
export function scrimDetentOpacity(t: number): number {
    return SCRIM_DETENT_FLOOR + SCRIM_DETENT_SPAN * Math.min(1, Math.max(0, t));
}
