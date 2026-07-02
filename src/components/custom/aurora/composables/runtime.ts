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
import { IMAGE_FRAGMENT_SRC } from "../constants/shaders/aurora-image.frag";
import { resolveAuroraWashDpr } from "../constants/budget";
import { armWebGL2ImageTexture, createAuroraImageCoordinator } from "./auroraImageSource";
import {
    createGpuSubstrate,
    type BackingSize,
} from "../../../../composables/glass/webgpu/useGpuSubstrate";
import { isSoftwareWebGLRenderer } from "../constants/renderMode";
import type { AuroraConfig, AuroraInstance } from "../constants/presets";
import { createGlProgram } from "./glSetup";
import { createUniformBridge } from "./uniformBridge";
import { createCursorState, injectCursorVelocity as injectCursorVel } from "./cursorModel";
import { createFrameLoop } from "./frameLoop";
import { createAuroraWGPUSetup } from "./wgpuSetup";
import { usePointerVelocityField } from "../../../../composables/motion/usePointerVelocityField";

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
     *
     * BB.W-AURORA-SWRASTER — a SOFTWARE-RASTER fall is NOT a contract violation:
     * it never reaches `onInitError`. The wedge catch (see {@link createAurora})
     * recognizes the software-raster signal at arm time, leaves the canvas
     * un-armed (the placeholder stays the surface), and returns CLEANLY — so a
     * consumer who pins `mode:"capture"`/`mode:"webgl"` under SwiftShader never
     * has to wire `onInitError` to avoid the hang. The handler is preserved for
     * GENUINE violations (a malformed shader, an OOM, a real link failure).
     */
    onInitError?: (err: Error) => void;
    /**
     * BB.W-AURORA-SWRASTER — opt OUT of the runtime software-raster wedge catch.
     * Default `false`: the wedge catch is the safe default — `createAurora`
     * recognizes a software renderer at arm time and falls cleanly to the
     * placeholder rather than arming the page-wedging live GL layer. `true` (the
     * named, recorded escape for a deterministic test that ACCEPTS the cost)
     * arms WebGL even under a detected software renderer. Mirrors the
     * `resolveRenderMode` escape of the same name — ONE consumer-facing flag,
     * threaded through both seams.
     */
    forceWebGLUnderSoftwareRaster?: boolean;
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
     * BC.W-VIZ-AURORA (T2) — the device-resolved arm PROMISE. On the WebGPU
     * backend `renderAt`/`arm` are NO-OPS until `armAsync()` resolves the async
     * adapter→device→configure→setup prelude (`useGpuSubstrate.armAsync` tries
     * WebGPU then falls to the WebGL2 net). A CAPTURE consumer (`renderAt(t)` +
     * `toDataURL`) MUST `await armAsync()` before the first `renderAt` — the
     * synchronous `arm()` cannot guarantee the WebGPU device is present, so a
     * synchronous `renderAt` right after `createAurora(…,{mode:"capture"})` paints
     * a BLANK frame (the dead-preview defect). Resolves once the backend is armed;
     * the WebGL2 fallback resolves immediately. Idempotent + safe post-dispose.
     */
    armAsync(): Promise<void>;
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

    // BB.W-AURORA-SWRASTER — THE WEDGE CATCH (the guard's second leg). A consumer
    // that bypasses `resolveRenderMode` (a direct `createAurora(canvas, cfg,
    // {mode:"capture"})` / `{initStrategy:"eager"}`) reaches the live GL layer
    // un-probed. We re-run the SAME software-raster predicate here (ONE detector,
    // shared from renderMode.ts — no second `getContext("webgl2")` is minted; this
    // composes the substrate's single probe): when a software renderer is detected
    // AND the escape is OFF, we NEVER create the WebGL canvas. The runtime returns
    // inert handles — the placeholder stays the surface, `renderAt`/`arm` are
    // no-ops — so the page never wedges and `onInitError` is NOT fired (a
    // software-raster fall is a recognized substrate decision, not a contract
    // violation). The `forceWebGLUnderSoftwareRaster` escape opts back in.
    const wedgeBlocked =
        !options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer();

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

    // BC.W-VIZ-AURORA (T5) — the shared viz-pointer-physics field (BB.B4). The fold is
    // ADDITIVE + byte-faithful: the existing cursorModel velocity/burst (the swirl
    // attraction) stays the baseline; this field adds the ACCELERATION (second-derivative)
    // term for the iOS-27 gel snap-back — a fast flick that DECELERATES (negative accel)
    // gets a transient over-warp that springs back. The field owns NO own rAF — it is FED
    // `tick(deltaMs)` from inside the EXISTING createCanvasLifecycle frame callback (the
    // one-loop / proof:offscreen-pause discipline), and FREEZES under PRM (tick(0)). The
    // pointer POSITION write is event-driven (setCursor / injectCursorVelocity feed
    // `setPointer`, PRM-gated); the velocity + acceleration are DERIVED in tick.
    const pointerField = usePointerVelocityField();

    // `setConfig` is (re)assigned by `setup(gl)`; before the first arm (and across
    // a context-loss/restore window) it is null and `update()` only stashes
    // `config` for the next `setup` to upload.
    let setConfig: ((cfg: AuroraConfig) => void) | null = null;

    // BG.W-AUR-IMAGE-SOURCE — the `source:"image"` decode/upload coordination leaf (`wake`
    // is deferred over `canvasHandle` below, only fired post-construction).
    const imageCoord = createAuroraImageCoordinator({ wake: () => canvasHandle.wake(), onError: options.onInitError });

    // BB.W-VIZ-SUITE (W-AURORA-WGPU) — the aurora fragment path is now substrate-
    // AGNOSTIC: the WebGPU-first `aurora.wgsl` primary OR the WebGL2 `aurora.frag`
    // fallback, picked ONCE by `createGpuSubstrate` (`navigator.gpu` feature-detect).
    // The handle shape + the park contract are the backend-agnostic substrate seam; the
    // ONLY difference is the start seam — WebGPU needs the async device-acquire
    // (`armAsync`), so the runtime's arm path awaits it (fire-and-forget with
    // `onInitError`). The WebGL2 fallback arms synchronously off `arm()`.
    type CanvasHandle = {
        arm: () => void;
        armAsync?: () => Promise<void>;
        suspend: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
        resume: (reason?: "tab-hidden" | "off-screen" | "manual") => void;
        wake: () => void;
        renderAt: (timeSec: number) => void;
        dispose: () => void;
        readonly reducedMotion: boolean;
    };

    // The inert handle the wedge catch returns under a software renderer: every
    // member is a no-op, so the placeholder stays the surface and the page never
    // arms a software-rastered GL layer (BB.W-AURORA-SWRASTER).
    const inertHandle: CanvasHandle = {
        arm: () => {},
        suspend: () => {},
        resume: () => {},
        wake: () => {},
        renderAt: () => {},
        dispose: () => {},
        reducedMotion: false,
    };

    const canvasHandle: CanvasHandle = wedgeBlocked
        ? inertHandle
        : createGpuSubstrate(canvas, {
        mode: options.mode === "capture" ? "capture" : "live",
        // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing-store measurement + sizing
        // (round(gBCR × dprPolicy)); every viz `resize` is upload-only.
        dprPolicy: resolveAuroraWashDpr,
        contextAttrs: {
            antialias: false,
            alpha: true,
            premultipliedAlpha: true,
            // Live canvases default false; capture/thumbnail runtimes opt in for
            // readPixels/toDataURL after a deterministic renderAt() draw.
            preserveDrawingBuffer,
        },
        // BB.W-VIZ-SUITE (W-AURORA-WGPU) — the WGSL primary path (`aurora.wgsl`). The
        // picker arms this when `navigator.gpu` is present; the closures below
        // (cursor/config/reduced-motion) are SHARED with the WebGL2 `setupGL` so the
        // loop is byte-identical across backends. `aurora.frag.ts` stays the
        // byte-untouched WebGL2 fallback.
        setupWGPU: createAuroraWGPUSetup({
            canvas,
            cursor,
            getConfig: () => config,
            getReducedMotion: () => canvasHandle.reducedMotion,
            // BC.W-VIZ-AURORA (T5) — the shared pointer field, FED tick() from the WGPU
            // frame callback (the SAME field instance the WebGL2 loop feeds — one source).
            pointerField,
            // BG.W-AUR-IMAGE-SOURCE — the image-source seam (no-op on a palette config).
            getDecodedImage: () => imageCoord.getDecodedImage(),
            registerImageUploader: (fn) => imageCoord.setImageUploader(fn),
        }),
        // Build the program + geometry + uniform cache on a fresh context. The
        // substrate calls this on arm() AND on every webglcontextrestored, so a
        // GPU context loss self-heals — the closures below close over the fresh
        // `gl`/program/seams each time.
        setupGL: (gl) => {
            // BG.W-AUR-IMAGE-SOURCE — the CONSTRUCTION-TIME program permutation: a separate
            // compiled image fragment program (NOT a runtime source-uniform branch).
            const useImageProgram = config.source === "image";
            const fragmentSrc = useImageProgram ? IMAGE_FRAGMENT_SRC : FRAGMENT_SRC;
            const {
                program: prog,
                vs,
                fs,
                uniforms,
                geometry,
            } = createGlProgram(gl, VERTEX_SRC, fragmentSrc);

            // The image texture (unit 0), armed via the leaf (the ONE shared primitive).
            const imageTeardown = useImageProgram
                ? armWebGL2ImageTexture(gl, prog, imageCoord)
                : null;

            // BG.W-VIZ-RESIZE-ADOPT — upload-only. The aurora decorative WASH backs at
            // the SUB-2× `resolveAuroraWashDpr` (1.5×) ceiling, threaded to the LEAF sizer
            // as the `dprPolicy` at the createGpuSubstrate call-site below (distinct from
            // the focal goo-blob's 2× — the heavily-blurred drift wash is visually
            // indistinguishable at 1.5×, quartering the per-composite raster). The leaf
            // measures the LAID-OUT box (gBCR + the bounded ancestor walk, never
            // clientWidth/300×150) and sizes the backing to round(gBCR × dprPolicy); the
            // closure only uploads the viewport. `aurora.frag` is byte-fenced.
            function resize(s?: BackingSize) {
                gl.viewport(0, 0, s?.w ?? canvas.width, s?.h ?? canvas.height);
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
                // BC.W-VIZ-AURORA (T5) — the shared pointer field, FED tick() from the
                // frame callback (the one-loop discipline; no own rAF).
                pointerField,
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

            // BG.W-VIZ-RESIZE-ADOPT — the first-paint layout-race defense (the
            // rAF-chained double-resize) is now OWNED by the leaf's `presize()` (it
            // measures + re-measures on a double-rAF for ALL consumers, sourced from the
            // ONE sizer), so the per-viz belt-and-suspenders is retired.

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
                    imageTeardown?.(); // BG.W-AUR-IMAGE-SOURCE — release the image texture
                    // The WEBGL_lose_context release is the substrate's job.
                },
            };
        },
    });

    function setCursor(x: number, y: number, strength: number = 0.8) {
        cursor.targetX = x;
        cursor.targetY = y;
        cursor.targetStrength = strength;
        // BC.W-VIZ-AURORA (T5) — feed the shared field the raw pointer target (the
        // POSITION write the velocity + acceleration derive from; PRM-gated inside
        // setPointer). The field's velocity/accel are advanced by tick() in the loop.
        pointerField.setPointer(x, y);
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
    //
    // BB.W-AURORA-SWRASTER — under the wedge catch `canvasHandle` is the inert
    // handle, so this `arm()` (and the returned `arm`/`renderAt`) are no-ops: the
    // eager / capture path falls cleanly to the placeholder, never the hang, and
    // never a thrown `onInitError` (a software-raster fall is not a violation).
    // BB.W-VIZ-SUITE (W-AURORA-WGPU) — the arm seam is now backend-aware. The WebGPU
    // path needs the async device-acquire (`armAsync`); the WebGL2 fallback arms
    // synchronously off `arm()`. `armRuntime()` calls `armAsync` when the picker
    // exposes it (the WebGPU backend) and routes a device-init failure to
    // `onInitError` (or rethrows on the microtask queue via the default the Vue
    // wrapper installs); otherwise the synchronous `arm()`.
    function armRuntime(): void {
        if (canvasHandle.armAsync) {
            void canvasHandle.armAsync().catch((err: unknown) => {
                options.onInitError?.(
                    err instanceof Error ? err : new Error(String(err)),
                );
            });
        } else {
            canvasHandle.arm();
        }
    }

    // BC.W-VIZ-AURORA (T2) — the device-resolved arm promise. A capture consumer
    // awaits THIS before the first `renderAt` so the WebGPU device is present (a
    // synchronous `renderAt` right after `createAurora(…,{mode:"capture"})` paints
    // a BLANK frame — the dead-preview defect). The WebGL2 fallback resolves
    // immediately; the inert (software-raster wedge) handle resolves immediately
    // too (a no-op renderAt is the placeholder, never a hang).
    function armRuntimeAsync(): Promise<void> {
        if (canvasHandle.armAsync) return canvasHandle.armAsync();
        canvasHandle.arm();
        return Promise.resolve();
    }

    // BG.W-AUR-IMAGE-SOURCE — kick the initial decode (no-op on a palette config).
    imageCoord.ensureDecoded(config);

    if (options.mode !== "capture" && shouldInitEagerly(options)) {
        armRuntime();
    }

    return {
        arm: () => armRuntime(),
        armAsync: () => armRuntimeAsync(),
        update: (cfg) => {
            // Pre-arm: stash the config so the next `setup` uploads the latest.
            // Post-arm: upload immediately. Either way the next drawn frame is
            // correct.
            config = cfg;
            setConfig?.(cfg);
            imageCoord.ensureDecoded(cfg); // BG.W-AUR-IMAGE-SOURCE — a `src` swap re-decodes
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
