<script setup lang="ts">
import { ref } from "vue";
import {
    SegmentedTabs,
    type SegmentedTabOption,
    type SegmentedTabsOrientation,
} from "@glass/components/tabs";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TabsStage from "./tabs.stage.vue";

const orientation = ref<SegmentedTabsOrientation>("horizontal");

const doc = ref("notes");
const DOCS: SegmentedTabOption[] = [
    { label: "Notes", value: "notes" },
    { label: "Specs", value: "specs" },
    { label: "Logs", value: "logs" },
];

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";

const view = ref("grid");
const views = [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
];
<\/script>

<template>
    <SegmentedTabs v-model="view" :options="views" aria-label="View" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <StageSwap :swap-key="orientation">
                    <TabsStage :orientation="orientation" />
                </StageSwap>
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="orientation"
                    label="Orientation"
                    :options="[
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'vertical', label: 'Vertical' },
                    ]"
                />
                <StoryVariantRow label="Underline">
                    <SegmentedTabs
                        v-model="doc"
                        :options="DOCS"
                        variant="underline"
                        aria-label="Document"
                    />
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
