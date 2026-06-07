// AW.W17 — `useCanvas2D`: the Canvas2D lifecycle substrate, the park/freeze/
// dispose PARALLEL to `useWebGLCanvas` (AU.W6). Any Canvas2D field (the
// Constellation lattice is consumer #1) composes it and inherits the offscreen
// + tab-hidden + reduced-motion freeze for free — a hand-rolled RAF-park in a
// canvas component is the regression this substrate retires.
//
// It owns the GENERIC concerns every Canvas2D background needs and NOTHING
// consumer-specific (the field engine, the draw passes, the palette are threaded
// through the consumer's `setup(ctx)` → `Canvas2DFrame`):
//
//   - DEMAND-DRIVEN SCHEDULING — the three-reason suspend model
//     (`tab-hidden`/`off-screen`/`manual`) as a `Set<Canvas2DSuspendReason>`: the
//     rAF loop runs IFF the set is empty (`isRunning()`), each reason cleared
//     ONLY by its owner (so a tab-show can never lift an off-screen suspension).
//   - OFFSCREEN RAF-PARK — a `contentvisibilityautostatechange` listener on the
//     canvas host (fires when a `content-visibility:auto` host is content-skipped)
//     parks the loop, and an `IntersectionObserver` (`rootMargin:200px`) parks it
//     when the canvas scrolls offscreen. Both drive the SAME `off-screen` reason.
//   - TAB-HIDDEN PARK — a `visibilitychange` listener reading `document.hidden`
//     drives the `tab-hidden` reason (the ONE writer of it).
//   - REDUCED-MOTION FREEZE — the substrate OWNS + LIVE-MONITORS
//     `prefers-reduced-motion: reduce` via a `matchMedia` `change` listener. On
//     `reduce` → paint ONE static frame then park (the reschedule is gated, never
//     the suspend set, so an on-screen reduced surface never blanks); on
//     un-reduce → re-arm. A CSS reset cannot reach the canvas rAF — this is a JS
//     gate.
//   - RESIZE — a `ResizeObserver` sets `canvas.width/height` to the dpr-clamped
//     backing size (`dpr = Math.min(devicePixelRatio||1, 2)`) and applies
//     `ctx.setTransform(dpr,0,0,dpr,0,0)` so the consumer draws in CSS px; a
//     parked surface repaints one static frame after a resize.
//
// `arm()` runs the cheap init (2D context + `setup`); it is idempotent and a
// no-op after `dispose()`. `dispose()` disconnects every observer + the
// matchMedia listener + cancels the rAF and calls `frame.teardown?.()`.

import {
    getCurrentScope,
    onScopeDispose,
    toValue,
    type MaybeRefOrGetter,
} from "vue";

/** The suspend reasons that gate the loop. Twins the WebGL substrate's union. */
export type Canvas2DSuspendReason = "tab-hidden" | "off-screen" | "manual";

/**
 * The `contentvisibilityautostatechange` event shape. Lib-DOM does not yet type
 * it across all TS targets, so the substrate declares the one field it reads:
 * `skipped` is `true` while the `content-visibility:auto` host is content-hidden.
 */
interface ContentVisibilityAutoStateChangeEvent extends Event {
    readonly skipped: boolean;
}

/** The per-frame hooks a consumer's `setup(ctx)` returns. */
export interface Canvas2DFrame {
    /**
     * Draw one frame. `ctx` is pre-transformed for CSS px (the dpr scale is
     * applied by the substrate's resize), `now` is `performance.now()` ms. The
     * consumer steps + clears + paints — the substrate clears nothing.
     */
    render: (ctx: CanvasRenderingContext2D, now: number) => void;
    /** Release per-instance resources. Runs on dispose. */
    teardown?: () => void;
}

export interface Canvas2DOptions {
    /** The canvas element ref (or getter). The substrate observes + sizes it. */
    canvas: MaybeRefOrGetter<HTMLCanvasElement | null>;
    /** Build per-instance state on a fresh 2D context; returns the frame hooks. */
    setup: (ctx: CanvasRenderingContext2D) => Canvas2DFrame;
    /** Auto-`arm()` once the canvas resolves (default `true`). */
    autoStart?: boolean;
    /**
     * Honor `prefers-reduced-motion: reduce` by painting ONE static frame then
     * parking the loop. Live-monitored via a `matchMedia` `change` listener;
     * re-arms (one static frame) on un-reduce. Default `true`.
     */
    respectReducedMotion?: boolean;
    /** `getContext("2d", …)` attributes. */
    contextAttrs?: CanvasRenderingContext2DSettings;
    /** IntersectionObserver `rootMargin` for the offscreen seam. Default `200px`. */
    rootMargin?: string;
}

export interface Canvas2DHandle {
    /** Run the cheap init (2D context + `setup` + arm the loop). Idempotent; no-op post-dispose. */
    arm: () => void;
    suspend: (reason?: Canvas2DSuspendReason) => void;
    resume: (reason?: Canvas2DSuspendReason) => void;
    /** Re-arm a parked loop on demand (a setter that re-introduced motion calls this). */
    wake: () => void;
    dispose: () => void;
    /** `true` while the suspend set is empty (the loop is live). */
    isRunning: () => boolean;
    /** The live 2D context (null before arm / after dispose). */
    readonly ctx: CanvasRenderingContext2D | null;
    /** The live `prefers-reduced-motion: reduce` state (consumers read it to skip stepping). */
    readonly reducedMotion: boolean;
}

const DEFAULT_ROOT_MARGIN = "200px";

export function createCanvas2D(options: Canvas2DOptions): Canvas2DHandle {
    const {
        setup,
        autoStart = true,
        contextAttrs,
        rootMargin = DEFAULT_ROOT_MARGIN,
    } = options;
    const respectReducedMotion = options.respectReducedMotion ?? true;
    const resolveCanvas = (): HTMLCanvasElement | null => toValue(options.canvas);

    // ── demand-driven scheduling ────────────────────────────────────────────
    const suspended = new Set<Canvas2DSuspendReason>();
    const isRunning = (): boolean => suspended.size === 0;

    let raf = 0;
    let ctx: CanvasRenderingContext2D | null = null;
    let hooks: Canvas2DFrame | null = null;
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
        if (!isRunning() || !hooks || !ctx) {
            raf = 0;
            return;
        }
        hooks.render(ctx, hasWindow ? performance.now() : 0);
        // Under reduced-motion draw this one static frame then park; otherwise
        // keep the loop running (a Canvas2D field is perpetual motion — the
        // consumer's own pointer/ripple state lives in its closure, the
        // substrate does not demand-gate it). `wake()` re-arms after a park.
        raf = reducedMotion ? 0 : requestAnimationFrame(tick);
    }

    function wake(): void {
        if (armed && isRunning() && !raf && hooks && ctx) raf = requestAnimationFrame(tick);
    }

    /** Paint ONE static frame out of loop (reduced-motion / post-resize-while-parked). */
    function paintStatic(): void {
        if (armed && hooks && ctx) hooks.render(ctx, hasWindow ? performance.now() : 0);
    }

    function onReducedMotionChange(): void {
        const next = reducedMq?.matches ?? false;
        if (next === reducedMotion) return;
        reducedMotion = next;
        // reduce → full re-arms the live loop; full → reduce draws one last
        // static frame then parks (the `tick` reschedule gate handles the park).
        // Either way one more tick must run — `wake()` schedules it.
        wake();
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
        if (wasSuspended && isRunning() && armed && hooks) {
            // Under reduced-motion a resume paints one static frame, not a loop.
            if (reducedMotion) paintStatic();
            else wake();
        }
    }

    // ── tab-visibility owner (the ONE writer of `tab-hidden`) ─────────────────
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
    function bindContentVisibility(canvas: HTMLCanvasElement): void {
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

    // ── IntersectionObserver offscreen seam (the fallback for engines without
    // contentvisibilityautostatechange + the scrolled-offscreen case). Drives
    // the SAME `off-screen` reason — ORed onto the same park condition.
    let io: IntersectionObserver | null = null;
    function bindIntersection(canvas: HTMLCanvasElement): void {
        if (io || typeof IntersectionObserver === "undefined") return;
        io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        resume("off-screen");
                    } else {
                        suspend("off-screen");
                    }
                }
            },
            { rootMargin },
        );
        io.observe(canvas);
    }

    // ── dpr-clamped resize ────────────────────────────────────────────────────
    let ro: ResizeObserver | null = null;
    // `true` only during the initial arm() resize, so resizeTo defers the first
    // paint to arm()'s own static-or-loop decision (no double-paint at startup).
    let arming = false;
    function resizeTo(canvas: HTMLCanvasElement): void {
        if (!ctx) return;
        const w = canvas.clientWidth || canvas.offsetWidth || 0;
        const h = canvas.clientHeight || canvas.offsetHeight || 0;
        if (!w || !h) return;
        const dpr = Math.min((hasWindow && window.devicePixelRatio) || 1, 2);
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // A parked surface (offscreen / reduced) repaints one static frame so a
        // resize does not leave a stale or blank canvas — but NOT during the
        // initial arm (arm()'s own first-paint owns that).
        if (!arming && !raf) paintStatic();
    }
    function bindResize(canvas: HTMLCanvasElement): void {
        if (ro || typeof ResizeObserver === "undefined") return;
        ro = new ResizeObserver(() => {
            const c = resolveCanvas();
            if (c) resizeTo(c);
        });
        ro.observe(canvas);
    }

    function arm(): void {
        if (armed || disposed) return;
        const canvas = resolveCanvas();
        if (!canvas) return;
        const c2d = canvas.getContext("2d", contextAttrs);
        if (!c2d) throw new Error("[useCanvas2D] 2D context unavailable");
        ctx = c2d;
        hooks = setup(ctx);
        armed = true;
        bindResize(canvas);
        bindContentVisibility(canvas);
        bindIntersection(canvas);
        arming = true;
        resizeTo(canvas);
        arming = false;
        // Reduced-motion paints one static frame and stays parked; otherwise the
        // live loop starts (iff nothing else suspended it).
        if (reducedMotion) paintStatic();
        else if (isRunning()) raf = requestAnimationFrame(tick);
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(raf);
        raf = 0;
        if (hasDocument) document.removeEventListener("visibilitychange", onVisibilityChange);
        reducedMq?.removeEventListener("change", onReducedMotionChange);
        unbindContentVisibility();
        io?.disconnect();
        io = null;
        ro?.disconnect();
        ro = null;
        hooks?.teardown?.();
        hooks = null;
        ctx = null;
        suspended.clear();
    }

    if (autoStart) {
        // Defer arm to the next microtask so a `useTemplateRef` canvas has a
        // chance to resolve; if the ref is already populated arm runs straight
        // through. A synchronous arm with a null canvas is a graceful no-op the
        // consumer follows with an explicit `arm()` once mounted.
        arm();
    }

    if (getCurrentScope()) onScopeDispose(dispose);

    return {
        arm,
        suspend,
        resume,
        wake,
        dispose,
        isRunning,
        get ctx() {
            return ctx;
        },
        get reducedMotion() {
            return reducedMotion;
        },
    };
}
