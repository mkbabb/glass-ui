// BC.W-VIZ-DOTMATRIX — the typed-struct SOURCE OF TRUTH for the WebGPU dot-sphere
// render uniform buffer + the static `dots` instance buffer.
//
// The WGSL `Uniforms` struct and the JS `ArrayBuffer` write offsets are generated from
// the SAME layout table here, so a std140-vs-WGSL alignment mismatch (the parity-ΔE-
// blowout trap the dot-flow/goo-blob bridges close) is structurally impossible — the
// field order + the byte offsets are ONE declaration. Every scalar packs into a vec4 lane
// + the spin mat3 is written as THREE vec4 columns (a mat3x3 in a uniform buffer occupies
// 48 bytes / 3×16-aligned columns) + each palette stop is a vec4, so the array stride is
// the natural 16 bytes (no std140 stride surprise).
//
// The `dots` buffer is the STATIC Fibonacci-phyllotaxis layout — built ONCE at setup
// (time-INVARIANT; only the spin matrix + the depth-fade are per-frame). Each dot is
// `(unitPos.xyz, sphereIdx)` = ONE vec4 (16 bytes), so a two-sphere config concatenates
// a second phyllotaxis sphere's dots into the SAME instance buffer with a per-dot
// `sphereIdx`, resolving the per-sphere offset/scale in the shader.

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import {
    MAX_DOT_STOPS,
    type DotMatrixConfig,
} from "../constants";
import { fibonacciDot, spinMatrix } from "./dotMatrixField";

/** The byte size of one dot in the instance buffer (vec4<f32> = unitPos.xyz + sphereIdx). */
export const DOT_BYTES = 16;

/** The per-sphere offset of the SECOND globe (the reference two-globe composition). */
export const SPHERE2_OFFSET = { x: 0.62, y: 0.32 } as const;
/** The per-sphere scale of the SECOND globe (a smaller satellite). */
export const SPHERE2_SCALE = 0.46;

/** The transient pointer state the interactive arm writes (closed over, never the config). */
export interface DotPointerState {
    /** Normalized-host pointer (0..1) → NDC offset; (0.5,0.5) is screen center. */
    x: number;
    y: number;
    /** 1 while the pointer is over the host, 0 at rest (decays the parallax/dimple). */
    active: number;
    /** The repel/attract sign × strength (the dimple direction · velocity scale). */
    push: number;
    /** The accel-burst brightness/scale bloom 0..1 (the flick term). */
    bloom: number;
    /**
     * The travel VELOCITY (normalized-host units/sec, the shared field's already-computed
     * `pointer.velocity` — the dead-lever reclaim). Drives the anisotropic squash/stretch +
     * the comet-tail wake direction. Mapped to NDC/frame deltas in the shader.
     */
    velX: number;
    velY: number;
    /** The flick-take ACCEL magnitude (`hypot(pointer.acceleration)`, also unused today). */
    accelMag: number;
}

/** A fresh resting pointer state. */
export function restingPointer(): DotPointerState {
    return { x: 0.5, y: 0.5, active: 0, push: 0, bloom: 0, velX: 0, velY: 0, accelMag: 0 };
}

// ── The render uniform layout (vec4 lanes; the mat3 as 3 columns) ───────────────
//   u0    : vec4<f32>  off   0  (uResolutionX, uResolutionY, uDpr, uTime)
//   u1    : vec4<f32>  off  16  (uRadius, uDotSize, uBaseOpacity, uAspect)
//   u2    : vec4<f32>  off  32  (uFacingLo, uFacingHi, uSizeLo, uSizeHi)
//   u3    : vec4<f32>  off  48  (uParallax, uPointerPush, uPointerBloom, uPointerActive)
//   u4    : vec4<f32>  off  64  (uPointerX, uPointerY, uSphere2Scale, uBreathRadius)
//   u5    : vec4<f32>  off  80  (uSphere2OffsetX, uSphere2OffsetY, uHasBackground, _pad)
//   u6    : vec4<f32>  off  96  (uLayout, uGravityStrength, uGravityRadius, uPlaneScale)
//   u7    : vec4<f32>  off 112  (uVelX, uVelY, uTwinkleRate, uWakeStrength)   ← the velocity lane
//   spin0 : vec4<f32>  off 128  (spin col0 .xyz, _pad)
//   spin1 : vec4<f32>  off 144  (spin col1 .xyz, _pad)
//   spin2 : vec4<f32>  off 160  (spin col2 .xyz, _pad)
//   ints  : vec4<i32>  off 176  (uStopCount, uDotCount, uSpheres, _pad)
//   bg    : vec4<f32>  off 192  (background.rgb, _pad)
//   pal   : array<vec4<f32>, 4>  off 208  (linear-sRGB rgb + _pad)
//   total : 208 + 4*16 = 272 bytes
export const DOT_RENDER_UNIFORM_BYTES = 208 + MAX_DOT_STOPS * 16;

const U_OFF = {
    u0: 0,
    u1: 4,
    u2: 8,
    u3: 12,
    u4: 16,
    u5: 20,
    u6: 24,
    u7: 28, // the velocity lane (velX, velY, twinkleRate, wakeStrength)
    spin0: 32,
    spin1: 36,
    spin2: 40,
    ints: 44, // viewed as Int32 lane
    bg: 48,
    palette: 52, // 4 stops × 4 words
} as const;

export interface DotUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
    i32: Int32Array;
}

export function createDotRenderScratch(): DotUniformScratch {
    const buffer = new ArrayBuffer(DOT_RENDER_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer), i32: new Int32Array(buffer) };
}

/**
 * Build the STATIC Fibonacci-phyllotaxis instance buffer — `dotCount` dots per sphere,
 * each `(unitPos.xyz, sphereIdx)`. The second sphere's dots are CONCATENATED with
 * `sphereIdx = 1` so the shader resolves the per-sphere offset/scale. Built ONCE (the
 * layout is time-invariant; the spin + depth-fade are per-frame). The WGSL
 * `instance_index → unit position` mapping reads this buffer (it does NOT re-derive the
 * phyllotaxis on the GPU — the JS+GPU agree by construction).
 */
export function buildDotsBuffer(config: DotMatrixConfig): Float32Array {
    const perSphere = Math.min(Math.max(Math.floor(config.dotCount), 1), 4000);

    // The PLANE register — a VIEWPORT-FILLING jittered rectangular lattice (z = 0), the
    // background field. The prior center-dense sunflower DISC could not self-clear its own
    // center (the density piles at r→0), so the content-deferential vignette had nothing to
    // clear. A near-square grid spanning the unit square [-1,1]² (the shader scales it wide by
    // planeScale to cover the viewport) lays dots EVENLY — uniform density everywhere — so the
    // vertex-stage vignette can genuinely fade the center where the glass card/title sits while
    // the edges stay dense. Each cell gets a deterministic golden-ratio jitter (an organic
    // anti-grid spread, no axis-aligned moiré), keyed off the index so the layout is stable +
    // the JS↔GPU round trip holds (the positions are baked here, never re-derived on the GPU).
    if (config.layout === "plane") {
        const data = new Float32Array(perSphere * 4);
        // The near-square grid dimension (cols ≈ rows ≈ √N), covering [-1,1]² edge-to-edge.
        const cols = Math.max(1, Math.round(Math.sqrt(perSphere)));
        const rows = Math.max(1, Math.ceil(perSphere / cols));
        let p = 0;
        for (let i = 0; i < perSphere; i++) {
            const cx = i % cols;
            const cy = Math.floor(i / cols);
            // The cell center in [0,1)², then a golden-ratio jitter within the cell (deterministic
            // per-index — the low-discrepancy R2 sequence, an even anti-grid scatter).
            const jx = fract2((i + 0.5) * R2_ALPHA_X);
            const jy = fract2((i + 0.5) * R2_ALPHA_Y);
            const u = (cx + jx) / cols; // [0,1)
            const v = (cy + jy) / rows; // [0,1)
            data[p + 0] = u * 2 - 1; // x ∈ [-1,1) — viewport-filling
            data[p + 1] = v * 2 - 1; // y ∈ [-1,1)
            data[p + 2] = 0; // flat — no depth
            data[p + 3] = 0; // sphereIdx (single plane)
            p += 4;
        }
        return data;
    }

    const spheres = config.spheres === 2 ? 2 : 1;
    const total = perSphere * spheres;
    const data = new Float32Array(total * 4);
    let o = 0;
    for (let s = 0; s < spheres; s++) {
        for (let i = 0; i < perSphere; i++) {
            const p = fibonacciDot(i, perSphere);
            data[o + 0] = p.x;
            data[o + 1] = p.y;
            data[o + 2] = p.z;
            data[o + 3] = s; // sphereIdx
            o += 4;
        }
    }
    return data;
}

/**
 * The R2 low-discrepancy sequence increments (Roberts' generalized golden ratio in 2D —
 * the plastic-number plane analogue of the golden-angle spiral). `α = (1/φ₂, 1/φ₂²)` where
 * φ₂ is the plastic number; an `i·α mod 1` walk gives an even, gap-free per-cell jitter with
 * no axis-aligned moiré (extremelearning.com.au "the unreasonable effectiveness of
 * quasirandom sequences"). The companion of the phyllotaxis golden angle, in the plane.
 */
const R2_ALPHA_X = 0.7548776662466927; // 1/φ₂
const R2_ALPHA_Y = 0.5698402909980532; // 1/φ₂²

/** The positive fractional part (the R2-walk modulo, never negative). */
function fract2(v: number): number {
    return v - Math.floor(v);
}

/** The total dot instance count for a config (per-sphere × spheres; plane is single). */
export function dotInstanceCount(config: DotMatrixConfig): number {
    const perSphere = Math.min(Math.max(Math.floor(config.dotCount), 1), 4000);
    if (config.layout === "plane") return perSphere;
    return perSphere * (config.spheres === 2 ? 2 : 1);
}

/** A px-size → the same NDC-radius units the WGSL `uDotSize` expects (DPR baked in). */
function dotSizeNdc(dotSizePx: number, dpr: number, resolutionMin: number): number {
    // 2 NDC units span the full min dimension; a px radius → NDC half-extent.
    return (dotSizePx * dpr * 2) / Math.max(resolutionMin, 1);
}

/**
 * Pack the per-frame render uniforms in place. `timeSec` drives the spin matrix + the
 * breathing; `pointer` carries the interactive parallax/dimple/bloom; `palette` is the
 * live ColorResolver stops (re-read each frame so a studio edit reaches the buffer).
 */
export function packDotRenderUniforms(
    scratch: DotUniformScratch,
    config: DotMatrixConfig,
    timeSec: number,
    resolutionPx: { w: number; h: number },
    dpr: number,
    pointer: DotPointerState,
    breathRadius: number,
    palette: OklchStop[],
): DotUniformScratch {
    const { f32, i32 } = scratch;
    const resMin = Math.min(resolutionPx.w, resolutionPx.h) || 1;
    const aspect = resolutionPx.w / Math.max(resolutionPx.h, 1);

    f32[U_OFF.u0 + 0] = resolutionPx.w;
    f32[U_OFF.u0 + 1] = resolutionPx.h;
    f32[U_OFF.u0 + 2] = dpr;
    f32[U_OFF.u0 + 3] = timeSec;

    f32[U_OFF.u1 + 0] = config.radius;
    f32[U_OFF.u1 + 1] = dotSizeNdc(config.dotSize, dpr, resMin);
    f32[U_OFF.u1 + 2] = config.baseOpacity;
    f32[U_OFF.u1 + 3] = aspect;

    // The depth-fade ramps (the §T2 pinned values, scaled by depthFade).
    f32[U_OFF.u2 + 0] = 0.15; // facingLo
    f32[U_OFF.u2 + 1] = 0.85 * config.depthFade; // facingHi (depthFade scales the gain)
    f32[U_OFF.u2 + 2] = 0.6; // sizeLo (DOF taper base)
    f32[U_OFF.u2 + 3] = 0.4; // sizeHi (DOF taper gain)

    f32[U_OFF.u3 + 0] = config.parallax;
    f32[U_OFF.u3 + 1] = pointer.push;
    f32[U_OFF.u3 + 2] = pointer.bloom;
    f32[U_OFF.u3 + 3] = pointer.active;

    f32[U_OFF.u4 + 0] = pointer.x;
    f32[U_OFF.u4 + 1] = pointer.y;
    f32[U_OFF.u4 + 2] = SPHERE2_SCALE;
    f32[U_OFF.u4 + 3] = breathRadius;

    f32[U_OFF.u5 + 0] = SPHERE2_OFFSET.x;
    f32[U_OFF.u5 + 1] = SPHERE2_OFFSET.y;
    f32[U_OFF.u5 + 2] = config.background === "transparent" ? 0 : 1;
    f32[U_OFF.u5 + 3] = 0;

    // The layout register + the cursor-gravity well. The plane register scales the unit disc
    // wide to cover the viewport (planeScale ≈ the aspect-corrected half-extent).
    const planeScale = 1.18 * Math.max(aspect, 1);
    f32[U_OFF.u6 + 0] = config.layout === "plane" ? 1 : 0;
    f32[U_OFF.u6 + 1] = config.gravityStrength;
    f32[U_OFF.u6 + 2] = config.gravityRadius;
    f32[U_OFF.u6 + 3] = planeScale;

    // The VELOCITY lane (u7) — the reclaimed dead-lever. `velX/velY` is the shared field's
    // already-computed `pointer.velocity` (normalized-host/sec, +x right / +y DOWN in host
    // space; the shader flips y to NDC). `twinkleRate` is the resting-twinkle clock; the
    // `wakeStrength` IS the spring-engaged `active` so the comet-tail LAGS the cursor +
    // settles with overshoot (born of the same ζ=0.7 inertial scalar — the liquid-weight bounce).
    f32[U_OFF.u7 + 0] = pointer.velX;
    f32[U_OFF.u7 + 1] = pointer.velY;
    f32[U_OFF.u7 + 2] = config.twinkle;
    f32[U_OFF.u7 + 3] = pointer.active;

    // The spin matrix — row-major mat3 written as THREE 16-byte-aligned COLUMNS (the WGSL
    // mat3x3 column-major layout; col j is rows [j, j+3, j+6] of the row-major matrix).
    const m = spinMatrix(
        timeSec,
        (config.axisTilt * Math.PI) / 180,
        config.rotationSpeed,
    );
    // column 0
    f32[U_OFF.spin0 + 0] = m[0];
    f32[U_OFF.spin0 + 1] = m[3];
    f32[U_OFF.spin0 + 2] = m[6];
    f32[U_OFF.spin0 + 3] = 0;
    // column 1
    f32[U_OFF.spin1 + 0] = m[1];
    f32[U_OFF.spin1 + 1] = m[4];
    f32[U_OFF.spin1 + 2] = m[7];
    f32[U_OFF.spin1 + 3] = 0;
    // column 2
    f32[U_OFF.spin2 + 0] = m[2];
    f32[U_OFF.spin2 + 1] = m[5];
    f32[U_OFF.spin2 + 2] = m[8];
    f32[U_OFF.spin2 + 3] = 0;

    const stopCount = Math.min(palette.length, MAX_DOT_STOPS);
    i32[U_OFF.ints + 0] = stopCount;
    i32[U_OFF.ints + 1] = dotInstanceCount(config);
    i32[U_OFF.ints + 2] = config.spheres === 2 ? 2 : 1;
    i32[U_OFF.ints + 3] = 0;

    // background (linear-sRGB).
    if (config.background === "transparent") {
        f32[U_OFF.bg + 0] = 0;
        f32[U_OFF.bg + 1] = 0;
        f32[U_OFF.bg + 2] = 0;
        f32[U_OFF.bg + 3] = 0;
    } else {
        const lin = oklchToLinear(config.background);
        f32[U_OFF.bg + 0] = lin[0];
        f32[U_OFF.bg + 1] = lin[1];
        f32[U_OFF.bg + 2] = lin[2];
        f32[U_OFF.bg + 3] = 1;
    }

    // palette stops baked to LINEAR-sRGB (the WGSL render samples in linear).
    for (let i = 0; i < MAX_DOT_STOPS; i++) {
        const base = U_OFF.palette + i * 4;
        const stop = palette[Math.min(i, stopCount - 1)] ?? palette[0];
        const lin = oklchToLinear(stop);
        f32[base + 0] = lin[0];
        f32[base + 1] = lin[1];
        f32[base + 2] = lin[2];
        f32[base + 3] = 0;
    }
    return scratch;
}
