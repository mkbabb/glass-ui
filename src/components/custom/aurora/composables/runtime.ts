/**
 * Aurora v4.1 runtime — port of bundle `runtime.js` to TypeScript.
 *
 * Compiles the shader, owns the WebGL2 context and RAF loop, translates a
 * reactive `AuroraConfig` into uniforms, and exposes an imperative cursor API
 * plus a side-effect-safe `renderAt(t)` method for capture baking.
 *
 * Y-origin convention: config authoring is CSS-top-origin (0 = top). The
 * runtime flips Y at the uniform boundary (see AUTHOR_Y_ORIGIN_IS_TOP marks).
 */

import { VERTEX_SRC } from "../shaders/aurora.vert";
import { FRAGMENT_SRC } from "../shaders/aurora.frag";
import { flattenPalette } from "./color";
import {
    MAX_NUCLEI,
    MAX_STOPS,
    type AuroraConfig,
    type AuroraInstance,
    type AuroraMedium,
    type FlowPattern,
    type StrokeMode,
    type WarpMode,
} from "../presets";

const MEDIUM_ID: Record<AuroraMedium, number> = { smooth: 0, pastel: 1, watercolor: 2, oil: 3 };
const FLOW_ID: Record<FlowPattern, number> = { none: 0, radial: 1, swirl: 2, diagonal: 3, multi: 4 };
const WARP_ID: Record<WarpMode, number> = { fbm: 0, cellular: 1, hybrid: 2 };
const STROKE_MODE_ID: Record<StrokeMode, number> = { oil: 0, knife: 1, crayon: 2, chunky: 3 };

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

export function createAurora(
    canvas: HTMLCanvasElement,
    initial: AuroraConfig,
    options: AuroraRuntimeOptions = {},
): AuroraInstance {
    const preserveDrawingBuffer = shouldPreserveDrawingBuffer(options);

    // ── Pre-arm state ───────────────────────────────────────────────────
    // These survive the cheap-construction → arm() split: they hold cursor /
    // config / motion intent the consumer may set BEFORE the GL path arms.
    // arm() folds them into the live runtime; until then the imperative
    // setters mutate them harmlessly and arm() picks up the latest values.
    let config: AuroraConfig = initial;
    let running = options.mode !== "capture";
    let reducedMotion =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;
    let startTime = performance.now();
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

    // ── Armed GL state — null until arm() runs ──────────────────────────
    // Populated by arm(); the post-arm draw closures (`drawFrame`, `tick`,
    // `dispose`) and `setConfig` close over it. Before arm the imperative
    // API degrades to pre-arm-state mutation only.
    let armed: {
        readonly setConfig: (cfg: AuroraConfig) => void;
        readonly renderAt: (timeSec: number) => void;
        readonly pause: () => void;
        readonly resume: () => void;
        readonly wake: () => void;
        readonly dispose: () => void;
    } | null = null;
    let disposedBeforeArm = false;

    function setCursor(x: number, y: number, strength: number = 0.8) {
        cursor.targetX = x;
        cursor.targetY = y;
        cursor.targetStrength = strength;
        // A pointer move re-introduces cursor easing — re-arm a parked loop.
        armed?.wake();
    }
    function clearCursor() {
        cursor.targetStrength = 0;
        // The decay-to-rest still needs frames to animate out — re-arm.
        armed?.wake();
    }
    function setCursorRadius(r: number) {
        cursor.radius = r;
        // Radius shift is visible iff the cursor is active; wake so the change
        // is drawn (the loop re-parks immediately if the cursor is at rest).
        armed?.wake();
    }
    function setReducedMotion(flag: boolean) {
        reducedMotion = flag;
        // reduced→full restarts drift; full→reduced must draw one last static
        // frame then park. Either way the loop must run at least one more tick.
        armed?.wake();
    }

    /**
     * Run the expensive WebGL init: create the WebGL2 context, compile +
     * GPU-link the shader, allocate geometry + the uniform cache, upload the
     * first config, and (for non-capture runtimes) arm the rAF loop.
     *
     * Idempotent — a second call is a no-op. Throws on WebGL2/shader-compile/
     * link failure exactly as the pre-lazy-arm `createAurora` did (O
     * invariant 24); on the eager path the throw propagates synchronously out
     * of `createAurora`, on the deferred path out of this `arm()` call.
     */
    function arm(): void {
        if (armed || disposedBeforeArm) return;

        const gl = canvas.getContext("webgl2", {
            antialias: false,
            alpha: true,
            premultipliedAlpha: true,
            // Live canvases default false; capture/thumbnail runtimes opt in
            // for readPixels/toDataURL after a deterministic renderAt() draw.
            preserveDrawingBuffer,
        });
        if (!gl) throw new Error("[Aurora] WebGL2 unavailable");

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
            gl!.viewport(0, 0, w, h);
            gl!.useProgram(prog);
        }

        const ro = new ResizeObserver(() => resize());
        ro.observe(canvas);
        // Belt and suspenders — initial layout can race the first frame.
        requestAnimationFrame(() => {
            resize();
            requestAnimationFrame(resize);
        });

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

        function setConfig(cfg: AuroraConfig) {
            config = cfg;
            gl!.useProgram(prog);

            // Palette — fill in place. flattenPalette writes into `ub.palette`.
            flattenPalette(cfg.palette, MAX_STOPS, ub.palette);
            gl!.uniform3fv(U.uPalette, ub.palette);
            gl!.uniform1i(U.uStopCount, Math.min(cfg.palette.length, MAX_STOPS));

            // Nuclei
            const n = Math.min(cfg.nuclei.length, MAX_NUCLEI);
            gl!.uniform1i(U.uNucleiCount, n);
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
            gl!.uniform2fv(U.uNucleiPos, ub.pos);
            gl!.uniform1fv(U.uNucleiRadius, ub.rad);
            gl!.uniform1fv(U.uNucleiPaletteBias, ub.pb);
            gl!.uniform1fv(U.uNucleiValueBias, ub.vb);
            gl!.uniform1fv(U.uNucleiDriftRadius, ub.dr);
            gl!.uniform1fv(U.uNucleiDriftPhase, ub.dp);
            gl!.uniform1fv(U.uNucleiElong, ub.elong);
            gl!.uniform1fv(U.uNucleiAngle, ub.angle);
            gl!.uniform1f(U.uSoftmaxBeta, cfg.softmaxBeta);
            gl!.uniform1f(U.uValueVariance, cfg.valueVariance);

            // Warp
            gl!.uniform1f(U.uWarpAmount, cfg.warpAmount);
            gl!.uniform1f(U.uWarpScale, cfg.warpScale);
            gl!.uniform1f(U.uWarpDrift, cfg.warpDrift);
            gl!.uniform1i(U.uWarpMode, WARP_ID[cfg.warpMode]);
            gl!.uniform1i(U.uNoiseOctaves, cfg.noiseOctaves);

            // Medium
            gl!.uniform1i(U.uMedium, MEDIUM_ID[cfg.medium]);
            gl!.uniform1i(U.uFlowPattern, FLOW_ID[cfg.flow.pattern]);
            // AUTHOR_Y_ORIGIN_IS_TOP
            gl!.uniform2f(U.uFlowFocal, cfg.flow.focalX, 1.0 - cfg.flow.focalY);
            gl!.uniform1f(U.uFlowAngle, cfg.flow.angle);
            gl!.uniform1f(U.uFlowCurl, cfg.flow.curl);
            // Cursor uniforms are re-sent every frame in tick(); initialise once here.
            // AUTHOR_Y_ORIGIN_IS_TOP
            gl!.uniform2f(U.uCursor, cursor.x, 1.0 - cursor.y);
            gl!.uniform1f(U.uCursorStrength, cursor.strength);
            gl!.uniform1f(U.uCursorRadius, cursor.radius);
            gl!.uniform1f(U.uStrokeAmount, cfg.strokeAmount);
            gl!.uniform1f(U.uStrokeScale, cfg.strokeScale);
            gl!.uniform1f(U.uStrokeAnisotropy, cfg.strokeAnisotropy);
            gl!.uniform1i(U.uStrokeLayers, cfg.strokeLayers);
            gl!.uniform1i(U.uStrokeMode, STROKE_MODE_ID[cfg.strokeMode]);
            gl!.uniform1f(U.uWetEdge, cfg.wetEdge);
            gl!.uniform1f(U.uGranulation, cfg.granulation);
            gl!.uniform1f(U.uImpasto, cfg.impasto);
            gl!.uniform1f(U.uBrokenColor, cfg.brokenColor);
            gl!.uniform1f(U.uCanvasGrain, cfg.canvasGrain);

            // Motion
            gl!.uniform1f(U.uNucleiDrift, cfg.nucleiDrift);
            gl!.uniform1f(U.uPaletteDrift, cfg.paletteDrift);
            gl!.uniform1f(U.uBreathDepth, cfg.breathDepth);
            gl!.uniform1f(U.uBreathPeriod, cfg.breathPeriod);

            // Output
            gl!.uniform1f(U.uSaturation, cfg.saturation);
            gl!.uniform1f(U.uPaperGrain, cfg.paperGrain);
            gl!.uniform1f(U.uAlpha, cfg.alpha);
        }

        setConfig(config);
        resize();

        gl.clearColor(0, 0, 0, 0);
        gl.disable(gl.DEPTH_TEST);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        let raf = 0;
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
            gl!.useProgram(prog);
            // AUTHOR_Y_ORIGIN_IS_TOP
            gl!.uniform2f(U.uCursor, cursor.x, 1.0 - cursor.y);
            gl!.uniform1f(U.uCursorStrength, cursor.strength);
            gl!.uniform1f(U.uCursorRadius, cursor.radius);
            gl!.uniform1f(U.uTime, timeSec);
            gl!.clear(gl!.COLOR_BUFFER_BIT);
            gl!.drawArrays(gl!.TRIANGLES, 0, 3);
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

        function tick() {
            if (!running) return;
            const t = reducedMotion
                ? frozenOffset
                : (performance.now() - startTime) / 1000;
            advanceCursor();
            drawFrame(t);
            // Reschedule ONLY while motion is live. At steady-state this draws
            // the final settled frame once and lets `raf` go to 0 (parked) —
            // no perpetual 60fps compositor cost. `wake()` re-arms on demand.
            raf = needsAnimation() ? requestAnimationFrame(tick) : 0;
        }
        if (running) raf = requestAnimationFrame(tick);

        /**
         * Re-arm a parked loop. A setter that re-introduces motion (cursor
         * move, config drift raise, reduced-motion toggle) calls this so the
         * canvas resumes immediately. No-op while suspended (`!running`) or
         * already scheduled (`raf` non-zero), so it never double-schedules.
         */
        function wake() {
            if (running && !raf) raf = requestAnimationFrame(tick);
        }

        function renderAt(timeSec: number) {
            drawFrame(timeSec);
        }

        function pause() {
            running = false;
            cancelAnimationFrame(raf);
            raf = 0;
        }

        function resume() {
            if (running) return;
            running = true;
            startTime = performance.now() - 1000;
            tick();
        }

        // Runtime-level document-visibility suspend (R0G-1). Every consumer —
        // eager, capture-then-live, always-on-screen — gets a tab-hidden pause,
        // not just the deferred consumer that composes `useIntersectionPause`.
        // Idempotent with that seam: pause() is a no-op when already paused and
        // resume() early-returns when already running.
        const hasDocument = typeof document !== "undefined";
        function onVisibilityChange() {
            if (document.hidden) pause();
            else resume();
        }
        if (hasDocument) {
            document.addEventListener("visibilitychange", onVisibilityChange);
        }

        function dispose() {
            running = false;
            cancelAnimationFrame(raf);
            raf = 0;
            if (hasDocument) {
                document.removeEventListener(
                    "visibilitychange",
                    onVisibilityChange,
                );
            }
            ro.disconnect();
            gl!.deleteProgram(prog);
            gl!.deleteShader(vs);
            gl!.deleteShader(fs);
            gl!.deleteBuffer(buf);
            gl!.deleteVertexArray(vao);
            // Force context release so the browser reclaims it under the
            // per-page WebGL-context cap (~8 in Chromium).
            const ext = gl!.getExtension("WEBGL_lose_context");
            if (ext) ext.loseContext();
        }

        // Publish the armed GL closures. From here on the outer imperative
        // API delegates through `armed`; the pre-arm setters above have
        // already mutated `config` / `cursor` / `running` and arm() consumed
        // the latest values via `setConfig(config)` + the `running` gate.
        armed = { setConfig, renderAt, pause, resume, wake, dispose };
    }

    // The expensive path runs now (eager / capture) or is invoked later by
    // the consumer (`useAurora` schedules it past first paint). On the eager
    // path a WebGL2/compile/link failure throws straight out of createAurora,
    // exactly as a pre-lazy-arm runtime did (O invariant 24).
    if (shouldInitEagerly(options)) arm();

    return {
        arm,
        update: (cfg) => {
            // Pre-arm: stash the config so arm() uploads the latest. Post-arm:
            // upload immediately. Either way the next drawn frame is correct.
            config = cfg;
            armed?.setConfig(cfg);
            // A config change may raise a drift uniform (slider drag) — re-arm
            // a parked loop so the new motion is rendered. wake() re-parks
            // immediately if the new config is still steady-state.
            armed?.wake();
        },
        setCursor,
        clearCursor,
        setCursorRadius,
        setReducedMotion,
        // Pre-arm, mutate `running` directly — arm() honors it via the
        // `if (running) raf = requestAnimationFrame(tick)` gate. Post-arm,
        // delegate to the inner pause/resume, which own `running` and the
        // RAF (the inner resume() restarts `tick()`); setting `running` here
        // first would make the inner resume() early-return on `if (running)`
        // and never restart the loop (the useIntersectionPause re-show seam).
        pause: () => {
            if (armed) armed.pause();
            else running = false;
        },
        resume: () => {
            if (armed) armed.resume();
            else running = true;
        },
        renderAt: (t) => armed?.renderAt(t),
        dispose: () => {
            if (armed) {
                armed.dispose();
            } else {
                // Disposed before arming — make arm() a permanent no-op so a
                // late idle-callback can't resurrect a torn-down instance.
                disposedBeforeArm = true;
            }
        },
    };
}
