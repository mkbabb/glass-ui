// BG.W-DOTFLOW-REBUILD — the WebGL2 STREAMLINE fullscreen-fragment setup (the fallback path).
//
// `createFlowGLSetup` returns the `setupGL(gl)` callback the picker invokes on the WebGL2 path.
// It compiles the ONE streamline fragment program (flow-field.glsl.ts), caches its uniform
// locations, and uploads the SAME `deriveStreamUniforms`-derived scalars the WGPU packer writes
// (the ONE derivation source) each frame. NO state-texture GPGPU, NO trail FBO, NO point-sprites
// — a single opaque fullscreen draw, byte-gestalt-identical to the WGSL primary.

import type {
    WebGLCanvasFrame,
    BackingSize,
} from "../../../../composables/glass/webgl/useWebGLCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    FLOW_FIELD_VERT_GLSL,
    FLOW_FIELD_FRAG_GLSL,
} from "../shaders/flow-field.glsl";
import { MAX_FLOW_STOPS } from "../constants";
import { deriveStreamUniforms } from "./uniformBridgeWGPU";
import { linkGL } from "./flowGLProgram";
import { type FlowSetupDeps, backingAspect } from "./flowSetup";

/** Build the `setupGL(gl)` callback the picker invokes on the WebGL2 path. */
export function createFlowGLSetup(
    deps: FlowSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, config, getPalette, shouldContinue, onFrame, getPointer } = deps;

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
        const L = {
            uTime: u("uTime"),
            uAspect: u("uAspect"),
            uPx: u("uPx"),
            uFlowSlope: u("uFlowSlope"),
            uUndAmp: u("uUndAmp"),
            uUndFreq: u("uUndFreq"),
            uUndSpeed: u("uUndSpeed"),
            uWeaveAmp: u("uWeaveAmp"),
            uWeaveFreq: u("uWeaveFreq"),
            uWeaveSpeed: u("uWeaveSpeed"),
            uWeaveDirX: u("uWeaveDirX"),
            uWeaveDirY: u("uWeaveDirY"),
            uCurlWarp: u("uCurlWarp"),
            uCurlScale: u("uCurlScale"),
            uCurlDrift: u("uCurlDrift"),
            uLineSpacing: u("uLineSpacing"),
            uLineHalfWidth: u("uLineHalfWidth"),
            uLineStrength: u("uLineStrength"),
            uBeadSlope: u("uBeadSlope"),
            uBeadDrift: u("uBeadDrift"),
            uBeadRadius: u("uBeadRadius"),
            uContrast: u("uContrast"),
            uPointer: u("uPointer"),
            uPointerStrength: u("uPointerStrength"),
            uPointerRadius: u("uPointerRadius"),
            uPointerActive: u("uPointerActive"),
            uStopCount: u("uStopCount"),
            uFloor: u("uFloor"),
            uPalette: u("uPalette[0]"),
        };

        // BG.W-VIZ-RESIZE-ADOPT — upload-only (the leaf sized the backing store).
        function resize(s?: BackingSize): void {
            gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
        }

        function frame(timeSec: number): void {
            onFrame?.(timeSec);
            const aspect = backingAspect(canvas);
            const dpr = Math.max(resolveBudgetDpr(), 1);
            const pointer = getPointer?.();
            const su = deriveStreamUniforms(
                config,
                timeSec,
                aspect,
                canvas.height,
                dpr,
                getPalette(),
                pointer,
            );

            gl.useProgram(program);
            gl.bindVertexArray(vao);
            gl.disable(gl.BLEND); // the streamline output is opaque (the floor is the ground)
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(L.uTime, su.time);
            gl.uniform1f(L.uAspect, su.aspect);
            gl.uniform1f(L.uPx, su.px);
            gl.uniform1f(L.uFlowSlope, su.flowSlope);
            gl.uniform1f(L.uUndAmp, su.undAmp);
            gl.uniform1f(L.uUndFreq, su.undFreq);
            gl.uniform1f(L.uUndSpeed, su.undSpeed);
            gl.uniform1f(L.uWeaveAmp, su.weaveAmp);
            gl.uniform1f(L.uWeaveFreq, su.weaveFreq);
            gl.uniform1f(L.uWeaveSpeed, su.weaveSpeed);
            gl.uniform1f(L.uWeaveDirX, su.weaveDirX);
            gl.uniform1f(L.uWeaveDirY, su.weaveDirY);
            gl.uniform1f(L.uCurlWarp, su.curlWarp);
            gl.uniform1f(L.uCurlScale, su.curlScale);
            gl.uniform1f(L.uCurlDrift, su.curlDrift);
            gl.uniform1f(L.uLineSpacing, su.lineSpacing);
            gl.uniform1f(L.uLineHalfWidth, su.lineHalfWidth);
            gl.uniform1f(L.uLineStrength, su.lineStrength);
            gl.uniform1f(L.uBeadSlope, su.beadSlope);
            gl.uniform1f(L.uBeadDrift, su.beadDrift);
            gl.uniform1f(L.uBeadRadius, su.beadRadius);
            gl.uniform1f(L.uContrast, su.contrast);
            gl.uniform2f(L.uPointer, su.pointerX, su.pointerY);
            gl.uniform1f(L.uPointerStrength, su.pointerStrength);
            gl.uniform1f(L.uPointerRadius, su.pointerRadius);
            gl.uniform1f(L.uPointerActive, su.pointerActive);
            gl.uniform1i(L.uStopCount, su.stopCount);
            gl.uniform3f(L.uFloor, su.floorLin[0], su.floorLin[1], su.floorLin[2]);

            const palData = new Float32Array(MAX_FLOW_STOPS * 3);
            for (let i = 0; i < MAX_FLOW_STOPS; i++) {
                const s = su.paletteLin[i] ?? su.paletteLin[0];
                palData[i * 3 + 0] = s[0];
                palData[i * 3 + 1] = s[1];
                palData[i * 3 + 2] = s[2];
            }
            gl.uniform3fv(L.uPalette, palData);

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
