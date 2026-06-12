// N.W5 Defect-A — the adaptive substrate's software-WebGL signal + the existing
// low-power signals. `resolveRenderMode("auto")` must resolve to `"css"` (the
// static gradient placeholder, no full-viewport WebGL surface) on a SOFTWARE
// renderer (SwiftShader / llvmpipe / MS Basic Render — the GPU-blocklisted path),
// because a full-viewport software-rastered GL layer stalls every pointer-driven
// composite and hangs the page under interaction. The richer `"webgl"` substrate
// is kept only when NO low-power signal is present AND the renderer is hardware.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveRenderMode } from "../../../../src/components/custom/aurora/constants/renderMode";

const UNMASKED = 0x9246;

/** A fake canvas whose webgl2 context reports `renderer` via the debug ext. */
function fakeCanvasWithRenderer(renderer: string | null) {
    const gl =
        renderer === null
            ? null
            : {
                  getExtension: (n: string) =>
                      n === "WEBGL_debug_renderer_info"
                          ? { UNMASKED_RENDERER_WEBGL: UNMASKED }
                          : n === "WEBGL_lose_context"
                            ? { loseContext: () => {} }
                            : null,
                  getParameter: (p: number) => (p === UNMASKED ? renderer : ""),
              };
    return { getContext: (t: string) => (t === "webgl2" ? gl : null) };
}

/** Stub the env to a CAPABLE hardware device (no low-power signal), with the
 *  given WebGL renderer string (or null = no webgl2). */
function stubEnv(renderer: string | null) {
    vi.stubGlobal("navigator", { hardwareConcurrency: 8 });
    vi.stubGlobal("window", {
        matchMedia: () => ({ matches: false }),
    });
    vi.stubGlobal("document", {
        createElement: () => fakeCanvasWithRenderer(renderer),
    });
}

afterEach(() => vi.unstubAllGlobals());

describe("resolveRenderMode — adaptive substrate tier", () => {
    it("passes through explicit webgl/css unchanged", () => {
        expect(resolveRenderMode("webgl")).toBe("webgl");
        expect(resolveRenderMode("css")).toBe("css");
    });

    it("auto → css on a SwiftShader (software) renderer", () => {
        stubEnv("ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device), SwiftShader driver)");
        expect(resolveRenderMode("auto")).toBe("css");
    });

    it("auto → css on llvmpipe / MS Basic Render", () => {
        stubEnv("llvmpipe (LLVM 12.0.0, 256 bits)");
        expect(resolveRenderMode("auto")).toBe("css");
        stubEnv("Microsoft Basic Render Driver");
        expect(resolveRenderMode("auto")).toBe("css");
    });

    it("auto → webgl on a hardware GPU with no low-power signal", () => {
        stubEnv("ANGLE (Apple, Apple M1 Pro, OpenGL 4.1)");
        expect(resolveRenderMode("auto")).toBe("webgl");
    });

    it("auto → webgl when the renderer probe is unavailable (no false downgrade)", () => {
        stubEnv(null); // no webgl2 context — cannot prove software
        expect(resolveRenderMode("auto")).toBe("webgl");
    });

    it("auto → css still wins on a low-core device even with a hardware renderer", () => {
        vi.stubGlobal("navigator", { hardwareConcurrency: 2 });
        vi.stubGlobal("window", { matchMedia: () => ({ matches: false }) });
        vi.stubGlobal("document", {
            createElement: () =>
                fakeCanvasWithRenderer("ANGLE (Apple, Apple M1 Pro, OpenGL 4.1)"),
        });
        expect(resolveRenderMode("auto")).toBe("css");
    });

    it("auto → css under prefers-reduced-motion (existing signal, regression)", () => {
        vi.stubGlobal("navigator", { hardwareConcurrency: 8 });
        vi.stubGlobal("window", { matchMedia: () => ({ matches: true }) });
        vi.stubGlobal("document", {
            createElement: () =>
                fakeCanvasWithRenderer("ANGLE (Apple, Apple M1 Pro, OpenGL 4.1)"),
        });
        expect(resolveRenderMode("auto")).toBe("css");
    });
});
