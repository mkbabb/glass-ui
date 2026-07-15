<template>
    <LabeledField
        :class="$attrs.class"
        :style="$attrs.style"
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
        :error-live="errorLive"
    >
        <template #default="{ errorId, controlId }">
            <Input
                v-bind="inputAttrs"
                :id="controlId"
                :type="type ?? 'text'"
                :class="inputClass ?? 'fira-code'"
                :model-value="modelValue"
                :required="required"
                :aria-errormessage="$slots.error ? errorId : undefined"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import LabeledField from "./LabeledField.vue";
import { Input } from "../input";

defineOptions({ inheritAttrs: false });

const attrs = useAttrs();
const inputAttrs = computed(() => {
    const { class: _class, style: _style, ...nativeAttrs } = attrs;
    return nativeAttrs;
});

defineProps<{
    modelValue: string | number;
    label: string;
    tooltip?: string;
    labelClass?: string;
    inputClass?: string;
    type?: string;
    /**
     * AQ.W4 §W4.5 — mark the field required. Threads the `aria-hidden`
     * asterisk onto the label AND sets the native `required` attribute on the
     * inner `<Input>` (the semantic carrier that drives `:user-invalid`).
     */
    required?: boolean;
    errorLive?: "off" | "polite" | "assertive";
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string | number];
}>();
</script>
