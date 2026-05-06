<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { GaugeCircle } from "lucide-vue-next";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils/cn";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";

const volume = ref<number[]>([42]);
const balance = ref<number[]>([65]);
const range = ref<number[]>([22, 78]);
const spectrum = ref<number[]>([50]);
const disabled = ref<number[]>([30]);
</script>

<template>
    <StoryPage>
        <!-- Hero — section-0, the reference rung. The base slider, named. -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-45"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 65% 55% at 22% 18%, color-mix(in srgb, var(--section-color-0) 40%, transparent) 0%, transparent 60%),
                        radial-gradient(ellipse 80% 65% at 80% 88%, var(--rainbow-pastel-yellow) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-0)' }">
                    primitives · slider · § 0 — the reference rung
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-0" aria-hidden="true">
                        <GaugeCircle />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-mega"
                            variation="wonk"
                            class="leading-[0.92]"
                            :style="{ color: 'var(--section-color-0)' }"
                        >
                            From here to there.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            The base slider — one thumb, one rail, one value. The
                            <code class="fira-code">glass-track</code> variant lives
                            in its own story; this is the canon shape. Single thumb
                            for scalars, double for ranges, full-rail gradient for
                            spectra. Locked when read-only.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-0" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <div
            class="grid gap-[var(--space-phi-4)] rounded-2xl border-2 border-border bg-card p-[var(--space-phi-5)] shadow-cartoon"
        >
            <!-- Standard, with label + value readout. -->
            <section class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <p class="section-label">standard</p>
                    <span class="text-mono-caption text-muted-foreground tabular-nums">
                        volume · {{ volume[0] }}%
                    </span>
                </div>
                <Slider v-model="volume" :max="100" :step="1" aria-label="Volume" />
            </section>

            <!-- Custom fourier-red fill via data-attribute utility. -->
            <section class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <p class="section-label">viz-fourier fill</p>
                    <span class="text-mono-caption text-muted-foreground tabular-nums">
                        balance · {{ balance[0] }}
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
                <div class="flex items-center justify-between">
                    <p class="section-label">range · two thumbs</p>
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
                <p class="text-mono-caption text-muted-foreground">
                    fourier → legendre → chebyshev — full-rail viz-basis gradient
                </p>
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
        </div>
    </StoryPage>
</template>
