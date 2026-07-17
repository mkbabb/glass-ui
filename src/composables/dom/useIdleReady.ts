import { getCurrentScope, onScopeDispose, ref, type Ref } from "vue";

export interface UseIdleReadyOptions {
    /**
     * `requestIdleCallback` timeout, in ms. Default 2_000 — the canonical
     * value at every hand-rolled consumer site (consumers pass
     * `{ timeout: 2000 }`). Unlike useViewportReady's 10s (which fronts
     * the budget with an IO gate), useIdleReady has no visibility stage, so
     * the timeout is the only ceiling — 2s matches the consumer sites and
     * keeps the deferred work inside a reasonable post-paint window.
     */
    timeout?: number;
    /**
     * Optional task run the moment the gate flips (the scope-aware variant —
     * useIPInfo's `() => void refresh()`). Runs exactly once; auto-cancelled
     * on scope dispose with the rIC handle so a short-lived consumer cannot
     * leak a deferred write to disposed refs. Consumers that only need the
     * `ready` ref omit it.
     */
    onReady?: () => void;
}

export interface UseIdleReadyControls {
    /** Flips `false → true` exactly once on the first idle tick (post-mount). */
    readonly ready: Ref<boolean>;
    /** Tear down the pending idle/timer handle. Auto-called on scope dispose. */
    stop: () => void;
}

/**
 * `useIdleReady(options?)` — `requestIdleCallback` (+ `setTimeout(0)` Safari
 * fallback) post-mount idle gate that flips a `Ref<boolean>` exactly once on
 * the first idle tick, and optionally runs an `onReady` task at that moment.
 *
 * The rIC-only sibling of `useViewportReady` — same one-shot `ready` ref +
 * `stop()` shape, same auto-dispose discipline — minus the
 * `IntersectionObserver` visibility stage. The gate is "idle, full stop", not
 * "visible AND idle"; reach for it when there is no element to gate on (a
 * top-level lazy mount, a composable's first-idle data fetch).
 *
 * Two unified use shapes:
 *
 *   1. `ready`-flag — `v-if`-gate a heavy mount on the returned ref:
 *        const { ready } = useIdleReady();
 *        // <Aurora v-if="ready" />
 *   2. scope-aware task — run a callback on first idle, cancelled on dispose:
 *        useIdleReady({ onReady: () => void refresh() });
 *      The handle is auto-cancelled on Vue scope disposal so a short-lived
 *      consumer cannot leak a deferred write to disposed refs.
 *
 * The composable schedules synchronously at call time (NOT inside an
 * `onMounted`) so it works outside a component too (e.g. inside `useIPInfo`,
 * a composable not a component). SSR / non-browser flips synchronously so
 * consumers don't stall.
 *
 * This gate is
 * hand-rolled at 5 consumer sites — the ≥2-consumer substrate-promotion gate
 * fires for a publisher-side absorption.
 *
 * @param options.timeout Default `2000` ms — forwarded to `requestIdleCallback`.
 * @param options.onReady Optional one-shot task run on the idle flip.
 * @returns Object with `ready: Ref<boolean>` (flips false → true once) and
 *          `stop()` for manual disposal outside a Vue scope.
 */
export function useIdleReady(
    options: UseIdleReadyOptions = {},
): UseIdleReadyControls {
    const timeout = options.timeout ?? 2_000;

    const ready = ref(false);
    let idleHandle: number | null = null;
    let timerHandle: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    function fire(): void {
        if (disposed || ready.value) return;
        ready.value = true;
        options.onReady?.();
        teardown();
    }

    function teardown(): void {
        if (
            idleHandle !== null
            && typeof window !== "undefined"
            && "cancelIdleCallback" in window
        ) {
            window.cancelIdleCallback(idleHandle);
            idleHandle = null;
        }
        if (timerHandle !== null) {
            clearTimeout(timerHandle);
            timerHandle = null;
        }
    }

    function scheduleIdle(): void {
        if (disposed) return;
        if (typeof window === "undefined") {
            // SSR / non-browser — synchronous flip so consumers don't stall.
            fire();
            return;
        }
        if ("requestIdleCallback" in window) {
            idleHandle = window.requestIdleCallback(fire, { timeout });
        } else {
            // Safari fallback: the next macrotask still lands after first paint.
            timerHandle = setTimeout(fire, 0);
        }
    }

    // Schedule synchronously at call time (no `onMounted`) so the gate works
    // outside a component scope too — matching useViewportReady's initial bind.
    scheduleIdle();

    function stop(): void {
        if (disposed) return;
        disposed = true;
        teardown();
    }

    if (getCurrentScope()) {
        onScopeDispose(stop);
    }

    return { ready, stop };
}
