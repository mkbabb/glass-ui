<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Slider, type SliderVariants } from "../../../src/components/ui/slider";
import { cn } from "../../../src/utils/cn";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { SlidersHorizontal } from "@lucide/vue";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// identity (the cool stop). PH3-safe (inline borderLeft, not the
// border-l-[3px] + <IconChip> double-header shape).
const FORMS_STOP = 3;

const volume = ref<number[]>([42]);
const balance = ref<number[]>([65]);
const range = ref<number[]>([22, 78]);
const spectrum = ref<number[]>([50]);
const disabled = ref<number[]>([30]);

// Variant × size matrix (2 variants × 3 sizes = 6 cells).
// Each cell binds an independent reactive value so drag interactions
// don't cross-couple. Hard gate requires every cell renders.
const variants: NonNullable<SliderVariants["variant"]>[] = [
    "standard",
    "spectrum",
];
const sizes: NonNullable<SliderVariants["size"]>[] = ["sm", "md", "lg"];

type MatrixKey = `${(typeof variants)[number]}__${(typeof sizes)[number]}`;
const matrix = ref<Record<MatrixKey, number[]>>(
    Object.fromEntries(
        variants.flatMap((variant) =>
            sizes.map((size) => [`${variant}__${size}` as MatrixKey, [40]] as const),
        ),
    ) as unknown as Record<MatrixKey, number[]>,
);
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="SlidersHorizontal" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Slider
                </span>
                <p class="text-small text-muted-foreground">
                    Range selection with keep-dock-open — the section identity is
                    the ONE color event.
                </p>
            </div>
        </header>

        <!-- Standard — the integrated-cylinder glass slider: the fill is one
             continuous glass pill whose rounded leading edge is the grab. With
             label + value readout. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">standard</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Volume</span>
                <span class="text-mono-caption text-muted-foreground tabular-nums">
                    {{ volume[0] }}%
                </span>
            </div>
            <Slider v-model="volume" :max="100" :step="1" aria-label="Volume" />
        </section>

        <!-- Custom fourier-red fill via descendant selectors. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">viz-fourier fill</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Balance</span>
                <span class="text-mono-caption text-muted-foreground tabular-nums">
                    {{ balance[0] }}
                </span>
            </div>
            <Slider
                v-model="balance"
                :max="100"
                :step="1"
                aria-label="Balance"
                :class="
                    cn(
                        '[&_.slider-track]:bg-viz-fourier/25',
                        '[&_.slider-range]:bg-viz-fourier',
                    )
                "
            />
        </section>

        <!-- Range mode: two thumbs bound a window. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">range · two thumbs</p>
            <div class="flex items-center justify-between">
                <span class="text-small text-foreground">Price window</span>
                <span class="text-mono-caption text-muted-foreground tabular-nums">
                    ${{ range[0] }} – ${{ range[1] }}
                </span>
            </div>
            <Slider v-model="range" :max="100" :step="1" aria-label="Price range" />
        </section>

        <!-- Spectrum variant — value.js gradient track + a track-height
             SQUIRCLE thumb (the iOS color-picker idiom). The track background
             is consumer-supplied via `--slider-track-bg`. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">spectrum variant — gradient track</p>
            <Slider
                v-model="spectrum"
                variant="spectrum"
                :max="100"
                :step="1"
                aria-label="Spectrum"
                :style="{
                    '--slider-track-bg':
                        'linear-gradient(to right, var(--viz-fourier), var(--viz-legendre), var(--viz-chebyshev))',
                }"
            />
        </section>

        <!-- Disabled. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">disabled</p>
            <Slider
                v-model="disabled"
                :max="100"
                :step="1"
                disabled
                aria-label="Disabled slider"
            />
        </section>

        <!-- Variant × size matrix. -->
        <section class="flex flex-col gap-4">
            <p class="section-label">variant × size matrix</p>
            <div class="grid grid-cols-[auto_1fr_1fr_1fr] items-center gap-x-6 gap-y-5">
                <div></div>
                <div
                    v-for="size in sizes"
                    :key="`hd-${size}`"
                    class="text-mono-caption text-muted-foreground"
                >
                    {{ size }}
                </div>
                <template v-for="variant in variants" :key="variant">
                    <div class="text-mono-caption text-muted-foreground">{{ variant }}</div>
                    <Slider
                        v-for="size in sizes"
                        :key="`${variant}__${size}`"
                        v-model="matrix[`${variant}__${size}`]"
                        :variant="variant"
                        :size="size"
                        :max="100"
                        :step="1"
                        :aria-label="`${variant} ${size}`"
                    />
                </template>
            </div>
        </section>
    </StoryPage>
</template>
