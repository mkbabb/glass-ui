// BD.W-DOTFLOW-AURORA-CURRENT — the `flow` WebGL2 channel (the AURORA CURRENT path).
//
// The state-texture GPGPU advect + two-FBO RGBA16F trail + point-sprite mote draw + present
// composite. Carved out of the WebGL2 substrate leaf (no-god-module) so the `field` lattice
// setup and this advected-population setup are colocated siblings sharing flowGLProgram's
// compile/link/probe/half-float helpers.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgl/useWebGLCanvas";
import { oklchToLinear } from "../../../../composables/color";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    FLOW_FIELD_QUAD_VERT_GLSL,
    FLOW_FIELD_STATE_GLSL,
    FLOW_FIELD_POINT_VERT_GLSL,
    FLOW_FIELD_POINT_FRAG_GLSL,
    FLOW_FIELD_TRAIL_FRAG_GLSL,
    FLOW_FIELD_PRESENT_FRAG_GLSL,
} from "../shaders/flow-field.glsl";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS, flowTrailDecay } from "../constants";
import {
    FLOW_DOMAIN_HALF,
    FLOW_SPEED_NORM,
    seedFlowBuffer,
} from "./uniformBridgeWGPU";
import { linkGL, probeRenderable, float32ToHalf } from "./flowGLProgram";
import {
    type FlowSetupDeps,
    FLOW_FLOOR_OKLCH,
    FLOW_BLOOM_OKLCH,
    flowCount,
    stateCols,
} from "./useFlowParticles";

/**
 * The `flow` WebGL2 channel — the AURORA CURRENT, made real + measurable + equal-gestalt:
 *   1. STATE-TEXTURE GPGPU advect pass (one texel per mote; pos/speed/life ping-pong),
 *   2. TRAIL decay-blit (prev → cur at the derived α) on a two-FBO RGBA16F ping-pong,
 *   3. MOTE point-sprite draw (additive into the trail; speed→hue/brightness),
 *   4. PRESENT composite (trail over the warm floor + corner-bloom → the swapchain).
 * The float state/trail RTs fall RGBA32F→RGBA16F where the render extension is absent (R-A);
 * the trail is pinned NEAREST (no half-float-linear extension dependency).
 */
export function createFlowGLFlow(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

    return function setupGL(gl) {
        const count = flowCount(config);
        const cols = stateCols(count);

        // ── float-render capability probe (R-A): prefer RGBA32F, fall to RGBA16F ──
        gl.getExtension("EXT_color_buffer_float");
        gl.getExtension("EXT_color_buffer_half_float");
        gl.getExtension("OES_texture_float_linear");
        const stateInternal = probeRenderable(gl, gl.RGBA32F, gl.FLOAT)
            ? { internal: gl.RGBA32F, type: gl.FLOAT }
            : { internal: gl.RGBA16F, type: gl.HALF_FLOAT };
        const trailInternal = probeRenderable(gl, gl.RGBA16F, gl.HALF_FLOAT)
            ? { internal: gl.RGBA16F, type: gl.HALF_FLOAT }
            : { internal: gl.RGBA8, type: gl.UNSIGNED_BYTE };

        // ── programs ──
        const stateProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_STATE_GLSL);
        const pointProg = linkGL(gl, FLOW_FIELD_POINT_VERT_GLSL, FLOW_FIELD_POINT_FRAG_GLSL);
        const trailProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_TRAIL_FRAG_GLSL);
        const presentProg = linkGL(gl, FLOW_FIELD_QUAD_VERT_GLSL, FLOW_FIELD_PRESENT_FRAG_GLSL);

        // ── the fullscreen quad VAO (shared by the state/trail/present passes) ──
        const quadVao = gl.createVertexArray();
        gl.bindVertexArray(quadVao);
        const quadBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        for (const p of [stateProg, trailProg, presentProg]) {
            const l = gl.getAttribLocation(p, "aPosition");
            if (l >= 0) {
                gl.enableVertexAttribArray(l);
                gl.vertexAttribPointer(l, 2, gl.FLOAT, false, 0, 0);
            }
        }
        gl.bindVertexArray(null);
        // a bare VAO for the point draw (positions come from the state texture by VertexID).
        const pointVao = gl.createVertexArray();

        // ── the state ping-pong (one texel per mote, seeded scattered + life-staggered) ──
        const seed = seedFlowBuffer(count, config.lifetimeSec);
        const stateData = new Float32Array(cols * cols * 4);
        stateData.set(seed.subarray(0, Math.min(seed.length, stateData.length)));

        function mkStateTex(data: Float32Array | null): WebGLTexture {
            const tex = gl.createTexture()!;
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            const src =
                data && stateInternal.type === gl.FLOAT ? data : data ? float32ToHalf(data) : null;
            gl.texImage2D(gl.TEXTURE_2D, 0, stateInternal.internal, cols, cols, 0, gl.RGBA, stateInternal.type, src);
            return tex;
        }
        const stateTex: [WebGLTexture, WebGLTexture] = [mkStateTex(stateData), mkStateTex(null)];
        const stateFbo: [WebGLFramebuffer, WebGLFramebuffer] = [gl.createFramebuffer()!, gl.createFramebuffer()!];
        for (let i = 0; i < 2; i++) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, stateFbo[i]);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, stateTex[i], 0);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        // ── the trail ping-pong (half-res RGBA16F) ──
        let trailTex: [WebGLTexture, WebGLTexture] | null = null;
        let trailFbo: [WebGLFramebuffer, WebGLFramebuffer] | null = null;
        let trailW = 2;
        let trailH = 2;

        function rebuildTrail(): void {
            const scale = Math.min(Math.max(config.trailScale, 0.25), 1);
            trailW = Math.max(2, Math.round(canvas.width * scale));
            trailH = Math.max(2, Math.round(canvas.height * scale));
            trailTex?.forEach((t) => gl.deleteTexture(t));
            trailFbo?.forEach((f) => gl.deleteFramebuffer(f));
            const mk = (): WebGLTexture => {
                const tex = gl.createTexture()!;
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texImage2D(gl.TEXTURE_2D, 0, trailInternal.internal, trailW, trailH, 0, gl.RGBA, trailInternal.type, null);
                return tex;
            };
            const a = mk();
            const b = mk();
            trailTex = [a, b];
            const fa = gl.createFramebuffer()!;
            const fb = gl.createFramebuffer()!;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fa);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, b, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            // clear both to black so frame-0 starts on a clean floor.
            for (const f of [fa, fb]) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, f);
                gl.viewport(0, 0, trailW, trailH);
                gl.clearColor(0, 0, 0, 0);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            trailFbo = [fa, fb];
        }

        // ── uniform locations ──
        const su = (n: string) => gl.getUniformLocation(stateProg, n);
        const sLoc = {
            uState: su("uState"), uDt: su("uDt"), uDomainHalf: su("uDomainHalf"),
            uTurnRate: su("uTurnRate"), uSpeedScale: su("uSpeedScale"), uLifetimeSec: su("uLifetimeSec"),
            uEdgeBias: su("uEdgeBias"), uCursor: su("uCursor"), uPointerVel: su("uPointerVel"),
            uBurst: su("uBurst"), uPointerActive: su("uPointerActive"), uVortexRadius: su("uVortexRadius"),
            uVortexSpin: su("uVortexSpin"), uDragGain: su("uDragGain"), uBurstShove: su("uBurstShove"),
            uTime: su("uTime"), uWindSpeed: su("uWindSpeed"), uCurlStrength: su("uCurlStrength"),
            uWaveCount: su("uWaveCount"), uWaves: su("uWaves[0]"),
        };
        const pu = (n: string) => gl.getUniformLocation(pointProg, n);
        const pLoc = {
            uState: pu("uState"), uStateCols: pu("uStateCols"), uDomainHalf: pu("uDomainHalf"),
            uPointSize: pu("uPointSize"), uSpeedNorm: pu("uSpeedNorm"), uStretchAmp: pu("uStretchAmp"),
            uStopCount: pu("uStopCount"), uPalette: pu("uPalette[0]"), uSpeedGlow: pu("uSpeedGlow"),
        };
        const tu = (n: string) => gl.getUniformLocation(trailProg, n);
        const tLoc = { uPrev: tu("uPrev"), uDecay: tu("uDecay") };
        const ru = (n: string) => gl.getUniformLocation(presentProg, n);
        const rLoc = { uTrail: ru("uTrail"), uFloor: ru("uFloor"), uBloom: ru("uBloomColor"), uHasGround: ru("uHasGround") };

        let ping = 0;
        let lastTime = -1;

        // BG.W-VIZ-RESIZE-ADOPT — upload-only. The LEAF sized the backing store; the
        // closure rebuilds the trail FBOs to the new backing (`rebuildTrail` reads the
        // leaf-set `canvas.width/height`).
        function resize(_s?: BackingSize): void {
            rebuildTrail();
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            if (!trailFbo || !trailTex) rebuildTrail();
            const dt = lastTime < 0 ? 0 : Math.min(Math.max(timeSec - lastTime, 0), 0.05);
            lastTime = timeSec;
            const pointer = getPointer?.();
            const cur = ping;
            const prev = 1 - ping;

            // ── 1. STATE advect: read stateTex[prev] → write stateTex[cur] ──
            gl.disable(gl.BLEND);
            gl.bindFramebuffer(gl.FRAMEBUFFER, stateFbo[cur]);
            gl.viewport(0, 0, cols, cols);
            gl.useProgram(stateProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, stateTex[prev]);
            gl.uniform1i(sLoc.uState, 0);
            gl.uniform1f(sLoc.uDt, dt);
            gl.uniform1f(sLoc.uDomainHalf, FLOW_DOMAIN_HALF);
            gl.uniform1f(sLoc.uTurnRate, config.turnRate);
            gl.uniform1f(sLoc.uSpeedScale, config.speedScale);
            gl.uniform1f(sLoc.uLifetimeSec, config.lifetimeSec);
            gl.uniform1f(sLoc.uEdgeBias, config.edgeBias);
            gl.uniform1f(sLoc.uTime, timeSec);
            gl.uniform1f(sLoc.uWindSpeed, config.windSpeed);
            gl.uniform1f(sLoc.uCurlStrength, config.curlStrength);
            gl.uniform1f(sLoc.uVortexRadius, config.vortexRadius);
            gl.uniform1f(sLoc.uVortexSpin, config.vortexSpin);
            gl.uniform1f(sLoc.uDragGain, config.dragGain);
            gl.uniform1f(sLoc.uBurstShove, config.burstShove);
            if (pointer) {
                gl.uniform2f(sLoc.uCursor, pointer.cursorX, pointer.cursorY);
                gl.uniform2f(sLoc.uPointerVel, pointer.velX, pointer.velY);
                gl.uniform1f(sLoc.uBurst, pointer.burst);
                gl.uniform1f(sLoc.uPointerActive, pointer.active);
            } else {
                gl.uniform1f(sLoc.uPointerActive, 0);
            }
            const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
            gl.uniform1i(sLoc.uWaveCount, waveCount);
            const waveData = new Float32Array(MAX_WAVE_COMPONENTS * 4);
            for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
                const w = config.waveComponents[i];
                waveData[i * 4 + 0] = w?.amplitude ?? 0;
                waveData[i * 4 + 1] = w?.wavelength ?? 1;
                waveData[i * 4 + 2] = w?.direction ?? 0;
                waveData[i * 4 + 3] = w?.phase ?? 0;
            }
            gl.uniform4fv(sLoc.uWaves, waveData);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            // ── 2. TRAIL decay-blit: trailTex[prev] → trailFbo[cur] at α ──
            gl.bindFramebuffer(gl.FRAMEBUFFER, trailFbo![cur]);
            gl.viewport(0, 0, trailW, trailH);
            gl.disable(gl.BLEND);
            gl.useProgram(trailProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, trailTex![prev]);
            gl.uniform1i(tLoc.uPrev, 0);
            gl.uniform1f(tLoc.uDecay, flowTrailDecay(config.trailHalfLife));
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            // ── 3. MOTES additive into trailFbo[cur] (point sprites from the state tex) ──
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE);
            gl.useProgram(pointProg);
            gl.bindVertexArray(pointVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, stateTex[cur]);
            gl.uniform1i(pLoc.uState, 0);
            gl.uniform1i(pLoc.uStateCols, cols);
            gl.uniform1f(pLoc.uDomainHalf, FLOW_DOMAIN_HALF);
            const dpr = resolveBudgetDpr();
            gl.uniform1f(pLoc.uPointSize, Math.max(config.dotSize * dpr * 1.5, 1));
            gl.uniform1f(pLoc.uSpeedNorm, FLOW_SPEED_NORM);
            gl.uniform1f(pLoc.uStretchAmp, config.stretchAmp);
            gl.uniform1f(pLoc.uSpeedGlow, config.speedGlow);
            const palette = getPalette();
            const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
            gl.uniform1i(pLoc.uStopCount, stopCount);
            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
                const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
                const lin = oklchToLinear(stop);
                palData[i * 3 + 0] = lin[0];
                palData[i * 3 + 1] = lin[1];
                palData[i * 3 + 2] = lin[2];
            }
            gl.uniform3fv(pLoc.uPalette, palData);
            gl.drawArrays(gl.POINTS, 0, count);

            // ── 4. PRESENT: composite trailTex[cur] over the warm floor → the swapchain ──
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.disable(gl.BLEND);
            gl.useProgram(presentProg);
            gl.bindVertexArray(quadVao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, trailTex![cur]);
            gl.uniform1i(rLoc.uTrail, 0);
            const hasGround = config.background === "transparent" ? 0 : 1;
            const floorLin = oklchToLinear(
                config.background === "transparent" ? FLOW_FLOOR_OKLCH : config.background,
            );
            const bloomLin = oklchToLinear(FLOW_BLOOM_OKLCH);
            gl.uniform3f(rLoc.uFloor, floorLin[0], floorLin[1], floorLin[2]);
            gl.uniform3f(rLoc.uBloom, bloomLin[0], bloomLin[1], bloomLin[2]);
            gl.uniform1f(rLoc.uHasGround, hasGround);
            gl.drawArrays(gl.TRIANGLES, 0, 3);

            gl.bindVertexArray(null);
            ping = prev; // swap state + trail in lockstep
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(stateProg);
                gl.deleteProgram(pointProg);
                gl.deleteProgram(trailProg);
                gl.deleteProgram(presentProg);
                gl.deleteVertexArray(quadVao);
                gl.deleteVertexArray(pointVao);
                gl.deleteBuffer(quadBuf);
                stateTex.forEach((t) => gl.deleteTexture(t));
                stateFbo.forEach((f) => gl.deleteFramebuffer(f));
                trailTex?.forEach((t) => gl.deleteTexture(t));
                trailFbo?.forEach((f) => gl.deleteFramebuffer(f));
            },
        };
    };
}
