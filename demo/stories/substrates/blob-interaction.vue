<script setup lang="ts">
// AW.W10 — the interactive GooBlob story. The consumer that exercises the shipped
// interaction (the overfitting-audit "no orphaned substrate" requirement): a
// hover-and-flick stretches the blob (the velocity squash), a decaying-radius
// trail reaches an elastic pseudopod toward the cursor, and a CLICK fires the
// one-shot spring impulse (the bounce). The blob LEANS toward the cursor
// (pointerAttraction is non-zero out of the box now).
import { ref, reactive } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { GooBlob } from "../../../src/components/custom/goo-blob";
import { BLOB_CONFIG_DEFAULTS } from "../../../src/components/custom/goo-blob/types";
import { defaultBlobColorResolver } from "../../../src/composables/color";

// A reactive config that drives the shipped interaction props — proving they are
// load-bearing, not orphaned.
const cfg = reactive({
    ...BLOB_CONFIG_DEFAULTS,
    lit: true,
    merge: "circular" as const,
    warpAmp: 0.6,
});

const clickCount = ref(0);
const blobRef = ref<InstanceType<typeof GooBlob> | null>(null);

function onClick() {
    clickCount.value++;
}

// Programmatic bounce — drives the same impulse the click does (the defineExpose
// `pulse` seam), so an external control can poke the blob.
function poke() {
    blobRef.value?.pulse();
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="Interactive droplet"
            blurb="Hover to feel the lean-in (non-zero pointerAttraction); flick across to see
                the velocity squash-and-stretch (volume-preserving) and the decaying-radius
                trail reach an elastic pseudopod; click to fire the one-shot spring impulse.
                Lit + circular merge + warp on. Under prefers-reduced-motion the substrate
                freezes to a composed rest pose."
        >
            <ShowcaseFrame class="flex flex-col items-center gap-4">
                <div class="relative aspect-square w-56 overflow-hidden rounded-card">
                    <GooBlob
                        ref="blobRef"
                        color="oklch(0.7 0.16 250)"
                        :color-resolver="defaultBlobColorResolver"
                        :config="cfg"
                        seed="interaction"
                        @click="onClick"
                    />
                </div>
                <div class="flex items-center gap-3 text-sm">
                    <button class="btn-press rounded-pill border px-3 py-1" @click="poke">
                        Poke (impulse)
                    </button>
                    <span class="tabular-nums opacity-70">clicks: {{ clickCount }}</span>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="Squash knobs"
            blurb="The squash magnitude (stretch) and the lean strength (pointerAttraction) are
                live props — drag to retune the interaction feel."
        >
            <ShowcaseFrame class="flex flex-col gap-3">
                <label class="flex items-center gap-3 text-sm">
                    <span class="w-40">stretch: {{ cfg.stretch.toFixed(2) }}</span>
                    <input
                        v-model.number="cfg.stretch"
                        type="range"
                        min="0"
                        max="1.5"
                        step="0.05"
                        class="flex-1"
                        aria-label="Squash-and-stretch magnitude"
                    />
                </label>
                <label class="flex items-center gap-3 text-sm">
                    <span class="w-40">attraction: {{ cfg.pointerAttraction.toFixed(2) }}</span>
                    <input
                        v-model.number="cfg.pointerAttraction"
                        type="range"
                        min="-1"
                        max="1"
                        step="0.05"
                        class="flex-1"
                        aria-label="Pointer lean-in/shy-away attraction"
                    />
                </label>
                <label class="flex items-center gap-3 text-sm">
                    <span class="w-40">clickImpulse: {{ cfg.clickImpulse.toFixed(2) }}</span>
                    <input
                        v-model.number="cfg.clickImpulse"
                        type="range"
                        min="0"
                        max="1.5"
                        step="0.05"
                        class="flex-1"
                        aria-label="Click impulse amplitude"
                    />
                </label>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
