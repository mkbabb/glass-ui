<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    ComboboxContent as RekaComboboxContent,
    ComboboxPortal as RekaComboboxPortal,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { floatingContentAttrs } from "../_shared/floating";
import type { ComboboxListEmits, ComboboxListProps } from "./types";

defineOptions({ name: "ComboboxList", inheritAttrs: false });

const props = withDefaults(defineProps<ComboboxListProps>(), {
    side: "bottom",
    align: "center",
    sideOffset: 4,
    alignOffset: 0,
});
const emit = defineEmits<ComboboxListEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        bodyLock: _bodyLock,
        "body-lock": _bodyLockKebab,
        position: _position,
        ...forwarded
    } = floatingContentAttrs(attrs);
    return forwarded;
});
const placementProps = computed(() => ({
    position: "popper" as const,
    side: props.side,
    sideOffset: props.sideOffset,
    align: props.align,
    alignOffset: props.alignOffset,
    avoidCollisions: true,
}));
</script>

<template>
  <RekaComboboxPortal>
    <RekaComboboxContent
      data-slot="combobox-list"
      data-reveal="menu"
      v-bind="{ ...placementProps, ...forwardedAttrs }"
      :class="cn('z-popover max-h-[min(24rem,var(--reka-combobox-content-available-height,60dvh))] w-popover overflow-x-hidden overflow-y-auto rounded-panel border glass-floating text-popover-foreground origin-(--reka-combobox-content-transform-origin) outline-none glass-reveal glass-field-portal', props.class)"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
    >
      <slot />
    </RekaComboboxContent>
  </RekaComboboxPortal>
</template>
