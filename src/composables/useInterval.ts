import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    type Ref,
} from "vue";

export interface UseIntervalOptions {
    /** Start the interval immediately. Default: true. */
    immediate?: boolean;
}

export interface UseIntervalControls {
    /** True while an interval is running. */
    readonly isActive: Readonly<Ref<boolean>>;
    /** Start the interval, replacing any running interval. */
    start: (delay?: number) => void;
    /** Alias for start(). */
    restart: (delay?: number) => void;
    /** Stop the running interval. */
    stop: () => void;
    /** Alias for stop(), useful when replacing clearInterval(). */
    clear: () => void;
}

/**
 * Vue-scope-aware setInterval replacement.
 *
 * Safe to call outside setup/effect scopes. In a scope it auto-cleans on
 * disposal; outside a scope callers use the returned controls explicitly.
 */
export function useInterval(
    callback: () => void,
    delay = 0,
    options: UseIntervalOptions = {},
): UseIntervalControls {
    const isActive = ref(false);
    let currentDelay = delay;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const stop = () => {
        if (intervalId === null) return;

        clearInterval(intervalId);
        intervalId = null;
        isActive.value = false;
    };

    const start = (nextDelay = currentDelay) => {
        currentDelay = nextDelay;
        stop();
        isActive.value = true;
        intervalId = setInterval(callback, currentDelay);
    };

    if (getCurrentScope()) {
        onScopeDispose(stop);
    }

    if (options.immediate !== false) {
        start(delay);
    }

    return {
        isActive: readonly(isActive),
        start,
        restart: start,
        stop,
        clear: stop,
    };
}
