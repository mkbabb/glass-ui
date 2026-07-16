<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxItemIndicator as RekaComboboxItemIndicator } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxItemIndicatorProps } from "./types";

defineOptions({ name: "ComboboxItemIndicator", inheritAttrs: false });

const props = defineProps<ComboboxItemIndicatorProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
  <RekaComboboxItemIndicator
    data-slot="combobox-item-indicator"
    v-bind="forwardedAttrs"
    :class="cn('ml-auto', props.class)"
  >
    <slot />
  </RekaComboboxItemIndicator>
</template>
