// The typed-struct SOURCE OF TRUTH for the WebGPU liquid-grid uniform
// buffer.
//
// The WGSL `LiquidGridUniforms` struct and the JS `ArrayBuffer` write offsets are generated
// from the SAME layout table here, so a std140-vs-WGSL alignment mismatch (the
// parity-ΔE-blowout / garbage-read trap) is structurally impossible — the field order + the
// byte offsets are ONE declaration. The aurora / goo-blob / dot-flow-field / concentric
// migrations established this pattern; this is its liquid-grid twin.
//
// Every scalar packs into a vec4 lane so the natural-16-byte std140 stride holds (no array
// rows here — the grid is a pure fullscreen fragment with scalar uniforms only).

import type { OklchStop } from "../../../composables/color";
import { oklchToLinear } from "../../../composables/color";
import type { LiquidGridConfig } from "../constants";
import type { Vec2 } from "./liquidGrid";
import { gridScaleFor } from "./liquidGrid";

// ── LIQUID-GRID uniform layout ─────────────────────────────────────────────────
//   u0      : vec4<f32>  off   0  (uTime, uGridScale, uMinorPitch, uMajorEvery)
//   face    : vec4<f32>  off  16  (uFaceAlpha, uFaceRelief, uSquashK, uBaseInset) — re-points the retired warp lane
//   warp2   : vec4<f32>  off  32  (uAmplitude, uAspect, uLightDirX, uLightDirY)
//   grid    : vec4<f32>  off  48  (uTargetWidth, uTargetWidthMajor, uMinorAlpha, uMajorAlpha)
//   field   : vec4<f32>  off  64  (uFieldAlpha, uHasBackground, _pad, _pad)
//   cursor  : vec4<f32>  off  80  (uCursorX, uCursorY, uBulgeStrength, uBulgeRadius)
//   cursor2 : vec4<f32>  off  96  (uBulgeMode, uInteractive, _pad, _pad)
//   line    : vec4<f32>  off 112  (uLineColor.rgb (linear-sRGB), _pad)
//   bg      : vec4<f32>  off 128  (uBg.rgb (linear-sRGB), _pad)
//   wave    : vec4<f32>  off 144  (waveDirX, waveDirY, waveK, waveOmega)
//   wave2   : vec4<f32>  off 160  (waveSigma, twistMax, _pad, amp)
//   faceLo  : vec4<f32>  off 176  (rose-umber trough .rgb (linear), _pad) — the warm-divergent ramp
//   faceMid : vec4<f32>  off 192  (ember-amber mid .rgb (linear), _pad)
//   faceHi  : vec4<f32>  off 208  (warm-wheat crest .rgb (linear), _pad)
//   total   : 224 bytes
export const LIQUID_GRID_UNIFORM_BYTES = 224;

const OFF = {
    u0: 0,
    face: 4,
    warp2: 8,
    grid: 12,
    field: 16,
    cursor: 20,
    cursor2: 24,
    line: 28,
    bg: 32,
    wave: 36,
    wave2: 40,
    faceLo: 44,
    faceMid: 48,
    faceHi: 52,
} as const;

export interface LiquidGridUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
}

export function createLiquidGridScratch(): LiquidGridUniformScratch {
    const buffer = new ArrayBuffer(LIQUID_GRID_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer) };
}

/**
 * Pack the liquid-grid uniforms in place. `viewExtentPx` is the canvas backing-store extent
 * the grid scale derives from (so the cell pitch is honest in device px); `cursor` is the
 * transient pointer in GRID space (the renderer derives it from `usePointerVelocityField`);
 * `aspect` corrects the domain x. The line ink resolves the warm `--foreground` identity
 * (the demo themes it via a preset, never a token edit).
 */
export function packLiquidGridUniforms(
    scratch: LiquidGridUniformScratch,
    config: LiquidGridConfig,
    timeSec: number,
    aspect: number,
    viewExtentPx: number,
    cursor: Vec2,
    amp: number,
): LiquidGridUniformScratch {
    const { f32 } = scratch;

    const gridScale = gridScaleFor(viewExtentPx, config.cellSize);
    f32[OFF.u0 + 0] = timeSec;
    f32[OFF.u0 + 1] = gridScale;
    f32[OFF.u0 + 2] = config.cellSize;
    f32[OFF.u0 + 3] = config.majorEvery;

    // The FACE lane (re-points the retired LINE-warp lane). faceAlpha:0
    // default → the face evaporates → the line-only render. lightDir rides warp2.zw; aspect
    // stays on warp2.y.
    f32[OFF.face + 0] = config.faceAlpha;
    f32[OFF.face + 1] = config.faceRelief;
    f32[OFF.face + 2] = config.squashK;
    f32[OFF.face + 3] = config.baseInset;

    f32[OFF.warp2 + 0] = 0;
    f32[OFF.warp2 + 1] = aspect;
    f32[OFF.warp2 + 2] = config.lightDir[0];
    f32[OFF.warp2 + 3] = config.lightDir[1];

    // The Golus target half-widths in GRID units: lineWidthPx / minorPitchPx (so the line is
    // N device-pixels wide at any DPR — the Golus derivative reads the actual backing-store
    // pixel). The major rule reads its own width (a hair bolder, the kf 11% tier).
    const minorPitchPx = Math.max(config.cellSize, 1);
    const targetWidth = config.lineWidth / minorPitchPx;
    const targetWidthMajor = (config.lineWidth * 1.6) / minorPitchPx;
    f32[OFF.grid + 0] = targetWidth;
    f32[OFF.grid + 1] = targetWidthMajor;
    f32[OFF.grid + 2] = config.minorAlpha;
    f32[OFF.grid + 3] = config.majorAlpha;

    const hasBg = config.background === "transparent" ? 0 : 1;
    f32[OFF.field + 0] = config.fieldAlpha;
    f32[OFF.field + 1] = hasBg;
    f32[OFF.field + 2] = 0;
    f32[OFF.field + 3] = 0;

    f32[OFF.cursor + 0] = cursor.x;
    f32[OFF.cursor + 1] = cursor.y;
    f32[OFF.cursor + 2] = config.bulgeStrength;
    f32[OFF.cursor + 3] = config.bulgeRadius;

    f32[OFF.cursor2 + 0] = config.bulgeMode === "attract" ? -1 : 1;
    f32[OFF.cursor2 + 1] = config.interactive ? 1 : 0;
    f32[OFF.cursor2 + 2] = 0;
    f32[OFF.cursor2 + 3] = 0;

    // The line ink baked to linear-sRGB (the WGSL/GLSL fragment paints in linear, OETF to
    // sRGB at the end). The warm-cream identity by default.
    const ink = oklchToLinear(config.lineColor);
    f32[OFF.line + 0] = ink[0];
    f32[OFF.line + 1] = ink[1];
    f32[OFF.line + 2] = ink[2];
    f32[OFF.line + 3] = 0;

    if (config.background === "transparent") {
        f32[OFF.bg + 0] = 0;
        f32[OFF.bg + 1] = 0;
        f32[OFF.bg + 2] = 0;
        f32[OFF.bg + 3] = 0;
    } else {
        const bg = oklchToLinear(config.background);
        f32[OFF.bg + 0] = bg[0];
        f32[OFF.bg + 1] = bg[1];
        f32[OFF.bg + 2] = bg[2];
        f32[OFF.bg + 3] = 0;
    }

    // The traveling-wave CELL-TWIST lanes (the C3 cure — the cells twist, the lines don't bow).
    f32[OFF.wave + 0] = config.waveDir[0];
    f32[OFF.wave + 1] = config.waveDir[1];
    f32[OFF.wave + 2] = config.waveK;
    f32[OFF.wave + 3] = config.waveOmega;
    f32[OFF.wave2 + 0] = config.waveSigma;
    f32[OFF.wave2 + 1] = config.twistMax;
    f32[OFF.wave2 + 2] = 0; // _pad (the retired per-cell shearMax lane; the affine warp is shear-free)
    f32[OFF.wave2 + 3] = amp; // the spring-eased envelope amplitude (PRM snaps to 0)

    // The 3-stop warm-divergent FACE ramp baked to linear-sRGB (the fragment OETFs to sRGB).
    const lo = oklchToLinear(config.faceWarmLo);
    const mid = oklchToLinear(config.faceWarmMid);
    const hi = oklchToLinear(config.faceWarmHi);
    f32[OFF.faceLo + 0] = lo[0];
    f32[OFF.faceLo + 1] = lo[1];
    f32[OFF.faceLo + 2] = lo[2];
    f32[OFF.faceLo + 3] = 0;
    f32[OFF.faceMid + 0] = mid[0];
    f32[OFF.faceMid + 1] = mid[1];
    f32[OFF.faceMid + 2] = mid[2];
    f32[OFF.faceMid + 3] = 0;
    f32[OFF.faceHi + 0] = hi[0];
    f32[OFF.faceHi + 1] = hi[1];
    f32[OFF.faceHi + 2] = hi[2];
    f32[OFF.faceHi + 3] = 0;
    return scratch;
}
