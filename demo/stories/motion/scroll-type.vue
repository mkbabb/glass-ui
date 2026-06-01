<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
// The brand display face (Plus Jakarta Sans) animates font-variation-settings
// + weight based on the scroll progress of a target element. The live axis on
// the published face is wght 300→700; the WONK/SOFT/opsz readouts demonstrate
// the axis-driving machinery (they apply on any display face exposing those
// optional axes).
import { computed, ref } from "vue";
import { useScrollProgress } from "../../../src/composables/motion/core";
import { cn } from "../../../src/utils/cn";

const target = ref<HTMLElement | null>(null);

const progress = useScrollProgress({
    target,
    // Start progress earlier so the transformation feels paced.
    offset: -80,
    trackExit: true,
});

const wonk = computed(() => progress.value.toFixed(2));
const soft = computed(() => (progress.value * 100).toFixed(0));
const weight = computed(() => Math.round(300 + progress.value * 400));
const optical = computed(() => Math.round(16 + progress.value * 128));

const fvs = computed(
    () =>
        `'WONK' ${wonk.value}, 'SOFT' ${soft.value}, 'opsz' ${optical.value}`,
);
</script>

<template>
    <StoryPage>
        <!-- Live readout of the axes. -->
        <section
            :class="
                cn(
                    'sticky top-4 z-10 flex flex-wrap gap-6 rounded-panel border border-border/60',
                    'bg-card/80 px-5 py-3 backdrop-blur-sm shadow-cartoon-sm',
                )
            "
        >
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">progress</span>
                <span class="fira-code text-small text-foreground">
                    {{ progress.toFixed(2) }}
                </span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">WONK</span>
                <span class="fira-code text-small text-foreground">{{ wonk }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">SOFT</span>
                <span class="fira-code text-small text-foreground">{{ soft }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">opsz</span>
                <span class="fira-code text-small text-foreground">{{ optical }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">wght</span>
                <span class="fira-code text-small text-foreground">{{ weight }}</span>
            </div>
        </section>

        <div aria-hidden="true" class="h-[40vh]" />

        <!-- The scroll target. Its progress drives the axes above and the display text below. -->
        <section
            ref="target"
            :class="
                cn(
                    'relative rounded-card border border-border bg-card p-10 shadow-cartoon',
                    'min-h-[60vh] flex items-center justify-center',
                    'paper-grain-overlay',
                )
            "
        >
            <p
                :class="
                    cn(
                        'font-display text-display-3 leading-none text-foreground',
                        'text-center max-w-4xl',
                    )
                "
                :style="{
                    fontVariationSettings: fvs,
                    fontWeight: weight,
                }"
            >
                Ornament is not a crime — it's a variable axis.
            </p>
        </section>

        <div aria-hidden="true" class="h-[60vh]" />
    </StoryPage>
</template>
