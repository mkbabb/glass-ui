<script setup lang="ts">
// useAnimatedNumber — hysteresis-smoothed live numeric tracking. Re-expressed
// here on the number-band keeper: the standalone `useCountup` engine retired at
// REDUCTION W3 (A10). keyframes.js `SmoothProgress` owns the rAF loop and damps
// each figure from 0 → target; the composable exposes a reactive `current` and
// handles reduced motion + teardown.
import { computed, ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import { useAnimatedNumber } from "@glass/composables/motion/number/useAnimatedNumber";
import { Button } from "@glass/components/button";

const figures = [
    { key: "requests", target: 1280, unit: "requests" },
    { key: "uptime", target: 98, unit: "% uptime" },
    { key: "saved", target: 4200, unit: "ms saved" },
] as const;

// One live target ref per figure; useAnimatedNumber watches it and damps toward it.
const targets = figures.map(() => ref(0));
const counters = figures.map((_, i) => useAnimatedNumber(targets[i]!, { initial: 0 }));
const displays = counters.map((counter) =>
    computed(() => Math.round(counter.current.value)),
);

function run(): void {
    figures.forEach((figure, i) => (targets[i]!.value = figure.target));
}

function reset(): void {
    targets.forEach((target) => (target.value = 0));
    counters.forEach((counter) => counter.reset(0));
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                <code class="fira-code">useAnimatedNumber</code> damps a live
                numeric target toward its resting value via the keyframes
                <code class="fira-code">SmoothProgress</code> engine — the engine
                owns the rAF loop, the composable exposes a reactive
                <code class="fira-code">current</code> and settles with
                hysteresis. Drive the targets from 0 and watch each figure
                overshoot-free damp home.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button @click="run">Run</Button>
                <Button emphasis="quiet" @click="reset">Reset</Button>
            </div>

            <!-- the motion band's ONE coherent violet event
                 (--motion-accent, the demo-local --viz-legendre twin): a leading
                 accent bar above each counting figure. The value+unit stay ink. -->
            <div class="grid grid-cols-3 gap-6">
                <div
                    v-for="(figure, i) in figures"
                    :key="figure.key"
                    class="glass-card flex flex-col items-center gap-1 p-6"
                >
                    <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                    <span class="text-display fira-code tabular-nums">{{
                        displays[i]!.value
                    }}</span>
                    <span class="text-small text-muted-foreground">{{
                        figure.unit
                    }}</span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
