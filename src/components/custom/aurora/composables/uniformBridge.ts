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
            const lc = cfg.lightColor ?? [1.0, 0.95, 0.88];
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
