<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const determinate = ref(42);

const animated = ref(0);
let timer: number | undefined;

function startAnimated(): void {
    stopAnimated();
    animated.value = 0;
    timer = window.setInterval(() => {
        if (animated.value >= 100) {
            animated.value = 0;
            return;
        }
        animated.value = Math.min(100, animated.value + 3);
    }, 120);
}

function stopAnimated(): void {
    if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
    }
}

onMounted(startAnimated);
onUnmounted(stopAnimated);
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <p class="section-label">determinate</p>
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <p class="font-mono text-xs text-muted-foreground">
                        {{ determinate }}% complete
                    </p>
                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            class="h-7 px-2 text-xs"
                            @click="determinate = Math.max(0, determinate - 10)"
                        >
                            −10
                        </Button>
                        <Button
                            variant="outline"
                            class="h-7 px-2 text-xs"
                            @click="determinate = Math.min(100, determinate + 10)"
                        >
                            +10
                        </Button>
                    </div>
                </div>
                <Progress :model-value="determinate" />
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">animated (loop)</p>
            <p class="font-mono text-xs text-muted-foreground">
                Auto-advancing driver resets at 100. The bar below overrides its
                fill with <code>[&amp;>[data-state=loading]]:bg-viz-fourier</code>
                for the red basis colour.
            </p>
            <Progress
                :model-value="animated"
                class="[&>[data-state=loading]]:bg-viz-fourier"
            />
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">indeterminate</p>
            <p class="font-mono text-xs text-muted-foreground">
                No <code>model-value</code> passed — the fill pulses to signal
                unknown duration. Honours <code>prefers-reduced-motion</code>
                via <code>motion-safe:</code>.
            </p>
            <Progress
                class="motion-safe:[&>[data-state=loading]]:animate-pulse [&>[data-state=loading]]:bg-primary/60"
            />
        </section>

        <section class="flex flex-col gap-3">
            <p class="section-label">sizes</p>
            <div class="grid gap-4">
                <Progress :model-value="62" class="h-1.5" />
                <Progress :model-value="62" />
                <Progress :model-value="62" class="h-6" />
            </div>
        </section>
    </StoryPage>
</template>
