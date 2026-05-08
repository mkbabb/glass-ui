<template>
    <LabeledField :label="label" :tooltip="tooltip" :label-class="labelClass">
        <Slider
            class="py-2"
            :min="min"
            :max="max"
            :step="step"
            :model-value="[modelValue]"
            @update:model-value="(v: number[] | undefined) => { if (v) emit('update:modelValue', v[0]!) }"
        />
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
import { Slider } from "../../ui/slider";

defineProps<{
    modelValue: number;
    label: string;
    tooltip: string;
    labelClass?: string;
    min: number;
    max: number;
    step: number;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: number];
}>();
</script>
