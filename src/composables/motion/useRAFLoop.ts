import {
    computed,
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    type Ref,
} from "vue";

export interface RAFLoopTiming {
    /** Current frame timestamp from requestAnimationFrame. */
    now: number;
    /** Milliseconds since the previous delivered frame. First frame is 0. */
    delta: number;
    /** Accumulated running time, excluding paused time. */
    elapsed: number;
    /** Delivered frame count since the last start(), zero-based. */
    frame: number;
}

export type RAFLoopCallback = (timing: RAFLoopTiming) => void;

export interface UseRAFLoopOptions {
    /** Start the loop immediately. Default true. */
    immediate?: boolean;
    /** Stop scheduling frames while document.hidden is true. Default true. */
    pauseWhenHidden?: boolean;
    /** Honor prefers-reduced-motion by pausing the loop. Default true. */
    respectReducedMotion?: boolean;
}

export interface RAFLoopControls {
    /** True while a frame is scheduled or being delivered. */
    readonly isActive: Readonly<Ref<boolean>>;
    /** True when the loop was requested but is paused by controls or environment. */
    readonly isPaused: Readonly<Ref<boolean>>;
    /** Current prefers-reduced-motion state when monitored. */
    readonly isReducedMotion: Readonly<Ref<boolean>>;
    /** Request frame delivery, resetting elapsed/frame counters. */
    start: () => void;
    /** Stop frame delivery and clear elapsed/frame counters. */
    stop: () => void;
    /** Temporarily pause frame delivery without clearing counters. */
    pause: () => void;
    /** Resume a paused loop if start() has been requested. */
    resume: () => void;
    /** Stop the loop and detach document/media listeners. */
    dispose: () => void;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type LegacyMediaQueryList = MediaQueryList & {
    addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

function getRequestAnimationFrame(): typeof requestAnimationFrame | null {
    return typeof globalThis.requestAnimationFrame === "function"
        ? globalThis.requestAnimationFrame.bind(globalThis)
        : null;
}

function getCancelAnimationFrame(): typeof cancelAnimationFrame | null {
    return typeof globalThis.cancelAnimationFrame === "function"
        ? globalThis.cancelAnimationFrame.bind(globalThis)
        : null;
}

function getDocument(): Document | null {
    return typeof document === "undefined" ? null : document;
}

function getWindow(): Window | null {
    return typeof window === "undefined" ? null : window;
}

/**
 * Scope-aware requestAnimationFrame loop with manual controls plus document
 * visibility and reduced-motion gates.
 */
export function useRAFLoop(
    callback: RAFLoopCallback,
    options: UseRAFLoopOptions = {},
): RAFLoopControls {
    const {
        immediate = true,
        pauseWhenHidden = true,
        respectReducedMotion = true,
    } = options;

    const isActive = ref(false);
    const isReducedMotion = ref(false);
    const isDocumentHidden = ref(
        pauseWhenHidden ? Boolean(getDocument()?.hidden) : false,
    );
    const isRequested = ref(false);
    const isManuallyPaused = ref(false);

    const isPaused = computed(
        () =>
            isRequested.value &&
            !isActive.value &&
            (isManuallyPaused.value ||
                isDocumentHidden.value ||
                (respectReducedMotion && isReducedMotion.value) ||
                !getRequestAnimationFrame()),
    );

    let rafId: number | null = null;
    let lastFrameTime: number | null = null;
    let elapsed = 0;
    let frame = 0;
    let disposed = false;
    let removeReducedMotionListener: (() => void) | null = null;

    function canRun(): boolean {
        return (
            !disposed &&
            isRequested.value &&
            !isManuallyPaused.value &&
            !isDocumentHidden.value &&
            !(respectReducedMotion && isReducedMotion.value) &&
            Boolean(getRequestAnimationFrame())
        );
    }

    function cancelScheduledFrame(): void {
        if (rafId !== null) {
            getCancelAnimationFrame()?.(rafId);
            rafId = null;
        }
        isActive.value = false;
        lastFrameTime = null;
    }

    function scheduleNextFrame(): void {
        if (rafId !== null || !canRun()) return;
        const requestFrame = getRequestAnimationFrame();
        if (!requestFrame) return;

        isActive.value = true;
        rafId = requestFrame((now) => {
            rafId = null;
            if (!canRun()) {
                cancelScheduledFrame();
                return;
            }

            const delta =
                lastFrameTime === null ? 0 : Math.max(0, now - lastFrameTime);
            lastFrameTime = now;
            elapsed += delta;
            callback({ now, delta, elapsed, frame: frame++ });

            if (canRun()) {
                scheduleNextFrame();
            } else {
                cancelScheduledFrame();
            }
        });
    }

    function syncLoop(): void {
        if (canRun()) {
            scheduleNextFrame();
        } else {
            cancelScheduledFrame();
        }
    }

    function resetTiming(): void {
        lastFrameTime = null;
        elapsed = 0;
        frame = 0;
    }

    function start(): void {
        if (disposed) return;
        resetTiming();
        isRequested.value = true;
        isManuallyPaused.value = false;
        syncLoop();
    }

    function stop(): void {
        isRequested.value = false;
        isManuallyPaused.value = false;
        resetTiming();
        cancelScheduledFrame();
    }

    function pause(): void {
        if (!isRequested.value) return;
        isManuallyPaused.value = true;
        syncLoop();
    }

    function resume(): void {
        if (disposed) return;
        isManuallyPaused.value = false;
        syncLoop();
    }

    function onVisibilityChange(): void {
        isDocumentHidden.value = pauseWhenHidden
            ? Boolean(getDocument()?.hidden)
            : false;
        syncLoop();
    }

    const doc = getDocument();
    if (doc && pauseWhenHidden) {
        doc.addEventListener("visibilitychange", onVisibilityChange);
    }

    if (respectReducedMotion) {
        const win = getWindow();
        const mediaQuery =
            typeof win?.matchMedia === "function"
                ? (win.matchMedia(REDUCED_MOTION_QUERY) as LegacyMediaQueryList)
                : null;

        if (mediaQuery) {
            const onReducedMotionChange = (event: MediaQueryListEvent) => {
                isReducedMotion.value = event.matches;
                syncLoop();
            };

            isReducedMotion.value = mediaQuery.matches;
            if (typeof mediaQuery.addEventListener === "function") {
                mediaQuery.addEventListener("change", onReducedMotionChange);
                removeReducedMotionListener = () =>
                    mediaQuery.removeEventListener(
                        "change",
                        onReducedMotionChange,
                    );
            } else if (typeof mediaQuery.addListener === "function") {
                mediaQuery.addListener(onReducedMotionChange);
                removeReducedMotionListener = () =>
                    mediaQuery.removeListener?.(onReducedMotionChange);
            }
        }
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        stop();
        doc?.removeEventListener("visibilitychange", onVisibilityChange);
        removeReducedMotionListener?.();
        removeReducedMotionListener = null;
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    if (immediate) {
        start();
    }

    return {
        isActive: readonly(isActive),
        isPaused: readonly(isPaused),
        isReducedMotion: readonly(isReducedMotion),
        start,
        stop,
        pause,
        resume,
        dispose,
    };
}
