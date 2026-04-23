<script setup lang="ts">
// Fraunces display text animates font-variation-settings + weight based on the
// scroll progress of a target element. Drives WONK 0→1, SOFT 0→100, wght 300→700.
import { computed, ref } from "vue";
import { useScrollProgress } from "@/composables/motion";
import { cn } from "@/utils/cn";

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
    <article class="flex flex-col gap-10 p-8 text-foreground">
        <header class="flex flex-col gap-2">
            <span class="text-admin-label text-muted-foreground">
                Motion · Scroll-driven type
            </span>
            <h1 class="text-title">useScrollProgress</h1>
            <p class="text-prose max-w-prose text-muted-foreground">
                Fraunces animates its <code class="font-mono-code">WONK</code>,
                <code class="font-mono-code">SOFT</code>, optical size, and weight axes
                in lockstep with the target's 0→1 scroll progress. Scroll down to watch
                letterforms soften, swell, and bend.
            </p>
        </header>

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
                <span class="font-mono-code text-small text-foreground">
                    {{ progress.toFixed(2) }}
                </span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">WONK</span>
                <span class="font-mono-code text-small text-foreground">{{ wonk }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">SOFT</span>
                <span class="font-mono-code text-small text-foreground">{{ soft }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">opsz</span>
                <span class="font-mono-code text-small text-foreground">{{ optical }}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-mono-caption text-muted-foreground">wght</span>
                <span class="font-mono-code text-small text-foreground">{{ weight }}</span>
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
    </article>
</template>
