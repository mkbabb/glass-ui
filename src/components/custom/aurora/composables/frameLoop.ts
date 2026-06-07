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

export interface FrameLoopDeps {
    gl: WebGL2RenderingContext;
    prog: WebGLProgram;
    uniforms: UniformLocations;
    cursor: CursorState;
    /** The live config (drift uniforms gate the demand loop). */
    getConfig: () => AuroraConfig;
    /** Reduced-motion intent — parks the loop after one static frame. */
    getReducedMotion: () => boolean;
}

export interface FrameLoop {
    /** Advance the cursor easing THEN draw — the per-frame step. */
    frame: (timeSec: number) => void;
    /** Demand gate — is there live motion to render on the next frame? */
    needsAnimation: () => boolean;
}

export function createFrameLoop(deps: FrameLoopDeps): FrameLoop {
    const { gl, prog, uniforms: U, cursor, getConfig, getReducedMotion } = deps;
    const flipY = (y: number): number => 1.0 - y;

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
            // tempo-scaled cursor advance — the burst/velocity collapse under PRM.
            advanceCursor(cursor, masterTempo());
            drawFrame(timeSec);
        },
        needsAnimation,
    };
}
