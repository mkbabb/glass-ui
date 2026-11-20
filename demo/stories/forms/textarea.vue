<script setup lang="ts">
import { Textarea } from "@glass/components/textarea";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TextareaStage from "./textarea.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { Textarea } from "@mkbabb/glass-ui/textarea";

const notes = ref("");
<\/script>

<template>
    <Textarea v-model="notes" rows="3" aria-label="Notes" />
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="fit">
                <TextareaStage />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow label="Sizing">
                    <Textarea class="forms-row-field" rows="2" resize="none" model-value="Fixed" aria-label="Fixed" />
                    <Textarea class="forms-row-field" rows="2" resize="vertical" model-value="Drag to resize" aria-label="Resizable" />
                </StoryVariantRow>
                <StoryVariantRow label="States">
                    <Textarea class="forms-row-field" rows="2" model-value="Too short" invalid aria-label="Invalid" />
                    <Textarea class="forms-row-field" rows="2" model-value="Read only" readonly aria-label="Read only" />
                    <Textarea class="forms-row-field" rows="2" model-value="Disabled" disabled aria-label="Disabled" />
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
