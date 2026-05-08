<script setup lang="ts">
// useInterval — scope-aware setInterval. Companion of useTimer (one-shot).
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useInterval } from "../../../src/composables/useInterval";

const ticks = ref(0);

const interval = useInterval(() => {
    ticks.value += 1;
}, 500, { immediate: true });
</script>

<template>
    <StoryPage>
        <StorySection
            label="scope-aware setInterval"
            blurb="Vue-scope-aware setInterval replacement. Returns { isActive, start, restart, stop, clear }. Auto-cleans on scope dispose. Used internally for poll loops, heartbeat schedules, and any reliable repeating tick that must survive remounts but not unmounts."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <div class="font-mono text-display-3">{{ ticks }}</div>
                    <div class="flex gap-2">
                        <Button @click="interval.start(500)">Start (500ms)</Button>
                        <Button @click="interval.start(100)">Faster (100ms)</Button>
                        <Button variant="outline" @click="interval.stop">Stop</Button>
                    </div>
                    <p class="text-mono-caption text-muted-foreground">
                        active: {{ interval.isActive.value }}
                    </p>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
