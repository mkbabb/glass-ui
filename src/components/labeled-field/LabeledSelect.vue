<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../select";
import LabeledField from "./LabeledField.vue";
import type { LabeledSelectProps } from "./types";

defineOptions({ name: "LabeledSelect" });

const props = defineProps<LabeledSelectProps>();
const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:open": [value: boolean];
}>();
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
            <Select
                :model-value="modelValue"
                :open="open"
                :disabled="disabled"
                :required="effectiveRequired"
                @update:open="emit('update:open', $event)"
                @update:model-value="emit('update:modelValue', String($event))"
            >
                <SelectTrigger
                    :id="controlId"
                    :aria-labelledby="labelledBy"
                    :aria-describedby="describedBy"
                    :aria-errormessage="errorId"
                    :aria-invalid="invalid || undefined"
                >
                    <SelectValue :placeholder="placeholder" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem v-for="item in items" :key="item" :value="item">
                            {{ item }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>
