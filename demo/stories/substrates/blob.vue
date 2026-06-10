<script setup lang="ts">
// GooBlob — one coherent page for the WebGL2 metaball droplet. Three sections walk
// the whole surface: the lit contained droplet (a CSS/SVG static register, zero GL),
// the Configurator-driven blob STUDIO (the interaction + mood + seed-palette hero on
// the library's own Configurator chrome — the inv-16 dog-food, mirroring Aurora), and
// the pause seam any user can reach.
//
// WebGL budget: at most TWO live GooBlob contexts at once (the studio hero + the mood
// hero share ONE stage). Every ambient/static swatch routes to WatercolorDot (no GL
// context) so the page never approaches the browser's per-page WebGL cap.
import { computed, reactive, ref, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import type { BlobConfig, BlobMood } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { WatercolorDot } from "../../../src/components/custom/watercolor-dot";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
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
} from "../../../src/components/custom/labeled-field";
import {
    deriveBlobPalette,
    oklchStopToHex,
    type ColorHarmony,
} from "../../../src/composables/color";

// ── 1. The static register (WatercolorDot, zero GL) ──────────────────────────
// The lit-droplet look without a WebGL context — a deterministic seeded
// border-radius morph with an internalized turbulence filter. The deliberate
// sibling for ambient/decorative thumbnails: route the static register here so
// a grid never exhausts the per-page WebGL context cap.
const dotColors = [
    "var(--primary)",
    "oklch(0.62 0.19 25)",
    "oklch(0.7 0.15 250)",
    "oklch(0.78 0.16 150)",
];

// ── 2. The Configurator-driven blob studio (the inv-16 dog-food) ─────────────
// The blob showcase now USES the library Configurator (preset row + grouped
// ConfiguratorLayer/ConfiguratorRow + a live stage) — the same chrome Aurora's
// page composes — instead of a hand-rolled strip of raw <input type=range>.
//
// The studio's live shape: the pointer-lean axes (attraction / clickImpulse), the
// mood, and the seed/harmony palette. The `stretch` axis is DEMOTED (AY.W-BLOB-CONFIG
// D3 — a swamped fine-detail axis, off the top-level controls).
interface BlobStudioCfg {
    /** Pointer lean: -1 shies away, +1 leans in. */
    attraction: number;
    /** Click spring-impulse amplitude (a one-shot bouncy pulse). */
    clickImpulse: number;
    /** The named mood (drives the {valence, arousal} affect model). */
    mood: BlobMood;
    /** The palette seed color (an OKLCh anchor `deriveBlobPalette` ramps from). */
    seed: string;
    /** The color-harmony the seed ramps through. */
    harmony: ColorHarmony;
}

const HARMONIES: ColorHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
const MOODS: BlobMood[] = ["idle", "happy", "curious", "sleepy", "excited"];

// Three preset baselines — the calm cream default, a warm-excited bead, and a cool
// shy-away creature (the attraction-sign showcase: a NEGATIVE attraction that genuinely
// shies away now that the D2 sign is fixed).
const presets: readonly ConfiguratorPreset<BlobStudioCfg>[] = [
    {
        key: "calm",
        label: "Calm",
        sub: "cream · curious",
        config: {
            attraction: 0.35,
            clickImpulse: 0.5,
            mood: "curious",
            seed: "oklch(0.78 0.05 78)",
            harmony: "analogous",
        },
    },
    {
        key: "excited",
        label: "Excited",
        sub: "warm · leans in",
        config: {
            attraction: 0.8,
            clickImpulse: 0.9,
            mood: "excited",
            seed: "oklch(0.62 0.19 25)",
            harmony: "triad",
        },
    },
    {
        key: "shy",
        label: "Shy",
        sub: "cool · shies away",
        config: {
            attraction: -0.8,
            clickImpulse: 0.3,
            mood: "sleepy",
            seed: "oklch(0.6 0.2 250)",
            harmony: "complementary",
        },
    },
];

const studio = useConfiguratorState<BlobStudioCfg>({
    presets,
    initialPreset: "calm",
    // Per-preset clones — each preset is a named editable baseline the user tunes and
    // returns to (the slider edits survive a preset round-trip), mirroring Aurora's
    // chrome (CLAUDE.md §Configurator). A preset switch snapshots the outgoing slot.
    cloneMode: "per-preset",
});

const moodOpen = ref(false);
const harmonyOpen = ref(false);

// The live palette stops, derived from the studio seed/harmony (the D1 hero color-feed
// — now LIVE: a post-mount stops change re-paints the hero body).
const paletteStops = computed(() =>
    deriveBlobPalette(studio.config.seed, {
        stopCount: 3,
        harmony: studio.config.harmony,
    }).map(oklchStopToHex),
);

// The live BlobConfig the stage GooBlob paints — the studio axes mapped onto the atom
// surface. A reactive object whose `interaction`/`color` atoms track the studio config,
// so every Configurator edit reaches the live hero (the D1/D2 fixes carry it through).
const stageConfig = reactive<BlobConfig>({
    ...BLOB_CONFIG_DEFAULTS,
    surface: {
        ...BLOB_CONFIG_DEFAULTS.surface,
        lit: true,
        iridescence: 0.4,
        sssScale: 0.25,
        coreGlow: 0.12,
    },
    membrane: {
        ...BLOB_CONFIG_DEFAULTS.membrane,
        merge: "circular" as const,
        warpAmp: 0.6,
    },
    interaction: { ...BLOB_CONFIG_DEFAULTS.interaction },
    color: { ...BLOB_CONFIG_DEFAULTS.color },
});

// Thread the studio config → the reactive stage config (interaction lean/impulse + the
// live palette stops). The GooBlob's D1/D2 watchers re-resolve on these writes.
watch(
    () => [studio.config.attraction, studio.config.clickImpulse, paletteStops.value] as const,
    ([attraction, clickImpulse, stops]) => {
        stageConfig.interaction.pointerAttraction = attraction;
        stageConfig.interaction.clickImpulse = clickImpulse;
        stageConfig.color.paletteStops = [...stops];
    },
    { immediate: true, deep: true },
);

const studioBlob = ref<InstanceType<typeof GooBlob> | null>(null);
const studioPaused = ref(false);
const clickCount = ref(0);

// The mood is a MANUAL pin (the auto-arc respects it — AX.W46 D7). Drive it from the
// studio mood select; re-pin whenever the preset / select changes it.
watch(
    () => studio.config.mood,
    (m) => studioBlob.value?.setMood(m),
);

function onStudioClick() {
    clickCount.value++;
}
function poke() {
    studioBlob.value?.pulse();
}

// Belt-and-suspenders log so the pause seam proves it is live.
watch(studioPaused, () => {
    if (typeof console !== "undefined") {
        // eslint-disable-next-line no-console
        console.debug(
            `[blob demo] studio ${studioPaused.value ? "PAUSED" : "RUNNING"}`,
        );
    }
});
</script>

<template>
    <StoryPage>
        <StorySection
            label="The lit contained droplet"
            blurb="The droplet look in the static register — a CSS/SVG pastel swatch with no
                WebGL context. A deterministic seeded border-radius morph with an internalized
                turbulence filter (per-instance, zero-wiring). Reserve the live GL blob for the
                interactive/lit studio below; route ambient/decorative thumbnails to WatercolorDot
                so a grid never exhausts the per-page WebGL context cap."
        >
            <ShowcaseFrame pad="none" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <WatercolorDot
                    v-for="c in dotColors"
                    :key="c"
                    :color="c"
                    :seed="c"
                    animate
                    class="aspect-square w-full"
                />
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Blob studio — preset · interaction · mood · seed-palette"
            blurb="The blob showcase on the library's own Configurator chrome (the same studio
                shell Aurora composes). The preset row drives useConfiguratorState (per-preset
                clones); the stage paints the live config. Hover to feel the lean — attraction +1
                leans IN, -1 SHIES AWAY (the sign is honored); click to fire the spring impulse;
                pick a mood (the {valence, arousal} affect model); set a seed + harmony to ramp the
                OKLCh palette fed LIVE to the hero body. One GL context."
        >
            <ShowcaseFrame pad="lg" tier="quiet">
                <Configurator
                    class="h-[min(70vh,560px)]"
                    :presets="presets"
                    :active-preset="studio.activePreset.value"
                    @select-preset="studio.selectPreset"
                    @reset="studio.resetCurrent"
                >
                    <template #stage>
                        <div
                            class="relative flex h-full w-full items-center justify-center overflow-hidden"
                        >
                            <div class="relative aspect-square w-64 max-w-[80%]">
                                <GooBlob
                                    ref="studioBlob"
                                    v-model:paused="studioPaused"
                                    color="var(--card)"
                                    :config="stageConfig"
                                    seed="studio"
                                    @click="onStudioClick"
                                />
                            </div>
                            <div
                                class="absolute bottom-3 left-3 flex items-center gap-2 rounded-pill border border-border/40 bg-card/70 px-3 py-1 backdrop-blur-sm"
                            >
                                <span class="text-micro font-mono text-muted-foreground">
                                    {{ studio.config.mood }}
                                </span>
                                <span class="text-micro font-mono text-muted-foreground/60">
                                    attraction {{ studio.config.attraction.toFixed(2) }} · clicks {{ clickCount }}
                                </span>
                            </div>
                            <button
                                class="btn-press absolute right-3 bottom-3 rounded-pill border bg-card/70 px-3 py-1 text-micro backdrop-blur-sm"
                                @click.stop="poke"
                            >
                                Poke
                            </button>
                        </div>
                    </template>
                    <template #controls>
                        <ConfiguratorLayer label="Interaction" sub="--interaction-*">
                            <ConfiguratorRow label="Attraction">
                                <LabeledSlider
                                    v-model="studio.config.attraction"
                                    :min="-1"
                                    :max="1"
                                    :step="0.05"
                                    label="attraction"
                                    tooltip="Pointer lean — +1 leans IN toward the cursor, -1 shies AWAY."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Click impulse">
                                <LabeledSlider
                                    v-model="studio.config.clickImpulse"
                                    :min="0"
                                    :max="1.5"
                                    :step="0.05"
                                    label="clickImpulse"
                                    tooltip="The one-shot bouncy spring impulse fired on a click."
                                />
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                        <ConfiguratorLayer label="Mood + palette" sub="--color-*">
                            <ConfiguratorRow label="Mood">
                                <LabeledSelect
                                    v-model="studio.config.mood"
                                    v-model:is-open="moodOpen"
                                    :items="MOODS as unknown as readonly string[]"
                                    label="mood"
                                    tooltip="The named mood — drives the {valence, arousal} affect model (orbit speed, wobble, sheen)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Seed">
                                <input
                                    v-model="studio.config.seed"
                                    class="input-pill fira-code w-full"
                                    aria-label="Palette seed color"
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Harmony">
                                <LabeledSelect
                                    v-model="studio.config.harmony"
                                    v-model:is-open="harmonyOpen"
                                    :items="HARMONIES as unknown as readonly string[]"
                                    label="harmony"
                                    tooltip="The color harmony the seed ramps through (deriveBlobPalette)."
                                />
                            </ConfiguratorRow>
                            <ConfiguratorRow label="Stops">
                                <div class="flex flex-wrap gap-2">
                                    <WatercolorDot
                                        v-for="stop in paletteStops"
                                        :key="stop"
                                        :color="stop"
                                        :seed="stop"
                                        animate
                                        class="h-10 w-10"
                                    />
                                </div>
                            </ConfiguratorRow>
                        </ConfiguratorLayer>
                    </template>
                </Configurator>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Pause seam"
            blurb="A DockBackgroundToggle wired to the studio hero via v-model:paused parks the
                render loop (the membrane stops warping, the satellites stop orbiting) and resumes
                it — a pause control any user can reach, not gated behind a motion preference. The
                resume is CLEAN (the canvas paints the live bead intact, never a wrecked slab)."
        >
            <ShowcaseFrame class="flex flex-wrap items-center gap-4">
                <span class="flex items-center gap-3 text-sm" data-testid="blob-pause-toggle">
                    <DockBackgroundToggle v-model:paused="studioPaused" />
                    <span class="tabular-nums opacity-70">
                        studio: {{ studioPaused ? "paused" : "running" }}
                    </span>
                </span>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
