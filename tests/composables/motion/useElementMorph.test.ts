import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, ref, type EffectScope } from "vue";
import { useElementMorph } from "@glass/composables/motion/useElementMorph";

function installManualRAF() {
    let nextId = 1;
    const callbacks = new Map<number, FrameRequestCallback>();
    const request = vi.fn((callback: FrameRequestCallback) => {
        const id = nextId++;
        callbacks.set(id, callback);
        return id;
    });
    const cancel = vi.fn((id: number) => callbacks.delete(id));

    vi.stubGlobal("requestAnimationFrame", request);
    vi.stubGlobal("cancelAnimationFrame", cancel);

    return {
        callbacks,
        request,
        cancel,
        flushNext(now: number) {
            const [id, callback] = callbacks.entries().next().value ?? [];
            if (id === undefined || !callback) return;
            callbacks.delete(id);
            callback(now);
        },
    };
}

function stubRect(el: HTMLElement, rect: Partial<DOMRect>): void {
    el.getBoundingClientRect = () =>
        ({
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            top: 0,
            left: 0,
            right: 100,
            bottom: 100,
            toJSON: () => ({}),
            ...rect,
        }) as DOMRect;
}

async function flushPromises(): Promise<void> {
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
}

describe("useElementMorph", () => {
    let scope: EffectScope;

    beforeEach(() => {
        scope = effectScope();
    });

    afterEach(() => {
        scope.stop();
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("stops the old managed playback before a replacement becomes the writer", async () => {
        const raf = installManualRAF();
        const surface = document.createElement("div");
        const target = document.createElement("div");
        stubRect(surface, { x: 20, y: 20, width: 200, height: 120 });
        stubRect(target, { x: 300, y: 80, width: 40, height: 40 });

        const onSettled = vi.fn();
        const morph = scope.run(() => useElementMorph(ref(surface), {
            source: ref(target),
            destination: "self",
            respectReducedMotion: false,
            onSettled,
        }))!;

        morph.play();
        const firstFrame = raf.request.mock.results[0]?.value as number;
        morph.play();

        expect(raf.cancel).toHaveBeenCalledWith(firstFrame);
        expect(raf.callbacks.size).toBe(1);

        await flushPromises();
        expect(morph.playing.value).toBe(true);
        expect(surface.style.transitionProperty).toBe("none");
        expect(onSettled).not.toHaveBeenCalled();

        morph.cancel();
        expect(raf.callbacks.size).toBe(0);
        expect(surface.style.transitionProperty).toBe("");
        expect(surface.style.transform).toBe("");
        await flushPromises();
        expect(onSettled).not.toHaveBeenCalled();
    });

    it("retargets from its live frame and retains valid geometry after source removal", async () => {
        const raf = installManualRAF();
        const surface = document.createElement("button");
        const source = document.createElement("button");
        document.body.append(surface, source);
        let surfaceRect = { x: 40, y: 30, width: 180, height: 90 };
        surface.getBoundingClientRect = () =>
            ({
                ...surfaceRect,
                top: surfaceRect.y,
                left: surfaceRect.x,
                right: surfaceRect.x + surfaceRect.width,
                bottom: surfaceRect.y + surfaceRect.height,
                toJSON: () => ({}),
            }) as DOMRect;
        stubRect(source, { x: 8, y: 12, width: 44, height: 44 });
        const sourceRef = ref<HTMLElement | null>(source);
        const onSettled = vi.fn();
        const morph = scope.run(() => useElementMorph(ref(surface), {
            source: sourceRef,
            destination: "self",
            respectReducedMotion: false,
            onSettled,
        }))!;

        surface.focus();
        morph.play();
        raf.flushNext(0);
        raf.flushNext(480);
        const liveTransform = surface.style.transform;

        surfaceRect = { x: 64, y: 48, width: 240, height: 120 };
        morph.refresh();
        expect(surface.style.transform).toBe(liveTransform);
        expect(raf.cancel).toHaveBeenCalled();

        sourceRef.value = null;
        morph.refresh();
        expect(morph.playing.value).toBe(true);
        expect(document.activeElement).toBe(surface);

        raf.flushNext(480);
        raf.flushNext(4_000);
        await flushPromises();
        expect(morph.playing.value).toBe(false);
        expect(surface.style.transform).toBe("");
        expect(onSettled).toHaveBeenCalledTimes(1);
        document.body.replaceChildren();
    });

    it("settles once and releases its transition lock after managed playback", async () => {
        const raf = installManualRAF();
        const surface = document.createElement("div");
        const target = document.createElement("div");
        stubRect(surface, { width: 200, height: 120 });
        stubRect(target, { x: 100, width: 50, height: 50 });

        const onSettled = vi.fn();
        const morph = scope.run(() => useElementMorph(ref(surface), {
            source: ref(target),
            destination: "self",
            respectReducedMotion: false,
            onSettled,
        }))!;

        morph.play();
        raf.flushNext(0);
        raf.flushNext(2_000);
        await flushPromises();

        expect(morph.playing.value).toBe(false);
        expect(morph.progress.value).toBe(1);
        expect(surface.style.transitionProperty).toBe("");
        expect(surface.style.transform).toBe("");
        expect(onSettled).toHaveBeenCalledTimes(1);
    });
});
