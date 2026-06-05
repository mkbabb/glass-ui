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
//   - RESIZE — a `ResizeObserver` that calls the consumer's `resize` (the
//     consumer owns its DPR policy + viewport).
//
// Lazy-arm + capture: `arm()` runs the expensive init (context + `setup`); it is
// idempotent and a no-op after `dispose()`. `mode:"capture"` pre-seeds the
// `manual` suspension so the loop never auto-runs (a capture consumer draws via
// `renderAt`). Throws on WebGL2-unavailable / `setup` failure — the consumer's
// error policy (eager throw vs deferred surface) lives in its wrapper.

export type WebGLSuspendReason = "tab-hidden" | "off-screen" | "manual";

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
}

export function createWebGLCanvas(
    canvas: HTMLCanvasElement,
    options: WebGLCanvasOptions,
): WebGLCanvasHandle {
    const { setup, contextAttrs } = options;

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

    function tick(): void {
        if (!isRunning() || !hooks) return;
        const elapsed = (performance.now() - startTime) / 1000;
        const t = hooks.time ? hooks.time(elapsed) : elapsed;
        hooks.frame(t);
        // Reschedule ONLY while motion is live — a settled surface draws its
        // final frame once and parks (raf → 0). `wake()` re-arms on demand.
        raf = hooks.shouldContinue() ? requestAnimationFrame(tick) : 0;
    }

    function wake(): void {
        if (armed && isRunning() && !raf && hooks) raf = requestAnimationFrame(tick);
    }

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
        if (document.hidden) suspend("tab-hidden");
        else resume("tab-hidden");
    }
    if (hasDocument) document.addEventListener("visibilitychange", onVisibilityChange);

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
    };
}
