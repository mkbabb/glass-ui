<script setup lang="ts">
// useStagger — fixed-count timed reveal cascade.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { useStagger } from "../../../src/composables/motion/useStagger";
import { Button } from "../../../src/components/ui/button";

const COUNT = 8;

const stepMs = ref<number>(80);
const initialMs = ref<number>(80);

const { revealed, start, reset, isComplete } = useStagger({
    items: COUNT,
    delayMs: stepMs.value,
    initialDelayMs: initialMs.value,
    immediate: false,
});
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-6">
            <p class="text-prose text-muted-foreground max-w-prose">
                One-shot staggered timeline of <code class="fira-code">{{ COUNT }}</code> slots.
                Each slot flips <code class="fira-code">true</code> at
                <code class="fira-code">initialDelayMs + i * delayMs</code>.
                Distinguished from <code class="fira-code">useStaggerReveal</code> by gating
                purely on a timer rather than the IntersectionObserver threshold.
            </p>

            <div class="flex flex-wrap items-center gap-3">
                <Button variant="default" @click="start">Play</Button>
                <Button variant="outline" @click="reset">Reset</Button>
                <span class="text-small text-muted-foreground">
                    Step {{ stepMs }}ms · initial {{ initialMs }}ms ·
                    {{ isComplete ? "complete" : "running" }}
                </span>
            </div>

            <div class="grid grid-cols-4 gap-4 sm:grid-cols-8">
                <div
                    v-for="(flag, idx) in revealed"
                    :key="idx"
                    class="flex aspect-square flex-col items-center justify-center rounded-panel border border-border bg-card transition-[transform,opacity] duration-normal ease-out"
                    :class="
                        flag
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-20'
                    "
                >
                    <span class="font-display text-display-5 text-foreground">
                        {{ (idx + 1).toString().padStart(2, "0") }}
                    </span>
                </div>
            </div>
        </section>
    </StoryPage>
</template>
