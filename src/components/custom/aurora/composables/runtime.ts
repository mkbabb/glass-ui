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
import { createWebGLCanvas } from "../../../../composables/glass/webgl/useWebGLCanvas";
import type { AuroraConfig, AuroraInstance } from "../constants/presets";
import { createGlProgram } from "./glSetup";
import { createUniformBridge } from "./uniformBridge";
import { createCursorState } from "./cursorModel";
import { createFrameLoop } from "./frameLoop";

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
    let reducedMotion =
        typeof window !== "undefined" && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
            : false;
    const frozenOffset = 3.7;

    const cursor = createCursorState();

    // `setConfig` is (re)assigned by `setup(gl)`; before the first arm (and across
    // a context-loss/restore window) it is null and `update()` only stashes
    // `config` for the next `setup` to upload.
    let setConfig: ((cfg: AuroraConfig) => void) | null = null;

    const canvasHandle = createWebGLCanvas(canvas, {
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
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
                getReducedMotion: () => reducedMotion,
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
                // pass the substrate's elapsed seconds straight through.
                time: (elapsedSec) => (reducedMotion ? frozenOffset : elapsedSec),
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
    function setReducedMotion(flag: boolean) {
        reducedMotion = flag;
        // reduced→full restarts drift; full→reduced must draw one last static frame
        // then park. Either way the loop must run at least one more tick.
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
