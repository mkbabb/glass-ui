<template>
    <LabeledField :label="label" :tooltip="tooltip" :label-class="labelClass">
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
}>();

const emit = defineEmits<{
    "update:checked": [value: boolean];
}>();
</script>
