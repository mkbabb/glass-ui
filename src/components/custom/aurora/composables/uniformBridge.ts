/**
 * Aurora uniform bridge — the reactive-config → GL-uniform translation seam.
 *
 * Owns the sealed enum↔shader-int dispatch maps and the per-config uniform upload.
 * Each map is `as const` constrained by a `satisfies Record<Union, number>` so a
 * NEW union member is a COMPILE error until it gets a slot — no silent stale-Record
 * gap where a fresh enum value uploads `undefined`.
 *
 * Crayon is a FIRST-CLASS medium (`uMedium == 4`, AX.W13), NOT a stroke mode: the
 * shader has a dedicated `mediumCrayon()` body (DRY wax-on-tooth). `MEDIUM_ID` carries
 * the `crayon: 4` slot and `StrokeMode` no longer has a `crayon` member — the legacy
 * `oil` + `strokeMode:"crayon"` peer-route is REMOVED (clean break); a crayon surface
 * selects `medium:"crayon"`.
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
    DEFAULT_VIVIDNESS,
    METAL_POLISH_DEFAULT,
    METAL_HEIGHT_SCALE_DEFAULT,
    IMAGE_BLUR_MIN_DEFAULT,
    IMAGE_BLUR_MAX_DEFAULT,
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

// AX.W13 — `crayon: 4` (DRY tooth-multiply), `vangogh: 5` (atomic comma/crescent
// dabs), and `oil-pastel: 6` (stroke deposition + burnish) are all first-class
// mediums, each with its OWN shader body (no shared dispatch). The `satisfies
// Record<AuroraMedium, number>` FORCES a slot the instant the union grows — omitting
// one is a COMPILE error (the good kind), so a fresh medium can never upload
// `undefined`.
export const MEDIUM_ID = {
    smooth: 0,
    pastel: 1,
    watercolor: 2,
    oil: 3,
    crayon: 4,
    vangogh: 5,
    "oil-pastel": 6,
    // BB.W-AUR-KUWAHARA — the anisotropic-Kuwahara painterly finish (uMedium==7).
    // The WGSL primary renders the smooth core for every painterly id (1-7) — a
    // kuwahara config on WebGPU degrades to the smooth core, never an error (the
    // booked W-AURORA-WGPU-MEDIUMS successor ports the painterly bodies); the WebGL2
    // path carries the live `mediumKuwahara()` body.
    kuwahara: 7,
    // BG.W-AUR-METAL-FINISH — the two mutually-exclusive metal mediums. Both DUAL-PORT
    // (the WebGL2 `mediumMetal`/`mediumMetalGradient` bodies + the WGSL primary twins);
    // a `medium:"metal"` config re-lights the field as warm folded metal on BOTH backends.
    metal: 8,
    "metal-gradient": 9,
} as const satisfies Record<AuroraMedium, number>;

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
    curl: 3, // BB.B1 — opt-in Bridson curl-noise flow warp (the .frag uWarpMode == 3 branch)
} as const satisfies Record<WarpMode, number>;

// Oil-stroke sub-modes. AX.W13 — `crayon` is a first-class medium (MEDIUM_ID), no
// longer a stroke mode, so the union has no `crayon` member to Exclude.
export const STROKE_MODE_ID = {
    oil: 0,
    knife: 1,
    chunky: 3,
} as const satisfies Record<StrokeMode, number>;

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
 * The effective `uMedium` int for a config. AX.W13 — a pure identity map over the
 * medium union (the `oil` + `strokeMode:"crayon"` peer-route is REMOVED; crayon is its
 * own first-class `medium:"crayon"`). `medium` is total over `MEDIUM_ID` (the
 * `satisfies` guarantees it), so this never resolves `undefined`.
 */
export function resolveMediumId(cfg: AuroraConfig): number {
    return MEDIUM_ID[cfg.medium];
}

/**
 * The `uStrokeMode` int for a config. AX.W13 — `strokeMode` is total over
 * `STROKE_MODE_ID` (no `crayon` special-case), so this is a direct map.
 */
export function resolveStrokeModeId(cfg: AuroraConfig): number {
    return STROKE_MODE_ID[cfg.strokeMode];
}

/**
 * AX.W13 — the `uStrokeOrient` int for a config. The painterly mediums (`vangogh`,
 * `oil-pastel`, `crayon`) FORCE the structure-tensor orientation regardless of the
 * config's `strokeOrient` field — their marks must hug the color zones (the
 * congruent-to-real-works contract). Every other medium honors the config's
 * `strokeOrient` (default `"flow"`). BB.W-AUR-KUWAHARA — `kuwahara` ALSO forces
 * tensor: the anisotropic Kuwahara kernel is squeezed along the structure-tensor
 * minor eigenvector, so the orientation source must be the tensor field.
 */
export function resolveStrokeOrientId(cfg: AuroraConfig): number {
    if (
        cfg.medium === "vangogh" ||
        cfg.medium === "oil-pastel" ||
        cfg.medium === "crayon" ||
        cfg.medium === "kuwahara"
    ) {
        return STROKE_ORIENT_ID.tensor;
    }
    return STROKE_ORIENT_ID[cfg.strokeOrient ?? "flow"];
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
        // BG.W-AUR-METAL-FINISH — the metal-medium knobs (uMedium==8/9). Uploaded on
        // every config; a non-metal path never reads them (no-op), so the smooth default
        // + every existing medium render byte-identical.
        gl.uniform1f(U.uMetalPolish, cfg.metalPolish ?? METAL_POLISH_DEFAULT);
        gl.uniform1f(U.uMetalHeightScale, cfg.metalHeightScale ?? METAL_HEIGHT_SCALE_DEFAULT);

        // Motion
        gl.uniform1f(U.uNucleiDrift, cfg.nucleiDrift);
        gl.uniform1f(U.uPaletteDrift, cfg.paletteDrift);
        gl.uniform1f(U.uBreathDepth, cfg.breathDepth);
        gl.uniform1f(U.uBreathPeriod, cfg.breathPeriod);

        // Output
        gl.uniform1f(U.uSaturation, cfg.saturation);
        gl.uniform1f(U.uPaperGrain, cfg.paperGrain);
        gl.uniform1f(U.uAlpha, cfg.alpha);
        // BD.W-AUR-VIVIDNESS — the §3 chroma-floor strength (omitted = the vivid default).
        gl.uniform1f(U.uVividness, cfg.vividness ?? DEFAULT_VIVIDNESS);

        // BG.W-AUR-IMAGE-SOURCE — the image lane. On the PALETTE program every U.uImage/
        // uBlur*/uImageAspect location is null (the palette fragment declares none of
        // them), so these uploads are silent no-ops → the palette-default render is
        // byte-identical. Only the separate image program reads them. uImage samples
        // texture unit 0 (the runtime uploads the decoded photo into unit 0). The aspect
        // is the live canvas W/H (keeps the zone-blur bokeh circular in screen space).
        gl.uniform1i(U.uImage, 0);
        gl.uniform1f(U.uBlurMin, cfg.imageBlur?.min ?? IMAGE_BLUR_MIN_DEFAULT);
        gl.uniform1f(U.uBlurMax, cfg.imageBlur?.max ?? IMAGE_BLUR_MAX_DEFAULT);
        const aspect =
            gl.drawingBufferHeight > 0
                ? gl.drawingBufferWidth / gl.drawingBufferHeight
                : 1.0;
        gl.uniform1f(U.uImageAspect, aspect);
    };
}
