<script setup lang="ts">
// glass-scrubber slider variant — P.W3 Lane A substrate promotion.
//
// Canonicalises the fourier-analysis 3-site shadow recipe
// (GlassTimeline / SliderControl / ConvergenceTimeline) into a CVA variant
// over the existing `<Slider>` substrate. Tall scrub track + grab-friendly
// thin-bar thumb; hover/focus-within lift the track's contrast.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Slider, type SliderVariants } from "../../../src/components/ui/slider";

const scrub = ref<number[]>([42]);
const scrubHover = ref<number[]>([65]);
const scrubGrab = ref<number[]>([78]);

const variants: NonNullable<SliderVariants["variant"]>[] = [
    "standard",
    "spectrum",
    "timeline",
    "glass-pill",
    "glass-cartoon",
    "glass-scrubber",
];
const matrix = ref<Record<string, number[]>>(
    Object.fromEntries(variants.map((v) => [v, [50]])),
);
</script>

<template>
    <StoryPage>
        <StorySection
            label="three scrubber instances"
            blurb="The same variant rendered in three states: at rest, mid-hover (taller track), and mid-grab (range highlight)."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">at rest</p>
                        <Slider
                            v-model="scrub"
                            variant="glass-scrubber"
                            :max="100"
                            :step="1"
                            aria-label="Scrub at rest"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">hover — track contrast lifts</p>
                        <Slider
                            v-model="scrubHover"
                            variant="glass-scrubber"
                            :max="100"
                            :step="1"
                            aria-label="Scrub hover"
                        />
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-mono-caption text-muted-foreground">grab — range highlight ride-along</p>
                        <Slider
                            v-model="scrubGrab"
                            variant="glass-scrubber"
                            :max="100"
                            :step="1"
                            aria-label="Scrub grab"
                        />
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="6-variant comparison"
            blurb="The full variant ladder — standard / spectrum / timeline / glass-pill / glass-cartoon / glass-scrubber. The new glass-scrubber rung lives at the bottom of the table."
        >
            <ShowcaseFrame pad="md">
                <div class="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-4">
                    <template v-for="variant in variants" :key="variant">
                        <code class="fira-code text-mono-caption text-foreground">
                            {{ variant }}
                        </code>
                        <Slider
                            v-model="matrix[variant]"
                            :variant="variant"
                            :max="100"
                            :step="1"
                            :aria-label="`${variant} comparison`"
                        />
                    </template>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="notes"
            blurb="The glass-scrubber recipe is substrate-level — track + range + thumb all paint from the variant block."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <ul class="text-prose text-muted-foreground list-disc pl-5 space-y-1">
                    <li>
                        Track: scrub-tier glass with tall geometry and a grab-friendly hit-area floor.
                    </li>
                    <li>
                        Thumb: thin-bar (not circular) — pointer pickup reads as a scrubber, not a knob.
                    </li>
                    <li>
                        Pairs with the dock <code class="fira-code">keepDockOpen</code> contract — Slider auto-acquires
                        the dock-held token during pointer drags.
                    </li>
                    <li>
                        Substrate-only; no API delta — pass <code class="fira-code">variant="glass-scrubber"</code>
                        on any existing <code class="fira-code">&lt;Slider&gt;</code> call site.
                    </li>
                </ul>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
