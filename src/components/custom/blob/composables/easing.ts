// blob/composables/easing.ts — the component-scoped easing helpers (AV.W5.E,
// D7). The blob hand-rolled three quadratic easing curves across two
// composables (`easeInOut` in useBlobMood, `easeIn`/`easeOut` in
// useBlobSatellites). The use is SINGLE-COMPONENT (the blob alone), so the
// correct fold is this component-scoped module — NOT a keyframes consumption (the
// helpers are not in the keyframes LIGHT tier) nor a glass-ui-public composable.
// PRIVATE to `/blob`: not re-exported from blob/index.ts, not on /api.
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

// BD.W-GOOBLOB-MERCURY-COLONY — the cartoon PINCH-OFF velocity curve (the named snap,
// the C3·R1 cartoon-punch fold). A fission satellite's neck must NOT butter-morph open:
// the excursion rides anticipation (a hair of inward squash toward the bud point) →
// FAST snap (the neck thins past the smin reach in a SHORT window) → overshoot → damped
// recoil. This is the POSITION envelope `t in [0,1] → reach in [0,1]` (0 = merged
// periapsis, 1 = the bounded fission apex); the satellite radius lerps along it. The
// derivative is steep across the snap band (~[0.30, 0.55]) so G2 (the snap-velocity
// witness, the neck-width time-derivative at the snap frame) reads FAST, not a sine.
//
// The shape (one named const, DRY — the satellite tick reads THIS, never an inline sin):
//   anticipation [0, 0.30): a gentle inward dip below the merged floor (squash toward
//                           the body before the snap) — a small NEGATIVE pre-load.
//   snap         [0.30, 0.55): a fast rise from ~0 to past 1.0 (the overshoot apex).
//   recoil       [0.55, 1.0]: a damped settle from the overshoot back to the apex hold.
// Outside [0,1] it clamps. The merge-IN (the return half) reuses easeOut (slow), so the
// pinch is asymmetric: a SLOW gather, a FAST snap — the mercury read, never a metronome.
export function fissionSnap(t: number): number {
    const x = t < 0 ? 0 : t > 1 ? 1 : t;
    if (x < 0.3) {
        // Anticipation: a shallow inward squash (dips ~6% below the merged floor) on a
        // smooth ease so the bud point gathers before it lets go.
        const a = x / 0.3; // 0..1 across the anticipation window
        return -0.06 * Math.sin(a * Math.PI); // 0 → -0.06 → 0
    }
    if (x < 0.55) {
        // SNAP: a fast cubic ease-out rise from 0 to an overshoot apex (1.12) across a
        // SHORT 0.25-wide window — the steep derivative G2 witnesses.
        const s = (x - 0.3) / 0.25; // 0..1 across the snap window
        const eased = 1 - (1 - s) * (1 - s) * (1 - s); // cubic ease-out
        return eased * 1.12;
    }
    // Recoil: a damped ring from the 1.12 overshoot back to the 1.0 apex hold.
    const r = (x - 0.55) / 0.45; // 0..1 across the recoil window
    const ring = Math.cos(r * Math.PI) * 0.12 * (1 - r); // +0.12 → 0 (damped)
    return 1.0 + ring;
}
