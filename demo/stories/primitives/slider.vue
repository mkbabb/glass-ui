<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/cn";

const volume = ref<number[]>([42]);
const balance = ref<number[]>([65]);
const range = ref<number[]>([22, 78]);
const spectrum = ref<number[]>([50]);
const disabled = ref<number[]>([30]);
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · slider</p>
            <h1 class="text-title text-foreground">Slider</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Glass track, circular thumb. The standard variant is a draggable pill; range
                mode adds a second thumb. Every thumb honours keyboard arrows and the
                disabled state dims in lock-step.
            </p>
        </header>

        <!-- Standard, with label + value readout. -->
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

        <!-- Custom fourier-red fill via data-attribute utility. -->
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
                        '[&_[data-orientation]]:bg-viz-fourier/25',
                        '[&_[data-slot=range]]:bg-viz-fourier',
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

        <!-- Spectrum variant — thin bar thumb over a tall muted track. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">spectrum variant</p>
            <Slider
                v-model="spectrum"
                variant="spectrum"
                :max="100"
                :step="1"
                aria-label="Spectrum"
                :class="
                    cn(
                        '[&_[data-orientation]]:bg-[linear-gradient(to_right,var(--viz-fourier),var(--viz-legendre),var(--viz-chebyshev))]',
                    )
                "
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
    </article>
</template>
