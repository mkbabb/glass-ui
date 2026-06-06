// goo-blob/composables/easing.ts — the component-scoped easing helpers (AV.W5.E,
// D7). The goo-blob hand-rolled three quadratic easing curves across two
// composables (`easeInOut` in useBlobMood, `easeIn`/`easeOut` in
// useBlobSatellites). The use is SINGLE-COMPONENT (the goo-blob alone), so the
// correct fold is this component-scoped module — NOT a keyframes consumption (the
// helpers are not in the keyframes LIGHT tier) nor a glass-ui-public composable.
// PRIVATE to `/goo-blob`: not re-exported from goo-blob/index.ts, not on /api.
//
// The curves are byte-identical to the prior inline hand-rolls — the de-dup is
// runtime-equivalent, not a re-derivation. The distinct smoothstep at
// useBlobSatellites (`bt * bt * (3 - 2 * bt)`) is a different cubic form and
// stays inline at its single site (KISS — no forced consolidation).

/** Quadratic ease-in-out (the useBlobMood mood cross-fade curve). */
export function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t);
}

/** Quadratic ease-in (the satellite spawn ramp). */
export function easeIn(t: number): number {
    return t * t;
}

/** Quadratic ease-out (the satellite retract ramp). */
export function easeOut(t: number): number {
    return 1 - (1 - t) * (1 - t);
}
