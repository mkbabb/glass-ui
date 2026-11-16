<script setup lang="ts">
import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import NumberFieldStage from "./number-field.stage.vue";

const snippet = `<NumberField v-model="quantity" :min="0" :max="99" aria-label="Quantity">
    <NumberFieldStep direction="decrement" />
    <NumberFieldInput />
    <NumberFieldStep direction="increment" />
</NumberField>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <NumberFieldStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="States">
                    <NumberField class="number-row-field" :model-value="120" :max="100" invalid aria-label="Over its limit">
                        <NumberFieldStep direction="decrement" />
                        <NumberFieldInput />
                        <NumberFieldStep direction="increment" />
                    </NumberField>
                    <NumberField class="number-row-field" :model-value="5" disabled aria-label="Disabled">
                        <NumberFieldStep direction="decrement" />
                        <NumberFieldInput />
                        <NumberFieldStep direction="increment" />
                    </NumberField>
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.number-row-field {
    inline-size: 10.5rem;
}
</style>
