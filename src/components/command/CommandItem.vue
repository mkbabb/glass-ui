<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItem as RekaComboboxItem } from "reka-ui";
import { cn } from "../_shared/class-names";
import { rowClass } from "../_shared/menu/rowClass";
import { fixedHostAttrs } from "../_shared/primitive";
import type {
    ComboboxItemEmits,
    ComboboxItemProps,
} from "../_shared/selection";

/* The row geometry is `rowClass()`'s — the same register a SelectItem reads. The
 * `.command__item` recipe used to re-declare nine of its declarations (display,
 * width, alignment, padding, cursor, outline, user-select, colour, size) beside
 * it, which is how the two families drifted apart in the first place. The class
 * token survives as the dialog scale-up hook and the disabled arm's
 * `pointer-events` — two rules, which is what `styles.css` already says. */
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
        :class="cn('command__item', rowClass(), props.class)"
        @select="handleSelect"
    >
        <slot />
    </RekaComboboxItem>
</template>
