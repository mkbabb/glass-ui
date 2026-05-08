<script setup lang="ts">
// Configurator — preset + layers + scroll-mode primitive at the floating tier.
// The live preset studio is the Aurora dock — see `demo/stories/aurora.vue`
// for the full configurator-in-anger composition.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    Configurator,
    ConfiguratorRow,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "../../../src/components/custom/configurator";
import {
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";

interface Cfg {
    spread: number;
    bloom: number;
    grain: boolean;
}

const presets: readonly ConfiguratorPreset<Cfg>[] = [
    { key: "quiet", label: "Quiet", config: { spread: 30, bloom: 20, grain: false } },
    { key: "default", label: "Default", config: { spread: 60, bloom: 50, grain: true } },
    { key: "lush", label: "Lush", config: { spread: 90, bloom: 80, grain: true } },
];

const cfg = useConfiguratorState<Cfg>({
    presets,
    initialPreset: "default",
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="preset + layers + scroll modes"
            blurb="Studio-tier configurator. Default preset row reads from the `presets` prop; the `controls` slot composes ConfiguratorRow children. useConfiguratorState carries the active-preset / isDirty / reset semantics."
        >
            <ShowcaseFrame pad="lg" tier="quiet">
                <Configurator
                    :presets="presets"
                    :active-preset="cfg.activePreset.value"
                    @select-preset="cfg.selectPreset"
                    @reset="cfg.resetCurrent"
                >
                    <template #stage>
                        <div class="grid h-full place-items-center p-8 text-muted-foreground">
                            <code class="fira-code text-sm">
                                spread: {{ cfg.config.spread }} · bloom: {{ cfg.config.bloom }} ·
                                grain: {{ cfg.config.grain }}
                            </code>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorRow label="Spread">
                            <LabeledSlider
                                v-model="cfg.config.spread"
                                :min="0"
                                :max="100"
                                :step="1"
                                label="spread"
                                tooltip="Field spread, 0-100."
                            />
                        </ConfiguratorRow>
                        <ConfiguratorRow label="Bloom">
                            <LabeledSlider
                                v-model="cfg.config.bloom"
                                :min="0"
                                :max="100"
                                :step="1"
                                label="bloom"
                                tooltip="Diffusion radius."
                            />
                        </ConfiguratorRow>
                        <ConfiguratorRow label="Grain">
                            <LabeledSwitch
                                v-model:checked="cfg.config.grain"
                                label="grain"
                                tooltip="Layer the paper grain overlay."
                            />
                        </ConfiguratorRow>
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
