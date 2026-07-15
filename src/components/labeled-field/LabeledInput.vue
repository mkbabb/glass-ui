<template>
    <LabeledField
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
    >
        <template #default="{ errorId, controlId }">
            <Input
                :id="controlId"
                :type="type ?? 'string'"
                :class="inputClass ?? 'fira-code'"
                :model-value="modelValue"
                :required="required"
                :aria-errormessage="$slots.error ? errorId : undefined"
                @change="(e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
            />
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
import { Input } from "../input";

defineProps<{
    modelValue: string | number;
    label: string;
    tooltip: string;
    labelClass?: string;
    inputClass?: string;
    type?: string;
    /**
     * AQ.W4 §W4.5 — mark the field required. Threads the `aria-hidden`
     * asterisk onto the label AND sets the native `required` attribute on the
     * inner `<Input>` (the semantic carrier that drives `:user-invalid`).
     */
    required?: boolean;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();
</script>
