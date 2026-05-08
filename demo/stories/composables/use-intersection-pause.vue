<script setup lang="ts">
// useIntersectionPause — pauses a runtime when target scrolls offscreen
// or document.hidden flips true.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    useIntersectionPause,
    type PausableRuntime,
} from "../../../src/composables/motion/useIntersectionPause";

const target = ref<HTMLElement | null>(null);
const counter = ref(0);
let intervalHandle: ReturnType<typeof setInterval> | null = null;

const runtime: PausableRuntime = {
    pause: () => {
        if (intervalHandle !== null) {
            clearInterval(intervalHandle);
            intervalHandle = null;
        }
    },
    resume: () => {
        if (intervalHandle === null) {
            intervalHandle = setInterval(() => {
                counter.value += 1;
            }, 100);
        }
    },
};

const { isPaused, isIntersecting, isDocumentVisible } = useIntersectionPause(
    target,
    runtime,
);

// Kick off
runtime.resume();
</script>

<template>
    <StoryPage>
        <StorySection
            label="pause on scroll-offscreen + document.hidden"
            blurb="The runtime ticks a counter every 100ms. Scroll the watched element out of view — the runtime pauses; scroll it back, the runtime resumes. Switch tabs (document.hidden=true) and the runtime also pauses."
        >
            <ShowcaseFrame pad="lg">
                <div class="h-[50vh] overflow-y-auto rounded-md border border-border bg-card p-4">
                    <p class="text-prose mb-32 text-muted-foreground">↓ scroll down</p>
                    <div ref="target" class="rounded-md border border-border bg-background p-6">
                        <div class="font-mono text-display-3">{{ counter }}</div>
                        <div class="grid grid-cols-3 gap-2 text-mono-caption text-muted-foreground mt-2">
                            <div>paused: {{ isPaused }}</div>
                            <div>intersecting: {{ isIntersecting }}</div>
                            <div>visible: {{ isDocumentVisible }}</div>
                        </div>
                    </div>
                    <p class="text-prose mt-32 text-muted-foreground">↑ scroll back up</p>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
