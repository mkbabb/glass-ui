/**
 * Aurora v4.1 runtime — composes the `useWebGLCanvas` substrate (AU.W6, the
 * DEC-AT-1 transposition).
 *
 * This module owns ONLY the aurora-specific concerns: compiling the shader,
 * translating a reactive `AuroraConfig` into uniforms, the eased cursor model,
 * the reduced-motion frozen-t, and the DPR policy. The generic WebGL2 lifecycle
 * — context creation, the three-reason suspend/resume model, the demand-driven
 * rAF loop, the tab-visibility owner, the ResizeObserver, and the
 * webglcontextlost/restored robustness — lives in the substrate; this runtime
 * threads its aurora-specific behaviour through the substrate's `setup`/`frame`/
 * `shouldContinue`/`resize`/`time`/`teardown` callbacks.
 *
 * Y-origin convention: config authoring is CSS-top-origin (0 = top). The
 * runtime flips Y at the uniform boundary (see AUTHOR_Y_ORIGIN_IS_TOP marks).
 */

import { VERTEX_SRC } from "../constants/shaders/aurora.vert";
import { FRAGMENT_SRC } from "../constants/shaders/aurora.frag";
import { flattenPalette } from "./color";
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import {
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraInstance,
    type AuroraMedium,
    type FlowPattern,
    type StrokeMode,
    type WarpMode,
} from "../constants/presets";

/**
 * Sealed enum↔shader-int dispatch. Each map is `as const` and constrained by a
 * `satisfies Record<Union, number>` so a NEW union member is a COMPILE error
 * until it gets a slot here — no silent stale-`Record` gap where a fresh enum
 * value uploads `undefined`. The reverse — `as const` keeping the literal int
 * types — gives the shader-int boundary one source of truth.
 *
 * Crayon is a PEER medium (`uMedium == 4`), NOT a stroke mode: the shader hoists
 * it out of `mediumOil()` (it is wax-on-tooth, not oil strokes). So `MEDIUM_ID`
 * carries the peer `crayon: 4` slot and `STROKE_MODE_ID` no longer maps `crayon`
 * — the runtime resolves an `cfg.strokeMode === "crayon"` config to the crayon
 * peer medium via `resolveMediumId` and uploads a benign `uStrokeMode` (oil).
 */
const MEDIUM_ID = {
    smooth: 0,
    pastel: 1,
    watercolor: 2,
    oil: 3,
    crayon: 4,
} as const satisfies Record<AuroraMedium | "crayon", number>;

const FLOW_ID = {
    none: 0,
    radial: 1,
    swirl: 2,
    diagonal: 3,
    multi: 4,
} as const satisfies Record<FlowPattern, number>;

const WARP_ID = {
    fbm: 0,
    cellular: 1,
    hybrid: 2,
} as const satisfies Record<WarpMode, number>;

// Oil-stroke modes ONLY — crayon dropped (it is a peer medium per MEDIUM_ID).
const STROKE_MODE_ID = {
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
function resolveMediumId(cfg: AuroraConfig): number {
    if (cfg.medium === "oil" && cfg.strokeMode === "crayon") {
        return MEDIUM_ID.crayon;
    }
    return MEDIUM_ID[cfg.medium];
}

/**
 * The `uStrokeMode` int for a config. Crayon is not an oil stroke (it routes to
 * the crayon peer medium where `uStrokeMode` is unread), so it uploads the
 * benign oil default; the other modes map directly.
 */
function resolveStrokeModeId(cfg: AuroraConfig): number {
    if (cfg.strokeMode === "crayon") return STROKE_MODE_ID.oil;
    return STROKE_MODE_ID[cfg.strokeMode];
}

/**
 * Cursor easing constants. Authored to feel "snappy on entry, gentle decay";
 * documented in DESIGN.md §4. Higher lerp = faster ramp; smaller decay = longer
 * tail. Keep in sync with the CPU-mirror in any consumer that reproduces the
 * cursor model.
 */
const CURSOR_POS_LERP = 0.22;
const CURSOR_STRENGTH_LERP = 0.18;
const CURSOR_DECAY_PER_FRAME = 0.992; // ≈ 2 s half-life at 60 fps

/**
 * At-rest epsilon for the demand-driven loop. The cursor is "settled" once its
 * eased position is within ε of its target AND its strength has decayed below
 * ε — below this the next frame is visually identical, so the loop may park.
 */
const CURSOR_REST_EPSILON = 1e-3;

export type AuroraRuntimeMode = "live" | "capture";

/**
 * The three independent reasons the rAF loop may be suspended. Now owned by the
 * `useWebGLCanvas` substrate as a `Set<reason>`: the loop runs IFF the set is
 * empty and each reason is cleared ONLY by the source that set it. This makes
 * resume-while-still-suspended structurally unreachable — a `resume("tab-hidden")`
 * cannot lift an `"off-screen"` suspension.
 *
 * - `"tab-hidden"` — the substrate's `document.visibilitychange` owner.
 * - `"off-screen"` — viewport-intersection, driven by `useIntersectionPause`.
 * - `"manual"` — the public `pause()`/`resume()` API (and capture-mode seed).
 */
export type SuspendReason = "tab-hidden" | "off-screen" | "manual";

/**
 * When the expensive WebGL path (context creation, shader compile + GPU link,
 * first uniform upload, rAF arm) actually runs.
 *
 * - `"deferred"` (default) — `createAurora` constructs a cheap, un-armed
 *   instance and returns immediately; the GL work is invoked later via
 *   `instance.arm()`. The Vue wrapper `useAurora` schedules `arm()` past first
 *   paint on an idle tick, gated on canvas visibility — so the shader
 *   compile-link never lands on the consumer's first-paint critical path.
 * - `"eager"` — `createAurora` arms synchronously before returning, exactly
 *   as a pre-lazy-arm runtime did. Capture / thumbnail-baking consumers need
 *   this: `renderAt` must draw a real frame the instant `createAurora`
 *   returns. `mode: "capture"` forces eager regardless of this field.
 */
export type AuroraInitStrategy = "eager" | "deferred";

export interface AuroraRuntimeOptions {
    mode?: AuroraRuntimeMode;
    preserveDrawingBuffer?: boolean;
    /**
     * When to run the expensive WebGL init. Defaults to `"deferred"`.
     * `mode: "capture"` forces `"eager"` (a capture runtime must be able to
     * `renderAt` synchronously). See {@link AuroraInitStrategy}.
     */
    initStrategy?: AuroraInitStrategy;
    /**
     * Init-failure handler. A WebGL2/shader-compile/link failure is a
     * library-internal contract violation (O invariant 24). On the EAGER path
     * `createAurora` throws synchronously and `useAurora` rethrows by default
     * so the signal reaches the consumer's error boundary / dev console. On
     * the DEFERRED path the failure happens on an idle tick — outside any
     * mount-time boundary — so the runtime routes it here, and `useAurora`
     * re-surfaces it on the microtask queue (so it still reaches the dev
     * console / `app.config.errorHandler`) when no handler is supplied.
     * Provide this callback to opt into silent handling on either path.
     *
     * NOTE: this is the `useAurora` Vue-wrapper contract surface. The
     * imperative `createAurora(...)` runtime throws on eager init failure and
     * — for `instance.arm()` on the deferred path — rethrows from `arm()`.
     */
    onInitError?: (err: Error) => void;
}

function shouldInitEagerly(options: AuroraRuntimeOptions): boolean {
    // Capture runtimes must arm synchronously — `renderAt` has to draw the
    // moment `createAurora` returns. Otherwise honor the explicit strategy,
    // defaulting to the post-paint deferred path.
    if (options.mode === "capture") return true;
    return options.initStrategy === "eager";
}

function shouldPreserveDrawingBuffer(options: AuroraRuntimeOptions): boolean {
    if (typeof options.preserveDrawingBuffer === "boolean") {
        return options.preserveDrawingBuffer;
    }
    return options.mode === "capture";
}

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        const log = gl.getShaderInfoLog(sh) ?? "unknown";
        gl.deleteShader(sh);
        throw new Error(`[Aurora] shader compile failed:\n${log}`);
    }
    return sh;
}

function link(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    const p = gl.createProgram()!;
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        const log = gl.getProgramInfoLog(p) ?? "unknown";
        gl.deleteProgram(p);
        throw new Error(`[Aurora] program link failed:\n${log}`);
    }
    return p;
}

const UNIFORM_NAMES = [
    "uTime",
    "uPalette", "uStopCount",
    "uNucleiCount", "uNucleiPos", "uNucleiRadius",
    "uNucleiPaletteBias", "uNucleiValueBias", "uNucleiDriftRadius", "uNucleiDriftPhase",
    "uNucleiElong", "uNucleiAngle",
    "uSoftmaxBeta", "uValueVariance",
    "uWarpAmount", "uWarpScale", "uWarpDrift", "uWarpMode", "uNoiseOctaves",
    "uMedium", "uFlowPattern", "uFlowFocal", "uFlowAngle", "uFlowCurl",
    "uCursor", "uCursorStrength", "uCursorRadius",
    "uStrokeAmount", "uStrokeScale", "uStrokeAnisotropy", "uStrokeLayers", "uStrokeMode",
    "uWetEdge", "uGranulation", "uImpasto", "uBrokenColor", "uCanvasGrain",
    "uNucleiDrift", "uPaletteDrift", "uBreathDepth", "uBreathPeriod",
    "uSaturation", "uPaperGrain", "uAlpha",
] as const;

type UniformName = (typeof UNIFORM_NAMES)[number];

/**
 * The concrete `createAurora` return shape. It IS an {@link AuroraInstance}
 * (structurally assignable — every member matches) but widens `pause`/`resume`
 * to carry an optional {@link SuspendReason}, defaulting to `"manual"`. The
 * Vue wrapper passes `"off-screen"` for the intersection seam; a bare
 * `pause()`/`resume()` reads identically to the `AuroraInstance` contract.
 */
export interface AuroraRuntime extends Omit<AuroraInstance, "pause" | "resume"> {
    pause(reason?: SuspendReason): void;
    resume(reason?: SuspendReason): void;
}

export function createAurora(
    canvas: HTMLCanvasElement,
    initial: AuroraConfig,
    options: AuroraRuntimeOptions = {},
): AuroraRuntime {
    const preserveDrawingBuffer = shouldPreserveDrawingBuffer(options);

    // ── Aurora-specific state — survives the cheap-construction → arm() split.
    // These hold cursor / config / motion intent the consumer may set BEFORE
    // the GL path arms. The substrate's `setup(gl)` folds them into the live
    // program (via `setConfig`); until then the imperative setters mutate them
    // harmlessly and `setup` picks up the latest values.
    let config: AuroraConfig = initial;
    let reducedMotion =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;
    const frozenOffset = 3.7;

    // Cursor state — x/y in 0..1, eased. `strength` ramps in; `targetStrength` decays.
    const cursor = {
        x: 0.5,
        y: 0.5,
        targetX: 0.5,
        targetY: 0.5,
        strength: 0,
        targetStrength: 0,
        radius: 0.25,
    };

    // `setConfig` is (re)assigned by `setup(gl)`; before the first arm (and
    // across a context-loss/restore window) it is null and `update()` only
    // stashes `config` for the next `setup` to upload.
    let setConfig: ((cfg: AuroraConfig) => void) | null = null;

    const canvasHandle = createWebGLCanvas(canvas, {
        mode: options.mode === "capture" ? "capture" : "live",
        contextAttrs: {
            antialias: false,
            alpha: true,
            premultipliedAlpha: true,
            // Live canvases default false; capture/thumbnail runtimes opt in
            // for readPixels/toDataURL after a deterministic renderAt() draw.
            preserveDrawingBuffer,
        },
        // Build the program + geometry + uniform cache on a fresh context. The
        // substrate calls this on arm() AND on every webglcontextrestored, so a
        // GPU context loss self-heals — the closures below close over the fresh
        // `gl`/`prog`/`U` each time.
        setup: (gl) => {
            const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
            const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
            const prog = link(gl, vs, fs);
            gl.useProgram(prog);

            // Full-screen triangle: covers the viewport with one draw.
            const vao = gl.createVertexArray()!;
            gl.bindVertexArray(vao);
            const buf = gl.createBuffer()!;
            gl.bindBuffer(gl.ARRAY_BUFFER, buf);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 3, -1, -1, 3]),
                gl.STATIC_DRAW,
            );
            const aPos = gl.getAttribLocation(prog, "aPos");
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

            // Uniform location cache
            const U = {} as Record<UniformName, WebGLUniformLocation | null>;
            for (const n of UNIFORM_NAMES) U[n] = gl.getUniformLocation(prog, n);

            function resize() {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const cw = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
                const ch = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
                const w = Math.max(1, Math.floor(cw * dpr));
                const h = Math.max(1, Math.floor(ch * dpr));
                canvas.width = w;
                canvas.height = h;
                gl.viewport(0, 0, w, h);
                gl.useProgram(prog);
            }

            // Pre-allocated upload buffers — filled in place inside setConfig() so a
            // slider drag does not allocate ~8 Float32Arrays per frame. Sized to the
            // shader's MAX_NUCLEI / MAX_STOPS arrays; spare slots are uploaded but
            // ignored thanks to uNucleiCount / uStopCount gates in the shader.
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

            function uploadConfig(cfg: AuroraConfig) {
                config = cfg;
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
                    // AUTHOR_Y_ORIGIN_IS_TOP — flip to shader's bottom-origin.
                    ub.pos[i * 2 + 1] = 1.0 - nu.y;
                    ub.rad[i] = nu.radius;
                    ub.pb[i] = nu.paletteBias;
                    ub.vb[i] = nu.valueBias;
                    ub.dr[i] = nu.driftRadius;
                    ub.dp[i] = nu.driftPhase;
                    ub.elong[i] = nu.elongation ?? 1.0;
                    // AUTHOR_Y_ORIGIN_IS_TOP — top-origin angles invert relative to
                    // bottom-origin shader space.
                    ub.angle[i] = (-(nu.angle ?? 0) * Math.PI) / 180;
                }
                // Spare slots: zero-out so old values from a longer prior config don't
                // bleed into the per-iteration loop (gated by uNucleiCount, but cheap
                // to defend).
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

                // Medium — `resolveMediumId` routes the oil+crayon config to the
                // crayon PEER (uMedium==4); every other case is the identity map.
                gl.uniform1i(U.uMedium, resolveMediumId(cfg));
                gl.uniform1i(U.uFlowPattern, FLOW_ID[cfg.flow.pattern]);
                // AUTHOR_Y_ORIGIN_IS_TOP
                gl.uniform2f(U.uFlowFocal, cfg.flow.focalX, 1.0 - cfg.flow.focalY);
                gl.uniform1f(U.uFlowAngle, cfg.flow.angle);
                gl.uniform1f(U.uFlowCurl, cfg.flow.curl);
                // Cursor uniforms are re-sent every frame in frame(); initialise once here.
                // AUTHOR_Y_ORIGIN_IS_TOP
                gl.uniform2f(U.uCursor, cursor.x, 1.0 - cursor.y);
                gl.uniform1f(U.uCursorStrength, cursor.strength);
                gl.uniform1f(U.uCursorRadius, cursor.radius);
                gl.uniform1f(U.uStrokeAmount, cfg.strokeAmount);
                gl.uniform1f(U.uStrokeScale, cfg.strokeScale);
                gl.uniform1f(U.uStrokeAnisotropy, cfg.strokeAnisotropy);
                gl.uniform1i(U.uStrokeLayers, cfg.strokeLayers);
                gl.uniform1i(U.uStrokeMode, resolveStrokeModeId(cfg));
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
            }

            function advanceCursor() {
                // Cursor easing — snappy approach, gentle decay when idle. Constants
                // live at module scope; see DESIGN.md §4.
                cursor.x += (cursor.targetX - cursor.x) * CURSOR_POS_LERP;
                cursor.y += (cursor.targetY - cursor.y) * CURSOR_POS_LERP;
                cursor.strength +=
                    (cursor.targetStrength - cursor.strength) * CURSOR_STRENGTH_LERP;
                cursor.targetStrength *= CURSOR_DECAY_PER_FRAME;
            }

            function drawFrame(timeSec: number) {
                gl.useProgram(prog);
                // AUTHOR_Y_ORIGIN_IS_TOP
                gl.uniform2f(U.uCursor, cursor.x, 1.0 - cursor.y);
                gl.uniform1f(U.uCursorStrength, cursor.strength);
                gl.uniform1f(U.uCursorRadius, cursor.radius);
                gl.uniform1f(U.uTime, timeSec);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
            }

            /**
             * Demand-driven gate: is there live motion to render on the next frame?
             *
             * - `false` under reduced-motion — the static frame is drawn once, then
             *   the loop parks (no perpetual re-rasterization of a byte-identical
             *   frame).
             * - `false` at steady-state — all four motion-drift uniforms are 0 AND
             *   the cursor has settled within ε (eased position at target, strength
             *   decayed out). The next frame would be pixel-identical, so park.
             * - `true` otherwise — drift is live or the cursor is still easing.
             */
            function needsAnimation(): boolean {
                if (reducedMotion) return false;
                const driftLive =
                    config.nucleiDrift !== 0 ||
                    config.paletteDrift !== 0 ||
                    config.breathDepth !== 0 ||
                    config.warpDrift !== 0;
                if (driftLive) return true;
                const cursorLive =
                    cursor.targetStrength > CURSOR_REST_EPSILON ||
                    cursor.strength > CURSOR_REST_EPSILON ||
                    Math.abs(cursor.x - cursor.targetX) > CURSOR_REST_EPSILON ||
                    Math.abs(cursor.y - cursor.targetY) > CURSOR_REST_EPSILON;
                return cursorLive;
            }

            // GL state setup — clear-to-transparent, premultiplied-alpha blend.
            gl.clearColor(0, 0, 0, 0);
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            // Upload the latest config into the fresh program. Publish the
            // uploader so the imperative `update()` can re-upload post-arm.
            setConfig = uploadConfig;
            uploadConfig(config);

            // Belt and suspenders — initial layout can race the first frame.
            // (The substrate calls `resize()` once on build + on every observed
            // resize; this extra rAF-chained double-resize defends the
            // first-paint layout race exactly as the pre-substrate runtime did.)
            requestAnimationFrame(() => {
                resize();
                requestAnimationFrame(resize);
            });

            return {
                // advance the cursor easing THEN draw — the per-frame step.
                frame: (timeSec) => {
                    advanceCursor();
                    drawFrame(timeSec);
                },
                shouldContinue: needsAnimation,
                resize,
                // reduced-motion freezes time at the authored offset; otherwise
                // pass the substrate's elapsed seconds straight through.
                time: (elapsedSec) => (reducedMotion ? frozenOffset : elapsedSec),
                teardown: () => {
                    gl.deleteProgram(prog);
                    gl.deleteShader(vs);
                    gl.deleteShader(fs);
                    gl.deleteBuffer(buf);
                    gl.deleteVertexArray(vao);
                    // The WEBGL_lose_context release is the substrate's job.
                },
            };
        },
    });

    function setCursor(x: number, y: number, strength: number = 0.8) {
        cursor.targetX = x;
        cursor.targetY = y;
        cursor.targetStrength = strength;
        // A pointer move re-introduces cursor easing — re-arm a parked loop.
        canvasHandle.wake();
    }
    function clearCursor() {
        cursor.targetStrength = 0;
        // The decay-to-rest still needs frames to animate out — re-arm.
        canvasHandle.wake();
    }
    function setCursorRadius(r: number) {
        cursor.radius = r;
        // Radius shift is visible iff the cursor is active; wake so the change
        // is drawn (the loop re-parks immediately if the cursor is at rest).
        canvasHandle.wake();
    }
    function setReducedMotion(flag: boolean) {
        reducedMotion = flag;
        // reduced→full restarts drift; full→reduced must draw one last static
        // frame then park. Either way the loop must run at least one more tick.
        canvasHandle.wake();
    }

    // The expensive path runs now (eager / capture) or is invoked later by the
    // consumer (`useAurora` schedules it past first paint). Capture mode already
    // armed inside the substrate; the eager-live path arms here. On either eager
    // path a WebGL2/compile/link failure throws straight out of `createAurora`,
    // exactly as a pre-lazy-arm runtime did (O invariant 24); the deferred path
    // throws from `arm()`.
    if (options.mode !== "capture" && shouldInitEagerly(options)) {
        canvasHandle.arm();
    }

    return {
        arm: () => canvasHandle.arm(),
        update: (cfg) => {
            // Pre-arm: stash the config so the next `setup` uploads the latest.
            // Post-arm: upload immediately. Either way the next drawn frame is
            // correct.
            config = cfg;
            setConfig?.(cfg);
            // A config change may raise a drift uniform (slider drag) — re-arm
            // a parked loop so the new motion is rendered. wake() re-parks
            // immediately if the new config is still steady-state.
            canvasHandle.wake();
        },
        setCursor,
        clearCursor,
        setCursorRadius,
        setReducedMotion,
        // Public pause/resume key on the `"manual"` reason by default. The Vue
        // wrapper passes `"off-screen"` for the intersection seam so the two
        // sources never alias. Both delegate to the substrate's three-reason
        // suspend model, which works pre- AND post-arm.
        pause: (reason: SuspendReason = "manual") => canvasHandle.suspend(reason),
        resume: (reason: SuspendReason = "manual") => canvasHandle.resume(reason),
        renderAt: (t) => canvasHandle.renderAt(t),
        dispose: () => canvasHandle.dispose(),
    };
}
