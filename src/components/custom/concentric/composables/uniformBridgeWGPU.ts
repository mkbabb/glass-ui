// BC.W-VIZ-CONCENTRIC — the typed-struct SOURCE OF TRUTH for the WebGPU concentric uniform
// buffer.
//
// The WGSL `ConcentricUniforms` struct and the JS `ArrayBuffer` write offsets are generated
// from the SAME layout table here, so a std140-vs-WGSL alignment mismatch (the
// parity-ΔE-blowout trap) is structurally impossible — the field order + the byte offsets
// are ONE declaration. The aurora / goo-blob / dot-flow-field migrations established this
// pattern; this is its concentric twin.
//
// Every scalar packs into a vec4 lane + each ring row / center row / palette stop into a
// vec4 so the array stride is the natural 16 bytes (no std140 stride surprise).

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import type { RingComponent, RingCenter } from "./ringField";
import {
    MAX_RINGS,
    MAX_CENTERS,
    MAX_RING_STOPS,
    renderModeToInt,
    type ConcentricConfig,
} from "../constants";

// ── CONCENTRIC uniform layout ─────────────────────────────────────────────────
//   u0      : vec4<f32>  off   0  (uTime, uSpeed, uAxisA, uAxisB)
//   ints    : vec4<i32>  off  16  (uCenterCount, uRingCount, uStopCount, uRenderMode)
//   bg      : vec4<f32>  off  32  (background.rgb (linear), hasBackground)
//   norm    : vec4<f32>  off  48  (uFieldNorm, uAspect, _pad, _pad)
//   line    : vec4<f32>  off  64  (lineHalfWidth, aaSoftness, contourLevels, _pad)
//   rings   : array<vec4<f32>, 8>  off  80  (amplitude, wavelength, phase, _pad)
//   centers : array<vec4<f32>, 4>  off 208  (x, y, weight, rotAlpha)
//   palette : array<vec4<f32>, 4>  off 272  (linear-sRGB rgb + _pad)
//   total   : 272 + 4*16 = 336 bytes
export const CONCENTRIC_UNIFORM_BYTES =
    80 + MAX_RINGS * 16 + MAX_CENTERS * 16 + MAX_RING_STOPS * 16;

const OFF = {
    u0: 0,
    ints: 4, // viewed as Int32
    bg: 8,
    norm: 12,
    line: 16,
    rings: 20, // 8 rows × 4 words
    centers: 52, // 4 rows × 4 words
    palette: 68, // 4 stops × 4 words
} as const;

/** The field-amplitude normalization scale (field → [0,1] for the palette ramp). */
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

/** Pack the concentric uniforms in place. */
export function packConcentricUniforms(
    scratch: ConcentricUniformScratch,
    config: ConcentricConfig,
    timeSec: number,
    aspect: number,
    palette: OklchStop[],
    centersOverride?: readonly RingCenter[],
): ConcentricUniformScratch {
    const { f32, i32 } = scratch;
    const [axisA, axisB] = config.axisRatio;
    const centers = centersOverride ?? config.centers;

    f32[OFF.u0 + 0] = timeSec;
    f32[OFF.u0 + 1] = config.speed;
    f32[OFF.u0 + 2] = axisA;
    f32[OFF.u0 + 3] = axisB;

    const centerCount = Math.min(centers.length, MAX_CENTERS);
    const ringCount = Math.min(config.ringComponents.length, MAX_RINGS);
    const stopCount = Math.min(palette.length, MAX_RING_STOPS);
    i32[OFF.ints + 0] = centerCount;
    i32[OFF.ints + 1] = ringCount;
    i32[OFF.ints + 2] = stopCount;
    i32[OFF.ints + 3] = renderModeToInt(config.renderMode);

    // background (linear-sRGB) + hasBackground flag.
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
    f32[OFF.norm + 2] = 0;
    f32[OFF.norm + 3] = 0;

    // line stroke geometry (field-distance units): half-width, AA softness, contour levels.
    f32[OFF.line + 0] = config.lineWidth;
    f32[OFF.line + 1] = config.lineSoftness;
    f32[OFF.line + 2] = config.contourLevels;
    f32[OFF.line + 3] = 0;

    packRings(f32, OFF.rings, config.ringComponents);
    packCenters(f32, OFF.centers, centers);

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

/** Pack the radial ring-component table (amplitude, wavelength, phase). */
function packRings(
    f32: Float32Array,
    base: number,
    rings: readonly RingComponent[],
): void {
    for (let i = 0; i < MAX_RINGS; i++) {
        const o = base + i * 4;
        const r = rings[i];
        if (r) {
            f32[o + 0] = r.amplitude;
            f32[o + 1] = r.wavelength;
            f32[o + 2] = r.phase;
            f32[o + 3] = 0;
        } else {
            f32[o + 0] = 0;
            f32[o + 1] = 1;
            f32[o + 2] = 0;
            f32[o + 3] = 0;
        }
    }
}

/** Pack the center table (x, y, weight, rotAlpha). */
function packCenters(
    f32: Float32Array,
    base: number,
    centers: readonly RingCenter[],
): void {
    for (let i = 0; i < MAX_CENTERS; i++) {
        const o = base + i * 4;
        const c = centers[i];
        if (c) {
            f32[o + 0] = c.x;
            f32[o + 1] = c.y;
            f32[o + 2] = c.weight;
            f32[o + 3] = c.rotAlpha;
        } else {
            f32[o + 0] = 0;
            f32[o + 1] = 0;
            f32[o + 2] = 0;
            f32[o + 3] = 0;
        }
    }
}
