import {
    computed,
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    watch,
    type Ref,
} from "vue";
// The INP-under-load lever is surfaced on the loop controls so a frame
// callback doing heavy chunked work can yield to the main thread between chunks
// (`await controls.yieldToMain()`) without blocking input/paint. Both leaves are
// engine-free (`/motion-core`), so this import introduces no keyframes/vueuse
// edge.
import { yieldToMain } from "./useYieldToMain";
import { useReducedMotion } from "./useReducedMotion";
// Shared `visibilitychange` leaf (engine-free, Vue-only): the
// single source for the document-visibility listener the motion composables
// share. Imported directly (not via the dom/ barrel) so it
// stays off the public root surface.
import { useDocumentVisibility } from "../../dom/useDocumentVisibility";

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
    /**
     * Yield to the main thread between chunks of heavy per-frame work (the INP
     * lever). Native `scheduler.yield()` when available, else a MessageChannel/
     * setTimeout fallback. `await` it inside the frame callback when a single
     * frame's work would otherwise block input/paint. See {@link yieldToMain}.
     */
    yieldToMain: () => Promise<void>;
}

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
    const reducedPreference = respectReducedMotion ? useReducedMotion() : ref(false);
    const isReducedMotion = computed(() => reducedPreference.value);
    // Seeded from the visibility leaf below when `pauseWhenHidden`; `false` otherwise.
    const isDocumentHidden = ref(false);
    const isRequested = ref(false);
    const isManuallyPaused = ref(false);

    const isPaused = computed(
        () =>
            isRequested.value &&
            !isActive.value &&
            (isManuallyPaused.value ||
                isDocumentHidden.value ||
                isReducedMotion.value ||
                !getRequestAnimationFrame()),
    );

    let rafId: number | null = null;
    let lastFrameTime: number | null = null;
    let elapsed = 0;
    let frame = 0;
    let disposed = false;
    let stopReducedMotionWatch: (() => void) | null = null;
    let stopVisibilityWatch: (() => void) | null = null;
    let disposeVisibility: (() => void) | null = null;

    function canRun(): boolean {
        return (
            !disposed &&
            isRequested.value &&
            !isManuallyPaused.value &&
            !isDocumentHidden.value &&
            !isReducedMotion.value &&
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

            const delta = lastFrameTime === null ? 0 : Math.max(0, now - lastFrameTime);
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

    if (pauseWhenHidden) {
        const visibility = useDocumentVisibility();
        const { hidden } = visibility;
        disposeVisibility = visibility.dispose;
        isDocumentHidden.value = hidden.value;
        // `flush: 'sync'` so the visibility reaction is synchronous — matching
        // a native `visibilitychange` listener's timing exactly.
        stopVisibilityWatch = watch(
            hidden,
            (next) => {
                isDocumentHidden.value = next;
                syncLoop();
            },
            { flush: "sync" },
        );
    }

    stopReducedMotionWatch = watch(isReducedMotion, syncLoop, { flush: "sync" });

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        stop();
        stopVisibilityWatch?.();
        stopVisibilityWatch = null;
        disposeVisibility?.();
        disposeVisibility = null;
        stopReducedMotionWatch?.();
        stopReducedMotionWatch = null;
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
        isReducedMotion,
        start,
        stop,
        pause,
        resume,
        dispose,
        yieldToMain,
    };
}
