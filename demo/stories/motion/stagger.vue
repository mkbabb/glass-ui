<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
// Stagger reveal grid — 24 cards fade/slide-in as they enter the viewport.
import { computed, ref } from "vue";
import { useStaggerReveal } from "../../../src/composables/motion";
import { Button } from "../../../src/components/ui/button";
import { cn } from "../../../src/utils/cn";

const COUNT = 24;

const { register, revealed } = useStaggerReveal({
    staggerMs: 45,
    once: false,
    threshold: 0.2,
});

// Force remount to replay the sequence — changing :key unmounts/remounts each tile.
const resetNonce = ref(0);
const replayKey = computed(() => resetNonce.value);
const items = computed(() =>
    Array.from({ length: COUNT }, (_, i) => ({ idx: i, key: `${resetNonce.value}-${i}` })),
);

function replay(): void {
    resetNonce.value += 1;
    // Reset reveal flags — the composable re-observes on register.
    for (let i = 0; i < COUNT; i++) revealed[i] = false;
}

function setRef(el: Element | null, idx: number): void {
    register(el as HTMLElement | null, idx);
}
</script>

<template>
    <StoryPage>
        <div class="flex items-center gap-3">
            <Button variant="secondary" @click="replay">Replay</Button>
            <span class="text-small text-muted-foreground">
                45ms stagger, threshold 0.2, <code class="fira-code">once: false</code>.
            </span>
        </div>

        <!-- Extra spacing so the grid starts below the fold on first paint. -->
        <div aria-hidden="true" class="h-[40vh]" />

        <section
            :key="replayKey"
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
            <div
                v-for="item in items"
                :key="item.key"
                :ref="(el) => setRef(el as Element | null, item.idx)"
                :class="
                    cn(
                        'flex aspect-square flex-col items-center justify-center gap-1 rounded-panel',
                        'border border-border bg-card shadow-cartoon',
                        'transition-all duration-normal ease-out',
                        revealed[item.idx]
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-4 opacity-0',
                    )
                "
            >
                <span class="font-display text-display-5 text-foreground">
                    {{ (item.idx + 1).toString().padStart(2, "0") }}
                </span>
                <span class="text-mono-caption text-muted-foreground">slot</span>
            </div>
        </section>

        <div aria-hidden="true" class="h-[20vh]" />
    </StoryPage>
</template>
