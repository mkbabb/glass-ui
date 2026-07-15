import {
    onBeforeUnmount,
    onMounted,
    readonly,
    ref,
    watch,
    type Ref,
} from "vue";
import {
    createAurora,
    type AuroraRuntime,
    type AuroraRuntimeOptions,
} from "./runtime";
import { asGetter, type ConfigSource } from "./configSource";
import { useIntersectionPause } from "../../../composables/motion/useIntersectionPause";
import { useScrollProgress } from "../../../composables/motion/useScrollProgress";
import type { AuroraConfig } from "../constants/presets";

/**
 * Adaptive-substrate options threaded down from `Aurora.vue` (AM.W1). The
 * render mode is the RESOLVED concrete substrate (`"auto"` already collapsed
 * to `"webgl"`/`"css"` at the component boundary via `resolveRenderMode`).
 */
export interface UseAuroraAdaptiveOptions {
    /**
     * Resolved render substrate. `"css"` short-circuits the WebGL arm schedule
     * entirely — no webgl2 context is ever created; the `Aurora.vue`
     * placeholder stays the permanent surface. `"webgl"` (default) arms the
     * deferred WebGL path as before.
     */
    renderMode?: "webgl" | "css";
}

/**
 * Public return shape of {@link useAurora}.
 *
 * O.W4 Lane B — Fix 2 (Rγ L2): authored to replace the previous anonymous
 * inline-typed literal. Parallels sibling composable return interfaces
 * (`ConfiguratorState<T>`, `SidebarState`, `UseSortableReturn`); consumers
 * can now annotate variables holding `useAurora` results without reaching
 * for `ReturnType<typeof useAurora>`.
 *
 * NOT a /api discovery-surface candidate (per /api preamble: composable
 * option/return types change with implementation). Exposed only via the
 * `@mkbabb/glass-ui/aurora` package barrel.
 */
export interface UseAuroraReturn {
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    setCursorRadius: (r: number) => void;
    renderAt: (t: number) => void;
    pause: () => void;
    resume: () => void;
    /**
     * `true` once the WebGL runtime has armed (shader compiled + linked, first
     * frame drawable). `Aurora.vue` watches this to cross-fade the canvas in
     * over the static CSS-gradient placeholder. Eager / capture consumers see
     * it flip `true` synchronously within `onMounted`; deferred consumers see
     * it flip on the post-first-paint idle tick.
     */
    isArmed: Readonly<Ref<boolean>>;
}

/**
 * Schedule `task` to run once the browser has committed first paint and is
 * idle — a library-owned, post-paint deferral (memory `feedback_library_gaps`:
 * a consumer must never wrap a library primitive in a scheduler; glass-ui owns
 * the scheduling). `requestIdleCallback` is the idiomatic primitive; Safari
 * (no `requestIdleCallback`) falls back to a double `requestAnimationFrame`
 * chained to a `setTimeout(0)` macrotask, which likewise lands after the commit.
 *
 * Returns a cancel function so an unmount before the callback fires tears the
 * pending work down cleanly.
 */
function scheduleAfterFirstPaint(task: () => void): () => void {
    if (typeof window === "undefined") {
        // SSR / non-browser — nothing to schedule.
        return () => {};
    }
    if (typeof window.requestIdleCallback === "function") {
        // Cap the idle wait so a perpetually-busy main thread still arms.
        const handle = window.requestIdleCallback(() => task(), {
            timeout: 2000,
        });
        return () => window.cancelIdleCallback?.(handle);
    }
    // Safari fallback: a single rAF callback runs *before* the frame's paint
    // commit — too early. A second rAF lands at the start of the next frame,
    // strictly after the prior frame committed; the nested setTimeout(0)
    // yields one more macrotask so the arm work does not compete with paint.
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    raf = requestAnimationFrame(() => {
        if (cancelled) return;
        raf = requestAnimationFrame(() => {
            if (cancelled) return;
            timer = setTimeout(() => {
                if (!cancelled) task();
            }, 0);
        });
    });
    return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
        if (timer !== undefined) clearTimeout(timer);
    };
}

/**
 * Vue-side wrapper for the imperative `createAurora` runtime.
 *
 * Accepts the config as a plain object, a ref, or a getter. Internally we
 * watch it deeply with `{ deep: true }` so both:
 *   (a) parent swaps the reference (e.g. preset switch), and
 *   (b) parent mutates the reactive object (slider drag),
 * trigger a uniform re-upload. Passing a raw object works for single-config
 * use; passing a getter or ref works for preset-switch scenarios.
 *
 * Lazy-arm: by default (`initStrategy: "deferred"`) `createAurora` constructs
 * a cheap, un-armed instance and the expensive WebGL init (shader compile +
 * GPU link — the dominant synchronous cost) is deferred past first paint via
 * `requestIdleCallback`, gated on the canvas's first viewport intersection
 * (composing `useIntersectionPause`). `Aurora.vue` paints a CSS-gradient
 * placeholder under the canvas so the consumer's first paint is never blocked
 * on the shader. Capture / `initStrategy: "eager"` consumers arm synchronously
 * inside `createAurora` and skip the defer entirely.
 *
 * Init-failure contract (O invariant 24 — "fails explicitly by default"). A
 * WebGL2/shader-compile/link failure is a library-internal contract violation.
 * On the DEFERRED path the failure lands on an idle tick, OUTSIDE any
 * mount-time error boundary, so the consumer MUST handle it through exactly one
 * of three paths:
 *   1. pass an `onInitError(err)` handler in `runtimeOptions` (the explicit
 *      opt-in — receives the error directly), OR
 *   2. install a Vue global `app.config.errorHandler` (the re-surfaced
 *      microtask rejection reaches it), OR
 *   3. knowingly accept the unhandled rejection (the dev console still gets it).
 * Armed deferred with NO `onInitError`, `useAurora` dev-warns ONCE so the
 * silent-by-omission case is visible. WebGL2-unavailable still throws HARD.
 */
export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    configSource: ConfigSource<AuroraConfig>,
    runtimeOptions: AuroraRuntimeOptions = {},
    adaptiveOptions: UseAuroraAdaptiveOptions = {},
): UseAuroraReturn {
    const getCfg = asGetter(configSource);
    // `"css"` (resolved by `Aurora.vue`) means: never arm the WebGL path. The
    // construction below is skipped and the placeholder is the permanent
    // surface. `"webgl"` (default) arms the deferred path exactly as before.
    const cssOnly = adaptiveOptions.renderMode === "css";
    let inst: AuroraRuntime | null = null;
    let stopWatch: (() => void) | null = null;
    let stopArmWatch: (() => void) | null = null;
    let stopScrollWatch: (() => void) | null = null;
    let cancelSchedule: (() => void) | null = null;
    let intersection: ReturnType<typeof useIntersectionPause> | null = null;
    let reducedMq: MediaQueryList | null = null;
    // Guards a single arm attempt (success OR failure both consume it).
    let armAttempted = false;
    // Dev-warn the deferred-without-onInitError contract gap exactly once.
    let warnedNoInitHandler = false;
    // Exposed to `Aurora.vue` so it can cross-fade the canvas in over the
    // static gradient placeholder once the GL runtime is live. Stays `false`
    // on init failure — the placeholder then remains as the WebGL-unavailable
    // visual fallback (HA4 §1.5).
    const isArmed = ref(false);

    // Capture mode forces eager; an explicit "eager" strategy does too. Any
    // other case takes the deferred path.
    const eager =
        runtimeOptions.mode === "capture" ||
        runtimeOptions.initStrategy === "eager";

    function onReducedChange() {
        if (reducedMq && inst) inst.setReducedMotion(reducedMq.matches);
    }

    /**
     * Surface an init failure per O invariant 24. On the deferred path the
     * failure happens on an idle tick, outside any mount-time error boundary —
     * so when no `onInitError` is supplied we re-throw on the microtask queue
     * (`Promise.reject`), which still reaches the dev console and
     * `app.config.errorHandler` (Vue installs a global rejection handler).
     * This preserves invariant 24's "fails explicitly by default" semantics
     * across the synchronous → deferred move.
     */
    function surfaceInitError(err: unknown): void {
        const error = err instanceof Error ? err : new Error(String(err));
        if (runtimeOptions.onInitError) {
            runtimeOptions.onInitError(error);
            return;
        }
        // No handler: re-surface unhandled, on the microtask queue.
        void Promise.reject(error);
    }

    /**
     * Run `inst.arm()` and wire the post-arm reactive seams (config watch,
     * reduced-motion listener). Idempotent. Init failures route through
     * `surfaceInitError`, preserving O invariant 24 on the deferred path.
     */
    function armRuntime(): void {
        if (armAttempted || !inst) return;
        armAttempted = true;
        try {
            inst.arm();
        } catch (err) {
            // fail-explicit: the deferred-path arm() failure is SURFACED via
            // surfaceInitError (onInitError or a re-raised microtask rejection),
            // and isArmed stays false so Aurora.vue keeps the CSS placeholder as
            // the WebGL-unavailable fallback. Not swallowed.
            surfaceInitError(err);
            return;
        }
        isArmed.value = true;

        // BI.W-AURORA-VIBRANCY (GAP-ARM) — the cold-load arm-replay. On the DEFERRED path
        // the instance is CONSTRUCTED with `getCfg()` at mount but `arm()` runs later (past
        // first paint, gated on intersection). A config change in THAT window — a preset
        // switch before the canvas armed — is captured neither by construction (stale) nor
        // by the NON-immediate watch below (it only fires on the NEXT change). One honest
        // replay of the CURRENT config seats it, closing the silently-dropped-change gap.
        inst.update(getCfg());

        reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMq.addEventListener("change", onReducedChange);

        stopWatch = watch(getCfg, (next) => inst?.update(next), { deep: true });

        // AW.W8.1 — scroll coupling: when interactivity.scroll is on, bind palette/
        // breath progress to scroll via the EXISTING useScrollProgress public
        // composable (no new substrate). The coupling is PRM-suppressed because it
        // routes through the runtime's reducedMotion gate — under reduce the runtime
        // ignores the nudge (the master tempo zeroes it). The progress modulates the
        // cursor radius subtly (a benign per-frame axis that does not fight the config
        // deep-watch). Only wired when the flag is on (the default stays static).
        if (getCfg().interactivity?.scroll && canvasRef.value) {
            const progress = useScrollProgress({ target: canvasRef, trackExit: true });
            stopScrollWatch = watch(progress, (p) => {
                if (!inst || inst.reducedMotion) return; // PRM-suppressed
                // Couple scroll to the cursor radius (a wide, gentle palette breathe).
                inst.setCursorRadius(0.2 + p * 0.25);
            });
        }
    }

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;

        // Adaptive substrate `"css"` (AM.W1): never arm WebGL. We skip runtime
        // construction, the intersection gate, and the idle arm schedule
        // entirely — `inst` stays null, `isArmed` stays false, and `Aurora.vue`
        // keeps the `paletteToCssGradient` placeholder as the permanent warm
        // wash. No webgl2 context is ever created on this path.
        if (cssOnly) return;

        // Construction is cheap on the deferred path (no GL work yet) and
        // throws on the eager path exactly as before — invariant 24 holds
        // synchronously for eager / capture consumers.
        try {
            inst = createAurora(canvas, getCfg(), {
                // Deferred is the default; an explicit field still wins.
                initStrategy: "deferred",
                ...runtimeOptions,
            });
        } catch (err) {
            // fail-explicit: surface the synchronous (eager-path) init failure
            // through surfaceInitError — onInitError if provided, else re-raised
            // on the microtask queue (reaches the dev console / errorHandler).
            surfaceInitError(err);
            return;
        }

        if (eager) {
            // `createAurora` already armed synchronously. Run `armRuntime`
            // to wire the post-arm seams; `inst.arm()` inside it is an
            // idempotent no-op and `isArmed` flips `true` within onMounted.
            armRuntime();
            return;
        }

        // Deferred path: the init failure (if any) lands on an idle tick,
        // outside any mount-time error boundary. Dev-warn ONCE when no
        // `onInitError` handler is armed so the silent-by-omission case is
        // visible (the contract's three handling paths are in the JSDoc).
        if (
            import.meta.env.DEV &&
            !runtimeOptions.onInitError &&
            !warnedNoInitHandler
        ) {
            warnedNoInitHandler = true;
            console.warn(
                "[glass-ui] useAurora: deferred init armed with no onInitError handler. " +
                    "A WebGL/shader failure will re-surface as an unhandled rejection. " +
                    "Pass runtimeOptions.onInitError, install app.config.errorHandler, " +
                    "or knowingly accept the rejection.",
            );
        }

        // Deferred path. Compose `useIntersectionPause` as the SINGLE owner of
        // the viewport-intersection seam — it drives ONLY the `"off-screen"`
        // suspend reason. Document-visibility is the runtime's concern now (it
        // owns the lifted `"tab-hidden"` listener), so we disable this
        // observer's own visibility arm with `pauseWhenHidden: false`; exactly
        // one observer writes each reason and they never alias. We additionally
        // watch its `isIntersecting` ref so the FIRST intersection triggers the
        // post-first-paint idle-callback that actually arms the GL path — the
        // shader never compiles while the canvas is off-screen.
        intersection = useIntersectionPause(
            canvasRef,
            {
                pause: () => inst?.pause("off-screen"),
                resume: () => inst?.resume("off-screen"),
            },
            { pauseWhenHidden: false },
        );

        const visibility = intersection.isIntersecting;
        stopArmWatch = watch(
            visibility,
            (visible) => {
                if (!visible || armAttempted || cancelSchedule) return;
                // On-screen: schedule the expensive init past first paint.
                // `useIntersectionPause` defaults `isIntersecting` true until
                // the observer reports, so for a `fixed inset-0` Aurora this
                // fires on the first (immediate) watch tick — the idle defer
                // still wins the first-paint budget back. The idle callback
                // re-checks visibility before arming, so an Aurora that the
                // observer later reports off-screen is NOT armed until it
                // genuinely intersects (idle = the *when*, intersection =
                // the *whether* — HA4 §1.3).
                cancelSchedule = scheduleAfterFirstPaint(() => {
                    cancelSchedule = null;
                    // Arm the WebGL2 fragment path PAST first paint (the CSS
                    // placeholder already painted). Re-check visibility — an
                    // Aurora the observer later reports off-screen is not armed
                    // until it genuinely intersects.
                    if (!visibility.value) return; // still off-screen — re-trigger later
                    armRuntime();
                });
            },
            { immediate: true },
        );
    });

    onBeforeUnmount(() => {
        cancelSchedule?.();
        stopArmWatch?.();
        stopWatch?.();
        stopScrollWatch?.();
        intersection?.dispose();
        reducedMq?.removeEventListener("change", onReducedChange);
        inst?.dispose();
        inst = null;
    });

    return {
        setCursor: (x, y, strength) => inst?.setCursor(x, y, strength),
        clearCursor: () => inst?.clearCursor(),
        setCursorRadius: (r) => inst?.setCursorRadius(r),
        renderAt: (t) => inst?.renderAt(t),
        pause: () => inst?.pause(),
        resume: () => inst?.resume(),
        isArmed: readonly(isArmed),
    };
}
