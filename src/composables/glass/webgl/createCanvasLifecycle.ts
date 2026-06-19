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
    /**
     * BC.W-SAFARI-WEBGL — the circuit-breaker has tripped: the surface lost-and-restored
     * its context more than N times within T ms (a real eviction storm), so the lifecycle
     * is HOLDING the parked state without re-arming (no throw). Resets once the loss window
     * passes quiet; a healthy single loss never trips it.
     */
    readonly contextHeld: boolean;
}

interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

// ── BC.W-SAFARI-WEBGL — the context-loss circuit-breaker (the §H Safari flash kill).
//
// The WebGL self-heal (re-run buildContext on `webglcontextrestored`) is correct for a
// single GPU-TDR loss but STORMS on WebKit when the per-page context cap is overrun: an
// eviction fires `webglcontextlost` → the heal re-creates a context → the new context
// evicts another → its loss fires → re-heal → … = the rapidly-flashing re-arm loop the
// user reports ("rapidly FLASHES the screen"). The breaker lives ONCE here (the shared
// leaf — W-CANVAS-UNIFY single-source) so all THREE backends inherit it: WebGL2 + Canvas2D
// + the WebGPU `device.lost` self-heal (a Metal TDR storm is bounded too).
//
// Two coordinated bounds:
//   - DEBOUNCE the restore: a `restored` does NOT rebuild synchronously inside the event;
//     it schedules ONE rebuild on a short window, coalescing a burst of lost/restored
//     cycles into a SINGLE rebuild per settle. A loss arriving inside the window CANCELS
//     the pending rebuild (the context is gone again — don't waste it).
//   - CIRCUIT-BREAK the retries: a sliding window counts lost→restored cycles; once the
//     surface loses-and-restores more than N=3 times within T=2000ms (a real eviction
//     storm, not a one-off TDR) the substrate STOPS re-arming and HOLDS the parked state
//     WITHOUT throwing (the aurora-swraster inert-handle precedent — a recognized
//     "this host can't hold a live context right now" decision, not a contract violation).
//     The breaker RESETS once the window passes quiet, so a later genuine single loss
//     self-heals normally.
//
// A genuine single loss STILL self-heals (the present correct behavior, KEPT) — the
// breaker fires ONLY on the pathological storm. These pinned numbers are SAFETY floors:
// a healthy single GPU-TDR loss re-heals on the first cycle and never trips the breaker.
export const N_RESTORE_STORM = 3;
export const T_RESTORE_STORM_MS = 2000;
export const RESTORE_DEBOUNCE_MS = 100;

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

    // ── BC.W-SAFARI-WEBGL — the circuit-breaker state (the §H storm bound). The sliding
    // window of loss timestamps + the debounce timer + the tripped flag. A `markContextLost`
    // records a loss; a `rebuild` (the restore) is debounced + breaker-gated. Once tripped
    // the surface holds parked (no throw) until the window passes quiet.
    let lossTimestamps: number[] = [];
    let restoreTimer: ReturnType<typeof setTimeout> | 0 = 0;
    let breakerTripped = false;
    const nowMs = (): number =>
        typeof performance !== "undefined" ? performance.now() : Date.now();

    function clearRestoreTimer(): void {
        if (restoreTimer) {
            clearTimeout(restoreTimer);
            restoreTimer = 0;
        }
    }

    function arm(): void {
        if (armed || disposed) return;
        options.bindContextEvents?.(
            // rebuild (the self-heal on context restore): DEBOUNCED + breaker-gated. A
            // `restored` schedules ONE rebuild on a short window (coalescing a burst into a
            // single rebuild per settle); a loss arriving inside the window cancels it. Once
            // the breaker has tripped (N losses in T) the rebuild is SUPPRESSED — the surface
            // holds the parked state WITHOUT throwing (a recognized "can't hold a live
            // context" hold, not a contract violation).
            () => {
                if (disposed || breakerTripped) return;
                clearRestoreTimer();
                restoreTimer = setTimeout(() => {
                    restoreTimer = 0;
                    if (disposed || breakerTripped) return;
                    build();
                    if (isRunning()) wake();
                }, RESTORE_DEBOUNCE_MS);
            },
            // markContextLost: the surface is blank — NULL the hooks + cancel the rAF so the
            // loop parks (no frame attaches to a dead context) until the restore rebuilds. The
            // backend has already released its gl. The loss is COUNTED in the sliding window:
            // if more than N losses land within T ms, the breaker trips (stop re-arming, hold
            // parked, no throw); a pending debounced rebuild is cancelled (the context is gone
            // again — don't waste it). The window self-prunes, so a later quiet single loss
            // re-heals normally.
            () => {
                hooks = null;
                cancelAnimationFrame(raf);
                raf = 0;
                clearRestoreTimer();
                const t = nowMs();
                lossTimestamps.push(t);
                lossTimestamps = lossTimestamps.filter(
                    (ts) => t - ts <= T_RESTORE_STORM_MS,
                );
                // The window passed quiet (every prior loss aged past T — only this fresh
                // loss survives the prune): a later genuine single loss must self-heal, so
                // the breaker RESETS. A real storm keeps the window full and re-trips.
                if (lossTimestamps.length <= 1) breakerTripped = false;
                if (lossTimestamps.length > N_RESTORE_STORM) breakerTripped = true;
            },
        );
        build();
        bindContentVisibility();
        armed = true;
        startTime = performance.now();
        // Under reduced-motion paint ONE static frame SYNCHRONOUSLY at arm (call
        // `tick()` in-line: it paints once and parks because `!reducedMotion` gates
        // the reschedule), so an arm under `reduce` never schedules a deferred tick
        // that flashes one frame later. The full-motion path schedules the live loop.
        // BB.W-CANVAS-UNIFY: this is the one symmetric leaf refinement the Canvas2D
        // de-fork needs — the WebGL backend is byte-behaviour-identical (a static
        // frame under `reduce` is a static frame either way; the WebGL contract test
        // + the aurora PRM suite assert the interaction math, never the arm-tick
        // timing), and the Canvas2D substrate's one-static-frame-at-arm contract is
        // preserved exactly through the shared lifecycle.
        if (isRunning()) {
            if (reducedMotion) tick();
            else raf = requestAnimationFrame(tick);
        }
    }

    function renderAt(timeSec: number): void {
        if (!armed) arm();
        hooks?.frame(timeSec);
    }

    function dispose(): void {
        disposed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        clearRestoreTimer();
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
        get contextHeld() {
            return breakerTripped;
        },
    };
}
