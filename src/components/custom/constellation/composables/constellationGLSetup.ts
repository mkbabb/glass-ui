// BC.W-VIZ-CONSTELLATION — the WebGL2 `setupGL` builder (the genuinely-absent-tail path).
//
// A GPU instanced-arrays render (NOT a Canvas2D context — the §E "no canvas anywhere"
// intent: the fallback is a GPU render, not a 2D-drawing context). TWO instanced programs
// (lines + points) draw the SAME stepped field the WGSL primary renders — the per-instance
// node/edge data rides INSTANCED vertex attributes (`vertexAttribDivisor(1)`), the quad
// corner rides `gl_VertexID` (6 verts/instance), the SAME crisp `fwidth` SDF + segment-quad
// expansion + cross-line AA. The per-frame buffer write streams the SAME packed
// Float32Arrays the WGPU path uploads (one pack, two backends). The renderer's `resolveFrame`
// (the ONE JS math source + the shared pointer `tick`) is substrate-agnostic.

import type { WebGLCanvasFrame } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { resolveBudgetDpr } from "../../aurora/constants/budget";
import {
    CONSTELLATION_POINTS_VERT_GLSL,
    CONSTELLATION_POINTS_FRAG_GLSL,
} from "../shaders/constellation-points.glsl";
import {
    CONSTELLATION_LINES_VERT_GLSL,
    CONSTELLATION_LINES_FRAG_GLSL,
} from "../shaders/constellation-lines.glsl";
import {
    NODE_FLOATS,
    EDGE_FLOATS,
    createNodeScratch,
    createEdgeScratch,
    packNodes,
    packEdges,
} from "./uniformBridgeWGPU";
import { MAX_NODES, E_MAX } from "../constants";
import type { ConstellationRenderState } from "./constellationWGPUSetup";

export interface ConstellationGLSetupDeps {
    canvas: HTMLCanvasElement;
    resolveFrame: (timeSec: number) => ConstellationRenderState | null;
    onResize?: (w: number, h: number) => void;
    shouldContinue: () => boolean;
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh);
        gl.deleteShader(sh);
        throw new Error(`[Constellation] shader compile failed: ${log}`);
    }
    return sh;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`[Constellation] link failed: ${gl.getProgramInfoLog(program)}`);
    }
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return program;
}

/** Build the `setupGL(gl)` callback the `createGpuSubstrate` WebGL2 path invokes. */
export function createConstellationGLSetup(
    deps: ConstellationGLSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    const { canvas, resolveFrame, onResize, shouldContinue } = deps;

    return function setupGL(gl) {
        // ── Programs ──
        const pointsProgram = link(
            gl,
            compile(gl, gl.VERTEX_SHADER, CONSTELLATION_POINTS_VERT_GLSL),
            compile(gl, gl.FRAGMENT_SHADER, CONSTELLATION_POINTS_FRAG_GLSL),
        );
        const linesProgram = link(
            gl,
            compile(gl, gl.VERTEX_SHADER, CONSTELLATION_LINES_VERT_GLSL),
            compile(gl, gl.FRAGMENT_SHADER, CONSTELLATION_LINES_FRAG_GLSL),
        );

        // ── Points VAO — one instanced attribute (aNode, loc 0) ──
        const pointsVao = gl.createVertexArray();
        gl.bindVertexArray(pointsVao);
        const nodeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, MAX_NODES * NODE_FLOATS * 4, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, NODE_FLOATS * 4, 0);
        gl.vertexAttribDivisor(0, 1);
        gl.bindVertexArray(null);

        // ── Lines VAO — two instanced attributes (aAB loc 0, aW loc 1) ──
        const linesVao = gl.createVertexArray();
        gl.bindVertexArray(linesVao);
        const edgeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, E_MAX * EDGE_FLOATS * 4, gl.DYNAMIC_DRAW);
        const stride = EDGE_FLOATS * 4;
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, stride, 0); // aAB
        gl.vertexAttribDivisor(0, 1);
        gl.enableVertexAttribArray(1);
        gl.vertexAttribPointer(1, 4, gl.FLOAT, false, stride, 4 * 4); // aW
        gl.vertexAttribDivisor(1, 1);
        gl.bindVertexArray(null);

        // ── Uniform locations ──
        const pu = (n: string) => gl.getUniformLocation(pointsProgram, n);
        const lu = (n: string) => gl.getUniformLocation(linesProgram, n);
        const upResolution = pu("uResolution");
        const upDpr = pu("uDpr");
        const upKVis = pu("uKVis");
        const upNode = pu("uNode");
        const upNodeDim = pu("uNodeDim");
        const upOpacity = pu("uOpacityCeiling");

        const ulResolution = lu("uResolution");
        const ulDpr = lu("uDpr");
        const ulKVis = lu("uKVis");
        const ulLineWidth = lu("uLineWidth");
        const ulLine = lu("uLine");
        const ulAccent = lu("uAccent");
        const ulAlphaGlobal = lu("uAlphaGlobal");
        const ulOpacity = lu("uOpacityCeiling");
        const ulEdgeAlpha = lu("uEdgeAlpha");
        const ulEdgeFocusAlpha = lu("uEdgeFocusAlpha");
        const ulEdgeAccentAlpha = lu("uEdgeAccentAlpha");
        const ulEdgeFloor = lu("uEdgeFloor");

        const nodeScratch = createNodeScratch();
        const edgeScratch = createEdgeScratch();

        function resize(): void {
            const dpr = resolveBudgetDpr();
            const cssW = canvas.clientWidth || 320;
            const cssH = canvas.clientHeight || 320;
            const w = Math.max(1, Math.round(cssW * dpr));
            const h = Math.max(1, Math.round(cssH * dpr));
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, canvas.width, canvas.height);
            onResize?.(canvas.width, canvas.height);
        }

        function frame(timeSec: number): void {
            const state = resolveFrame(timeSec);
            if (!state) return;
            const nodeCount = packNodes(nodeScratch, state.nodes);
            const edgeCount = packEdges(edgeScratch, state.edges);
            const u = state.uniforms;

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Lines under points.
            if (edgeCount > 0) {
                gl.useProgram(linesProgram);
                gl.bindVertexArray(linesVao);
                gl.bindBuffer(gl.ARRAY_BUFFER, edgeBuffer);
                gl.bufferSubData(
                    gl.ARRAY_BUFFER,
                    0,
                    edgeScratch.subarray(0, edgeCount * EDGE_FLOATS),
                );
                gl.uniform2f(ulResolution, u.resolutionX, u.resolutionY);
                gl.uniform1f(ulDpr, u.dpr);
                gl.uniform1f(ulKVis, u.kVis);
                gl.uniform1f(ulLineWidth, u.lineWidth);
                gl.uniform4f(ulLine, u.line[0], u.line[1], u.line[2], u.line[3]);
                gl.uniform4f(ulAccent, u.accent[0], u.accent[1], u.accent[2], u.accent[3]);
                gl.uniform1f(ulAlphaGlobal, u.alpha);
                gl.uniform1f(ulOpacity, u.opacityCeiling);
                gl.uniform1f(ulEdgeAlpha, u.edgeAlpha);
                gl.uniform1f(ulEdgeFocusAlpha, u.edgeFocusAlpha);
                gl.uniform1f(ulEdgeAccentAlpha, u.edgeAccentAlpha);
                gl.uniform1f(ulEdgeFloor, u.edgeFloor);
                gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, edgeCount);
            }

            if (nodeCount > 0) {
                gl.useProgram(pointsProgram);
                gl.bindVertexArray(pointsVao);
                gl.bindBuffer(gl.ARRAY_BUFFER, nodeBuffer);
                gl.bufferSubData(
                    gl.ARRAY_BUFFER,
                    0,
                    nodeScratch.subarray(0, nodeCount * NODE_FLOATS),
                );
                gl.uniform2f(upResolution, u.resolutionX, u.resolutionY);
                gl.uniform1f(upDpr, u.dpr);
                gl.uniform1f(upKVis, u.kVis);
                gl.uniform4f(upNode, u.node[0], u.node[1], u.node[2], u.node[3]);
                gl.uniform4f(upNodeDim, u.nodeDim[0], u.nodeDim[1], u.nodeDim[2], u.nodeDim[3]);
                gl.uniform1f(upOpacity, u.opacityCeiling);
                gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, nodeCount);
            }
            gl.bindVertexArray(null);
        }

        return {
            frame,
            shouldContinue,
            resize,
            teardown: () => {
                gl.deleteProgram(pointsProgram);
                gl.deleteProgram(linesProgram);
                gl.deleteVertexArray(pointsVao);
                gl.deleteVertexArray(linesVao);
                gl.deleteBuffer(nodeBuffer);
                gl.deleteBuffer(edgeBuffer);
            },
        };
    };
}
