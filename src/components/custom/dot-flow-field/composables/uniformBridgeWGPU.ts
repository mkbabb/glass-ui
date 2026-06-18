// BB.W-VIZ-SUITE (W-FLOWFIELD) — the typed-struct SOURCE OF TRUTH for the WebGPU
// compute + render uniform buffers.
//
// The WGSL `FlowUniforms` (compute) + `RenderUniforms` (render) structs and the JS
// `ArrayBuffer` write offsets are generated from the SAME layout tables here, so a
// std140-vs-WGSL alignment mismatch (the parity-ΔE-blowout trap) is structurally
// impossible — the field order + the byte offsets are ONE declaration. The aurora /
// goo-blob migrations established this pattern; this is its flow-field twin.
//
// Both buffers pack every scalar into a vec4 lane + each wave row + each palette stop
// into a vec4 so the array stride is the natural 16 bytes (no std140 stride surprise).

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import type { WaveComponent } from "./flowField";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS, type FlowFieldConfig } from "../constants";

// ── COMPUTE uniform layout ────────────────────────────────────────────────────
//   p0    : vec4<f32>  off   0  (uTime, uDt, uWindSpeed, uCurlStrength)
//   p1    : vec4<f32>  off  16  (uDomainHalf, uReseedJitter, _pad, _pad)
//   ints  : vec4<i32>  off  32  (uWaveCount, uParticleCount, _pad, _pad)
//   waves : array<vec4<f32>, 8>  off  48  (amplitude, wavelength, directionDeg, phase)
//   total : 48 + 8*16 = 176 bytes
export const FLOW_COMPUTE_UNIFORM_BYTES = 48 + MAX_WAVE_COMPONENTS * 16;

const C_OFF = {
    p0: 0,
    p1: 4,
    ints: 8, // viewed as Int32
    waves: 12, // 8 rows × 4 words
} as const;

export interface FlowUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createFlowComputeScratch(): FlowUniformScratch {
    const buffer = new ArrayBuffer(FLOW_COMPUTE_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** The domain half-extent (mirrors the WGSL `uDomainHalf`). */
export const FLOW_DOMAIN_HALF = 0.85;

/** Pack the compute uniforms in place. */
export function packFlowComputeUniforms(
    scratch: FlowUniformScratch,
    config: FlowFieldConfig,
    timeSec: number,
    dt: number,
    particleCount: number,
): FlowUniformScratch {
    const { f32, i32 } = scratch;
    f32[C_OFF.p0 + 0] = timeSec;
    f32[C_OFF.p0 + 1] = dt;
    f32[C_OFF.p0 + 2] = config.windSpeed;
    f32[C_OFF.p0 + 3] = config.curlStrength;

    f32[C_OFF.p1 + 0] = FLOW_DOMAIN_HALF;
    f32[C_OFF.p1 + 1] = 0.0;
    f32[C_OFF.p1 + 2] = 0.0;
    f32[C_OFF.p1 + 3] = 0.0;

    const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
    i32[C_OFF.ints + 0] = waveCount;
    i32[C_OFF.ints + 1] = particleCount;
    i32[C_OFF.ints + 2] = 0;
    i32[C_OFF.ints + 3] = 0;

    packWaves(f32, C_OFF.waves, config.waveComponents);
    return scratch;
}

// ── RENDER uniform layout ─────────────────────────────────────────────────────
//   r0      : vec4<f32>  off   0  (uTime, uWindSpeed, uCurlStrength, uDomainHalf)
//   r1      : vec4<f32>  off  16  (uDotSize, uDotSizeVelocity, uAspect, uVMax)
//   ints    : vec4<i32>  off  32  (uWaveCount, uStopCount, uParticleCount, _pad)
//   bg      : vec4<f32>  off  48  (background.rgb, hasBackground)
//   waves   : array<vec4<f32>, 8>  off  64  (amplitude, wavelength, directionDeg, phase)
//   palette : array<vec4<f32>, 4>  off  192  (linear-sRGB rgb + _pad)
//   total   : 192 + 4*16 = 256 bytes
export const FLOW_RENDER_UNIFORM_BYTES = 192 + MAX_FLOW_STOPS * 16;

const R_OFF = {
    r0: 0,
    r1: 4,
    ints: 8,
    bg: 12,
    waves: 16, // 8 rows × 4 words
    palette: 48, // 4 stops × 4 words
} as const;

export function createFlowRenderScratch(): FlowUniformScratch {
    const buffer = new ArrayBuffer(FLOW_RENDER_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** A px-size in CSS-px → the same domain units the WGSL `uDotSize` expects. */
function dotSizeDomain(dotSizePx: number, canvasCssMin: number): number {
    // size in domain units = px / (px-per-domain-unit); domain spans [-half, half] over
    // the min CSS dimension → px-per-domain = canvasCssMin / (2·half).
    const pxPerDomain = canvasCssMin / (2 * FLOW_DOMAIN_HALF);
    return dotSizePx / Math.max(pxPerDomain, 1e-4);
}

/** Pack the render uniforms in place. */
export function packFlowRenderUniforms(
    scratch: FlowUniformScratch,
    config: FlowFieldConfig,
    timeSec: number,
    aspect: number,
    canvasCssMin: number,
    palette: OklchStop[],
): FlowUniformScratch {
    const { f32, i32 } = scratch;
    f32[R_OFF.r0 + 0] = timeSec;
    f32[R_OFF.r0 + 1] = config.windSpeed;
    f32[R_OFF.r0 + 2] = config.curlStrength;
    f32[R_OFF.r0 + 3] = FLOW_DOMAIN_HALF;

    f32[R_OFF.r1 + 0] = dotSizeDomain(config.dotSize, canvasCssMin);
    f32[R_OFF.r1 + 1] = config.dotSizeVelocity;
    f32[R_OFF.r1 + 2] = aspect;
    f32[R_OFF.r1 + 3] = 2.0; // uVMax — the velocity normalization ceiling

    const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
    const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
    i32[R_OFF.ints + 0] = waveCount;
    i32[R_OFF.ints + 1] = stopCount;
    i32[R_OFF.ints + 2] = config.particleCount;
    i32[R_OFF.ints + 3] = 0;

    // background (linear-sRGB) + hasBackground flag.
    if (config.background === "transparent") {
        f32[R_OFF.bg + 0] = 0;
        f32[R_OFF.bg + 1] = 0;
        f32[R_OFF.bg + 2] = 0;
        f32[R_OFF.bg + 3] = 0;
    } else {
        const lin = oklchToLinear(config.background);
        f32[R_OFF.bg + 0] = lin[0];
        f32[R_OFF.bg + 1] = lin[1];
        f32[R_OFF.bg + 2] = lin[2];
        f32[R_OFF.bg + 3] = 1;
    }

    packWaves(f32, R_OFF.waves, config.waveComponents);

    // palette stops baked to LINEAR-sRGB (the WGSL render samples in linear).
    for (let i = 0; i < MAX_FLOW_STOPS; i++) {
        const base = R_OFF.palette + i * 4;
        const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
        const lin = oklchToLinear(stop);
        f32[base + 0] = lin[0];
        f32[base + 1] = lin[1];
        f32[base + 2] = lin[2];
        f32[base + 3] = 0;
    }
    return scratch;
}

/** Pack the shared wave-component table (both buffers carry it identically). */
function packWaves(
    f32: Float32Array,
    base: number,
    waves: readonly WaveComponent[],
): void {
    for (let i = 0; i < MAX_WAVE_COMPONENTS; i++) {
        const o = base + i * 4;
        const w = waves[i];
        if (w) {
            f32[o + 0] = w.amplitude;
            f32[o + 1] = w.wavelength;
            f32[o + 2] = w.direction;
            f32[o + 3] = w.phase;
        } else {
            f32[o + 0] = 0;
            f32[o + 1] = 1;
            f32[o + 2] = 0;
            f32[o + 3] = 0;
        }
    }
}

/** The byte size of one particle in the storage buffer (vec4<f32>). */
export const FLOW_PARTICLE_BYTES = 16;

/**
 * Seed the particle storage buffer: each particle is (pos.x, pos.y, age, seed) in the
 * domain [-half, half]. The seed is deterministic per index so a re-mount is reproducible.
 */
export function seedParticleBuffer(particleCount: number): Float32Array {
    const data = new Float32Array(particleCount * 4);
    for (let i = 0; i < particleCount; i++) {
        const seed = (i + 1) * 0.6180339887;
        let r1 = Math.sin(seed * 71.13) * 43758.5453;
        r1 -= Math.floor(r1);
        let r2 = Math.sin(seed * 19.31 + 4) * 43758.5453;
        r2 -= Math.floor(r2);
        const o = i * 4;
        data[o + 0] = (r1 * 2 - 1) * FLOW_DOMAIN_HALF;
        data[o + 1] = (r2 * 2 - 1) * FLOW_DOMAIN_HALF;
        data[o + 2] = (r1 * 6) % 6; // staggered age
        data[o + 3] = seed;
    }
    return data;
}
