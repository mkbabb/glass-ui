import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, ref } from "vue";
import { useResizeObserver } from "@/composables/useResizeObserver";
import { mountComposable } from "../utils/mountComposable";

/**
 * Stand-in ResizeObserver that captures its callback so tests can
 * synthesize entries on demand. Replaces the no-op observer from
 * tests/setup.ts only for the duration of this file.
 */
class CapturingResizeObserver {
    static instances: CapturingResizeObserver[] = [];
    readonly observe = vi.fn<(target: Element, options?: ResizeObserverOptions) => void>();
    readonly unobserve = vi.fn<(target: Element) => void>();
    readonly disconnect = vi.fn<() => void>();
    readonly callback: ResizeObserverCallback;

    constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        CapturingResizeObserver.instances.push(this);
    }

    /** Fire the callback as if the browser saw a resize. */
    trigger(target: Element, width: number, height: number): void {
        const rect = {
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
            x: 0,
            y: 0,
            toJSON() {
                return this;
            },
        } satisfies DOMRectReadOnly;
        const entry = {
            target,
            contentRect: rect,
            borderBoxSize: [],
            contentBoxSize: [],
            devicePixelContentBoxSize: [],
        } as unknown as ResizeObserverEntry;
        this.callback([entry], this as unknown as ResizeObserver);
    }
}

const originalResizeObserver = globalThis.ResizeObserver;
const originalRAF = globalThis.requestAnimationFrame;
const originalCAF = globalThis.cancelAnimationFrame;

let rafQueue: Array<() => void> = [];

function flushRaf(): void {
    const queued = rafQueue;
    rafQueue = [];
    for (const cb of queued) cb();
}

beforeEach(() => {
    CapturingResizeObserver.instances.length = 0;
    Object.defineProperty(globalThis, "ResizeObserver", {
        configurable: true,
        writable: true,
        value: CapturingResizeObserver,
    });

    rafQueue = [];
    vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation(
        (cb: FrameRequestCallback): number => {
            rafQueue.push(() => cb(performance.now()));
            return rafQueue.length;
        },
    );
    vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation(
        (id: number): void => {
            // Best-effort cancel: drop the queued callback at the slot.
            if (id > 0 && id <= rafQueue.length) {
                rafQueue[id - 1] = () => {};
            }
        },
    );
});

afterEach(() => {
    Object.defineProperty(globalThis, "ResizeObserver", {
        configurable: true,
        writable: true,
        value: originalResizeObserver,
    });
    Object.defineProperty(globalThis, "requestAnimationFrame", {
        configurable: true,
        writable: true,
        value: originalRAF,
    });
    Object.defineProperty(globalThis, "cancelAnimationFrame", {
        configurable: true,
        writable: true,
        value: originalCAF,
    });
});

function makeEl(width: number, height: number): HTMLDivElement {
    const el = document.createElement("div");
    Object.defineProperty(el, "getBoundingClientRect", {
        configurable: true,
        value: () => ({
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
            x: 0,
            y: 0,
            toJSON() {
                return this;
            },
        }),
    });
    document.body.appendChild(el);
    return el;
}

describe("useResizeObserver — basic dispatch", () => {
    it("fires callback when size changes beyond threshold", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        expect(CapturingResizeObserver.instances).toHaveLength(1);
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 200, 100);
        expect(cb).toHaveBeenCalledTimes(1);
        const [rect] = cb.mock.calls[0]!;
        expect(rect.width).toBe(200);

        mounted.unmount();
    });
});

describe("useResizeObserver — threshold gating", () => {
    it("skips dispatch for sub-threshold changes", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        // Default threshold = 0.5 px.
        obs.trigger(el, 100.3, 100);
        expect(cb).not.toHaveBeenCalled();

        mounted.unmount();
    });

    it("threshold = 0 fires on every change", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false, threshold: 0 }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 100.0001, 100);
        expect(cb).toHaveBeenCalledTimes(1);

        mounted.unmount();
    });

    it("negative threshold clamps to 0 (still fires on every change)", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false, threshold: -5 }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 100.001, 100);
        expect(cb).toHaveBeenCalledTimes(1);

        mounted.unmount();
    });

    it("NaN threshold clamps to 0", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, {
                rafBatch: false,
                threshold: Number.NaN,
            }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 100.001, 100);
        expect(cb).toHaveBeenCalledTimes(1);

        mounted.unmount();
    });
});

describe("useResizeObserver — target ref switching", () => {
    it("disconnects old observer and observes new element", async () => {
        const a = makeEl(100, 100);
        const b = makeEl(200, 200);
        const target = ref<HTMLElement | null>(a);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        expect(CapturingResizeObserver.instances).toHaveLength(1);
        const first = CapturingResizeObserver.instances[0]!;
        expect(first.observe).toHaveBeenCalledWith(a, undefined);

        target.value = b;
        await nextTick();

        // First observer should have been disconnected.
        expect(first.unobserve).toHaveBeenCalledWith(a);
        expect(first.disconnect).toHaveBeenCalled();

        // A new observer should now be observing `b`.
        expect(CapturingResizeObserver.instances).toHaveLength(2);
        const second = CapturingResizeObserver.instances[1]!;
        expect(second.observe).toHaveBeenCalledWith(b, undefined);

        // Trigger on the new element.
        second.trigger(b, 300, 200);
        expect(cb).toHaveBeenCalledTimes(1);

        mounted.unmount();
    });
});

describe("useResizeObserver — auto-disposal on scope", () => {
    it("disconnects observer on component unmount", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        mounted.unmount();
        expect(obs.disconnect).toHaveBeenCalled();
    });
});

describe("useResizeObserver — manual stop()", () => {
    it("stop() outside scope unobserves + disconnects the observer", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        // Call OUTSIDE a setup/effect scope.
        const ctrl = useResizeObserver(target, cb, { rafBatch: false });
        const obs = CapturingResizeObserver.instances[0]!;

        ctrl.stop();
        expect(obs.unobserve).toHaveBeenCalledWith(el);
        expect(obs.disconnect).toHaveBeenCalled();

        // After stop(), further target ref changes do NOT spin up a new
        // observer (the watcher itself is torn down).
        const before = CapturingResizeObserver.instances.length;
        target.value = makeEl(200, 200);
        expect(CapturingResizeObserver.instances.length).toBe(before);
    });
});

describe("useResizeObserver — rAF coalescing", () => {
    it("coalesces multiple resizes within a single frame", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: true }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 110, 100);
        obs.trigger(el, 120, 100);
        obs.trigger(el, 130, 100);
        obs.trigger(el, 140, 100);
        obs.trigger(el, 150, 100);

        // Nothing dispatched yet — still queued in rAF.
        expect(cb).not.toHaveBeenCalled();

        flushRaf();

        expect(cb).toHaveBeenCalledTimes(1);
        const [rect] = cb.mock.calls[0]!;
        expect(rect.width).toBe(150);

        mounted.unmount();
    });

    it("rafBatch: false fires synchronously on each entry", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 110, 100);
        obs.trigger(el, 120, 100);
        obs.trigger(el, 130, 100);

        expect(cb).toHaveBeenCalledTimes(3);

        mounted.unmount();
    });

    it("disconnect mid-pending rAF cancels the queued flush safely", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const ctrl = useResizeObserver(target, cb, { rafBatch: true });
        const obs = CapturingResizeObserver.instances[0]!;

        obs.trigger(el, 200, 100);
        // rAF is pending; tear down before it fires.
        ctrl.stop();
        flushRaf();

        expect(cb).not.toHaveBeenCalled();
    });
});

describe("useResizeObserver — environment guards", () => {
    it("returns a no-op stop() when ResizeObserver is missing", () => {
        const saved = globalThis.ResizeObserver;
        // @ts-expect-error — deliberately remove for the no-RO path.
        delete (globalThis as { ResizeObserver?: unknown }).ResizeObserver;

        try {
            const el = document.createElement("div");
            const target = ref<HTMLElement | null>(el);
            const cb = vi.fn();
            const ctrl = useResizeObserver(target, cb);
            expect(ctrl).toHaveProperty("stop");
            // Calling stop() must not throw.
            ctrl.stop();
            expect(cb).not.toHaveBeenCalled();
        } finally {
            Object.defineProperty(globalThis, "ResizeObserver", {
                configurable: true,
                writable: true,
                value: saved,
            });
        }
    });

    it("does not throw when window is undefined", () => {
        const savedWindow = globalThis.window;
        const savedRO = globalThis.ResizeObserver;
        // Remove both so the SSR guard is hit.
        // @ts-expect-error — simulate Node SSR.
        delete (globalThis as { window?: unknown }).window;
        // @ts-expect-error — simulate Node SSR.
        delete (globalThis as { ResizeObserver?: unknown }).ResizeObserver;

        try {
            const target = ref<HTMLElement | null>(null);
            const cb = vi.fn();
            expect(() => useResizeObserver(target, cb).stop()).not.toThrow();
            expect(cb).not.toHaveBeenCalled();
        } finally {
            Object.defineProperty(globalThis, "window", {
                configurable: true,
                writable: true,
                value: savedWindow,
            });
            Object.defineProperty(globalThis, "ResizeObserver", {
                configurable: true,
                writable: true,
                value: savedRO,
            });
        }
    });
});

describe("useResizeObserver — box option forwarding", () => {
    it("forwards { box: 'border-box' } to observer.observe", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, {
                rafBatch: false,
                box: "border-box",
            }),
        );
        const obs = CapturingResizeObserver.instances[0]!;
        expect(obs.observe).toHaveBeenCalledWith(el, { box: "border-box" });

        mounted.unmount();
    });

    it("passes undefined options when box is not specified", () => {
        const el = makeEl(100, 100);
        const target = ref<HTMLElement | null>(el);
        const cb = vi.fn();
        const mounted = mountComposable(() =>
            useResizeObserver(target, cb, { rafBatch: false }),
        );
        const obs = CapturingResizeObserver.instances[0]!;
        expect(obs.observe).toHaveBeenCalledWith(el, undefined);

        mounted.unmount();
    });
});
