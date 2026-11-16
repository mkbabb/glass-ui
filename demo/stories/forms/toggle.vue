<script setup lang="ts">
import { ref } from "vue";
import { Bold, Italic, Underline } from "@lucide/vue";
import { ToggleGroup, ToggleGroupItem } from "@glass/components/toggle-group";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import ToggleStage from "./toggle.stage.vue";

const marks = ref<string[]>(["bold"]);

const snippet = `<ToggleGroup v-model="view" type="single" aria-label="Calendar view">
    <ToggleGroupItem value="day">Day</ToggleGroupItem>
    <ToggleGroupItem value="week">Week</ToggleGroupItem>
    <ToggleGroupItem value="month">Month</ToggleGroupItem>
</ToggleGroup>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <ToggleStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Multiple">
                    <ToggleGroup v-model="marks" type="multiple" aria-label="Text style">
                        <ToggleGroupItem value="bold" aria-label="Bold">
                            <Bold class="h-4 w-4" aria-hidden="true" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="italic" aria-label="Italic">
                            <Italic class="h-4 w-4" aria-hidden="true" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="underline" aria-label="Underline">
                            <Underline class="h-4 w-4" aria-hidden="true" />
                        </ToggleGroupItem>
                    </ToggleGroup>
                </StoryVariantRow>
                <StoryVariantRow label="States">
                    <ToggleGroup model-value="eu" type="single" invalid aria-label="Region">
                        <ToggleGroupItem value="us">US</ToggleGroupItem>
                        <ToggleGroupItem value="eu">EU</ToggleGroupItem>
                    </ToggleGroup>
                    <ToggleGroup model-value="fast" type="single" disabled aria-label="Speed">
                        <ToggleGroupItem value="fast">Fast</ToggleGroupItem>
                        <ToggleGroupItem value="slow">Slow</ToggleGroupItem>
                    </ToggleGroup>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
