<script setup lang="ts">
import { computed } from "vue";
import { Slider } from "../slider";
import LabeledField from "./LabeledField.vue";
import type { LabeledSliderProps } from "./types";

defineOptions({ name: "LabeledSlider" });

const props = defineProps<LabeledSliderProps>();
const emit = defineEmits<{ "update:modelValue": [value: number] }>();

const controlProps = computed(() => {
    const {
        label: _label,
        description: _description,
        requirement: _requirement,
        layout: _layout,
        errorLive: _errorLive,
        modelValue: _modelValue,
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
        <template #default="{ controlId, labelledBy, describedBy, errorId, required: effectiveRequired }">
            <Slider
                v-bind="controlProps"
                :id="controlId"
                :model-value="[modelValue]"
                :aria-labelledby="labelledBy"
                :aria-describedby="describedBy"
                :aria-errormessage="errorId"
                :required="effectiveRequired"
                @update:model-value="emit('update:modelValue', $event?.[0] ?? modelValue)"
            />
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>
