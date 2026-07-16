/**
 * Aurora runtime over the shared WebGPU/WebGL2 substrate.
 *
 * This module composes four cohesive seams atop the substrate:
 *   - engine setup  — WebGPU or WebGL2 program resources
 *   - uniform bridges — reactive config translated to the selected engine
 *   - pointerField  — shared `usePointerVelocityField`: mass-spring attraction and
 *                     engagement projected by `auroraCursorMapping` onto `uCursor*`
 *   - frameLoop     — the per-frame draw + the render-demand gate
 *
 * It owns only Aurora-specific configuration, pointer state, frame work, and
 * imperative controls. Context/device acquisition, resize, suspension, reduced
 * motion, visibility, scheduling, recovery, and disposal belong to the substrate.
 *
 * Y-origin convention: config authoring is CSS-top-origin (0 = top). The seams
 * flip Y at the uniform boundary (`flipY` in uniformBridge/frameLoop).
 */

import { resolveAuroraWashDpr } from "../constants/budget";
import { createAuroraImageCoordinator } from "./auroraImageSource";
import {
    createGpuSubstrate,
    type GpuSubstrateHandle,
    type RendererStatus,
} from "../../../composables/glass/webgpu/useGpuSubstrate";
import { rendererFailure } from "../../../composables/glass/webgpu/rendererStatus";
import { isSoftwareWebGLRenderer } from "../constants/renderMode";
import type { AuroraConfig, AuroraInstance } from "../constants/presets";
import { createAuroraGLSetup } from "./glSetup";
import type { AuroraCursorScalars } from "./frameLoop";
import { createAuroraWGPUSetup } from "./wgpuSetup";
import { usePointerVelocityField } from "../../../composables/motion/pointer/usePointerVelocityField";

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
 * - `"eager"` — acquisition starts immediately. Capture, thumbnail-baking
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
     * Opt out of the runtime software-raster wedge catch.
     * Default `false`: `createAurora` recognizes a software renderer and surfaces
     * an attributed unavailable error rather than arming the page-wedging live GL
     * layer. `true` is the named escape for a deterministic test that accepts the cost and
     * arms WebGL even under a detected software renderer. Mirrors the
     * `resolveRenderMode` escape of the same name — ONE consumer-facing flag,
     * threaded through both seams.
     */
    forceWebGLUnderSoftwareRaster?: boolean;
    /**
     * Reveal-bloom consumer door.
     *
     * The one-shot cold-first-VISIBLE `filter`-bloom (`data-substrate-reveal` →
     * `@keyframes substrate-reveal-bloom`, viz-reveal.css). It defaults `false` for
     * the aurora: the aurora already materializes as the palette-derived GROUND
     * (Aurora.vue's `auroraFallbackGround` placeholder) with the live canvas
     * OPACITY cross-fading over it — a same-palette dissolve, the "defined bloom
     * choreography". Arming the `filter`-bloom ON TOP of that opacity cross-fade
     * was the gray stage: the bloom stamped at first-visible while the canvas
     * still sat at `opacity: 0`, so the visible arrival opened inside the
     * `brightness(0.54–0.83)` dim floor. The door is the opt-out (default) and
     * the arrival-sync seam: a consumer who wants the bloom passes `true` (the
     * keyframe is now palette-honest — brightness/saturate never dip below 1). The
     * palette-derived first paint is the floor either way.
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
     * Device-resolved arm promise. On the WebGPU
     * backend `renderAt`/`arm` are NO-OPS until `armAsync()` resolves the async
     * adapter→device→configure→setup prelude (`useGpuSubstrate.armAsync` tries
     * WebGPU then falls to the WebGL2 net). A CAPTURE consumer (`renderAt(t)` +
     * `toDataURL`) MUST `await armAsync()` before the first `renderAt` — the
     * synchronous `arm()` cannot guarantee the WebGPU device is present, so a
     * synchronous `renderAt` right after `createAurora(…,{mode:"capture"})` paints
     * a blank frame. Resolves once the backend is armed;
     * the WebGL2 fallback resolves immediately. Idempotent + safe post-dispose.
     */
    armAsync(): Promise<void>;
    /** Drive the opt-in scroll-linked palette/breath phase in normalized 0..1 space. */
    setScrollProgress(progress: number): void;
    /** Live reduced-motion state; the cursor listener early-outs on it. */
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

    // THE WEDGE CATCH (the guard's second leg). A consumer
    // that bypasses `resolveRenderMode` (a direct `createAurora(canvas, cfg,
    // {mode:"capture"})`, `{initStrategy:"eager"}`) reaches the live GL layer
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
    // These hold cursor, config, motion intent the consumer may set BEFORE the
    // GL path arms. The substrate's `setup(gl)` folds them into the live program
    // (via `setConfig`); until then the imperative setters mutate them harmlessly
    // and `setup` picks up the latest values.
    let config: AuroraConfig = initial;
    let scrollProgress = 0;
    // The substrate owns and live-monitors reduced motion. Aurora reads its live
    // getter so runtime preference changes freeze or wake the surface immediately.
    // The shared pointer-physics field is the cursor. Its light mass follows more
    // quickly than Blob. The engagement envelope scales attraction; burst and the
    // named amplitude fold into that same strength before either engine sees it.
    // `createCanvasLifecycle` feeds the field from its sole frame callback and
    // pauses it under reduced motion. Position writes are event-driven; velocity
    // and acceleration are derived once in `tick`.
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

    // the `source:"image"` decode/upload coordination leaf (`wake`
    // is deferred over `canvasHandle` below, only fired post-construction).
    const imageCoord = createAuroraImageCoordinator({ wake: () => canvasHandle.wake(), onError: options.onInitError });

    // the aurora fragment path is now substrate-
    // AGNOSTIC: the WebGPU-first `aurora.wgsl` primary OR the WebGL2 `aurora.frag`
    // fallback, picked ONCE by `createGpuSubstrate` (`navigator.gpu` feature-detect).
    // The total substrate handle is the one backend-agnostic lifecycle contract for
    // both normal and unavailable paths.

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
    const unavailableHandle: GpuSubstrateHandle = {
        backend: "webgl2",
        arm: reportUnavailable,
        armAsync: () => {
            reportUnavailable();
            return Promise.reject(unavailableError);
        },
        presize: () => {},
        suspend: () => {},
        resume: () => {},
        wake: () => {},
        renderAt: () => {},
        dispose: () => {},
        reducedMotion: false,
    };

    const canvasHandle: GpuSubstrateHandle = wedgeBlocked
        ? unavailableHandle
        : createGpuSubstrate(canvas, {
        mode: options.mode === "capture" ? "capture" : "live",
        alphaMode: presentation.alphaMode,
        // the leaf owns backing-store measurement + sizing
        // (round(gBCR × dprPolicy)); every viz `resize` is upload-only.
        dprPolicy: resolveAuroraWashDpr,
        // Reveal bloom stays off for Aurora: the palette-derived ground + the canvas opacity
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
        // the WGSL primary path (`aurora.wgsl`). The
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
            // the shared pointer field, FED tick() from the WGPU frame
            // callback (the SAME field instance the WebGL2 loop feeds — one source).
            pointerField,
            // the image-source seam (no-op on a palette config).
            getDecodedImage: () => imageCoord.getDecodedImage(),
            registerImageUploader: (fn) => imageCoord.setImageUploader(fn),
        }),
        setupGL: createAuroraGLSetup({
            opaquePresentation: presentation.opaque,
            getConfig: () => config,
            getReducedMotion: () => canvasHandle.reducedMotion,
            getRenderTime: (elapsedSec) =>
                resolveAuroraRenderTime(
                    config,
                    elapsedSec,
                    scrollProgress,
                    canvasHandle.reducedMotion,
                ),
            getCursorScalars,
            pointerField,
            imageCoordinator: imageCoord,
            registerConfigUploader: (upload) => {
                setConfig = upload;
            },
        }),
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
        // feed the shared field the RAW pointer target ONCE (the POSITION
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
    // The expensive path starts now (eager/capture) or later through the
    // consumer (`useAurora` schedules it past first paint). The idempotent
    // `armAsync()` promise is the readiness and failure boundary.
    //
    // Under the software-raster catch, `armAsync()` rejects the attributed
    // capability error and the callback is notified once. No fake-ready blank
    // canvas can pass this boundary.
    // The arm seam is backend-aware. The WebGPU
    // path needs the async device-acquire (`armAsync`); the same promise also
    // covers the synchronous WebGL2 fallback and carries its attributed failure.
    function armRuntime(): void {
        // The substrate owns status + the installed failure callback. The eager
        // starter consumes the rejection; imperative callers observe it directly.
        void canvasHandle.armAsync().catch(() => undefined);
    }

    // The device-resolved arm promise. A capture consumer
    // awaits THIS before the first `renderAt` so the WebGPU device is present (a
    // synchronous `renderAt` right after `createAurora(…,{mode:"capture"})` paints
    // a BLANK frame — the dead-preview defect). The WebGL2 fallback resolves
    // immediately; the software-raster handle rejects explicitly.
    function armRuntimeAsync(): Promise<void> {
        return canvasHandle.armAsync();
    }

    // kick the initial decode (no-op on a palette config).
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
            imageCoord.ensureDecoded(cfg); //  — a `src` swap re-decodes
            // A config change may raise a drift uniform (slider drag) — re-arm a
            // parked loop so the new motion is rendered. wake() re-parks
            // immediately if the new config is still steady-state.
            canvasHandle.wake();
        },
        setCursor,
        clearCursor,
        setCursorRadius,
        setScrollProgress,
        // the live reduced-motion read (the cursor pointermove listener
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
