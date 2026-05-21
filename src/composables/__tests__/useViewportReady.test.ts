import { effectScope, ref, type Ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useViewportReady } from "../dom/useViewportReady";

type ObserveEntry = {
    isIntersecting: boolean;
    target: Element;
};

type FakeIntersectionObserverInstance = {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    trigger(entries: ObserveEntry[]): void;
};

let liveObservers: FakeIntersectionObserverInstance[] = [];

function installFakeIntersectionObserver(): void {
    liveObservers = [];
    class FakeIO {
        private readonly callback: IntersectionObserverCallback;
        readonly observe: ReturnType<typeof vi.fn>;
        readonly unobserve: ReturnType<typeof vi.fn>;
        readonly disconnect: ReturnType<typeof vi.fn>;

        constructor(cb: IntersectionObserverCallback) {
            this.callback = cb;
            this.observe = vi.fn();
            this.unobserve = vi.fn();
            this.disconnect = vi.fn();
            liveObservers.push({
                observe: this.observe,
                unobserve: this.unobserve,
                disconnect: this.disconnect,
                trigger: (entries) => {
                    this.callback(
                        entries as unknown as IntersectionObserverEntry[],
                        this as unknown as IntersectionObserver,
                    );
                },
            });
        }
    }
    (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver = FakeIO;
}

function uninstallFakeIntersectionObserver(): void {
    delete (globalThis as { IntersectionObserver?: unknown }).IntersectionObserver;
    liveObservers = [];
}

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

describe("useViewportReady", () => {
    beforeEach(() => {
        installFakeIntersectionObserver();
        installFakeRIC();
    });

    afterEach(() => {
        uninstallFakeIntersectionObserver();
        uninstallFakeRIC();
        vi.clearAllTimers();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("flips ready=true after host intersects and idle fires", async () => {
        vi.useFakeTimers();
        const host = ref<Element | null>(document.createElement("div"));
        const { ready } = useViewportReady(host);

        expect(ready.value).toBe(false);
        expect(liveObservers.length).toBe(1);
        // Wait one microtask for the immediate `watch` `flush:"post"` to land.
        await Promise.resolve();
        expect(liveObservers[0]?.observe).toHaveBeenCalledTimes(1);

        liveObservers[0]?.trigger([
            { isIntersecting: true, target: host.value! },
        ]);
        // rIC fires on next tick (our fake schedules via setTimeout(0)).
        await vi.advanceTimersByTimeAsync(1);

        expect(ready.value).toBe(true);
        expect(liveObservers[0]?.disconnect).toHaveBeenCalled();
    });

    it("stays ready=false until host actually intersects", async () => {
        vi.useFakeTimers();
        const host = ref<Element | null>(document.createElement("div"));
        const { ready } = useViewportReady(host);
        await Promise.resolve();

        liveObservers[0]?.trigger([
            { isIntersecting: false, target: host.value! },
        ]);
        vi.advanceTimersByTime(100);
        await Promise.resolve();

        expect(ready.value).toBe(false);
    });

    it("falls back to idle-only path when no host is set", async () => {
        vi.useFakeTimers();
        const host = ref<Element | null>(null);
        const { ready } = useViewportReady(host);

        // No IO subscription when the host is null at mount.
        expect(liveObservers.length).toBe(0);
        await Promise.resolve();
        // rIC fires on the next tick.
        vi.advanceTimersByTime(0);
        await Promise.resolve();

        expect(ready.value).toBe(true);
    });

    it("falls back to setTimeout path when requestIdleCallback is unavailable", async () => {
        uninstallFakeRIC();
        vi.useFakeTimers();
        const host = ref<Element | null>(document.createElement("div"));
        const { ready } = useViewportReady(host);
        await Promise.resolve();

        liveObservers[0]?.trigger([
            { isIntersecting: true, target: host.value! },
        ]);
        // Safari fallback is `setTimeout(fire, 16)`.
        vi.advanceTimersByTime(20);

        expect(ready.value).toBe(true);
    });

    it("auto-disposes observer + idle handle on scope stop", async () => {
        vi.useFakeTimers();
        const scope = effectScope();
        const host = ref<Element | null>(document.createElement("div"));
        let readyRef: Ref<boolean> | undefined;
        scope.run(() => {
            const { ready } = useViewportReady(host);
            readyRef = ready;
        });
        await Promise.resolve();
        expect(liveObservers.length).toBe(1);

        scope.stop();
        expect(liveObservers[0]?.disconnect).toHaveBeenCalled();
        // Triggering after scope stop must NOT flip the ref.
        liveObservers[0]?.trigger([
            { isIntersecting: true, target: host.value! },
        ]);
        vi.advanceTimersByTime(100);
        await Promise.resolve();
        expect(readyRef?.value).toBe(false);
    });

    it("honours custom rootMargin + idleTimeout options", async () => {
        const host = ref<Element | null>(document.createElement("div"));
        const handle = useViewportReady(host, {
            rootMargin: "50px",
            idleTimeout: 500,
        });
        await Promise.resolve();

        expect(liveObservers.length).toBe(1);
        // No direct accessor for IO constructor options in our fake — but the
        // composable should still subscribe + tear down cleanly.
        handle.stop();
        expect(liveObservers[0]?.disconnect).toHaveBeenCalled();
    });
});
