/**
 * Aurora cursor model — the eased pointer-attraction state.
 *
 * The cursor x/y in 0..1 ease toward their targets; `strength` ramps in while the
 * pointer is active and decays per-frame once it lifts. Exported ONCE here so any
 * CPU mirror (a consumer reproducing the cursor model) imports these constants
 * rather than re-declaring them — the shader and the CPU side stay in lockstep.
 */

/**
 * Cursor easing constants. Authored to feel "snappy on entry, gentle decay";
 * documented in DESIGN.md §4. Higher lerp = faster ramp; smaller decay = longer
 * tail.
 */
export const CURSOR_POS_LERP = 0.22;
export const CURSOR_STRENGTH_LERP = 0.18;
export const CURSOR_DECAY_PER_FRAME = 0.992; // ≈ 2 s half-life at 60 fps

/**
 * At-rest epsilon for the demand-driven loop. The cursor is "settled" once its
 * eased position is within ε of its target AND its strength has decayed below ε —
 * below this the next frame is visually identical, so the loop may park.
 */
export const CURSOR_REST_EPSILON = 1e-3;

/**
 * AW.W8.1 — the velocity-burst decay per frame. A fast pointer flick injects a
 * transient `burst` that eases out over ~1s (≈0.96^60 ≈ 0.09 after 1s at 60fps),
 * distinct from the steady attraction. The velocity itself eases faster (it tracks
 * the live pointer delta, not a lingering field).
 */
export const CURSOR_BURST_DECAY_PER_FRAME = 0.96;
export const CURSOR_VELOCITY_LERP = 0.3;

/** The mutable eased-cursor state. `strength` ramps in; `targetStrength` decays. */
export interface CursorState {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    strength: number;
    targetStrength: number;
    radius: number;
    /**
     * AW.W8.1 — the smoothed pointer velocity (delta per move, eased). The
     * velocity-reactive flow consumes its magnitude; a fast flick spikes it. Units
     * are normalized-screen per move (clamped to avoid a teleport spike).
     */
    velX: number;
    velY: number;
    /**
     * AW.W8.1 — the transient swirl-BURST a fast flick injects (decays over ~1s).
     * The flow shader reads this as a decaying velocity-driven term, distinct from
     * the steady `strength` attraction.
     */
    burst: number;
}

/** A fresh at-rest cursor (centred, no attraction, default radius). */
export function createCursorState(): CursorState {
    return {
        x: 0.5,
        y: 0.5,
        targetX: 0.5,
        targetY: 0.5,
        strength: 0,
        targetStrength: 0,
        radius: 0.25,
        velX: 0,
        velY: 0,
        burst: 0,
    };
}

/**
 * Advance the cursor easing one frame — snappy approach toward the target
 * position, gentle decay of the attraction strength when idle. AW.W8.1: also eases
 * the velocity toward zero and decays the swirl-burst. `tempo` (the master tempo
 * scalar, default 1; 0 under PRM/pause) scales the velocity + burst toward stillness
 * so the whole interactive stack freezes when tempo is 0 — `tempo` multiplies the
 * retained fraction, NOT `uTime` (scaling the clock makes the flow jump; the
 * integration step scales, the absolute clock keeps marching — the W11 discipline).
 */
export function advanceCursor(cursor: CursorState, tempo: number = 1): void {
    const k = Math.max(0, Math.min(1, tempo));
    cursor.x += (cursor.targetX - cursor.x) * CURSOR_POS_LERP;
    cursor.y += (cursor.targetY - cursor.y) * CURSOR_POS_LERP;
    cursor.strength += (cursor.targetStrength - cursor.strength) * CURSOR_STRENGTH_LERP;
    cursor.targetStrength *= CURSOR_DECAY_PER_FRAME;
    // Velocity eases toward zero; the burst decays over ~1s. tempo=0 zeroes both
    // (the field freezes — the single suppression seam PRM/pause converge on).
    cursor.velX *= (1 - CURSOR_VELOCITY_LERP) * k;
    cursor.velY *= (1 - CURSOR_VELOCITY_LERP) * k;
    cursor.burst *= CURSOR_BURST_DECAY_PER_FRAME * k;
}

/**
 * AW.W8.1 — feed a pointer delta into the velocity + burst. Called from the
 * `pointermove` listener, which MUST early-out on reduced-motion BEFORE calling this
 * (the cursor write-path PRM check — the listener fires independent of the rAF loop).
 * The delta is clamped so a teleport (tab-in, scroll jump) does not spike a giant burst.
 */
export function injectCursorVelocity(cursor: CursorState, dx: number, dy: number): void {
    const CLAMP = 0.12; // max normalized-screen delta per move
    const cdx = Math.max(-CLAMP, Math.min(CLAMP, dx));
    const cdy = Math.max(-CLAMP, Math.min(CLAMP, dy));
    cursor.velX += (cdx - cursor.velX) * CURSOR_VELOCITY_LERP;
    cursor.velY += (cdy - cursor.velY) * CURSOR_VELOCITY_LERP;
    // A fast flick (large delta magnitude) injects a transient swirl-burst.
    const speed = Math.hypot(cdx, cdy);
    cursor.burst = Math.min(1, cursor.burst + speed * 4.0);
}

/**
 * True while the cursor is still easing (position not yet at target, or strength
 * not yet decayed below ε). The render-demand gate ORs this with the config drift
 * check — when both are false the next frame is pixel-identical, so the loop parks.
 */
export function cursorIsLive(cursor: CursorState): boolean {
    return (
        cursor.targetStrength > CURSOR_REST_EPSILON ||
        cursor.strength > CURSOR_REST_EPSILON ||
        Math.abs(cursor.x - cursor.targetX) > CURSOR_REST_EPSILON ||
        Math.abs(cursor.y - cursor.targetY) > CURSOR_REST_EPSILON
    );
}
