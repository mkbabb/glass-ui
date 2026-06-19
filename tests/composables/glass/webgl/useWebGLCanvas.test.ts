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
import {
    N_RESTORE_STORM,
    RESTORE_DEBOUNCE_MS,
    T_RESTORE_STORM_MS,
} from "../../../../src/composables/glass/webgl/createCanvasLifecycle";

// ── A minimal fake DOM: a canvas whose getContext returns a stub WebGL2, a
// controllable rAF, a no-op ResizeObserver, a controllable document.hidden. ──
let rafQueue: Array<() => void>;
let listeners: Record<string, Array<(e: any) => void>>;
// A controllable clock the breaker's sliding window reads (BC.W-SAFARI-WEBGL): a
// test advances `clockMs` so loss timestamps land at distinct times (a storm clusters
// inside T; a healthy single loss is far apart).
let clockMs: number;

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
    clockMs = 1000;
    // Fake timers so the BC.W-SAFARI-WEBGL restore-debounce (`setTimeout`) is
    // controllable; a test advances `vi.advanceTimersByTime` past RESTORE_DEBOUNCE_MS
    // to fire the coalesced rebuild.
    vi.useFakeTimers();
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
    vi.stubGlobal("performance", { now: () => clockMs });
    // a document whose `hidden` we can flip + whose listeners we capture
    vi.stubGlobal("document", {
        hidden: false,
        addEventListener: (t: string, cb: any) => {
            (listeners[t] ??= []).push(cb);
        },
        removeEventListener: vi.fn(),
    });
});

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
});

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
        // (re-runs setup on the fresh context) and resumes the rAF loop. The rebuild is
        // DEBOUNCED (BC.W-SAFARI-WEBGL — a burst coalesces to one rebuild per settle), so
        // advance past the debounce window to fire the coalesced re-arm.
        dispatch("webglcontextrestored");
        expect(setups).toBe(1); // not yet — the rebuild is debounced
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
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

// ── BC.W-SAFARI-WEBGL — the context-loss circuit-breaker (the §H Safari flash kill).
//
// The self-heal above is correct for a single GPU-TDR loss, but on WebKit the per-page
// WebGL-context cap is overrun and an eviction storm fires loss→restore→loss→restore in a
// rapidly-flashing re-arm loop. The breaker bounds it: a burst coalesces to ONE rebuild
// per settle (the debounce), and once N losses land within T ms the substrate STOPS
// re-arming and HOLDS the parked state WITHOUT throwing (the aurora-swraster inert-handle
// precedent). A genuine single loss STILL self-heals — the breaker fires only on the storm.
describe("useWebGLCanvas — the context-loss circuit-breaker (BC.W-SAFARI-WEBGL)", () => {
    function armed(makeGl: () => object) {
        let setups = 0;
        let frames = 0;
        const { canvas, dispatch } = makeRestorableCanvas(() => {
            setups += 1;
            return makeGl();
        });
        const handle = createWebGLCanvas(canvas, {
            setup: () => ({
                frame: () => {
                    frames += 1;
                },
                shouldContinue: () => true,
                resize: () => {},
            }),
        });
        handle.arm();
        return {
            handle,
            dispatch,
            get setups() {
                return setups;
            },
            get frames() {
                return frames;
            },
        };
    }

    function loseAndRestore(h: { dispatch: (t: string, e?: any) => void }) {
        h.dispatch("webglcontextlost", { preventDefault: vi.fn() });
        h.dispatch("webglcontextrestored");
    }

    it("S2 — a storm (>N losses in T) HOLDS the parked state without throwing", () => {
        const gl = () => ({ getExtension: () => null });
        const a = armed(gl);
        expect(a.setups).toBe(1); // initial arm

        // Drive a STORM: N+1 lost/restored cycles clustered inside T (the clock stays
        // inside the window). Each cycle schedules a debounced rebuild; the NEXT loss
        // cancels it (the context is gone again — don't waste the rebuild).
        let threw = false;
        try {
            for (let i = 0; i < N_RESTORE_STORM + 1; i++) {
                clockMs += 50; // clustered — all inside T_RESTORE_STORM_MS
                loseAndRestore(a);
            }
        } catch {
            threw = true;
        }
        expect(threw).toBe(false); // the storm is a HOLD, never a throw

        // The breaker has tripped — the surface HOLDS parked. Advancing past the debounce
        // does NOT rebuild (the rebuild is suppressed under the trip).
        const setupsBeforeWindow = a.setups;
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
        expect(a.setups).toBe(setupsBeforeWindow); // no re-arm — held parked
        a.handle.dispose();
    });

    it("S3 — a single quiet loss STILL self-heals (below the breaker threshold)", () => {
        const gl = () => ({ getExtension: () => null });
        const a = armed(gl);
        expect(a.setups).toBe(1);

        // ONE lost/restored cycle, well below N.
        loseAndRestore(a);
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
        expect(a.setups).toBe(2); // self-healed — the program rebuilt on the fresh context
        a.handle.dispose();
    });

    it("S3b — a later loss after the window passes QUIET re-heals (the breaker resets)", () => {
        const gl = () => ({ getExtension: () => null });
        const a = armed(gl);

        // First a storm to trip the breaker.
        for (let i = 0; i < N_RESTORE_STORM + 1; i++) {
            clockMs += 50;
            loseAndRestore(a);
        }
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
        const heldSetups = a.setups; // tripped — no re-arm

        // The window passes QUIET (every prior loss ages past T), then a genuine single
        // loss arrives — the breaker has reset, so it self-heals.
        clockMs += T_RESTORE_STORM_MS + 100;
        loseAndRestore(a);
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
        expect(a.setups).toBe(heldSetups + 1); // re-armed once the storm subsided
        a.handle.dispose();
    });

    it("debounce coalesces a burst of restores into ONE rebuild per settle", () => {
        const gl = () => ({ getExtension: () => null });
        const a = armed(gl);

        // Several `restored` events inside ONE debounce window (no intervening loss
        // cancels — they pile onto the same pending rebuild).
        a.dispatch("webglcontextrestored");
        a.dispatch("webglcontextrestored");
        a.dispatch("webglcontextrestored");
        expect(a.setups).toBe(1); // none fired yet — all debounced
        vi.advanceTimersByTime(RESTORE_DEBOUNCE_MS + 1);
        expect(a.setups).toBe(2); // exactly ONE rebuild for the whole burst
        a.handle.dispose();
    });
});
