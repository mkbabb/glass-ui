// AW.W17 — the park/freeze/dispose contract for `useCanvas2D`, the Canvas2D
// substrate paralleling `useWebGLCanvas`. This test stubs a minimal DOM (a
// canvas whose getContext returns a stub 2D ctx, a controllable rAF, no-op
// observers, a controllable document.hidden + matchMedia) and asserts:
//   - the suspend Set gates `isRunning()` (the 3-reason model; a tab-show cannot
//     lift an off-screen suspension);
//   - a reduced-motion mock paints ONE static frame then parks;
//   - `dispose()` is idempotent and parks the loop.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { createCanvas2D } from "../../../../src/composables/glass/canvas2d/useCanvas2D";

let rafQueue: Array<() => void>;
let docListeners: Record<string, Array<(e: any) => void>>;
let reducedMatches: boolean;

function makeCtx() {
    return {
        setTransform: vi.fn(),
        clearRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D;
}

function makeCanvas(ctx: object) {
    return {
        getContext: vi.fn(() => ctx),
        clientWidth: 100,
        clientHeight: 50,
        offsetWidth: 100,
        offsetHeight: 50,
        width: 0,
        height: 0,
        parentElement: null,
        getBoundingClientRect: () => ({ width: 100, height: 50, left: 0, top: 0 }),
    } as unknown as HTMLCanvasElement;
}

function flushFrames(n: number) {
    for (let i = 0; i < n; i++) {
        const next = rafQueue.shift();
        if (next) next();
    }
}

beforeEach(() => {
    rafQueue = [];
    docListeners = {};
    reducedMatches = false;
    vi.stubGlobal("requestAnimationFrame", (cb: () => void) => {
        rafQueue.push(cb);
        return rafQueue.length;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    vi.stubGlobal(
        "ResizeObserver",
        class {
            observe() {}
            disconnect() {}
            unobserve() {}
        },
    );
    vi.stubGlobal(
        "IntersectionObserver",
        class {
            observe() {}
            disconnect() {}
            unobserve() {}
        },
    );
    vi.stubGlobal("performance", { now: () => 1000 });
    vi.stubGlobal("document", {
        hidden: false,
        addEventListener: (t: string, cb: any) => {
            (docListeners[t] ??= []).push(cb);
        },
        removeEventListener: vi.fn(),
    });
    vi.stubGlobal("window", {
        devicePixelRatio: 2,
        matchMedia: (q: string) => ({
            matches: /reduce/.test(q) ? reducedMatches : false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }),
    });
});

afterEach(() => vi.unstubAllGlobals());

describe("useCanvas2D — the Canvas2D substrate park/freeze contract (AW.W17)", () => {
    it("runs the consumer render loop and gates isRunning() on the suspend set", () => {
        const ctx = makeCtx();
        const canvas = ref<HTMLCanvasElement | null>(makeCanvas(ctx));
        let frames = 0;
        const setup = vi.fn(() => ({
            render: () => {
                frames += 1;
            },
        }));
        const handle = createCanvas2D({ canvas, setup });

        // arm() runs on autoStart; the substrate handed the consumer ITS ctx.
        expect(setup).toHaveBeenCalledWith(ctx);
        expect(handle.isRunning()).toBe(true);
        // dpr-clamped resize applied the transform (dpr=2).
        expect(ctx.setTransform).toHaveBeenCalledWith(2, 0, 0, 2, 0, 0);

        flushFrames(3);
        expect(frames).toBe(3);

        // the 3-reason suspend model: both held → parked, isRunning false.
        handle.suspend("off-screen");
        handle.suspend("tab-hidden");
        expect(handle.isRunning()).toBe(false);
        const settled = frames;
        flushFrames(3);
        expect(frames).toBe(settled);

        // clearing ONLY tab-hidden must NOT resume (off-screen still held).
        handle.resume("tab-hidden");
        expect(handle.isRunning()).toBe(false);
        flushFrames(3);
        expect(frames).toBe(settled);

        // clearing the last reason resumes the loop.
        handle.resume("off-screen");
        expect(handle.isRunning()).toBe(true);
        flushFrames(1);
        expect(frames).toBeGreaterThan(settled);

        handle.dispose();
    });

    it("parks on document.hidden via the visibilitychange owner", () => {
        const ctx = makeCtx();
        const canvas = ref<HTMLCanvasElement | null>(makeCanvas(ctx));
        let frames = 0;
        const handle = createCanvas2D({
            canvas,
            setup: () => ({ render: () => { frames += 1; } }),
        });
        flushFrames(1);
        const base = frames;

        // flip document.hidden true + fire visibilitychange → off the loop.
        (globalThis as any).document.hidden = true;
        for (const cb of docListeners["visibilitychange"] ?? []) cb({});
        expect(handle.isRunning()).toBe(false);
        flushFrames(3);
        expect(frames).toBe(base);

        // tab-show resumes.
        (globalThis as any).document.hidden = false;
        for (const cb of docListeners["visibilitychange"] ?? []) cb({});
        expect(handle.isRunning()).toBe(true);
        flushFrames(1);
        expect(frames).toBeGreaterThan(base);
        handle.dispose();
    });

    it("under reduced-motion paints ONE static frame then parks", () => {
        reducedMatches = true;
        const ctx = makeCtx();
        const canvas = ref<HTMLCanvasElement | null>(makeCanvas(ctx));
        let frames = 0;
        createCanvas2D({
            canvas,
            setup: () => ({ render: () => { frames += 1; } }),
        });
        // one static frame painted at arm() (no rAF scheduled).
        expect(frames).toBe(1);
        expect(rafQueue.length).toBe(0);
        flushFrames(5);
        expect(frames).toBe(1); // still parked — no live loop under reduce
    });

    it("dispose() is idempotent and parks the loop", () => {
        const ctx = makeCtx();
        const canvas = ref<HTMLCanvasElement | null>(makeCanvas(ctx));
        let frames = 0;
        const handle = createCanvas2D({
            canvas,
            setup: () => ({ render: () => { frames += 1; } }),
        });
        flushFrames(1);
        handle.dispose();
        const after = frames;
        flushFrames(5);
        expect(frames).toBe(after); // disposed → no frames
        expect(handle.ctx).toBe(null);
        // second dispose is a no-op (no throw).
        expect(() => handle.dispose()).not.toThrow();
    });
});
