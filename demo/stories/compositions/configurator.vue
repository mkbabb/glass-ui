<script setup lang="ts">
// Configurator — the canonical studio shell: preset row + a grouped
// <ConfiguratorLayer>, a live specimen stage that paints the config, a
// bounded studio height, and a responsive density that reads `mobile` at
// narrow container widths and `comfortable` when there is room. The Aurora
// flat story (`demo/stories/aurora.vue`) is the configurator-in-anger over
// a real WebGL field; this story is the primitive shown honestly.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Configurator,
    ConfiguratorLayer,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../../src/components/custom/configurator";
import {
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";

interface Cfg {
    medium: string;
    spread: number;
    bloom: number;
    grain: boolean;
}

const mediums = ["aurora", "ink", "gouache"] as const;

// Each medium tilts the specimen's hue triad — the stage reads the medium
// as a distinct palette so the Select is visibly load-bearing, not decorative.
const MEDIUM_HUES: Record<string, readonly [string, string, string]> = {
    aurora: [
        "var(--rainbow-pastel-blue)",
        "var(--rainbow-pastel-indigo)",
        "var(--rainbow-pastel-violet)",
    ],
    ink: [
        "var(--rainbow-pastel-indigo)",
        "var(--rainbow-pastel-blue)",
        "var(--rainbow-pastel-green)",
    ],
    gouache: [
        "var(--rainbow-pastel-orange)",
        "var(--rainbow-pastel-red)",
        "var(--rainbow-pastel-yellow)",
    ],
};

const presets: readonly ConfiguratorPreset<Cfg>[] = [
    {
        key: "quiet",
        label: "Quiet",
        config: { medium: "ink", spread: 28, bloom: 18, grain: false },
    },
    {
        key: "default",
        label: "Default",
        config: { medium: "aurora", spread: 60, bloom: 50, grain: true },
    },
    {
        key: "lush",
        label: "Lush",
        config: { medium: "gouache", spread: 92, bloom: 82, grain: true },
    },
];

const cfg = useConfiguratorState<Cfg>({
    presets,
    initialPreset: "default",
});

const mediumOpen = ref(false);

// Live specimen geometry — every axis is driven off the config so the stage
// SHOWS the configurator rather than printing it. Spread fans the three
// nuclei apart; bloom feathers each blob's radius + blur.
const hues = computed(
    () => MEDIUM_HUES[cfg.config.medium] ?? MEDIUM_HUES.aurora!,
);

const stageStyle = computed(() => {
    const spread = cfg.config.spread / 100; // 0..1
    const bloom = cfg.config.bloom / 100; // 0..1
    // Spread pushes the side nuclei toward the edges; bloom sets the ellipse
    // size + the soft falloff stop.
    const offset = 14 + spread * 30; // % from center
    const radius = 34 + bloom * 30; // % ellipse size
    const stop = 46 + bloom * 22; // % falloff
    const [a, b, c] = hues.value;
    return {
        background: [
            `radial-gradient(ellipse ${radius}% ${radius * 0.86}% at ${50 - offset}% ${42 - spread * 8}%, color-mix(in srgb, ${a} 88%, transparent), transparent ${stop}%)`,
            `radial-gradient(ellipse ${radius * 0.94}% ${radius * 0.8}% at ${50 + offset}% ${40 + spread * 6}%, color-mix(in srgb, ${b} 84%, transparent), transparent ${stop}%)`,
            `radial-gradient(ellipse ${radius * 1.04}% ${radius * 0.9}% at 50% ${74 + spread * 10}%, color-mix(in srgb, ${c} 80%, transparent), transparent ${stop + 4}%)`,
        ].join(", "),
        filter: `blur(${(4 + bloom * 22).toFixed(1)}px)`,
    };
});

// Responsive density — ONE configurator reads `mobile` at narrow widths and
// `comfortable` when the viewport has room (the responsive merge that retires
// the prior side-by-side `configurator-mobile` route). A small reactive
// matchMedia ref, no vueuse dependency.
const isNarrow = ref(false);
let mql: MediaQueryList | null = null;
const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
    isNarrow.value = e.matches;
};
onMounted(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    mql = window.matchMedia("(max-width: 720px)");
    isNarrow.value = mql.matches;
    mql.addEventListener("change", onChange);
});
onBeforeUnmount(() => {
    mql?.removeEventListener("change", onChange);
});

const density = computed(() => (isNarrow.value ? "mobile" : "comfortable"));
</script>

<template>
    <StoryPage>
        <StorySection
            label="studio shell — preset · layer · live stage"
            blurb="One responsive configurator. The stage paints the live config — drag spread to fan the field, bloom to feather it, grain to layer the paper overlay. Density reads `mobile` at narrow widths and `comfortable` when there is room; the preset row drives useConfiguratorState (active-preset / isDirty / reset)."
        >
            <ShowcaseFrame pad="lg" tier="quiet">
                <Configurator
                    class="h-[min(70vh,560px)]"
                    :density="density"
                    :presets="presets"
                    :active-preset="cfg.activePreset.value"
                    @select-preset="cfg.selectPreset"
                    @reset="cfg.resetCurrent"
                >
                    <template #stage>
                        <!-- Live specimen: a painterly field that responds to
                             the config. The aurora story swaps this for a real
                             WebGL canvas; here a token-driven gradient stands
                             in so the primitive reads honestly. -->
                        <div class="configurator-specimen relative h-full w-full overflow-hidden">
                            <div
                                aria-hidden="true"
                                class="absolute inset-0 transition-[filter] duration-300 ease-out motion-reduce:transition-none"
                                :style="stageStyle"
                            />
                            <div
                                v-if="cfg.config.grain"
                                aria-hidden="true"
                                class="paper-grain-overlay absolute inset-0 opacity-70"
                            />
                            <!-- Read-out chip, lower-left — the numbers ride
                                 along but the field is the hero. -->
                            <div
                                class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                            >
                                <span class="text-micro font-mono text-muted-foreground">
                                    {{ cfg.config.medium }}
                                </span>
                                <span class="text-micro font-mono text-muted-foreground/60">
                                    spread {{ cfg.config.spread }} · bloom {{ cfg.config.bloom }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Field" sub="--field-*">
                            <ConfiguratorRow label="Medium">
                                <LabeledSelect
                                    v-model="cfg.config.medium"
                                    v-model:is-open="mediumOpen"
                                    :items="mediums as unknown as readonly string[]"
                                    label="medium"
                                    tooltip="Painterly medium — tilts the field's hue triad."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Spread">
                                <LabeledSlider
                                    v-model="cfg.config.spread"
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    label="spread"
                                    tooltip="Fans the nuclei apart, 0-100."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Bloom">
                                <LabeledSlider
                                    v-model="cfg.config.bloom"
                                    :min="0"
                                    :max="100"
                                    :step="1"
                                    label="bloom"
                                    tooltip="Diffusion radius — feathers each blob."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Grain">
                                <LabeledSwitch
                                    v-model:checked="cfg.config.grain"
                                    label="grain"
                                    tooltip="Layer the paper grain overlay."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="API surface"
            blurb="useConfiguratorState<T> returns config + activePreset + isDirty + selectPreset + resetCurrent + cyclePreset. Generic over the live shape T; structuredClone-based by default with optional cloner / equality hooks."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const cfg = useConfiguratorState&lt;T&gt;({
  presets,                  // readonly ConfiguratorPreset&lt;T&gt;[]
  initialPreset: "default", // optional preset key
});

cfg.config         // reactive T (the live config)
cfg.activePreset   // ComputedRef&lt;string | undefined&gt;
cfg.isDirty        // ComputedRef&lt;boolean&gt;
cfg.selectPreset(key)
cfg.resetCurrent()
cfg.cyclePreset()</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
