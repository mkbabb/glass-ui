import {
    getCurrentScope,
    onScopeDispose,
    readonly,
    ref,
    toValue,
    watch,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
// AV.W14 — the shared `visibilitychange` leaf (engine-free, vue-only). Imported
// directly (not via the dom/ barrel) so it stays off the public root surface.
import { useDocumentVisibility } from "../dom/useDocumentVisibility";

export interface PausableRuntime {
    pause: () => void;
    resume: () => void;
}

export interface UseIntersectionPauseOptions {
    /** IntersectionObserver root. Default null (viewport). */
    root?: Element | Document | null;
    /** IntersectionObserver rootMargin. Default 0px. */
    rootMargin?: string;
    /** IntersectionObserver threshold. Default 0. */
    threshold?: number | number[];
    /** Pause while document.hidden is true. Default true. */
    pauseWhenHidden?: boolean;
}

export interface IntersectionPauseControls {
    /** Latest IntersectionObserver visible state. Defaults true until observed. */
    readonly isIntersecting: Readonly<Ref<boolean>>;
    /** Current document visibility state, SSR-safe default true. */
    readonly isDocumentVisible: Readonly<Ref<boolean>>;
    /** True when the runtime should be paused. */
    readonly isPaused: Readonly<Ref<boolean>>;
    /** Re-apply current intersection and visibility state to the runtime. */
    refresh: () => void;
    /** Disconnect observers and document listeners. */
    dispose: () => void;
}

/**
 * Pause a runtime while its target is outside the viewport or the document is
 * hidden. Safe to call in SSR/tests; unavailable observers leave runtime state
 * controlled by document visibility only.
 */
export function useIntersectionPause(
    target: MaybeRefOrGetter<Element | null | undefined>,
    runtime: PausableRuntime,
    options: UseIntersectionPauseOptions = {},
): IntersectionPauseControls {
    const {
        root = null,
        rootMargin = "0px",
        threshold = 0,
        pauseWhenHidden = true,
    } = options;

    const isIntersecting = ref(true);
    const isDocumentVisible = ref(true);
    const isPaused = ref(false);

    let disposed = false;
    let observedTarget: Element | null = null;
    let lastPauseState: boolean | null = null;
    let observer: IntersectionObserver | null = null;
    let stopVisibilityWatch: (() => void) | null = null;
    let disposeVisibility: (() => void) | null = null;

    function applyRuntimeState(): void {
        if (disposed) return;
        const shouldPause = !isIntersecting.value || !isDocumentVisible.value;
        isPaused.value = shouldPause;
        if (lastPauseState === shouldPause) return;

        lastPauseState = shouldPause;
        if (shouldPause) {
            runtime.pause();
        } else {
            runtime.resume();
        }
    }

    if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.target !== observedTarget) continue;
                    isIntersecting.value =
                        entry.isIntersecting || entry.intersectionRatio > 0;
                    applyRuntimeState();
                }
            },
            { root, rootMargin, threshold },
        );
    }

    const stopTargetWatch = watch(
        () => toValue(target),
        (element, previousElement) => {
            if (previousElement && observer) {
                observer.unobserve(previousElement);
            }

            observedTarget = element ?? null;
            isIntersecting.value = true;

            if (observedTarget && observer) {
                observer.observe(observedTarget);
            }

            applyRuntimeState();
        },
        { immediate: true },
    );

    if (pauseWhenHidden) {
        const visibility = useDocumentVisibility();
        const { hidden } = visibility;
        disposeVisibility = visibility.dispose;
        isDocumentVisible.value = !hidden.value;
        // `flush: 'sync'` so the visibility reaction is synchronous — matches
        // the prior hand-rolled `visibilitychange` listener's timing exactly.
        stopVisibilityWatch = watch(
            hidden,
            (next) => {
                isDocumentVisible.value = !next;
                applyRuntimeState();
            },
            { flush: "sync" },
        );
    }

    function dispose(): void {
        if (disposed) return;
        disposed = true;
        stopTargetWatch();
        stopVisibilityWatch?.();
        stopVisibilityWatch = null;
        disposeVisibility?.();
        disposeVisibility = null;
        observer?.disconnect();
        observer = null;
        observedTarget = null;
    }

    if (getCurrentScope()) {
        onScopeDispose(dispose);
    }

    return {
        isIntersecting: readonly(isIntersecting),
        isDocumentVisible: readonly(isDocumentVisible),
        isPaused: readonly(isPaused),
        refresh: applyRuntimeState,
        dispose,
    };
}
