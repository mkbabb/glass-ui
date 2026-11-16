<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryVariants from "../../chassis/variants/StoryVariants.vue";
import StoryVariantRow from "../../chassis/variants/StoryVariantRow.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import PagerStage from "./pager.stage.vue";

const form = ref<"dots" | "steps">("dots");

const snippet = `<GlassDock :collapse="false" fit-content aria-label="Pages">
    <DockControl aria-label="Previous page" @click="prev"><ChevronLeft /></DockControl>
    <PagerDots v-model:active="page" :count="5" :ring="false" aria-label="Pages" />
    <DockControl aria-label="Next page" @click="next"><ChevronRight /></DockControl>
</GlassDock>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall" field>
                <PagerStage :form="form" />
            </StoryStage>
        </template>

        <template #variants>
            <StoryVariants>
                <StoryVariantRow
                    v-model="form"
                    label="Form"
                    :options="[
                        { value: 'dots', label: 'Dots' },
                        { value: 'steps', label: 'Steps' },
                    ]"
                />
            </StoryVariants>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
