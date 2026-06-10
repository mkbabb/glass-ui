// The constellation FIELD-STATE construction — the field literal + the
// wander/well state derivation carved out of Constellation.vue's setup. A pure
// factory: it reads the resolved `wander`/`gravityWell` prop values and returns
// the seeded field (focal/warp engine state) plus the per-instance overrides the
// render closure re-layers over the on-mount token read. NO logic edits — the
// derivation is the byte-for-byte lift of the prior inline setup block.

import {
    DEFAULT_WELL_CONFIG,
    DEFAULT_WANDER_IDLE,
    DEFAULT_WANDER_JITTER,
} from "../constellationInteraction";
import type {
    ConstellationField,
    ConstellationWander,
    ConstellationWell,
} from "../constellationField";

type WanderProp = boolean | { minIdle?: number; jitter?: number };
type GravityWellProp =
    | boolean
    | {
          holdMs?: number;
          gain?: number;
          reach?: number;
          ramp?: number;
          maxSpeed?: number;
          soften?: number;
      };

export interface ConstellationFieldState {
    field: ConstellationField;
    /** The wander prop override the render re-layers over the on-mount token read. */
    wanderOverride: { minIdle?: number; jitter?: number };
    /** The well prop override the render re-layers over the on-mount token read. */
    wellOverride: Exclude<GravityWellProp, boolean>;
}

/**
 * Build the per-instance field state. The focal node (AX.W17) is engine-owned:
 * `focalIndex` names the pinned node, `warp` is the per-axis critically-damped
 * spring the engine steps inside `stepField`. `wander`/`gravityWell` absent/false
 * leaves `field.wander`/`field.well` undefined (byte-identical to HEAD — stepField
 * skips the cadence / force pass); `true` / an object seeds the cold state with the
 * built-in defaults + any prop override layered on (the on-mount
 * `readInteractionConfig` token read re-points the un-overridden members, with the
 * returned `*Override` winning over the token in the render closure).
 */
export function createConstellationField(
    wander: WanderProp,
    gravityWell: GravityWellProp,
): ConstellationFieldState {
    const field: ConstellationField = {
        nodes: [],
        canvas: null,
        w: 0,
        h: 0,
        k: 1,
        dpr: 1,
        focalIndex: -1,
        warp: { x: 0, y: 0, vx: 0, vy: 0, targetIdx: -1 },
    };

    // The auto-DRIFT cadence (AY.W-CON1). `nextAt` arms on the first stepped frame,
    // so there is no immediate jump on mount.
    const wanderOverride = wander && wander !== true ? wander : {};
    const wanderState: ConstellationWander | undefined = wander
        ? {
              nextAt: -1,
              minIdle: wanderOverride.minIdle ?? DEFAULT_WANDER_IDLE,
              jitter: wanderOverride.jitter ?? DEFAULT_WANDER_JITTER,
          }
        : undefined;
    field.wander = wanderState;

    // The gravity-well state (AY.W-CON2). The cfg is seeded from the built-in
    // defaults here; the on-mount token-read re-points the un-overridden members,
    // with the PROP override (`wellOverride`) winning over both. `x = -1`
    // (inactive), `strength = target = 0` (cold) until the held-timer arms the well.
    const wellOverride = gravityWell && gravityWell !== true ? gravityWell : {};
    const wellState: ConstellationWell | undefined = gravityWell
        ? {
              x: -1,
              y: -1,
              strength: 0,
              target: 0,
              cfg: { ...DEFAULT_WELL_CONFIG, ...wellOverride },
          }
        : undefined;
    field.well = wellState;

    return { field, wanderOverride, wellOverride };
}
