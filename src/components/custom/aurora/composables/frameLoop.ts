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

    function drawFrame(timeSec: number): void {
        gl.useProgram(prog);
        gl.uniform2f(U.uCursor, cursor.x, flipY(cursor.y));
        gl.uniform1f(U.uCursorStrength, cursor.strength);
        gl.uniform1f(U.uCursorRadius, cursor.radius);
        gl.uniform1f(U.uTime, timeSec);
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
        return cursorIsLive(cursor);
    }

    return {
        frame: (timeSec) => {
            advanceCursor(cursor);
            drawFrame(timeSec);
        },
        needsAnimation,
    };
}
