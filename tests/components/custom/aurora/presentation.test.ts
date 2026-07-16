import { beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope } from "vue";

const substrate = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("@glass/components/aurora/constants/renderMode", () => ({
    isSoftwareWebGLRenderer: () => false,
}));
vi.mock("@glass/composables/glass/webgpu/useGpuSubstrate", () => ({
    createGpuSubstrate: substrate.create,
}));

import {
    createAurora,
    resolveAuroraPresentation,
} from "@glass/components/aurora/composables/runtime";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/constants/presets";

const handle = {
    arm: vi.fn(),
    armAsync: vi.fn(async () => undefined),
    suspend: vi.fn(),
    resume: vi.fn(),
    wake: vi.fn(),
    renderAt: vi.fn(),
    dispose: vi.fn(),
    reducedMotion: false,
};

describe("Aurora presentation ownership", () => {
    beforeEach(() => {
        substrate.create.mockReset().mockReturnValue(handle);
        for (const fn of Object.values(handle)) {
            if (typeof fn === "function" && "mockClear" in fn) fn.mockClear();
        }
    });

    it("presents live pixels opaque and applies authored alpha once over the ground", () => {
        const canvas = document.createElement("canvas");
        canvas.style.opacity = "0.8";
        const config = { ...DEFAULT_AURORA_CONFIG, alpha: 0.26 };
        const scope = effectScope();
        const runtime = scope.run(() =>
            createAurora(canvas, config, {
                forceWebGLUnderSoftwareRaster: true,
            }),
        )!;
        const options = substrate.create.mock.calls[0]![1];

        expect(resolveAuroraPresentation()).toEqual({
            opaque: true,
            alphaMode: "opaque",
            contextAlpha: false,
        });
        expect(options).toMatchObject({
            alphaMode: "opaque",
            contextAttrs: { alpha: false, premultipliedAlpha: false },
        });
        expect(canvas.style.opacity).toBe("0.26");

        runtime.update({ ...config, alpha: 0.55 });
        expect(canvas.style.opacity).toBe("0.55");

        runtime.dispose();
        scope.stop();
        expect(canvas.style.opacity).toBe("0.8");
        expect(handle.dispose).toHaveBeenCalledOnce();
    });

    it("leaves capture alpha in the transparent premultiplied buffer", () => {
        const canvas = document.createElement("canvas");
        canvas.style.opacity = "0.8";
        const scope = effectScope();
        const runtime = scope.run(() =>
            createAurora(
                canvas,
                { ...DEFAULT_AURORA_CONFIG, alpha: 0.26 },
                {
                    mode: "capture",
                    forceWebGLUnderSoftwareRaster: true,
                },
            ),
        )!;
        const options = substrate.create.mock.calls[0]![1];

        expect(resolveAuroraPresentation("capture")).toEqual({
            opaque: false,
            alphaMode: "premultiplied",
            contextAlpha: true,
        });
        expect(options).toMatchObject({
            alphaMode: "premultiplied",
            contextAttrs: { alpha: true, premultipliedAlpha: true },
        });
        expect(canvas.style.opacity).toBe("0.8");

        runtime.dispose();
        scope.stop();
        expect(canvas.style.opacity).toBe("0.8");
    });
});
