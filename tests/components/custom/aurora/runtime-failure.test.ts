import { beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope } from "vue";

const substrate = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("@glass/components/aurora/constants/renderMode", () => ({
    isSoftwareWebGLRenderer: () => true,
}));
vi.mock("@glass/composables/glass/webgpu/useGpuSubstrate", () => ({
    createGpuSubstrate: substrate.create,
}));

import { createAurora } from "@glass/components/aurora/composables/runtime";
import { DEFAULT_AURORA_CONFIG } from "@glass/components/aurora/constants/presets";

describe("P045 — Aurora runtime failure identity", () => {
    beforeEach(() => substrate.create.mockReset());

    it("rejects direct software-raster readiness instead of resolving a blank CSS handle", async () => {
        const onInitError = vi.fn();
        const onRendererStatus = vi.fn();
        const scope = effectScope();
        const runtime = scope.run(() =>
            createAurora(document.createElement("canvas"), DEFAULT_AURORA_CONFIG, {
                onInitError,
                onRendererStatus,
            }),
        )!;

        expect(substrate.create).not.toHaveBeenCalled();
        expect(onRendererStatus).toHaveBeenLastCalledWith(
            expect.objectContaining({ phase: "error", engine: "webgl2" }),
        );
        await expect(runtime.armAsync()).rejects.toThrow("software rasterization");
        await expect(runtime.armAsync()).rejects.toThrow("software rasterization");
        expect(onInitError).toHaveBeenCalledOnce();
        scope.stop();
    });
});
