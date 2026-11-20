<script setup lang="ts">
import { ref } from "vue";
import { PagerDots } from "@glass/components/pager-dots";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import PagerDotsStage from "./pager-dots.stage.vue";

// Twenty pages run in a window of seven.
const COUNTS = [
    { count: 3, windowFit: undefined },
    { count: 7, windowFit: undefined },
    { count: 20, windowFit: 7 },
] as const;
const active = ref<number[]>([0, 3, 9]);

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { PagerDots } from "@mkbabb/glass-ui/pager-dots";

const page = ref(0);
<\/script>

<template>
    <PagerDots v-model:active="page" :count="8" aria-label="Pages" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <PagerDotsStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Counts">
                    <PagerDots
                        v-for="(row, i) in COUNTS"
                        :key="row.count"
                        v-model:active="active[i]"
                        :count="row.count"
                        :window-fit="row.windowFit"
                        :aria-label="`${row.count} pages`"
                    />
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
