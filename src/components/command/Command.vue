<script setup lang="ts">
import { ComboboxRoot as RekaComboboxRoot } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { ComboboxValue } from "../_shared/selection";
import { isSelectionValue } from "../_shared/selection";
import type { CommandEmits, CommandProps } from "./types";

defineOptions({ name: "Command", inheritAttrs: false });

const props = withDefaults(defineProps<CommandProps>(), {
    open: true,
    surface: "glass",
});
const emit = defineEmits<CommandEmits>();

function updateModelValue(value: unknown): void {
    if (value !== null && !isSelectionValue(value)) {
        throw new TypeError("[glass-ui] Command received a non-scalar value.");
    }
    emit("update:modelValue", value as ComboboxValue);
}
</script>

<template>
    <RekaComboboxRoot
        data-slot="command"
        :model-value="props.modelValue"
        :open="props.open"
        :disabled="props.disabled"
        :data-surface="props.surface"
        :class="cn('command glass-floating', props.class)"
        @update:model-value="updateModelValue"
        @update:open="emit('update:open', $event)"
    >
        <slot />
    </RekaComboboxRoot>
</template>

<style src="./styles.css"></style>
