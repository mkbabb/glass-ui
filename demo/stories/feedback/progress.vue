<script setup lang="ts">
import { Progress } from "@glass/components/progress";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ProgressStage from "./progress.stage.vue";

const SIZES = ["sm", "md", "lg"] as const;

const snippet = `<script setup lang="ts">
import { Progress } from "@mkbabb/glass-ui/progress";
<\/script>

<template>
    <Progress :model-value="62" aria-label="Upload" />
    <Progress :model-value="null" aria-label="Syncing" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ProgressStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Sizes">
                    <Progress
                        v-for="size in SIZES"
                        :key="size"
                        class="progress-row-bar"
                        :model-value="62"
                        :size="size"
                        :aria-label="`Size ${size}`"
                    />
                </StoryVariantRow>
                <StoryVariantRow label="Indeterminate">
                    <Progress
                        class="progress-row-bar progress-row-wide"
                        :model-value="null"
                        aria-label="Syncing"
                    />
                </StoryVariantRow>
                <StoryVariantRow label="Vertical · Liquid">
                    <Progress
                        class="progress-row-tall"
                        orientation="vertical"
                        :model-value="62"
                        aria-label="Vertical"
                    />
                    <Progress
                        class="progress-row-tall"
                        orientation="vertical"
                        variant="liquid"
                        :model-value="62"
                        aria-label="Vertical liquid"
                    />
                    <Progress
                        class="progress-row-bar progress-row-wide"
                        variant="liquid"
                        :model-value="62"
                        aria-label="Liquid"
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
.progress-row-bar {
    inline-size: 8rem;
}
.progress-row-wide {
    inline-size: 14rem;
}
.progress-row-tall {
    block-size: 5rem;
}
</style>
