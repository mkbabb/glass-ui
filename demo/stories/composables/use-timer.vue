<script setup lang="ts">
// useTimer + useInterval — Vue-scope-aware setTimeout/setInterval replacements.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useTimer } from "../../../src/composables/useTimer";
import { useInterval } from "../../../src/composables/useInterval";

const fired = ref(0);
const ticks = ref(0);

const timer = useTimer(() => {
    fired.value += 1;
}, 1500, { immediate: false });

const interval = useInterval(() => {
    ticks.value += 1;
}, 500, { immediate: false });
</script>

<template>
    <StoryPage>
        <StorySection
            label="useTimer — scope-aware setTimeout"
            blurb="Auto-cleans on scope dispose. Returns { isActive, start, restart, stop, clear }. Safe to call outside setup; in-scope callers get free unmount cleanup. Pair with useInterval for the matching repeating-tick variant."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3">
                        <Button @click="timer.start()">Start (1500ms)</Button>
                        <Button variant="outline" @click="timer.stop">Stop</Button>
                        <span class="text-sm">
                            fired: <code class="fira-code">{{ fired }}</code> · active: <code class="fira-code">{{ timer.isActive.value }}</code>
                        </span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="useInterval — scope-aware setInterval"
            blurb="Same shape as useTimer but for repeating ticks. Replaces hand-rolled setInterval(...) + manual clearInterval on unmount."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-3">
                        <Button @click="interval.start()">Start (500ms tick)</Button>
                        <Button variant="outline" @click="interval.stop">Stop</Button>
                        <span class="text-sm">
                            ticks: <code class="fira-code">{{ ticks }}</code> · active: <code class="fira-code">{{ interval.isActive.value }}</code>
                        </span>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
