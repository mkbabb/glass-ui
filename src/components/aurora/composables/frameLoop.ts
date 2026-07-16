/**
 * Aurora frame loop — the per-frame draw + the render-demand gate.
 *
 * the retired `cursorModel.ts` is GONE. The cursor is now the mapped
 * readout of the SHARED `usePointerVelocityField` (`auroraCursorMapping`): the mass-spring
 * attractor is the cursor position, `engagement · strength` the attraction (so the
 * cursor-local luminance lean reads on the `smooth` medium, not a dead swirl axis), with
 * the derived burst folded into that strength on the CPU. The field is FED `tick(deltaMs)`
 * from THIS loop (the one-loop discipline — no own
 * rAF) and FREEZES under PRM via the MASTER TEMPO SCALAR (`tick(0)`).
 *
 * `drawFrame` re-sends the per-frame cursor + time uniforms and issues the single
 * full-screen-triangle draw. `needsAnimation` is the demand gate: `false` under
 * reduced-motion (the static frame draws once, then parks), `false` at steady-state (all
 * four drift uniforms 0 AND the field settled — the next frame is pixel-identical), and
 * `true` while drift is live or the field is still easing (engagement, speed, burst,
 * attractor motion above ε).
 */

import type { UniformLocations } from "./glSetup";
import type { AuroraCursorUniforms } from "./uniformBridge";
import type { AuroraConfig } from "../constants/presets";
import type { UsePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";
import {
    auroraCursorMapping,
    snapshotField,
} from "../../../composables/motion/pointer/pointerFieldMappings";

/** The at-rest scalars a config-less cursor read seeds (strength ceiling + influence radius). */
export interface AuroraCursorScalars {
    /** The active-strength ceiling (cfg.strength; scaled by engagement). */
    strength: number;
    /** The influence radius (0.05..0.5). */
    radius: number;
    /** The bounded contribution of the pointer-field burst. */
    amplitude: number;
}

export interface FrameLoopDeps {
    gl: WebGL2RenderingContext;
    prog: WebGLProgram;
    uniforms: UniformLocations;
    /**
     * the shared viz-pointer-physics field (the ONE cursor source). FED
     * `tick(deltaMs)` from THIS callback (the one-loop discipline — no own rAF). The
     * `auroraCursorMapping` projects its readout onto the `uCursor*` uniforms.
     */
    pointerField: UsePointerVelocityField;
    /** The cursor strength ceiling + radius (the runtime's imperative setters write these). */
    getCursorScalars: () => AuroraCursorScalars;
    /** The live config (drift uniforms gate the demand loop). */
    getConfig: () => AuroraConfig;
    /** Reduced-motion intent — parks the loop after one static frame. */
    getReducedMotion: () => boolean;
    /** Resolve shader time without altering the pointer field's real frame delta. */
    getRenderTime: (elapsedSec: number) => number;
}

export interface FrameLoop {
    /** Advance the field THEN draw — the per-frame step. */
    frame: (timeSec: number) => void;
    /** Demand gate — is there live motion to render on the next frame? */
    needsAnimation: () => boolean;
}

const FIELD_REST_EPS = 1e-3;
const ATTRACTOR_REST_EPS = 1e-4;

/**
 * Map an ALREADY-TICKED shared pointer field onto the aurora `uCursor*` uniform shape (the
 * ONE cursor projection both backends — WebGL2 frameLoop + WGSL wgpuSetup — share). The
 * iOS-27 gel snap-back augments the field burst before `auroraCursorMapping` folds it
 * into strength. Both shader engines consume the resulting four-value cursor shape.
 */
export function mapAuroraCursor(
    pointerField: UsePointerVelocityField,
    scalars: AuroraCursorScalars,
    tempo: number,
): AuroraCursorUniforms {
    const snapshot = snapshotField(pointerField);
    if (tempo > 0) {
        const accel = pointerField.acceleration.value;
        const vel = pointerField.velocity.value;
        const decel = -(accel.x * vel.x + accel.y * vel.y);
        if (decel > 0) snapshot.burst = Math.min(1, snapshot.burst + decel * 3.0);
    }
    const m = auroraCursorMapping(snapshot, scalars);
    return {
        x: m.cx,
        y: m.cy,
        strength: m.strength,
        radius: m.radius,
    };
}

/**
 * The demand-gate liveness over the shared field state (the retired `cursorIsLive` over the
 * field) — engaged, moving, bursting, attractor mid-settle.
 */
export function auroraFieldLive(pointerField: UsePointerVelocityField): boolean {
    const av = pointerField.attractorVelocity.value;
    return (
        pointerField.engagement.value > FIELD_REST_EPS ||
        pointerField.speed.value > FIELD_REST_EPS ||
        pointerField.burst.value > FIELD_REST_EPS ||
        Math.hypot(av.x, av.y) > ATTRACTOR_REST_EPS
    );
}

export function createFrameLoop(deps: FrameLoopDeps): FrameLoop {
    const {
        gl,
        prog,
        uniforms: U,
        pointerField,
        getCursorScalars,
        getConfig,
        getReducedMotion,
        getRenderTime,
    } = deps;
    const flipY = (y: number): number => 1.0 - y;

    // The per-frame delta the shared field's tick() needs. The substrate's frame callback
    // hands an absolute `timeSec`; we derive the delta here (the first frame seeds prevTime
    // so the opening delta is 0 — no teleport spike).
    let prevTimeSec: number | null = null;
    // The last mapped cursor (re-computed each frame; drawFrame reads it, needsAnimation
    // reads the field directly).
    let cur: AuroraCursorUniforms = {
        x: 0.5,
        y: 0.5,
        strength: 0,
        radius: 0.25,
    };

    // The master tempo scalar is the single suppression seam the whole interactive
    // stack routes through: 0 under reduced-motion (the substrate's live PRM ref) so every
    // interactive axis freezes; 1 otherwise. The DockBackgroundToggle pause stops the loop
    // entirely (the substrate suspend), so it converges here too. tempo scales the
    // integrated field tick (`tick(0)` freezes it), NEVER uTime (scaling the clock makes
    // the flow jump; the integration step scales, the clock keeps marching).
    function masterTempo(): number {
        return getReducedMotion() ? 0 : 1;
    }

    function drawFrame(timeSec: number): void {
        const renderTime = getRenderTime(timeSec);
        gl.useProgram(prog);
        gl.uniform2f(U.uCursor, cur.x, flipY(cur.y));
        gl.uniform1f(U.uCursorStrength, cur.strength);
        gl.uniform1f(U.uCursorRadius, cur.radius);
        gl.uniform1f(U.uTime, renderTime);

        // Cursor-as-light: when interactivity.light is on, the cursor drives the
        // impasto uLightDir (the movable light); a slow idle auto-orbit when the
        // cursor is at rest. Gated by the master tempo (0 under PRM) so the light freezes
        // under reduce.
        const cfg = getConfig();
        if (cfg.interactivity?.light) {
            const tempo = masterTempo();
            const orbit = renderTime * 0.25;
            let lx = Math.cos(orbit) * 0.5;
            let ly = Math.sin(orbit) * 0.5;
            const cuX = (cur.x - 0.5) * 2.0;
            const cuY = (0.5 - cur.y) * 2.0; // flipY
            const pull = cur.strength * tempo;
            lx = lx * (1 - pull) + cuX * pull;
            ly = ly * (1 - pull) + cuY * pull;
            gl.uniform3f(U.uLightDir, lx * tempo + (1 - tempo) * -0.5, ly * tempo + (1 - tempo) * 0.6, 0.62);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function needsAnimation(): boolean {
        if (getReducedMotion()) return false;
        const config = getConfig();
        const driftLive =
            config.nucleiDrift !== 0 ||
            config.paletteDrift !== 0 ||
            config.breathDepth !== 0 ||
            config.warpDrift !== 0;
        if (driftLive) return true;
        return auroraFieldLive(pointerField);
    }

    return {
        frame: (timeSec) => {
            // FEED the shared pointer field one tick (the one-loop push-step; no own rAF).
            // The delta is the inter-frame gap (0 on the first frame). Under PRM
            // masterTempo()=0 → tick(0) freezes the field.
            const tempo = masterTempo();
            const deltaMs =
                prevTimeSec === null
                    ? 0
                    : Math.max(0, (timeSec - prevTimeSec) * 1000);
            prevTimeSec = timeSec;
            pointerField.tick(tempo === 0 ? 0 : deltaMs);
            // Map the field readout onto the cursor uniforms (the ONE cursor source).
            cur = mapAuroraCursor(pointerField, getCursorScalars(), tempo);
            drawFrame(timeSec);
        },
        needsAnimation,
    };
}
