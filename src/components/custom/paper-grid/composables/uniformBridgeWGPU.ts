// BC.W-VIZ-PAPERGRID — the typed-struct SOURCE OF TRUTH for the WebGPU paper-grid uniform
// buffer.
//
// The WGSL `PaperGridUniforms` struct and the JS `ArrayBuffer` write offsets are generated
// from the SAME layout table here, so a std140-vs-WGSL alignment mismatch (the
// parity-ΔE-blowout / garbage-read trap) is structurally impossible — the field order + the
// byte offsets are ONE declaration. The aurora / goo-blob / dot-flow-field / concentric
// migrations established this pattern; this is its paper-grid twin.
//
// Every scalar packs into a vec4 lane so the natural-16-byte std140 stride holds (no array
// rows here — the grid is a pure fullscreen fragment with scalar uniforms only).

import type { OklchStop } from "../../../../composables/color";
import { oklchToLinear } from "../../../../composables/color";
import type { PaperGridConfig } from "../constants";
import type { Vec2 } from "./paperGrid";
import { gridScaleFor } from "./paperGrid";

// ── PAPER-GRID uniform layout ─────────────────────────────────────────────────
//   u0      : vec4<f32>  off   0  (uTime, uGridScale, uMinorPitch, uMajorEvery)
//   warp    : vec4<f32>  off  16  (uWarpScale, uWarpSpeed, uWarpScale2, uWarpSpeed2)
//   warp2   : vec4<f32>  off  32  (uAmplitude, uAspect, _pad, _pad)
//   grid    : vec4<f32>  off  48  (uTargetWidth, uTargetWidthMajor, uMinorAlpha, uMajorAlpha)
//   field   : vec4<f32>  off  64  (uFieldAlpha, uHasBackground, _pad, _pad)
//   cursor  : vec4<f32>  off  80  (uCursorX, uCursorY, uBulgeStrength, uBulgeRadius)
//   cursor2 : vec4<f32>  off  96  (uBulgeMode, uInteractive, _pad, _pad)
//   line    : vec4<f32>  off 112  (uLineColor.rgb (linear-sRGB), _pad)
//   bg      : vec4<f32>  off 128  (uBg.rgb (linear-sRGB), _pad)
//   total   : 144 bytes
export const PAPER_GRID_UNIFORM_BYTES = 144;

const OFF = {
    u0: 0,
    warp: 4,
    warp2: 8,
    grid: 12,
    field: 16,
    cursor: 20,
    cursor2: 24,
    line: 28,
    bg: 32,
} as const;

export interface PaperGridUniformScratch {
    buffer: ArrayBuffer;
    f32: Float32Array;
}

export function createPaperGridScratch(): PaperGridUniformScratch {
    const buffer = new ArrayBuffer(PAPER_GRID_UNIFORM_BYTES);
    return { buffer, f32: new Float32Array(buffer) };
}

/**
 * Pack the paper-grid uniforms in place. `viewExtentPx` is the canvas backing-store extent
 * the grid scale derives from (so the cell pitch is honest in device px); `cursor` is the
 * transient pointer in GRID space (the renderer derives it from `usePointerVelocityField`);
 * `aspect` corrects the domain x. The line ink resolves the warm `--foreground` identity
 * (the demo themes it via a preset, never a token edit).
 */
export function packPaperGridUniforms(
    scratch: PaperGridUniformScratch,
    config: PaperGridConfig,
    timeSec: number,
    aspect: number,
    viewExtentPx: number,
    cursor: Vec2,
): PaperGridUniformScratch {
    const { f32 } = scratch;

    const gridScale = gridScaleFor(viewExtentPx, config.cellSize);
    f32[OFF.u0 + 0] = timeSec;
    f32[OFF.u0 + 1] = gridScale;
    f32[OFF.u0 + 2] = config.cellSize;
    f32[OFF.u0 + 3] = config.majorEvery;

    // The warp ride: a LOW base scale (the whole sheet bows together) + a counter-flow term
    // at a slightly higher scale + opposite speed (never visibly loops).
    const warpScale = config.waveScale;
    const warpScale2 = config.waveScale * 1.7;
    const warpSpeed = config.waveSpeed;
    const warpSpeed2 = config.waveSpeed * 0.6;
    f32[OFF.warp + 0] = warpScale;
    f32[OFF.warp + 1] = warpSpeed;
    f32[OFF.warp + 2] = warpScale2;
    f32[OFF.warp + 3] = warpSpeed2;

    f32[OFF.warp2 + 0] = config.waveAmplitude;
    f32[OFF.warp2 + 1] = aspect;
    f32[OFF.warp2 + 2] = 0;
    f32[OFF.warp2 + 3] = 0;

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
    return scratch;
}
