// Layer 1: the four pure per-viz pointer-field mappings.
//
// Each mapping is a PURE function (no DOM, no rAF, no state) that projects a
// `usePointerVelocityField` READOUT (a plain-value snapshot) + per-viz geometry/options
// onto that viz's interaction inputs. Sharing STOPS here: there is NO simulation service,
// no shared clock, no particle-pool bus, no second rAF — the field owns the physics, the
// mapping owns the projection, and the renderer owns the loop. Their purity keeps them
// independently testable.
//
// The snapshot is the field's plain-value read (velocity/acceleration are per-SECOND in
// normalized-host units; engagement/burst are 0..1; attractor/smoothedPosition/position are
// 0..1). A renderer reads `field.attractor.value` &c. into a snapshot ONCE per frame and
// hands it here — the mapping never touches a Vue ref.

import type { PointerVec2 } from "./usePointerVelocityField";

export type { PointerVec2 };

/**
 * A plain-value read of the pointer field for ONE frame. The renderer snapshots the field
 * refs (`.value`) into this before calling a mapping — the mappings stay Vue-ref-free (pure).
 */
export interface PointerFieldSnapshot {
    /** The raw live pointer target (0..1), pre-smoothing. */
    position: PointerVec2;
    /** The snappy critically-damped smoothed position (0..1). */
    smoothedPosition: PointerVec2;
    /** The mass-spring-damper attractor — the ONE eased-follow (0..1). */
    attractor: PointerVec2;
    /** The smoothed velocity (normalized-host units/second). */
    velocity: PointerVec2;
    /** The smoothed acceleration (the second derivative). */
    acceleration: PointerVec2;
    /** The transient flick-burst impulse (0..1). */
    burst: number;
    /** The smoothed active-engagement envelope (0..1). */
    engagement: number;
}

function clamp(v: number, lo: number, hi: number): number {
    return v < lo ? lo : v > hi ? hi : v;
}

// ── blob: the HEAVY-mass pull + the pseudopod stretch ───────────────────────────
//
// The body follows the field's mass-spring-damper attractor (heavy mass, ζ<1 — the slight
// overshoot IS the weight; ζ=1 reads weightless). The follow leads toward the heading by
// LEAD_K·velocity; a fast DECELERATION (accel opposing velocity) grows a transient pseudopod
// stretch. The attractor + burst-lead live in the FIELD (fed raw pointer ONCE — the
// double-smooth is dead); this mapping projects the attractor onto the [-1,1] body space +
// derives the stretch.

/** The steady velocity-lead gain (the body anticipates the heading). */
export const BLOB_LEAD_K = 0.09;
/** The pseudopod stretch gain off |acceleration| (capped LOW so it swells, never taffies). */
export const BLOB_STRETCH_GAIN = 0.6;
/** The pseudopod stretch cap. */
export const BLOB_STRETCH_MAX = 0.35;

export interface BlobPullOptions {
    leadK?: number;
    stretchGain?: number;
    stretchMax?: number;
}

export interface BlobPullResult {
    /** The body-follow target in [-1,1] body space. */
    x: number;
    y: number;
    /** The transient pseudopod stretch (0..stretchMax) off deceleration. */
    stretch: number;
}

/**
 * The blob heavy-pull mapping (PURE). Maps the field attractor (0..1) → [-1,1] body space
 * with a steady velocity-lead, and derives a transient pseudopod stretch from the
 * deceleration magnitude (a fast flick that brakes grows a pseudopod, then it relaxes).
 */
export function blobPullMapping(
    snap: PointerFieldSnapshot,
    options: BlobPullOptions = {},
): BlobPullResult {
    const leadK = options.leadK ?? BLOB_LEAD_K;
    const stretchGain = options.stretchGain ?? BLOB_STRETCH_GAIN;
    const stretchMax = options.stretchMax ?? BLOB_STRETCH_MAX;
    const x = clamp((snap.attractor.x + snap.velocity.x * leadK) * 2 - 1, -1, 1);
    const y = clamp((snap.attractor.y + snap.velocity.y * leadK) * 2 - 1, -1, 1);
    // Deceleration = the accel component OPPOSING the velocity (a positive decel is a brake).
    const decel = -(
        snap.acceleration.x * snap.velocity.x + snap.acceleration.y * snap.velocity.y
    );
    const stretch = clamp(Math.max(0, decel) * stretchGain + snap.burst * 0.1, 0, stretchMax);
    return { x, y, stretch };
}

// ── aurora: the cursor-as-attractor uniform mapping ─────────────────────────────
//
// Replaces the retired `cursorModel.ts` ENTIRELY. cx/cy = the attractor (0..1, CSS-top; the
// uniform bridge flips Y), strength = the engagement projection plus a bounded burst lift.
// Folding the transient on the CPU keeps the WebGL2 and WebGPU shader inputs identical.

/** The default aurora cursor influence radius. */
export const AURORA_CURSOR_RADIUS = 0.25;

export interface AuroraCursorOptions {
    /** The active strength ceiling (cfg.strength; default 0.8). */
    strength?: number;
    /** The influence radius (0.05..0.5; default {@link AURORA_CURSOR_RADIUS}). */
    radius?: number;
    /** How much the pointer-field burst lifts the projected strength (0..1). */
    amplitude?: number;
}

export interface AuroraCursorResult {
    /** The cursor position (0..1, CSS-top-origin — the bridge flips Y). */
    cx: number;
    cy: number;
    /** The engagement-driven attraction strength (0..1). */
    strength: number;
    /** The influence radius. */
    radius: number;
}

/**
 * The aurora cursor mapping (PURE). The attractor is the cursor position, the engagement
 * envelope drives the steady strength and the named amplitude folds the transient burst
 * into that same scalar. Both engines therefore receive the same cursor field.
 */
export function auroraCursorMapping(
    snap: PointerFieldSnapshot,
    options: AuroraCursorOptions = {},
): AuroraCursorResult {
    const strengthCeil = clamp(options.strength ?? 0.8, 0, 1);
    const base = clamp(snap.engagement * strengthCeil, 0, 1);
    const burst = clamp(snap.burst * (options.amplitude ?? 0), 0, 1);
    return {
        cx: snap.attractor.x,
        cy: snap.attractor.y,
        strength: base + (1 - base) * burst,
        radius: options.radius ?? AURORA_CURSOR_RADIUS,
    };
}

// ── constellation: the well over the KEPT per-node integrators ──────────────────
//
// The constellation keeps its own per-node force integrators (BYTE-FROZEN); this mapping
// hands them the pointer WELL — the attractor position + engagement (the well strength) +
// the flick burst (a repel/attract impulse). The per-node code decides how to apply them.

export interface ConstellationWellResult {
    /** The well centre (0..1). */
    x: number;
    y: number;
    /** The well strength (0..1 engagement). */
    engagement: number;
    /** The flick-burst impulse (0..1). */
    burst: number;
    /** The pointer velocity (normalized/second) — for a directional wake. */
    velX: number;
    velY: number;
}

/**
 * The constellation well mapping (PURE). Projects the field onto the pointer-well inputs the
 * kept per-node integrators read — position + engagement (well strength) + burst (impulse).
 */
export function constellationWellMapping(
    snap: PointerFieldSnapshot,
): ConstellationWellResult {
    return {
        x: snap.attractor.x,
        y: snap.attractor.y,
        engagement: snap.engagement,
        burst: snap.burst,
        velX: snap.velocity.x,
        velY: snap.velocity.y,
    };
}

/**
 * Read a `usePointerVelocityField` handle into a plain-value {@link PointerFieldSnapshot} —
 * the ONE ref→plain bridge the renderers call once per frame before invoking a mapping (the
 * mappings never touch a Vue ref). Accepts any object exposing the field's `.value`-bearing
 * refs.
 */
export function snapshotField(field: {
    position: { value: PointerVec2 };
    smoothedPosition: { value: PointerVec2 };
    attractor: { value: PointerVec2 };
    velocity: { value: PointerVec2 };
    acceleration: { value: PointerVec2 };
    burst: { value: number };
    engagement: { value: number };
}): PointerFieldSnapshot {
    return {
        position: field.position.value,
        smoothedPosition: field.smoothedPosition.value,
        attractor: field.attractor.value,
        velocity: field.velocity.value,
        acceleration: field.acceleration.value,
        burst: field.burst.value,
        engagement: field.engagement.value,
    };
}
