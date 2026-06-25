// BB.W-VIZ-SUITE (W-GPU-SUBSTRATE) — the consumer-#2 usability assert for the WebGPU
// backend + the transparent picker (`proof:gpu-substrate-single` clause G).
//
// Mirrors the WebGL2 consumer-#2 test (AU.W6): the substrate must NOT bake viz choices
// — a SECOND non-aurora consumer with its OWN setup must compose it. This test IS that
// second consumer. It exercises TWO paths:
//
//   (1) the DEGRADE path — under jsdom `navigator.gpu` is absent, so the picker
//       (`createGpuSubstrate`) deterministically falls back to the WebGL2 backend, and
//       the uniform handle (`armAsync`/`suspend`/`resume`/`wake`/`renderAt`/`dispose`/
//       `reducedMotion`) drives a non-aurora consumer generically — proving the
//       fallback is byte-uniform with the WebGPU path from the consumer's view.
//   (2) the WebGPU-SELECT path — with a stub `navigator.gpu` present AND a `setupWGPU`
//       callback, the picker selects the `"webgpu"` backend, the async prelude acquires
//       a stub adapter+device, configures the context, runs the consumer's setup, and
//       `armAsync()` resolves — proving the device-acquisition prelude threads through
//       the leaf WITHOUT a leaf seam change (the scope-1 expected outcome).
//
// The live GPU render path is exercised by the binding π under a GPU-bearing headless
// image; here the device is stubbed (jsdom has no real adapter).

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGpuSubstrate } from "../../../../src/composables/glass/webgpu/useGpuSubstrate";
import {
    createWebGPUCanvas,
    WebGPUInitError,
    __resetSharedGpuDeviceForTest,
} from "../../../../src/composables/glass/webgpu/useWebGPUCanvas";

let rafQueue: Array<() => void>;
let listeners: Record<string, Array<(e: any) => void>>;

function makeCanvas(getCtx: (id: string) => unknown) {
    return {
        getContext: vi.fn((id: string) => getCtx(id)),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        width: 0,
        height: 0,
        clientWidth: 120,
        clientHeight: 60,
        parentElement: null,
    } as unknown as HTMLCanvasElement;
}

function flushFrames(n: number) {
    for (let i = 0; i < n; i++) {
        const next = rafQueue.shift();
        if (next) next();
    }
}

// BD.W-CUT — the shared leaf's `presize()` (createCanvasLifecycle) schedules a
// rAF-double-resize layout-settle defense (the aurora-proven stuck-300×150 cure,
// promoted to ALL consumers). Those transient resize callbacks share the rAF queue with
// the render `tick`, so a frame-per-flush count is skewed by the settle rAFs occupying
// queue slots. `pumpFrames` pumps the queue and returns the NET frames the consumer drew
// — the assert-on-delta pattern robust to the presize settle rAFs (each is idempotent on
// a stable box → draws zero frames; it merely occupies a slot).
function pumpFrames(countFn: () => number, pumps: number): number {
    const before = countFn();
    for (let i = 0; i < pumps; i++) {
        const next = rafQueue.shift();
        if (next) next();
    }
    return countFn() - before;
}

beforeEach(() => {
    // BD.W-CUT (D3a) — reset the PROCESS-SHARED WebGPU device memo so a prior test's
    // resolved device never leaks into a later test (which would skip its own
    // `requestAdapter` acquire — the no-adapter / idempotent contracts assert that call
    // count). The shared-device warm is correct in production (one device per page); the
    // reset restores per-test isolation.
    __resetSharedGpuDeviceForTest();
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
    vi.stubGlobal("document", {
        hidden: false,
        addEventListener: (t: string, cb: any) => {
            (listeners[t] ??= []).push(cb);
        },
        removeEventListener: vi.fn(),
    });
    // window with no matchMedia → reducedMotion is false (the leaf handles its absence)
    vi.stubGlobal("window", {});
});

afterEach(() => vi.unstubAllGlobals());

describe("useGpuSubstrate — the transparent picker degrade contract (W-GPU-SUBSTRATE)", () => {
    it("degrades to the WebGL2 backend when navigator.gpu is absent (jsdom)", async () => {
        // No navigator.gpu → the picker must select WebGL2.
        vi.stubGlobal("navigator", {});
        const glStub = { getExtension: () => null } as unknown as WebGL2RenderingContext;
        const canvas = makeCanvas((id) => (id === "webgl2" ? glStub : null));

        let frames = 0;
        let live = true;
        const substrate = createGpuSubstrate(canvas, {
            // a viz authors BOTH setups; with no navigator.gpu the GL path is selected
            setupWGPU: () => {
                throw new Error("setupWGPU must NOT run on the degrade path");
            },
            setupGL: (gl) => {
                expect(gl).toBe(glStub);
                return {
                    frame: () => {
                        frames += 1;
                    },
                    shouldContinue: () => live,
                    resize: vi.fn(),
                };
            },
        });

        expect(substrate.backend).toBe("webgl2");
        // The uniform start seam: `armAsync` resolves immediately on the WebGL2 path.
        await substrate.armAsync();
        expect(canvas.getContext).toHaveBeenCalledWith("webgl2", undefined);
        // the demand-driven loop ran the consumer's frame (delta-asserted so the presize
        // layout-settle rAFs sharing the queue don't skew the count).
        expect(pumpFrames(() => frames, 5)).toBeGreaterThan(0);

        // demand-gate parks; wake re-arms (the uniform handle drives generically)
        live = false;
        pumpFrames(() => frames, 3); // drain the in-flight tick that observes live=false
        const settled = frames;
        expect(pumpFrames(() => frames, 5)).toBe(0); // parked — no perpetual re-raster
        live = true;
        substrate.wake();
        expect(pumpFrames(() => frames, 1)).toBe(1);

        // renderAt draws one frame out of loop (capture parity)
        const beforeRenderAt = frames;
        substrate.renderAt(0.5);
        expect(frames).toBe(beforeRenderAt + 1);

        substrate.dispose();
    });

    it("exposes a uniform handle shape regardless of backend", async () => {
        vi.stubGlobal("navigator", {});
        const canvas = makeCanvas(() => ({ getExtension: () => null }));
        const substrate = createGpuSubstrate(canvas, {
            setupGL: () => ({
                frame: vi.fn(),
                shouldContinue: () => false,
                resize: vi.fn(),
            }),
        });
        for (const key of [
            "backend",
            "armAsync",
            "arm",
            "suspend",
            "resume",
            "wake",
            "renderAt",
            "dispose",
            "reducedMotion",
        ]) {
            expect(key in substrate).toBe(true);
        }
        substrate.dispose();
    });
});

describe("createWebGPUCanvas — the async device-acquisition prelude (W-GPU-SUBSTRATE)", () => {
    function stubWebGPU(canvas: HTMLCanvasElement) {
        const device = {
            lost: new Promise(() => {}), // never resolves in this test
            pushErrorScope: vi.fn(),
            popErrorScope: vi.fn(async () => null),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            destroy: vi.fn(),
        };
        const adapter = { requestDevice: vi.fn(async () => device) };
        const gpu = {
            requestAdapter: vi.fn(async () => adapter),
            getPreferredCanvasFormat: vi.fn(() => "bgra8unorm"),
        };
        vi.stubGlobal("navigator", { gpu });
        const gpuContext = { configure: vi.fn() };
        (canvas.getContext as any).mockImplementation((id: string) =>
            id === "webgpu" ? gpuContext : null,
        );
        return { device, adapter, gpu, gpuContext };
    }

    it("picks the WebGPU backend + runs the consumer setup over the resolved device", async () => {
        const canvas = makeCanvas(() => null);
        const { gpu, adapter, gpuContext } = stubWebGPU(canvas);

        let setupCalledWith: { device: unknown; format: unknown } | null = null;
        const substrate = createGpuSubstrate(canvas, {
            setupWGPU: (device, _ctx, format) => {
                setupCalledWith = { device, format };
                return {
                    frame: vi.fn(),
                    shouldContinue: () => false,
                    resize: vi.fn(),
                };
            },
            setupGL: () => {
                throw new Error("setupGL must NOT run when WebGPU is selected");
            },
        });

        expect(substrate.backend).toBe("webgpu");
        await substrate.armAsync();

        expect(gpu.requestAdapter).toHaveBeenCalledTimes(1);
        expect(adapter.requestDevice).toHaveBeenCalledTimes(1);
        expect(gpuContext.configure).toHaveBeenCalledTimes(1);
        expect(setupCalledWith).not.toBeNull();
        expect(setupCalledWith!.format).toBe("bgra8unorm");

        substrate.dispose();
    });

    it("armAsync is idempotent — a second call does not re-acquire the device", async () => {
        const canvas = makeCanvas(() => null);
        const { gpu } = stubWebGPU(canvas);
        const handle = createWebGPUCanvas(canvas, {
            setup: () => ({ frame: vi.fn(), shouldContinue: () => false, resize: vi.fn() }),
        });
        await handle.armAsync();
        await handle.armAsync();
        expect(gpu.requestAdapter).toHaveBeenCalledTimes(1);
        handle.dispose();
    });

    it("a no-adapter init failure REJECTS with the typed WebGPUInitError + does NOT fire onInitError (BC.W-WEBGPU-EVERYWHERE D8')", async () => {
        // The D8' close: a no-adapter host is a RECOGNIZED substrate decision the picker
        // handles — NOT a contract violation. The leaf rejects with the typed signal
        // (NOT a bare uncaught throw) AND does NOT fire the consumer's onInitError (that
        // contract is reserved for a genuine POST-arm shader/OOM violation). The picker
        // catches the typed signal to fall to the WebGL2 net silently.
        const canvas = makeCanvas(() => null);
        const gpu = {
            requestAdapter: vi.fn(async () => null), // no adapter
            getPreferredCanvasFormat: vi.fn(() => "bgra8unorm"),
        };
        vi.stubGlobal("navigator", { gpu });
        const onInitError = vi.fn();
        const handle = createWebGPUCanvas(canvas, {
            setup: () => ({ frame: vi.fn(), shouldContinue: () => false, resize: vi.fn() }),
            onInitError,
        });
        await expect(handle.armAsync()).rejects.toBeInstanceOf(WebGPUInitError);
        // The recognized init failure does NOT spew through onInitError (the picker owns
        // the fall, silently).
        expect(onInitError).not.toHaveBeenCalled();
        handle.dispose();
    });
});

describe("createGpuSubstrate — the try-WebGPU-then-rebuild-WebGL2 picker (BC.W-WEBGPU-EVERYWHERE D8)", () => {
    it("FALLS to the WebGL2 net SILENTLY when navigator.gpu exists but requestAdapter returns null", async () => {
        // The keystone bug: navigator.gpu PRESENT (so the old presence-only picker
        // committed WebGPU) but requestAdapter() returns null (headless/SwiftShader/
        // blocklisted) — the old picker THREW `no GPU adapter` to the page → black void.
        // The fix: the picker attempts WebGPU, catches the rejection, and rebuilds on the
        // WebGL2 net — SILENTLY (no onInitError, the user never sees a downgrade).
        const gpu = {
            requestAdapter: vi.fn(async () => null), // adapter-less host
            getPreferredCanvasFormat: vi.fn(() => "bgra8unorm"),
        };
        vi.stubGlobal("navigator", { gpu });
        const glStub = { getExtension: () => null } as unknown as WebGL2RenderingContext;
        const canvas = makeCanvas((id) => (id === "webgl2" ? glStub : null));

        let glFrames = 0;
        let live = true;
        let fellTo: string | null = null;
        const onInitError = vi.fn();
        const substrate = createGpuSubstrate(canvas, {
            setupWGPU: () => ({
                frame: vi.fn(),
                shouldContinue: () => false,
                resize: vi.fn(),
            }),
            setupGL: (gl) => {
                expect(gl).toBe(glStub);
                return {
                    frame: () => {
                        glFrames += 1;
                    },
                    shouldContinue: () => live,
                    resize: vi.fn(),
                };
            },
            onInitError, // must NOT fire — a no-adapter fall is silent insurance
            onBackendFallback: ({ to }) => {
                fellTo = to;
            },
        });

        // Optimistic start: backend is "webgpu" (supportsWebGPU is a presence check).
        expect(substrate.backend).toBe("webgpu");
        // armAsync attempts WebGPU, catches the no-adapter reject, rebuilds the WebGL2 net.
        await substrate.armAsync();

        // The fall happened — SILENTLY (no thrown error spewed; onInitError untouched).
        expect(gpu.requestAdapter).toHaveBeenCalledTimes(1);
        expect(substrate.backend).toBe("webgl2"); // the resolved backend is the net
        expect(fellTo).toBe("webgl2");
        expect(onInitError).not.toHaveBeenCalled(); // a no-adapter fall is NOT an error
        // The WebGL2 net armed + the consumer's frame runs — the substrate PAINTS, never
        // a black void (the D8 close).
        expect(canvas.getContext).toHaveBeenCalledWith("webgl2", undefined);
        // the WebGL2 net's loop runs the consumer's frame (delta-asserted so the presize
        // layout-settle rAFs sharing the queue don't skew the count).
        expect(pumpFrames(() => glFrames, 5)).toBeGreaterThan(0);

        substrate.dispose();
    });
});
