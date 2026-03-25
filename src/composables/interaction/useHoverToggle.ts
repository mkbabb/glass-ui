import { ref, computed, onBeforeUnmount } from "vue";
import type { Ref, ComputedRef } from "vue";

export interface UseHoverToggleOptions {
    /** Delay before auto-collapse after mouse leaves (ms) */
    collapseDelay?: number;
    /** If true, clicking toggles persistent open state; clicking elsewhere collapses */
    persistOnClick?: boolean;
    /** If true, starts expanded */
    startExpanded?: boolean;
}

export interface UseHoverToggleReturn {
    isExpanded: Ref<boolean>;
    isPinned: Ref<boolean>;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClickToggle: () => void;
    onClickOutside: () => void;
    /** Bind all listeners to a container element */
    containerProps: ComputedRef<Record<string, Function>>;
}

export function useHoverToggle(options: UseHoverToggleOptions = {}): UseHoverToggleReturn {
    const {
        collapseDelay = 2500,
        persistOnClick = true,
        startExpanded = false,
    } = options;

    const isExpanded = ref(startExpanded);
    const isPinned = ref(false);
    let collapseTimer: ReturnType<typeof setTimeout> | null = null;

    function clearTimer() {
        if (collapseTimer) {
            clearTimeout(collapseTimer);
            collapseTimer = null;
        }
    }

    function scheduleCollapse() {
        clearTimer();
        collapseTimer = setTimeout(() => {
            isExpanded.value = false;
        }, collapseDelay);
    }

    function onMouseEnter() {
        clearTimer();
        isExpanded.value = true;
    }

    function onMouseLeave() {
        if (!isPinned.value) {
            scheduleCollapse();
        }
    }

    function onClickToggle() {
        if (persistOnClick) {
            if (isPinned.value) {
                isPinned.value = false;
                scheduleCollapse();
            } else {
                isPinned.value = true;
                isExpanded.value = true;
                clearTimer();
            }
        } else {
            clearTimer();
            isExpanded.value = !isExpanded.value;
            if (isExpanded.value) {
                scheduleCollapse();
            }
        }
    }

    function onClickOutside() {
        if (isPinned.value) {
            isPinned.value = false;
        }
        isExpanded.value = false;
        clearTimer();
    }

    const containerProps = computed(() => ({
        onMouseenter: onMouseEnter,
        onMouseleave: onMouseLeave,
    }));

    onBeforeUnmount(clearTimer);

    return {
        isExpanded,
        isPinned,
        onMouseEnter,
        onMouseLeave,
        onClickToggle,
        onClickOutside,
        containerProps,
    };
}
