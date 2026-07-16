import {
    computed,
    onBeforeUnmount,
    onMounted,
    readonly,
    ref,
    shallowRef,
    watch,
    type Ref,
} from "vue";
import { createAurora, type AuroraRuntime, type AuroraRuntimeOptions } from "./runtime";
import { asGetter, type ConfigSource } from "./configSource";
import { useIntersectionPause } from "../../../composables/motion/useIntersectionPause";
import { useScrollProgress } from "../../../composables/motion/useScrollProgress";
import type { AuroraConfig } from "../constants/presets";
import {
    cssRenderer,
    pendingRenderer,
    rendererFailure,
    type RendererStatus,
} from "../../../composables/glass/webgpu/rendererStatus";

/**
 * Adaptive-substrate options threaded down from `Aurora.vue`. `"webgl"` is the
 * historical name of the animated GPU mode; the runtime itself prefers WebGPU
 * and uses its supported WebGL2 path when acquisition cannot start.
 */
export interface UseAuroraAdaptiveOptions {
    /**
     * Resolved render substrate. `"css"` short-circuits GPU initialization and
     * keeps the `Aurora.vue` placeholder as the permanent surface. `"webgl"`
     * (default) arms the deferred GPU runtime.
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
     * `true` once the GPU runtime has armed (device/context ready and first
     * frame drawable). `Aurora.vue` watches this to cross-fade the canvas in
     * over the static palette ground. It stays false through asynchronous device
     * acquisition and flips only when the backend readiness promise resolves.
     */
    isArmed: Readonly<Ref<boolean>>;
    rendererStatus: Readonly<Ref<RendererStatus>>;
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
 * a cheap, un-armed instance and expensive GPU initialization is deferred past first paint via
 * `requestIdleCallback`, gated on the canvas's first viewport intersection
 * (composing `useIntersectionPause`). `Aurora.vue` paints a palette-derived
 * placeholder under the canvas so the consumer's first paint is never blocked
 * on the shader. Capture / `initStrategy: "eager"` consumers begin acquisition
 * immediately and skip the defer; readiness still awaits the backend.
 *
 * Init failures remain explicit through `rendererStatus`. An optional
 * `onInitError` receives the attributed error; `Aurora.vue` adapts Vue's app
 * error handler into that seam when present. The wrapper awaits backend
 * readiness before exposing the live canvas and leaves the palette ground in
 * place on failure.
 */
export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    configSource: ConfigSource<AuroraConfig>,
    runtimeOptions: AuroraRuntimeOptions = {},
    adaptiveOptions: UseAuroraAdaptiveOptions = {},
): UseAuroraReturn {
    const getCfg = asGetter(configSource);
    // `"css"` (resolved by `Aurora.vue`) means: never arm the GPU path. The
    // construction below is skipped and the placeholder is the permanent
    // surface. `"webgl"` (default) arms the deferred GPU path.
    const cssOnly = adaptiveOptions.renderMode === "css";
    let inst: AuroraRuntime | null = null;
    let stopWatch: (() => void) | null = null;
    let stopArmWatch: (() => void) | null = null;
    let stopScrollWatch: (() => void) | null = null;
    let cancelSchedule: (() => void) | null = null;
    let intersection: ReturnType<typeof useIntersectionPause> | null = null;
    // Guards a single arm attempt (success OR failure both consume it).
    let armAttempted = false;
    // Exposed to `Aurora.vue` so it can cross-fade the canvas in over the
    // static gradient placeholder once the GPU runtime is live. Stays `false`
    // on init failure — the placeholder then remains as the unavailable-runtime
    // visual fallback (HA4 §1.5).
    const isArmed = ref(false);
    const rendererStatus = shallowRef<RendererStatus>(
        cssOnly ? cssRenderer() : pendingRenderer("webgl2"),
    );
    const scrollEnabled = computed(
        () => !cssOnly && getCfg().interactivity?.scroll === true,
    );
    // Composables must register during setup, not after asynchronous GPU arm.
    // Aurora consumes the numeric value in shader time, so it requests the live
    // reader even on browsers where CSS timelines exist.
    const scrollProgress = useScrollProgress({
        target: canvasRef,
        trackExit: true,
        reactive: true,
        enabled: scrollEnabled,
    });
    stopScrollWatch = watch(
        scrollProgress,
        (progress) => inst?.setScrollProgress(progress),
        { flush: "sync" },
    );

    // Capture mode forces eager; an explicit "eager" strategy does too. Any
    // other case takes the deferred path.
    const eager =
        runtimeOptions.mode === "capture" || runtimeOptions.initStrategy === "eager";

    /** Publish one attributed init failure and notify the installed owner. */
    function surfaceInitError(err: unknown): void {
        const error = err instanceof Error ? err : new Error(String(err));
        rendererStatus.value = rendererFailure(
            rendererStatus.value.engine,
            rendererStatus.value.adapter,
            error,
        );
        runtimeOptions.onInitError?.(error);
    }

    /** Resolve the actual device/context before exposing the live canvas. */
    async function armRuntime(): Promise<void> {
        if (armAttempted || !inst) return;
        armAttempted = true;
        const runtime = inst;
        try {
            await runtime.armAsync();
        } catch (err) {
            // The substrate publishes attributed setup/pipeline failure before
            // rejecting. Only synthesize it when a direct runtime failed first.
            if (rendererStatus.value.phase !== "error") surfaceInitError(err);
            return;
        }
        if (inst !== runtime || rendererStatus.value.engine === "css") return;
        isArmed.value = true;

        // BI.W-AURORA-VIBRANCY (GAP-ARM) — the cold-load arm-replay. On the DEFERRED path
        // the instance is CONSTRUCTED with `getCfg()` at mount but `arm()` runs later (past
        // first paint, gated on intersection). A config change in THAT window — a preset
        // switch before the canvas armed — is captured neither by construction (stale) nor
        // by the NON-immediate watch below (it only fires on the NEXT change). One honest
        // replay of the CURRENT config seats it, closing the silently-dropped-change gap.
        runtime.update(getCfg());
        runtime.setScrollProgress(scrollProgress.value);

        stopWatch = watch(getCfg, (next) => runtime.update(next), { deep: true });
    }

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;

        // Adaptive substrate `"css"`: never arm the GPU runtime. We skip runtime
        // construction, the intersection gate, and the idle arm schedule
        // entirely — `inst` stays null, `isArmed` stays false, and `Aurora.vue`
        // keeps the `paletteToCssGradient` placeholder as the permanent warm
        // wash. No GPU context is created on this path.
        if (cssOnly) return;

        // Construction is cheap; backend acquisition remains behind armAsync.
        try {
            inst = createAurora(canvas, getCfg(), {
                // Deferred is the default; an explicit field still wins.
                initStrategy: "deferred",
                ...runtimeOptions,
                onRendererStatus: (status) => {
                    rendererStatus.value = status;
                    isArmed.value = status.phase === "ready";
                    runtimeOptions.onRendererStatus?.(status);
                },
            });
        } catch (err) {
            // A direct construction failure still enters the same attributed
            // status/callback channel as asynchronous backend failure.
            surfaceInitError(err);
            return;
        }

        if (eager) {
            // Reuse the idempotent device-ready promise already in flight.
            void armRuntime();
            return;
        }

        // Deferred path. The pre-arm observer writes only `"off-screen-io"`,
        // distinct from the shared lifecycle's content-visibility `"off-screen"`.
        // Document visibility remains the runtime's concern (it
        // owns the lifted `"tab-hidden"` listener), so we disable this
        // observer's own visibility arm with `pauseWhenHidden: false`; exactly
        // one observer writes each reason and they never alias. We additionally
        // watch its `isIntersecting` ref so the FIRST intersection triggers the
        // post-first-paint idle-callback that actually arms the GL path — the
        // shader never compiles while the canvas is off-screen.
        intersection = useIntersectionPause(
            canvasRef,
            {
                pause: () => inst?.pause("off-screen-io"),
                resume: () => inst?.resume("off-screen-io"),
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
                    // Arm the GPU path PAST first paint (the CSS
                    // placeholder already painted). Re-check visibility — an
                    // Aurora the observer later reports off-screen is not armed
                    // until it genuinely intersects.
                    if (!visibility.value) return; // still off-screen — re-trigger later
                    void armRuntime();
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
        rendererStatus: readonly(rendererStatus),
    };
}
