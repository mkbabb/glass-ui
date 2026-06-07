/**
 * Aurora v4.1 runtime — the GL-lifecycle orchestrator over the `useWebGLCanvas`
 * substrate (AU.W6, the DEC-AT-1 transposition).
 *
 * This module composes four cohesive seams atop the substrate:
 *   - glSetup       — compile/link + geometry + the uniform location cache
 *   - uniformBridge — the reactive-config → GL-uniform translation + enum dispatch
 *   - cursorModel   — the eased pointer-attraction state + advance
 *   - frameLoop     — the per-frame draw + the render-demand gate
 *
 * It owns ONLY the aurora-specific glue: threading the seams through the
 * substrate's `setup`/`frame`/`shouldContinue`/`resize`/`time`/`teardown`
 * callbacks, the reduced-motion frozen-t, the DPR policy, and the imperative
 * setters/pause/resume. The generic WebGL2 lifecycle — context creation, the
 * three-reason suspend/resume model, the demand-driven rAF loop, the tab-visibility
 * owner, the ResizeObserver, and the webglcontextlost/restored robustness — lives
 * in the substrate.
 *
 * Y-origin convention: config authoring is CSS-top-origin (0 = top). The seams
 * flip Y at the uniform boundary (`flipY` in uniformBridge/frameLoop).
 */

import { VERTEX_SRC } from "../constants/shaders/aurora.vert";
import { FRAGMENT_SRC } from "../constants/shaders/aurora.frag";
import { resolveBudgetDpr } from "../constants/budget";
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import { createGPUCanvas } from "../../../../composables/glass/createGPUCanvas";
import type { AuroraConfig, AuroraInstance } from "../constants/presets";
import { createGlProgram } from "./glSetup";
import { createUniformBridge } from "./uniformBridge";
import { createCursorState, injectCursorVelocity as injectCursorVel } from "./cursorModel";
import { createFrameLoop } from "./frameLoop";
import { createGPUAuroraSetup } from "./gpuRuntime";

export type AuroraRuntimeMode = "live" | "capture";

/**
 * The three independent reasons the rAF loop may be suspended. Owned by the
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
 * - `"deferred"` (default) — `createAurora` constructs a cheap, un-armed instance
 *   and returns immediately; the GL work is invoked later via `instance.arm()`.
 *   The Vue wrapper `useAurora` schedules `arm()` past first paint on an idle
 *   tick, gated on canvas visibility — so the shader compile-link never lands on
 *   the consumer's first-paint critical path.
 * - `"eager"` — `createAurora` arms synchronously before returning. Capture /
 *   thumbnail-baking consumers need this: `renderAt` must draw a real frame the
 *   instant `createAurora` returns. `mode: "capture"` forces eager regardless.
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
     * `createAurora` throws synchronously and `useAurora` rethrows by default so
     * the signal reaches the consumer's error boundary / dev console. On the
     * DEFERRED path the failure happens on an idle tick — outside any mount-time
     * boundary — so the runtime routes it here, and `useAurora` re-surfaces it on
     * the microtask queue (so it still reaches the dev console /
     * `app.config.errorHandler`) when no handler is supplied. Provide this
     * callback to opt into silent handling on either path.
     *
     * NOTE: this is the `useAurora` Vue-wrapper contract surface. The imperative
     * `createAurora(...)` runtime throws on eager init failure and — for
     * `instance.arm()` on the deferred path — rethrows from `arm()`.
     */
    onInitError?: (err: Error) => void;
    /**
     * AW.W7b — the WebGPU backend route. When a `GPUDevice` is supplied (the
     * `resolveRenderModeAsync` probe resolved a non-fallback adapter), the runtime
     * routes to `createGPUCanvas` drawing the SAME single-pass aurora over WebGPU;
     * otherwise the WebGL2 fragment path is the universal fallback. `useAurora` runs
     * the probe past first paint (the CSS placeholder paints first) and threads the
     * device here. `null`/absent → the WebGL2 path (the zero-regression default).
     */
    gpuDevice?: GPUDevice | null;
}

function shouldInitEagerly(options: AuroraRuntimeOptions): boolean {
    // Capture runtimes must arm synchronously — `renderAt` has to draw the moment
    // `createAurora` returns. Otherwise honor the explicit strategy, defaulting to
    // the post-paint deferred path.
    if (options.mode === "capture") return true;
    return options.initStrategy === "eager";
}

function shouldPreserveDrawingBuffer(options: AuroraRuntimeOptions): boolean {
    if (typeof options.preserveDrawingBuffer === "boolean") {
        return options.preserveDrawingBuffer;
    }
    return options.mode === "capture";
}

/**
 * The concrete `createAurora` return shape. It IS an {@link AuroraInstance}
 * (structurally assignable — every member matches) but widens `pause`/`resume` to
 * carry an optional {@link SuspendReason}, defaulting to `"manual"`. The Vue
 * wrapper passes `"off-screen"` for the intersection seam; a bare
 * `pause()`/`resume()` reads identically to the `AuroraInstance` contract.
 */
export interface AuroraRuntime extends Omit<AuroraInstance, "pause" | "resume"> {
    pause(reason?: SuspendReason): void;
    resume(reason?: SuspendReason): void;
    /**
     * AW.W8.1 — feed a pointer delta into the velocity-reactive flow (a fast flick →
     * a transient swirl-burst). The PRM early-out lives here: the injection is
     * suppressed when the substrate reports reduced-motion (the cursor write-path
     * fires from the pointermove listener, INDEPENDENT of the parked rAF loop).
     */
    injectCursorVelocity(dx: number, dy: number): void;
    /** AW.W8.1 — the live reduced-motion state (the cursor listener early-outs on it). */
    readonly reducedMotion: boolean;
}

export function createAurora(
    canvas: HTMLCanvasElement,
    initial: AuroraConfig,
    options: AuroraRuntimeOptions = {},
): AuroraRuntime {
    const preserveDrawingBuffer = shouldPreserveDrawingBuffer(options);

    // ── Aurora-specific state — survives the cheap-construction → arm() split.
    // These hold cursor / config / motion intent the consumer may set BEFORE the
    // GL path arms. The substrate's `setup(gl)` folds them into the live program
    // (via `setConfig`); until then the imperative setters mutate them harmlessly
    // and `setup` picks up the latest values.
    let config: AuroraConfig = initial;
    // AV.W7 G1 — the reduced-motion freeze is LIFTED into the `useWebGLCanvas`
    // substrate, which now OWNS + LIVE-MONITORS the query (a `matchMedia` `change`
    // listener that re-arms one static frame on un-reduce). Aurora reads the
    // substrate's live `reducedMotion` getter instead of an init-once local —
    // toggling reduced-motion at runtime now freezes/wakes without the duplicate
    // consumer-side listener `useAurora` used to install.
    const frozenOffset = 3.7;

    const cursor = createCursorState();

    // `setConfig` is (re)assigned by `setup(gl)`; before the first arm (and across
    // a context-loss/restore window) it is null and `update()` only stashes
    // `config` for the next `setup` to upload.
    let setConfig: ((cfg: AuroraConfig) => void) | null = null;

    // AW.W7b — route to the WebGPU backend when the probe resolved a device; else the
    // WebGL2 fragment path (the universal zero-regression fallback). Both backends
    // compose the SAME `createCanvasLifecycle` core, so the handle shape + the park
    // contract are identical — the rest of this runtime is backend-agnostic.
    const canvasHandle: {
        arm: () => void;
        suspend: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
        resume: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
        wake: () => void;
        renderAt: (timeSec: number) => void;
        dispose: () => void;
        readonly reducedMotion: boolean;
    } = options.gpuDevice
        ? createGPUCanvas(canvas, {
              device: options.gpuDevice,
              mode: options.mode === "capture" ? "capture" : "live",
              alphaMode: "premultiplied",
              setup: createGPUAuroraSetup({
                  canvas,
                  getConfig: () => config,
                  cursor,
                  getReducedMotion: () => canvasHandle.reducedMotion,
                  frozenOffset,
              }),
          })
        : createWebGLCanvas(canvas, {
        mode: options.mode === "capture" ? "capture" : "live",
        contextAttrs: {
            antialias: false,
            alpha: true,
            premultipliedAlpha: true,
            // Live canvases default false; capture/thumbnail runtimes opt in for
            // readPixels/toDataURL after a deterministic renderAt() draw.
            preserveDrawingBuffer,
        },
        // Build the program + geometry + uniform cache on a fresh context. The
        // substrate calls this on arm() AND on every webglcontextrestored, so a
        // GPU context loss self-heals — the closures below close over the fresh
        // `gl`/program/seams each time.
        setup: (gl) => {
            const {
                program: prog,
                vs,
                fs,
                uniforms,
                geometry,
            } = createGlProgram(gl, VERTEX_SRC, FRAGMENT_SRC);

            function resize() {
                // AV.W7 F6 — the DPR≤2 clamp is the named `AV_DPR_MAX` ceiling.
                const dpr = resolveBudgetDpr();
                const cw = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
                const ch =
                    canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
                const w = Math.max(1, Math.floor(cw * dpr));
                const h = Math.max(1, Math.floor(ch * dpr));
                canvas.width = w;
                canvas.height = h;
                gl.viewport(0, 0, w, h);
                gl.useProgram(prog);
            }

            const uploadConfig = createUniformBridge(gl, prog, uniforms, cursor);
            const loop = createFrameLoop({
                gl,
                prog,
                uniforms,
                cursor,
                getConfig: () => config,
                // Read the substrate's live reduced-motion state (G1).
                getReducedMotion: () => canvasHandle.reducedMotion,
            });

            // GL state setup — clear-to-transparent, premultiplied-alpha blend.
            gl.clearColor(0, 0, 0, 0);
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

            // Upload the latest config into the fresh program. Publish the uploader
            // so the imperative `update()` can re-upload post-arm.
            setConfig = (cfg) => {
                config = cfg;
                uploadConfig(cfg);
            };
            setConfig(config);

            // Belt and suspenders — initial layout can race the first frame. (The
            // substrate calls `resize()` once on build + on every observed resize;
            // this extra rAF-chained double-resize defends the first-paint layout
            // race exactly as the pre-substrate runtime did.)
            requestAnimationFrame(() => {
                resize();
                requestAnimationFrame(resize);
            });

            return {
                frame: loop.frame,
                shouldContinue: loop.needsAnimation,
                resize,
                // reduced-motion freezes time at the authored offset; otherwise
                // pass the substrate's elapsed seconds straight through. The
                // substrate owns + live-monitors the PRM state (G1).
                time: (elapsedSec) =>
                    canvasHandle.reducedMotion ? frozenOffset : elapsedSec,
                teardown: () => {
                    gl.deleteProgram(prog);
                    gl.deleteShader(vs);
                    gl.deleteShader(fs);
                    gl.deleteBuffer(geometry.buf);
                    gl.deleteVertexArray(geometry.vao);
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
    // AW.W8.1 — the velocity-reactive flow WRITE-PATH. Feeds a pointer delta into the
    // cursor velocity + swirl-burst. The pointermove listener (useCursorInteraction)
    // fires INDEPENDENT of the rAF loop, so it could move the field even while the loop
    // is parked under reduce — the cursor WRITE-PATH PRM early-out lives HERE: the
    // velocity injection is SUPPRESSED when the substrate reports reduced-motion (the
    // master tempo scalar also zeroes the decay, but this write-path check is the
    // load-bearing one for the off-loop listener — proof:aurora-interaction-prm asserts it).
    function injectCursorVelocity(dx: number, dy: number) {
        if (canvasHandle.reducedMotion) return; // cursor write-path PRM early-out
        injectCursorVel(cursor, dx, dy);
        canvasHandle.wake();
    }
    function clearCursor() {
        cursor.targetStrength = 0;
        // The decay-to-rest still needs frames to animate out — re-arm.
        canvasHandle.wake();
    }
    function setCursorRadius(r: number) {
        cursor.radius = r;
        // Radius shift is visible iff the cursor is active; wake so the change is
        // drawn (the loop re-parks immediately if the cursor is at rest).
        canvasHandle.wake();
    }
    function setReducedMotion(_flag: boolean) {
        // AV.W7 G1 — the reduced-motion state is now OWNED + live-monitored by the
        // substrate (it installs the `matchMedia` `change` listener and re-arms one
        // static frame on un-reduce). This setter is retained only as a public
        // wake() nudge for a consumer that mutates the OS query in a test harness;
        // the substrate's own listener is the source of truth.
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
            // A config change may raise a drift uniform (slider drag) — re-arm a
            // parked loop so the new motion is rendered. wake() re-parks
            // immediately if the new config is still steady-state.
            canvasHandle.wake();
        },
        setCursor,
        clearCursor,
        setCursorRadius,
        setReducedMotion,
        // AW.W8.1 — the velocity-reactive flow write-path (PRM-gated) + the live
        // reduced-motion read (the cursor pointermove listener early-outs on it).
        injectCursorVelocity,
        get reducedMotion() {
            return canvasHandle.reducedMotion;
        },
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
