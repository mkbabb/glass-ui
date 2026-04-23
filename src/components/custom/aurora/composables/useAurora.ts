import { onBeforeUnmount, onMounted, watch, type Ref } from "vue";
import { createAurora } from "./runtime";
import type { AuroraConfig, AuroraInstance } from "../presets";

/**
 * Vue-side wrapper for the imperative `createAurora` runtime.
 *
 * Compiles the shader on mount, mirrors the reactive `config` into shader
 * uniforms via a deep `watch`, and releases the WebGL context on unmount.
 * Returns the imperative cursor/render API so the caller can wire pointer
 * events and thumbnail bakes.
 *
 * Dark-mode and reduced-motion are observed here and forwarded to the
 * runtime; the shader itself holds no opinions about either.
 */
export function useAurora(
    canvasRef: Ref<HTMLCanvasElement | null>,
    config: AuroraConfig,
): {
    instance: Ref<AuroraInstance | null>;
    setCursor: (x: number, y: number, strength?: number) => void;
    clearCursor: () => void;
    setCursorRadius: (r: number) => void;
    renderAt: (t: number) => void;
    pause: () => void;
    resume: () => void;
} {
    let inst: AuroraInstance | null = null;
    let stopWatch: (() => void) | null = null;
    let reducedMq: MediaQueryList | null = null;
    const instanceRef = { value: null } as unknown as Ref<AuroraInstance | null>;

    function onReducedChange() {
        if (reducedMq && inst) inst.setReducedMotion(reducedMq.matches);
    }

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;
        try {
            inst = createAurora(canvas, config);
        } catch (err) {
            console.warn("[Aurora]", err);
            return;
        }
        instanceRef.value = inst;

        reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
        reducedMq.addEventListener("change", onReducedChange);

        stopWatch = watch(
            () => config,
            (next) => inst?.update(next),
            { deep: true },
        );
    });

    onBeforeUnmount(() => {
        stopWatch?.();
        reducedMq?.removeEventListener("change", onReducedChange);
        inst?.dispose();
        inst = null;
        instanceRef.value = null;
    });

    return {
        instance: instanceRef,
        setCursor: (x, y, strength) => inst?.setCursor(x, y, strength),
        clearCursor: () => inst?.clearCursor(),
        setCursorRadius: (r) => inst?.setCursorRadius(r),
        renderAt: (t) => inst?.renderAt(t),
        pause: () => inst?.pause(),
        resume: () => inst?.resume(),
    };
}
