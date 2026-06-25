// BD.W-CONCENTRIC-RELIEF — the typed-struct SOURCE OF TRUTH for the WebGPU concentric uniform
// buffer (the level-set topography + the opaque finishing-layer tunables).
//
// The WGSL `ConcentricUniforms` struct and the JS `ArrayBuffer` write offsets are generated
// from the SAME layout table here, so a std140-vs-WGSL alignment mismatch is structurally
// impossible — the field order + the byte offsets are ONE declaration.

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import { MAX_RING_STOPS, type ConcentricConfig } from "../constants";
import type { Vec2 } from "./levelField";

// ── CONCENTRIC uniform layout (BD.W-CONCENTRIC-RELIEF) ──────────────────────────
// The finishing-layer tunables ride ONE new `tune` vec4 + two spare lanes folded
// (`norm.zw` ← lightDir, `line.w` ← indexEvery). The bind GROUP is unchanged; the
// struct grows +16B (208 → 224) via this single-source layout table — a std140↔WGSL
// alignment mismatch is structurally impossible (field order + offsets are ONE decl).
//   u0      : vec4<f32>  off   0  (uTime, uSpeed, uCellSize, _pad)
//   ints    : vec4<i32>  off  16  (_pad, _pad, uStopCount, _pad)
//   bg      : vec4<f32>  off  32  (background.rgb (linear), hasBackground)
//   norm    : vec4<f32>  off  48  (uFieldNorm, uAspect, lightDirX, lightDirY)
//   line    : vec4<f32>  off  64  (lineHalfWidth, aaSoftness, contourLevels, indexEvery)
//   wave    : vec4<f32>  off  80  (waveDirX, waveDirY, waveK, waveOmega)
//   wave2   : vec4<f32>  off  96  (waveSigma, twistMax, shearMax, amp)
//   topo    : vec4<f32>  off 112  (heightOctaves, heightSeed, swellAmp, perturbAmp)
//   cursor  : vec4<f32>  off 128  (cursorX, cursorY, cursorWell, interactive)
//   tune    : vec4<f32>  off 144  (toneGain, shadeAmp, indexMul, inkDarken)
//   palette : array<vec4<f32>, 4>  off 160  (linear-sRGB rgb + _pad)
//   total   : 160 + 4*16 = 224 bytes
export const CONCENTRIC_UNIFORM_BYTES = 160 + MAX_RING_STOPS * 16;

const OFF = {
    u0: 0,
    ints: 4, // viewed as Int32
    bg: 8,
    norm: 12,
    line: 16,
    wave: 20,
    wave2: 24,
    topo: 28,
    cursor: 32,
    tune: 36,
    palette: 40, // 4 stops × 4 words
} as const;

/** The height-amplitude normalization scale (height → [0,1] for the topographic ramp). */
export const CONCENTRIC_FIELD_NORM = 0.55;

export interface ConcentricUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createConcentricScratch(): ConcentricUniformScratch {
    const buffer = new ArrayBuffer(CONCENTRIC_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** Pack the concentric uniforms in place. `cursor` is the pointer in DOMAIN space; `amp` the
 * spring-eased traveling-wave envelope amplitude (PRM → 0); `wellScale` the velocity-HEAVE
 * multiplier on the cursor well depth+radius (1.0 at rest → grows with pointer speed; JS-side
 * so the heave costs no uniform lane). */
export function packConcentricUniforms(
    scratch: ConcentricUniformScratch,
    config: ConcentricConfig,
    timeSec: number,
    aspect: number,
    palette: OklchStop[],
    cursor: Vec2,
    amp: number,
    wellScale: number,
): ConcentricUniformScratch {
    const { f32, i32 } = scratch;

    f32[OFF.u0 + 0] = timeSec;
    f32[OFF.u0 + 1] = config.speed;
    f32[OFF.u0 + 2] = config.cellSize;
    f32[OFF.u0 + 3] = 0;

    const stopCount = Math.min(palette.length, MAX_RING_STOPS);
    i32[OFF.ints + 0] = 0;
    i32[OFF.ints + 1] = 0;
    i32[OFF.ints + 2] = stopCount;
    i32[OFF.ints + 3] = 0;

    if (config.background === "transparent") {
        f32[OFF.bg + 0] = 0;
        f32[OFF.bg + 1] = 0;
        f32[OFF.bg + 2] = 0;
        f32[OFF.bg + 3] = 0;
    } else {
        const lin = oklchToLinear(config.background);
        f32[OFF.bg + 0] = lin[0];
        f32[OFF.bg + 1] = lin[1];
        f32[OFF.bg + 2] = lin[2];
        f32[OFF.bg + 3] = 1;
    }

    f32[OFF.norm + 0] = CONCENTRIC_FIELD_NORM;
    f32[OFF.norm + 1] = aspect;
    f32[OFF.norm + 2] = config.lightDir[0]; // folded lane — the cel-light X
    f32[OFF.norm + 3] = config.lightDir[1]; // folded lane — the cel-light Y

    f32[OFF.line + 0] = config.lineWidth;
    f32[OFF.line + 1] = config.lineSoftness;
    f32[OFF.line + 2] = config.contourLevels;
    f32[OFF.line + 3] = config.indexEvery; // folded lane — the index stride

    f32[OFF.wave + 0] = config.waveDir[0];
    f32[OFF.wave + 1] = config.waveDir[1];
    f32[OFF.wave + 2] = config.waveK;
    f32[OFF.wave + 3] = config.waveOmega;

    f32[OFF.wave2 + 0] = config.waveSigma;
    f32[OFF.wave2 + 1] = config.twistMax;
    f32[OFF.wave2 + 2] = config.shearMax;
    f32[OFF.wave2 + 3] = amp;

    f32[OFF.topo + 0] = config.heightOctaves;
    f32[OFF.topo + 1] = config.heightSeed;
    f32[OFF.topo + 2] = config.swellAmp;
    f32[OFF.topo + 3] = config.perturbAmp;

    f32[OFF.cursor + 0] = cursor.x;
    f32[OFF.cursor + 1] = cursor.y;
    f32[OFF.cursor + 2] = config.cursorWell * wellScale; // velocity-HEAVE (JS-side, free)
    f32[OFF.cursor + 3] = config.interactive ? 1 : 0;

    // the finishing-layer tunables (the recomposed fragment reads these).
    f32[OFF.tune + 0] = config.toneGain;
    f32[OFF.tune + 1] = config.shadeAmp;
    f32[OFF.tune + 2] = config.indexMul;
    f32[OFF.tune + 3] = config.inkDarken;

    // palette stops baked to LINEAR-sRGB (the WGSL/GLSL fragment samples in linear).
    for (let i = 0; i < MAX_RING_STOPS; i++) {
        const base = OFF.palette + i * 4;
        const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
        const lin = oklchToLinear(stop);
        f32[base + 0] = lin[0];
        f32[base + 1] = lin[1];
        f32[base + 2] = lin[2];
        f32[base + 3] = 0;
    }
    return scratch;
}
