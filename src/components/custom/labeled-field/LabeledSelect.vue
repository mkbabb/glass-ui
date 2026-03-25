<template>
    <IconTooltip :text="tooltip">
        <label class="font-display text-lg text-muted-foreground cursor-help">{{ label }}</label>
    </IconTooltip>
    <Select
        :model-value="modelValue"
        :open="isOpen"
        @update:open="(v: boolean) => emit('update:open', v)"
        @update:model-value="(v: any) => emit('update:modelValue', v)"
    >
        <SelectTrigger class="font-mono-code">
            <SelectValue />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup class="font-mono-code">
                <SelectItem
                    v-for="item in items"
                    :key="item"
                    :value="item"
                >
                    {{ item }}
                    <template #description>
                        <span
                            v-if="descriptions?.[item]"
                            class="ml-auto pl-2 text-2xs text-muted-foreground whitespace-nowrap"
                        >{{ descriptions[item] }}</span>
                    </template>
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>

<script setup lang="ts">
import { IconTooltip } from "../icon-tooltip";
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
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
    "update:open": [value: boolean];
}>();
</script>
