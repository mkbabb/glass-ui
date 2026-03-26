<template>
    <IconTooltip :text="tooltip">
        <label :class="labelClass ?? 'font-display text-base text-muted-foreground cursor-help'">{{ label }}</label>
    </IconTooltip>
    <div class="flex items-center">
        <Switch
            :checked="checked"
            @update:checked="(v: boolean) => emit('update:checked', v)"
        />
    </div>
</template>

<script setup lang="ts">
import { IconTooltip } from "../icon-tooltip";
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
