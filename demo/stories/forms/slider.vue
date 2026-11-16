<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "@glass/components/slider";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SliderStage from "./slider.stage.vue";

const range = ref([20, 70]);
const hue = ref([55]);
const spectrumTrack = {
    "--glass-slider-track-background":
        "linear-gradient(to right, var(--viz-fourier), var(--viz-legendre), var(--viz-chebyshev))",
};

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { Slider } from "@mkbabb/glass-ui/slider";

const volume = ref([42]);
<\/script>

<template>
    <Slider v-model="volume" :max="100" aria-label="Volume" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <SliderStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Kinds">
                    <Slider v-model="range" class="slider-row-item" :max="100" aria-label="Range" />
                    <Slider
                        v-model="hue"
                        class="slider-row-item"
                        variant="spectrum"
                        :max="100"
                        :style="spectrumTrack"
                        aria-label="Spectrum"
                    />
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.slider-row-item {
    inline-size: 16rem;
}
</style>
