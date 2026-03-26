<template>
    <IconTooltip :text="tooltip">
        <label :class="labelClass ?? 'font-display text-lg text-muted-foreground cursor-help'">{{ label }}</label>
    </IconTooltip>
    <Input
        :type="type ?? 'string'"
        :class="inputClass ?? 'font-mono-code'"
        :model-value="modelValue"
        @change="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
    />
</template>

<script setup lang="ts">
import { IconTooltip } from "../icon-tooltip";
import { Input } from "../../ui/input";

defineProps<{
    modelValue: string | number;
    label: string;
    tooltip: string;
    labelClass?: string;
    inputClass?: string;
    type?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();
</script>
