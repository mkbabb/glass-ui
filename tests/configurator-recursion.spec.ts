import { mount } from "@vue/test-utils";
import { computed, defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import { SegmentedTabs } from "@glass/components/tabs";

interface AxisConfig {
    blobCount: number;
    speed: number;
    threshold: number;
    baseRadius: number;
    orbitAmplitude: number;
    colors: string[];
    bgAlpha: number;
    edgeSoftness: number;
}

const PRESETS: ConfiguratorPreset<AxisConfig>[] = [
    {
        key: "warm",
        label: "Warm",
        config: {
            blobCount: 10,
            speed: 0.1,
            threshold: 0.92,
            baseRadius: 0.15,
            orbitAmplitude: 0.24,
            colors: ["#E31937", "#FF8A3D", "#FFD166"],
            bgAlpha: 0.04,
            edgeSoftness: 0.38,
        },
    },
    {
        key: "cool",
        label: "Cool",
        config: {
            blobCount: 7,
            speed: 0.16,
            threshold: 0.86,
            baseRadius: 0.17,
            orbitAmplitude: 0.28,
            colors: ["#2DD4BF", "#38BDF8", "#A78BFA"],
            bgAlpha: 0.12,
            edgeSoftness: 0.42,
        },
    },
    {
        key: "mono",
        label: "Mono",
        config: {
            blobCount: 12,
            speed: 0.06,
            threshold: 1.05,
            baseRadius: 0.1,
            orbitAmplitude: 0.32,
            colors: ["#0F172A", "#334155", "#475569"],
            bgAlpha: 0.08,
            edgeSoftness: 0.22,
        },
    },
];

const MultiAxisConfiguratorHost = defineComponent({
    setup(_, { expose }) {
        const studio = useConfiguratorState({
            presets: PRESETS,
            initialPreset: "warm",
        });
        const cfg = studio.config;
        const activePreset = computed(() => studio.activePreset.value ?? "");
        const derivedMode = computed(() => {
            if (cfg.speed < 0.04) return "still";
            if (cfg.speed < 0.12) return "drift";
            return "orbit";
        });

        const setDerivedMode = (mode: string | string[]) => {
            const value = Array.isArray(mode) ? mode[0] : mode;
            const [speed, orbitAmplitude] = value === "still"
                ? [0.02, 0.12]
                : value === "drift"
                    ? [0.08, 0.24]
                    : [0.18, 0.34];
            cfg.speed = speed;
            cfg.orbitAmplitude = orbitAmplitude;
        };
        const commitColor = (index: number, value: string) => {
            if (cfg.colors[index] !== undefined) cfg.colors[index] = value;
        };
        const addColor = () => cfg.colors.push("#cccccc");
        const removeColor = (index: number) => cfg.colors.splice(index, 1);

        expose({ studio, commitColor, addColor, removeColor, setDerivedMode });

        return () =>
            h(
                Configurator,
                {
                    presets: PRESETS,
                    activePreset: activePreset.value,
                    onSelectPreset: studio.selectPreset,
                    onReset: studio.resetCurrent,
                },
                {
                    stage: () =>
                        h(
                            "span",
                            { "data-testid": "stage" },
                            `${activePreset.value} · ${derivedMode.value}`,
                        ),
                    default: () => [
                        h(
                            ConfiguratorLayer,
                            { label: "Color" },
                            () =>
                                h(
                                    ConfiguratorRow,
                                    { label: "Stops", name: "colors" },
                                    () =>
                                        cfg.colors.map((color, index) =>
                                            h("input", {
                                                key: index,
                                                value: color,
                                                onInput: (event: Event) =>
                                                    commitColor(
                                                        index,
                                                        (event.target as HTMLInputElement)
                                                            .value,
                                                    ),
                                            }),
                                        ),
                                ),
                        ),
                        h(
                            ConfiguratorLayer,
                            { label: "Motion" },
                            () =>
                                h(
                                    ConfiguratorRow,
                                    { label: "Mode", name: "derivedMode" },
                                    () =>
                                        h(SegmentedTabs, {
                                            options: ["still", "drift", "orbit"].map(
                                                (value) => ({ label: value, value }),
                                            ),
                                            modelValue: derivedMode.value,
                                            "onUpdate:modelValue": setDerivedMode,
                                        }),
                                ),
                        ),
                    ],
                },
            );
    },
});

type HostExpose = {
    studio: ReturnType<typeof useConfiguratorState<AxisConfig>>;
    commitColor(index: number, value: string): void;
    addColor(): void;
    removeColor(index: number): void;
    setDerivedMode(mode: string): void;
};

afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
});

describe("Configurator recursion", () => {
    it("survives a cold-start burst and interleaved mutations", async () => {
        const warnings = vi
            .spyOn(console, "warn")
            .mockImplementation(() => undefined);
        const wrapper = mount(MultiAxisConfiguratorHost, {
            attachTo: document.body,
        });
        const host = wrapper.vm as unknown as HostExpose;

        host.studio.selectPreset("cool");
        host.commitColor(0, "#abcdef");
        host.setDerivedMode("orbit");
        host.studio.selectPreset("mono");
        await nextTick();
        await nextTick();

        for (const mutate of [
            () => host.addColor(),
            () => host.commitColor(1, "#fedcba"),
            () => host.studio.selectPreset("warm"),
            () => host.setDerivedMode("drift"),
            () => host.removeColor(0),
            () => host.studio.selectPreset("cool"),
        ]) {
            mutate();
            await nextTick();
        }

        expect(wrapper.get('[data-testid="stage"]').text()).toBe("cool · orbit");
        expect(warnings.mock.calls.flat().join(" ")).not.toMatch(
            /Maximum recursive updates exceeded/i,
        );
        wrapper.unmount();
    });
});
