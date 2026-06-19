/**
 * Aurora frame loop — the per-frame draw + the render-demand gate.
 *
 * `drawFrame` re-sends the per-frame cursor + time uniforms and issues the single
 * full-screen-triangle draw. `needsAnimation` is the demand gate: it returns
 * `false` under reduced-motion (the static frame draws once, then the loop parks),
 * `false` at steady-state (all four drift uniforms 0 AND the cursor settled within
 * ε — the next frame would be pixel-identical), and `true` while drift is live or
 * the cursor is still easing.
 */

import type { UniformLocations } from "./glSetup";
import { advanceCursor, cursorIsLive, type CursorState } from "./cursorModel";
import type { AuroraConfig } from "../constants/presets";
import type { UsePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";

export interface FrameLoopDeps {
    gl: WebGL2RenderingContext;
    prog: WebGLProgram;
    uniforms: UniformLocations;
    cursor: CursorState;
    /** The live config (drift uniforms gate the demand loop). */
    getConfig: () => AuroraConfig;
    /** Reduced-motion intent — parks the loop after one static frame. */
    getReducedMotion: () => boolean;
    /**
     * BC.W-VIZ-AURORA (T5) — the shared viz-pointer-physics field (BB.B4). FED
     * `tick(deltaMs)` from THIS frame callback (the one-loop discipline — the field owns
     * NO own rAF); the renderer reads `acceleration` for the iOS-27 gel snap-back. The
     * existing cursorModel velocity/burst stays the byte-faithful baseline; the accel
     * term is the additive fold.
     */
    pointerField: UsePointerVelocityField;
}

export interface FrameLoop {
    /** Advance the cursor easing THEN draw — the per-frame step. */
    frame: (timeSec: number) => void;
    /** Demand gate — is there live motion to render on the next frame? */
    needsAnimation: () => boolean;
}

export function createFrameLoop(deps: FrameLoopDeps): FrameLoop {
    const { gl, prog, uniforms: U, cursor, getConfig, getReducedMotion, pointerField } =
        deps;
    const flipY = (y: number): number => 1.0 - y;

    // BC.W-VIZ-AURORA (T5) — the per-frame delta the shared field's tick() needs. The
    // substrate's frame callback hands an absolute `timeSec`; we derive the delta here (the
    // first frame seeds prevTime so the opening delta is 0 — no teleport spike).
    let prevTimeSec: number | null = null;

    // AW.W8.1 — the MASTER TEMPO SCALAR. The single suppression seam the whole
    // interactive stack routes through: 0 under reduced-motion (the substrate's live
    // PRM ref) so every interactive axis freezes; 1 otherwise. The DockBackgroundToggle
    // pause stops the loop entirely (the substrate suspend), so it converges here too.
    // tempo scales the integrated dt of every axis, NEVER uTime (scaling the clock
    // makes the flow jump; the integration step scales, the clock keeps marching).
    function masterTempo(): number {
        return getReducedMotion() ? 0 : 1;
    }

    function drawFrame(timeSec: number): void {
        gl.useProgram(prog);
        gl.uniform2f(U.uCursor, cursor.x, flipY(cursor.y));
        gl.uniform1f(U.uCursorStrength, cursor.strength);
        gl.uniform1f(U.uCursorRadius, cursor.radius);
        // AW.W8.1 — the velocity-reactive flow uniforms (the burst decays to 0 via the
        // tempo-scaled advanceCursor, so they cannot leak motion under reduce).
        gl.uniform2f(U.uCursorVelocity, cursor.velX, -cursor.velY); // flipY on the delta
        gl.uniform1f(U.uCursorBurst, cursor.burst);
        gl.uniform1f(U.uTime, timeSec);

        // AW.W8.1 — cursor-as-light: when interactivity.light is on, the cursor drives
        // the impasto uLightDir (the AW.W4.2 movable light); a slow idle auto-orbit
        // when the cursor is at rest. Gated by the master tempo (0 under PRM) so the
        // light freezes under reduce — the orbit reads uTime which is already frozen,
        // and the cursor-driven component is zeroed by tempo. The cursor pointermove
        // WRITE-PATH (in useCursorInteraction) early-outs on reducedMotion separately.
        const cfg = getConfig();
        if (cfg.interactivity?.light) {
            const tempo = masterTempo();
            // Idle auto-orbit: a slow circle on uTime (frozen under reduce). The
            // cursor pulls the light toward the pointer when active.
            const orbit = timeSec * 0.25;
            let lx = Math.cos(orbit) * 0.5;
            let ly = Math.sin(orbit) * 0.5;
            // Pull toward the cursor (centre-relative) scaled by strength × tempo.
            const cuX = (cursor.x - 0.5) * 2.0;
            const cuY = (0.5 - cursor.y) * 2.0; // flipY
            const pull = cursor.strength * tempo;
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
        // AW.W8.1 — the velocity burst keeps the loop live while it decays out.
        if (config.interactivity?.light && cursor.burst > 1e-3) return true;
        return cursorIsLive(cursor);
    }

    return {
        frame: (timeSec) => {
            // BC.W-VIZ-AURORA (T5) — FEED the shared pointer field one tick (the one-loop
            // push-step; the field owns no own rAF). The delta is the inter-frame gap (0 on
            // the first frame). Under PRM masterTempo()=0 → tick(0) freezes the field too.
            const deltaMs =
                prevTimeSec === null
                    ? 0
                    : Math.max(0, (timeSec - prevTimeSec) * 1000);
            prevTimeSec = timeSec;
            pointerField.tick(masterTempo() === 0 ? 0 : deltaMs);
            // The iOS-27 GEL SNAP-BACK: a fast flick that DECELERATES (the acceleration
            // OPPOSES the velocity) injects a transient over-warp into the cursor burst —
            // the field springs back. The accel term is the additive fold over the
            // existing velocity/burst baseline (read here, applied to the burst the shader
            // already consumes — no new uniform, no new loop).
            const accel = pointerField.acceleration.value;
            const vel = pointerField.velocity.value;
            const decel = -(accel.x * vel.x + accel.y * vel.y);
            if (decel > 0 && masterTempo() > 0) {
                cursor.burst = Math.min(1, cursor.burst + decel * 6.0);
            }
            // tempo-scaled cursor advance — the burst/velocity collapse under PRM.
            advanceCursor(cursor, masterTempo());
            drawFrame(timeSec);
        },
        needsAnimation,
    };
}
