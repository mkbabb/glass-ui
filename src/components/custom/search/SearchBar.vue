<template>
    <component
        :is="tag"
        :class="cn('input-bar', $attrs.class as string)"
    >
        <component :is="icon ?? Search" class="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <input
            ref="inputRef"
            :value="modelValue"
            :placeholder="placeholder"
            class="input-bar-field"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <slot />
    </component>
</template>

<script setup lang="ts">
import { ref, type Component } from "vue";
import { Search } from "@lucide/vue";
import { cn } from "../../../utils";

const props = withDefaults(
    defineProps<{
        modelValue?: string;
        placeholder?: string;
        icon?: Component;
        tag?: string;
    }>(),
    {
        modelValue: "",
        placeholder: "Search\u2026",
        tag: "div",
    },
);

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

defineExpose({ inputRef });
</script>
