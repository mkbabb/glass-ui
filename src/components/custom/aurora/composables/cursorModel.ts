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

/** The mutable eased-cursor state. `strength` ramps in; `targetStrength` decays. */
export interface CursorState {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    strength: number;
    targetStrength: number;
    radius: number;
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
    };
}

/**
 * Advance the cursor easing one frame — snappy approach toward the target
 * position, gentle decay of the attraction strength when idle.
 */
export function advanceCursor(cursor: CursorState): void {
    cursor.x += (cursor.targetX - cursor.x) * CURSOR_POS_LERP;
    cursor.y += (cursor.targetY - cursor.y) * CURSOR_POS_LERP;
    cursor.strength += (cursor.targetStrength - cursor.strength) * CURSOR_STRENGTH_LERP;
    cursor.targetStrength *= CURSOR_DECAY_PER_FRAME;
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
