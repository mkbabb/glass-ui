// AW.W17 — `useCanvas2D` / `createCanvas2D`: the Canvas2D lifecycle + demand-
// driven scheduling substrate (the Canvas2D parallel to `useWebGLCanvas`).
//
// It owns the GENERIC concerns every Canvas2D field surface needs and NOTHING
// consumer-specific — the consumer threads its drawing through the `setup`
// callback's returned `Canvas2DFrame`:
//
//   - DEMAND-DRIVEN SCHEDULING — the three-reason suspend model
//     (`tab-hidden`/`off-screen`/`manual`) as a `Set<reason>`: the rAF loop runs
//     IFF the set is empty, each reason cleared ONLY by its owner.
//   - OFFSCREEN RAF-PARK — composes the existing `useIntersectionPause`
//     (`rootMargin:200px` warm band) → a host scrolled offscreen parks its loop.
//   - TAB-HIDDEN PARK — a `visibilitychange` listener parks on `document.hidden`.
//   - REDUCED-MOTION FREEZE — owns + LIVE-MONITORS `prefers-reduced-motion:
//     reduce` (a `matchMedia` `change` listener). On reduce → paint ONE static
//     frame then park; on un-reduce → re-arm. The reschedule gate is what reduce
//     freezes, never the suspend set, so an on-screen reduced surface never
//     blanks (it shows its one static frame).
//   - DPR-CLAMPED RESIZE — composes `useResizeObserver`; on resize sizes the
//     backing store to `round(css*dpr)` with `dpr = min(devicePixelRatio, 2)`
//     and applies `ctx.setTransform(dpr,0,0,dpr,0,0)` so the consumer draws in
//     CSS pixels.
//
// MUST be called inside a Vue setup scope — it composes `useResizeObserver` +
// `useIntersectionPause`, which register scope-dispose cleanup. `dispose()` is
// idempotent and a no-op post-dispose.
//
// The suspend-reason union is twinned with the WebGL substrate's
// (`WebGLSuspendReason`) — the SAME three-reason vocabulary, named locally so
// the Canvas2D substrate carries no WebGL import.

import { watch, onScopeDispose, type Ref } from "vue";
import { useResizeObserver } from "../../dom/useResizeObserver";
import { useIntersectionPause } from "../../motion/useIntersectionPause";

/** The three park reasons, ORed onto one `isRunning()` set (twins WebGLSuspendReason). */
export type Canvas2DSuspendReason = "tab-hidden" | "off-screen" | "manual";

/** The per-frame hooks a consumer's `setup(ctx)` returns. */
export interface Canvas2DFrame {
    /** Draw one frame at `now` (ms, `performance.now()` clock). */
    render: (ctx: CanvasRenderingContext2D, now: number) => void;
    /** Release any per-context resources. Runs on dispose. */
    teardown?: () => void;
}

export interface Canvas2DOptions {
    /** The canvas element ref (mounts late; the substrate arms when it resolves). */
    canvas: Ref<HTMLCanvasElement | null>;
    /** Build per-context state on a fresh `2d` context; returns the per-frame hooks. */
    setup: (ctx: CanvasRenderingContext2D) => Canvas2DFrame;
    /** Auto-arm + run the loop on mount. Default `true`. */
    autoStart?: boolean;
    /**
     * Honor `prefers-reduced-motion: reduce` by painting ONE static frame then
     * parking, live-monitored via a `matchMedia` `change` listener. Default `true`.
     */
    respectReducedMotion?: boolean;
}

export interface Canvas2DHandle {
    /** Run the expensive init (context + `setup` + arm the loop). Idempotent; no-op post-dispose. */
    arm: () => void;
    suspend: (reason?: Canvas2DSuspendReason) => void;
    resume: (reason?: Canvas2DSuspendReason) => void;
    dispose: () => void;
    /** Is the loop live (no suspend reason held)? */
    isRunning: () => boolean;
    /** The live `prefers-reduced-motion: reduce` state. */
    readonly reducedMotion: boolean;
}

/**
 * Create a Canvas2D lifecycle substrate for a field that draws into a 2D
 * context. Mirrors `createWebGLCanvas`'s arm/park/freeze/dispose contract.
 */
export function createCanvas2D(options: Canvas2DOptions): Canvas2DHandle {
    const { canvas: canvasRef, setup } = options;
    const respectReducedMotion = options.respectReducedMotion ?? true;
    const autoStart = options.autoStart ?? true;

    // ── demand-driven scheduling ────────────────────────────────────────────
    const suspended = new Set<Canvas2DSuspendReason>();
    const isRunning = (): boolean => suspended.size === 0;

    let raf = 0;
    let ctx: CanvasRenderingContext2D | null = null;
    let frame: Canvas2DFrame | null = null;
    let armed = false;
    let disposed = false;

    const hasWindow = typeof window !== "undefined";
    const hasDocument = typeof document !== "undefined";

    // ── reduced-motion — live-monitored, gates the RESCHEDULE not the suspend
    // set, so an on-screen reduced surface paints ONE static frame and parks.
    const reducedMq =
        respectReducedMotion && hasWindow && window.matchMedia
            ? window.matchMedia("(prefers-reduced-motion: reduce)")
            : null;
    let reducedMotion = reducedMq?.matches ?? false;

    function tick(): void {
        if (!isRunning() || !frame) return;
        frame.render(ctx!, performance.now());
        // Reschedule ONLY while motion is live; under reduced-motion draw this
        // one static frame then park (raf → 0). `resume()`/an un-reduce re-arms.
        raf = !reducedMotion ? requestAnimationFrame(tick) : 0;
    }

    function wake(): void {
        if (armed && isRunning() && !raf && frame) raf = requestAnimationFrame(tick);
    }

    function paintStaticFrame(): void {
        if (armed && frame) frame.render(ctx!, performance.now());
    }

    function onReducedMotionChange(): void {
        const next = reducedMq?.matches ?? false;
        if (next === reducedMotion) return;
        reducedMotion = next;
        // un-reduce → resume the loop; reduce → draw one static frame then park.
        if (next) paintStaticFrame();
        else wake();
    }
    reducedMq?.addEventListener("change", onReducedMotionChange);

    function suspend(reason: Canvas2DSuspendReason = "manual"): void {
        const wasRunning = isRunning();
        suspended.add(reason);
        if (wasRunning && !isRunning()) {
            cancelAnimationFrame(raf);
            raf = 0;
        }
    }

    function resume(reason: Canvas2DSuspendReason = "manual"): void {
        const wasSuspended = !isRunning();
        suspended.delete(reason);
        if (wasSuspended && isRunning() && armed && frame) {
            if (reducedMotion) paintStaticFrame();
            else wake();
        }
    }

    // ── tab-visibility owner (ONE writer of `tab-hidden`) ────────────────────
    function onVisibilityChange(): void {
        if (document.hidden) suspend("tab-hidden");
        else resume("tab-hidden");
    }
    if (hasDocument) {
        document.addEventListener("visibilitychange", onVisibilityChange);
        if (document.hidden) suspended.add("tab-hidden");
    }

    // ── offscreen-park — compose the existing useIntersectionPause leaf
    //     (rootMargin 200px warm band) driving the `off-screen` reason. It owns
    //     `pauseWhenHidden:false` so the tab-hidden owner above stays the single
    //     writer of that reason.
    useIntersectionPause(
        canvasRef,
        {
            pause: () => suspend("off-screen"),
            resume: () => resume("off-screen"),
        },
        { rootMargin: "200px", pauseWhenHidden: false },
    );

    // ── dpr-clamped resize ───────────────────────────────────────────────────
    function applyResize(cssW: number, cssH: number): void {
        const canvas = canvasRef.value;
        if (!canvas || !ctx) return;
        const dpr = Math.min((hasWindow && window.devicePixelRatio) || 1, 2);
        const w = Math.round(cssW * dpr);
        const h = Math.round(cssH * dpr);
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
        // Draw in CSS pixels — the consumer's field is sized in CSS units.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // Repaint a static frame if the loop is parked so a resize-while-parked
        // (reduced-motion / offscreen-just-returned) does not leave a stale buffer.
        if (!raf && armed) paintStaticFrame();
    }
    useResizeObserver(canvasRef, (rect) => applyResize(rect.width, rect.height));

    function arm(): void {
        if (armed || disposed) return;
        const canvas = canvasRef.value;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("[useCanvas2D] 2D context unavailable");
        ctx = context;
        frame = setup(ctx);
        // Initial size from the rendered element.
        applyResize(canvas.clientWidth, canvas.clientHeight);
        armed = true;
        if (isRunning()) {
            if (reducedMotion) paintStaticFrame();
            else raf = requestAnimationFrame(tick);
        }
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        if (hasDocument) document.removeEventListener("visibilitychange", onVisibilityChange);
        reducedMq?.removeEventListener("change", onReducedMotionChange);
        frame?.teardown?.();
        frame = null;
        ctx = null;
        suspended.clear();
    }

    // Arm once the canvas resolves (it mounts late).
    if (autoStart) {
        watch(
            canvasRef,
            (canvas) => {
                if (canvas && !armed && !disposed) arm();
            },
            { immediate: true },
        );
    }

    onScopeDispose(dispose);

    return {
        arm,
        suspend,
        resume,
        dispose,
        isRunning,
        get reducedMotion() {
            return reducedMotion;
        },
    };
}
