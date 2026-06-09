<script setup lang="ts">
import { ref } from "vue";
import { Volume2, SlidersHorizontal, Sun } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import {
    GlassDock,
    DockIconButton,
    DockSeparator,
} from "../../../src/components/custom/dock";
import { Slider } from "../../../src/components/ui/slider";

const volume = ref([60]);
const mix = ref([40]);
const brightness = ref([75]);
</script>

<template>
    <StoryPage>
        <StorySection
            label="always-open dock — the slider holds it open while always expanded"
            blurb="A fit-content always-expanded dock with a single standard-variant Slider. The dock never collapses, so the hold has nothing to suppress; the interest is the cross-substrate read — the dock substrate tier-shades and the thumb halo intensifies while a knob is pressed (both react to the dock's shared data-held edge)."
        >
            <div
                class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
            >
                <GlassDock always-expanded fit-content>
                    <DockIconButton aria-label="Brightness"><Sun /></DockIconButton>
                    <div class="flex w-44 items-center px-2">
                        <Slider
                            v-model="brightness"
                            :max="100"
                            :step="1"
                            aria-label="Brightness"
                        />
                    </div>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            label="collapsible dock — the drag suppresses idle-collapse (keep-dock-open)"
            blurb="A collapsible dock with two sliders. Press a thumb and move the pointer OFF the dock: the dock stays open through the held drag and re-collapses only after release. The held edge lights data-held on BOTH the dock root and the slider root — the substrate tier-shades up and both thumb halos intensify, since both read the dock's shared held state. The contract is bidirectional and pointer-anchored, on the API surface rather than a recipe."
        >
            <div
                class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
                data-testid="dock-slider-hold"
            >
                <GlassDock :collapse-delay="600" data-testid="dock-slider-hold-root">
                    <DockIconButton aria-label="Volume"><Volume2 /></DockIconButton>
                    <div class="flex w-44 items-center px-2">
                        <Slider v-model="volume" :max="100" :step="1" aria-label="Volume" />
                    </div>
                    <DockSeparator />
                    <DockIconButton aria-label="Mix"><SlidersHorizontal /></DockIconButton>
                    <div class="flex w-44 items-center px-2">
                        <Slider v-model="mix" :max="100" :step="1" aria-label="Mix" />
                    </div>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
        </StorySection>
    </StoryPage>
</template>
