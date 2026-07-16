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
//   - CSS-PIXEL DRAWING — the shared lifecycle sizes the backing store and hands
//     this adapter a `BackingSize`; the adapter applies the DPR transform and
//     repaints a genuinely resized parked surface once.
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
    type BackingSize,
    type CanvasFrameHooks,
    type CanvasLifecycleHandle,
    type DprPolicy,
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
    /**
     * Backing-store DPR policy. Defaults to the existing Canvas2D ceiling:
     * `min(devicePixelRatio, 2)`.
     */
    dprPolicy?: DprPolicy;
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
    const dprPolicy: DprPolicy =
        options.dprPolicy ??
        (() => Math.min((hasWindow && window.devicePixelRatio) || 1, 2));

    let ctx: CanvasRenderingContext2D | null = null;
    let hooks: Canvas2DFrame | null = null;
    let lifecycle: CanvasLifecycleHandle | null = null;
    let disposed = false;

    /** Paint ONE static frame out of loop (post-resize-while-parked). */
    function paintStatic(): void {
        if (ctx && hooks) hooks.render(ctx, hasWindow ? performance.now() : 0);
    }

    function resizeTo(size: BackingSize): void {
        if (!ctx) return;
        // Presize can allocate the backing before the 2D context exists, so apply the
        // transform on every upload. This is cheap and guarantees a newly acquired
        // context draws in CSS pixels even when the backing size is already current.
        ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
        // A parked surface (offscreen / reduced) repaints one static frame so a
        // resize does not leave a stale or blank canvas. A live loop paints on its
        // next tick; an idempotent same-box observation needs no repaint.
        const parked =
            lifecycle !== null &&
            (!lifecycle.running || lifecycle.reducedMotion);
        if (size.changed && parked) paintStatic();
    }

    /**
     * The Canvas2D BACKEND seam — the backend-specific concerns the agnostic core
     * threads through `buildContext`. Acquire the 2D context + run the consumer's
     * `setup` and return the core's frame hooks. Resize and offscreen observers
     * are owned by `createCanvasLifecycle`.
     */
    function buildContext(canvas: HTMLCanvasElement): CanvasFrameHooks {
        const c2d = canvas.getContext("2d", contextAttrs);
        if (!c2d) throw new Error("[useCanvas2D] 2D context unavailable");
        ctx = c2d;
        hooks = setup(ctx);
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
            dprPolicy,
            composeIntersectionPark: true,
            intersectionRootMargin: rootMargin,
            resize: (size) => resizeTo(size!),
            // NO bindContextEvents — a 2D context cannot be lost the WebGL way, so
            // the core's self-heal-on-restore machinery stays unused (correct).
        });
        lifecycle.arm();
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
        // The core disconnects its observers + listeners, cancels the rAF, and calls
        // our backend teardown.
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
