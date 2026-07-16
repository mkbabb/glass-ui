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

// BD.W-SUBSTRATE-SIZE-UNIFY (G1) — the ONE backing-store sizer + its `BackingSize`/
// `DprPolicy` types live in the colocated `backingSize` leaf (carved at BG.W-COLOCATE;
// ratchet-drain #3). Re-exported here so every consumer reaches them through the
// lifecycle unchanged (webgpu/index imports `sizeBacking`; useWebGLCanvas/useWebGPUCanvas
// import the types). The sizer is pure CSS-geometry with ZERO closure state — the
// schedule + park + reveal machinery live in this file + the `visibility` leaf.
import { watch } from "vue";
import { useReducedMotion } from "../../motion/useReducedMotion";
import { sizeBacking, type BackingSize, type DprPolicy } from "./backingSize";
import { createCanvasVisibility } from "./visibility";
export { sizeBacking };
export type { BackingSize, DprPolicy };

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
    /**
     * Upload the backing geometry to the viewport/uniforms.
     *
     * BD.W-SUBSTRATE-SIZE-UNIFY (G1): the leaf MEASURES + sizes the backing store (via
     * `sizeBacking`, the ONE sizer) and passes the freshly-computed `BackingSize` here so
     * the consumer can never re-derive a wrong one. When the leaf owns sizing (`dprPolicy`
     * provided) the buffer is already correct on entry — the consumer body is UPLOAD-ONLY,
     * shrinking to `gl.viewport(0,0,s.w,s.h)` / `uploadResolution` (a WGPU swap-chain leg
     * is a no-op — it auto-resizes to the backing the leaf set).
     *
     * Procedural scenes, including Canvas2D, pass `dprPolicy` and use this upload-only
     * size. The optional argument remains only for direct legacy WebGL/WebGPU callers
     * that omit a DPR policy.
     */
    resize: (s?: BackingSize) => void;
    /**
     * The consumer's DPR policy, handed to the leaf's `sizeBacking`. When PRESENT the
     * leaf owns the backing-store MEASUREMENT + sizing (the G1 inversion) and the live
     * `BackingSize` rides every `resize` call. When ABSENT the leaf falls back to the
     * legacy behaviour (the consumer's `resize()` self-measures) — the migration seam.
     *
     * Procedural scenes use the present branch. The absent branch remains for direct
     * legacy WebGL/WebGPU callers.
     */
    dprPolicy?: DprPolicy;
    /**
     * Bind/unbind backend-specific context-loss/restore listeners. `rebuild` re-runs
     * `buildContext` on a fresh context + resumes the loop (the self-heal); the backend
     * calls `markContextLost` on loss so the lifecycle NULLS its hooks + cancels the
     * rAF (the loop parks while the surface is blank — no frame attaches to a dead gl).
     */
    bindContextEvents?: (rebuild: () => void, markContextLost: () => void) => void;
    unbindContextEvents?: () => void;
    /** Project the lifecycle's existing loss/rebuild state without creating a second clock. */
    onContextStateChange?: (state: "lost" | "restored") => void;
    /** Surface a failed restore or a bounded context-loss storm to the owner. */
    onContextError?: (error: Error) => void;
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G3) — compose the IntersectionObserver park detector
     * at the leaf (DRY) so a consumer inherits the off-screen IO-park ORed with the
     * content-visibility park, with NO per-viz `useIntersectionPause` wiring. The leaf
     * wires a plain (scope-free, reactivity-free) IO observing the canvas, writing the
     * DISTINCT `"off-screen-io"` reason. On `isIntersecting → true` it ALSO re-measures
     * via `sizeBacking` (the reveal belt-and-braces, the load-bearing path on WebKit
     * where `contentvisibilityautostatechange` support is weaker).
     *
     * Default `false` — OPT-IN. Today several consumers (goo-blob, aurora)
     * already write `"off-screen-io"` from their OWN `useIntersectionPause`; a leaf IO
     * defaulting on would DOUBLE-WRITE that reason and breach the one-writer invariant.
     * The atomic retirement of those per-consumer calls (so the leaf IO becomes the sole
     * writer, default-on) lands in the viz lanes. Until then a viz with NO IO wiring
     * (concentric / fourier / dot-flow — the live PARK gap) opts IN to inherit the park.
     */
    composeIntersectionPark?: boolean;
    /** `rootMargin` for the leaf-composed IO park (G3). Default `"256px"` (pre-warm). */
    intersectionRootMargin?: string;
    /**
     * BG.W-VIZ-REVEAL-BLOOM — the one-shot cold-first-VISIBLE entrance bloom. When set,
     * the leaf sets a one-shot `data-substrate-reveal` ATTRIBUTE on the canvas at the
     * moment it FIRST becomes visible (a dedicated one-shot IntersectionObserver — NOT
     * at `arm()`, which a content-skipped / below-fold viz would burn on an invisible
     * paint). The CANVAS-targeted CSS `@keyframes substrate-reveal-bloom` (`viz-reveal.css`)
     * then ramps `filter: brightness()/saturate()` from a dim floor, OVERSHOOTS past 1.0
     * on the `--ease-cartoon-punch` linear() curve (the EFFECTS-channel sanctioned
     * overshoot — opacity clamps at 1.0, only `filter: brightness` can exceed the
     * settle), and settles to the canvas's own no-resting-filter rest — a FIELD bloom
     * (the canvas rect stays `scale(1)`, no box-zoom gutter). The `revealFired` guard
     * keeps it ONE-SHOT: an IO/CV re-reveal of an already-seen viz is a silent re-attach
     * → ZERO second bloom on scroll-off-and-back. PRM → the leaf skips the attr AND the
     * CSS animation sits inside `@media (prefers-reduced-motion: no-preference)`, so the
     * field paints settled from frame 0 (zero ramp). Default `false` (opt-in per viz).
     */
    revealBloom?: boolean;
}

export interface CanvasLifecycleHandle {
    arm: () => void;
    /**
     * BD.W-SUBSTRATE-SIZE-UNIFY (G2) — size the backing store + start the leaf RO
     * SYNCHRONOUSLY, decoupled from the (async) context acquire. The WebGPU backend
     * calls this BEFORE `armAsync`'s device request so the canvas is sharp from frame 0
     * while the device resolves behind it (the ≤6s blurry-flash close). Idempotent: a
     * no-op once `arm()` has run it. A no-op when no `dprPolicy` was supplied (legacy).
     */
    presize: () => void;
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
    const { canvas, buildContext } = options;
    const respectReducedMotion =
        options.respectReducedMotion ?? options.mode !== "capture";
    const dprPolicy = options.dprPolicy;
    const composeIntersectionPark = options.composeIntersectionPark ?? false;

    // BD.W-SUBSTRATE-SIZE-UNIFY (G1/G2) — the leaf-owned size step. When `dprPolicy` is
    // present the leaf MEASURES + sizes the backing (the ONE sizer) and hands the live
    // `BackingSize` to the consumer's upload-only `resize(s)`. When absent, the legacy
    // path runs (the consumer self-measures in its own `resize()`). ONE function, every
    // call-site (presize / RO / CV-reveal / IO-reveal / wake) routes through it so the
    // backing can NEVER drift to the 300×150 default behind a stuck consumer closure.
    function sizeAndUpload(): void {
        if (dprPolicy !== undefined) {
            const s = sizeBacking(canvas, dprPolicy);
            options.resize(s);
        } else {
            options.resize();
        }
    }
    const resize = sizeAndUpload;

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
    const reducedPreference = respectReducedMotion ? useReducedMotion() : null;
    let reducedMotion = reducedPreference?.value ?? false;

    function tick(): void {
        if (!isRunning() || !hooks) return;
        const elapsed = (performance.now() - startTime) / 1000;
        const t = hooks.time ? hooks.time(elapsed) : elapsed;
        hooks.frame(t);
        raf =
            !reducedMotion && hooks.shouldContinue() ? requestAnimationFrame(tick) : 0;
    }

    function wake(): void {
        if (!armed || !isRunning() || raf || !hooks) return;
        if (reducedMotion) tick();
        else raf = requestAnimationFrame(tick);
    }

    function onReducedMotionChange(next: boolean): void {
        if (next === reducedMotion) return;
        reducedMotion = next;
        if (next) {
            cancelAnimationFrame(raf);
            raf = 0;
            if (armed && isRunning() && hooks) tick();
        } else {
            startTime = performance.now();
            if (armed && isRunning() && hooks?.shouldContinue()) wake();
        }
    }
    const stopReducedMotionWatch = reducedPreference
        ? watch(reducedPreference, onReducedMotionChange, { flush: "sync" })
        : () => {};

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

    // ── the visibility / park / reveal observers (BG.W-COLOCATE — the carved leaf) ──
    // The DOM-observer plumbing (the tab-visibility owner, the content-visibility
    // offscreen-park, the leaf ResizeObserver + presize, the IntersectionObserver park,
    // and the one-shot first-visible reveal bloom) lives in the colocated `visibility`
    // leaf and drives THIS scheduler ONLY through the injected suspend/resume/resize/wake
    // callbacks (the schedule lives ONCE here, the DOM observers ONCE there). Constructing
    // it binds the tab-visibility owner + seeds the initial `document.hidden` suspend.
    const visibility = createCanvasVisibility({
        canvas,
        suspend,
        resume,
        resize,
        wake,
        isArmed: () => armed,
        hasHooks: () => hooks !== null,
        isDisposed: () => disposed,
        isReducedMotion: () => reducedMotion,
        composeIntersectionPark,
        intersectionRootMargin: options.intersectionRootMargin,
        revealBloom: options.revealBloom ?? false,
    });

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
                    try {
                        build();
                        options.onContextStateChange?.("restored");
                        if (isRunning()) wake();
                    } catch (error) {
                        hooks = null;
                        options.onContextError?.(
                            error instanceof Error ? error : new Error(String(error)),
                        );
                    }
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
                options.onContextStateChange?.("lost");
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
                if (lossTimestamps.length > N_RESTORE_STORM && !breakerTripped) {
                    breakerTripped = true;
                    options.onContextError?.(
                        new Error(
                            "[Canvas] repeated context loss; rendering is parked",
                        ),
                    );
                }
            },
        );
        // G2 — size synchronously BEFORE building the context (idempotent if presize
        // already ran on the WebGPU pre-acquire path). The leaf RO is live from here.
        visibility.presize();
        build();
        // Bind the content-visibility + IO park observers at the leaf (every consumer
        // inherits the park, no per-viz wiring — G2/G3).
        visibility.bindPark();
        armed = true;
        startTime = performance.now();
        // BG.W-VIZ-REVEAL-BLOOM — arm the one-shot entrance bloom (fires at FIRST-VISIBLE
        // via a dedicated IO, NEVER here at arm; no-op when `revealBloom` is off / under PRM).
        visibility.armRevealBloom();
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
        stopReducedMotionWatch();
        // Detach every DOM observer/listener owned by the visibility leaf (the
        // tab-visibility owner, the content-visibility listener, the leaf RO, the IO
        // park, the one-shot reveal IO).
        visibility.dispose();
        options.unbindContextEvents?.();
        hooks?.teardown?.();
        hooks = null;
        suspended.clear();
    }

    if (options.mode === "capture") arm();

    return {
        arm,
        presize: visibility.presize,
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
