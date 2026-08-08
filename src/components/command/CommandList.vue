<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxContent as RekaComboboxContent } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { ComboboxListEmits } from "../_shared/selection";
import type { CommandListProps } from "./types";

/* ESCAPE IS REKA'S. This component used to hold a provide/inject channel back to
 * CommandDialog whose only job was calling `dismiss()` on Escape — a second
 * dismissal path racing the dismissable layer reka already mounts, in a component
 * that is itself inside reka's Dialog. The layer wins arguments like this by
 * construction; the channel only decided which of the two got there first. It is
 * gone, with `dialogContext.ts`. `escapeKeyDown` is still emitted, so a consumer
 * that wants to intervene calls `preventDefault()` on the real event. */
defineOptions({ name: "CommandList", inheritAttrs: false });

const props = withDefaults(defineProps<CommandListProps>(), { surface: "glass" });
const emit = defineEmits<ComboboxListEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => ({ ...attrs }));
</script>

<template>
    <!-- The list is the scroll port AND the fade port, one element — so the edge
       feather reads the same scroll state the rows scroll in. The `role="presentation"`
       wrapper div that used to sit inside is gone: it named nothing, and an extra
       node between a listbox and its options is a node the a11y tree has to walk. -->
    <RekaComboboxContent
        v-bind="forwardedAttrs"
        data-slot="command-list"
        data-fade-start
        data-fade-end
        :disable-outside-pointer-events="false"
        :data-surface="props.surface"
        :class="cn('command__list fading-scroll fading-scroll--y', props.class)"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
        @focus-outside="emit('focusOutside', $event)"
        @interact-outside="emit('interactOutside', $event)"
    >
        <slot />
    </RekaComboboxContent>
</template>
