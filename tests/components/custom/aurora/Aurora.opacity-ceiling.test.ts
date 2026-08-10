import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick, type Ref } from "vue";

const auroraState = vi.hoisted(() => ({
    isArmed: undefined as Ref<boolean> | undefined,
    isSettled: undefined as Ref<boolean> | undefined,
}));

vi.mock("@glass/components/aurora/composables/useAurora", async () => {
    const { ref } = await vi.importActual<typeof import("vue")>("vue");
    const isArmed = ref(false);
    // The settle beacon rides the same mocked door as the arm flag — `Aurora.vue`
    // publishes it as `data-aurora-settled`, so a mock that omits it renders a template
    // that cannot mount.
    const isSettled = ref(false);
    const rendererStatus = ref({
        phase: "ready" as const,
        engine: "css" as const,
        adapter: "Static paint",
    });
    auroraState.isArmed = isArmed;
    auroraState.isSettled = isSettled;

    return {
        useAurora: () => ({
            setCursor: () => undefined,
            clearCursor: () => undefined,
            setCursorRadius: () => undefined,
            renderAt: () => undefined,
            pause: () => undefined,
            resume: () => undefined,
            isArmed,
            isSettled,
            rendererStatus,
        }),
    };
});

vi.mock(
    "@glass/components/aurora/composables/auroraFallbackGround",
    () => ({
        auroraFallbackGround: () => ({
            backgroundImage: "linear-gradient(#123, #456)",
            backgroundColor: "#123",
        }),
    }),
);

import Aurora from "@glass/components/aurora/Aurora.vue";

const wrappers: ReturnType<typeof mount>[] = [];

describe("Aurora opacity ceiling", () => {
    beforeEach(() => {
        auroraState.isArmed!.value = false;
    });

    afterEach(() => {
        for (const wrapper of wrappers.splice(0)) wrapper.unmount();
    });

    it("applies the route ceiling once around the CSS fallback field", () => {
        const wrapper = mount(Aurora, {
            props: { renderMode: "css", opacityCeiling: 0.55 },
        });
        wrappers.push(wrapper);

        const root = wrapper.get(".aurora-root").element as HTMLElement;
        const placeholder = wrapper.get(".aurora-placeholder").element as HTMLElement;
        const canvasLayer = wrapper.get(".aurora-canvas-layer").element as HTMLElement;

        expect(root.dataset.auroraSubstrate).toBe("css");
        expect(root.style.opacity).toBe("0.55");
        expect(placeholder.style.opacity).toBe("");
        expect(canvasLayer.style.opacity).toBe("");
    });

    it("keeps the armed canvas handoff at one inside the total envelope", async () => {
        const wrapper = mount(Aurora, {
            props: {
                renderMode: "webgl",
                opacityCeiling: 0.55,
                runtimeOptions: { forceWebGLUnderSoftwareRaster: true },
            },
        });
        wrappers.push(wrapper);

        const canvasLayer = wrapper.get(".aurora-canvas-layer");
        expect(canvasLayer.classes()).not.toContain("aurora-canvas-layer--armed");
        expect((canvasLayer.element as HTMLElement).style.opacity).toBe("");

        auroraState.isArmed!.value = true;
        await nextTick();

        expect(canvasLayer.classes()).toContain("aurora-canvas-layer--armed");
        expect((canvasLayer.element as HTMLElement).style.opacity).toBe("");
    });
});
