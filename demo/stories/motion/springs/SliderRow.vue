<script setup lang="ts">
// One editor row holding one slider.
import { Slider } from "@glass/components/slider";
import StoryEditorRow from "../../../chassis/editor/StoryEditorRow.vue";

defineProps<{ label: string; min: number; max: number; step: number }>();

const model = defineModel<number>({ required: true });
</script>

<template>
    <StoryEditorRow :label="label">
        <Slider
            :model-value="[model]"
            :min="min"
            :max="max"
            :step="step"
            :aria-label="label"
            @update:model-value="(v) => v && (model = v[0]!)"
        />
    </StoryEditorRow>
</template>
