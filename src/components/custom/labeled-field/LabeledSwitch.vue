<template>
    <LabeledField
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
    >
        <div class="flex items-center">
            <Switch
                :checked="checked"
                @update:checked="(v: boolean) => emit('update:checked', v)"
            />
        </div>
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
import { Switch } from "../../ui/switch";

defineProps<{
    checked: boolean;
    label: string;
    tooltip: string;
    labelClass?: string;
    /** AQ.W4 §W4.5 — thread the required-field asterisk onto the label. */
    required?: boolean;
}>();

const emit = defineEmits<{
    "update:checked": [value: boolean];
}>();
</script>
