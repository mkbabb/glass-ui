// BC.W-CARVE6 — the goo-dot-matrix GPU/GL RESOURCE construction, carved out of
// useGooDotMatrix.ts to hold the 500-line no-god-module bound. A cohesive sub-concern: the
// one-time pipeline/buffer/bind-group build (WGPU) + the program/VAO/uniform-location wiring
// (WebGL2). The per-frame `setupWGPU`/`setupGL` draw closures live in the sibling gooDotFrame.ts
// leaf (BG.W-GOODOT-SETUP-SPLIT — the second carve, holding the 500-line bound), which CALLS
// these creators ONCE on setup then reads the returned resources each frame. The construction is
// byte-faithful — same buffers, same layout, same locations — just re-homed.

import { compileShader, linkProgram } from "../../../../composables/glass/webgl/compile";
import {
    BLOB_WGPU_UNIFORM_BYTES,
    createBlobWGPUUniformScratch,
    type BlobWGPUUniformScratch,
} from "../../goo-blob/composables/uniformBridgeWGPU";
import {
    type MetaballUniformLocations,
    type UniformName,
} from "../../goo-blob/composables/uploadBlobUniforms";
import {
    MAX_SATS,
    TRAIL_N,
    MAX_BLOB_STOPS,
    UNIFORM_NAMES,
} from "../../goo-blob/constants";
import { GOO_DOT_WGSL, GOO_DOT_GROUND_WGSL } from "../shaders/goo-dot.wgsl";
import {
    GOO_DOT_VERT_GLSL,
    GOO_DOT_FRAG_GLSL,
    GOO_DOT_GROUND_VERT_GLSL,
    GOO_DOT_GROUND_FRAG_GLSL,
} from "../shaders/goo-dot.frag";
import {
    GOO_DOT_UNIFORM_BYTES,
    createGooDotScratch,
    type GooDotUniformScratch,
} from "./uniformBridgeWGPU";

// WebGPU usage/visibility bitflags (lib.dom declares the TYPES not the VALUE namespaces).
const BUFFER_USAGE_UNIFORM = 0x40;
const BUFFER_USAGE_COPY_DST = 0x8;
const SHADER_STAGE_VERTEX = 0x1;
const SHADER_STAGE_FRAGMENT = 0x2;

export const GOO_DOT_LABEL = "[GooDotMatrix]";

/** The ground uniform buffer byte size — ONE vec4 (uGroundTime, aspect, pad, pad). */
export const GOO_DOT_GROUND_BYTES = 16;

/** The one-time WGPU resources the per-frame closure reads (the dot pipeline + the ground
 * pipeline (Move 4a, pass-1) + the buffers + scratch). */
export interface GooDotWGPUResources {
    pipeline: GPURenderPipeline;
    bindGroup: GPUBindGroup;
    /** Move 4a — the warm-ground pass-1 pipeline (its own minimal shader, NOT Aurora). */
    groundPipeline: GPURenderPipeline;
    groundBindGroup: GPUBindGroup;
    groundBuffer: GPUBuffer;
    groundScratch: Float32Array;
    fieldBuffer: GPUBuffer;
    dotBuffer: GPUBuffer;
    fieldScratch: BlobWGPUUniformScratch;
    dotScratch: GooDotUniformScratch;
}

/**
 * Build the WGPU dot-stamp pipeline + the field (binding0) / dot-grid (binding1) uniform
 * buffers + bind group + the two scratch buffers — ONCE on `setupWGPU`. The composable's
 * per-frame closure writes the scratch via the pack helpers then submits the draw.
 */
export function createGooDotWGPUResources(
    device: GPUDevice,
    format: GPUTextureFormat,
): GooDotWGPUResources {
    const module = device.createShaderModule({
        label: `${GOO_DOT_LABEL} goo-dot.wgsl`,
        code: GOO_DOT_WGSL,
    });
    const fieldBuffer = device.createBuffer({
        label: `${GOO_DOT_LABEL} field-uniforms`,
        size: BLOB_WGPU_UNIFORM_BYTES,
        usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
    });
    const dotBuffer = device.createBuffer({
        label: `${GOO_DOT_LABEL} dot-uniforms`,
        size: GOO_DOT_UNIFORM_BYTES,
        usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
    });
    const bgl = device.createBindGroupLayout({
        label: `${GOO_DOT_LABEL} bgl`,
        entries: [
            {
                binding: 0,
                visibility: SHADER_STAGE_VERTEX | SHADER_STAGE_FRAGMENT,
                buffer: { type: "uniform" },
            },
            {
                binding: 1,
                visibility: SHADER_STAGE_FRAGMENT,
                buffer: { type: "uniform" },
            },
        ],
    });
    const pipeline = device.createRenderPipeline({
        label: `${GOO_DOT_LABEL} pipeline`,
        layout: device.createPipelineLayout({ bindGroupLayouts: [bgl] }),
        vertex: { module, entryPoint: "vs_main" },
        fragment: {
            module,
            entryPoint: "fs_main",
            targets: [
                {
                    format,
                    blend: {
                        color: {
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add",
                        },
                        alpha: {
                            srcFactor: "one",
                            dstFactor: "one-minus-src-alpha",
                            operation: "add",
                        },
                    },
                },
            ],
        },
        primitive: { topology: "triangle-list" },
    });
    const bindGroup = device.createBindGroup({
        label: `${GOO_DOT_LABEL} bg`,
        layout: bgl,
        entries: [
            { binding: 0, resource: { buffer: fieldBuffer } },
            { binding: 1, resource: { buffer: dotBuffer } },
        ],
    });

    // ── Move 4a — the warm-ground pass-1 pipeline (its OWN minimal module, NOT Aurora). +1
    // pipeline / +1 module / +1 BGL / +1 draw, in the ONE owned context. Opaque (no blend);
    // drawn first with loadOp:"clear", the dot pass-2 loads over it.
    const groundModule = device.createShaderModule({
        label: `${GOO_DOT_LABEL} goo-dot-ground.wgsl`,
        code: GOO_DOT_GROUND_WGSL,
    });
    const groundBuffer = device.createBuffer({
        label: `${GOO_DOT_LABEL} ground-uniforms`,
        size: GOO_DOT_GROUND_BYTES,
        usage: BUFFER_USAGE_UNIFORM | BUFFER_USAGE_COPY_DST,
    });
    const groundBgl = device.createBindGroupLayout({
        label: `${GOO_DOT_LABEL} ground-bgl`,
        entries: [
            {
                binding: 0,
                visibility: SHADER_STAGE_FRAGMENT,
                buffer: { type: "uniform" },
            },
        ],
    });
    const groundPipeline = device.createRenderPipeline({
        label: `${GOO_DOT_LABEL} ground-pipeline`,
        layout: device.createPipelineLayout({ bindGroupLayouts: [groundBgl] }),
        vertex: { module: groundModule, entryPoint: "vs_main" },
        fragment: {
            module: groundModule,
            entryPoint: "fs_main",
            targets: [{ format }],
        },
        primitive: { topology: "triangle-list" },
    });
    const groundBindGroup = device.createBindGroup({
        label: `${GOO_DOT_LABEL} ground-bg`,
        layout: groundBgl,
        entries: [{ binding: 0, resource: { buffer: groundBuffer } }],
    });

    return {
        pipeline,
        bindGroup,
        groundPipeline,
        groundBindGroup,
        groundBuffer,
        groundScratch: new Float32Array(GOO_DOT_GROUND_BYTES / 4),
        fieldBuffer,
        dotBuffer,
        fieldScratch: createBlobWGPUUniformScratch(),
        dotScratch: createGooDotScratch(),
    };
}

/** The dot-grid uniform locations (the dot extend, beside the field locations). The N named
 * scalars are the GLSL twin of the WGSL s8–s13 lane-fields; a unit asserts count parity. */
export interface GooDotGLUniforms {
    mode: WebGLUniformLocation | null;
    pix: WebGLUniformLocation | null;
    floor: WebGLUniformLocation | null;
    bright: WebGLUniformLocation | null;
    min: WebGLUniformLocation | null;
    max: WebGLUniformLocation | null;
    pr: WebGLUniformLocation | null;
    pm: WebGLUniformLocation | null;
    pa: WebGLUniformLocation | null;
    cursor: WebGLUniformLocation | null;
    bloom: WebGLUniformLocation | null;
    shadowGate: WebGLUniformLocation | null;
    presenceFloor: WebGLUniformLocation | null;
    weldLo: WebGLUniformLocation | null;
    weldHi: WebGLUniformLocation | null;
    time: WebGLUniformLocation | null;
    weldSwell: WebGLUniformLocation | null;
    weldSpecular: WebGLUniformLocation | null;
    flowAmt: WebGLUniformLocation | null;
    latticeSquash: WebGLUniformLocation | null;
}

/** The Move 4a warm-ground GL program (the WebGL2/Safari tail of pass-1). */
export interface GooDotGroundGLResources {
    prog: WebGLProgram;
    vs: WebGLShader;
    fs: WebGLShader;
    vao: WebGLVertexArrayObject;
    buf: WebGLBuffer;
    uTime: WebGLUniformLocation | null;
}

/** The one-time GL resources the per-frame closure reads (program + VAO + the field + dot
 * locations + the Move 4a ground program). */
export interface GooDotGLResources {
    prog: WebGLProgram;
    vs: WebGLShader;
    fs: WebGLShader;
    buf: WebGLBuffer;
    vao: WebGLVertexArrayObject;
    locs: MetaballUniformLocations;
    dU: GooDotGLUniforms;
    ground: GooDotGroundGLResources;
}

/**
 * Build the WebGL2 dot-stamp program + the full-quad VAO + the field uniform-location cache
 * (the SAME UNIFORM_NAMES the field GLSL declares) + the dot-grid uniform locations — ONCE on
 * `setupGL`. The composable's per-frame closure sets the dot uniforms then calls the REUSED
 * goo-blob `uploadBlobUniforms` (which writes the field + issues the draw).
 */
export function createGooDotGLResources(
    gl: WebGL2RenderingContext,
): GooDotGLResources {
    const vs = compileShader(gl, gl.VERTEX_SHADER, GOO_DOT_VERT_GLSL, GOO_DOT_LABEL);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, GOO_DOT_FRAG_GLSL, GOO_DOT_LABEL);
    const prog = linkProgram(gl, vs, fs, GOO_DOT_LABEL);
    gl.useProgram(prog);

    // The full-quad VAO (the metaball aPosition convention — uploadBlobUniforms draws it).
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // The field uniform-location cache (the SAME UNIFORM_NAMES the field GLSL declares).
    const U = {} as Record<UniformName, WebGLUniformLocation | null>;
    for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);
    const satPosLocs: (WebGLUniformLocation | null)[] = [];
    const satRadLocs: (WebGLUniformLocation | null)[] = [];
    const satOpLocs: (WebGLUniformLocation | null)[] = [];
    // F9.R1 (BG.W-BLOB-SATELLITE-SHADE) — mirror the goo-blob per-satellite explicit-shade
    // loc cache so the REUSED uploadBlobUniforms writes them (unused in the dot-render
    // shader → getUniformLocation null → a harmless no-op, byte-identical to HEAD).
    const satColorLocs: (WebGLUniformLocation | null)[] = [];
    const satColorAmtLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < MAX_SATS; i++) {
        satPosLocs.push(gl.getUniformLocation(prog, `uSatPos[${i}]`));
        satRadLocs.push(gl.getUniformLocation(prog, `uSatRadius[${i}]`));
        satOpLocs.push(gl.getUniformLocation(prog, `uSatOpacity[${i}]`));
        satColorLocs.push(gl.getUniformLocation(prog, `uSatColor[${i}]`));
        satColorAmtLocs.push(gl.getUniformLocation(prog, `uSatColorAmt[${i}]`));
    }
    const trailPosLocs: (WebGLUniformLocation | null)[] = [];
    const trailRadLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < TRAIL_N; i++) {
        trailPosLocs.push(gl.getUniformLocation(prog, `uTrailPos[${i}]`));
        trailRadLocs.push(gl.getUniformLocation(prog, `uTrailRadius[${i}]`));
    }
    const paletteLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < MAX_BLOB_STOPS; i++) {
        paletteLocs.push(gl.getUniformLocation(prog, `uPalette[${i}]`));
    }
    const locs: MetaballUniformLocations = {
        U,
        satPosLocs,
        satRadLocs,
        satOpLocs,
        satColorLocs,
        satColorAmtLocs,
        trailPosLocs,
        trailRadLocs,
        paletteLocs,
    };

    // The dot-grid uniform locations (the extend — the N named scalars).
    const dU: GooDotGLUniforms = {
        mode: gl.getUniformLocation(prog, "uDotMode"),
        pix: gl.getUniformLocation(prog, "uDotPixelSize"),
        floor: gl.getUniformLocation(prog, "uFieldFloor"),
        bright: gl.getUniformLocation(prog, "uDotBrightFloor"),
        min: gl.getUniformLocation(prog, "uDotMin"),
        max: gl.getUniformLocation(prog, "uDotMax"),
        pr: gl.getUniformLocation(prog, "uDotPointerRadius"),
        pm: gl.getUniformLocation(prog, "uDotPointerMode"),
        pa: gl.getUniformLocation(prog, "uDotPointerActive"),
        cursor: gl.getUniformLocation(prog, "uDotCursor"),
        bloom: gl.getUniformLocation(prog, "uDotBloom"),
        shadowGate: gl.getUniformLocation(prog, "uDotShadowGate"),
        presenceFloor: gl.getUniformLocation(prog, "uPresenceFloor"),
        weldLo: gl.getUniformLocation(prog, "uWeldLo"),
        weldHi: gl.getUniformLocation(prog, "uWeldHi"),
        time: gl.getUniformLocation(prog, "uDotTime"),
        weldSwell: gl.getUniformLocation(prog, "uWeldSwell"),
        weldSpecular: gl.getUniformLocation(prog, "uWeldSpecular"),
        flowAmt: gl.getUniformLocation(prog, "uFlowAmt"),
        latticeSquash: gl.getUniformLocation(prog, "uLatticeSquash"),
    };

    // ── Move 4a — the warm-ground program (the WebGL2 tail of pass-1). Its own full-quad VAO
    // (the dot pass reuses the shared field-upload quad; this one is independent).
    const gVs = compileShader(gl, gl.VERTEX_SHADER, GOO_DOT_GROUND_VERT_GLSL, GOO_DOT_LABEL);
    const gFs = compileShader(gl, gl.FRAGMENT_SHADER, GOO_DOT_GROUND_FRAG_GLSL, GOO_DOT_LABEL);
    const gProg = linkProgram(gl, gVs, gFs, GOO_DOT_LABEL);
    const gVao = gl.createVertexArray()!;
    gl.bindVertexArray(gVao);
    const gBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, gBuf);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW,
    );
    const gAPos = gl.getAttribLocation(gProg, "aPosition");
    gl.enableVertexAttribArray(gAPos);
    gl.vertexAttribPointer(gAPos, 2, gl.FLOAT, false, 0, 0);
    const ground: GooDotGroundGLResources = {
        prog: gProg,
        vs: gVs,
        fs: gFs,
        vao: gVao,
        buf: gBuf,
        uTime: gl.getUniformLocation(gProg, "uGroundTime"),
    };
    gl.bindVertexArray(null);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    return { prog, vs, fs, buf, vao, locs, dU, ground };
}
