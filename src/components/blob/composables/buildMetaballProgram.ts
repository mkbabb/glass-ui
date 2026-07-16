// The GooBlob GL-setup leaf — compile + link the metaball program, build the
// full-quad VAO, and resolve the uniform-location cache (scalar/vector + the
// per-satellite / per-trail / per-palette array-element locations). A pure
// `(gl) => { … }` factory: no Vue, no substrate, no closure-state read. The
// renderer's `setup(gl)` callback calls this once per fresh context (on arm AND
// on every webglcontextrestored), then closes over the returned handles. The
// build sequence is the byte-identical lift of the prior inline `setup` body.

import { compileShader, linkProgram } from "../../../composables/glass/webgl/compile";
import { METABALL_VERTEX_SRC } from "../shaders/metaball.vert";
import { METABALL_FRAGMENT_SRC } from "../shaders/metaball.frag";
import {
    MAX_SATS,
    TRAIL_N,
    MAX_BLOB_STOPS,
    UNIFORM_NAMES,
    type UniformName,
} from "../constants";
import type { MetaballUniformLocations } from "./uploadBlobUniforms";

/** Diagnostic label for the shared compile/link error path. */
const BLOB_LABEL = "[GooBlob]";

/** The compiled-program handles the renderer closes over + tears down. */
export interface MetaballProgram {
    prog: WebGLProgram;
    vs: WebGLShader;
    fs: WebGLShader;
    vao: WebGLVertexArrayObject;
    buf: WebGLBuffer;
    locs: MetaballUniformLocations;
}

/**
 * Compile the metaball shader, build the full-quad VAO, and resolve the uniform
 * location cache on a fresh context. Leaves `BLEND` enabled with the
 * premultiplied-alpha `(ONE, ONE_MINUS_SRC_ALPHA)` blend func (the source's
 * setup), `prog` in use, and the VAO bound — the caller's `resize`/`drawFrame`
 * re-bind as needed.
 */
export function buildMetaballProgram(gl: WebGL2RenderingContext): MetaballProgram {
    const vs = compileShader(gl, gl.VERTEX_SHADER, METABALL_VERTEX_SRC, BLOB_LABEL);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, METABALL_FRAGMENT_SRC, BLOB_LABEL);
    const prog = linkProgram(gl, vs, fs, BLOB_LABEL);
    gl.useProgram(prog);

    // Full-quad (two triangles) — the source's six-vertex quad.
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

    // Uniform location cache (scalar/vector uniforms).
    const U = {} as Record<UniformName, WebGLUniformLocation | null>;
    for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);

    // Per-satellite array-element locations.
    const satPosLocs: (WebGLUniformLocation | null)[] = [];
    const satRadLocs: (WebGLUniformLocation | null)[] = [];
    const satOpLocs: (WebGLUniformLocation | null)[] = [];
    // Per-satellite explicit shade and blend
    // weight (the GL color-seam widen; uSatColor[MAX_SATS] / uSatColorAmt[MAX_SATS]).
    const satColorLocs: (WebGLUniformLocation | null)[] = [];
    const satColorAmtLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < MAX_SATS; i++) {
        satPosLocs.push(gl.getUniformLocation(prog, `uSatPos[${i}]`));
        satRadLocs.push(gl.getUniformLocation(prog, `uSatRadius[${i}]`));
        satOpLocs.push(gl.getUniformLocation(prog, `uSatOpacity[${i}]`));
        satColorLocs.push(gl.getUniformLocation(prog, `uSatColor[${i}]`));
        satColorAmtLocs.push(gl.getUniformLocation(prog, `uSatColorAmt[${i}]`));
    }

    // Per-trail-element locations (mirrors the satellite plumbing; the
    // trail is a separate COMPILE-TIME-SIZED uTrail[TRAIL_N] array).
    const trailPosLocs: (WebGLUniformLocation | null)[] = [];
    const trailRadLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < TRAIL_N; i++) {
        trailPosLocs.push(gl.getUniformLocation(prog, `uTrailPos[${i}]`));
        trailRadLocs.push(gl.getUniformLocation(prog, `uTrailRadius[${i}]`));
    }

    // Per-palette-stop locations (W11.b — uPalette[MAX_BLOB_STOPS]).
    const paletteLocs: (WebGLUniformLocation | null)[] = [];
    for (let i = 0; i < MAX_BLOB_STOPS; i++) {
        paletteLocs.push(gl.getUniformLocation(prog, `uPalette[${i}]`));
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    return {
        prog,
        vs,
        fs,
        vao,
        buf,
        locs: {
            U,
            satPosLocs,
            satRadLocs,
            satOpLocs,
            satColorLocs,
            satColorAmtLocs,
            trailPosLocs,
            trailRadLocs,
            paletteLocs,
        },
    };
}
