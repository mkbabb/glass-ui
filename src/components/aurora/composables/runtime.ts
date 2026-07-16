/**
 * Aurora runtime over the shared WebGPU/WebGL2 substrate.
 *
 * This module composes four cohesive seams atop the substrate:
 *   - engine setup  — WebGPU or WebGL2 program resources
 *   - uniform bridges — reactive config translated to the selected engine
 *   - pointerField  — the shared `usePointerVelocityField` (the retired cursorModel's
 *                     successor, BI.W-FIELD-CORE): the mass-spring attractor + engagement
 *                     the `auroraCursorMapping` projects onto the `uCursor*` uniforms
 *   - frameLoop     — the per-frame draw + the render-demand gate
 *
 * It owns only Aurora-specific configuration, pointer state, frame work, and
 * imperative controls. Context/device acquisition, resize, suspension, reduced
 * motion, visibility, scheduling, recovery, and disposal belong to the substrate.
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
    type RendererStatus,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import { rendererFailure } from "../../../composables/glass/webgpu/rendererStatus";
import { isSoftwareWebGLRenderer } from "../constants/renderMode";
import type { AuroraConfig, AuroraInstance } from "../constants/presets";
import { createGlProgram } from "./glSetup";
import { createUniformBridge } from "./uniformBridge";
import { createFrameLoop, type AuroraCursorScalars } from "./frameLoop";
import { createAuroraWGPUSetup } from "./wgpuSetup";
import { usePointerVelocityField } from "../../../composables/motion/usePointerVelocityField";

export type AuroraRuntimeMode = "live" | "capture";

/**
 * The three independent reasons the frame loop may be suspended. Owned by the
 * shared lifecycle as a `Set<reason>`: the loop runs IFF the set is
 * empty and each reason is cleared ONLY by the source that set it. This makes
 * resume-while-still-suspended structurally unreachable — a `resume("tab-hidden")`
 * cannot lift an `"off-screen"` suspension.
 *
 * - `"tab-hidden"` — the substrate's `document.visibilitychange` owner.
 * - `"off-screen"` — the shared content-visibility owner.
 * - `"off-screen-io"` — the deferred pre-arm intersection owner.
 * - `"manual"` — the public `pause()`/`resume()` API (and capture-mode seed).
 */
export type SuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

/**
 * When expensive GPU initialization actually runs.
 *
 * - `"deferred"` (default) — `createAurora` constructs a cheap, un-armed instance
 *   and returns immediately; GPU work is invoked later via `instance.armAsync()`.
 *   The Vue wrapper `useAurora` schedules that acquisition past first paint on an idle
 *   tick, gated on canvas visibility — so the shader compile-link never lands on
 *   the consumer's first-paint critical path.
 * - `"eager"` — acquisition starts immediately. Capture / thumbnail-baking
 *   consumers then await `armAsync()` before `renderAt`. `mode: "capture"`
 *   forces eager regardless.
 */
export type AuroraInitStrategy = "eager" | "deferred";

export interface AuroraRuntimeOptions {
    mode?: AuroraRuntimeMode;
    preserveDrawingBuffer?: boolean;
    /**
     * When to run expensive GPU initialization. Defaults to `"deferred"`.
     * `mode: "capture"` forces `"eager"` (a capture runtime must be able to
     * `renderAt` synchronously). See {@link AuroraInitStrategy}.
     */
    initStrategy?: AuroraInitStrategy;
    /**
     * Optional attributed init-failure callback. Runtime status remains the
     * always-available failure surface; `Aurora.vue` additionally adapts Vue's
     * app error handler here when installed. `armAsync()` rejects so imperative
     * consumers can own failure directly.
     *
     * A direct runtime that cannot animate under software rasterization reports
     * that capability failure here and rejects `armAsync()`. `Aurora.vue` resolves
     * the same host to its explicit CSS surface before constructing the runtime.
     */
    onInitError?: (err: Error) => void;
    onRendererStatus?: (status: RendererStatus) => void;
    /**
     * BB.W-AURORA-SWRASTER — opt OUT of the runtime software-raster wedge catch.
     * Default `false`: `createAurora` recognizes a software renderer and surfaces
     * an attributed unavailable error rather than arming the page-wedging live GL
     * layer. `true` (the
     * named, recorded escape for a deterministic test that ACCEPTS the cost)
     * arms WebGL even under a detected software renderer. Mirrors the
     * `resolveRenderMode` escape of the same name — ONE consumer-facing flag,
     * threaded through both seams.
     */
    forceWebGLUnderSoftwareRaster?: boolean;
    /**
     * BI.W-E10-AURORA-ENTRANCE (value.js T-60) — the reveal-bloom CONSUMER DOOR.
     *
     * The one-shot cold-first-VISIBLE `filter`-bloom (`data-substrate-reveal` →
     * `@keyframes substrate-reveal-bloom`, viz-reveal.css). It defaults `false` for
     * the aurora: the aurora already materializes as the palette-derived GROUND
     * (Aurora.vue's `auroraFallbackGround` placeholder) with the live canvas
     * OPACITY cross-fading over it — a same-palette dissolve, the "defined bloom
     * choreography". Arming the `filter`-bloom ON TOP of that opacity cross-fade
     * was the T-60 gray stage: the bloom stamped at first-visible while the canvas
     * still sat at `opacity: 0`, so the visible arrival always opened INSIDE the
     * `brightness(0.54–0.83)` dim floor (a `brightness<1`/`saturate<1` veil over a
     * chromatic field — the condemned form). The door is the opt-out (default) AND
     * the arrival-sync seam: a consumer who wants the bloom passes `true` (the
     * keyframe is now palette-honest — brightness/saturate never dip below 1). The
     * palette-derived first paint is the floor either way (UF-E10, value.js co-signed).
     */
    revealBloom?: boolean;
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
 * The canvas-present contract is mode-owned, not engine-owned. A live Aurora covers its
 * stage, so both GPU backends present an opaque drawing buffer and the public pigment alpha
 * is applied once by CSS over the palette ground. Capture keeps the historical transparent,
 * premultiplied buffer so readback bytes retain their authored alpha.
 */
export function resolveAuroraPresentation(mode: AuroraRuntimeMode = "live") {
    const opaque = mode !== "capture";
    return {
        opaque,
        alphaMode: opaque ? "opaque" : "premultiplied",
        contextAlpha: !opaque,
    } as const;
}

const clampAlpha = (alpha: number): number => Math.min(1, Math.max(0, alpha));

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
    /** Drive the opt-in scroll-linked palette/breath phase in normalized 0..1 space. */
    setScrollProgress(progress: number): void;
    /** AW.W8.1 — the live reduced-motion state (the cursor listener early-outs on it). */
    readonly reducedMotion: boolean;
}

/** One medium-aware predicate shared by pointer writes and uniform projection. */
export function isAuroraPointerEnabled(config: AuroraConfig): boolean {
    return (
        config.interactivity?.swirl === true ||
        (config.medium !== "smooth" && config.interactivity?.light === true)
    );
}

const REDUCED_MOTION_TIME = 3.7;

/** One shader-time projection shared by the WebGPU and WebGL2 bridges. */
export function resolveAuroraRenderTime(
    config: AuroraConfig,
    elapsedSec: number,
    progress: number,
    reducedMotion: boolean,
): number {
    if (reducedMotion) return REDUCED_MOTION_TIME;
    if (config.interactivity?.scroll !== true) return elapsedSec;
    return elapsedSec + Math.min(1, Math.max(0, progress)) * config.breathPeriod;
}

export function createAurora(
    canvas: HTMLCanvasElement,
    initial: AuroraConfig,
    options: AuroraRuntimeOptions = {},
): AuroraRuntime {
    const preserveDrawingBuffer = shouldPreserveDrawingBuffer(options);
    const presentation = resolveAuroraPresentation(options.mode);
    const initialCanvasOpacity = canvas.style.opacity;

    const syncPresentationAlpha = (alpha: number): void => {
        if (presentation.opaque) canvas.style.opacity = String(clampAlpha(alpha));
    };
    syncPresentationAlpha(initial.alpha);

    // BB.W-AURORA-SWRASTER — THE WEDGE CATCH (the guard's second leg). A consumer
    // that bypasses `resolveRenderMode` (a direct `createAurora(canvas, cfg,
    // {mode:"capture"})` / `{initStrategy:"eager"}`) reaches the live GL layer
    // un-probed. We re-run the SAME software-raster predicate here (ONE detector,
    // shared from renderMode.ts — no second `getContext("webgl2")` is minted; this
    // composes the substrate's single probe): when a software renderer is detected
    // AND the escape is OFF, we NEVER create the WebGL canvas. The component owns
    // an explicit CSS render mode; direct runtime callers instead receive an
    // attributed failure and a rejecting `armAsync()` — never a fake-ready blank
    // canvas. The `forceWebGLUnderSoftwareRaster` escape opts back in.
    const wedgeBlocked =
        !options.forceWebGLUnderSoftwareRaster && isSoftwareWebGLRenderer();

    // ── Aurora-specific state — survives the cheap-construction → arm() split.
    // These hold cursor / config / motion intent the consumer may set BEFORE the
    // GL path arms. The substrate's `setup(gl)` folds them into the live program
    // (via `setConfig`); until then the imperative setters mutate them harmlessly
    // and `setup` picks up the latest values.
    let config: AuroraConfig = initial;
    let scrollProgress = 0;
    // AV.W7 G1 — the reduced-motion freeze is LIFTED into the `useWebGLCanvas`
    // substrate, which now OWNS + LIVE-MONITORS the query (a `matchMedia` `change`
    // listener that re-arms one static frame on un-reduce). Aurora reads the
    // substrate's live `reducedMotion` getter instead of an init-once local —
    // toggling reduced-motion at runtime now freezes/wakes without the duplicate
    // consumer-side listener `useAurora` used to install.
    // BI.W-FIELD-CORE — the shared viz-pointer-physics field IS the cursor now (the retired
    // `cursorModel.ts` is GONE). A light responsive tuning (the cursor should track snappily,
    // not lag like the heavy blob): the mass-spring attractor is the cursor position, the
    // engagement envelope drives the attraction strength (so the cursor-local luminance lean
    // reads on the `smooth` medium — the T-38 dead-swirl-axis fix), while burst and the named
    // amplitude fold into that same strength before either engine sees it. The field owns NO own rAF — it is FED `tick(deltaMs)` from
    // inside the EXISTING createCanvasLifecycle frame callback (the one-loop / offscreen-pause
    // discipline), and FREEZES under PRM (tick(0)). The pointer POSITION write is event-driven
    // (`setCursor` → `setPointer`, PRM-gated inside the field); velocity/accel are DERIVED in
    // tick — the ONE smoothing stage (no double-smooth).
    const pointerField = usePointerVelocityField({
        mass: 1,
        damping: 0.9,
        attractorResponse: 0.28,
        leadGain: 0.08,
        halfLifeMs: 110,
    });
    // The cursor strength CEILING (setCursor's strength arg) + the influence radius. The
    // engagement envelope scales the ceiling; the field-mapped strength = engagement·ceil.
    let cursorStrengthCeil = 0.8;
    let cursorRadius = 0.25;
    const getCursorScalars = (): AuroraCursorScalars => {
        const interactivity = config.interactivity;
        const enabled = isAuroraPointerEnabled(config);
        return {
            strength: enabled ? cursorStrengthCeil : 0,
            radius: cursorRadius,
            amplitude: enabled
                ? Math.min(1, Math.max(0, interactivity?.amplitude ?? 0.5))
                : 0,
        };
    };

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
        suspend: (reason?: SuspendReason) => void;
        resume: (reason?: SuspendReason) => void;
        wake: () => void;
        renderAt: (timeSec: number) => void;
        dispose: () => void;
        readonly reducedMotion: boolean;
    };

    const unavailableError = wedgeBlocked
        ? new Error("[Aurora] GPU animation is unavailable under software rasterization")
        : null;
    let unavailableReported = false;
    function reportUnavailable(): void {
        if (!unavailableError || unavailableReported) return;
        unavailableReported = true;
        options.onInitError?.(unavailableError);
    }

    // Direct runtime callers have no placeholder owner. Preserve the cheap handle
    // shape, but make readiness fail explicitly instead of resolving a blank canvas.
    const unavailableHandle: CanvasHandle = {
        arm: reportUnavailable,
        armAsync: () => {
            reportUnavailable();
            return Promise.reject(unavailableError);
        },
        suspend: () => {},
        resume: () => {},
        wake: () => {},
        renderAt: () => {},
        dispose: () => {},
        reducedMotion: false,
    };

    const canvasHandle: CanvasHandle = wedgeBlocked
        ? unavailableHandle
        : createGpuSubstrate(canvas, {
        mode: options.mode === "capture" ? "capture" : "live",
        alphaMode: presentation.alphaMode,
        // BG.W-VIZ-RESIZE-ADOPT — the leaf owns backing-store measurement + sizing
        // (round(gBCR × dprPolicy)); every viz `resize` is upload-only.
        dprPolicy: resolveAuroraWashDpr,
        // BI.W-E10-AURORA-ENTRANCE (value.js T-60) — the reveal-bloom door, DEFAULT
        // OFF for the aurora: the palette-derived ground + the canvas opacity
        // cross-fade IS the entrance (no `filter`-bloom veil over the chromatic
        // field). A consumer opts the filter-bloom back in via the door (pass a
        // truthy `revealBloom`); it defaults OFF here.
        revealBloom: options.revealBloom ?? false,
        contextAttrs: {
            antialias: false,
            alpha: presentation.contextAlpha,
            premultipliedAlpha: presentation.contextAlpha,
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
            opaquePresentation: presentation.opaque,
            getCursorScalars,
            getConfig: () => config,
            getReducedMotion: () => canvasHandle.reducedMotion,
            getRenderTime: (elapsedSec) =>
                resolveAuroraRenderTime(
                    config,
                    elapsedSec,
                    scrollProgress,
                    canvasHandle.reducedMotion,
                ),
            // BI.W-FIELD-CORE — the shared pointer field, FED tick() from the WGPU frame
            // callback (the SAME field instance the WebGL2 loop feeds — one source).
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

            const uploadConfig = createUniformBridge(
                gl,
                prog,
                uniforms,
                presentation.opaque,
            );
            const loop = createFrameLoop({
                gl,
                prog,
                uniforms,
                // BI.W-FIELD-CORE — the shared pointer field + the cursor scalars; the loop
                // maps the field readout onto the `uCursor*` uniforms (no CursorState).
                pointerField,
                getCursorScalars,
                getConfig: () => config,
                // Read the substrate's live reduced-motion state (G1).
                getReducedMotion: () => canvasHandle.reducedMotion,
                getRenderTime: (elapsedSec) =>
                    resolveAuroraRenderTime(
                        config,
                        elapsedSec,
                        scrollProgress,
                        canvasHandle.reducedMotion,
                    ),
            });

            // Live presentation owns a fully opaque drawing buffer; capture retains the
            // transparent premultiplied buffer its readback contract requires.
            gl.clearColor(0, 0, 0, presentation.opaque ? 1 : 0);
            gl.disable(gl.DEPTH_TEST);
            if (presentation.opaque) {
                gl.disable(gl.BLEND);
            } else {
                gl.enable(gl.BLEND);
                gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
            }

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
        onInitError: options.onInitError
            ? (error) => options.onInitError?.(error instanceof Error ? error : new Error(String(error)))
            : undefined,
        onStatus: options.onRendererStatus,
    });

    if (unavailableError) {
        options.onRendererStatus?.(
            rendererFailure("webgl2", "Software renderer", unavailableError),
        );
    }

    function setCursor(x: number, y: number, strength: number = 0.8) {
        if (!isAuroraPointerEnabled(config)) return;
        cursorStrengthCeil = strength;
        // BI.W-FIELD-CORE — feed the shared field the RAW pointer target ONCE (the POSITION
        // write the velocity/acceleration/attractor all derive from; PRM-gated INSIDE
        // setPointer — the write-path early-out lives in the field). The engagement envelope
        // ramps (setActive) so the attraction fades in/out smoothly; the field's
        // velocity/accel/attractor advance by tick() in the loop (the ONE smoothing stage).
        pointerField.setActive(true);
        pointerField.setPointer(x, y);
        // A pointer move re-introduces field easing — re-arm a parked loop.
        canvasHandle.wake();
    }
    function clearCursor() {
        // Disengage — the engagement envelope decays, the attractor relaxes to rest.
        pointerField.setActive(false);
        // The decay-to-rest still needs frames to animate out — re-arm.
        canvasHandle.wake();
    }
    function setCursorRadius(r: number) {
        cursorRadius = r;
        // Radius shift is visible iff the cursor is active; wake so the change is
        // drawn (the loop re-parks immediately if the cursor is at rest).
        canvasHandle.wake();
    }
    function setScrollProgress(progress: number) {
        const next = Math.min(1, Math.max(0, progress));
        if (next === scrollProgress) return;
        scrollProgress = next;
        if (config.interactivity?.scroll === true && !canvasHandle.reducedMotion) {
            canvasHandle.wake();
        }
    }
    // The expensive path starts now (eager / capture) or later through the
    // consumer (`useAurora` schedules it past first paint). The actual ready /
    // failure boundary is the idempotent `armAsync()` promise below.
    //
    // Under the software-raster catch, `armAsync()` rejects the attributed
    // capability error and the callback is notified once. No fake-ready blank
    // canvas can pass this boundary.
    // BB.W-VIZ-SUITE (W-AURORA-WGPU) — the arm seam is now backend-aware. The WebGPU
    // path needs the async device-acquire (`armAsync`); the same promise also
    // covers the synchronous WebGL2 fallback and carries its attributed failure.
    function armRuntime(): void {
        if (canvasHandle.armAsync) {
            // The substrate owns status + the installed failure callback. The eager
            // starter consumes the rejection; imperative callers use `armAsync()` to
            // observe it directly without a duplicate notification.
            void canvasHandle.armAsync().catch(() => undefined);
        } else {
            canvasHandle.arm();
        }
    }

    // BC.W-VIZ-AURORA (T2) — the device-resolved arm promise. A capture consumer
    // awaits THIS before the first `renderAt` so the WebGPU device is present (a
    // synchronous `renderAt` right after `createAurora(…,{mode:"capture"})` paints
    // a BLANK frame — the dead-preview defect). The WebGL2 fallback resolves
    // immediately; the software-raster handle rejects explicitly.
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
            syncPresentationAlpha(cfg.alpha);
            if (!isAuroraPointerEnabled(cfg)) {
                pointerField.setActive(false);
            }
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
        setScrollProgress,
        // BI.W-FIELD-CORE — the live reduced-motion read (the cursor pointermove listener
        // early-outs on it; the field's setPointer is PRM-gated too).
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
        dispose: () => {
            canvasHandle.dispose();
            if (presentation.opaque) canvas.style.opacity = initialCanvasOpacity;
        },
    };
}
