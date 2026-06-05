import { ref, watch, onUnmounted, readonly, type Ref } from "vue";

const SMOOTH_FACTOR = 0.12;

/**
 * Tracks the pointer over a host element, normalised to [-1, 1] relative to the
 * element centre, and smooths it per frame via `tick()`. On pointer-leave the
 * smoothed position decays back toward centre.
 */
export function useBlobPointer(el: Ref<HTMLElement | null>) {
    const pointer = ref({ x: 0, y: 0 });
    const active = ref(false);

    let rawX = 0;
    let rawY = 0;
    let smoothX = 0;
    let smoothY = 0;

    function onPointerMove(e: PointerEvent) {
        const target = el.value;
        if (!target) return;
        const rect = target.getBoundingClientRect();
        // Normalized to [-1, 1] relative to element center
        rawX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        rawY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        active.value = true;
    }

    function onPointerLeave() {
        active.value = false;
    }

    let cleanup: (() => void) | null = null;

    watch(
        el,
        (newEl) => {
            if (cleanup) {
                cleanup();
                cleanup = null;
            }
            if (newEl) {
                newEl.addEventListener("pointermove", onPointerMove);
                newEl.addEventListener("pointerleave", onPointerLeave);
                cleanup = () => {
                    newEl.removeEventListener("pointermove", onPointerMove);
                    newEl.removeEventListener("pointerleave", onPointerLeave);
                };
            }
        },
        { immediate: true },
    );

    onUnmounted(() => cleanup?.());

    /** Call per frame to smooth pointer position. */
    function tick() {
        if (active.value) {
            smoothX += (rawX - smoothX) * SMOOTH_FACTOR;
            smoothY += (rawY - smoothY) * SMOOTH_FACTOR;
        } else {
            // Decay toward center
            smoothX *= 1 - SMOOTH_FACTOR;
            smoothY *= 1 - SMOOTH_FACTOR;
        }
        pointer.value = { x: smoothX, y: smoothY };
    }

    return {
        pointer: readonly(pointer),
        active: readonly(active),
        tick,
    };
}

export type BlobPointer = ReturnType<typeof useBlobPointer>;
