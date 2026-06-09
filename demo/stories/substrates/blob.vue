<script setup lang="ts">
// GooBlob — one coherent page for the WebGL2 metaball droplet. Four sections
// walk the whole surface: the lit contained droplet (a CSS/SVG static register,
// zero GL), the pointer-reactive interaction hero, the mood + seed-palette hero,
// and the pause seam any user can reach.
//
// WebGL budget: at most TWO live GooBlob contexts at once (the interaction hero
// + the mood hero). Every ambient/static swatch routes to WatercolorDot (no GL
// context) so the page never approaches the browser's per-page WebGL cap.
import { ref, reactive, computed, watch } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import type { BlobMood } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { WatercolorDot } from "../../../src/components/custom/watercolor-dot";
import { DockBackgroundToggle } from "../../../src/components/custom/dock";
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

// ── 2. The interaction hero (one live GL context) ────────────────────────────
// The cream DEFAULT base + a circular-merge / warpier membrane for the interaction
// register. The atoms are spread deeply so the overrides land on their cluster.
const interactionCfg = reactive({
    ...BLOB_CONFIG_DEFAULTS,
    surface: { ...BLOB_CONFIG_DEFAULTS.surface, lit: true },
    membrane: { ...BLOB_CONFIG_DEFAULTS.membrane, merge: "circular" as const, warpAmp: 0.6 },
});
const clickCount = ref(0);
const interactionBlob = ref<InstanceType<typeof GooBlob> | null>(null);
const interactionPaused = ref(false);

function onInteractionClick() {
    clickCount.value++;
}
function poke() {
    interactionBlob.value?.pulse();
}

// ── 3. The mood + palette hero (one live GL context) ─────────────────────────
const MOODS: BlobMood[] = ["idle", "happy", "curious", "sleepy", "excited"];
const moodBlob = ref<InstanceType<typeof GooBlob> | null>(null);
const activeMood = ref<BlobMood>("idle");
const moodPaused = ref(false);

function setMood(m: BlobMood) {
    activeMood.value = m;
    moodBlob.value?.setMood(m);
}

const seed = ref("oklch(0.62 0.19 25)");
const harmony = ref<ColorHarmony>("analogous");
const paletteStops = computed(() =>
    deriveBlobPalette(seed.value, { stopCount: 3, harmony: harmony.value }).map(
        oklchStopToHex,
    ),
);

const moodConfig = reactive({
    ...BLOB_CONFIG_DEFAULTS,
    surface: {
        ...BLOB_CONFIG_DEFAULTS.surface,
        lit: true,
        iridescence: 0.4,
        sssScale: 0.25,
        coreGlow: 0.12,
    },
});
// The mood hero drives `paletteStops` LIVE off the seed/harmony UI (the color atom);
// the resting/idle state with the seed UI untouched is the cream default.
const heroConfig = computed(() => ({
    ...moodConfig,
    color: { ...moodConfig.color, paletteStops: paletteStops.value },
}));

const HARMONIES: ColorHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];

// Belt-and-suspenders log so the pause seam proves it is live.
watch([interactionPaused, moodPaused], () => {
    if (typeof console !== "undefined") {
        // eslint-disable-next-line no-console
        console.debug(
            `[blob demo] interaction ${interactionPaused.value ? "PAUSED" : "RUNNING"} · mood ${moodPaused.value ? "PAUSED" : "RUNNING"}`,
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
                interactive/lit hero below; route ambient/decorative thumbnails to WatercolorDot
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
            label="Interactive droplet"
            blurb="Hover to feel the lean-in (non-zero pointerAttraction); flick across to see
                the velocity squash-and-stretch (volume-preserving) and the decaying-radius
                trail reach an elastic pseudopod; click to fire the one-shot spring impulse.
                Lit + circular merge + warp on. Under prefers-reduced-motion the substrate
                freezes to a composed rest pose. One GL context."
        >
            <ShowcaseFrame class="flex flex-col items-center gap-4">
                <div class="relative aspect-square w-56 overflow-hidden rounded-card">
                    <GooBlob
                        ref="interactionBlob"
                        v-model:paused="interactionPaused"
                        color="var(--card)"
                        :config="interactionCfg"
                        seed="interaction"
                        @click="onInteractionClick"
                    />
                </div>
                <div class="flex items-center gap-3 text-sm">
                    <button class="btn-press rounded-pill border px-3 py-1" @click="poke">
                        Poke (impulse)
                    </button>
                    <span class="tabular-nums opacity-70">clicks: {{ clickCount }}</span>
                </div>
                <div class="flex w-full max-w-md flex-col gap-3">
                    <label class="flex items-center gap-3 text-sm">
                        <span class="w-40">stretch: {{ interactionCfg.interaction.stretch.toFixed(2) }}</span>
                        <input
                            v-model.number="interactionCfg.interaction.stretch"
                            type="range"
                            min="0"
                            max="1.5"
                            step="0.05"
                            class="flex-1"
                            aria-label="Squash-and-stretch magnitude"
                        />
                    </label>
                    <label class="flex items-center gap-3 text-sm">
                        <span class="w-40">attraction: {{ interactionCfg.interaction.pointerAttraction.toFixed(2) }}</span>
                        <input
                            v-model.number="interactionCfg.interaction.pointerAttraction"
                            type="range"
                            min="-1"
                            max="1"
                            step="0.05"
                            class="flex-1"
                            aria-label="Pointer lean-in/shy-away attraction"
                        />
                    </label>
                    <label class="flex items-center gap-3 text-sm">
                        <span class="w-40">clickImpulse: {{ interactionCfg.interaction.clickImpulse.toFixed(2) }}</span>
                        <input
                            v-model.number="interactionCfg.interaction.clickImpulse"
                            type="range"
                            min="0"
                            max="1.5"
                            step="0.05"
                            class="flex-1"
                            aria-label="Click impulse amplitude"
                        />
                    </label>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Mood + seed-derived palette"
            blurb="Every shipped mood (idle · happy · curious · sleepy · excited) drives the
                {valence, arousal} affect model — orbit speed, wobble, pulse, the
                iridescence/SSS sheen intensity all read off it. deriveBlobPalette(seed,
                { harmony }) → in-family OKLCh stops fed LIVE to the one hero; the stops preview
                as WatercolorDots (zero GL). One GL context."
        >
            <ShowcaseFrame class="flex flex-col items-center gap-4">
                <div class="relative aspect-square w-56 overflow-hidden rounded-card">
                    <GooBlob
                        ref="moodBlob"
                        v-model:paused="moodPaused"
                        color="var(--card)"
                        :config="heroConfig"
                        seed="mood"
                    />
                </div>
                <div class="flex flex-wrap items-center justify-center gap-2">
                    <button
                        v-for="m in MOODS"
                        :key="m"
                        class="btn-press rounded-pill border px-3 py-1 text-sm"
                        :class="{ 'bg-primary text-primary-foreground': activeMood === m }"
                        @click="setMood(m)"
                    >
                        {{ m }}
                    </button>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex flex-wrap gap-2">
                        <WatercolorDot
                            v-for="stop in paletteStops"
                            :key="stop"
                            :color="stop"
                            :seed="stop"
                            animate
                            class="h-12 w-12"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <input
                            v-model="seed"
                            class="input-pill"
                            aria-label="Palette seed color"
                        />
                        <select v-model="harmony" class="input-pill" aria-label="Harmony">
                            <option v-for="h in HARMONIES" :key="h" :value="h">{{ h }}</option>
                        </select>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Pause seam"
            blurb="A DockBackgroundToggle wired to a hero via v-model:paused parks the render
                loop (the membrane stops warping, the satellites stop orbiting) and resumes it
                — a pause control any user can reach, not gated behind a motion preference."
        >
            <ShowcaseFrame class="flex flex-wrap items-center gap-4">
                <span class="flex items-center gap-3 text-sm" data-testid="blob-pause-toggle">
                    <DockBackgroundToggle v-model:paused="interactionPaused" />
                    <span class="tabular-nums opacity-70">
                        interaction: {{ interactionPaused ? "paused" : "running" }}
                    </span>
                </span>
                <span class="flex items-center gap-3 text-sm">
                    <DockBackgroundToggle v-model:paused="moodPaused" />
                    <span class="tabular-nums opacity-70">
                        mood: {{ moodPaused ? "paused" : "running" }}
                    </span>
                </span>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
