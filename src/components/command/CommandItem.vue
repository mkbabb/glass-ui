<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItem as RekaComboboxItem } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type {
    ComboboxItemEmits,
    ComboboxItemProps,
} from "../_shared/selection";

defineOptions({ name: "CommandItem", inheritAttrs: false });

const props = defineProps<ComboboxItemProps>();
const emit = defineEmits<ComboboxItemEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

type CommandSelectEvent = ComboboxItemEmits["select"][0];

function handleSelect(event: CommandSelectEvent) {
    // Reka protects its model from disabled items, but still emits `select` before
    // checking `disabled`. Keep the public command contract inert as well.
    if (props.disabled) {
        event.preventDefault();
        return;
    }

    emit("select", event);
}
</script>

<template>
    <RekaComboboxItem
        v-bind="forwardedAttrs"
        data-slot="command-item"
        :value="props.value"
        :disabled="props.disabled"
        :text-value="props.textValue"
        :class="cn('command__item interactive-item glass-menu-row', props.class)"
        @select="handleSelect"
    >
        <slot />
    </RekaComboboxItem>
</template>
