// BC.W-VIZ-DOTFLOW — the typed-struct SOURCE OF TRUTH for the WebGPU compute + render
// uniform buffers (the anchored-lattice retopology).
//
// The WGSL `FlowUniforms` (compute) + `RenderUniforms` (render) structs and the JS
// `ArrayBuffer` write offsets are generated from the SAME layout tables here, so a
// std140-vs-WGSL alignment mismatch (the parity-ΔE-blowout trap) is structurally
// impossible — the field order + the byte offsets are ONE declaration.
//
// Both buffers pack every scalar into a vec4 lane + each wave row + each palette stop into
// a vec4 so the array stride is the natural 16 bytes (no std140 stride surprise).

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import type { WaveComponent } from "./flowField";
import { FLOW_DOMAIN_HALF as FLOW_DOMAIN_HALF_MATH } from "./flowField";
import { MAX_WAVE_COMPONENTS, MAX_FLOW_STOPS, type FlowFieldConfig } from "../constants";

/** The domain half-extent (the lattice spans [-half, half]²; mirrors flowField.ts). */
export const FLOW_DOMAIN_HALF = FLOW_DOMAIN_HALF_MATH;

// ── The deterministic lattice geometry (cols / rows / count from a px pitch) ────
// `gridPitch` is in CSS-px; the lattice spans the [-half, half] domain over the MIN CSS
// dimension. cols = ceil(domainExtentPx / pitchPx); count = cols² (a square lattice). The
// count is clamped to the storage-buffer cap. The compute kernel + the render pass + the
// JS seed ALL read this ONE geometry so the index→origin mapping is identical everywhere.
export interface FlowGridGeometry {
    cols: number;
    count: number;
    /** The lattice pitch in DOMAIN units (the px pitch mapped to the domain). */
    pitchDomain: number;
}

/** Compile-time lattice cap (mirrors the WGSL storage-buffer array bound). */
export const FLOW_MAX_LATTICE = 16384;

export function flowGridGeometry(
    gridPitchPx: number,
    canvasCssMin: number,
): FlowGridGeometry {
    const domainExtentPx = canvasCssMin || 320;
    const pitch = Math.max(gridPitchPx, 4);
    // cols across the visible MIN dimension, +2 margin cells so the lattice fills past the
    // edges (the wider axis is covered by the same square lattice — the aspect crops it).
    const cols = Math.min(
        Math.max(Math.ceil(domainExtentPx / pitch) + 2, 4),
        128,
    );
    const count = Math.min(cols * cols, FLOW_MAX_LATTICE);
    // pitch in domain units: the domain extent (2·half) spans `cols` cells.
    const pitchDomain = (2 * FLOW_DOMAIN_HALF) / Math.max(cols, 1);
    return { cols, count, pitchDomain };
}

// ── COMPUTE uniform layout (BD.W-DOTFLOW-AURORA-CURRENT) ────────────────────────
//   p0    : vec4<f32>  off   0  (uTime, uDt, uWindSpeed, uCurlStrength)
//   p1    : vec4<f32>  off  16  (uGridPitch, uDisplaceAmp, uSpringK, uGridCols)  [field]
//   ints  : vec4<i32>  off  32  (uWaveCount, uParticleCount, uGridColsI, uMode)
//   f0    : vec4<f32>  off  48  (uTurnRate, uSpeedScale, uLifetimeSec, uDomainHalf) [flow]
//   f1    : vec4<f32>  off  64  (uVortexRadius, uVortexSpin, uDragGain, uBurstShove)
//   ptr   : vec4<f32>  off  80  (cursor.x, cursor.y, vel.x, vel.y)
//   ptr2  : vec4<f32>  off  96  (burst, pointerActive, edgeBias, _pad)
//   waves : array<vec4<f32>, 8>  off 112  (amplitude, wavelength, directionDeg, phase)
//   total : 112 + 8*16 = 240 bytes
export const FLOW_COMPUTE_UNIFORM_BYTES = 112 + MAX_WAVE_COMPONENTS * 16;

const C_OFF = {
    p0: 0,
    p1: 4,
    ints: 8, // viewed as Int32
    f0: 12,
    f1: 16,
    ptr: 20,
    ptr2: 24,
    waves: 28, // 8 rows × 4 words
} as const;

/** The live pointer/vortex state the renderer feeds the compute kernel each frame. */
export interface FlowPointerState {
    /** Cursor in domain space ([-half,half]²). */
    cursorX: number;
    cursorY: number;
    /** Pointer velocity in domain units / sec. */
    velX: number;
    velY: number;
    /** Flick-burst impulse (0..1). */
    burst: number;
    /** Pointer active (1) / inert (0). */
    active: number;
}

/** A rest (pointer-inert) state — the vortex is off. */
export const FLOW_POINTER_REST: FlowPointerState = {
    cursorX: 0,
    cursorY: 0,
    velX: 0,
    velY: 0,
    burst: 0,
    active: 0,
};

export interface FlowUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createFlowComputeScratch(): FlowUniformScratch {
    const buffer = new ArrayBuffer(FLOW_COMPUTE_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** Pack the compute uniforms in place. `count` is the live mote/lattice count (flow mode
 *  uses particleCount; field mode uses the lattice geometry count). */
export function packFlowComputeUniforms(
    scratch: FlowUniformScratch,
    config: FlowFieldConfig,
    timeSec: number,
    dt: number,
    geometry: FlowGridGeometry,
    count: number,
    pointer: FlowPointerState = FLOW_POINTER_REST,
): FlowUniformScratch {
    const { f32, i32 } = scratch;
    const isFlow = config.mode === "flow";

    f32[C_OFF.p0 + 0] = timeSec;
    f32[C_OFF.p0 + 1] = dt;
    f32[C_OFF.p0 + 2] = config.windSpeed;
    f32[C_OFF.p0 + 3] = config.curlStrength;

    f32[C_OFF.p1 + 0] = geometry.pitchDomain;
    f32[C_OFF.p1 + 1] = config.displaceAmp;
    f32[C_OFF.p1 + 2] = config.springK;
    f32[C_OFF.p1 + 3] = geometry.cols;

    const waveCount = Math.min(config.waveComponents.length, MAX_WAVE_COMPONENTS);
    i32[C_OFF.ints + 0] = waveCount;
    i32[C_OFF.ints + 1] = count;
    i32[C_OFF.ints + 2] = geometry.cols;
    i32[C_OFF.ints + 3] = isFlow ? 1 : 0; // uMode

    // flow advection levers.
    f32[C_OFF.f0 + 0] = config.turnRate;
    f32[C_OFF.f0 + 1] = config.speedScale;
    f32[C_OFF.f0 + 2] = config.lifetimeSec;
    f32[C_OFF.f0 + 3] = FLOW_DOMAIN_HALF;

    // the cursor vortex.
    f32[C_OFF.f1 + 0] = config.vortexRadius;
    f32[C_OFF.f1 + 1] = config.vortexSpin;
    f32[C_OFF.f1 + 2] = config.dragGain;
    f32[C_OFF.f1 + 3] = config.burstShove;

    // the live pointer state.
    f32[C_OFF.ptr + 0] = pointer.cursorX;
    f32[C_OFF.ptr + 1] = pointer.cursorY;
    f32[C_OFF.ptr + 2] = pointer.velX;
    f32[C_OFF.ptr + 3] = pointer.velY;
    f32[C_OFF.ptr2 + 0] = pointer.burst;
    f32[C_OFF.ptr2 + 1] = pointer.active;
    f32[C_OFF.ptr2 + 2] = config.edgeBias;
    f32[C_OFF.ptr2 + 3] = 0;

    packWaves(f32, C_OFF.waves, config.waveComponents);
    return scratch;
}

// ── RENDER uniform layout (BD.W-DOTFLOW-AURORA-CURRENT) ─────────────────────────
//   r0      : vec4<f32>  off   0  (uTime, uContrast, uBaseBright, uDomainHalf)
//   r1      : vec4<f32>  off  16  (uDotSize, uSizePulse, uAspect, uGridPitch)
//   r2      : vec4<f32>  off  32  (uWaveBandCenter, uWaveBandWidth, uGlobeMask, uMode)
//   ints    : vec4<i32>  off  48  (uStopCount, uParticleCount, _pad, _pad)
//   bg      : vec4<f32>  off  64  (background.rgb, hasBackground)
//   f0      : vec4<f32>  off  80  (uSpeedGlow, uSpeedNorm, uShadowOffset, uStretchAmp)
//   palette : array<vec4<f32>, 4>  off  96  (linear-sRGB rgb + _pad)
//   total   : 96 + 4*16 = 160 bytes
export const FLOW_RENDER_UNIFORM_BYTES = 96 + MAX_FLOW_STOPS * 16;

/** The speed normalizer (the modal mote speed maps to the ramp MIDDLE — H2: so the full
 *  ember→gold→white spread paints, not a unimodal-amber blowout). */
export const FLOW_SPEED_NORM = 0.022;

const R_OFF = {
    r0: 0,
    r1: 4,
    r2: 8,
    ints: 12,
    bg: 16,
    f0: 20,
    palette: 24, // 4 stops × 4 words
} as const;

export function createFlowRenderScratch(): FlowUniformScratch {
    const buffer = new ArrayBuffer(FLOW_RENDER_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/** The base resting brightness (the calm-lattice floor before the band lights a dot). */
export const FLOW_BASE_BRIGHT = 0.22;

/** The drift-driven size pulse (a subtle breathing; never a re-seed). */
export const FLOW_SIZE_PULSE = 0.4;

/** A px-size in CSS-px → the same domain units the WGSL `uDotSize` expects. */
function dotSizeDomain(dotSizePx: number, canvasCssMin: number): number {
    const pxPerDomain = (canvasCssMin || 320) / (2 * FLOW_DOMAIN_HALF);
    return dotSizePx / Math.max(pxPerDomain, 1e-4);
}

/** Pack the render uniforms in place. */
export function packFlowRenderUniforms(
    scratch: FlowUniformScratch,
    config: FlowFieldConfig,
    timeSec: number,
    aspect: number,
    canvasCssMin: number,
    geometry: FlowGridGeometry,
    palette: OklchStop[],
): FlowUniformScratch {
    const { f32, i32 } = scratch;
    f32[R_OFF.r0 + 0] = timeSec;
    f32[R_OFF.r0 + 1] = config.contrast;
    f32[R_OFF.r0 + 2] = FLOW_BASE_BRIGHT;
    f32[R_OFF.r0 + 3] = FLOW_DOMAIN_HALF;

    f32[R_OFF.r1 + 0] = dotSizeDomain(config.dotSize, canvasCssMin);
    f32[R_OFF.r1 + 1] = FLOW_SIZE_PULSE;
    f32[R_OFF.r1 + 2] = aspect;
    f32[R_OFF.r1 + 3] = geometry.pitchDomain;

    f32[R_OFF.r2 + 0] = config.waveBandCenter;
    f32[R_OFF.r2 + 1] = config.waveBandWidth;
    f32[R_OFF.r2 + 2] = config.globeMask ? 1 : 0;
    f32[R_OFF.r2 + 3] = config.mode === "flow" ? 1 : 0; // uMode

    // flow velocity-map levers.
    f32[R_OFF.f0 + 0] = config.speedGlow;
    f32[R_OFF.f0 + 1] = FLOW_SPEED_NORM;
    f32[R_OFF.f0 + 2] = config.shadowOffset;
    f32[R_OFF.f0 + 3] = config.stretchAmp;

    const stopCount = Math.min(palette.length, MAX_FLOW_STOPS);
    i32[R_OFF.ints + 0] = stopCount;
    i32[R_OFF.ints + 1] = geometry.count;
    i32[R_OFF.ints + 2] = 0;
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

/** The byte size of one lattice dot in the storage buffer (vec4<f32>). */
export const FLOW_PARTICLE_BYTES = 16;

/**
 * Seed the lattice storage buffer: each dot starts AT its anchor origin (the restoring
 * spring needs no initial offset). `(pos.x, pos.y, height=0, |disp|=0)` per index — the
 * compute kernel re-derives the origin from `gridOrigin(index, cols, pitch)` each frame,
 * so the seed only needs the starting position (the lattice settles on the first frames).
 */
export function seedLatticeBuffer(geometry: FlowGridGeometry): Float32Array {
    const { cols, count, pitchDomain } = geometry;
    const data = new Float32Array(count * 4);
    const half = ((cols - 1) * pitchDomain) / 2;
    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const o = i * 4;
        data[o + 0] = col * pitchDomain - half;
        data[o + 1] = row * pitchDomain - half;
        data[o + 2] = 0;
        data[o + 3] = 0;
    }
    return data;
}

/**
 * BD.W-DOTFLOW-AURORA-CURRENT — seed the FLOW mote buffer: each mote scattered across the
 * domain, life STAGGERED across [0, lifetimeSec) so deaths/respawns don't synchronize (the
 * field never blinks). `(pos.x, pos.y, speed=0, life)` per index. A deterministic hash so
 * the capture path reproduces.
 */
export function seedFlowBuffer(count: number, lifetimeSec: number): Float32Array {
    const data = new Float32Array(count * 4);
    const half = FLOW_DOMAIN_HALF;
    // a small deterministic LCG so the scatter is reproducible (capture path).
    let s = 0x9e3779b9 >>> 0;
    const rnd = (): number => {
        s = (s * 1664525 + 1013904223) >>> 0;
        return s / 0xffffffff;
    };
    for (let i = 0; i < count; i++) {
        const o = i * 4;
        data[o + 0] = (rnd() * 2 - 1) * half;
        data[o + 1] = (rnd() * 2 - 1) * half;
        data[o + 2] = 0;
        data[o + 3] = rnd() * Math.max(lifetimeSec, 1e-3);
    }
    return data;
}
