import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";
import { createAurora, type AuroraRuntimeOptions } from "./runtime";
import { asGetter, type ConfigSource } from "./configSource";
import type { AuroraConfig, AuroraInstance } from "../presets";

/**
 * Vue-side wrapper for the imperative `createAurora` runtime.
 *
 * Accepts the config as a plain object, a ref, or a getter. Internally we
 * watch it deeply with `{ deep: true }` so both:
 *   (a) parent swaps the reference (e.g. preset switch), and
 *   (b) parent mutates the reactive object (slider drag),
 * trigger a uniform re-upload. Passing a raw object works for single-config
 * use; passing a getter or ref works for preset-switch scenarios.
 */
export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    configSource: ConfigSource<AuroraConfig>,
    runtimeOptions: AuroraRuntimeOptions = {},
): {
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    setCursorRadius: (r: number) => void;
    renderAt: (t: number) => void;
    pause: () => void;
    resume: () => void;
} {
    const getCfg = asGetter(configSource);
    let inst: AuroraInstance | null = null;
    let stopWatch: (() => void) | null = null;
    let reducedMq: MediaQueryList | null = null;

    function onReducedChange() {
        if (reducedMq && inst) inst.setReducedMotion(reducedMq.matches);
    }

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;
        try {
            inst = createAurora(canvas, getCfg(), runtimeOptions);
        } catch (err) {
            // Per O invariant 24: library-internal contract violations
            // (WebGL2 unavailable, shader compile/link failure) fail
            // explicitly. If the consumer provided `onInitError`, hand
            // the error off and leave the canvas unmounted (silent-fallback
            // opt-in). Otherwise rethrow so the failure surfaces to the
            // consumer's error boundary / dev console.
            const error = err instanceof Error ? err : new Error(String(err));
            if (runtimeOptions.onInitError) {
                runtimeOptions.onInitError(error);
                return;
            }
            throw error;
        }

        reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMq.addEventListener("change", onReducedChange);

        stopWatch = watch(
            getCfg,
            (next) => inst?.update(next),
            { deep: true },
        );
    });

    onBeforeUnmount(() => {
        stopWatch?.();
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
    };
}
