<template>
    <LabeledField
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
        :hide-label="hideLabel"
        v-slot="{ controlId }"
    >
        <div class="flex items-center">
            <Switch
                :id="controlId"
                :model-value="checked"
                @update:model-value="(v: boolean) => emit('update:checked', v)"
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
    /**
     * AZ.W-BLOB-REDRESS — render the label `sr-only` (kept for a11y, hidden
     * visually) when an enclosing chrome row (a `<ConfiguratorRow>`) already
     * supplies the visible human label. Avoids the double-label leak.
     */
    hideLabel?: boolean;
}>();

const emit = defineEmits<{
    "update:checked": [value: boolean];
}>();
</script>
