<script setup lang="ts">
import { ref } from "vue";
import { LabeledSlider, LabeledSwitch } from "@glass/components/labeled-field";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import LabeledFieldStage from "./labeled-field.stage.vue";

const intensity = ref(64);
const grain = ref(true);

const snippet = `<LabeledInput
    v-model="email"
    label="Email"
    description="Used to sign in."
    requirement="required"
    type="email"
    :invalid="!valid"
>
    <template #error>Enter a valid address.</template>
</LabeledInput>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <LabeledFieldStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Controls">
                    <LabeledSlider v-model="intensity" class="labeled-row-item" :min="0" :max="100" label="Intensity" />
                    <LabeledSwitch v-model="grain" class="labeled-row-item" label="Paper grain" />
                </StoryVariantRow>
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>

<style scoped>
.labeled-row-item {
    inline-size: 14rem;
}
</style>
