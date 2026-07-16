<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItem as RekaComboboxItem } from "reka-ui";
import { cn } from "../_shared/class-names";
import { menuRowClass } from "../_shared/menuRowClass";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxItemEmits, ComboboxItemProps } from "./types";

defineOptions({ name: "ComboboxItem", inheritAttrs: false });

const props = defineProps<ComboboxItemProps>();
const emit = defineEmits<ComboboxItemEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
  <RekaComboboxItem
    data-slot="combobox-item"
    v-bind="forwardedAttrs"
    :value="props.value"
    :disabled="props.disabled"
    :text-value="props.textValue"
    :class="cn(
      menuRowClass(),
      `gap-2 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      props.class,
    )"
    @select="emit('select', $event)"
  >
    <slot />
  </RekaComboboxItem>
</template>
