import {
    computed,
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    watch,
    type Ref,
} from "vue";
// AQ.W3 §6 — the INP-under-load lever, surfaced on the loop controls so a frame
// callback doing heavy chunked work can yield to the main thread between chunks
// (`await controls.yieldToMain()`) without blocking input/paint. Both leaves are
// engine-free (`/motion-core`), so this import introduces no keyframes/vueuse
// edge.
import { yieldToMain } from "./useYieldToMain";
// AV.W14 — the shared `visibilitychange` leaf (engine-free, vue-only): the
// single source for the document-visibility listener the motion composables
// previously hand-rolled. Imported directly (not via the dom/ barrel) so it
// stays off the public root surface.
import { useDocumentVisibility } from "../dom/useDocumentVisibility";

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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

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

    if (pauseWhenHidden) {
        const { hidden } = useDocumentVisibility();
        isDocumentHidden.value = hidden.value;
        // `flush: 'sync'` so the visibility reaction is synchronous — matches
        // the prior hand-rolled `visibilitychange` listener's timing exactly.
        watch(
            hidden,
            (next) => {
                isDocumentHidden.value = next;
                syncLoop();
            },
            { flush: "sync" },
        );
    }

    if (respectReducedMotion) {
        const win = getWindow();
        const mediaQuery =
            typeof win?.matchMedia === "function"
                ? win.matchMedia(REDUCED_MOTION_QUERY)
                : null;

        if (mediaQuery) {
            const onReducedMotionChange = (event: MediaQueryListEvent) => {
                isReducedMotion.value = event.matches;
                syncLoop();
            };

            isReducedMotion.value = mediaQuery.matches;
            // `MediaQueryList.addEventListener('change')` is the sole path (Safari
            // 14+, Baseline on the target set) — the legacy `addListener` shim was
            // COLLAPSED at BG.NF.2 W-LEGACY-LADDER-COLLAPSE.
            mediaQuery.addEventListener("change", onReducedMotionChange);
            removeReducedMotionListener = () =>
                mediaQuery.removeEventListener("change", onReducedMotionChange);
        }
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        stop();
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
        yieldToMain,
    };
}
