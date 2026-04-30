import { ref, shallowRef, type Ref, type ShallowRef } from "vue";

interface ResidentWindowConfig {
    /** Maximum items to keep in memory. Default: 200. */
    maxResident?: number;
}

interface ResidentWindowState<T> {
    /** Currently loaded items (a sliding window of the full list). */
    items: ShallowRef<T[]>;
    /** Logical offset of `items[0]` in the full list. */
    windowStart: Ref<number>;
    /** Generation counter -- increments on each reset. Used to reject stale appends. */
    generation: Ref<number>;
    /** Append or replace items. `replace=true` resets window; `replace=false` appends with eviction from front. */
    set(newItems: T[], replace?: boolean): void;
    /** Prepend items before the current window. Evicts from the end if over `maxResident`. */
    prepend(newItems: T[], newWindowStart: number): void;
    /** Clear all items and reset window. */
    clear(): void;
    /**
     * Append items only if the generation matches (i.e., no reset happened since the fetch started).
     * Returns `true` if the append was accepted, `false` if rejected (stale).
     */
    appendIfCurrent(newItems: T[], expectedGeneration: number): boolean;
}

/**
 * Sliding-window store primitive for paginated / infinite-scroll data.
 *
 * Supports both forward (append) and backward (prepend) loading.
 * When items exceed `maxResident`, trims from the opposite end.
 *
 * Uses a generation counter to reject stale appends after a backward reset,
 * preventing race conditions between concurrent page fetches.
 */
export function useWindowedStore<T>(
    options?: ResidentWindowConfig,
): ResidentWindowState<T> {
    const maxResident = options?.maxResident ?? 200;
    const items = shallowRef<T[]>([]);
    const windowStart = ref(0);
    const generation = ref(0);

    function set(newItems: T[], replace = true) {
        if (replace) {
            items.value = [...newItems];
            windowStart.value = 0;
            generation.value++;
        } else {
            const merged = [...items.value, ...newItems];
            if (merged.length > maxResident) {
                const trimCount = merged.length - maxResident;
                items.value = merged.slice(trimCount);
                windowStart.value += trimCount;
            } else {
                items.value = merged;
            }
        }
    }

    function appendIfCurrent(newItems: T[], expectedGeneration: number): boolean {
        if (generation.value !== expectedGeneration) return false;
        set(newItems, false);
        return true;
    }

    function prepend(newItems: T[], newWindowStart: number) {
        const merged = [...newItems, ...items.value];
        windowStart.value = newWindowStart;
        generation.value++;
        if (merged.length > maxResident) {
            items.value = merged.slice(0, maxResident);
        } else {
            items.value = merged;
        }
    }

    function clear() {
        items.value = [];
        windowStart.value = 0;
        generation.value++;
    }

    return { items, windowStart, generation, set, prepend, appendIfCurrent, clear };
}
