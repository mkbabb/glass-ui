<script setup lang="ts">
import { ref } from "vue";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StageSwap from "../../chassis/variants/StageSwap.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import SelectStage from "./select.stage.vue";

const list = ref<"short" | "long">("short");

const snippet = `<Select v-model="size">
    <SelectTrigger aria-label="Size">
        <SelectValue placeholder="Choose a size" />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="small">Small</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="large">Large</SelectItem>
    </SelectContent>
</Select>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <StageSwap :swap-key="list">
                    <SelectStage :list="list" />
                </StageSwap>
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="list"
                    label="List"
                    :options="[
                        { value: 'short', label: 'Short' },
                        { value: 'long', label: 'Long' },
                    ]"
                />
                <StoryVariantRow label="States">
                    <Select>
                        <SelectTrigger class="forms-row-field" aria-label="Empty">
                            <SelectValue placeholder="Choose one" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="a">First</SelectItem>
                            <SelectItem value="b">Second</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select model-value="locked" disabled>
                        <SelectTrigger class="forms-row-field" aria-label="Disabled">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="locked">Disabled</SelectItem>
                        </SelectContent>
                    </Select>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.forms-row-field {
    inline-size: 10.5rem;
}
</style>
