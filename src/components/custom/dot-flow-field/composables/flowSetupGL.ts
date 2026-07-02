// BD.W-DOTFLOW-AURORA-CURRENT — the WebGL2 substrate entry (the LIVE path on most hosts).
//
// `createFlowGLSetup` returns the `setupGL(gl)` WebGL2 callback. It routes `flow` to the
// state-texture GPGPU channel (flowSetupGLFlow.ts) and owns the `field` fullscreen-fragment
// dot-lattice setup directly. Both invoke `onFrame(t)` from inside their frame callback (the
// shared pointer field push-step — the no-own-rAF discipline).
//
// Carved from useFlowParticles.ts at the WGPU/WebGL2 backend seam (no-god-module): the shared
// GL compile/link/probe helpers live in flowGLProgram.ts; the `flow` channel in
// flowSetupGLFlow.ts; the shared deps/constants/helpers in useFlowParticles.ts.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgl/useWebGLCanvas";
import { oklchToLinear } from "../../../../composables/color";
import {
    FLOW_FIELD_VERT_GLSL,
    FLOW_FIELD_FRAG_GLSL,
} from "../shaders/flow-field.glsl";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS } from "../constants";
import {
    FLOW_BASE_BRIGHT,
    FLOW_DOMAIN_HALF,
} from "./uniformBridgeWGPU";
import { linkGL } from "./flowGLProgram";
import { createFlowGLFlow } from "./flowSetupGLFlow";
import {
    type FlowSetupDeps,
    cssMin,
    flowGridGeometry,
} from "./useFlowParticles";

/**
 * Build the `setupGL(gl)` callback the picker invokes on the WebGL2 path (the LIVE path).
 * `field` is the kept fullscreen-fragment dot-lattice; `flow` routes to the state-texture
 * GPGPU + two-FBO trail + point-sprite motes + present composite (flowSetupGLFlow) — the SAME
 * advected-population gestalt as the WGPU compute path (the ONE math source via the GLSL chunk).
 */
export function createFlowGLSetup(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    if (deps.config.mode === "flow") return createFlowGLFlow(deps);
    const { canvas, config, getPalette, shouldContinue, onFrame } = deps;

    // ── field — the kept fullscreen-fragment dot-lattice (BC.W-VIZ-DOTFLOW, untouched) ──
    return function setupGL(gl) {
        const program = linkGL(gl, FLOW_FIELD_VERT_GLSL, FLOW_FIELD_FRAG_GLSL);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        gl.bindVertexArray(null);

        const u = (name: string) => gl.getUniformLocation(program, name);
        const uTime = u("uTime");
        const uWindSpeed = u("uWindSpeed");
        const uCurlStrength = u("uCurlStrength");
        const uDomainHalf = u("uDomainHalf");
        const uAspect = u("uAspect");
        const uGridPitchDomain = u("uGridPitchDomain");
        const uDotRadiusDomain = u("uDotRadiusDomain");
        const uDisplaceAmp = u("uDisplaceAmp");
        const uContrast = u("uContrast");
        const uBaseBright = u("uBaseBright");
        const uWaveBandCenter = u("uWaveBandCenter");
        const uWaveBandWidth = u("uWaveBandWidth");
        const uGlobeMask = u("uGlobeMask");
        const uWaveCount = u("uWaveCount");
        const uStopCount = u("uStopCount");
        const uHasBackground = u("uHasBackground");
        const uBg = u("uBg");
        const uWaves = u("uWaves[0]");
        const uPalette = u("uPalette[0]");

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const min = cssMin(canvas);
            const aspect = canvas.width / Math.max(canvas.height, 1);
            const geometry = flowGridGeometry(config.gridPitch, min);
            const pxPerDomain = min / (2 * FLOW_DOMAIN_HALF);
            const dotRadiusDomain = config.dotSize / Math.max(pxPerDomain, 1e-4);

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTime, timeSec);
            gl.uniform1f(uWindSpeed, config.windSpeed);
            gl.uniform1f(uCurlStrength, config.curlStrength);
            gl.uniform1f(uDomainHalf, FLOW_DOMAIN_HALF);
            gl.uniform1f(uAspect, aspect);
            gl.uniform1f(uGridPitchDomain, geometry.pitchDomain);
            gl.uniform1f(uDotRadiusDomain, dotRadiusDomain);
            gl.uniform1f(uDisplaceAmp, config.displaceAmp);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uBaseBright, FLOW_BASE_BRIGHT);
            gl.uniform1f(uWaveBandCenter, config.waveBandCenter);
            gl.uniform1f(uWaveBandWidth, config.waveBandWidth);
            gl.uniform1f(uGlobeMask, config.globeMask ? 1 : 0);

            const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
            gl.uniform1i(uWaveCount, waveCount);
            gl.uniform1i(uStopCount, stopCount);

            if (config.background === "transparent") {
                gl.uniform1f(uHasBackground, 0);
                gl.uniform3f(uBg, 0, 0, 0);
            } else {
                gl.uniform1f(uHasBackground, 1);
                const lin = oklchToLinear(config.background);
                gl.uniform3f(uBg, lin[0], lin[1], lin[2]);
            }

            const waveData = new Float32Array(MAX_WAVE_COMPONENTS * 4);
            for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
                const w = config.waveComponents[i];
                waveData[i * 4 + 0] = w?.amplitude ?? 0;
                waveData[i * 4 + 1] = w?.wavelength ?? 1;
                waveData[i * 4 + 2] = w?.direction ?? 0;
                waveData[i * 4 + 3] = w?.phase ?? 0;
            }
            gl.uniform4fv(uWaves, waveData);

            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(uPalette, palData);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
            gl.bindVertexArray(null);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(program);
                gl.deleteVertexArray(vao);
                gl.deleteBuffer(buf);
            },
        };
    };
}
