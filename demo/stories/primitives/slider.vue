<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Slider, type SliderVariants } from "../../../src/components/ui/slider";
import { cn } from "../../../src/utils/cn";

const volume = ref<number[]>([42]);
const balance = ref<number[]>([65]);
const range = ref<number[]>([22, 78]);
const spectrum = ref<number[]>([50]);
const disabled = ref<number[]>([30]);

// AV.W11 — variant × size matrix (2 variants × 3 sizes = 6 cells).
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
        <!-- Standard — the integrated-cylinder glass slider (AX.W59): the
             fill is one continuous glass pill whose rounded leading edge is
             the grab. With label + value readout. -->
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
             SQUIRCLE thumb (the iOS color-picker idiom; AX.W59). The track
             background is consumer-supplied via `--slider-track-bg`. -->
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

        <!-- J.W5.A hard gate (e): variant × size matrix proof. -->
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
