import { mount, shallowMount } from "@vue/test-utils";
import { nextTick, reactive } from "vue";
import { describe, expect, it, vi } from "vitest";

import { Aurora, configToAtoms, DEFAULT_AURORA_CONFIG } from "@glass/components/aurora";
import AuroraStage from "../../demo/stories/substrates/aurora/AuroraStage.vue";
import AuroraConfigDock from "../../demo/stories/substrates/aurora/AuroraConfigDock.vue";
import AuroraMotionSection from "../../demo/stories/substrates/aurora/sections/AuroraMotionSection.vue";
import { PRESETS } from "../../demo/stories/substrates/aurora/presets";

describe("Aurora demo pointer affordance", () => {
    it("fills the parent-owned stage aperture without imposing a second floor", () => {
        const stage = shallowMount(AuroraStage, {
            props: { config: DEFAULT_AURORA_CONFIG },
        });
        const classes = stage.get("div.relative").classes();

        expect(classes).toEqual(expect.arrayContaining(["h-full", "min-h-0"]));
        expect(classes).not.toContain("min-h-[30rem]");

        const aurora = shallowMount(Aurora, { props: { renderMode: "css" } });
        expect(aurora.get(".aurora-placeholder").classes()).toContain("min-h-0");
        expect(aurora.get(".aurora-canvas-layer").classes()).toContain("min-h-0");
    });

    it("advertises pointer shaping only on a ready animated renderer", async () => {
        let onPreferenceChange: ((event: MediaQueryListEvent) => void) | undefined;
        const preference = {
            matches: false,
            media: "(prefers-reduced-motion: reduce)",
            onchange: null,
            addEventListener: vi.fn(
                (_type: string, listener: (event: MediaQueryListEvent) => void) => {
                    onPreferenceChange = listener;
                },
            ),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        } as unknown as MediaQueryList;
        vi.spyOn(window, "matchMedia").mockReturnValue(preference);

        const wrapper = shallowMount(AuroraStage, {
            props: {
                config: {
                    ...DEFAULT_AURORA_CONFIG,
                    interactivity: { swirl: true, amplitude: 0.45 },
                },
            },
        });
        const stage = () => wrapper.get("div.relative");
        const aurora = wrapper.findComponent(Aurora);

        expect(stage().classes()).not.toContain("cursor-crosshair");
        expect(wrapper.text()).not.toContain("move to shape the field");

        aurora.vm.$emit("renderer-status", {
            phase: "ready",
            engine: "webgpu",
            adapter: "test adapter",
        });
        await nextTick();

        expect(stage().classes()).toContain("cursor-crosshair");
        expect(wrapper.text()).toContain("move to shape the field");

        Object.assign(preference, { matches: true });
        onPreferenceChange?.({
            matches: true,
            currentTarget: preference,
        } as unknown as MediaQueryListEvent);
        await nextTick();

        expect(stage().classes()).not.toContain("cursor-crosshair");
        expect(wrapper.text()).not.toContain("move to shape the field");

        Object.assign(preference, { matches: false });
        onPreferenceChange?.({
            matches: false,
            currentTarget: preference,
        } as unknown as MediaQueryListEvent);
        aurora.vm.$emit("renderer-status", {
            phase: "ready",
            engine: "css",
            adapter: "Static paint",
        });
        await nextTick();

        expect(stage().classes()).not.toContain("cursor-crosshair");
        expect(wrapper.text()).not.toContain("move to shape the field");

        await wrapper.setProps({ interactive: false });

        expect(stage().classes()).not.toContain("cursor-crosshair");
        expect(wrapper.text()).not.toContain("move to shape the field");
    });

    it("authors every studio preset with a bounded visible pointer response", () => {
        for (const preset of Object.values(PRESETS)) {
            expect(preset.interactivity?.swirl).toBe(true);
            expect(preset.interactivity?.amplitude).toBe(0.45);
        }
    });

    it("keeps textured cursor light through a pointer-amplitude atom edit", async () => {
        const config = reactive({
            ...PRESETS.OIL_IMPASTO,
            interactivity: {
                ...PRESETS.OIL_IMPASTO.interactivity,
                light: true,
            },
        });
        const wrapper = mount(AuroraConfigDock, {
            props: { config, presetKey: "OIL_IMPASTO" },
            global: {
                stubs: {
                    FadingScroll: { template: "<div><slot /></div>" },
                    ConfiguratorLayer: { template: "<section><slot /></section>" },
                },
            },
        });
        const motion = wrapper.findComponent(AuroraMotionSection);
        const amplitude = motion
            .findAllComponents({ name: "LabeledSlider" })
            .find((control) => control.props("label") === "Pointer amplitude");

        expect(amplitude).toBeDefined();
        amplitude!.vm.$emit("update:modelValue", 0.7);
        await nextTick();

        expect(config.interactivity).toMatchObject({
            swirl: true,
            amplitude: 0.7,
            light: true,
        });
    });

    it("offers pointer shaping on every medium and cursor light only on paint", async () => {
        const smoothAtoms = reactive(configToAtoms(PRESETS.SETTING_SUN));
        const wrapper = shallowMount(AuroraMotionSection, {
            props: { atoms: smoothAtoms, config: PRESETS.SETTING_SUN },
        });
        const labels = () =>
            [
                ...wrapper.findAllComponents({ name: "LabeledSlider" }),
                ...wrapper.findAllComponents({ name: "LabeledSwitch" }),
            ].map((control) => control.props("label"));

        expect(labels()).toContain("Pointer shaping");
        expect(labels()).toContain("Pointer amplitude");
        expect(labels()).not.toContain("Cursor light");

        await wrapper.setProps({
            atoms: reactive(
                configToAtoms({
                    ...PRESETS.OIL_GESTURAL,
                    interactivity: {
                        ...PRESETS.OIL_GESTURAL.interactivity,
                        light: true,
                    },
                }),
            ),
            config: PRESETS.OIL_GESTURAL,
        });

        expect(labels()).toContain("Cursor light");
    });
});
