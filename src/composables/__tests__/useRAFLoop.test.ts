import { effectScope } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useRAFLoop, type RAFLoopControls } from "../motion";

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
});
