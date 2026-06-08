// AU.W6 / AW.W7b — `useWebGLCanvas`: the WebGL2 backend over the shared
// `createCanvasLifecycle` core. Aurora AND the AU.W7 goo-blob compose it.
//
// AW.W7b carved the backend-AGNOSTIC lifecycle (the three-reason suspend Set, the
// rAF tick/wake demand gate, the document-visibility owner, the content-visibility
// offscreen-park, and the live `prefers-reduced-motion` re-monitor) into
// `createCanvasLifecycle.ts` so the WebGPU sibling `createGPUCanvas` shares the EXACT
// same machinery — no forked second copy. This module is now the WebGL2 BACKEND: it
// owns ONLY the `getContext("webgl2")` acquisition, the `webglcontextlost`/`restored`
// robustness, the `ResizeObserver`, and the consumer-`setup`/`frame`/`resize`/`time`
// hook seam (C6 must-fix #4 — the substrate must NOT bake aurora's quad/DPR/uniforms;
// those are threaded through the consumer callbacks). The schedule lives in the core.
//
//   - CONTEXT LIFECYCLE — create the `webgl2` context with the consumer's attrs, AND
//     the `webglcontextlost`/`webglcontextrestored` pair: on restore it re-creates
//     the program via the consumer's `setup(gl)` and re-arms, so a GPU context loss
//     self-heals instead of going permanently blank.
//   - DEMAND-DRIVEN SCHEDULING + OFFSCREEN RAF-PARK + REDUCED-MOTION FREEZE — owned
//     by `createCanvasLifecycle` (the lifted core), shared with `createGPUCanvas`. The
//     three suspend reasons (`tab-hidden`/`off-screen`/`manual`) gate the SAME
//     `isRunning()` set; a parked rAF attaches zero frames; under reduced-motion the
//     loop draws ONE static frame then parks. The IntersectionObserver `rootMargin`
//     fallback is wired by the consumer via `useIntersectionPause` (it drives
//     `suspend("off-screen")`).
//   - RESIZE — a `ResizeObserver` that calls the consumer's `resize`.
//
// Lazy-arm + capture: `arm()` runs the expensive init (context + `setup`); it is
// idempotent and a no-op after `dispose()`. `mode:"capture"` pre-seeds the
// `manual` suspension so the loop never auto-runs (a capture consumer draws via
// `renderAt`). Throws on WebGL2-unavailable / `setup` failure — the consumer's
// error policy (eager throw vs deferred surface) lives in its wrapper.

import {
    createCanvasLifecycle,
    type CanvasFrameHooks,
} from "./createCanvasLifecycle";

// Lockstep with createCanvasLifecycle's CanvasSuspendReason (AX.W16 F6 adds
// "off-screen-io" — the IntersectionObserver fallback's OWN reason key, distinct from
// the content-visibility path's "off-screen").
export type WebGLSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

/** The per-frame hooks a consumer's `setup(gl)` returns. */
export interface WebGLCanvasFrame {
    /** Draw one frame at `timeSec`. The consumer uploads its uniforms + draws. */
    frame: (timeSec: number) => void;
    /** Demand-gate: is there live motion to render next frame? `false` → park. */
    shouldContinue: () => boolean;
    /** Size the canvas + set the viewport. The consumer owns its DPR policy. */
    resize: () => void;
    /** Frame time from elapsed seconds — the consumer owns frozen/reduced-motion. */
    time?: (elapsedSec: number) => number;
    /** Delete GL resources (program/buffers/VAO). Runs on dispose + before a restore re-setup. */
    teardown?: () => void;
}

export interface WebGLCanvasOptions {
    /** `getContext("webgl2", …)` attributes (the consumer's — e.g. premultiplied alpha). */
    contextAttrs?: WebGLContextAttributes;
    /** `"capture"` pre-seeds the `manual` suspension (renderAt-only). Default `"live"`. */
    mode?: "live" | "capture";
    /**
     * Honor `prefers-reduced-motion: reduce` by painting ONE static frame then
     * parking the loop. The shared lifecycle core live-monitors the query via a
     * `matchMedia` `change` listener and re-arms (one static frame) on un-reduce.
     * Default `true` for live mode, `false` for capture mode (a capture runtime
     * draws deterministic frames via `renderAt`, never the live loop). A consumer
     * reads the live value via `handle.reducedMotion` (e.g. aurora's frozen-t).
     */
    respectReducedMotion?: boolean;
    /**
     * Build the program + geometry on a fresh context. Called on `arm()` AND on
     * every `webglcontextrestored`. Returns the per-frame hooks.
     */
    setup: (gl: WebGL2RenderingContext) => WebGLCanvasFrame;
}

export interface WebGLCanvasHandle {
    /** Run the expensive init (context + `setup` + arm the loop). Idempotent; no-op post-dispose. */
    arm: () => void;
    suspend: (reason?: WebGLSuspendReason) => void;
    resume: (reason?: WebGLSuspendReason) => void;
    /** Re-arm a parked loop (a setter that re-introduced motion calls this). */
    wake: () => void;
    /** Draw one frame at `timeSec` out-of-loop (capture / thumbnail). */
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    /** The live context (null before arm / after dispose / mid-loss). */
    readonly gl: WebGL2RenderingContext | null;
    /**
     * The live `prefers-reduced-motion: reduce` state. The shared lifecycle core
     * owns + re-monitors it; consumers read it (e.g. aurora freezes its frame time
     * at the authored offset while this is `true`). `false` when
     * `respectReducedMotion` is off.
     */
    readonly reducedMotion: boolean;
}

export function createWebGLCanvas(
    canvas: HTMLCanvasElement,
    options: WebGLCanvasOptions,
): WebGLCanvasHandle {
    const { setup, contextAttrs } = options;

    let gl: WebGL2RenderingContext | null = null;
    let ro: ResizeObserver | null = null;
    let frameHooks: WebGLCanvasFrame | null = null;

    // ── the WebGL2 BACKEND seam — the one backend-specific concern the agnostic
    // lifecycle core threads through `buildContext`. The `getContext("webgl2")`
    // acquisition + the consumer `setup(gl)` live here; the schedule lives in the core.
    function buildContext(): CanvasFrameHooks {
        const ctx = canvas.getContext("webgl2", contextAttrs ?? undefined);
        if (!ctx) throw new Error("[useWebGLCanvas] WebGL2 unavailable");
        gl = ctx;
        frameHooks = setup(gl);
        if (!ro) {
            ro = new ResizeObserver(() => frameHooks?.resize());
            ro.observe(canvas);
        }
        return {
            frame: frameHooks.frame,
            shouldContinue: frameHooks.shouldContinue,
            time: frameHooks.time,
            teardown: () => {
                frameHooks?.teardown?.();
                // Force context release under the per-page WebGL-context cap (~8 in Chromium).
                gl?.getExtension("WEBGL_lose_context")?.loseContext();
                ro?.disconnect();
                ro = null;
                gl = null;
                frameHooks = null;
            },
        };
    }

    // ── context-loss/restore robustness (the genuinely-absent piece, AU.W6 §1).
    let onContextRestored: (() => void) | null = null;
    let markContextLost: (() => void) | null = null;
    function onContextLost(e: Event): void {
        e.preventDefault(); // REQUIRED so `webglcontextrestored` can fire
        gl = null;
        frameHooks = null;
        // Tell the lifecycle the surface is blank — it nulls its hooks + parks the rAF
        // (no frame attaches to a dead context) until the restore rebuilds.
        markContextLost?.();
    }

    const lifecycle = createCanvasLifecycle({
        canvas,
        mode: options.mode,
        respectReducedMotion: options.respectReducedMotion,
        buildContext,
        resize: () => frameHooks?.resize(),
        // Bind the WebGL-specific context-loss/restore pair; on `webglcontextrestored`
        // the core re-runs buildContext (re-creating the program on the fresh context)
        // + re-arms — a GPU context loss self-heals instead of going permanently blank.
        bindContextEvents: (rebuild, markLost) => {
            onContextRestored = rebuild;
            markContextLost = markLost;
            canvas.addEventListener("webglcontextlost", onContextLost as EventListener, false);
            canvas.addEventListener(
                "webglcontextrestored",
                onContextRestored as EventListener,
                false,
            );
        },
        unbindContextEvents: () => {
            canvas.removeEventListener("webglcontextlost", onContextLost as EventListener, false);
            if (onContextRestored) {
                canvas.removeEventListener(
                    "webglcontextrestored",
                    onContextRestored as EventListener,
                    false,
                );
            }
        },
    });

    return {
        arm: lifecycle.arm,
        suspend: lifecycle.suspend,
        resume: lifecycle.resume,
        wake: lifecycle.wake,
        renderAt: lifecycle.renderAt,
        dispose: lifecycle.dispose,
        get gl() {
            return gl;
        },
        get reducedMotion() {
            return lifecycle.reducedMotion;
        },
    };
}
