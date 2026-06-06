// AU.W6 — the consumer-#2 usability assert (C6 must-fix #4) + the scheduling
// contract for `useWebGLCanvas`.
//
// The substrate must NOT bake aurora's quad/attrs/DPR/frozen-t — a SECOND
// consumer with DIFFERENT choices must compose it. This test IS that second
// consumer: it mounts `createWebGLCanvas` with a NON-aurora setup (a different
// "quad" + DPR, a different demand-gate) against a stub GL context, and asserts
// the generic lifecycle (arm · the demand-driven loop · the 3-reason suspend/
// resume model · wake · capture mode · context-restore re-setup · dispose) works
// — proving the substrate is consumer-agnostic. If the substrate baked aurora's
// choices, a non-aurora `setup` could not drive it.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createWebGLCanvas } from "../../../../src/composables/glass/webgl/useWebGLCanvas";

// ── A minimal fake DOM: a canvas whose getContext returns a stub WebGL2, a
// controllable rAF, a no-op ResizeObserver, a controllable document.hidden. ──
let rafQueue: Array<() => void>;
let listeners: Record<string, Array<(e: any) => void>>;

function makeCanvas(glStub: object | null) {
    return {
        getContext: vi.fn(() => glStub),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        width: 0,
        height: 0,
        clientWidth: 100,
        clientHeight: 50,
        parentElement: null,
    } as unknown as HTMLCanvasElement;
}

// A canvas variant that CAPTURES its own event listeners (the context
// lost/restored pair lives on the canvas, not on `document`) so a test can
// dispatch `webglcontextlost`/`webglcontextrestored` and exercise the
// self-heal. `getContext` returns a FRESH stub each call so a test can assert
// the restored context is a NEW object (the substrate re-acquired it).
function makeRestorableCanvas(makeGl: () => object) {
    const canvasListeners: Record<string, Array<(e: any) => void>> = {};
    const canvas = {
        getContext: vi.fn(() => makeGl()),
        addEventListener: (t: string, cb: any) => {
            (canvasListeners[t] ??= []).push(cb);
        },
        removeEventListener: vi.fn(),
        width: 0,
        height: 0,
        clientWidth: 100,
        clientHeight: 50,
        parentElement: null,
    } as unknown as HTMLCanvasElement;
    function dispatch(type: string, e: any = {}) {
        for (const cb of canvasListeners[type] ?? []) cb(e);
    }
    return { canvas, dispatch };
}

function flushFrames(n: number) {
    for (let i = 0; i < n; i++) {
        const next = rafQueue.shift();
        if (next) next();
    }
}

beforeEach(() => {
    rafQueue = [];
    listeners = {};
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
        },
    );
    vi.stubGlobal("performance", { now: () => 1000 });
    // a document whose `hidden` we can flip + whose listeners we capture
    vi.stubGlobal("document", {
        hidden: false,
        addEventListener: (t: string, cb: any) => {
            (listeners[t] ??= []).push(cb);
        },
        removeEventListener: vi.fn(),
    });
});

afterEach(() => vi.unstubAllGlobals());

describe("useWebGLCanvas — the consumer-#2 substrate contract (AU.W6)", () => {
    it("drives a NON-aurora consumer (different quad/DPR/demand-gate) generically", () => {
        const glStub = { getExtension: () => null } as unknown as WebGL2RenderingContext;
        const canvas = makeCanvas(glStub);
        let frames = 0;
        let live = true;
        const resize = vi.fn();
        const handle = createWebGLCanvas(canvas, {
            // a DIFFERENT context attr set than aurora's — the substrate forwards it
            contextAttrs: { antialias: true, alpha: false },
            setup: (gl) => {
                expect(gl).toBe(glStub); // the substrate handed the consumer ITS context
                return {
                    frame: () => {
                        frames += 1;
                    },
                    shouldContinue: () => live,
                    resize, // a non-aurora DPR/quad lives here, never in the substrate
                };
            },
        });

        handle.arm();
        expect(canvas.getContext).toHaveBeenCalledWith("webgl2", { antialias: true, alpha: false });
        expect(resize).toHaveBeenCalled(); // the substrate drove the consumer's resize
        flushFrames(3);
        expect(frames).toBe(3); // the demand-driven loop ran the consumer's frame

        // demand-gate parks the loop once the consumer reports settled
        live = false;
        flushFrames(2);
        const settled = frames;
        flushFrames(5);
        expect(frames).toBe(settled); // parked — no perpetual re-raster

        // wake() re-arms a parked loop
        live = true;
        handle.wake();
        flushFrames(1);
        expect(frames).toBe(settled + 1);

        handle.dispose();
    });

    it("honors the 3-reason suspend/resume model (a tab-show cannot lift off-screen)", () => {
        const canvas = makeCanvas({ getExtension: () => null } as unknown as WebGL2RenderingContext);
        let frames = 0;
        const handle = createWebGLCanvas(canvas, {
            setup: () => ({ frame: () => { frames += 1; }, shouldContinue: () => true, resize: () => {} }),
        });
        handle.arm();
        flushFrames(1);
        const base = frames;

        handle.suspend("off-screen");
        handle.suspend("tab-hidden");
        flushFrames(3);
        expect(frames).toBe(base); // both reasons held → loop parked

        // clearing ONLY tab-hidden must NOT resume (off-screen still held)
        handle.resume("tab-hidden");
        flushFrames(3);
        expect(frames).toBe(base);

        // clearing the last reason resumes
        handle.resume("off-screen");
        flushFrames(1);
        expect(frames).toBeGreaterThan(base);
        handle.dispose();
    });

    it("self-heals on webglcontextlost → webglcontextrestored (re-setup + resume)", () => {
        // N-3 coverage gap — the substrate's ONE genuinely-absent robustness
        // (vs aurora's bootstrap): a GPU context loss must self-heal instead of
        // going permanently blank. On `webglcontextlost` the loop is cancelled
        // and `gl`/`hooks` are nulled; on `webglcontextrestored` the substrate
        // re-runs the consumer's `setup(gl)` on a FRESH context and re-arms.
        let setups = 0;
        let frames = 0;
        const glA = { getExtension: () => null } as unknown as WebGL2RenderingContext;
        const glB = { getExtension: () => null } as unknown as WebGL2RenderingContext;
        // First arm() gets glA; the restore re-acquires glB (a NEW context).
        const contexts = [glA, glB];
        const { canvas, dispatch } = makeRestorableCanvas(() => contexts[setups]!);
        const resize = vi.fn();
        const handle = createWebGLCanvas(canvas, {
            setup: (gl) => {
                setups += 1;
                expect(gl).toBe(setups === 1 ? glA : glB);
                return {
                    frame: () => {
                        frames += 1;
                    },
                    shouldContinue: () => true,
                    resize,
                };
            },
        });

        handle.arm();
        expect(setups).toBe(1); // initial setup ran on glA
        expect(handle.gl).toBe(glA);
        flushFrames(2);
        expect(frames).toBe(2); // the loop is live
        const beforeLoss = frames;

        // ── context lost ── the loop parks and the GL handle drops to null.
        dispatch("webglcontextlost", {
            preventDefault: vi.fn(),
        });
        expect(handle.gl).toBe(null); // gl released — surface is blank
        flushFrames(5);
        expect(frames).toBe(beforeLoss); // no frames drawn while lost

        // ── context restored ── the substrate re-creates its GL resources
        // (re-runs setup on the fresh context) and resumes the rAF loop.
        dispatch("webglcontextrestored");
        expect(setups).toBe(2); // setup re-ran — program/geometry rebuilt
        expect(handle.gl).toBe(glB); // a NEW context was acquired
        expect(resize).toHaveBeenCalledTimes(2); // re-sized on the fresh context

        // The loop resumed — frames advance again after the restore.
        flushFrames(2);
        expect(frames).toBeGreaterThan(beforeLoss);

        handle.dispose();
    });

    it("capture mode never auto-runs; renderAt draws out-of-loop", () => {
        const canvas = makeCanvas({ getExtension: () => null } as unknown as WebGL2RenderingContext);
        let frames = 0;
        const handle = createWebGLCanvas(canvas, {
            mode: "capture",
            setup: () => ({ frame: () => { frames += 1; }, shouldContinue: () => true, resize: () => {} }),
        });
        flushFrames(5);
        expect(frames).toBe(0); // capture pre-seeds `manual` — no auto-loop
        handle.renderAt(0.5);
        expect(frames).toBe(1); // one out-of-loop draw
        handle.dispose();
    });
});
