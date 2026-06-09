// The backend-AGNOSTIC canvas lifecycle core.
//
// Carved out of `useWebGLCanvas` (AU.W6) so a thin context wrapper shares the EXACT
// same demand-driven scheduling + offscreen-park + PRM-freeze machinery without a
// forked second copy (the AV.W1 two-copy class). The ONLY backend-specific concern is
// acquiring the drawing context + building the per-frame hooks; everything else — the
// three-reason suspend Set, the rAF tick/wake gate, the document-visibility owner, the
// content-visibility offscreen-park, and the live `prefers-reduced-motion` re-monitor
// — is API-shaped and lives HERE once.
//
// `useWebGLCanvas` (WebGL2) is the thin wrapper: it builds its own context in
// `buildContext()` and hands the lifecycle core the frame hooks; the core owns the
// schedule. A parked rAF (offscreen / tab-hidden / PRM-reduce / paused) attaches ZERO
// frames (proof:offscreen-pause).
//
// The suspend reasons are a `Set<reason>`: the loop runs IFF the set is empty, each
// reason cleared ONLY by its owner (so a tab-show can never lift an off-screen
// suspension). Under reduced-motion the loop draws ONE static frame then parks (the
// reschedule is gated, never the suspend set, so the on-screen reduced surface never
// blanks). This is the JS gate a CSS reset cannot reach.

// AX.W16 F6 — the offscreen-park is ORed across TWO independent detectors writing
// DISTINCT reason keys, so the "one writer per reason" invariant is literally true:
//   - "off-screen"    — the substrate's `contentvisibilityautostatechange` path
//                       (content-visibility:auto, the headline lever).
//   - "off-screen-io" — the consumer's IntersectionObserver `rootMargin` fallback
//                       (the engine-without-content-visibility path).
// Both gate the same empty-`Set` `isRunning()` check, so the loop runs ONLY when BOTH
// agree the surface is visible. Before this split both wrote "off-screen", so an IO
// `resume` could lift a legitimately-skipped CV suspend (the latent F6 breach).
export type CanvasSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

/** The per-frame hooks a backend's `buildContext` returns to the lifecycle core. */
export interface CanvasFrameHooks {
    /** Draw one frame at `timeSec`. */
    frame: (timeSec: number) => void;
    /** Demand-gate: is there live motion to render next frame? `false` → park. */
    shouldContinue: () => boolean;
    /** Frame time from elapsed seconds — the consumer owns frozen/reduced-motion. */
    time?: (elapsedSec: number) => number;
    /** Release backend resources (program/buffers/pipelines). */
    teardown?: () => void;
}

export interface CanvasLifecycleOptions {
    canvas: HTMLCanvasElement;
    mode?: "live" | "capture";
    respectReducedMotion?: boolean;
    /**
     * Acquire the backend context + build the per-frame hooks. Called on `arm()` AND
     * on a backend context-restore. Throws on backend-unavailable / setup failure.
     */
    buildContext: () => CanvasFrameHooks;
    /** Resize the backing store + viewport. The consumer owns its DPR policy. */
    resize: () => void;
    /**
     * Bind/unbind backend-specific context-loss/restore listeners. `rebuild` re-runs
     * `buildContext` on a fresh context + resumes the loop (the self-heal); the backend
     * calls `markContextLost` on loss so the lifecycle NULLS its hooks + cancels the
     * rAF (the loop parks while the surface is blank — no frame attaches to a dead gl).
     */
    bindContextEvents?: (rebuild: () => void, markContextLost: () => void) => void;
    unbindContextEvents?: () => void;
}

export interface CanvasLifecycleHandle {
    arm: () => void;
    suspend: (reason?: CanvasSuspendReason) => void;
    resume: (reason?: CanvasSuspendReason) => void;
    wake: () => void;
    renderAt: (timeSec: number) => void;
    dispose: () => void;
    readonly armed: boolean;
    readonly disposed: boolean;
    readonly running: boolean;
    readonly reducedMotion: boolean;
}

interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

export function createCanvasLifecycle(
    options: CanvasLifecycleOptions,
): CanvasLifecycleHandle {
    const { canvas, buildContext, resize } = options;
    const respectReducedMotion =
        options.respectReducedMotion ?? options.mode !== "capture";

    // ── demand-driven scheduling ────────────────────────────────────────────
    const suspended = new Set<CanvasSuspendReason>();
    if (options.mode === "capture") suspended.add("manual");
    const isRunning = (): boolean => suspended.size === 0;

    let raf = 0;
    let startTime = typeof performance !== "undefined" ? performance.now() : 0;
    let hooks: CanvasFrameHooks | null = null;
    let armed = false;
    let disposed = false;

    // ── reduced-motion (live-monitored — gates the RESCHEDULE not the suspend set).
    const hasWindow = typeof window !== "undefined";
    const reducedMq =
        respectReducedMotion && hasWindow && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)")
            : null;
    let reducedMotion = reducedMq?.matches ?? false;

    function tick(): void {
        if (!isRunning() || !hooks) return;
        const elapsed = (performance.now() - startTime) / 1000;
        const t = hooks.time ? hooks.time(elapsed) : elapsed;
        hooks.frame(t);
        raf =
            !reducedMotion && hooks.shouldContinue()
                ? requestAnimationFrame(tick)
                : 0;
    }

    function wake(): void {
        if (armed && isRunning() && !raf && hooks) raf = requestAnimationFrame(tick);
    }

    function onReducedMotionChange(): void {
        const next = reducedMq?.matches ?? false;
        if (next === reducedMotion) return;
        reducedMotion = next;
        if (!next) startTime = performance.now();
        wake();
    }
    reducedMq?.addEventListener("change", onReducedMotionChange);

    function suspend(reason: CanvasSuspendReason = "manual"): void {
        const wasRunning = isRunning();
        suspended.add(reason);
        if (wasRunning && !isRunning()) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
    }

    function resume(reason: CanvasSuspendReason = "manual"): void {
        const wasSuspended = !isRunning();
        suspended.delete(reason);
        if (wasSuspended && isRunning() && armed && hooks) {
            startTime = performance.now() - 1000;
            // Re-measure on wake: a surface that was content-skipped (or scrolled
            // offscreen) may have changed box while parked, and the ResizeObserver
            // does not fire for a skipped subtree. Without this the buffer keeps the
            // size it last had — a stale/zero buffer paints as a black band over the
            // re-shown box. resize() is idempotent (no-op when the buffer already
            // matches), so a same-size wake costs nothing.
            resize();
            tick();
        }
    }

    // ── tab-visibility owner (ONE writer of `tab-hidden`) ────────────────────
    const hasDocument = typeof document !== "undefined";
    function onVisibilityChange(): void {
        if (document.hidden) suspend("tab-hidden");
        else resume("tab-hidden");
    }
    if (hasDocument) document.addEventListener("visibilitychange", onVisibilityChange);
    if (hasDocument && document.hidden) suspended.add("tab-hidden");

    // ── content-visibility offscreen-park (the headline lever) ────────────────
    let cvHost: HTMLElement | null = null;
    function onContentVisibilityAutoStateChange(e: Event): void {
        const skipped = (e as ContentVisibilityAutoStateChangeEvent).skipped;
        if (skipped) suspend("off-screen");
        else resume("off-screen");
    }
    function bindContentVisibility(): void {
        if (cvHost) return;
        const host = canvas.parentElement;
        if (!host) return;
        cvHost = host;
        host.addEventListener(
            "contentvisibilityautostatechange",
            onContentVisibilityAutoStateChange as EventListener,
        );
    }
    function unbindContentVisibility(): void {
        cvHost?.removeEventListener(
            "contentvisibilityautostatechange",
            onContentVisibilityAutoStateChange as EventListener,
        );
        cvHost = null;
    }

    function build(): void {
        hooks = buildContext();
        resize();
    }

    function arm(): void {
        if (armed || disposed) return;
        options.bindContextEvents?.(
            // rebuild (the self-heal on context restore): re-acquire the context +
            // rebuild the program/geometry, then resume the loop.
            () => {
                if (disposed) return;
                build();
                if (isRunning()) wake();
            },
            // markContextLost: the surface is blank — NULL the hooks + cancel the rAF
            // so the loop parks (no frame attaches to a dead context) until the restore
            // rebuilds. The backend has already released its gl.
            () => {
                hooks = null;
                cancelAnimationFrame(raf);
                raf = 0;
            },
        );
        build();
        bindContentVisibility();
        armed = true;
        startTime = performance.now();
        if (isRunning()) raf = requestAnimationFrame(tick);
    }

    function renderAt(timeSec: number): void {
        if (!armed) arm();
        hooks?.frame(timeSec);
    }

    function dispose(): void {
        disposed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        if (hasDocument) document.removeEventListener("visibilitychange", onVisibilityChange);
        reducedMq?.removeEventListener("change", onReducedMotionChange);
        unbindContentVisibility();
        options.unbindContextEvents?.();
        hooks?.teardown?.();
        hooks = null;
        suspended.clear();
    }

    if (options.mode === "capture") arm();

    return {
        arm,
        suspend,
        resume,
        wake,
        renderAt,
        dispose,
        get armed() {
            return armed;
        },
        get disposed() {
            return disposed;
        },
        get running() {
            return isRunning();
        },
        get reducedMotion() {
            return reducedMotion;
        },
    };
}
