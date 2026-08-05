/**
 * Aurora GL setup seam — shader compile/link + geometry + the uniform location
 * cache. `createAuroraGLSetup` calls `createGlProgram` on a
 * fresh context (on arm AND on every webglcontextrestored), so a GPU context loss
 * self-heals: each call rebuilds the program + the full-screen triangle + the
 * `UNIFORM_NAMES` location cache against the fresh `gl`.
 *
 * The `UNIFORM_NAMES` const-assertion is the single source of truth for the
 * shader-uniform boundary: a NEW uniform name must be added here, and the cache is
 * keyed off it, so a fresh uniform always gets a location slot.
 */

// Error-checked compile/link comes from the shared `glass/webgl/compile`
// leaf; aurora keeps its `[Aurora]` diagnostic label via the `label` arg.
import { compileShader, linkProgram } from "../../../composables/glass/webgl/compile";
import type {
    BackingSize,
    WebGLCanvasFrame,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import type { UsePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";
import { VERTEX_SRC } from "../constants/shaders/aurora.vert";
import { FRAGMENT_SRC } from "../constants/shaders/aurora.frag";
import { IMAGE_FRAGMENT_SRC } from "../constants/shaders/aurora-image.frag";
import type { AuroraConfig } from "../constants/presets";
import {
    armWebGL2ImageTexture,
    type AuroraImageCoordinator,
} from "./auroraImageSource";
import { createFrameLoop, type AuroraCursorScalars } from "./frameLoop";
import { createUniformBridge } from "./uniformBridge";

const AURORA_LABEL = "[Aurora]";

export const UNIFORM_NAMES = [
    "uTime",
    "uPalette",
    "uStopCount",
    "uNucleiCount",
    "uNucleiPos",
    "uNucleiRadius",
    "uNucleiPaletteBias",
    "uNucleiValueBias",
    "uNucleiDriftRadius",
    "uNucleiDriftPhase",
    "uNucleiElong",
    "uNucleiAngle",
    "uSoftmaxBeta",
    "uValueVariance",
    "uWarpAmount",
    "uWarpScale",
    "uWarpDrift",
    "uWarpMode",
    "uNoiseOctaves",
    "uMedium",
    "uHuePath",
    "uFlowPattern",
    "uFlowFocal",
    "uFlowAngle",
    "uFlowCurl",
    "uCursor",
    "uCursorStrength",
    "uCursorRadius",
    "uStrokeAmount",
    "uStrokeScale",
    "uStrokeAnisotropy",
    "uStrokeLayers",
    "uStrokeMode",
    // Stroke-orientation source (flow | tensor).
    "uStrokeOrient",
    // The movable impasto relight axis (cursor as light).
    "uLightDir",
    "uLightColor",
    "uWetEdge",
    "uGranulation",
    "uImpasto",
    "uBrokenColor",
    "uCanvasGrain",
    // Metal-medium knobs (uMedium==8/9).
    "uMetalPolish",
    "uMetalHeightScale",
    "uNucleiDrift",
    "uPaletteDrift",
    "uBreathDepth",
    "uBreathPeriod",
    "uSaturation",
    "uPaperGrain",
    "uAlpha",
    // Chroma-floor strength.
    "uVividness",
    // The image program's own uniform lane (the sampler + the
    // blur band + the aspect). On the PALETTE program these resolve to null locations
    // (the palette fragment declares none of them), so uploading them is a silent no-op —
    // the palette-default render is byte-identical. Only the separate image program (a
    // construction-time permutation) actually reads them.
    "uImage",
    "uBlurMin",
    "uBlurMax",
    "uImageAspect",
] as const;

export type UniformName = (typeof UNIFORM_NAMES)[number];

export type UniformLocations = Record<UniformName, WebGLUniformLocation | null>;

export interface GlProgram {
    program: WebGLProgram;
    vs: WebGLShader;
    fs: WebGLShader;
    uniforms: UniformLocations;
    geometry: { vao: WebGLVertexArrayObject; buf: WebGLBuffer };
}

/**
 * Compile + link the shader pair, build the full-screen triangle (one draw covers
 * the viewport), and resolve the uniform location cache. Leaves the program bound.
 */
function createGlProgram(
    gl: WebGL2RenderingContext,
    vertexSrc: string,
    fragmentSrc: string,
): GlProgram {
    const vs = compileShader(gl, gl.VERTEX_SHADER, vertexSrc, AURORA_LABEL);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSrc, AURORA_LABEL);
    const program = linkProgram(gl, vs, fs, AURORA_LABEL);
    gl.useProgram(program);

    // Full-screen triangle: covers the viewport with one draw.
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniform location cache — one slot per UNIFORM_NAMES entry.
    const uniforms = {} as UniformLocations;
    for (const n of UNIFORM_NAMES) uniforms[n] = gl.getUniformLocation(program, n);

    return { program, vs, fs, uniforms, geometry: { vao, buf } };
}

export interface AuroraGLSetupDeps {
    opaquePresentation: boolean;
    getConfig: () => AuroraConfig;
    getReducedMotion: () => boolean;
    getRenderTime: (elapsedSec: number) => number;
    getCursorScalars: () => AuroraCursorScalars;
    pointerField: UsePointerVelocityField;
    imageCoordinator: AuroraImageCoordinator;
    registerConfigUploader: (upload: ((config: AuroraConfig) => void) | null) => void;
}

/** Build the WebGL2 program, uniform bridge, frame loop, and teardown as one setup. */
export function createAuroraGLSetup(
    deps: AuroraGLSetupDeps,
): (gl: WebGL2RenderingContext) => WebGLCanvasFrame {
    return (gl) => {
        const useImageProgram = deps.getConfig().source === "image";
        const fragmentSrc = useImageProgram ? IMAGE_FRAGMENT_SRC : FRAGMENT_SRC;
        const { program, vs, fs, uniforms, geometry } = createGlProgram(
            gl,
            VERTEX_SRC,
            fragmentSrc,
        );
        const imageTeardown = useImageProgram
            ? armWebGL2ImageTexture(gl, program, deps.imageCoordinator)
            : null;

        const resize = (size: BackingSize): void => {
            gl.viewport(0, 0, size.w, size.h);
            gl.useProgram(program);
        };
        const uploadConfig = createUniformBridge(
            gl,
            program,
            uniforms,
            deps.opaquePresentation,
        );
        const setConfig = (config: AuroraConfig): void => uploadConfig(config);
        deps.registerConfigUploader(setConfig);
        setConfig(deps.getConfig());

        const loop = createFrameLoop({
            gl,
            prog: program,
            uniforms,
            pointerField: deps.pointerField,
            getCursorScalars: deps.getCursorScalars,
            getConfig: deps.getConfig,
            getReducedMotion: deps.getReducedMotion,
            getRenderTime: deps.getRenderTime,
        });

        gl.clearColor(0, 0, 0, deps.opaquePresentation ? 1 : 0);
        gl.disable(gl.DEPTH_TEST);
        if (deps.opaquePresentation) {
            gl.disable(gl.BLEND);
        } else {
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        }

        return {
            frame: loop.frame,
            shouldContinue: loop.needsAnimation,
            resize,
            teardown: () => {
                deps.registerConfigUploader(null);
                gl.deleteProgram(program);
                gl.deleteShader(vs);
                gl.deleteShader(fs);
                gl.deleteBuffer(geometry.buf);
                gl.deleteVertexArray(geometry.vao);
                imageTeardown?.();
            },
        };
    };
}
