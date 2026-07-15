import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const substrate = vi.hoisted(() => ({
    armAsync: vi.fn(async () => undefined),
    dispose: vi.fn(),
    wake: vi.fn(),
}));

vi.mock("@glass/composables/glass/webgpu/useGpuSubstrate", () => ({
    createGpuSubstrate: vi.fn(() => ({
        backend: "webgl2",
        reducedMotion: false,
        arm: vi.fn(),
        armAsync: substrate.armAsync,
        presize: vi.fn(),
        suspend: vi.fn(),
        resume: vi.fn(),
        wake: substrate.wake,
        renderAt: vi.fn(),
        dispose: substrate.dispose,
    })),
}));

import Constellation from "@glass/components/constellation/Constellation.vue";

describe("Constellation palette lifecycle", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("wakes for a root theme mutation and stops after unmount", async () => {
        const wrapper = mount(Constellation, { attachTo: document.body });
        substrate.wake.mockClear();

        document.documentElement.classList.add("dark");
        await vi.waitFor(() => expect(substrate.wake).toHaveBeenCalledTimes(1));

        wrapper.unmount();
        expect(substrate.dispose).toHaveBeenCalledTimes(1);
        substrate.wake.mockClear();

        document.documentElement.classList.remove("dark");
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(substrate.wake).not.toHaveBeenCalled();
    });
});
