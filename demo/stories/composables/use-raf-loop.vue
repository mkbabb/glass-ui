<script setup lang="ts">
// useRAFLoop — scope-aware rAF loop with start/stop/pause/resume/dispose.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useRAFLoop } from "../../../src/composables/motion/useRAFLoop";

const frame = ref(0);
const elapsed = ref(0);
const angle = ref(0);

const { start, stop, pause, resume, isActive, isPaused } = useRAFLoop(
    (timing) => {
        frame.value = timing.frame;
        elapsed.value = Math.round(timing.elapsed);
        angle.value = (timing.elapsed / 1000) * 60; // 60 deg/sec
    },
);
</script>

<template>
    <StoryPage>
        <StorySection
            label="frame timing + controls"
            blurb="Provides RAFLoopTiming { now, delta, elapsed, frame } per call. Composable is scope-aware (autostop on unmount); pauses on document.hidden + prefers-reduced-motion by default."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col items-center gap-4">
                    <svg viewBox="-50 -50 100 100" class="size-32">
                        <line
                            x1="0"
                            y1="0"
                            x2="40"
                            y2="0"
                            stroke="currentColor"
                            stroke-width="2"
                            :transform="`rotate(${angle})`"
                        />
                        <circle cx="0" cy="0" r="4" fill="currentColor" />
                    </svg>
                    <div class="flex gap-2">
                        <Button @click="start">Start</Button>
                        <Button @click="pause" variant="outline">Pause</Button>
                        <Button @click="resume" variant="outline">Resume</Button>
                        <Button @click="stop" variant="outline">Stop</Button>
                    </div>
                    <div class="grid grid-cols-4 gap-3 text-sm">
                        <div>frame: <code class="fira-code">{{ frame }}</code></div>
                        <div>elapsed: <code class="fira-code">{{ elapsed }}ms</code></div>
                        <div>active: <code class="fira-code">{{ isActive }}</code></div>
                        <div>paused: <code class="fira-code">{{ isPaused }}</code></div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
