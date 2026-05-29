import { effectScope, type Ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIdleReady } from "../dom/useIdleReady";

function installFakeRIC(): void {
    (globalThis as { requestIdleCallback?: unknown }).requestIdleCallback = (
        cb: () => void,
    ) => {
        // Fire on next tick so consumers get a chance to observe `ready=false`.
        const handle = setTimeout(cb, 0);
        return handle as unknown as number;
    };
    (globalThis as { cancelIdleCallback?: unknown }).cancelIdleCallback = (
        handle: number,
    ) => {
        clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
    };
}

function uninstallFakeRIC(): void {
    delete (globalThis as { requestIdleCallback?: unknown }).requestIdleCallback;
    delete (globalThis as { cancelIdleCallback?: unknown }).cancelIdleCallback;
}

describe("useIdleReady", () => {
    beforeEach(() => {
        installFakeRIC();
    });

    afterEach(() => {
        uninstallFakeRIC();
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("flips ready=true on the idle tick", async () => {
        vi.useFakeTimers();
        const { ready } = useIdleReady();

        // Synchronously still false — the gate flips on the next idle tick.
        expect(ready.value).toBe(false);

        // rIC fires on next tick (our fake schedules via setTimeout(0)).
        await vi.advanceTimersByTimeAsync(1);

        expect(ready.value).toBe(true);
    });

    it("runs the onReady task once on flip", async () => {
        vi.useFakeTimers();
        const onReady = vi.fn();
        const { ready } = useIdleReady({ onReady });

        expect(onReady).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(1);

        expect(ready.value).toBe(true);
        expect(onReady).toHaveBeenCalledTimes(1);

        // Idempotent — no second fire on further ticks.
        await vi.advanceTimersByTimeAsync(10);
        expect(onReady).toHaveBeenCalledTimes(1);
    });

    it("falls back to setTimeout(0) when requestIdleCallback is unavailable", async () => {
        uninstallFakeRIC();
        vi.useFakeTimers();
        const onReady = vi.fn();
        const { ready } = useIdleReady({ onReady });

        expect(ready.value).toBe(false);
        // Safari fallback is `setTimeout(fire, 0)`.
        await vi.advanceTimersByTimeAsync(0);

        expect(ready.value).toBe(true);
        expect(onReady).toHaveBeenCalledTimes(1);
    });

    it("flips synchronously when window is undefined (SSR)", () => {
        const original = (globalThis as { window?: unknown }).window;
        // jsdom/happy-dom provide `window`; delete it to model the SSR path.
        delete (globalThis as { window?: unknown }).window;
        try {
            const onReady = vi.fn();
            const { ready } = useIdleReady({ onReady });
            // SSR flips synchronously so consumers don't stall.
            expect(ready.value).toBe(true);
            expect(onReady).toHaveBeenCalledTimes(1);
        } finally {
            (globalThis as { window?: unknown }).window = original;
        }
    });

    it("auto-disposes on scope stop — ready stays false and onReady never runs", () => {
        // Real timers: scope.stop() must synchronously cancel the pending rIC
        // handle (the load-bearing useIPInfo case — a short-lived consumer must
        // not leak a deferred write). The fake rIC schedules via setTimeout(0),
        // so cancellation before the macrotask keeps `ready` false.
        const scope = effectScope();
        const onReady = vi.fn();
        let readyRef: Ref<boolean> | undefined;
        scope.run(() => {
            const { ready } = useIdleReady({ onReady });
            readyRef = ready;
        });

        scope.stop();

        expect(readyRef?.value).toBe(false);
        expect(onReady).not.toHaveBeenCalled();
    });

    it("manual stop() cancels the pending idle handle", () => {
        // No fake timers — the fake rIC's `cancelIdleCallback` must resolve
        // the real handle it created (mirrors the sibling's options test).
        const onReady = vi.fn();
        const { ready, stop } = useIdleReady({ onReady });

        expect(ready.value).toBe(false);
        expect(() => stop()).not.toThrow();
        expect(ready.value).toBe(false);
        expect(onReady).not.toHaveBeenCalled();
    });

    it("honours a custom timeout and stops cleanly", () => {
        const { ready, stop } = useIdleReady({ timeout: 500 });

        expect(ready.value).toBe(false);
        // Clean teardown before the idle tick lands.
        expect(() => stop()).not.toThrow();
        expect(ready.value).toBe(false);
    });
});
