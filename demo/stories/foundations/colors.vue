<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ColorsStage, { type ColorSet } from "./colors.stage.vue";

const set = ref<ColorSet>("palette");

const SETS: { value: ColorSet; label: string }[] = [
    { value: "palette", label: "Palette" },
    { value: "tints", label: "Tints" },
    { value: "chart", label: "Chart" },
];

const snippet = `<template>
    <div class="bg-card text-foreground border border-border">
        <span class="text-primary">Primary ink</span>
        <span :style="{ color: 'var(--chart-download)' }">Download</span>
    </div>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ColorsStage :set="set" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow v-model="set" label="Set" :options="SETS" />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
