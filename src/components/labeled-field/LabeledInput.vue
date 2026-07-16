<script setup lang="ts">
import { computed } from "vue";
import { Input } from "../input";
import LabeledField from "./LabeledField.vue";
import type { LabeledInputProps } from "./types";

defineOptions({ name: "LabeledInput" });

const props = defineProps<LabeledInputProps>();
const emit = defineEmits<{ "update:modelValue": [value: string | number] }>();

const controlProps = computed(() => {
    const {
        label: _label,
        description: _description,
        requirement: _requirement,
        layout: _layout,
        errorLive: _errorLive,
        ...control
    } = props;
    return control;
});
</script>

<template>
    <LabeledField
        :label="label"
        :description="description"
        :requirement="required ? 'required' : requirement"
        :layout="layout"
        :error-live="errorLive"
        :invalid="invalid"
        :disabled="disabled"
    >
        <template #default="{ controlId, describedBy, errorId, required: effectiveRequired }">
            <Input
                v-bind="controlProps"
                :id="controlId"
                :aria-describedby="describedBy"
                :aria-errormessage="errorId"
                :required="effectiveRequired"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>
