<template>
    <LabeledField
        :label="label"
        :tooltip="tooltip"
        :label-class="labelClass"
        :required="required"
        v-slot="{ controlId }"
    >
        <Select
            :model-value="modelValue"
            :open="isOpen"
            @update:open="(v: boolean) => emit('update:open', v)"
            @update:model-value="(v: any) => emit('update:modelValue', v)"
        >
            <SelectTrigger :id="controlId" class="fira-code">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup class="fira-code">
                    <SelectItem
                        v-for="item in items"
                        :key="item"
                        :value="item"
                    >
                        {{ item }}
                        <template #description>
                            <span
                                v-if="descriptions?.[item]"
                                class="ml-auto pl-2 text-micro text-muted-foreground whitespace-nowrap"
                            >{{ descriptions[item] }}</span>
                        </template>
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </LabeledField>
</template>

<script setup lang="ts">
import LabeledField from "./LabeledField.vue";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";

defineProps<{
    modelValue: string;
    isOpen: boolean;
    items: readonly string[];
    descriptions?: Record<string, string>;
    label: string;
    tooltip: string;
    labelClass?: string;
    /** AQ.W4 §W4.5 — thread the required-field asterisk onto the label. */
    required?: boolean;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:open": [value: boolean];
}>();
</script>
