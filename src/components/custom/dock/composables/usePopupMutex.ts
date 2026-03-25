import { ref, computed, onUnmounted } from "vue";
import type { Ref, WritableComputedRef } from "vue";

export interface UsePopupMutexOptions {
    /** Delay when swapping between popups to prevent jarring transitions (ms, default: 180) */
    swapDelay?: number;
}

export interface UsePopupMutexReturn<K extends string> {
    /** Currently open popup key, or null */
    current: Ref<K | null>;
    /** Whether any popup is open or mid-swap */
    isAnyOpen: Ref<boolean>;
    /** Create a writable computed get/set for a specific popup key */
    popupModel(key: K): WritableComputedRef<boolean>;
}

/**
 * Mutex for dock popups / dropdowns: only one open at a time,
 * with a brief delay when swapping to prevent jarring transitions.
 */
export function usePopupMutex<K extends string>(
    options?: UsePopupMutexOptions,
): UsePopupMutexReturn<K> {
    const { swapDelay = 180 } = options ?? {};

    const current = ref<K | null>(null) as Ref<K | null>;
    const pending = ref<K | null>(null) as Ref<K | null>;
    let swapTimer: ReturnType<typeof setTimeout> | null = null;

    function clearSwapTimer() {
        if (swapTimer) {
            clearTimeout(swapTimer);
            swapTimer = null;
        }
    }

    function update(key: K, open: boolean) {
        if (open) {
            if (current.value === key) return;
            clearSwapTimer();

            // Swapping: close current, delay, then open new
            if (current.value && current.value !== key) {
                pending.value = key;
                current.value = null;
                swapTimer = setTimeout(() => {
                    current.value = pending.value;
                    pending.value = null;
                    swapTimer = null;
                }, swapDelay);
                return;
            }

            pending.value = null;
            current.value = key;
            return;
        }

        // Closing
        if (pending.value === key) {
            pending.value = null;
        }
        if (current.value === key) {
            current.value = null;
        }
    }

    const isAnyOpen = computed(
        () => current.value !== null || pending.value !== null,
    );

    function popupModel(key: K): WritableComputedRef<boolean> {
        return computed({
            get: () => current.value === key,
            set: (open: boolean) => update(key, open),
        });
    }

    onUnmounted(clearSwapTimer);

    return { current, isAnyOpen, popupModel };
}
