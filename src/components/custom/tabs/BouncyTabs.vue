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
    /** "default" = subtle muted slider; "pill" = solid foreground pill */
    variant?: "default" | "pill";
    /** Tab-row overflow — see `<BouncyToggle>`. */
    overflow?: "none" | "scroll" | "auto";
    class?: HTMLAttributes["class"];
}>(), {
    variant: "default",
    overflow: "none",
});

// Vue 3.5 defineModel — the inner BouncyToggle is single-select
// (`:multi-select="false"`), so the model is always a `string`. The
// `onUpdate` shim narrows BouncyToggle's `string | string[]` emit back to
// the string surface BouncyTabs exposes.
const model = defineModel<string>({ required: true });

function onUpdate(value: string | string[]) {
    model.value = value as string;
}
</script>

<template>
    <BouncyToggle
        :options="(options as ToggleOption[])"
        :model-value="model"
        :variant="variant"
        :overflow="overflow"
        :class="props.class"
        :multi-select="false"
        @update:model-value="onUpdate"
    />
</template>
