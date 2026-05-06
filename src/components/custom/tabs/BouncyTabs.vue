<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import BouncyToggle from "./BouncyToggle.vue";
import type { ToggleOption } from "./BouncyToggle.vue";

export interface TabOption {
    label: string;
    value: string;
}

const props = withDefaults(defineProps<{
    options: TabOption[];
    modelValue: string;
    /** "default" = subtle muted slider; "pill" = solid foreground pill */
    variant?: "default" | "pill";
    /** Tab-row overflow — see `<BouncyToggle>`. */
    overflow?: "none" | "scroll" | "auto";
    class?: HTMLAttributes["class"];
}>(), {
    variant: "default",
    overflow: "none",
});

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

function onUpdate(value: string | string[]) {
    emit("update:modelValue", value as string);
}
</script>

<template>
    <BouncyToggle
        :options="(options as ToggleOption[])"
        :model-value="modelValue"
        :variant="variant"
        :overflow="overflow"
        :class="props.class"
        :multi-select="false"
        @update:model-value="onUpdate"
    />
</template>
