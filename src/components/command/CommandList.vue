<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxContent as RekaComboboxContent } from "reka-ui";
import { cn } from "../_shared/class-names";
import { floatingContentAttrs } from "../_shared/floating";
import type { ComboboxListEmits } from "../combobox/types";
import { useOptionalCommandDialogContext } from "./dialogContext";
import type { CommandListProps } from "./types";

defineOptions({ name: "CommandList", inheritAttrs: false });

const props = withDefaults(defineProps<CommandListProps>(), { surface: "glass" });
const emit = defineEmits<ComboboxListEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => floatingContentAttrs(attrs));
const commandDialog = useOptionalCommandDialogContext();

function handleEscape(event: KeyboardEvent): void {
    emit("escapeKeyDown", event);
    if (!event.defaultPrevented) commandDialog?.dismiss();
}
</script>

<template>
    <RekaComboboxContent
        v-bind="forwardedAttrs"
        data-slot="command-list"
        :disable-outside-pointer-events="false"
        :data-surface="props.surface"
        :class="cn('command__list', props.class)"
        @escape-key-down="handleEscape"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
        @focus-outside="emit('focusOutside', $event)"
        @interact-outside="emit('interactOutside', $event)"
    >
        <div role="presentation">
            <slot />
        </div>
    </RekaComboboxContent>
</template>
