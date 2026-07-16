import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRAFLoop, type RAFLoopControls } from "@glass/composables/motion/core";

type FrameCallback = (now: number) => void;

function installManualRAF() {
    let nextId = 1;
    const callbacks = new Map<number, FrameCallback>();
    const request = vi.fn((callback: FrameRequestCallback) => {
        const id = nextId++;
        callbacks.set(id, callback);
        return id;
    });
    const cancel = vi.fn((id: number) => {
        callbacks.delete(id);
    });

    vi.stubGlobal("requestAnimationFrame", request);
    vi.stubGlobal("cancelAnimationFrame", cancel);

    return {
        request,
        cancel,
        callbacks,
        flushNext(now: number): void {
            const [id, callback] = callbacks.entries().next().value ?? [];
            if (id === undefined || !callback) return;
            callbacks.delete(id);
            callback(now);
        },
    };
}

describe("useRAFLoop", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("supports explicit start/stop and cancels scheduled frames", () => {
        const raf = installManualRAF();
        const callback = vi.fn();
        const loop = useRAFLoop(callback, {
            immediate: false,
            respectReducedMotion: false,
        });

        expect(loop.isActive.value).toBe(false);
        expect(raf.request).not.toHaveBeenCalled();

        loop.start();
        expect(loop.isActive.value).toBe(true);
        expect(raf.request).toHaveBeenCalledTimes(1);

        const firstId = raf.request.mock.results[0]?.value as number;
        loop.stop();

        expect(loop.isActive.value).toBe(false);
        expect(raf.cancel).toHaveBeenCalledWith(firstId);
        expect(raf.callbacks.size).toBe(0);
        expect(callback).not.toHaveBeenCalled();

        loop.start();
        raf.flushNext(100);
        raf.flushNext(116);

        expect(callback).toHaveBeenNthCalledWith(1, {
            now: 100,
            delta: 0,
            elapsed: 0,
            frame: 0,
        });
        expect(callback).toHaveBeenNthCalledWith(2, {
            now: 116,
            delta: 16,
            elapsed: 16,
            frame: 1,
        });

        loop.dispose();
    });

    it("cleans up a running frame when its owning scope stops", () => {
        const raf = installManualRAF();
        const callback = vi.fn();
        const scope = effectScope();
        let loop: RAFLoopControls | undefined;

        scope.run(() => {
            loop = useRAFLoop(callback, { respectReducedMotion: false });
        });

        expect(loop?.isActive.value).toBe(true);
        expect(raf.callbacks.size).toBe(1);

        scope.stop();

        expect(loop?.isActive.value).toBe(false);
        expect(raf.cancel).toHaveBeenCalledTimes(1);
        expect(raf.callbacks.size).toBe(0);
    });

    it("parks live work under reduced motion and re-arms only while requested", () => {
        let listener: ((event: MediaQueryListEvent) => void) | undefined;
        vi.spyOn(window, "matchMedia").mockReturnValue({
            matches: false,
            addEventListener: vi.fn(
                (_type: string, next: (event: MediaQueryListEvent) => void) => {
                    listener = next;
                },
            ),
            removeEventListener: vi.fn(),
        } as unknown as MediaQueryList);
        const raf = installManualRAF();
        const loop = useRAFLoop(() => {}, { pauseWhenHidden: false });

        expect(raf.callbacks.size).toBe(1);
        listener?.({ matches: true } as MediaQueryListEvent);
        expect(loop.isActive.value).toBe(false);
        expect(loop.isPaused.value).toBe(true);
        expect(raf.callbacks.size).toBe(0);

        listener?.({ matches: false } as MediaQueryListEvent);
        expect(loop.isActive.value).toBe(true);
        expect(raf.callbacks.size).toBe(1);

        loop.stop();
        listener?.({ matches: true } as MediaQueryListEvent);
        listener?.({ matches: false } as MediaQueryListEvent);
        expect(raf.callbacks.size).toBe(0);
        loop.dispose();
    });

    it("detaches its visibility listener on explicit dispose", () => {
        installManualRAF();
        const remove = vi.spyOn(document, "removeEventListener");
        const loop = useRAFLoop(() => {}, {
            immediate: false,
            respectReducedMotion: false,
        });

        loop.dispose();

        expect(remove).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
    });
});
