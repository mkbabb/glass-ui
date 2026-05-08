<script setup lang="ts">
// useAnimatedNumber — single-ref smoothed numeric tracker. Single-target
// sibling of useAnimatedNumberMap; keyframes.js SmoothProgress under the hood.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useAnimatedNumber } from "../../../src/composables/motion/useAnimatedNumber";

const target = ref(0);
const { current, isAnimating, snap, reset } = useAnimatedNumber(target);

const progress = ref(0);
const { current: progressCurrent } = useAnimatedNumber(progress, { mode: "progress" });
</script>

<template>
    <StoryPage>
        <StorySection
            label="absolute mode"
            blurb="Smooths arbitrary numeric targets. Damping lower = smoother; snapThreshold tightens settling. Clamping is opt-in via the clamp option."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-4">
                    <div class="font-mono text-display-3">
                        {{ current.toFixed(2) }}
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Button @click="target = 0">0</Button>
                        <Button @click="target = 50">50</Button>
                        <Button @click="target = 100">100</Button>
                        <Button @click="target = 250">250</Button>
                        <Button variant="outline" @click="snap">Snap</Button>
                        <Button variant="outline" @click="reset(0)">Reset</Button>
                    </div>
                    <p class="text-mono-caption text-muted-foreground">
                        target: {{ target }} · animating: {{ isAnimating }}
                    </p>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="progress mode (clamps 0..100)"
            blurb="Progress mode auto-clamps to [0, 100] for the canonical use case (loading bars, percentages). The smoother internally tracks [0, 1] and scales at the consumer-facing boundary (per v0.8.6 fix)."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <input
                        v-model.number="progress"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        class="w-full"
                    />
                    <div class="font-mono text-display-3">
                        {{ progressCurrent.toFixed(1) }}%
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
