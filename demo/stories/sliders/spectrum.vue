<script setup lang="ts">
// AV.W11 — the spectrum slider: the gradient-track color slider.
//
// The second of the two canonical slider recipes. The track background is a
// consumer-supplied `--slider-track-bg` linear-gradient (an LCH/hue ramp); the
// range is transparent so the gradient itself reads as the fill, and the knob
// is a small ringed disc that holds against any track hue. This is the
// aurora/blob color-picking surface.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Slider } from "../../../src/components/ui/slider";

const hue = ref<number[]>([200]);
const light = ref<number[]>([55]);
const chroma = ref<number[]>([40]);
const viz = ref<number[]>([50]);

const hueRamp =
    "linear-gradient(to right, oklch(0.7 0.2 0), oklch(0.7 0.2 60), oklch(0.7 0.2 120), oklch(0.7 0.2 180), oklch(0.7 0.2 240), oklch(0.7 0.2 300), oklch(0.7 0.2 360))";
const lightRamp = "linear-gradient(to right, oklch(0 0 0), oklch(1 0 0))";
const chromaRamp =
    "linear-gradient(to right, oklch(0.7 0 200), oklch(0.7 0.3 200))";
</script>

<template>
    <StoryPage>
        <StorySection
            label="hue · chroma · lightness"
            blurb="Three gradient tracks, each a per-channel OKLCh ramp bound via `--slider-track-bg`. The small ringed knob reads against any hue beneath it."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">hue — {{ hue[0] }}°</p>
                        <Slider
                            v-model="hue"
                            variant="spectrum"
                            :max="360"
                            :step="1"
                            aria-label="Hue"
                            :style="{ '--slider-track-bg': hueRamp }"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">lightness — {{ light[0] }}%</p>
                        <Slider
                            v-model="light"
                            variant="spectrum"
                            :max="100"
                            :step="1"
                            aria-label="Lightness"
                            :style="{ '--slider-track-bg': lightRamp }"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">chroma — {{ chroma[0] }}</p>
                        <Slider
                            v-model="chroma"
                            variant="spectrum"
                            :max="100"
                            :step="1"
                            aria-label="Chroma"
                            :style="{ '--slider-track-bg': chromaRamp }"
                        />
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="standard vs spectrum"
            blurb="The two canonical recipes side by side — the continuous rounded iOS knob, and the gradient-track color slider."
        >
            <ShowcaseFrame pad="md">
                <div class="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4">
                    <code class="fira-code text-mono-caption text-foreground">standard</code>
                    <Slider
                        v-model="viz"
                        :max="100"
                        :step="1"
                        aria-label="standard comparison"
                    />
                    <code class="fira-code text-mono-caption text-foreground">spectrum</code>
                    <Slider
                        v-model="hue"
                        variant="spectrum"
                        :max="360"
                        :step="1"
                        aria-label="spectrum comparison"
                        :style="{ '--slider-track-bg': hueRamp }"
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="notes"
            blurb="The spectrum recipe is token-driven — the consumer owns the gradient."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        Track: a tall capsule whose background is the consumer's
                        <code class="fira-code">--slider-track-bg</code> linear-gradient.
                    </li>
                    <li>
                        Range: transparent — the gradient itself is the fill, so the
                        thumb position reads against the full ramp.
                    </li>
                    <li>
                        Thumb: a small ringed disc (a
                        <code class="fira-code">2px</code> border) that holds against
                        any track hue.
                    </li>
                    <li>
                        The canonical consumer is the aurora OKLCh color picker —
                        each L/C/h channel binds a per-channel gradient track.
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
