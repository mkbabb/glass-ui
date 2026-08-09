<script setup lang="ts">
// Configurator — the canonical studio shell: preset row + a grouped
// <ConfiguratorLayer>, a live specimen stage that paints the config, a
// bounded studio height, and a responsive density that reads `mobile` at
// narrow container widths and `comfortable` when there is room. The Aurora
// flat story (`demo/stories/aurora.vue`) is the configurator-in-anger over
// a real WebGL field; this story is the primitive shown honestly.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import CodeBlock from "../../chassis/code/CodeBlock.vue";
import ConfiguratorExample from "../../examples/ConfiguratorExample.vue";
import configuratorExampleSource from "../../examples/ConfiguratorExample.vue?raw";
import {
    Configurator,
    ConfiguratorLayer,
    useConfiguratorState,
    type ConfiguratorPreset,
} from "@glass/components/configurator";
import {
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/labeled-field";
import LabeledSelect from "../../chassis/field/LabeledSelect.vue";

interface Cfg {
    medium: string;
    spread: number;
    bloom: number;
    grain: boolean;
}

const mediums = ["aurora", "ink", "gouache"] as const;

// Each medium tilts the specimen's hue triad — the stage reads the medium
// as a distinct palette so the Select is visibly load-bearing, not decorative.
// The triad reads INDIRECT `--bloom-*` tokens (defined on `.configurator-specimen`)
// so the SAME geometry paints the pale pastels over the light cream stage and
// the SATURATED rainbow hues over the dark stage — a low-chroma pastel mixed
// toward transparent over a near-black field reads as desaturated mud, so dark
// mode swaps to the full-chroma ramp and a deep
// base, recovering the chromatic bloom.
const MEDIUM_HUES: Record<string, readonly [string, string, string]> = {
    aurora: ["var(--bloom-blue)", "var(--bloom-indigo)", "var(--bloom-violet)"],
    ink: ["var(--bloom-indigo)", "var(--bloom-blue)", "var(--bloom-green)"],
    gouache: ["var(--bloom-orange)", "var(--bloom-red)", "var(--bloom-yellow)"],
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
const hues = computed(() => MEDIUM_HUES[cfg.config.medium] ?? MEDIUM_HUES.aurora!);

// the device-free preset field-well. Each gallery tile
// paints its preset's field from the SAME medium hue triad the live stage uses —
// a layered radial-gradient over a base fill, ZERO GL device, deterministic, never
// blank, identical Chrome ⇄ Safari (the §4.1 Tier-0 idea applied to the demo
// primitive). The well reads the preset's spread/bloom so two presets are visibly
// distinct, mirroring the live-stage geometry at a thumbnail scale.
// The well reads the RESOLVABLE `--rainbow-pastel-*` tokens directly (the `--bloom-*`
// indirection is scoped to `.configurator-specimen`, undefined on the gallery tile —
// so `color-mix(... var(--bloom-blue)...)` would fall to transparent and the well
// would read flat cream). Each medium maps to a concrete pastel triad here.
const WELL_HUES: Record<string, readonly [string, string, string]> = {
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

function presetWell(c: Cfg): string {
    const triad = WELL_HUES[c.medium] ?? WELL_HUES.aurora!;
    const [a, b, cc] = triad;
    const spread = c.spread / 100;
    const bloom = c.bloom / 100;
    const off = 16 + spread * 24;
    const r = 40 + bloom * 26;
    return [
        `radial-gradient(ellipse ${r}% ${r * 0.9}% at ${50 - off}% 38%, color-mix(in srgb, ${a} 80%, transparent), transparent 64%)`,
        `radial-gradient(ellipse ${r * 0.92}% ${r * 0.82}% at ${50 + off}% 44%, color-mix(in srgb, ${b} 76%, transparent), transparent 64%)`,
        `radial-gradient(ellipse ${r}% ${r * 0.86}% at 50% ${72 + spread * 8}%, color-mix(in srgb, ${cc} 72%, transparent), transparent 68%)`,
        `linear-gradient(135deg, color-mix(in srgb, ${a} 22%, var(--card)), color-mix(in srgb, ${cc} 18%, var(--card)))`,
    ].join(", ");
}

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
// `comfortable` when the viewport has room (a responsive merge — one configurator,
// not a separate `configurator-mobile` route). A small reactive
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

const size = computed(() => (isNarrow.value ? "sm" : "md"));
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Preset studio"
            level="title"
            blurb="Choose a visual preset, then adjust spread, bloom, medium, and grain while the stage and edited-state feedback update immediately."
        >
            <ShowcaseFrame pad="lg" tier="quiet">
                <Configurator
                    class="h-[min(70vh,560px)]"
                    :size="size"
                    :presets="presets"
                    :active-preset="cfg.activePreset.value"
                    gallery-placement="top"
                    @select-preset="cfg.selectPreset"
                    @reset="cfg.resetCurrent"
                >
                    <!-- the up-top warm-glass gallery
                         dock, presets that RENDER device-free. Each tile is a
                         `.glass-capsule` cel (the §3 field reads through) over a
                         per-preset CSS field-well; the toggle-button a11y pattern
                         (type=button + aria-pressed in a role=group). No GL device,
                         never blank, identical Chrome ⇄ Safari. -->
                    <template #presets>
                        <div
                            class="flex flex-col gap-3"
                            role="group"
                            aria-label="Presets"
                        >
                            <p class="text-small text-muted-foreground">
                                Presets
                            </p>
                            <div
                                class="configurator-gallery-track flex gap-3 overflow-x-auto px-1 py-2 scrollbar-thin"
                            >
                                <button
                                    v-for="p in presets"
                                    :key="p.key"
                                    type="button"
                                    data-preset-tile
                                    class="configurator-preset-tile group glass-capsule glass-capsule-hover shadow-cartoon-md focus-ring relative flex flex-shrink-0 flex-col overflow-hidden text-left"
                                    :class="
                                        p.key === cfg.activePreset.value && 'is-active'
                                    "
                                    :aria-pressed="p.key === cfg.activePreset.value"
                                    @click.stop="cfg.selectPreset(p.key)"
                                >
                                    <div
                                        class="configurator-preset-well aspect-[16/10] w-full"
                                        :style="{ background: presetWell(p.config) }"
                                        aria-hidden="true"
                                    />
                                    <div
                                        class="configurator-preset-label flex flex-col gap-0.5 px-3 py-2"
                                    >
                                        <span
                                            class="text-small font-medium text-foreground"
                                        >
                                            {{ p.label }}
                                        </span>
                                        <span
                                            class="text-small text-muted-foreground"
                                        >
                                            {{ p.config.medium }} · spread
                                            {{ p.config.spread }}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template #stage>
                        <!-- Live specimen: a painterly field that responds to
                             the config. The aurora story swaps this for a real
                             WebGL canvas; here a token-driven gradient stands
                             in so the primitive reads honestly. -->
                        <div
                            class="configurator-specimen relative h-full w-full overflow-hidden"
                        >
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
                                <span
                                    class="text-micro font-mono text-muted-foreground"
                                >
                                    {{ cfg.config.medium }}
                                </span>
                                <span
                                    class="text-micro font-mono text-muted-foreground/60"
                                >
                                    spread {{ cfg.config.spread }} · bloom
                                    {{ cfg.config.bloom }}
                                </span>
                            </div>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Field" sub="--field-*">
                            <LabeledSelect
                                v-model="cfg.config.medium"
                                v-model:open="mediumOpen"
                                :items="mediums"
                                label="Medium"
                                description="Painterly medium — tilts the field's hue triad."
                            />
                            <LabeledSlider
                                v-model="cfg.config.spread"
                                :min="0"
                                :max="100"
                                :step="1"
                                label="Spread"
                                description="Fans the nuclei apart, 0-100."
                            />
                            <LabeledSlider
                                v-model="cfg.config.bloom"
                                :min="0"
                                :max="100"
                                :step="1"
                                label="Bloom"
                                description="Diffusion radius — feathers each blob."
                            />
                            <LabeledSwitch
                                v-model="cfg.config.grain"
                                label="Grain"
                                description="Layer the paper grain overlay."
                            />
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            heading="Preset state"
            level="heading"
            blurb="Cycle between named presets, edit the live intensity, and observe when the current values diverge from the selected preset."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ConfiguratorExample />
            </ShowcaseFrame>
            <CodeBlock lang="vue" :code="configuratorExampleSource" />
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* The bloom hue triad reads INDIRECT tokens so the SAME stage geometry paints
   correctly in both modes. In light, the pale pastels over the cream stage are
   the lavender bloom. In dark the stage well goes near-black and a high-L
   low-chroma pastel mixed toward transparent reads as desaturated mud
   — so dark swaps to the FULL-CHROMA `--rainbow-*` ramp and lays a deep base
   tint behind the bloom so the chroma has a field to assert against. */
.configurator-specimen {
    --bloom-blue: var(--rainbow-pastel-blue);
    --bloom-indigo: var(--rainbow-pastel-indigo);
    --bloom-violet: var(--rainbow-pastel-violet);
    --bloom-green: var(--rainbow-pastel-green);
    --bloom-orange: var(--rainbow-pastel-orange);
    --bloom-red: var(--rainbow-pastel-red);
    --bloom-yellow: var(--rainbow-pastel-yellow);
}

.dark .configurator-specimen {
    --bloom-blue: var(--rainbow-blue);
    --bloom-indigo: var(--rainbow-indigo);
    --bloom-violet: var(--rainbow-violet);
    --bloom-green: var(--rainbow-green);
    --bloom-orange: var(--rainbow-orange);
    --bloom-red: var(--rainbow-red);
    --bloom-yellow: var(--rainbow-yellow);
    /* A deep ink base so the saturated bloom reads as a chromatic field, not a
       set of dim spots over near-black. The warm-ink `--card` deepened a touch. */
    background-color: color-mix(in oklab, var(--card) 88%, black);
}
</style>
