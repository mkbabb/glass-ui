<script setup lang="ts">
// AW.W11 — the blob mood + palette story. Exercises every shipped mood (idle,
// happy, curious, sleepy, excited) via the GooBlob `setMood` expose, a seed-derived
// multi-stop palette (deriveBlobPalette), and the warm-biased iridescence + fake-SSS.
import { ref, reactive, computed } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import type { BlobMood } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import {
    defaultBlobColorResolver,
    deriveBlobPalette,
    oklchStopToHex,
    type ColorHarmony,
} from "../../../src/composables/color";

const MOODS: BlobMood[] = ["idle", "happy", "curious", "sleepy", "excited"];

const blobRef = ref<InstanceType<typeof GooBlob> | null>(null);
const activeMood = ref<BlobMood>("idle");

function setMood(m: BlobMood) {
    activeMood.value = m;
    blobRef.value?.setMood(m);
}

// A seed-derived multi-stop palette (W11.b). Live seed + harmony.
const seed = ref("oklch(0.62 0.19 25)");
const harmony = ref<ColorHarmony>("analogous");
const paletteStops = computed(() =>
    deriveBlobPalette(seed.value, { stopCount: 3, harmony: harmony.value }).map(
        oklchStopToHex,
    ),
);

const moodConfig = reactive({
    ...BLOB_CONFIG_DEFAULTS,
    lit: true,
    iridescence: 0.4,
    sssScale: 0.25,
    coreGlow: 0.12,
});

const paletteConfig = computed(() => ({
    ...moodConfig,
    paletteStops: paletteStops.value,
}));

const HARMONIES: ColorHarmony[] = [
    "analogous",
    "complementary",
    "split-complementary",
    "triad",
    "tetradic",
    "monochrome",
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="Moods"
            blurb="Every shipped mood (idle · happy · curious · sleepy · excited) drives the
                {valence, arousal} affect model — orbit speed, wobble, pulse, the
                iridescence/SSS sheen intensity all read off it. The mood also auto-drives
                from interaction (curious on hover, excited on click, sleepy after idle)."
        >
            <ShowcaseFrame class="flex flex-col items-center gap-4">
                <div class="relative aspect-square w-56 overflow-hidden rounded-card">
                    <GooBlob
                        ref="blobRef"
                        color="oklch(0.7 0.16 250)"
                        :color-resolver="defaultBlobColorResolver"
                        :config="moodConfig"
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
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Seed-derived palette"
            blurb="deriveBlobPalette(seed, { harmony }) → 2-4 in-family OKLCh stops distributed
                across body + satellites, OKLab-interpolated with a midpoint chroma-bump. The
                shared ColorHarmony vocabulary the aurora deriver also consumes."
        >
            <ShowcaseFrame class="flex flex-col gap-4">
                <div class="flex items-center gap-4">
                    <div class="relative aspect-square w-40 overflow-hidden rounded-card">
                        <GooBlob
                            color="oklch(0.7 0.16 250)"
                            :color-resolver="defaultBlobColorResolver"
                            :config="paletteConfig"
                            seed="palette"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <div class="flex gap-1">
                            <span
                                v-for="s in paletteStops"
                                :key="s"
                                class="h-8 w-8 rounded-pill border"
                                :style="{ background: s }"
                            />
                        </div>
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
    </StoryPage>
</template>
