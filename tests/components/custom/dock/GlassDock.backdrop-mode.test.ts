import { mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const sampleBackdrop = vi.hoisted(() => vi.fn());

vi.mock("@glass/composables/glass/useGlassBackdropLuminance", () => ({
    useGlassBackdropLuminance: sampleBackdrop,
}));

import { GlassDock } from "@glass/components/dock";
import type { BackdropMode } from "@glass/components/_shared/axes";

describe("GlassDock backdrop mode", () => {
    beforeEach(() => sampleBackdrop.mockClear());

    it("keeps the live backdrop as the default", () => {
        const wrapper = mount(GlassDock);

        expect(wrapper.get(".glass-dock").attributes("data-backdrop-mode")).toBe("live");
        expect(sampleBackdrop).toHaveBeenCalledOnce();
        wrapper.unmount();
    });

    it("witnesses static mode without mounting the backdrop sampler", () => {
        const mode: BackdropMode = "static";
        const wrapper = mount(GlassDock, { props: { backdropMode: mode } });

        expect(wrapper.get(".glass-dock").attributes("data-backdrop-mode")).toBe(mode);
        expect(sampleBackdrop).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});
