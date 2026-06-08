/**
 * Aurora uniform bridge — the reactive-config → GL-uniform translation seam.
 *
 * Owns the sealed enum↔shader-int dispatch maps and the per-config uniform upload.
 * Each map is `as const` constrained by a `satisfies Record<Union, number>` so a
 * NEW union member is a COMPILE error until it gets a slot — no silent stale-Record
 * gap where a fresh enum value uploads `undefined`.
 *
 * Crayon is a PEER medium (`uMedium == 4`), NOT a stroke mode: the shader hoists it
 * out of `mediumOil()` (wax-on-tooth, not oil strokes). So `MEDIUM_ID` carries the
 * peer `crayon: 4` slot and `STROKE_MODE_ID` no longer maps `crayon` — a
 * `strokeMode === "crayon"` config resolves to the crayon peer medium via
 * `resolveMediumId` and uploads a benign `uStrokeMode` (oil).
 *
 * The pre-allocated upload buffers live in the bridge: a slider drag refills them
 * in place rather than allocating ~8 Float32Arrays per frame.
 */

import { flattenPalette } from "./color";
import { warmCatchLight } from "../../../../composables/color";
import type { OklchStop } from "../../../../composables/color";
import type { UniformLocations } from "./glSetup";
import type { CursorState } from "./cursorModel";
import {
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraHuePath,
    type AuroraMedium,
    type FlowPattern,
    type StrokeMode,
    type StrokeOrient,
    type WarpMode,
} from "../constants/presets";

// AW.W4.3/W4.4 — `vangogh: 5` (the energy-graded atomic-stroke medium) and
// `oil-pastel: 6` (the reworked deposition+scumble+waxy medium) join the map. The
// `satisfies Record<AuroraMedium | "crayon", number>` FORCES a slot the instant the
// union grows — omitting one is a COMPILE error (the good kind), so a fresh medium
// can never upload `undefined`. `crayon: 4` is the legacy StrokeMode peer route
// (oil + strokeMode:"crayon"); it shares the reworked oil-pastel deposition shader
// body (uMedium==4 and uMedium==6 both dispatch `mediumCrayon`), so there is no
// parallel duplicate medium.
export const MEDIUM_ID = {
    smooth: 0,
    pastel: 1,
    watercolor: 2,
    oil: 3,
    crayon: 4,
    vangogh: 5,
    "oil-pastel": 6,
} as const satisfies Record<AuroraMedium | "crayon", number>;

// W5 — the value.js HueInterpolationMethod → GLSL int map. The `satisfies` forces
// a slot for every method, so a value.js enum change is a COMPILE error here.
export const HUE_PATH_ID = {
    shorter: 0,
    longer: 1,
    increasing: 2,
    decreasing: 3,
} as const satisfies Record<AuroraHuePath, number>;

export const FLOW_ID = {
    none: 0,
    radial: 1,
    swirl: 2,
    diagonal: 3,
    multi: 4,
    // AW.W4.1 — the structure-tensor / edge-tangent-flow branch in flow.glsl.ts.
    tensor: 5,
} as const satisfies Record<FlowPattern, number>;

// AW.W4.1 — the stroke-orientation source → GLSL int. `flow` keeps the
// hand-authored pattern; `tensor` substitutes the structure-tensor minor
// eigenvector in bestOil. The `satisfies` forces a slot for every union member.
export const STROKE_ORIENT_ID = {
    flow: 0,
    tensor: 1,
} as const satisfies Record<StrokeOrient, number>;

export const WARP_ID = {
    fbm: 0,
    cellular: 1,
    hybrid: 2,
} as const satisfies Record<WarpMode, number>;

// Oil-stroke modes ONLY — crayon dropped (it is a peer medium per MEDIUM_ID).
export const STROKE_MODE_ID = {
    oil: 0,
    knife: 1,
    chunky: 3,
} as const satisfies Record<Exclude<StrokeMode, "crayon">, number>;

// AX.W11 — the aurora catch-light OKLCh anchor. The `(0.985, 0.0125, 77.5°)` anchor
// reproduces the prior eyeballed `[1.0, 0.95, 0.88]` warm-white to <1e-3 linear (so
// the live impasto relight reads identically — the seam fix is invisible), now on the
// shared OKLCh core (`warmCatchLight`) instead of an undisciplined sRGB-ish literal.
// The blob's `warmCream` `(0.97, 0.03, 85°)` is its OWN anchor (W15 re-routes it
// through the SAME helper) — one OKLCh derive, each surface its principled anchor.
export const AURORA_CATCH_LIGHT_ANCHOR: OklchStop = { L: 0.985, C: 0.0125, h: 77.5 };

/**
 * Resolve a config's `lightColor` to a LINEAR-light `[r,g,b]` triple. Accepts either
 * a raw linear triple (the array form, passed through) OR an `{L,C,h}` OKLCh anchor
 * (derived through the shared `warmCatchLight` helper). Omitted = the canonical aurora
 * warm-white from `AURORA_CATCH_LIGHT_ANCHOR`.
 */
export function resolveLightColor(
    lightColor: [number, number, number] | OklchStop | undefined,
): [number, number, number] {
    if (lightColor === undefined) {
        return warmCatchLight(
            AURORA_CATCH_LIGHT_ANCHOR.L,
            AURORA_CATCH_LIGHT_ANCHOR.C,
            AURORA_CATCH_LIGHT_ANCHOR.h,
        );
    }
    if (Array.isArray(lightColor)) return lightColor;
    return warmCatchLight(lightColor.L, lightColor.C, lightColor.h);
}

/**
 * The effective `uMedium` int for a config. The only non-identity case: a
 * `medium: "oil"` + `strokeMode: "crayon"` config selects the crayon PEER
 * (`uMedium == 4`) rather than oil — behavior-preserving with the pre-hoist
 * `mediumOil()` `mode == 2` branch (same pixel output, dispatched one level up).
 */
export function resolveMediumId(cfg: AuroraConfig): number {
    if (cfg.medium === "oil" && cfg.strokeMode === "crayon") {
        return MEDIUM_ID.crayon;
    }
    return MEDIUM_ID[cfg.medium];
}

/**
 * The `uStrokeMode` int for a config. Crayon is not an oil stroke (it routes to
 * the crayon peer medium where `uStrokeMode` is unread), so it uploads the benign
 * oil default; the other modes map directly.
 */
export function resolveStrokeModeId(cfg: AuroraConfig): number {
    if (cfg.strokeMode === "crayon") return STROKE_MODE_ID.oil;
    return STROKE_MODE_ID[cfg.strokeMode];
}

/**
 * AW.W4.1/W4.3/W4.4 — the `uStrokeOrient` int for a config. The painterly mediums
 * (`vangogh`, `oil-pastel`) FORCE the structure-tensor orientation regardless of
 * the config's `strokeOrient` field — their brushwork must hug the color zones (the
 * congruent-to-real-Van-Gogh contract). Every other medium honors the config's
 * `strokeOrient` (default `"flow"` — the pre-W4 path renders identically).
 */
export function resolveStrokeOrientId(cfg: AuroraConfig): number {
    if (cfg.medium === "vangogh" || cfg.medium === "oil-pastel") {
        return STROKE_ORIENT_ID.tensor;
    }
    return STROKE_ORIENT_ID[cfg.strokeOrient ?? "flow"];
}

// AW.W7b / AX.W07 — the SPLIT WebGPU write layout. The WebGL2 path keeps its
// `gl.uniform*` calls (createUniformBridge); the WebGPU path packs an AuroraConfig into
// TWO Float32Arrays and `device.queue.writeBuffer`s each into its own buffer:
//   - the UNIFORM buffer (constant-indexed scalars, safe in `var<uniform>`): 16 scalar
//     floats `time…alpha`, with the five count/enum fields now f32 the shader i32()-casts
//     (AX.W07 1a — no Int32Array dual-view; the slot legitimately carries a float).
//   - the STORAGE `Field` buffer (dynamically-indexed arrays — `var<storage,read>` is the
//     ONLY legal address space for a runtime index on Metal, AX.W07 1b): the palette + the
//     two nuclei vec4 arrays. std140 aligns each vec4f to 16 bytes — identical in storage.
// The two float counts MUST match the WGSL `struct Uniforms` + `struct Field`.
// time…alpha (16) + huePath (1, AX.W11) = 17 active floats; rounded to 20 (5 vec4s)
// so the uniform buffer stays vec4-aligned (pad slots 17..19 are written 0).
export const WGPU_UNIFORM_FLOATS = 20;
export const WGPU_FIELD_FLOATS = MAX_STOPS * 4 + MAX_NUCLEI * 4 * 2;

/**
 * Pack an `AuroraConfig` into the SPLIT WebGPU buffers (AX.W07). `uniformOut` takes the
 * 16 constant-indexed scalars (the f32-packed counts the shader i32()-casts); `fieldOut`
 * takes the palette + nuclei vec4 arrays for the storage `Field` buffer. Both are filled
 * in place (the caller owns the reused buffers so a slider drag does not churn the GC).
 * The WebGL2 fallback path is unaffected (it keeps its `gl.uniform*` calls). The float
 * layouts MUST mirror aurora.wgsl.ts `struct Uniforms` + `struct Field`.
 */
export function packGPUUniforms(
    cfg: AuroraConfig,
    timeSec: number,
    uniformOut: Float32Array,
    fieldOut: Float32Array,
): void {
    uniformOut.fill(0);
    fieldOut.fill(0);
    // Uniform scalars (slots 0..15, mirroring the WGSL `struct Uniforms` field order).
    // The five count/enum fields are f32 here — the shader i32()-casts each (AX.W07 1a).
    uniformOut[0] = timeSec;
    uniformOut[1] = Math.min(cfg.palette.length, MAX_STOPS); // stopCount (f32; shader i32()-casts)
    uniformOut[2] = Math.min(cfg.nuclei.length, MAX_NUCLEI); // nucleiCount
    uniformOut[3] = cfg.softmaxBeta;
    uniformOut[4] = cfg.valueVariance;
    uniformOut[5] = cfg.warpAmount;
    uniformOut[6] = cfg.warpScale;
    uniformOut[7] = cfg.warpDrift;
    uniformOut[8] = WARP_ID[cfg.warpMode];
    uniformOut[9] = cfg.noiseOctaves;
    uniformOut[10] = resolveMediumId(cfg);
    uniformOut[11] = cfg.breathDepth;
    uniformOut[12] = cfg.breathPeriod;
    uniformOut[13] = cfg.saturation;
    uniformOut[14] = cfg.paperGrain;
    uniformOut[15] = cfg.alpha;
    // AX.W11 — the huePath enum (f32-packed; the shader i32()-casts it). Default
    // `shorter` (0) = the OKLab-rectangular ramp, so an unset config keeps the
    // muddy-midtone-free default. Slots 16..19 round the buffer to a 5-vec4 stride;
    // 17..19 stay 0 from the fill above.
    uniformOut[16] = HUE_PATH_ID[cfg.huePath ?? "shorter"];
    // Storage Field — palette (vec4 array — .xyz = linear-sRGB; .w pad). flattenPalette
    // gives linear.
    const palLin = flattenPalette(cfg.palette, MAX_STOPS);
    for (let i = 0; i < MAX_STOPS; i++) {
        fieldOut[i * 4 + 0] = palLin[i * 3 + 0]!;
        fieldOut[i * 4 + 1] = palLin[i * 3 + 1]!;
        fieldOut[i * 4 + 2] = palLin[i * 3 + 2]!;
    }
    // Storage Field — nuclei pos (vec4: .xy pos[Y-flipped], .z radius, .w paletteBias).
    let base = MAX_STOPS * 4;
    const n = Math.min(cfg.nuclei.length, MAX_NUCLEI);
    for (let i = 0; i < n; i++) {
        const nu = cfg.nuclei[i]!;
        fieldOut[base + i * 4 + 0] = nu.x;
        fieldOut[base + i * 4 + 1] = 1.0 - nu.y; // flipY
        fieldOut[base + i * 4 + 2] = nu.radius;
        fieldOut[base + i * 4 + 3] = nu.paletteBias;
    }
    // Storage Field — nuclei mod (vec4: .x valueBias, .y elong, .z angle, .w driftRadius).
    base = MAX_STOPS * 4 + MAX_NUCLEI * 4;
    for (let i = 0; i < n; i++) {
        const nu = cfg.nuclei[i]!;
        fieldOut[base + i * 4 + 0] = nu.valueBias;
        fieldOut[base + i * 4 + 1] = nu.elongation ?? 1.0;
        fieldOut[base + i * 4 + 2] = (-(nu.angle ?? 0) * Math.PI) / 180;
        fieldOut[base + i * 4 + 3] = nu.driftRadius;
    }
}

/**
 * Build the per-config uniform uploader bound to a program's uniform location
 * cache + cursor state. Returns `uploadConfig` — call it to push a fresh
 * `AuroraConfig` into the live program. The cursor uniforms are initialised here
 * and re-sent per frame by the frame loop.
 *
 * Y-origin: config authoring is CSS-top-origin (0 = top); the bridge flips Y at
 * the uniform boundary (`flipY`).
 */
export function createUniformBridge(
    gl: WebGL2RenderingContext,
    prog: WebGLProgram,
    U: UniformLocations,
    cursor: CursorState,
): (cfg: AuroraConfig) => void {
    // CSS-top-origin → shader bottom-origin.
    const flipY = (y: number): number => 1.0 - y;

    // Pre-allocated upload buffers — filled in place inside uploadConfig() so a
    // slider drag does not allocate per frame. Sized to the shader's MAX_NUCLEI /
    // MAX_STOPS arrays; spare slots are uploaded but ignored thanks to the
    // uNucleiCount / uStopCount gates in the shader.
    const ub = {
        palette: new Float32Array(MAX_STOPS * 3),
        pos: new Float32Array(MAX_NUCLEI * 2),
        rad: new Float32Array(MAX_NUCLEI),
        pb: new Float32Array(MAX_NUCLEI),
        vb: new Float32Array(MAX_NUCLEI),
        dr: new Float32Array(MAX_NUCLEI),
        dp: new Float32Array(MAX_NUCLEI),
        elong: new Float32Array(MAX_NUCLEI),
        angle: new Float32Array(MAX_NUCLEI),
    };

    return function uploadConfig(cfg: AuroraConfig): void {
        gl.useProgram(prog);

        // Palette — fill in place. flattenPalette writes into `ub.palette`.
        flattenPalette(cfg.palette, MAX_STOPS, ub.palette);
        gl.uniform3fv(U.uPalette, ub.palette);
        gl.uniform1i(U.uStopCount, Math.min(cfg.palette.length, MAX_STOPS));

        // Nuclei
        const n = Math.min(cfg.nuclei.length, MAX_NUCLEI);
        gl.uniform1i(U.uNucleiCount, n);
        for (let i = 0; i < n; i++) {
            const nu = cfg.nuclei[i]!;
            ub.pos[i * 2 + 0] = nu.x;
            ub.pos[i * 2 + 1] = flipY(nu.y);
            ub.rad[i] = nu.radius;
            ub.pb[i] = nu.paletteBias;
            ub.vb[i] = nu.valueBias;
            ub.dr[i] = nu.driftRadius;
            ub.dp[i] = nu.driftPhase;
            ub.elong[i] = nu.elongation ?? 1.0;
            // Top-origin angles invert relative to bottom-origin shader space.
            ub.angle[i] = (-(nu.angle ?? 0) * Math.PI) / 180;
        }
        // Spare slots: zero-out so old values from a longer prior config don't
        // bleed into the per-iteration loop (gated by uNucleiCount, but cheap to
        // defend).
        for (let i = n; i < MAX_NUCLEI; i++) {
            ub.pos[i * 2 + 0] = 0;
            ub.pos[i * 2 + 1] = 0;
            ub.rad[i] = 0;
            ub.pb[i] = 0;
            ub.vb[i] = 0;
            ub.dr[i] = 0;
            ub.dp[i] = 0;
            ub.elong[i] = 1.0;
            ub.angle[i] = 0;
        }
        gl.uniform2fv(U.uNucleiPos, ub.pos);
        gl.uniform1fv(U.uNucleiRadius, ub.rad);
        gl.uniform1fv(U.uNucleiPaletteBias, ub.pb);
        gl.uniform1fv(U.uNucleiValueBias, ub.vb);
        gl.uniform1fv(U.uNucleiDriftRadius, ub.dr);
        gl.uniform1fv(U.uNucleiDriftPhase, ub.dp);
        gl.uniform1fv(U.uNucleiElong, ub.elong);
        gl.uniform1fv(U.uNucleiAngle, ub.angle);
        gl.uniform1f(U.uSoftmaxBeta, cfg.softmaxBeta);
        gl.uniform1f(U.uValueVariance, cfg.valueVariance);

        // Warp
        gl.uniform1f(U.uWarpAmount, cfg.warpAmount);
        gl.uniform1f(U.uWarpScale, cfg.warpScale);
        gl.uniform1f(U.uWarpDrift, cfg.warpDrift);
        gl.uniform1i(U.uWarpMode, WARP_ID[cfg.warpMode]);
        gl.uniform1i(U.uNoiseOctaves, cfg.noiseOctaves);

        // Medium — `resolveMediumId` routes the oil+crayon config to the crayon
        // PEER (uMedium==4); every other case is the identity map.
        gl.uniform1i(U.uMedium, resolveMediumId(cfg));
        // W5 — the OKLCh hue-arc method (default `shorter` = the OKLab-rectangular
        // ramp, so an unset config keeps the muddy-midtone-free default).
        gl.uniform1i(U.uHuePath, HUE_PATH_ID[cfg.huePath ?? "shorter"]);
        gl.uniform1i(U.uFlowPattern, FLOW_ID[cfg.flow.pattern]);
        gl.uniform2f(U.uFlowFocal, cfg.flow.focalX, flipY(cfg.flow.focalY));
        gl.uniform1f(U.uFlowAngle, cfg.flow.angle);
        gl.uniform1f(U.uFlowCurl, cfg.flow.curl);
        // Cursor uniforms are re-sent every frame in the frame loop; init once here.
        gl.uniform2f(U.uCursor, cursor.x, flipY(cursor.y));
        gl.uniform1f(U.uCursorStrength, cursor.strength);
        gl.uniform1f(U.uCursorRadius, cursor.radius);
        // AW.W8.1 — the velocity-reactive flow uniforms (re-sent per frame too).
        gl.uniform2f(U.uCursorVelocity, cursor.velX, -cursor.velY);
        gl.uniform1f(U.uCursorBurst, cursor.burst);
        gl.uniform1f(U.uStrokeAmount, cfg.strokeAmount);
        gl.uniform1f(U.uStrokeScale, cfg.strokeScale);
        gl.uniform1f(U.uStrokeAnisotropy, cfg.strokeAnisotropy);
        gl.uniform1i(U.uStrokeLayers, cfg.strokeLayers);
        gl.uniform1i(U.uStrokeMode, resolveStrokeModeId(cfg));
        // AW.W4.1 — the stroke-orientation source (the painterly mediums force tensor).
        gl.uniform1i(U.uStrokeOrient, resolveStrokeOrientId(cfg));
        // AW.W4.2 — the impasto relight axis. Default upper-left (the prior fixed-rim
        // direction) + warm-white so the still default reads identically; the shader
        // re-normalizes uLightDir. AW.W8 overwrites uLightDir per-frame from the cursor.
        {
            const ld = cfg.lightDir ?? [-0.5, 0.6, 0.62];
            // AX.W11 — the catch-light is OKLCh-derived (the warmCatchLight helper) off
            // the shared /color leaf, not an eyeballed [1.0,0.95,0.88] literal; the anchor
            // reproduces the prior warm-white perceptually. A consumer may author it as an
            // {L,C,h} OKLCh anchor or a raw linear triple — resolveLightColor handles both.
            const lc = resolveLightColor(cfg.lightColor);
            gl.uniform3f(U.uLightDir, ld[0], ld[1], ld[2]);
            gl.uniform3f(U.uLightColor, lc[0], lc[1], lc[2]);
        }
        gl.uniform1f(U.uWetEdge, cfg.wetEdge);
        gl.uniform1f(U.uGranulation, cfg.granulation);
        gl.uniform1f(U.uImpasto, cfg.impasto);
        gl.uniform1f(U.uBrokenColor, cfg.brokenColor);
        gl.uniform1f(U.uCanvasGrain, cfg.canvasGrain);

        // Motion
        gl.uniform1f(U.uNucleiDrift, cfg.nucleiDrift);
        gl.uniform1f(U.uPaletteDrift, cfg.paletteDrift);
        gl.uniform1f(U.uBreathDepth, cfg.breathDepth);
        gl.uniform1f(U.uBreathPeriod, cfg.breathPeriod);

        // Output
        gl.uniform1f(U.uSaturation, cfg.saturation);
        gl.uniform1f(U.uPaperGrain, cfg.paperGrain);
        gl.uniform1f(U.uAlpha, cfg.alpha);
    };
}
