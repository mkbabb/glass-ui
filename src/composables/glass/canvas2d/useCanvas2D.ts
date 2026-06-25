// AW.W17 — `useCanvas2D`: the Canvas2D lifecycle substrate, the park/freeze/
// dispose PARALLEL to `useWebGLCanvas` (AU.W6). BB.W-CANVAS-UNIFY de-forked it:
// it is now a THIN Canvas2D backend over the shared `createCanvasLifecycle` core
// (the AU.W6 carve), exactly the way `useWebGLCanvas` is the thin WebGL2 backend.
// The schedule — the three-reason suspend Set, the rAF tick/wake demand gate, the
// document-visibility owner, the content-visibility offscreen-park, and the live
// `prefers-reduced-motion` re-monitor — lives ONCE in the core; this module owns
// ONLY the genuinely backend-specific 2D concerns and the Vue-ref wrapper. The
// prior copy of that machinery (the AV.W1 two-copy class the carve was built to
// prevent, re-forked at AW.W17) is gone.
//
// The backend-specific 2D concerns this module threads through the core's
// `buildContext`/`resize` seam:
//
//   - 2D CONTEXT ACQUISITION — `canvas.getContext("2d", contextAttrs)` (throws on
//     unavailable) + the consumer's `setup(ctx)` → `Canvas2DFrame`. A Canvas2D
//     context cannot be lost the WebGL way, so NO `bindContextEvents` is passed
//     (the core's self-heal-on-restore machinery is WebGL-only and stays unused).
//   - dpr-clamped RESIZE — a `ResizeObserver` sets `canvas.width/height` to the
//     dpr-clamped backing size (`dpr = Math.min(devicePixelRatio||1, 2)`) and
//     applies `ctx.setTransform(dpr,0,0,dpr,0,0)` so the consumer draws in CSS px;
//     a parked surface repaints one static frame after a resize.
//   - IntersectionObserver OFFSCREEN FALLBACK — for engines without
//     `contentvisibilityautostatechange` + the scrolled-offscreen case. It writes
//     its OWN `"off-screen-io"` reason (AX.W16 F6 — distinct from the content-
//     visibility path's `"off-screen"`, so an IO `resume` can never lift a
//     legitimately-held CV suspend; the WebGL leaf already split the key, the 2D
//     fork carried the latent collision, the de-fork inherits the fix).
//   - the time-base BRIDGE — the core's `frame(timeSec)` + `time(elapsedSec)`
//     hooks feed the consumer's `Canvas2DFrame.render(ctx, now)` raw
//     `performance.now()` ms (the `time` hook returns `performance.now()`, so the
//     core's `frame(t)` calls `render(ctx, performance.now())`). The consumer's
//     `render(ctx, now)` contract is preserved byte-for-byte through the existing
//     core seam — no leaf change for the time base.
//   - the Vue-REF WRAPPER — the core takes a concrete `HTMLCanvasElement`, but the
//     2D consumer passes a `MaybeRefOrGetter` + expects `onScopeDispose` auto-
//     cleanup + a deferred arm-until-the-ref-resolves. So this module keeps
//     `toValue` resolution, the `autoStart` deferred arm, and the
//     `getCurrentScope()`/`onScopeDispose(dispose)` wiring; it constructs the core
//     lazily once the canvas resolves and delegates the schedule to it.

import {
    getCurrentScope,
    onScopeDispose,
    toValue,
    type MaybeRefOrGetter,
} from "vue";
import {
    createCanvasLifecycle,
    type CanvasFrameHooks,
    type CanvasLifecycleHandle,
} from "../webgl/createCanvasLifecycle";

/**
 * The suspend reasons that gate the loop. Twins the WebGL substrate's union
 * (`createCanvasLifecycle.CanvasSuspendReason`): the AX.W16 F6 `"off-screen-io"`
 * key is the IntersectionObserver fallback's OWN reason, distinct from the
 * content-visibility path's `"off-screen"`, so the two offscreen detectors never
 * cross-lift each other's suspend.
 */
export type Canvas2DSuspendReason =
    | "tab-hidden"
    | "off-screen"
    | "off-screen-io"
    | "manual";

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

/**
 * The Canvas2D lifecycle substrate — the park/freeze/dispose twin of
 * `useWebGLCanvas`, a thin Canvas2D backend over the shared
 * `createCanvasLifecycle` core. Returns an imperative {@link Canvas2DHandle} (the
 * same handle idiom the WebGL twin uses — an imperative canvas seam is NOT a
 * ref-bundle). `useCanvasLifecycle` is the alias-of-record for the lifecycle-only
 * framing; both name the same factory.
 */
export function useCanvas2D(options: Canvas2DOptions): Canvas2DHandle {
    const {
        setup,
        autoStart = true,
        contextAttrs,
        rootMargin = DEFAULT_ROOT_MARGIN,
    } = options;
    const respectReducedMotion = options.respectReducedMotion ?? true;
    const resolveCanvas = (): HTMLCanvasElement | null => toValue(options.canvas);

    const hasWindow = typeof window !== "undefined";

    let ctx: CanvasRenderingContext2D | null = null;
    let hooks: Canvas2DFrame | null = null;
    let lifecycle: CanvasLifecycleHandle | null = null;
    let disposed = false;

    // ── backend observers (the 2D-specific seams the core threads through
    // buildContext; the core owns the schedule, the suspend Set, the visibility
    // owner, the content-visibility park, and the reduced-motion re-monitor). ──
    let ro: ResizeObserver | null = null;
    let io: IntersectionObserver | null = null;
    // `true` only during the core's initial arm resize, so resizeTo defers the
    // first paint to the core's own static-or-loop decision (no double-paint at
    // startup). The continuous RO resizes (arming false) repaint a parked surface.
    let arming = false;

    /** Paint ONE static frame out of loop (post-resize-while-parked). */
    function paintStatic(): void {
        if (ctx && hooks) hooks.render(ctx, hasWindow ? performance.now() : 0);
    }

    function resizeTo(canvas: HTMLCanvasElement): void {
        if (!ctx) return;
        const w = canvas.clientWidth || canvas.offsetWidth || 0;
        const h = canvas.clientHeight || canvas.offsetHeight || 0;
        if (!w || !h) return;
        const dpr = Math.min((hasWindow && window.devicePixelRatio) || 1, 2);
        const nextW = Math.round(w * dpr);
        const nextH = Math.round(h * dpr);
        // Idempotent (twins the leaf `sizeBacking` `changed` guard): a same-box tick
        // — the leaf's presize double-rAF layout-settle defense fires `resize()`
        // twice on a stable box, and a same-size RO/wake tick costs nothing — must
        // NOT re-alloc (which clears the buffer) NOR repaint. Without this guard the
        // presize defense painted two extra static frames under reduced-motion (the
        // "exactly ONE static frame" contract breach) and cleared the live buffer on
        // a no-op tick. The backing only changes (and only then repaints) on a genuine
        // box change.
        const changed = canvas.width !== nextW || canvas.height !== nextH;
        if (changed) {
            canvas.width = nextW;
            canvas.height = nextH;
        }
        // The transform must be (re)applied whenever we (re)allocated the buffer
        // (a width/height write resets the 2D transform to identity).
        if (changed) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // A parked surface (offscreen / reduced) repaints one static frame so a
        // resize does not leave a stale or blank canvas — but NOT during the
        // initial arm (the core's own first-paint owns that), NOT while the live
        // loop is running (the next tick paints the new size), and NOT on an
        // idempotent same-box tick (nothing to repaint). "Parked" = the loop is not
        // actively scheduling, which the core's getters expose: suspend-set non-empty
        // OR reduced-motion (where running is true but the loop draws a single static
        // frame, not a perpetual one).
        const parked = !lifecycle || !lifecycle.running || lifecycle.reducedMotion;
        if (changed && !arming && parked) paintStatic();
    }

    function bindResize(canvas: HTMLCanvasElement): void {
        if (ro || typeof ResizeObserver === "undefined") return;
        ro = new ResizeObserver(() => {
            const c = resolveCanvas();
            if (c) resizeTo(c);
        });
        ro.observe(canvas);
    }

    // ── IntersectionObserver offscreen seam (the fallback for engines without
    // contentvisibilityautostatechange + the scrolled-offscreen case). It writes
    // its OWN "off-screen-io" reason (AX.W16 F6) so an IO resume can never lift a
    // legitimately-held content-visibility "off-screen" suspend. The content-
    // visibility path itself lives in the core (createCanvasLifecycle).
    function bindIntersection(canvas: HTMLCanvasElement): void {
        if (io || typeof IntersectionObserver === "undefined") return;
        io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting || entry.intersectionRatio > 0) {
                        lifecycle?.resume("off-screen-io");
                    } else {
                        lifecycle?.suspend("off-screen-io");
                    }
                }
            },
            { rootMargin },
        );
        io.observe(canvas);
    }

    /**
     * The Canvas2D BACKEND seam — the backend-specific concerns the agnostic core
     * threads through `buildContext`. Acquire the 2D context + run the consumer's
     * `setup` + bind the dpr-clamped RO + the IO fallback; return the core's
     * frame hooks (the time-base bridged through `time`).
     */
    function buildContext(canvas: HTMLCanvasElement): CanvasFrameHooks {
        const c2d = canvas.getContext("2d", contextAttrs);
        if (!c2d) throw new Error("[useCanvas2D] 2D context unavailable");
        ctx = c2d;
        hooks = setup(ctx);
        bindResize(canvas);
        bindIntersection(canvas);
        return {
            // The core computes `t = time(elapsed)` then calls `frame(t)`. Bridging
            // the time base: `time` returns the raw `performance.now()` ms so the
            // 2D consumer's `render(ctx, now)` receives `performance.now()` (its
            // contract), NOT the core's elapsed-seconds. No core seam change.
            frame: (now) => {
                if (ctx && hooks) hooks.render(ctx, now);
            },
            time: () => (hasWindow ? performance.now() : 0),
            // A Canvas2D field is perpetual motion — the consumer's own pointer/
            // ripple state lives in its closure, the substrate does not demand-gate
            // it. So the loop runs until something suspends it (the core's reduced-
            // motion gate parks it after one frame independently of this).
            shouldContinue: () => true,
            teardown: () => {
                hooks?.teardown?.();
                io?.disconnect();
                io = null;
                ro?.disconnect();
                ro = null;
                ctx = null;
                hooks = null;
            },
        };
    }

    function arm(): void {
        if (lifecycle || disposed) return;
        const canvas = resolveCanvas();
        if (!canvas) return;
        // Construct the core lazily once the canvas resolves; it owns the schedule,
        // the suspend Set, the visibility owner, the content-visibility park, and
        // the reduced-motion re-monitor. The 2D concerns ride buildContext/resize.
        lifecycle = createCanvasLifecycle({
            canvas,
            respectReducedMotion,
            buildContext: () => buildContext(canvas),
            resize: () => resizeTo(canvas),
            // NO bindContextEvents — a 2D context cannot be lost the WebGL way, so
            // the core's self-heal-on-restore machinery stays unused (correct).
        });
        // The core's arm runs buildContext + resize + the schedule decision; guard
        // the initial resize from the parked-static-repaint (arm's own first-paint
        // owns it).
        arming = true;
        lifecycle.arm();
        arming = false;
    }

    function suspend(reason: Canvas2DSuspendReason = "manual"): void {
        lifecycle?.suspend(reason);
    }

    function resume(reason: Canvas2DSuspendReason = "manual"): void {
        lifecycle?.resume(reason);
    }

    function wake(): void {
        lifecycle?.wake();
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        // The core disconnects its own observers + listeners + cancels the rAF +
        // calls our teardown (which disconnects the RO + IO and nulls ctx/hooks).
        lifecycle?.dispose();
        lifecycle = null;
    }

    if (autoStart) {
        // arm runs straight through if the ref is already populated; a synchronous
        // arm with a null canvas is a graceful no-op the consumer follows with an
        // explicit `arm()` once mounted.
        arm();
    }

    if (getCurrentScope()) onScopeDispose(dispose);

    return {
        arm,
        suspend,
        resume,
        wake,
        dispose,
        isRunning: () => lifecycle?.running ?? false,
        get ctx() {
            return ctx;
        },
        get reducedMotion() {
            return lifecycle?.reducedMotion ?? false;
        },
    };
}

/**
 * Alias-of-record for {@link useCanvas2D} — the lifecycle-only framing (the
 * park/freeze/dispose machinery, paralleling the WebGL substrate's
 * `createCanvasLifecycle`). Same factory, same handle; reach for this name when
 * the lifecycle (not the 2D drawing) is the consumer's emphasis.
 */
export const useCanvasLifecycle = useCanvas2D;
