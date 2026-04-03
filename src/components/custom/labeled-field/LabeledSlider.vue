<template>
    <IconTooltip :text="tooltip">
        <label :class="labelClass ?? 'font-display text-base text-muted-foreground cursor-help'">{{ label }}</label>
    </IconTooltip>
    <Slider
        class="py-2"
        :min="min"
        :max="max"
        :step="step"
        :model-value="[modelValue]"
        @update:model-value="(v: number[] | undefined) => { if (v) emit('update:modelValue', v[0]!) }"
    />
</template>

<script setup lang="ts">
import { IconTooltip } from "../icon-tooltip";
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
