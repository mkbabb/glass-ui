<template>
    <LabeledField :label="label" :tooltip="tooltip" :label-class="labelClass">
        <Input
            :type="type ?? 'string'"
            :class="inputClass ?? 'fira-code'"
            :model-value="modelValue"
            @change="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
        />
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
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
