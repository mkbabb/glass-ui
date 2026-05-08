<script setup lang="ts">
// useScrollProgress — 0..1 reactive ref tracking element entry/exit.
// Visual demo lives at motion/scroll-type; this entry cross-links + documents API.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { useScrollProgress } from "../../../src/composables/motion/useScrollProgress";

const target = ref<HTMLElement | null>(null);
const progress = useScrollProgress({ target });
</script>

<template>
    <StoryPage>
        <StorySection
            label="map scroll position to [0, 1]"
            blurb="Drives scroll-linked typography axes, parallax depth, and progress indicators. Uses a rAF-coalesced scroll listener + ResizeObserver so the mapping stays accurate when layout shifts."
        >
            <ShowcaseFrame pad="lg">
                <div class="h-[60vh] overflow-y-auto rounded-md border border-border bg-card">
                    <div class="p-4">
                        <p class="text-prose mb-32">↓ scroll within this region</p>
                        <div ref="target" class="rounded-md border border-border bg-background p-6">
                            <div class="font-mono text-display-3">{{ (progress * 100).toFixed(1) }}%</div>
                            <div class="mt-3 h-2 overflow-hidden rounded-full bg-card">
                                <div
                                    class="h-full bg-primary transition-[width] duration-100"
                                    :style="{ width: `${progress * 100}%` }"
                                />
                            </div>
                        </div>
                        <p class="text-prose mt-32">Visual demo: see Motion / Scroll-driven Type.</p>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
