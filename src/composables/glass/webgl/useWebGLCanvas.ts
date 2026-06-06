// AU.W6 — `useWebGLCanvas`: the shared WebGL2 lifecycle + demand-driven
// scheduling substrate (DEC-AT-1). Aurora AND the AU.W7 goo-blob compose it.
//
// It owns the GENERIC concerns every WebGL2 background surface needs and NOTHING
// consumer-specific (C6 must-fix #4 — the substrate must NOT bake aurora's
// quad / attrs / DPR / frozen-t; those are threaded through the consumer
// callbacks `setup`/`frame`/`resize`/`time`, so a 2nd consumer with a different
// quad/DPR composes the same substrate):
//
//   - CONTEXT LIFECYCLE — create the `webgl2` context with the consumer's attrs,
//     AND the `webglcontextlost`/`webglcontextrestored` pair (the ONE piece
//     genuinely absent from aurora's bootstrap, AU.W6 §1): on restore it
//     re-creates the program via the consumer's `setup(gl)` and re-arms, so a
//     GPU context loss self-heals instead of going permanently blank.
//   - DEMAND-DRIVEN SCHEDULING — the three-reason suspend model
//     (`tab-hidden`/`off-screen`/`manual`) as a `Set<reason>`: the rAF loop runs
//     IFF the set is empty, each reason cleared ONLY by its owner (so a tab-show
//     can never lift an off-screen suspension). The loop reschedules ONLY while
//     `shouldContinue()` is live, so a settled surface parks (no perpetual 60fps
//     compositor cost); `wake()` re-arms on demand. A tab-visibility owner is
//     wired here; the OFF-SCREEN reason is driven by the consumer (aurora wires
//     its existing `useIntersectionPause`), the substrate just exposes
//     `suspend("off-screen")`/`resume("off-screen")`.
//   - OFFSCREEN RAF-PARK (AV.W7 F1/F4) — the single biggest perf+battery lever.
//     The substrate owns the OFF-SCREEN reason directly: a
//     `contentvisibilityautostatechange` listener on the host (F1 — fires when a
//     `content-visibility:auto` host is content-skipped) parks the loop, and a
//     `document.visibilityState` re-check on tab-show complements the tab-hidden
//     owner (F4). The IntersectionObserver `rootMargin:200px` fallback for
//     engines without `contentvisibilityautostatechange` is wired by the consumer
//     via the existing `useIntersectionPause` (it already drives
//     `suspend("off-screen")`). All three gate the SAME `isRunning()` set — one
//     park condition, ORed.
//   - REDUCED-MOTION FREEZE (AV.W7 G1) — the PRM freeze is LIFTED here from the
//     two consumers (aurora `runtime.ts` + goo-blob `useMetaballRenderer.ts`) and
//     LIVE-MONITORED via a `matchMedia` `change` listener (the consumers read it
//     once at init and never re-monitored). On `reduce` → paint ONE static frame
//     then park (the loop reschedule is gated, never the suspend set — so the
//     on-screen reduced surface never blanks); on un-reduce → `wake()`. Every AV
//     surface that composes the substrate inherits the frozen-one-static-frame
//     guarantee for free. A CSS reset cannot reach the WebGL RAF — this is a JS
//     gate, replace-not-remove.
//   - RESIZE — a `ResizeObserver` that calls the consumer's `resize` (the
//     consumer owns its DPR policy + viewport).
//
// Lazy-arm + capture: `arm()` runs the expensive init (context + `setup`); it is
// idempotent and a no-op after `dispose()`. `mode:"capture"` pre-seeds the
// `manual` suspension so the loop never auto-runs (a capture consumer draws via
// `renderAt`). Throws on WebGL2-unavailable / `setup` failure — the consumer's
// error policy (eager throw vs deferred surface) lives in its wrapper.

export type WebGLSuspendReason = "tab-hidden" | "off-screen" | "manual";

/**
 * The `contentvisibilityautostatechange` event shape (AV.W7 F1). Lib-DOM does
 * not yet type it across all TS targets, so the substrate declares the one field
 * it reads: `skipped` is `true` while the `content-visibility:auto` host is
 * content-hidden (offscreen / not rendered), `false` when it re-renders.
 */
interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

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
     * parking the loop (AV.W7 G1). The substrate live-monitors the query via a
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
     * The live `prefers-reduced-motion: reduce` state (AV.W7 G1). The substrate
     * owns + re-monitors it; consumers read it (e.g. aurora freezes its frame
     * time at the authored offset while this is `true`). `false` when
     * `respectReducedMotion` is off.
     */
    readonly reducedMotion: boolean;
}

export function createWebGLCanvas(
    canvas: HTMLCanvasElement,
    options: WebGLCanvasOptions,
): WebGLCanvasHandle {
    const { setup, contextAttrs } = options;
    // Capture runtimes draw deterministic frames via `renderAt`, never the live
    // loop, so PRM-freeze does not apply; live runtimes honor it by default.
    const respectReducedMotion =
        options.respectReducedMotion ?? options.mode !== "capture";

    // ── demand-driven scheduling ────────────────────────────────────────────
    const suspended = new Set<WebGLSuspendReason>();
    if (options.mode === "capture") suspended.add("manual");
    const isRunning = (): boolean => suspended.size === 0;

    let raf = 0;
    let startTime = typeof performance !== "undefined" ? performance.now() : 0;

    let gl: WebGL2RenderingContext | null = null;
    let hooks: WebGLCanvasFrame | null = null;
    let armed = false;
    let disposed = false;

    // ── reduced-motion (AV.W7 G1) — live-monitored, gates the RESCHEDULE not
    // the suspend set, so an on-screen reduced surface paints ONE static frame
    // (the §3a ordering caveat) and never blanks.
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
        // Reschedule ONLY while motion is live — a settled surface draws its
        // final frame once and parks (raf → 0). Under reduced-motion the loop
        // draws this one static frame then parks regardless of the consumer's
        // demand-gate (G1). `wake()` re-arms on demand.
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
        // reduce→full restarts drift from the un-freeze instant (no jump from the
        // frozen period); full→reduce must draw one last static frame then park
        // (the `tick` reschedule gate handles the park). Either way the loop must
        // run at least one more tick — `wake()` schedules it.
        if (!next) startTime = performance.now();
        wake();
    }
    reducedMq?.addEventListener("change", onReducedMotionChange);

    function suspend(reason: WebGLSuspendReason = "manual"): void {
        const wasRunning = isRunning();
        suspended.add(reason);
        if (wasRunning && !isRunning()) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
    }

    function resume(reason: WebGLSuspendReason = "manual"): void {
        const wasSuspended = !isRunning();
        suspended.delete(reason);
        if (wasSuspended && isRunning() && armed && hooks) {
            // Skip the parked gap so motion does not jump on resume.
            startTime = performance.now() - 1000;
            tick();
        }
    }

    // ── tab-visibility owner (ONE writer of `tab-hidden`) ────────────────────
    const hasDocument = typeof document !== "undefined";
    function onVisibilityChange(): void {
        // F4 — a backgrounded tab stops the loop; a re-shown tab resumes it. The
        // `tab-hidden` reason is cleared ONLY here, so it never lifts an
        // off-screen/manual suspension (the Set discipline).
        if (document.hidden) suspend("tab-hidden");
        else resume("tab-hidden");
    }
    if (hasDocument) document.addEventListener("visibilitychange", onVisibilityChange);
    // Seed the tab-hidden reason if the runtime is constructed while the tab is
    // already backgrounded (a prerendered / background-tab mount).
    if (hasDocument && document.hidden) suspended.add("tab-hidden");

    // ── content-visibility offscreen-park (AV.W7 F1; the headline lever) ──────
    // The `content-visibility:auto` host (Lane B sets the property on the SFC
    // root that wraps the canvas) fires `contentvisibilityautostatechange` when
    // the browser content-skips it (scrolled offscreen / display-locked). The
    // listener drives the SAME `off-screen` reason the IntersectionObserver
    // fallback uses, so a settled-AND-offscreen surface attaches ZERO frames.
    // The event fires on the element carrying the property — the canvas's host
    // (its parent), so the listener binds there and is re-resolved at arm() (the
    // parent is stable across the canvas lifecycle).
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

    // ── context-loss/restore (the genuinely-absent robustness) ───────────────
    let ro: ResizeObserver | null = null;
    function onContextLost(e: Event): void {
        e.preventDefault(); // REQUIRED so `webglcontextrestored` can fire
        cancelAnimationFrame(raf);
        raf = 0;
        hooks = null;
        gl = null;
    }
    function onContextRestored(): void {
        if (disposed) return;
        buildContext(); // re-create program/geometry on the fresh context
        if (isRunning()) wake();
    }

    function buildContext(): void {
        const ctx = canvas.getContext("webgl2", contextAttrs ?? undefined);
        if (!ctx) throw new Error("[useWebGLCanvas] WebGL2 unavailable");
        gl = ctx;
        hooks = setup(gl);
        hooks.resize();
        if (!ro) {
            ro = new ResizeObserver(() => hooks?.resize());
            ro.observe(canvas);
        }
    }

    function arm(): void {
        if (armed || disposed) return;
        canvas.addEventListener("webglcontextlost", onContextLost as EventListener, false);
        canvas.addEventListener("webglcontextrestored", onContextRestored as EventListener, false);
        buildContext();
        // Bind the offscreen-park listener once the canvas is in the tree (its
        // host parent now resolves).
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
        canvas.removeEventListener("webglcontextlost", onContextLost as EventListener, false);
        canvas.removeEventListener("webglcontextrestored", onContextRestored as EventListener, false);
        ro?.disconnect();
        ro = null;
        hooks?.teardown?.();
        hooks = null;
        // Force context release under the per-page WebGL-context cap (~8 in Chromium).
        gl?.getExtension("WEBGL_lose_context")?.loseContext();
        gl = null;
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
        get gl() {
            return gl;
        },
        get reducedMotion() {
            return reducedMotion;
        },
    };
}
