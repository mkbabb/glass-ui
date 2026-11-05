import { effectScope, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useResizeObserver } from "@glass/composables/dom/useResizeObserver";

// A ResizeObserver the test drives: `emit` delivers an observation of the observed
// element, as the platform does once after `observe` and again on each size change.
class DrivenResizeObserver {
    static last: DrivenResizeObserver | null = null;
    target: Element | null = null;
    constructor(private readonly callback: ResizeObserverCallback) {
        DrivenResizeObserver.last = this;
    }
    observe(target: Element) {
        this.target = target;
    }
    unobserve() {}
    disconnect() {
        this.target = null;
    }
    emit(width: number, height: number) {
        this.callback(
            [{ target: this.target!, contentRect: { width, height } } as ResizeObserverEntry],
            this as unknown as ResizeObserver,
        );
    }
}

/** An element whose synchronous box already reads the size its first observation carries. */
function laidOut(width: number, height: number): HTMLElement {
    const el = document.createElement("div");
    el.getBoundingClientRect = () =>
        ({ width, height, top: 0, left: 0, right: width, bottom: height }) as DOMRect;
    return el;
}

afterEach(() => {
    vi.unstubAllGlobals();
    DrivenResizeObserver.last = null;
});

describe("useResizeObserver: the first observation (O-119 g)", () => {
    it("dispatches the platform's first observation even when it equals the laid-out box", async () => {
        vi.stubGlobal("ResizeObserver", DrivenResizeObserver);
        const target = ref<HTMLElement | null>(laidOut(390, 120));
        const seen: number[] = [];
        const scope = effectScope();
        scope.run(() =>
            useResizeObserver(target, (rect) => seen.push(rect.width), { rafBatch: false }),
        );
        await nextTick();

        DrivenResizeObserver.last!.emit(390, 120);
        expect(seen).toEqual([390]);

        // Below the threshold: dropped. A real change: dispatched.
        DrivenResizeObserver.last!.emit(390.2, 120);
        DrivenResizeObserver.last!.emit(320, 120);
        expect(seen).toEqual([390, 320]);
        scope.stop();
    });

    it("dispatches a new element's first observation after the target changes", async () => {
        vi.stubGlobal("ResizeObserver", DrivenResizeObserver);
        const target = ref<HTMLElement | null>(laidOut(390, 120));
        const seen: number[] = [];
        const scope = effectScope();
        scope.run(() =>
            useResizeObserver(target, (rect) => seen.push(rect.width), { rafBatch: false }),
        );
        await nextTick();
        DrivenResizeObserver.last!.emit(390, 120);

        // The same size on a different element is that element's first reading.
        target.value = laidOut(390, 120);
        await nextTick();
        DrivenResizeObserver.last!.emit(390, 120);
        expect(seen).toEqual([390, 390]);
        scope.stop();
    });

    it("dispatches the first observation through the rAF batch", async () => {
        vi.stubGlobal("ResizeObserver", DrivenResizeObserver);
        const frames: FrameRequestCallback[] = [];
        vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
        vi.stubGlobal("cancelAnimationFrame", () => {});
        const target = ref<HTMLElement | null>(laidOut(390, 120));
        const seen: number[] = [];
        const scope = effectScope();
        scope.run(() => useResizeObserver(target, (rect) => seen.push(rect.width)));
        await nextTick();

        DrivenResizeObserver.last!.emit(390, 120);
        expect(seen).toEqual([]);
        frames.splice(0).forEach((cb) => cb(0));
        expect(seen).toEqual([390]);
        scope.stop();
    });
});
