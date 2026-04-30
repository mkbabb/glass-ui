import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    type Ref,
} from "vue";

export interface UseTimerOptions {
    /** Start the timeout immediately. Default: true. */
    immediate?: boolean;
}

export interface UseTimerControls {
    /** True while a timeout is pending. */
    readonly isActive: Readonly<Ref<boolean>>;
    /** Schedule the timeout, replacing any pending timeout. */
    start: (delay?: number) => void;
    /** Alias for start(). */
    restart: (delay?: number) => void;
    /** Cancel the pending timeout. */
    stop: () => void;
    /** Alias for stop(), useful when replacing clearTimeout(). */
    clear: () => void;
}

/**
 * Vue-scope-aware setTimeout replacement.
 *
 * Safe to call outside setup/effect scopes. In a scope it auto-cleans on
 * disposal; outside a scope callers use the returned controls explicitly.
 */
export function useTimer(
    callback: () => void,
    delay = 0,
    options: UseTimerOptions = {},
): UseTimerControls {
    const isActive = ref(false);
    let currentDelay = delay;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const stop = () => {
        if (timerId === null) return;

        clearTimeout(timerId);
        timerId = null;
        isActive.value = false;
    };

    const start = (nextDelay = currentDelay) => {
        currentDelay = nextDelay;
        stop();
        isActive.value = true;
        timerId = setTimeout(() => {
            timerId = null;
            isActive.value = false;
            callback();
        }, currentDelay);
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
